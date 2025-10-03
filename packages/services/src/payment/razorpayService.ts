import { databaseService } from '../database/databaseService';

export interface PaymentOrder {
  id: string;
  amount: number;
  currency: 'INR';
  receipt: string;
  status: 'created' | 'paid' | 'failed';
}

export interface Subscription {
  id: string;
  userId: string;
  status: 'active' | 'cancelled';
  amount: number;
  nextBilling: Date;
}

class RazorpayService {
  async createConsultationOrder(userId: string): Promise<PaymentOrder> {
    const rate = await this.getConversionRate();
    const amount = Math.round(9 * rate); // $9 to INR
    
    const orderId = await databaseService.create('paymentOrders', {
      userId,
      amount,
      currency: 'INR',
      type: 'consultation',
      status: 'created'
    });

    return {
      id: orderId,
      amount,
      currency: 'INR',
      receipt: `consultation_${userId}`,
      status: 'created'
    };
  }

  async createSubscription(userId: string): Promise<Subscription> {
    const rate = await this.getConversionRate();
    const amount = Math.round(20 * rate); // $20 to INR
    
    const subscriptionId = await databaseService.create('subscriptions', {
      userId,
      amount,
      status: 'active',
      nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    return {
      id: subscriptionId,
      userId,
      status: 'active',
      amount,
      nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    };
  }

  async getConversionRate(): Promise<number> {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json() as { rates: { INR: number } };
      return data.rates.INR;
    } catch (error) {
      return 83; // Fallback rate
    }
  }
}

export const razorpayService = new RazorpayService();