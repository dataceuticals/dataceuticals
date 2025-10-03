"use client";

import { useState, useEffect } from "react";
import ModularCard from "./ui/ModularCard";

const trustMetrics = [
  { label: "Active Students", value: "50,247", trend: "+12%" },
  { label: "Success Rate", value: "94.8%", trend: "+2.1%" },
  { label: "Expert Mentors", value: "150+", trend: "+8" },
  { label: "Universities", value: "200+", trend: "+15" }
];

const liveActivity = [
  "Rahul from Delhi just scored 98% in GATE mock test",
  "Priya completed Pharmacology chapter with 95% accuracy", 
  "Amit from Mumbai joined Premium plan",
  "Sneha achieved 7-day study streak milestone"
];

export default function TrustSignals() {
  const [currentActivity, setCurrentActivity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % liveActivity.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-brand-gradient-soft to-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Live Activity Feed */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/80 backdrop-blur-sm rounded-full border border-brand-accent/30">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-muted-foreground">
              {liveActivity[currentActivity]}
            </span>
          </div>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustMetrics.map((metric, index) => (
            <ModularCard 
              key={metric.label} 
              variant="glow" 
              size="md"
              className="text-center stagger-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-2xl md:text-3xl font-bold text-gradient mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                {metric.label}
              </div>
              <div className="text-xs text-green-500 font-medium">
                {metric.trend} this month
              </div>
            </ModularCard>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 opacity-60">
          {["🏆 Top Rated", "🔒 Secure", "⚡ Fast", "💎 Premium"].map((badge, index) => (
            <div key={index} className="flex items-center gap-2 text-sm font-medium">
              <span className="text-lg">{badge.split(' ')[0]}</span>
              <span>{badge.split(' ').slice(1).join(' ')}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}