/**
 * Selected Work Data
 * Clearly labeled placeholder projects designed for easy replacement.
 * Supports different layout variants: 'featured' (full width visual) and 'standard' (grid).
 */

export const projects = [
  {
    id: "project-01",
    name: "[Placeholder] Chronos Engine",
    subtitle: "High-performance distributed event streaming framework",
    description: "An experimental time-series indexing and streaming architecture engineered for micro-latency state synchronization across distributed nodes.",
    category: "Software & Systems",
    year: "2025",
    status: "Live", // 'Live' | 'In Progress' | 'Coming Soon'
    featured: true,
    technologies: ["Rust", "WebAssembly", "TypeScript", "gRPC", "RocksDB"],
    links: {
      live: "https://example.com/chronos",
      github: "https://github.com/example/chronos",
      docs: "https://example.com/chronos/docs"
    },
    metrics: [
      { label: "Throughput", value: "1.4M ops/sec" },
      { label: "Latency", value: "< 2.8ms p99" },
      { label: "Architecture", value: "Lock-free" }
    ],
    accentColor: "from-indigo-500/20 to-blue-600/10",
    visualType: "code-stream",
  },
  {
    id: "project-02",
    name: "[Placeholder] Aura OS Concept",
    subtitle: "Spatial workspace interface exploration",
    description: "A research prototype exploring fluid window management, contextual peripheral memory spaces, and gaze-adaptive typographic hierarchies for modern operating systems.",
    category: "Interface Design & UI",
    year: "2024",
    status: "In Progress",
    featured: false,
    technologies: ["React", "WebGL", "Canvas API", "Tailwind CSS"],
    links: {
      live: "https://example.com/aura-os",
      github: "https://github.com/example/aura-os"
    },
    metrics: [
      { label: "Display Mode", value: "60 FPS Fluid" },
      { label: "Type", value: "Spatial UI" }
    ],
    accentColor: "from-purple-500/20 to-indigo-600/10",
    visualType: "spatial-grid",
  },
  {
    id: "project-03",
    name: "[Placeholder] Vektor Protocol",
    subtitle: "Local-first neural knowledge extraction",
    description: "An embedded semantic search and vector relationship mapping tool that indexes local markdown notes and PDF archives without sending data to third-party cloud servers.",
    category: "Applications",
    year: "2024",
    status: "Live",
    featured: false,
    technologies: ["Go", "SQLite-VSS", "React", "Tauri", "ONNX"],
    links: {
      live: "https://example.com/vektor",
      github: "https://github.com/example/vektor"
    },
    metrics: [
      { label: "Privacy", value: "100% On-Device" },
      { label: "Format", value: "Local SQLite" }
    ],
    accentColor: "from-cyan-500/20 to-blue-600/10",
    visualType: "node-network",
  },
  {
    id: "project-04",
    name: "[Placeholder] Atelier Framework",
    subtitle: "Mathematical composition & generative typography",
    description: "A lightweight computational design kit for algorithmic layouts, dynamic modular scales, and responsive editorial typography on the web.",
    category: "Experiments & Tools",
    year: "2024",
    status: "Coming Soon",
    featured: false,
    technologies: ["JavaScript", "CSS Houdini", "SVG", "Node.js"],
    links: {
      github: "https://github.com/example/atelier"
    },
    metrics: [
      { label: "Bundle Size", value: "3.2 kB gzipped" },
      { label: "Zero-dependency", value: "Pure JS" }
    ],
    accentColor: "from-violet-500/20 to-pink-600/10",
    visualType: "generative-art",
  }
];

export const projectCategories = [
  "All",
  "Software & Systems",
  "Interface Design & UI",
  "Applications",
  "Experiments & Tools"
];
