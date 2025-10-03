import { databaseService } from '../database/databaseService';

export interface Booking {
  id: string;
  userId: string;
  type: 'strategy-call' | 'mentorship';
  scheduledDate: Date;
  meetingLink: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

class BookingService {
  async createStrategyCallBooking(userId: string, scheduledDate: Date): Promise<string> {
    const meetingLink = await this.generateMeetingLink();
    
    return await databaseService.create('bookings', {
      userId,
      type: 'strategy-call',
      scheduledDate,
      meetingLink,
      status: 'scheduled'
    });
  }

  async getUserBookings(userId: string): Promise<Booking[]> {
    const { where } = await import('firebase/firestore');
    return await databaseService.query('bookings', [
      where('userId', '==', userId)
    ]) as Booking[];
  }

  private async generateMeetingLink(): Promise<string> {
    // Generate Google Meet link or use Calendly
    return `https://meet.google.com/${Math.random().toString(36).substring(7)}`;
  }
}

export const bookingService = new BookingService();