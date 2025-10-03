"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "AI-Powered Learning",
    description: "Adaptive algorithms that learn your strengths and weaknesses",
    icon: "🤖",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Expert Mentorship", 
    description: "Direct access to GATE/GPAT toppers and industry experts",
    icon: "👨‍🏫",
    gradient: "from-blue-500 to-teal-500"
  },
  {
    title: "Real-time Analytics",
    description: "Track your progress with detailed performance insights",
    icon: "📊",
    gradient: "from-green-500 to-emerald-500"
  }
];

export default function ParallaxSection() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        setScrollY(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-brand-gradient-soft via-background to-brand-gradient-soft"
    >
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ transform: `translateY(${scrollY}px)` }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-brand-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-brand-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            <div className="text-foreground mb-4">Experience the</div>
            <div className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary">
              Future of Learning
            </div>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Revolutionary technology meets proven pedagogy to create an unparalleled learning experience
          </p>
        </div>

        {/* Feature Cards with Stagger Animation */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative stagger-item"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {/* Floating Card */}
              <div className="relative p-8 rounded-3xl bg-card/90 backdrop-blur-xl border border-card-border hover:border-brand-accent/50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">

                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl">
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                       style={{ 
                         mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                         maskComposite: 'xor',
                         padding: '2px'
                       }}>
                  </div>
                </div>
              </div>

              {/* Floating Particles */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-brand-accent rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1000 animate-float"
                  style={{
                    top: `${20 + i * 30}%`,
                    right: `${-10 + i * 5}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-accent animate-pulse-glow">
            <button className="px-8 py-4 bg-background rounded-2xl font-bold text-lg hover:bg-transparent hover:text-brand-primary-foreground transition-all duration-300 transform hover:scale-105">
              Experience the Magic
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}