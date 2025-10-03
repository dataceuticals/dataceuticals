"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    id: 1,
    question: "What's your primary goal?",
    options: [
      { value: "career", label: "Get Job Ready", icon: "💼" },
      { value: "startup", label: "Start Business", icon: "🚀" },
      { value: "exam", label: "Ace Exams", icon: "📚" }
    ]
  },
  {
    id: 2,
    question: "Current status?",
    options: [
      { value: "student", label: "Student", icon: "🎓" },
      { value: "graduate", label: "Graduate", icon: "👨‍🎓" },
      { value: "working", label: "Working", icon: "💼" }
    ]
  },
  {
    id: 3,
    question: "Your experience level?",
    options: [
      { value: "beginner", label: "Just Starting", icon: "🌱" },
      { value: "intermediate", label: "Some Experience", icon: "📈" },
      { value: "advanced", label: "Experienced", icon: "🎯" }
    ]
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentStep].id]: value }));
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const isComplete = Object.keys(answers).length === questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-solid via-background to-brand-gradient-soft flex items-center justify-center p-4 pt-20">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Let's Find Your Perfect Path</h1>
          <div className="flex justify-center gap-2 mb-6">
            {questions.map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i <= currentStep ? 'bg-brand-primary' : 'bg-gray-300'}`} />
            ))}
          </div>
        </div>

        {!isComplete ? (
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-card-border">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {questions[currentStep].question}
            </h2>
            <div className="grid gap-4">
              {questions[currentStep].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="p-6 rounded-2xl border border-card-border hover:border-brand-accent/50 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{option.icon}</span>
                    <span className="text-lg font-medium">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-card-border text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-4">Perfect! Your Journey Awaits</h2>
            <p className="text-muted-foreground mb-8">
              Based on your answers, we've created your personalized success roadmap.
            </p>
            <Link href="/dashboard" className="btn btn-primary text-lg px-8 py-4">
              View My Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}