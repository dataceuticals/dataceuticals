"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.razorpayService = void 0;
const databaseService_1 = require("../database/databaseService");
class RazorpayService {
    async createConsultationOrder(userId) {
        const rate = await this.getConversionRate();
        const amount = Math.round(9 * rate); // $9 to INR
        const orderId = await databaseService_1.databaseService.create('paymentOrders', {
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
    async createSubscription(userId) {
        const rate = await this.getConversionRate();
        const amount = Math.round(20 * rate); // $20 to INR
        const subscriptionId = await databaseService_1.databaseService.create('subscriptions', {
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
    async getConversionRate() {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            return data.rates.INR;
        }
        catch (error) {
            return 83; // Fallback rate
        }
    }
}
exports.razorpayService = new RazorpayService();
//# sourceMappingURL=razorpayService.js.map