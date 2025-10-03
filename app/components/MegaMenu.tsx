import Link from "next/link";
import { competitiveExams, studyGuides } from "../config/resources";

const guidanceTracks = [
  { key: "career", label: "Career Readiness", href: "/guidance/career", icon: "💼" },
  { key: "entrepreneurship", label: "Entrepreneurship", href: "/guidance/entrepreneurship", icon: "🚀" },
  { key: "exams", label: "Exam Preparation", href: "/guidance/exams", icon: "📚" },
  { key: "mentorship", label: "Mentorship", href: "/guidance/mentorship", icon: "👥" },
];

type MegaMenuVariant = "dropdown" | "section";

function Pill({ children, variant }: { children: React.ReactNode; variant: MegaMenuVariant }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 ${
        variant === "section" ? "h-10 w-10 text-lg" : "h-9 w-9 text-base"
      }`}
      style={{
        backgroundColor: 'var(--brand-gradient-soft)',
        color: 'var(--brand-primary)'
      }}
    >
      {children}
    </span>
  );
}

function ListItem({ label, href, icon, variant }: { label: string; href: string; icon?: string; variant: MegaMenuVariant }) {
  return (
    <Link
      href={href}
      className={`group flex items-center rounded-xl transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 ${
        variant === "section" ? "gap-4 px-3 py-3" : "gap-3 px-3 py-2.5"
      }`}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--navbar-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <Pill variant={variant}>{icon ?? "•"}</Pill>
      <span 
        className={`${variant === "section" ? "text-base" : "text-sm"} font-medium transition-colors duration-300`}
        style={{ color: 'var(--foreground)' }}
      >
        {label}
      </span>
    </Link>
  );
}

export default function MegaMenu({ variant = "dropdown" }: { variant?: MegaMenuVariant }) {
  return (
    <div className="flex justify-center items-center w-full relative">
      {/* Localized backdrop blur */}
      <div
        className={`absolute inset-0 rounded-3xl ${
          variant === "section" ? "ml-32" : "ml-32"
        }`}
        style={{
          backdropFilter: 'blur(50px)',
          WebkitBackdropFilter: 'blur(50px)',
          backgroundColor: 'var(--card)'
        }}
      />
      
      <div
        className={`rounded-3xl transition-all duration-500 glass-morphism hover:shadow-xl relative z-10 ${
          variant === "section"
            ? "p-6 sm:p-8 max-w-[min(90vw,64rem)] w-full ml-32"
            : "w-[min(90vw,64rem)] p-5 sm:p-6 max-w-full ml-32"
        }`}
        style={{
          backgroundColor: 'var(--card)',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1), 0 8px 16px -4px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        <div className={`grid grid-cols-1 lg:grid-cols-3 ${variant === "section" ? "gap-8 items-stretch" : "gap-6"}`}>
          <div className="overflow-hidden">
            <h3 
              className={`${variant === "section" ? "text-xl" : "text-sm"} font-semibold mb-3 transition-colors duration-300`}
              style={{ color: 'var(--foreground)' }}
            >
              Success Tracks
            </h3>
            <div 
              className="rounded-2xl transition-all duration-300 hover:shadow-md overflow-hidden"
              style={{
                backgroundColor: 'var(--card)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              {guidanceTracks.map((i, index) => (
                <div key={i.key} className="relative">
                  {index > 0 && (
                    <div 
                      className="mx-4 h-px"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, var(--brand-gradient-soft) 50%, transparent 100%)'
                      }}
                    />
                  )}
                  <div className="px-2 py-1">
                    <ListItem label={i.label} href={i.href} icon={i.icon} variant={variant} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <h3 
              className={`${variant === "section" ? "text-xl" : "text-sm"} font-semibold mb-3 transition-colors duration-300`}
              style={{ color: 'var(--foreground)' }}
            >
              Study Resources
            </h3>
            <div 
              className="rounded-2xl transition-all duration-300 hover:shadow-md overflow-hidden"
              style={{
                backgroundColor: 'var(--card)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              {studyGuides.map((i, index) => (
                <div key={i.key} className="relative">
                  {index > 0 && (
                    <div 
                      className="mx-4 h-px"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, var(--brand-gradient-soft) 50%, transparent 100%)'
                      }}
                    />
                  )}
                  <div className="px-2 py-1">
                    <ListItem label={i.label} href={i.href} icon={i.icon} variant={variant} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex overflow-hidden">
            <div
              className={`relative flex-1 overflow-hidden transition-all duration-500 hover:shadow-xl group ${
                variant === "section" ? "rounded-3xl p-6 sm:p-8" : "rounded-2xl p-5"
              }`}
              style={{
                background: 'linear-gradient(135deg, var(--brand-gradient-soft) 0%, rgba(255,255,255,0.05) 100%)',
                boxShadow: '0 4px 20px rgba(74, 0, 107, 0.1)'
              }}
            >
              <div
                className={`absolute -right-6 -top-6 rounded-full blur-2xl transition-all duration-700 group-hover:scale-110 ${
                  variant === "section" ? "h-40 w-40" : "h-28 w-28"
                }`}
                style={{
                  background: 'var(--brand-gradient)',
                  opacity: 0.1
                }}
              />
              <div className="flex h-full flex-col justify-between gap-4 relative z-10">
                <div className="space-y-2">
                  <div 
                    className={`${variant === "section" ? "text-lg" : "text-base"} font-semibold transition-all duration-300 group-hover:scale-105`}
                    style={{ color: 'var(--brand-primary)' }}
                  >
                    🚀 Explore All Resources
                  </div>
                  <div 
                    className={`${variant === "section" ? "text-sm" : "text-xs"} opacity-75 transition-opacity duration-300 group-hover:opacity-90`}
                    style={{ color: 'var(--brand-primary)' }}
                  >
                    Discover comprehensive study materials
                  </div>
                </div>
                <div>
                  <Link 
                    href="/resources" 
                    className={`btn btn-primary inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 ${variant === "section" ? "" : "text-sm"}`}
                  >
                    <span>View All</span>
                    <span className="transition-transform duration-300 hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}