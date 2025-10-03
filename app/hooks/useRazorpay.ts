import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useRazorpay = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => setIsLoaded(true);
      document.body.appendChild(script);
    } else if (window.Razorpay) {
      setIsLoaded(true);
    }
  }, []);

  const createPayment = async (amount: number, type: 'consultation' | 'subscription') => {
    if (!isLoaded) return;

    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          receipt: `${type}_${Date.now()}`,
        }),
      });

      const { orderId } = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: 'INR',
        name: 'DataCeuTicals',
        description: type === 'consultation' ? 'Strategy Call' : 'Monthly Mentorship',
        order_id: orderId,
        handler: async (response: any) => {
          const verifyResponse = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });
          
          if (verifyResponse.ok) {
            window.location.href = `/payment-success?type=${type}&amount=${amount}`;
          }
        },
        theme: { color: '#3B82F6' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return { isLoaded, createPayment };
};