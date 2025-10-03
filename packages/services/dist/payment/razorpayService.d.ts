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
declare class RazorpayService {
    createConsultationOrder(userId: string): Promise<PaymentOrder>;
    createSubscription(userId: string): Promise<Subscription>;
    getConversionRate(): Promise<number>;
}
export declare const razorpayService: RazorpayService;
export {};
//# sourceMappingURL=razorpayService.d.ts.map