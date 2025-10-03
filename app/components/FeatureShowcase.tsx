"use client";

import { useState } from "react";
import ModularCard from "./ui/ModularCard";
import AnimatedButton from "./ui/AnimatedButton";

const features = [
  {
    id: "adaptive",
    title: "Adaptive Learning AI",
    description: "Personalized study paths that evolve with your progress",
    icon: "🧠",
    benefits: ["Smart difficulty adjustment", "Weakness identification", "Optimized study time"],
    demo: "Watch how AI adapts to your learning style in real-time"
  },
  {
    id: "analytics", 
    title: "Performance Analytics",
    description: "Deep insights into your preparation with actionable recommendations",
    icon: "📊",
    benefits: ["Detailed progress tracking", "Comparative analysis", "Predictive scoring"],
    demo: "See your complete performance dashboard"
  },
  {
    id: "community",
    title: "Expert Community",
    description: "Connect with toppers, mentors, and peers for collaborative learning",
    icon: "👥", 
    benefits: ["24/7 doubt resolution", "Study groups", "Peer competitions"],
    demo: "Join live study sessions with experts"
  }
];

export default function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-brand-gradient-soft">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why <span className="text-gradient">Top Students</span> Choose Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced features designed by educators and loved by achievers
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Feature List */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <ModularCard
                key={feature.id}
                variant={activeFeature === index ? "magnetic" : "default"}
                interactive={true}
                className={`cursor-pointer transition-all duration-500 ${
                  activeFeature === index ? 'border-brand-accent shadow-2xl' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ModularCard>
            ))}
          </div>

          {/* Feature Demo */}
          <div className="relative">
            <ModularCard variant="glow" size="lg" interactive={false}>
              <div className="text-center">
                <div className="text-8xl mb-6 animate-float">
                  {features[activeFeature].icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {features[activeFeature].title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {features[activeFeature].demo}
                </p>
                <AnimatedButton variant="primary" size="lg">
                  Try Interactive Demo
                </AnimatedButton>
              </div>
            </ModularCard>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-accent/20 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-brand-primary/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}