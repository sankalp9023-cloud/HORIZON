/**
 * Currently Building Data
 * Upcoming products, experiments, and exploratory projects in active development.
 * Easily expandable array structure.
 */

export const currentlyBuilding = [
  {
    id: "build-01",
    name: "[Placeholder] Project Singularity",
    tagline: "Autonomous cognitive workspace agent",
    description: "Investigating how personal context graphs can bridge task intent and system actions seamlessly across native operating systems.",
    status: "Active Prototyping",
    phase: "Phase 2 / Architecture Validation",
    direction: "Targeting a low-overhead daemon with natural language execution loops.",
    technologies: ["Rust", "Python", "Local LLMs"],
    updated: "Updated this week",
    progressPercent: 65,
    specs: [
      { key: "Target", value: "Cross-platform CLI/Daemon" },
      { key: "State", value: "Memory & Context Layer" }
    ]
  },
  {
    id: "build-02",
    name: "[Placeholder] Monolith Audio Synth",
    tagline: "Physical computing & tactile sound generator",
    description: "Designing a custom physical synthesizer enclosure with mechanical potentiometers, FPGA DSP synthesis, and analog filter topologies.",
    status: "Schematic & PCB Design",
    phase: "Hardware Revision 0.2",
    direction: "A tactile instrument focusing on drone textures and harmonic sub-oscillators.",
    technologies: ["KiCad", "C++", "Teensy 4.1", "Eurorack"],
    updated: "Updated 2 weeks ago",
    progressPercent: 40,
    specs: [
      { key: "Hardware", value: "Custom 4-layer PCB" },
      { key: "Interface", value: "Cherry MX & OLED" }
    ]
  },
  {
    id: "build-03",
    name: "[Placeholder] Episteme Reader",
    tagline: "Distraction-free dialectic reading device",
    description: "An e-ink companion designed to cross-reference classical philosophical treatises with modern neuroscience papers through margin annotations.",
    status: "Concept Exploration",
    phase: "Display & Firmware Evaluation",
    direction: "Exploring open-source e-paper controller hardware with Calibre sync.",
    technologies: ["ESP32-S3", "EPD", "Embedded C"],
    updated: "Updated 3 weeks ago",
    progressPercent: 25,
    specs: [
      { key: "Display", value: "7.8-inch Carta 1200" },
      { key: "Battery Life", value: "4+ Weeks" }
    ]
  }
];
