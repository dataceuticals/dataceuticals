"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const amount = searchParams.get('amount');

  const getTitle = () => {
    return type === 'consultation' ? 'Strategy Call Booked!' : 'Monthly Mentorship Activated!';
  };

  const getNextSteps = () => {
    if (type === 'consultation') {
      return [
        'Check your email for booking confirmation',
        'You will receive a calendar invite within 24 hours',
        'Prepare your questions for the strategy session'
      ];
    } else {
      return [
        'Access to premium resources is now active',
        'Your mentor will contact you within 48 hours',
        'Start exploring your personalized learning path'
      ];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-solid via-background to-brand-gradient-soft pt-20 p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-12 border border-card-border">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold mb-4">{getTitle()}</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Payment of ₹{amount} completed successfully
          </p>
          
          <div className="bg-brand-gradient-soft rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">What's Next?</h3>
            <ul className="text-left space-y-2">
              {getNextSteps().map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-brand-primary mr-2">•</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/dashboard" className="btn btn-primary">
              Back to Dashboard
            </Link>
            <Link href="/" className="btn btn-ghost">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}