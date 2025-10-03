"use client";
import Link from "next/link";
import Image from "next/image";
import { footerLinks } from "../config/navigation";
import { useState } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-card-border bg-gradient-to-b from-background to-brand-gradient-soft backdrop-blur-sm">
      <div className="absolute inset-0 bg-card/30 backdrop-blur-md"></div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group" aria-label="DataCeuticals home">
              <div className="p-2 rounded-xl bg-brand-gradient group-hover:scale-110 transition-transform duration-300">
                <Image src="/images/logo/logo.png" alt="DataCeuticals logo" width={24} height={24} />
              </div>
              <span className="text-lg font-bold text-gradient">DataCeuticals</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Empowering the next generation of medical professionals with cutting-edge learning technology.
            </p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold mb-4 text-foreground">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.key}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-brand-accent transition-colors duration-200 hover:translate-x-1 inline-block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-sm font-bold mb-4 text-foreground">Stay Updated</h3>
            <NewsletterForm />
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {year} DataCeuticals. Crafted with ❤️ for medical aspirants.</p>
          <div className="flex gap-6">
            <Link href="/legal/privacy" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors duration-200">Privacy Policy</Link>
            <Link href="/legal/terms" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setMessage("");
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage("✅ Subscribed successfully!");
        setEmail("");
      } else {
        setMessage(data.error || "Subscription failed");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full rounded-xl border border-card-border bg-card/50 backdrop-blur-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-200"
        aria-label="Email address"
        required
        suppressHydrationWarning
      />
      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full btn btn-primary text-sm py-3 rounded-xl disabled:opacity-50" 
        aria-label="Subscribe"
      >
        {isSubmitting ? "Joining..." : "Join Newsletter"}
      </button>
      {message && (
        <p className={`text-xs ${message.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </form>
  );
}


