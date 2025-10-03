"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const databaseService_1 = require("../database/databaseService");
class BookingService {
    async createStrategyCallBooking(userId, scheduledDate) {
        const meetingLink = await this.generateMeetingLink();
        return await databaseService_1.databaseService.create('bookings', {
            userId,
            type: 'strategy-call',
            scheduledDate,
            meetingLink,
            status: 'scheduled'
        });
    }
    async getUserBookings(userId) {
        const { where } = await Promise.resolve().then(() => __importStar(require('firebase/firestore')));
        return await databaseService_1.databaseService.query('bookings', [
            where('userId', '==', userId)
        ]);
    }
    async generateMeetingLink() {
        // Generate Google Meet link or use Calendly
        return `https://meet.google.com/${Math.random().toString(36).substring(7)}`;
    }
}
exports.bookingService = new BookingService();
//# sourceMappingURL=bookingService.js.map