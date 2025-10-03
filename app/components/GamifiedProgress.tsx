"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const achievements = [
  { id: 1, title: "First Steps", description: "Complete your first test", icon: "🎯", unlocked: true },
  { id: 2, title: "Streak Master", description: "7-day study streak", icon: "🔥", unlocked: true },
  { id: 3, title: "Knowledge Seeker", description: "Complete 50 questions", icon: "📚", unlocked: true },
  { id: 4, title: "Perfectionist", description: "Score 100% in any test", icon: "💎", unlocked: false },
  { id: 5, title: "Champion", description: "Top 10% in leaderboard", icon: "👑", unlocked: false },
];

const progressData = [
  { subject: "Pharmacology", progress: 85, color: "from-purple-500 to-pink-500" },
  { subject: "Biochemistry", progress: 72, color: "from-blue-500 to-teal-500" },
  { subject: "Physiology", progress: 91, color: "from-green-500 to-emerald-500" },
  { subject: "Pathology", progress: 68, color: "from-orange-500 to-red-500" },
];

export default function GamifiedProgress() {
  const [animatedProgress, setAnimatedProgress] = useState(progressData.map(() => 0));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressData.map(item => item.progress));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-brand-gradient-soft">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Track Your <span className="text-gradient">Learning Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Gamified learning experience with achievements, progress tracking, and personalized insights
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Progress Dashboard */}
          <div className="bg-card rounded-3xl p-8 shadow-2xl border border-card-border">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="text-3xl">📊</span>
              Subject Progress
            </h3>
            
            <div className="space-y-6">
              {progressData.map((subject, index) => (
                <div key={subject.subject}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{subject.subject}</span>
                    <span className="text-sm font-bold text-brand-accent">
                      {animatedProgress[index]}%
                    </span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${animatedProgress[index]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-brand-gradient-soft rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-brand-accent">79%</div>
                  <div className="text-sm text-muted-foreground">Overall Progress</div>
                </div>
                <div className="text-4xl">🎯</div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-card rounded-3xl p-8 shadow-2xl border border-card-border">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              Achievements
            </h3>
            
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    achievement.unlocked
                      ? 'bg-brand-gradient-soft border-brand-accent/30 shadow-md'
                      : 'bg-muted/10 border-muted/20 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-3xl ${achievement.unlocked ? 'grayscale-0' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    </div>
                    {achievement.unlocked && (
                      <div className="text-brand-accent font-bold text-sm">✓</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Link 
              href="/dashboard" 
              className="btn btn-primary w-full mt-6 justify-center transform hover:scale-105 transition-all duration-300"
            >
              View Full Dashboard
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { label: "Tests Completed", value: "47", icon: "✅" },
            { label: "Study Streak", value: "12 days", icon: "🔥" },
            { label: "Questions Solved", value: "1,247", icon: "🧠" },
            { label: "Rank", value: "#156", icon: "🏆" },
          ].map((stat, index) => (
            <div key={index} className="bg-card rounded-2xl p-6 text-center shadow-lg border border-card-border hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-brand-accent mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}