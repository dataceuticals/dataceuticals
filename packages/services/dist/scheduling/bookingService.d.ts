export interface Booking {
    id: string;
    userId: string;
    type: 'strategy-call' | 'mentorship';
    scheduledDate: Date;
    meetingLink: string;
    status: 'scheduled' | 'completed' | 'cancelled';
}
declare class BookingService {
    createStrategyCallBooking(userId: string, scheduledDate: Date): Promise<string>;
    getUserBookings(userId: string): Promise<Booking[]>;
    private generateMeetingLink;
}
export declare const bookingService: BookingService;
export {};
//# sourceMappingURL=bookingService.d.ts.map