"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "GATE Biotechnology Topper",
    image: "👩‍🔬",
    content: "DataCeuticals' adaptive test series helped me identify my weak areas and improve systematically. The AI-powered analytics were game-changing!",
    score: "AIR 15",
    exam: "GATE BT 2024"
  },
  {
    name: "Rahul Patel",
    role: "GPAT Qualifier",
    image: "👨‍⚕️",
    content: "The expert-curated content and real-time progress tracking made my preparation so much more effective. Highly recommend!",
    score: "AIR 42",
    exam: "GPAT 2024"
  },
  {
    name: "Ananya Singh",
    role: "NIPER Entrance Success",
    image: "👩‍💼",
    content: "The comprehensive study materials and mock tests perfectly simulated the actual exam environment. Thank you DataCeuticals!",
    score: "Selected",
    exam: "NIPER 2024"
  },
  {
    name: "Vikram Kumar",
    role: "CUET PG Achiever",
    image: "👨‍🎓",
    content: "Outstanding platform with excellent question quality. The detailed explanations helped me understand concepts deeply.",
    score: "98.5%ile",
    exam: "CUET PG 2024"
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-brand-gradient-soft to-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Success Stories from Our <span className="text-gradient">Champions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of successful students who achieved their dreams with DataCeuticals
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-2xl border border-card-border transform transition-all duration-500">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-8xl">{testimonials[currentIndex].image}</div>
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </blockquote>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="font-semibold text-lg">{testimonials[currentIndex].name}</div>
                    <div className="text-muted-foreground">{testimonials[currentIndex].role}</div>
                  </div>
                  <div className="bg-brand-gradient text-brand-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                    {testimonials[currentIndex].score} • {testimonials[currentIndex].exam}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-brand-accent scale-125' 
                    : 'bg-muted hover:bg-brand-accent/50'
                }`}
              />
            ))}
          </div>

          {/* Thumbnail Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-brand-gradient text-brand-primary-foreground scale-105'
                    : 'bg-card border border-card-border hover:shadow-lg hover:scale-105'
                }`}
              >
                <div className="text-3xl mb-2 text-center">{testimonial.image}</div>
                <div className="text-sm font-medium text-center">{testimonial.name}</div>
                <div className="text-xs text-center opacity-75">{testimonial.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}