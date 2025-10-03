"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

const stats = [
  { value: "10K+", label: "Youth Guided", icon: "🚀" },
  { value: "3", label: "Success Tracks", icon: "🎯" },
  { value: "500+", label: "Mentors", icon: "👥" },
];

const floatingElements = [
  { icon: "💼", delay: 0, duration: 6 },
  { icon: "🚀", delay: 1, duration: 8 },
  { icon: "📚", delay: 2, duration: 7 },
  { icon: "🎯", delay: 0.5, duration: 9 },
];

export default function EnhancedHero() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background-solid via-background to-brand-gradient-soft pt-20">
      {/* Interactive Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
          }}
        />
        
        {floatingElements.map((el, i) => (
          <div
            key={i}
            className={`absolute text-4xl opacity-20 animate-bounce ${mounted ? 'animate-pulse' : ''}`}
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 15}%`,
              animationDelay: `${el.delay}s`,
              animationDuration: `${el.duration}s`,
            }}
          >
            {el.icon}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-brand-gradient text-background dark:text-white rounded-full text-sm font-medium mb-4 animate-bounce-in">
              🌟 Join 10,000+ Youth on Their Success Journey
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary-light animate-gradient-x">
              From Confusion
            </span>
            <br />
            <span className="text-foreground">to Clarity</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner for career readiness, entrepreneurship guidance, and exam success — all in one guided journey
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => {
                if (loading) return;
                if (!user) {
                  router.push('/auth/signup?return=/onboarding');
                } else {
                  router.push('/onboarding');
                }
              }}
              disabled={loading}
              className="group relative overflow-hidden btn btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? '⏳' : '🚀'} 
                {loading ? 'Loading...' : 'Start Your Journey'}
              </span>
            </button>
            <Link href="/track-finder" className="group btn btn-ghost text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-2">
                🎯 Find Your Track
              </span>
            </Link>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className={`group transition-all duration-700 delay-${i * 200} ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                <div className="p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-card-border hover:border-brand-accent/50 transition-all duration-300 hover:shadow-lg">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-brand-accent rounded-full flex justify-center relative overflow-hidden">
          <div className="w-1 h-3 bg-brand-accent rounded-full mt-2 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-accent/20 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
}