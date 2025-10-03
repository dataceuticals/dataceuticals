export type NavItem = {
  key: string;
  label: string;
  href: string;
  showOnHome?: boolean;
  homeOrder?: number;
  children?: NavItem[];
};

export const primaryNav: NavItem[] = [
  { key: "guidance-hub", label: "Guidance Hub", href: "/guidance", showOnHome: true, homeOrder: 1 },
  {
    key: "who-we-are",
    label: "Who We Are",
    href: "/about",
    showOnHome: false,
    children: [
      { key: "about", label: "About Us", href: "/about" },
    ],
  },
  { key: "community", label: "Community", href: "/community", showOnHome: true, homeOrder: 2 },
  { key: "blog", label: "Blog", href: "/blog", showOnHome: true, homeOrder: 3 },
  { key: "contact", label: "Contact", href: "/contact", showOnHome: true, homeOrder: 4 },
];

export const authNav: NavItem[] = [
  { key: "login", label: "Sign In", href: "/auth/login" },
  { key: "signup", label: "Sign Up", href: "/auth/signup" },
];

export const homepageHero = {
  title: "Your Trusted Partner for Youth Success - Career, Startup, Exams",
  subtitle:
    "We don't just show opportunities. We prepare you, guide you, and walk with you until you achieve them.",
  ctas: [
    { label: "Start Your Journey", href: "/get-started" },
    { label: "Explore Tracks", href: "/tracks" },
  ],
};

export const footerLinks: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { key: "about", label: "About", href: "/about" },
      { key: "contact", label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { key: "terms", label: "Terms", href: "/legal/terms" },
      { key: "privacy", label: "Privacy", href: "/legal/privacy" },
    ],
  },
];

export const getHomepageSections = () =>
  primaryNav
    .filter((n) => n.showOnHome)
    .sort((a, b) => (a.homeOrder ?? 99) - (b.homeOrder ?? 99));


