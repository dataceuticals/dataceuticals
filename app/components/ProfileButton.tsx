"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../contexts/AuthContext";

export default function ProfileButton() {
  const { user, signOut } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 shadow-md"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="inline-flex items-center gap-3 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/50 group"
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        aria-expanded={showProfileMenu}
        aria-haspopup="true"
        style={{
          backgroundColor: 'var(--brand-gradient-soft)',
          color: 'var(--navbar-text)',
          border: '1px solid var(--brand-accent)',
          minWidth: '140px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--navbar-hover)';
          e.currentTarget.style.color = 'var(--navbar-hover-text)';
          e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 8px 25px -8px rgba(0, 0, 0, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--brand-gradient-soft)';
          e.currentTarget.style.color = 'var(--navbar-text)';
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden"
          style={{
            background: 'var(--brand-gradient)',
            color: 'var(--brand-primary-foreground)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
        >
          {user?.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.displayName || 'User'}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            user?.displayName?.charAt(0).toUpperCase() || "U"
          )}
        </div>
        <span className="hidden sm:inline-block font-medium truncate max-w-[80px] transition-all duration-300 group-hover:text-shadow-sm">
          {user?.displayName || "User"}
        </span>
        <svg
          className={`w-4 h-4 transition-all duration-300 group-hover:scale-110 ${showProfileMenu ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showProfileMenu && (
        <div 
          className="absolute right-1/2 transform translate-x-1/2 -mt-1 w-64 rounded-2xl py-2 z-50 transition-all duration-300 animate-gentle-fade-in overflow-hidden"
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--card-border)',
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            transform: 'translateY(0)',
            opacity: '1'
          }}
        >
          <div 
            className="px-4 py-3 relative"
            style={{
              borderBottom: '1px solid var(--border)',
              background: 'linear-gradient(135deg, var(--brand-gradient-soft) 0%, transparent 100%)'
            }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm"
                style={{
                  background: 'var(--brand-gradient)',
                  color: 'var(--brand-primary-foreground)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                {user?.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  user?.displayName?.charAt(0).toUpperCase() || "U"
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p 
                  className="text-sm font-semibold truncate"
                  style={{ color: 'var(--foreground)' }}
                >
                  {user?.displayName}
                </p>
                <p 
                  className="text-xs mt-0.5 truncate"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 text-sm transition-all duration-300 group/item rounded-lg mx-2 overflow-hidden"
            onClick={() => setShowProfileMenu(false)}
            style={{ color: 'var(--foreground)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--navbar-hover)';
              e.currentTarget.style.color = 'var(--navbar-hover-text)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--foreground)';
            }}
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover/item:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2 px-4 py-2 text-sm transition-all duration-300 group/item rounded-lg mx-2 overflow-hidden"
            onClick={() => setShowProfileMenu(false)}
            style={{ color: 'var(--foreground)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--navbar-hover)';
              e.currentTarget.style.color = 'var(--navbar-hover-text)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--foreground)';
            }}
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover/item:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>
          <div 
            className="mx-4 h-px my-2"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, var(--border) 30%, var(--border) 70%, transparent 100%)'
            }}
          />
          <button
            className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm transition-all duration-300 group/item rounded-lg mx-2 overflow-hidden"
            onClick={async () => {
              try {
                await signOut();
                setShowProfileMenu(false);
              } catch (error) {
                console.error('Sign out error:', error);
              }
            }}
            style={{ color: '#ef4444' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover/item:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
