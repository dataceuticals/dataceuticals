"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { primaryNav, authNav, type NavItem } from "../config/navigation";
import MegaMenu from "./MegaMenu";
import ProfileButton from "./ProfileButton";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../contexts/AuthContext";
import { useScrollDirection } from "../hooks/useScrollDirection";

function NavLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const hasChildren = (item.children?.length ?? 0) > 0;
  
  return (
    <div className="relative group">
      <Link
        href={item.href}
        className="relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/50"
        onClick={onNavigate}
        style={{
          color: 'var(--foreground)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--navbar-hover)';
          e.currentTarget.style.color = 'var(--navbar-hover-text)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--foreground)';
        }}
      >
        <span className="relative z-10">{item.label}</span>
        <div 
          className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-brand-gradient transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"
        />
      </Link>
      {hasChildren && (
        <div className="absolute left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
          <div className="min-w-[200px] rounded-lg border border-border bg-card shadow-xl p-2 backdrop-blur-md glass-morphism">
            {item.children!.map((child) => (
              <Link
                key={child.key}
                href={child.href}
                className="block px-3 py-2 rounded-md text-sm transition-all duration-150 ease-out hover:scale-[1.01] hover:translate-x-1"
                onClick={onNavigate}
                style={{
                  color: 'var(--foreground)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--navbar-hover)';
                  e.currentTarget.style.color = 'var(--navbar-hover-text)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--foreground)';
                }}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isPageRefresh, setIsPageRefresh] = useState(false);
  const { user, loading, signOut } = useAuth();
  const { isVisible, scrollY } = useScrollDirection();
  
  const isLoggedIn = !!user;

  useEffect(() => {
    if (performance.navigation.type === 1) {
      setIsPageRefresh(true);
    }
  }, []);

  return (
    <header className={`navbar ${!isVisible ? 'hidden' : ''}`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group transition-all duration-200 ease-out" aria-label="DataCeuticals home">
              <div className="relative overflow-hidden rounded-full">
                <Image 
                  src="/images/logo/logo.png" 
                  alt="DataCeuticals logo" 
                  width={32} 
                  height={32} 
                  className="transition-transform duration-300 ease-out group-hover:scale-105 group-hover:rotate-3" 
                />
              </div>
              <span 
                className="text-base font-bold transition-colors duration-200 ease-out"
                style={{
                  color: 'var(--foreground)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--brand-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--foreground)';
                }}
              >
                DataCeuticals
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {primaryNav.map((item) => (
              <div key={item.key} className="relative group/menu">
                <NavLink item={item} />
                {item.key === "guidance-hub" && (
                  <div className="absolute left-1/2 -translate-x-1/2 pt-3 hidden group-hover/menu:block z-50">
                    <MegaMenu variant="dropdown" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {!loading && (
              <>
                {isLoggedIn ? (
                  <ProfileButton />
                ) : (
                  <div className="flex items-center gap-2">
                    {authNav.map((item) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out hover:scale-[1.02] ${
                          item.key === 'signup'
                            ? 'btn btn-primary'
                            : ''
                        }`}
                        style={{
                          ...(item.key !== 'signup' && {
                            color: 'var(--foreground)'
                          })
                        }}
                        onMouseEnter={(e) => {
                          if (item.key !== 'signup') {
                            e.currentTarget.style.backgroundColor = 'var(--navbar-hover)';
                            e.currentTarget.style.color = 'var(--navbar-hover-text)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (item.key !== 'signup') {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--foreground)';
                          }
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-sm border border-border text-foreground hover:bg-navbar-hover hover:text-navbar-hover-text hover:border-brand-accent/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/50"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-5 w-5">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4" role="dialog" aria-label="Mobile menu">
            <div className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <div key={item.key}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-navbar-hover hover:text-navbar-hover-text"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {(item.children?.length ?? 0) > 0 && (
                    <div className="pl-3">
                      {item.children!.map((c) => (
                        <Link
                          key={c.key}
                          href={c.href}
                          className="block px-3 py-1.5 rounded-md text-sm text-foreground hover:bg-navbar-hover hover:text-navbar-hover-text"
                          onClick={() => setOpen(false)}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="h-px my-2 bg-border" />
              <div className="flex items-center gap-2 px-3 py-2">
                <ThemeToggle />
                {!loading && (
                  <>
                    {isLoggedIn ? (
                      <ProfileButton />
                    ) : (
                      <div className="flex flex-col gap-2 w-full">
                        {authNav.map((item) => (
                          <Link
                            key={item.key}
                            href={item.href}
                            className={`px-3 py-2 rounded-md text-sm font-medium text-center ${
                              item.key === 'signup'
                                ? 'bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90'
                                : 'text-foreground hover:bg-navbar-hover hover:text-navbar-hover-text'
                            }`}
                            onClick={() => setOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}


