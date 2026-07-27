import { useState, useRef, useEffect } from "react";
import { cn } from "./utils";
import { workSections, Project } from "./data";

function ProjectRow({
    project,
    isHovered,
    isOthersHovered,
    onEnter,
    onLeave,
    onSelectProject,
}: {
    project: Project;
    isHovered: boolean;
    isOthersHovered: boolean;
    onEnter: () => void;
    onLeave: () => void;
    onSelectProject?: (project: Project) => void;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isHovered || isMobile) {
            videoRef.current?.play().catch(() => { });
        } else {
            videoRef.current?.pause();
        }
    }, [isHovered, isMobile]);

    return (
        <div
            onClick={() => onSelectProject && onSelectProject(project)}
            className={cn(
                "block relative group w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] cursor-pointer",
                "aspect-square md:aspect-auto",
                isHovered ? "md:h-[50vh]" : "md:h-[20vh]"
            )}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            {/* Background Media */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className={cn("absolute inset-0 bg-[#000000]/60 z-10 transition-opacity duration-700", (isHovered || isMobile) ? "opacity-30" : "opacity-80")} />

                {project.poster && (
                    <img
                        src={project.poster}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className={cn(
                            "absolute inset-0 w-full h-full object-cover transition-transform duration-1000", 
                            (isHovered || isMobile) ? "scale-100" : "scale-105",
                            (project.video && isMobile) ? "opacity-0 md:opacity-100" : "opacity-100"
                        )}
                    />
                )}

                {project.video && (
                    <video
                        ref={videoRef}
                        src={project.video}
                        loop
                        muted
                        playsInline
                        className={cn("absolute inset-0 w-full h-full object-cover transition-opacity duration-700", (isHovered || isMobile) ? "opacity-100" : "opacity-0")}
                    />
                )}
            </div>

            {/* Content Overlay */}
            <div className="relative z-20 w-full h-full flex flex-col justify-center pointer-events-none" style={{ paddingLeft: '10%', paddingRight: '10%' }}>
                <h3 
                    className={cn(
                        "text-3xl md:text-5xl lg:text-7xl font-light tracking-widest uppercase transition-all duration-700 origin-left text-white", 
                        (!isMobile && isOthersHovered) ? "opacity-20 translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"
                    )}
                    style={{ fontFamily: 'var(--font-lostina)' }}
                >
                    {project.title}
                </h3>

            </div>
        </div>
    );
}

function SectionProjects({ projects, onSelectProject }: { projects: Project[]; onSelectProject?: (project: Project) => void }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    if (projects.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center border-y border-[#89898b]/20 text-[#89898b] uppercase tracking-[0.3em] text-xs py-12">
                Coming Soon
            </div>
        );
    }

    return (
        <>
            {projects.map((project, index) => (
                <ProjectRow
                    key={project.id}
                    project={project}
                    isHovered={hoveredIndex === index}
                    isOthersHovered={hoveredIndex !== null && hoveredIndex !== index}
                    onEnter={() => setHoveredIndex(index)}
                    onLeave={() => setHoveredIndex(null)}
                    onSelectProject={onSelectProject}
                />
            ))}
        </>
    );
}

export default function Work({ onSelectProject }: { onSelectProject?: (project: Project) => void }) {
    return (
        <section id="work" className="w-full bg-transparent py-24 flex flex-col min-h-screen">
            {workSections.map((section) => (
                <div key={section.title} className="flex flex-col w-full" style={{ marginBottom: '150px' }}>
                    <div className="w-full flex flex-col" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
                        <h2 
                            className="text-3xl md:text-5xl lg:text-6xl tracking-widest uppercase text-black bg-transparent leading-none self-start"
                            style={{ fontFamily: 'var(--font-lostina)', marginLeft: '10%' }}
                        >
                            {section.title}
                        </h2>
                    </div>

                    <div className={cn("flex flex-col w-full", section.projects.length === 0 && "h-32")}>
                        <SectionProjects projects={section.projects} onSelectProject={onSelectProject} />
                    </div>
                </div>
            ))}
        </section>
    );
}
