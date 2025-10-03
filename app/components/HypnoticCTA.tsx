"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

const urgencyMessages = [
  "🔥 Join 50,000+ successful students",
  "⚡ Limited time: Free premium access",
  "🎯 Start your success journey today",
  "💎 Unlock your potential now"
];

export default function HypnoticCTA() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % urgencyMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary animate-gradient-x"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Urgency Message */}
          <div className="mb-6 h-8 flex items-center justify-center">
            <div className="text-white/90 font-medium text-lg animate-pulse">
              {urgencyMessages[currentMessage]}
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to <span className="text-yellow-300 animate-pulse">Dominate</span><br />
            Your Medical Entrance?
          </h2>

          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of toppers who transformed their dreams into reality with our proven system
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button 
              onClick={() => {
                if (loading) return;
                if (!user) {
                  router.push('/auth/signup?return=/dashboard');
                } else {
                  router.push('/dashboard');
                }
              }}
              disabled={loading}
              className="btn px-6 py-2.5 text-lg disabled:opacity-50" 
              style={{borderRadius: '0.625rem'}}
            >
              {loading ? 'Loading...' : (user ? 'Go to Dashboard' : 'Start Free Trial')}
            </button>
            <button 
              onClick={() => {
                alert('Demo coming soon! 🚀\n\nWe\'re working on an amazing interactive demo to showcase our platform. In the meantime, feel free to sign up for free access to explore all features!');
              }}
              className="btn btn-ghost px-6 py-2.5 text-lg transform hover:scale-105 transition-all duration-300" 
              style={{borderRadius: '0.625rem'}}
            >
              <span className="flex items-center gap-2">
                🎬 Watch Demo
              </span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              No Credit Card Required
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              7-Day Money Back Guarantee
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              24/7 Expert Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}