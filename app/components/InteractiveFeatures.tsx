"use client";

import { useState } from "react";
import Link from "next/link";

const features = [
  {
    id: "ai-powered",
    title: "AI-Powered Analytics",
    description: "Get personalized insights and performance tracking with our advanced AI algorithms",
    icon: "🤖",
    color: "from-purple-500 to-pink-500",
    stats: "95% accuracy in weakness detection"
  },
  {
    id: "adaptive-tests",
    title: "Adaptive Test Series",
    description: "Dynamic difficulty adjustment based on your performance and learning curve",
    icon: "🎯",
    color: "from-blue-500 to-teal-500",
    stats: "50+ adaptive test modules"
  },
  {
    id: "expert-content",
    title: "Expert-Curated Content",
    description: "Content created by top medical professionals and successful GATE/GPAT toppers",
    icon: "👨‍⚕️",
    color: "from-green-500 to-emerald-500",
    stats: "1000+ expert-verified questions"
  },
  {
    id: "real-time",
    title: "Real-time Progress",
    description: "Track your improvement with detailed analytics and performance metrics",
    icon: "📊",
    color: "from-orange-500 to-red-500",
    stats: "Live performance dashboard"
  }
];

export default function InteractiveFeatures() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-brand-gradient-soft">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Students Choose <span className="text-gradient">DataCeuticals</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of medical entrance preparation with our cutting-edge platform
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Feature List */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeFeature === index
                    ? 'bg-card border-2 border-brand-accent shadow-lg transform scale-105'
                    : 'bg-card/50 border border-card-border hover:bg-card hover:shadow-md'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`text-4xl p-3 rounded-xl bg-gradient-to-r ${feature.color} bg-opacity-10`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-2">{feature.description}</p>
                    <div className="text-sm font-medium text-brand-accent">{feature.stats}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Showcase */}
          <div className="relative">
            <div className="bg-card rounded-3xl p-8 shadow-2xl border border-card-border">
              <div className={`w-full h-64 rounded-2xl bg-gradient-to-br ${features[activeFeature].color} flex items-center justify-center mb-6`}>
                <div className="text-8xl opacity-80">{features[activeFeature].icon}</div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{features[activeFeature].title}</h3>
              <p className="text-muted-foreground mb-6">{features[activeFeature].description}</p>
              <Link 
                href="/features" 
                className="btn btn-primary w-full justify-center transform hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}