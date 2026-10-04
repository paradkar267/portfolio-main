export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Toolkit", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const HERO_MARQUEE = [
  "Full-Stack Engineering",
  "Applied AI & RAG",
  "Machine & Deep Learning",
  "Next.js / React",
  "Type-Safe Code",
  "Product Thinking",
  "Performance First",
];

export const STATS = [
  { value: 8.66, decimals: 2, suffix: "", label: "CGPA — Distinction", sub: "GH Raisoni University · CE" },
  { value: 5, decimals: 0, suffix: "+", label: "Products Shipped Live", sub: "Full-Stack & Client Work" },
  { value: 6, decimals: 0, suffix: "mo", label: "Industry Internship", sub: "Bizleap Technologies" },
  { value: 25, decimals: 0, suffix: "+", label: "Technologies Mastered", sub: "Frontend · Backend · ML/AI" },
];

export const SKILL_GROUPS = [
  {
    id: "01",
    title: "Frontend Engineering",
    blurb: "Interfaces that feel instant and alive.",
    skills: [
      { name: "Next.js" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Tailwind CSS" },
      { name: "Motion" },
    ],
  },
  {
    id: "02",
    title: "Backend & Data",
    blurb: "APIs and schemas built to scale cleanly.",
    skills: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "REST APIs" },
      { name: "JWT Auth" },
    ],
  },
  {
    id: "03",
    title: "AI, ML & Deep Learning",
    blurb: "Predictive modeling, neural architectures & RAG.",
    skills: [
      { name: "TensorFlow" },
      { name: "Keras" },
      { name: "scikit-learn" },
      { name: "Neural Networks" },
      { name: "Transfer Learning" },
      { name: "Random Forest" },
      { name: "Gradient Boosting" },
      { name: "Classification" },
      { name: "Gemini Flash" },
      { name: "RAG Pipelines" },
      { name: "LangChain" },
      { name: "Vector Search" },
      { name: "Python" },
      { name: "Pandas / NumPy" },
    ],
  },
  {
    id: "04",
    title: "Tools & Workflow",
    blurb: "Shipping discipline, every single day.",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Vercel" },
      { name: "Postman" },
      { name: "Linux / Bash" },
      { name: "Figma" },
    ],
  },
];

export interface Project {
  id: string;
  title: string;
  category: string;
  /** broad bucket used for filtering — keeps `category` free to stay specific */
  type: "AI Products" | "Web & Commerce" | "SaaS & Tools";
  year: string;
  role?: string;
  client?: string;
  description: string;
  long: string;
  highlights?: string[];
  architecture?: string;
  stack: string[];
  image: string;
  /** public live deployment */
  live?: string;
  /** github repository url */
  github?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "jewel-bot",
    title: "Jewel Bot — AI Jewellery Assistant",
    category: "AI Chatbot & Discovery",
    type: "AI Products",
    year: "2026",
    role: "AI & Full-Stack Developer",
    client: "Fine Jewellery Client Project",
    description:
      "Conversational AI sales and discovery assistant powered by Gemini 2.5 Flash, featuring customer consultation chat and an administrative management vault.",
    long: "A production-grade AI conversational platform engineered for a luxury jewellery brand. Designed to replicate an in-store diamond and jewellery consultant, the bot interprets complex natural language inquiries regarding carat, metal purity, certification, pricing, and occasions, providing intelligent real-time recommendations. The system is split into two synchronized interfaces: a seamless customer-facing discovery chat and a secure administrative vault for inventory management, lead tracking, and pricing rules.",
    highlights: [
      "Gemini 2.5 Flash AI Engine: Hand-tuned prompt engineering ensuring grounded, on-brand jewellery consultation and zero hallucinations.",
      "Dual Client & Admin Interfaces: Real-time customer chat interface paired with an administrative management dashboard.",
      "Neon Postgres Backend: Serverless PostgreSQL integration storing product inventory, chat logs, and customer inquiries with type-safe queries.",
      "Next.js App Router Architecture: Fast streaming responses, server components, and responsive mobile-optimized UI.",
    ],
    architecture:
      "Built with Next.js App Router and TypeScript. Chat completions are streamed from Google's Gemini 2.5 Flash API with token-level streaming for immediate perceived responsiveness. Customer inquiries, product catalog embeddings, and consultation histories are persisted in a serverless Neon PostgreSQL database via secure REST API routes.",
    stack: ["Next.js", "Gemini 2.5 Flash", "TypeScript", "Neon Postgres", "Tailwind CSS", "Vercel"],
    image: "/images/project-jewelbot.jpg",
    live: "https://jewel-bota.vercel.app",
    github: "https://github.com/paradkar267/jewel-bot",
  },
  {
    id: "rag-video-assistant",
    title: "AI RAG Video Teaching Assistant",
    category: "GenAI & Vector Search",
    type: "AI Products",
    year: "2025–2026",
    role: "Lead AI Developer",
    client: "Academic Project · GH Raisoni University",
    description:
      "Retrieval-Augmented Generation (RAG) assistant transforming video lecture series into searchable knowledge with semantic vector retrieval and timestamp citations.",
    long: "An intelligent course assistant that solves student comprehension bottlenecks in long-form technical video courses. The system ingests lecture videos, performs audio extraction, automated transcription, and semantic chunking with contextual overlap. High-dimensional vector embeddings are stored in a vector database for semantic similarity matching. When students ask conceptual or troubleshooting questions, the pipeline retrieves the most relevant lecture chunks and generates explainable, factual answers accompanied by exact lesson and timestamp citations.",
    highlights: [
      "End-to-End RAG Pipeline: Implemented audio transcription, semantic chunking, and embedding generation for full-length technical courses.",
      "Semantic Vector Retrieval: High-accuracy similarity search matching student questions with precise lecture segments.",
      "Explainable Timestamp Citations: Every generated answer provides exact video lesson references and clickable timestamp bookmarks.",
      "Hallucination Guardrails: Context-bounded prompting ensuring answers rely strictly on course lecture material.",
    ],
    architecture:
      "Python and LangChain backend orchestrating transcription pipelines and text embedding. Vector chunks are indexed in a vector store for fast cosine-similarity retrieval. Grounded context is synthesized via LLMs with custom prompt templates that enforce source attribution with lesson IDs and minute:second timestamps.",
    stack: ["Python", "LangChain", "Vector Database", "FastAPI", "React", "TypeScript", "Tailwind CSS"],
    image: "/images/project-courselens.jpg",
    github: "https://github.com/paradkar267/LLM-project",
  },
  {
    id: "bt-templates",
    title: "BT Templates",
    category: "Design System & SaaS",
    type: "SaaS & Tools",
    year: "2026",
    role: "Frontend & Product Engineer",
    client: "Bizleap Technologies",
    description:
      "Production-ready website template marketplace with live responsive preview sandboxes, design token customizer, and one-click deployment handoffs.",
    long: "A curated marketplace and library of modern website templates engineered at Bizleap Technologies for founders, agencies, and creators. Features interactive live sandbox previews with simulated device viewports, category intelligence, design token customization, and streamlined code delivery handoffs. Designed for sub-second first contentful paint and frictionless template evaluation.",
    highlights: [
      "Interactive Live Sandboxes: Embedded device previewers allowing users to test templates across mobile, tablet, and desktop breakpoints.",
      "Design Token System: Modular Tailwind CSS token structure enabling rapid theme re-skinning in minutes.",
      "Sub-Second Performance: React Server Components and Next.js optimization ensuring instant page loads with rich media.",
      "Instant Deployment Kits: One-click export handoffs configured for immediate deployment to Vercel and Netlify.",
    ],
    architecture:
      "Architected on Next.js with React Server Components for near-instant rendering. PostgreSQL manages template catalog metadata, analytics, and license validation. Dynamic iframe isolation ensures safe, responsive preview rendering of live templates.",
    stack: ["Next.js", "React", "PostgreSQL", "Tailwind CSS", "Framer Motion", "Vercel"],
    image: "/images/project-bttemplates.jpg",
    live: "https://bt-templates.vercel.app",
  },
  {
    id: "rajwadi",
    title: "Rajwadi Rajputi Poshak",
    category: "Luxury E-Commerce",
    type: "Web & Commerce",
    year: "2025",
    role: "Full-Stack Web Developer",
    client: "Rajwadi Rajputi Poshak",
    description:
      "Luxury ethnic-wear e-commerce storefront featuring editorial lookbooks, festive drop countdowns, and Razorpay payment integration.",
    long: "A digital flagship commerce platform built for Rajwadi Rajputi Poshak, a heritage royal clothing label. Combines luxury aesthetics with performance-tuned engineering: editorial collection lookbooks, festive drops with live countdown timers, dynamic product filtering, real-time inventory management, and a seamless Razorpay checkout funnel tuned for high conversion.",
    highlights: [
      "Editorial Lookbooks & Drops: High-fashion collection presentation with countdown mechanics for limited festive releases.",
      "Razorpay Payment Gateway: Secure transactional checkout with automated webhook processing and instant order confirmation.",
      "Mobile-First Luxury UX: Lightweight image pipelines and CDN caching optimized for fast loading on 4G cellular networks.",
      "Inventory & Order Tracking: Real-time stock status monitoring with automated notification pipelines.",
    ],
    architecture:
      "Next.js SSR storefront connected to a Node.js/Express backend and MongoDB cluster. Images are optimized via modern WebP delivery pipelines. Secure payment session handling implemented with Razorpay API and verified signature webhooks.",
    stack: ["Next.js", "Node.js", "Express", "MongoDB", "Razorpay", "Tailwind CSS"],
    image: "/images/project-rajwadi.jpg",
    live: "https://www.rajwadirajputiposhak.com",
  },
  {
    id: "hey-investor",
    title: "Hey Investor",
    category: "Real Estate Portal",
    type: "Web & Commerce",
    year: "2026",
    role: "Full-Stack Developer",
    client: "Hey Investor Nagpur",
    description:
      "Nagpur real estate discovery platform with verified listings, locality-level filters, interactive maps, and direct buyer enquiry routing.",
    long: "A property intelligence and discovery platform tailored specifically for the Nagpur real estate ecosystem. Enables buyers, commercial investors, and tenants to explore verified properties with localized insights, price per sq.ft analytics, locality amenities, and interactive map views. Includes an automated buyer enquiry pipeline that routes qualified leads directly to certified property advisors without intermediary friction.",
    highlights: [
      "Multi-Facet Search & Filters: Detailed filtering across budget, BHK configuration, furnishing, and Nagpur micro-markets.",
      "Direct Lead Generation Pipeline: Instant inquiry routing to certified consultants with contact verification.",
      "Interactive Map Integration: Google Maps API mapping property boundaries and proximity to schools, hospitals, and metro stations.",
      "SEO-First Architecture: Programmatic metadata and semantic HTML driving top search ranks for regional real estate queries.",
    ],
    architecture:
      "React frontend with Tailwind CSS and responsive design patterns. RESTful API powered by Node.js and Express connected to MongoDB for property schema and user analytics. Map interfaces integrated using Google Maps JavaScript API.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Google Maps API", "Tailwind CSS"],
    image: "/images/project-heyinvestor.jpg",
    live: "https://www.heyinvestor.in",
  },
  {
    id: "pankaj-overseas",
    title: "Pankaj Overseas Exports",
    category: "Corporate Trade Portal",
    type: "Web & Commerce",
    year: "2025",
    role: "Frontend & Web Developer",
    client: "Pankaj Overseas Exports",
    description:
      "Global import-export corporate presence featuring comprehensive product catalogs, international trade routes, and B2B inquiry flows.",
    long: "A global corporate digital presence designed for Pankaj Overseas Exports, an international merchant trading firm. Showcases industrial export catalogs, quality certifications, international shipping corridors, and supply chain capabilities. Features a structured B2B Request For Quote (RFQ) pipeline that captures international buyer specifications, cargo volumes, and incoterms to generate high-value qualified trade leads.",
    highlights: [
      "B2B Product & Export Catalog: Structured technical specifications, minimum order quantities (MOQ), and packaging details.",
      "Global Trade Route Mapping: Interactive visualization of export shipping corridors and destination ports across continents.",
      "High-Converting RFQ Pipeline: Streamlined quote request workflows that capture buyer parameters and trade terms.",
      "Global Edge Delivery: Static site generation hosted on Vercel Edge Network for rapid loading across international regions.",
    ],
    architecture:
      "Static site generation with Next.js and TypeScript, styled with Tailwind CSS. Optimized for strict web vitals and fast delivery across continents via CDN edge caching with comprehensive schema.org metadata for international search engines.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "SEO Best Practices"],
    image: "/images/project-pankaj.jpg",
    live: "https://www.pankajoverseasexports.com",
  },
  {
    id: "united-logistics",
    title: "United Logistics (New India 3D)",
    category: "3D Web Experience",
    type: "SaaS & Tools",
    year: "2026",
    role: "Creative Frontend Developer",
    client: "New India Logistics",
    description:
      "Immersive 3D logistics storytelling experience with WebGL fleet rendering, scroll-driven camera choreography, and live shipment visualization.",
    long: "An interactive 3D brand experience built for a logistics enterprise to visualize intermodal cargo journeys. Utilizing Three.js and WebGL, the application renders 3D transport vehicles traversing geographic terrains with smooth camera transitions tied to page scroll via GSAP ScrollTrigger. Engineered with performance budgets to maintain 60fps on mid-tier mobile hardware.",
    highlights: [
      "Interactive 3D WebGL Scene: Custom 3D delivery fleet and cargo models rendered with realistic lighting and physical materials.",
      "Scroll-Choreographed Camera: Cinematic camera flight paths synchronized to scroll depth using GSAP ScrollTrigger.",
      "Cross-Device Optimization: Dynamic level-of-detail (LOD) and shader fallbacks for reliable 60fps across mobile and desktop.",
      "Real-Time Route Storytelling: Interactive waypoints mapping supply chain checkpoints from origin to last-mile.",
    ],
    architecture:
      "Built with React and Three.js / React Three Fiber using custom shaders and lightweight glTF 3D assets. Camera motions and page narrative sections are driven by GSAP ScrollTrigger for 60fps smooth hardware-accelerated animations.",
    stack: ["Three.js", "React", "GSAP ScrollTrigger", "WebGL", "Vite", "Tailwind CSS"],
    image: "/images/project-logistics.jpg",
    live: "https://newindia-3d.vercel.app",
  },
];

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/paradkar267" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yash-paradkar001" },
  { label: "Instagram", href: "https://www.instagram.com/yash_paradkar68/" },
  { label: "Email", href: "mailto:yashparadkar63@gmail.com" },
];

export const SOCIAL_HANDLE = "@paradkar267";

/* compact discipline rows shown on the right of the hero */
export const HERO_SKILLS = [
  { label: "Frontend Engineering", stack: "React · Next.js · TypeScript" },
  { label: "Backend & APIs", stack: "Node.js · Express · PostgreSQL" },
  { label: "AI & Machine Learning", stack: "Gemini Flash · scikit-learn · TensorFlow" },
];

export const EMAIL = "yashparadkar63@gmail.com";
