"use client";

import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRazorpay } from '../hooks/useRazorpay';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { createPayment } = useRazorpay();
  const [rates, setRates] = useState({ consultation: 750, subscription: 1650 });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
    
    // Fetch current conversion rates
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => res.json())
      .then(data => {
        const inrRate = data.rates.INR;
        setRates({
          consultation: Math.round(9 * inrRate),
          subscription: Math.round(20 * inrRate)
        });
      })
      .catch(() => {});
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-solid via-background to-brand-gradient-soft pt-20 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Welcome back, {user.displayName || 'User'}!</h1>
          <p className="text-xl text-muted-foreground">Continue your learning journey</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-card-border">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-2xl font-semibold mb-4">Book Your Strategy Call</h3>
            <p className="text-muted-foreground mb-6">Get personalized guidance from our experts. 30-minute consultation to create your success roadmap.</p>
            <div className="bg-brand-gradient-soft rounded-2xl p-4 mb-6">
              <p className="font-semibold text-lg">$9 <span className="text-sm font-normal text-muted-foreground">(₹{rates.consultation}*)</span></p>
              <p className="text-sm text-muted-foreground">One-time consultation</p>
            </div>
            <button 
              onClick={() => createPayment(rates.consultation, 'consultation')}
              className="btn btn-primary w-full text-lg"
            >
              Schedule Strategy Call
            </button>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-card-border">
            <div className="text-4xl mb-4">🎆</div>
            <h3 className="text-2xl font-semibold mb-4">Monthly Mentorship</h3>
            <p className="text-muted-foreground mb-6">Complete guidance program with personalized mentoring, resources, and progress tracking.</p>
            <div className="bg-brand-gradient-soft rounded-2xl p-4 mb-6">
              <p className="font-semibold text-lg">$20/month <span className="text-sm font-normal text-muted-foreground">(₹{rates.subscription}*)</span></p>
              <p className="text-sm text-muted-foreground">Complete mentorship program</p>
            </div>
            <button 
              onClick={() => createPayment(rates.subscription, 'subscription')}
              className="btn btn-ghost w-full text-lg border-2 border-brand-primary"
            >
              Start Monthly Plan
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-card-border max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Why Choose DataCeuTicals?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-2xl mb-2">✅</div>
                <p className="font-medium">500+ Success Stories</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🎯</div>
                <p className="font-medium">Personalized Approach</p>
              </div>
              <div>
                <div className="text-2xl mb-2">💰</div>
                <p className="font-medium">ROI Guaranteed</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">*Prices in INR based on real-time conversion rates</p>
          </div>
        </div>
      </div>
    </div>
  );
}