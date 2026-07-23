import type React from 'react';
import { useRef, useMemo, useCallback, useState, useEffect, Suspense, forwardRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

type ImageItem = string | { src: string; alt?: string };

interface InfiniteGalleryProps {
	images: ImageItem[];
	speed?: number;
	className?: string;
	style?: React.CSSProperties;
	isPaused?: boolean;
}

const VERTICAL_SPACING = 3.5;
const MAX_HORIZONTAL_OFFSET = 5.2;
const MAX_DEPTH_OFFSET = 6.0;

const FADE_TOP_START = 7.5;
const FADE_TOP_END = 4.5;
const FADE_BOTTOM_START = -4.5;
const FADE_BOTTOM_END = -7.5;
const MAX_BLUR = 6.0;

// Custom shader material for blur, opacity, and cloth folding effects
const createClothMaterial = () => {
	return new THREE.ShaderMaterial({
		transparent: true,
		uniforms: {
			map: { value: null },
			opacity: { value: 1.0 },
			blurAmount: { value: 0.0 },
			scrollForce: { value: 0.0 },
			time: { value: 0.0 },
			isHovered: { value: 0.0 },
		},
		vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        
        vec3 pos = position;
        
        // Create smooth curving based on scroll force
        float curveIntensity = scrollForce * 0.3;
        
        // Base curve across the plane based on distance from center
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        
        // Add gentle cloth-like ripples
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;
        
        // Flag waving effect when hovered
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          // Create flag-like wave from left to right
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float waveAmplitude = sin(wavePhase) * 0.1;
          // Damping effect - stronger wave on the right side (free edge)
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;
          
          // Add secondary smaller waves for more realistic flag motion
          float secondaryWave = sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
          flagWave += secondaryWave;
        }
        
        // Apply Z displacement for curving effect (inverted) with cloth ripples and flag wave
        pos.z -= (curve + clothEffect + flagWave);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
		fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        
        // Simple blur approximation
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
               vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        
        // Add subtle lighting effect based on curving
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);
        
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
	});
};

const ImagePlane = forwardRef<THREE.Mesh, {
	texture: THREE.Texture;
	position: [number, number, number];
	scale: [number, number, number];
	material: THREE.ShaderMaterial;
}>(({ texture, position, scale, material }, ref) => {
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (material && texture) {
			material.uniforms.map.value = texture;
		}
	}, [material, texture]);

	useEffect(() => {
		if (material && material.uniforms) {
			material.uniforms.isHovered.value = isHovered ? 1.0 : 0.0;
		}
	}, [material, isHovered]);

	return (
		<mesh
			ref={ref}
			position={position}
			scale={scale}
			material={material}
			onPointerEnter={() => setIsHovered(true)}
			onPointerLeave={() => setIsHovered(false)}
		>
			<planeGeometry args={[1, 1, 32, 32]} />
		</mesh>
	);
});
ImagePlane.displayName = 'ImagePlane';

function GalleryScene({
	images,
	speed = 1,
}: Omit<InfiniteGalleryProps, 'className' | 'style'>) {
	const scrollVelocity = useRef(0);
	const scrollOffset = useRef(0);
	const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

	const normalizedImages = useMemo(
		() => images.map((img) => (typeof img === 'string' ? { src: img, alt: '' } : img)),
		[images]
	);

	const textures = useTexture(normalizedImages.map((img) => img.src));
	const totalImages = normalizedImages.length;

	const materials = useMemo(
		() => Array.from({ length: totalImages }, () => createClothMaterial()),
		[totalImages]
	);

	const spatialPositions = useMemo(() => {
		const positions: { x: number; y: number; z: number }[] = [];
		for (let i = 0; i < totalImages; i++) {
			const horizontalAngle = (i * 2.618) % (Math.PI * 2);
			const depthAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);

			const horizontalRadius = 0.8 + (i % 3) * 1.3;
			const depthRadius = 0.4 + ((i + 1) % 4) * 0.7;

			const x = (Math.sin(horizontalAngle) * horizontalRadius * MAX_HORIZONTAL_OFFSET) / 3.2;
			const z = ((Math.cos(depthAngle) * depthRadius * MAX_DEPTH_OFFSET) / 4.2) - 3.0;
			const y = i * VERTICAL_SPACING;

			positions.push({ x, y, z });
		}
		return positions;
	}, [totalImages]);

	const totalRange = totalImages * VERTICAL_SPACING;

	useFrame((state, delta) => {
		scrollVelocity.current += 1.2 * delta * speed; // Constant autoplay speed (adjusted by speed prop)
		scrollVelocity.current *= 0.92; // Dampening

		scrollOffset.current += scrollVelocity.current * delta * 30; // Speed multiplier
		// No clamping - allows infinite loop

		const time = state.clock.getElapsedTime();

		materials.forEach((material, i) => {
			if (!material || !material.uniforms) return;

			material.uniforms.time.value = time;
			material.uniforms.scrollForce.value = scrollVelocity.current * 0.1;

			const pos = spatialPositions[i];
			const mesh = meshRefs.current[i];
			if (!pos || !mesh) return;

			let worldY = (pos.y - scrollOffset.current) % totalRange;
			if (worldY < 0) worldY += totalRange;
			
			// Shift to center around 0 so it falls through the visible viewport
			worldY -= totalRange / 2;
			
			mesh.position.y = worldY;

			let opacity = 1;
			let blur = 0;

			if (worldY > FADE_TOP_START) {
				opacity = 0;
				blur = MAX_BLUR;
			} else if (worldY > FADE_TOP_END) {
				const progress = (FADE_TOP_START - worldY) / (FADE_TOP_START - FADE_TOP_END);
				opacity = progress;
				blur = MAX_BLUR * (1 - progress);
			} else {
				opacity = 1;
				blur = 0;
			}

			material.uniforms.opacity.value = opacity;
			material.uniforms.blurAmount.value = blur;
		});
	});

	const { viewport } = useThree();

	const scaleMultiplier = useMemo(() => {
		return Math.max(1.5, Math.min(3.2, viewport.width * 0.22));
	}, [viewport.width]);

	if (normalizedImages.length === 0) return null;

	return (
		<>
			{normalizedImages.map((img, i) => {
				const texture = textures[i];
				const material = materials[i];
				const pos = spatialPositions[i];

				if (!texture || !material || !pos) return null;

				const imgElement = texture.image as HTMLImageElement | undefined;
				const aspect = imgElement && imgElement.width && imgElement.height
					? imgElement.width / imgElement.height
					: 1;
				const scale: [number, number, number] =
					aspect > 1
						? [scaleMultiplier * aspect, scaleMultiplier, 1]
						: [scaleMultiplier, scaleMultiplier / aspect, 1];

				return (
					<ImagePlane
						key={i}
						ref={(el) => (meshRefs.current[i] = el)}
						texture={texture}
						position={[pos.x, pos.y, pos.z]}
						scale={scale}
						material={material}
					/>
				);
			})}
		</>
	);
}

function FallbackGallery({ images }: { images: ImageItem[] }) {
	const normalizedImages = useMemo(
		() =>
			images.map((img) =>
				typeof img === 'string' ? { src: img, alt: '' } : img
			),
		[images]
	);

	return (
		<div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
			<p className="text-gray-600 mb-4">
				WebGL not supported. Showing image list:
			</p>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
				{normalizedImages.map((img, i) => (
					<img
						key={i}
						src={img.src || '/placeholder.svg'}
						alt={img.alt}
						className="w-full h-32 object-cover rounded"
					/>
				))}
			</div>
		</div>
	);
}

export default function InfiniteGallery({
	images,
	className = 'h-96 w-full',
	style,
	speed = 1,
	isPaused = false,
}: InfiniteGalleryProps) {
	const [webglSupported, setWebglSupported] = useState(true);

	useEffect(() => {
		try {
			const canvas = document.createElement('canvas');
			const gl =
				canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
			if (!gl) {
				setWebglSupported(false);
			}
		} catch (e) {
			setWebglSupported(false);
		}
	}, []);

	if (!webglSupported) {
		return (
			<div className={className} style={style}>
				<FallbackGallery images={images} />
			</div>
		);
	}

	return (
		<div className={className} style={{ width: '100%', height: '100%', pointerEvents: 'none', ...style }}>
			<Canvas
				camera={{ position: [0, 0, 0], fov: 55 }}
				gl={{ antialias: true, alpha: true }}
				frameloop={isPaused ? "demand" : "always"}
				style={{ touchAction: 'auto' }}
			>
				<Suspense fallback={null}>
					<GalleryScene images={images} speed={speed} />
				</Suspense>
			</Canvas>
		</div>
	);
}
