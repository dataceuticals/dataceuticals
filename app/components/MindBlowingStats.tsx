"use client";

import { useState, useEffect, useRef } from "react";

const stats = [
  { 
    number: 50000, 
    suffix: "+", 
    label: "Students Enrolled", 
    icon: "👥",
    color: "from-blue-500 to-purple-600"
  },
  { 
    number: 95, 
    suffix: "%", 
    label: "Success Rate", 
    icon: "🎯",
    color: "from-green-500 to-teal-600"
  },
  { 
    number: 1000, 
    suffix: "+", 
    label: "Practice Questions", 
    icon: "📚",
    color: "from-orange-500 to-red-600"
  },
  { 
    number: 24, 
    suffix: "/7", 
    label: "Expert Support", 
    icon: "🚀",
    color: "from-pink-500 to-rose-600"
  }
];

function CountingNumber({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(target * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function MindBlowingStats() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-brand-gradient-soft relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Numbers That <span className="text-gradient">Speak Volumes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join a community of achievers who've transformed their medical entrance preparation
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className="relative p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-card-border hover:border-brand-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-accent/10 transform hover:-translate-y-2 text-center">
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
                
                {/* Icon */}
                <div className="text-6xl mb-4 animate-bounce-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  {stat.icon}
                </div>

                {/* Number */}
                <div className="text-gradient mb-2">
                  <CountingNumber target={stat.number} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Floating Particles */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand-accent rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gradient text-white rounded-full font-medium hover:scale-105 transition-transform duration-300 cursor-pointer">
            <span>Be part of these numbers</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}