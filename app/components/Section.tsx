import { ReactNode } from "react";

export default function Section({
  title,
  subtitle,
  children,
  id,
  background = "",
}: {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  id?: string;
  background?: string;
}) {
  return (
    <section id={id} className={`${background}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {(title || subtitle) && (
          <div className="mb-8">
            {title && <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>}
            {subtitle && <p className="mt-2 text-black/70 dark:text-white/70 max-w-2xl">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}


