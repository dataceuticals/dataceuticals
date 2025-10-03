export type ResourceItem = {
  key: string;
  label: string;
  href: string;
  icon?: string; // emoji or icon name placeholder
};

export const competitiveExams: ResourceItem[] = [
  { key: "gate", label: "GATE", href: "/resources", icon: "🔍" },
  { key: "niper", label: "NIPER", href: "/resources", icon: "⚙️" },
  { key: "gpat", label: "GPAT", href: "/resources", icon: "✉️" },
  { key: "cuet", label: "CUET", href: "/resources", icon: "🚀" },
];

export const studyGuides: ResourceItem[] = [
  { key: "kd-tripathi", label: "KD Tripathi", href: "/guides", icon: "💬" },
  { key: "pyqs", label: "PYQs", href: "/guides", icon: "g" },
  { key: "test-series", label: "Test Series", href: "/test-series", icon: "👥" },
  { key: "study-tools", label: "Study Tools", href: "/tools", icon: "🅰️" },
];


