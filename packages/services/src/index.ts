// Firebase configuration
export { default as firebaseApp, auth, db, storage } from './firebase/config';

// Authentication service
export * from './auth/authService';
export * from './database/databaseService';
export * from './storage/storageService';
export * from './blog/blogService';
export * from './types/auth';
export * from './types/blog';

// Storage service
export { storageService } from './storage/storageService';
export type { UploadOptions, FileMetadata } from './storage/storageService';

// Database service
export { databaseService } from './database/databaseService';
export type {
  Course,
  TestSeries,
  Question,
  UserProgress,
  TestResult,
  Answer,
  DatabaseService
} from './database/databaseService';

// Payment service
export { razorpayService } from './payment/razorpayService';
export type { PaymentOrder, Subscription } from './payment/razorpayService';

// Booking service
export { bookingService } from './scheduling/bookingService';
export type { Booking } from './scheduling/bookingService';

// Re-export Firebase types for convenience
export type { User as FirebaseUser } from 'firebase/auth';
export type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
