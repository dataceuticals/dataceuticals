"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const stats = [
  { value: "50K+", label: "Students" },
  { value: "95%", label: "Success Rate" },
  { value: "1000+", label: "Questions" },
];

const floatingElements = [
  { icon: "🧬", delay: 0, duration: 6 },
  { icon: "⚗️", delay: 1, duration: 8 },
  { icon: "🔬", delay: 2, duration: 7 },
  { icon: "💊", delay: 0.5, duration: 9 },
];

export default function AnimatedHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background-solid via-background to-brand-gradient-soft">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary-light animate-pulse">
              Master Your
            </span>
            <br />
            <span className="text-foreground">Medical Entrance</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful students with our AI-powered test series and comprehensive study materials
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/test-series" className="btn btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300">
              Start Free Test
            </Link>
            <Link href="/courses" className="btn btn-ghost text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300">
              Explore Courses
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className={`transition-all duration-700 delay-${i * 200} ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                <div className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-brand-accent rounded-full flex justify-center">
          <div className="w-1 h-3 bg-brand-accent rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}