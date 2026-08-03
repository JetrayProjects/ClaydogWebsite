export type Project = {
    id: string;
    title: string;
    video: string;       // Snippet for homepage accordion
    poster: string;      // Poster image for accordion
    youtubeUrl?: string; // YouTube Embed URL for the full movie
    about?: string[];    // Array of strings, each acts as a paragraph
    stills?: string[];   // Array of image paths for the Stills tab
    role?: string;       // Role in the project
};

export type WorkSectionType = {
    title: string;
    projects: Project[];
};

export const workSections: WorkSectionType[] = [
    {
        title: "Films",
        projects: [
            {
                id: "antyesthi",
                title: "Antyesthi",
                role: "Director - Cinematographer",
                video: "/videos/Antyesthi/Anthyesti clip.mp4",
                poster: "/photos/Antyesthi/STILLS/Screenshot 2025-01-24 at 21.40.06.webp",
                youtubeUrl: "https://www.youtube.com/embed/zv2huV2rNeY?si=U9fgFnGy54DWgK4y",
                about: [
                    "Antyeshti is an experimental short film that follows Gopal, a first-generation Indian immigrant in the UK, as he navigates the weight of colonial history and modern-day racism. Blending narrative and surreal imagery inspired by Indian mythology, the film explores identity, cultural erasure, and inherited trauma."
                ],
                stills: [
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-23 at 21.18.38.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-23 at 21.19.08.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-23 at 21.45.37.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-23 at 21.46.51.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-23 at 22.00.29.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-24 at 21.27.51.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-24 at 21.29.09.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-24 at 21.36.43.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-24 at 21.40.06.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-24 at 21.42.08.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-24 at 21.43.30.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-24 at 21.45.11.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-24 at 21.59.28.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-25 at 21.18.44.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-25 at 21.45.27.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-25 at 21.53.45.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 16.18.29.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 16.18.44.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 16.50.38.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 16.51.05.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 16.51.54.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 16.52.12.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 16.53.16.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 16.54.17.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 17.04.58.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 17.07.12.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 17.11.41.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 17.31.49.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 17.37.32.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 17.40.07.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 17.43.05.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 17.44.48.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 17.53.42.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 17.59.00.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 18.00.55.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 18.02.29.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 18.07.33.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 18.10.46.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 18.13.51.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 18.21.10.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 18.27.04.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 18.27.39.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 18.34.01.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 18.37.12.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 18.40.48.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 18.42.23.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 18.45.09.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 18.46.03.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 18.50.16.webp",
                    "/photos/Antyesthi/STILLS/Screenshot 2025-01-30 at 18.55.40.webp"
                ]
            },
            {
                id: "back-burner",
                title: "On the Back Burner",
                role: "Cinematographer",
                video: "/videos/On the Back Burner/oTBB.mp4",
                poster: "/photos/On the Back Burner/Screenshot (549).webp",
                youtubeUrl: "https://www.youtube.com/embed/KVu1HsqDFsk?si=WBpbr24PLyS9i1Eb",
                about: [
                    "On the Backburner is a slow, intimate drama that follows two immigrant friends in the UK as they drift through conversations about work, dreams, and displacement. Beneath their casual exchanges lies the quiet anxiety of survival — visas, instability, and the fear of being sent back. As tensions rise between responsibility and desire, the film captures the emotional limbo of putting one’s life “on hold” in a foreign land."
                ],
                stills: [
                    "/photos/On the Back Burner/Screenshot (534).webp",
                    "/photos/On the Back Burner/Screenshot (546).webp",
                    "/photos/On the Back Burner/Screenshot (547).webp",
                    "/photos/On the Back Burner/Screenshot (549).webp",
                    "/photos/On the Back Burner/Screenshot (550).webp",
                    "/photos/On the Back Burner/Screenshot (569).webp",
                    "/photos/On the Back Burner/Screenshot (570).webp",
                    "/photos/On the Back Burner/Screenshot (588).webp",
                    "/photos/On the Back Burner/Screenshot (594).webp",
                    "/photos/On the Back Burner/Screenshot (596).webp"
                ]
            },
            {
                id: "until-we-dance",
                title: "Until We Dance Again",
                role: "Director",
                video: "/videos/Until We Dance Again/The furnished room clip.mp4",
                poster: "/photos/Until We Dance Again/Still 2026-02-18 204336_1.1.2.webp",
                youtubeUrl: "https://www.youtube.com/embed/62xtHueofcE?si=xV39vI8tceKECFww",
                about: [
                    "A moving visual piece centered around a furnished room.",
                ],
                stills: [
                    "/photos/Until We Dance Again/Still 2026-02-18 204336_1.1.1.webp",
                    "/photos/Until We Dance Again/Still 2026-02-18 204336_1.1.2.webp",
                    "/photos/Until We Dance Again/Still 2026-02-18 204336_1.1.3.webp",
                    "/photos/Until We Dance Again/Still 2026-02-18 204336_1.1.4.webp",
                    "/photos/Until We Dance Again/Still 2026-02-18 204336_1.1.5.webp",
                    "/photos/Until We Dance Again/Still 2026-02-18 204336_1.1.6.webp",
                    "/photos/Until We Dance Again/Still 2026-02-18 204336_1.1.7.webp",
                    "/photos/Until We Dance Again/Still 2026-02-18 204336_1.1.8.webp",
                    "/photos/Until We Dance Again/Still 2026-02-18 204336_1.1.9.webp"
                ]
            },
            {
                id: "blade-butterfly",
                title: "The Blade and the Butterfly",
                role: "Director",
                video: "/videos/TheBladeandTheButterfly/thebladeandthebutterfly.mp4",
                poster: "/photos/The-Blade-and-the-Butterfly/README.webp",
                youtubeUrl: "https://www.youtube.com/embed/Z9fYMrjp7xA?si=hC2_XiJGj3FeAtIF",
                about: [
                    "The Blade and the Butterfly is a thriller that follows Sonia, a ballet dancer whose life is thrown into chaos when she is kidnapped by gangsters tied to her instructor Andre's criminal past.",
                    "As Andre's attempt to rescue her ends in defeat, Sonia is forced to fight for her own survival. Set against the backdrop of an abandoned nightclub, her struggle is intercut with glimpses of her ballet performance, Birth of the Butterfly, as she discovers the strength to overcome her captor and reclaim her freedom."
                ],
                stills: []
            }
        ]
    },
    {
        title: "Brand Work",
        projects: [
            {
                id: "vendetta",
                title: "Vendetta",
                role: "Visual Director",
                video: "",
                poster: "/photos/Vendetta/IMG_2729.webp",
                about: [
                    "High-contrast commercial style for Vendetta.",
                ],
                stills: [
                    "/photos/Vendetta/000132770006.webp",
                    "/photos/Vendetta/000132770011.webp",
                    "/photos/Vendetta/000132770014.webp",
                    "/photos/Vendetta/000132770020.webp",
                    "/photos/Vendetta/000132770024.webp",
                    "/photos/Vendetta/000132770032.webp",
                    "/photos/Vendetta/000132770033.webp",
                    "/photos/Vendetta/000132770035.webp",
                    "/photos/Vendetta/IMG_2549.webp",
                    "/photos/Vendetta/IMG_2715.webp",
                    "/photos/Vendetta/IMG_2729.webp",
                    "/photos/Vendetta/IMG_2740.webp",
                    "/photos/Vendetta/_DSF8298.webp",
                    "/photos/Vendetta/_DSF8303.webp",
                    "/photos/Vendetta/_DSF8304.webp",
                    "/photos/Vendetta/_DSF8467.webp",
                    "/photos/Vendetta/_DSF8533.webp"
                ]
            }
        ]
    },
    {
        title: "Music Video",
        projects: [
            {
                id: "mysie",
                title: "Mysie - Dun Di Dun",
                role: "Gaffer",
                video: "/videos/MysieDunDiDun/dundidun.mp4",
                poster: "/photos/Mysie-DunDiDun/Untitled.webp",
                youtubeUrl: "https://www.youtube.com/embed/WSASXHaXZFA?si=AOVc7yhDFsCJeWBX",
                about: [
                    "Music video for Mysie - Dun Di Dun.",
                ],
                stills: []
            },
            {
                id: "cavn",
                title: "CAVN - Carving Stones ft",
                role: "Cinematographer",
                video: "/videos/cavn/Untitled.mp4",
                poster: "/photos/cavn/cavn.webp",
                youtubeUrl: "https://www.youtube.com/embed/YyHWmz4JURM?si=Hn1b6ayh01mGn0gM",
                about: [
                    "Music video for CAVN - Carving Stones.",
                ],
                stills: []
            }
        ]
    },
];

export function getProjectById(id: string): Project | undefined {
    for (const section of workSections) {
        const found = section.projects.find((p) => p.id === id);
        if (found) return found;
    }
    return undefined;
}

export function getAdjacentProjects(currentId: string): { prev: Project | null, next: Project | null } {
    const allProjects = workSections.flatMap((s) => s.projects);
    const currentIndex = allProjects.findIndex((p) => p.id === currentId);
    
    if (currentIndex === -1) return { prev: null, next: null };

    return {
        prev: currentIndex > 0 ? allProjects[currentIndex - 1] : null,
        next: currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null,
    };
}
