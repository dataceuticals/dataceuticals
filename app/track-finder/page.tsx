"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

const quiz = [
  {
    question: "What excites you most?",
    options: [
      { value: "career", label: "Landing my dream job", track: "Career Readiness" },
      { value: "startup", label: "Building my own company", track: "Entrepreneurship" },
      { value: "exam", label: "Acing competitive exams", track: "Exam Preparation" }
    ]
  }
];

const trackDetails = {
  career: {
    title: "Career Readiness Track",
    icon: "💼",
    color: "blue",
    description: "Land your dream job with AI-powered resume optimization and mock interviews",
    features: ["Resume Building", "Mock Interviews", "Skill Bootcamps", "Job Placement"]
  },
  startup: {
    title: "Entrepreneurship Track", 
    icon: "🚀",
    color: "green",
    description: "Turn your idea into a funded startup with expert mentorship",
    features: ["Idea Validation", "MVP Building", "Pitch Practice", "Investor Connects"]
  },
  exam: {
    title: "Exam Preparation Track",
    icon: "📚", 
    color: "purple",
    description: "Dominate competitive exams with AI-powered study plans",
    features: ["Study Plans", "Mock Tests", "Doubt Resolution", "Progress Tracking"]
  }
};

export default function TrackFinderPage() {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleSelection = (value: string) => {
    setSelectedTrack(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-solid via-background to-brand-gradient-soft pt-20 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Find Your Perfect Track</h1>
          <p className="text-xl text-muted-foreground">Discover which path leads to your success</p>
        </div>

        {!selectedTrack ? (
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-card-border">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              {quiz[0].question}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {quiz[0].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelection(option.value)}
                  className="p-8 rounded-2xl border border-card-border hover:border-brand-accent/50 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 text-center group"
                >
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {trackDetails[option.value as keyof typeof trackDetails].icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{option.label}</h3>
                  <p className="text-sm text-muted-foreground">{option.track}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-card-border">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">
                {trackDetails[selectedTrack as keyof typeof trackDetails].icon}
              </div>
              <h2 className="text-4xl font-bold mb-4">
                {trackDetails[selectedTrack as keyof typeof trackDetails].title}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {trackDetails[selectedTrack as keyof typeof trackDetails].description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">What You'll Get:</h3>
                <ul className="space-y-3">
                  {trackDetails[selectedTrack as keyof typeof trackDetails].features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-green-500">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-brand-gradient-soft rounded-2xl p-6">
                <h3 className="text-2xl font-semibold mb-4">Ready to Start?</h3>
                <p className="mb-6">Join thousands who've transformed their future with this track.</p>
                <button 
                  onClick={() => {
                    if (!user) {
                      router.push(`/auth/signup?return=/onboarding&track=${selectedTrack}`);
                    } else {
                      router.push('/onboarding');
                    }
                  }}
                  className="btn btn-primary text-lg px-8 py-4 w-full justify-center"
                >
                  {user ? 'Continue to Onboarding' : 'Sign Up & Start'}
                </button>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={() => setSelectedTrack(null)}
                className="text-brand-accent hover:underline"
              >
                ← Choose Different Track
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}