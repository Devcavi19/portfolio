export interface EducationItem {
    degree: string;
    school: string;
    period: string;
    location: string;
    gwa: string;
    thesis: string;
    description: string;
}

export interface WorkExperienceItem {
    role: string;
    company: string;
    period: string;
    location: string;
    type: string;
    description: string;
    achievements: string[];
    tech: string[];
}

export interface ProjectItem {
    title: string;
    tech: string[];
    description: string;
    link?: string;
    repo?: string;
    images?: string[];
    featured?: boolean;
    period?: string;
    subtitle?: string;
}

export interface AwardItem {
    title: string;
    date: string;
    entry: string;
    description?: string;
}

export interface BlogItem {
    id: string;
    title: string;
    date: string;
    readTime: string;
    category: string;
    summary: string;
    content?: string;
    link?: string;
}

export interface DeviceCategory {
    category: string;
    items: {
        name: string;
        spec?: string;
        description: string;
        icon?: string;
    }[];
}

export const profile = {
    name: "Herald Carl Nicol Avila",
    role: "Computer Science Graduate | AI & Full-Stack Developer",
    headline: "Specializing in Applied AI/NLP Engineering, RAG Architectures, and Full-Stack Products.",
    tagline: "Computer Science graduate specializing in applied AI/NLP engineering, with hands-on experience building RAG systems, LLM integrations, and full-stack web products.",
    availability: "Available for Hire",
    bio: `Computer Science graduate specializing in applied AI/NLP engineering, with hands-on experience building retrieval-augmented generation (RAG) systems, LLM-integrated applications, and full-stack web products. Shipped a production RAG chatbot for a city government client and independently architected a thesis-grade RAG pipeline for document retrieval. Comfortable across the stack: Python, React, JavaScript, PHP, and vector search infrastructure. Active hackathon competitor and award-winning undergraduate researcher.`,
    email: "heraldcarlavila@gmail.com",
    phone: "+639993939533",
    location: "Bicol, PH",
    languages: ["English", "Bikol", "Filipino"],
    links: {
        github: "https://github.com/Devcavi19",
        linkedin: "https://www.linkedin.com/in/heraldcarlavila",
    },
    education: [
        {
            degree: "Bachelor's Degree in Computer Science",
            school: "Camarines Sur Polytechnic Colleges",
            period: "08/2022 – 07/2026",
            location: "Bicol, Philippines",
            gwa: "1.5",
            thesis: "Beyond LLMs: A RAG Chatbot for Efficient Literature Search and Thesis Retrieval in CSPC Library",
            description: "Specialized in Computer Science & Applied AI, achieving a 1.5 GWA. Co-developed a thesis retrieval RAG application recognized with Best Paper and Best Presenter at the 9th Bicol ICT Research Colloquium."
        }
    ] as EducationItem[],
    experience: [
        {
            role: "Software Developer Intern",
            company: "City Government of Naga: I-Governance Office",
            period: "02/2026 – 03/2026",
            location: "Naga City, Philippines",
            type: "Internship / Govt",
            description: "Developed and deployed a production RAG chatbot plugin for the City Government of Naga.",
            achievements: [
                "Built a RAG chatbot WordPress plugin (PHP/JavaScript) for Naga City Govt, integrating Qdrant vector search with multiple LLMs (Gemini, OpenAI, Mistral, OpenRouter).",
                "Designed a dual-write storage architecture (Supabase + WordPress DB fallback) for chat history, analytics, and LLM session summaries.",
                "Implemented security controls including rate limiting, SSRF URL validation, prompt-injection mitigation, and CSRF/nonce verification."
            ],
            tech: ["PHP", "JavaScript", "WordPress", "Qdrant", "Supabase", "Google Gemini", "OpenAI", "Mistral", "OpenRouter", "RAG"]
        }
    ] as WorkExperienceItem[],
    skills: {
        technical: [
            "Python", "React", "HTML/CSS/JavaScript", "SQL",
            "Supabase", "RAG Architecture", "Artificial Intelligence", "Prompt Engineering"
        ],
        advanced: [
            "Retrieval-Augmented Generation (RAG)", "Qdrant & FAISS Vector Stores",
            "Multi-LLM Integration (Gemini, OpenAI, Mistral)", "WordPress & PHP Plugin Engineering",
            "Full-Stack Web Development", "AI Security & Prompt Engineering"
        ],
        certifications: [
            "GitHub Foundations",
            "GitHub Copilot Certification",
            "OCI Generative AI Professional '25",
            "IBM: AI Fundamentals with Capstone",
            "Cisco: Data Science Essentials with Python",
            "Cisco: Data Analytics Essentials"
        ]
    },
    awards: [
        {
            title: "Best Paper & Best Presenter",
            date: "02/2026",
            entry: "9th Bicol ICT Research Colloquium (CSPC College of Computer Studies)",
            description: "Awarded Best Paper and Best Presenter for the research paper on RAG Chatbot literature search and thesis retrieval."
        },
        {
            title: "AI4AI FAIR: Vibe Coding Champion",
            date: "16/06/2026",
            entry: "Albay Institute for AI",
            description: "1st Place Champion for rapid AI-assisted development and application architecture execution."
        }
    ] as AwardItem[],
    projects: [
        {
            title: "RAG Chatbot for Conversational Literature Search",
            subtitle: "Beyond LLMs: A RAG Chatbot for Efficient Literature Search and Thesis Retrieval in CSPC Library",
            period: "08/2025 – 04/2026",
            tech: ["Python", "Flask", "LangChain", "FAISS", "Supabase", "Google Gemini API", "RAG", "Flask-SocketIO"],
            description: "Co-developed a retrieval-augmented chatbot web app using undergraduate theses as a knowledge base, enabling faster literature search. Built a FAISS vector store with sentence-transformers embeddings and LangChain for document retrieval, paired with Google Gemini (gemini-2.5-flash) for deterministic streaming LLM responses. Won Best Paper & Best Presenter at the 9th Bicol ICT Research Colloquium.",
            link: "https://adall.azurewebsites.net/about",
            repo: "https://github.com/Devcavi19/adal_ui_react",
            images: ["/project_img/adal_0.png", "/project_img/adal_1.png", "/project_img/adal_2.png", "/project_img/adal_3.png"],
            featured: true
        },
        {
            title: "Loam — Custom Shopify Furniture Storefront",
            subtitle: "Personal portfolio project · loam-vveqvivd.myshopify.com (password: tiacla)",
            period: "07/2026 – Present",
            tech: ["Shopify", "Liquid", "JavaScript", "Dawn", "AJAX Cart API", "Metafields", "CSS"],
            description: "A custom Shopify theme built on Dawn with Liquid, vanilla JavaScript, and OS 2.0 sections simulating a merchant handoff. Shipped 'Shop the Room' interactive hotspots adding to cart without page reload, architected product specs as admin-editable metafields, and achieved 100/100 Lighthouse accessibility and SEO scores.",
            link: "https://loam-vveqvivd.myshopify.com",
            repo: "",
            images: [],
            featured: true
        },
        {
            title: "Trashtag",
            subtitle: "Community Eco Initiative Web Platform",
            period: "2025",
            tech: ["React", "TypeScript", "Tailwind CSS"],
            description: "A modern web application delivering a seamless user experience with a polished, responsive interface for community eco initiatives.",
            link: "https://trashtag.heraldavila.me",
            repo: "",
            images: [],
            featured: true
        }
    ] as ProjectItem[],
    blogs: [
        {
            id: "rag-architecture",
            title: "Building Production RAG Systems: Vector Search & Dual-Write Architecture",
            date: "August 2026",
            readTime: "5 min read",
            category: "AI & NLP Engineering",
            summary: "Key lessons from building production RAG plugins for government clients, integrating Qdrant vector search, Supabase, and multi-provider LLMs (Gemini, OpenAI, Mistral).",
            content: "When building production RAG systems for civic and institutional use, reliability, latency, and security are paramount. This article explores dual-write architectures, vector embedding strategy with Qdrant, and prompt injection mitigation."
        },
        {
            id: "shopify-performance",
            title: "Achieving 100/100 Lighthouse Scores on Custom Shopify Themes",
            date: "July 2026",
            readTime: "4 min read",
            category: "Shopify & Performance",
            summary: "How to structure Liquid sections, utilize AJAX Cart APIs, and leverage Shopify Metafields to eliminate layout shifts and pass strict WCAG AA accessibility audits.",
            content: "Optimizing Shopify Dawn themes requires a zero-bloat approach. By relying on native Liquid rendering, deferred JavaScript loading, and dynamic metafields, you can achieve perfect 100/100 scores."
        },
        {
            id: "vibe-coding-hackathons",
            title: "Vibe Coding & Rapid Prototyping with Claude Code and AI Assistants",
            date: "June 2026",
            readTime: "3 min read",
            category: "Dev & AI Workflow",
            summary: "Strategies that won the AI4AI FAIR Vibe Coding Championship: pairing developer intuition with LLMs to ship complete full-stack prototypes in record time.",
            content: "Vibe coding isn't about letting AI write random code—it's about directing architectural intent, enforcing strict API contracts, and rapidly iterating with pair-programming models."
        }
    ] as BlogItem[],
    devices: [
        {
            category: "Hardware & Workstation",
            items: [
                {
                    name: "Primary Development Machine",
                    spec: "Apple Silicon Workstation / High-Perf Dev PC",
                    description: "Main development environment for Python RAG pipelines, React/TypeScript frontends, and local LLM testing."
                },
                {
                    name: "Display Setup",
                    spec: "High-Resolution Color-Accurate Monitor",
                    description: "Used for multi-window code reviews, pixel-precise UI layout alignment, and documentation."
                },
                {
                    name: "Peripherals & Audio",
                    spec: "Custom Mechanical Keyboard & Noise-Cancelling Headphones",
                    description: "Tactile switches for extended coding sessions and deep-focus vibe coding."
                }
            ]
        },
        {
            category: "Software Toolchain & Editors",
            items: [
                {
                    name: "Code Editors & Assistants",
                    spec: "VS Code / Cursor / Claude Code / Antigravity CLI",
                    description: "Configured with TypeScript/Python tooling, GitHub Copilot, Vim bindings, and custom agent extensions."
                },
                {
                    name: "Terminal & Version Control",
                    spec: "zsh + Warp Terminal & Git/GitHub",
                    description: "Fast command-line workflows with custom aliases, script automation, and Git version control."
                },
                {
                    name: "Design & Prototyping",
                    spec: "Figma & Tailwind Studio",
                    description: "UI/UX component design, wireframing, and design system token drafting."
                }
            ]
        },
        {
            category: "AI & Vector Search Infrastructure",
            items: [
                {
                    name: "LLM Providers & APIs",
                    spec: "Google Gemini 2.5 Flash, OpenAI, Mistral, OpenRouter",
                    description: "Streaming responses, prompt engineering, document indexing, and function calling."
                },
                {
                    name: "Vector Stores & Databases",
                    spec: "Qdrant Vector DB, FAISS Engine, Supabase Vector",
                    description: "Dense vector embeddings, hybrid retrieval pipelines, and dual-write database architectures."
                }
            ]
        }
    ] as DeviceCategory[]
};
