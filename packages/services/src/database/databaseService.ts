import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface DatabaseService {
  // Generic CRUD operations
  create<T extends DocumentData>(collectionName: string, data: T): Promise<string>;
  getById<T>(collectionName: string, id: string): Promise<T | null>;
  update<T extends DocumentData>(collectionName: string, id: string, data: Partial<T>): Promise<void>;
  delete(collectionName: string, id: string): Promise<void>;
  
  // Query operations
  query<T>(collectionName: string, constraints?: QueryConstraint[]): Promise<T[]>;
  
  // Collection-specific operations
  getCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | null>;
  createCourse(course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<string>;
  
  getTestSeries(courseId: string): Promise<TestSeries[]>;
  getTestSeriesById(id: string): Promise<TestSeries | null>;
  createTestSeries(testSeries: Omit<TestSeries, 'id' | 'createdAt' | 'updatedAt'>): Promise<string>;
  
  getUserProgress(userId: string, courseId: string): Promise<UserProgress | null>;
  updateUserProgress(progress: UserProgress): Promise<void>;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  syllabus: string[];
  duration: number; // in hours
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  instructor: string;
  thumbnail?: string;
  price: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestSeries {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number; // in minutes
  totalQuestions: number;
  passingScore: number;
  questions: Question[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'essay';
  content: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface UserProgress {
  id: string;
  userId: string;
  courseId: string;
  testSeriesId?: string;
  completedLessons: string[];
  testResults: TestResult[];
  overallProgress: number; // 0-100
  lastAccessed: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestResult {
  testSeriesId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number; // in minutes
  completedAt: Date;
  answers: Answer[];
}

export interface Answer {
  questionId: string;
  selectedAnswer: string | string[];
  isCorrect: boolean;
  timeSpent: number; // in seconds
}

export class FirestoreService implements DatabaseService {
  // Generic CRUD operations
  async create<T extends DocumentData>(collectionName: string, data: T): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error: any) {
      throw new Error(`Failed to create document: ${error.message}`);
    }
  }

  async getById<T>(collectionName: string, id: string): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        } as T;
      }
      return null;
    } catch (error: any) {
      throw new Error(`Failed to get document: ${error.message}`);
    }
  }

  async update<T extends DocumentData>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date(),
      });
    } catch (error: any) {
      throw new Error(`Failed to update document: ${error.message}`);
    }
  }

  async delete(collectionName: string, id: string): Promise<void> {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (error: any) {
      throw new Error(`Failed to delete document: ${error.message}`);
    }
  }

  async query<T>(collectionName: string, constraints: QueryConstraint[] = []): Promise<T[]> {
    try {
      const q = query(collection(db, collectionName), ...constraints);
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
    } catch (error: any) {
      throw new Error(`Failed to query collection: ${error.message}`);
    }
  }

  // Course-specific operations
  async getCourses(): Promise<Course[]> {
    return this.query<Course>('courses', [
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc')
    ]);
  }

  async getCourse(id: string): Promise<Course | null> {
    return this.getById<Course>('courses', id);
  }

  async createCourse(course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return this.create('courses', course);
  }

  // Test Series operations
  async getTestSeries(courseId: string): Promise<TestSeries[]> {
    return this.query<TestSeries>('testSeries', [
      where('courseId', '==', courseId),
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc')
    ]);
  }

  async getTestSeriesById(id: string): Promise<TestSeries | null> {
    return this.getById<TestSeries>('testSeries', id);
  }

  async createTestSeries(testSeries: Omit<TestSeries, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return this.create('testSeries', testSeries);
  }

  // User Progress operations
  async getUserProgress(userId: string, courseId: string): Promise<UserProgress | null> {
    const results = await this.query<UserProgress>('userProgress', [
      where('userId', '==', userId),
      where('courseId', '==', courseId),
      limit(1)
    ]);
    
    return results.length > 0 ? results[0] : null;
  }

  async updateUserProgress(progress: UserProgress): Promise<void> {
    if (progress.id) {
      await this.update('userProgress', progress.id, progress);
    } else {
      await this.create('userProgress', progress);
    }
  }

  // Utility methods
  async getCoursesByCategory(category: string): Promise<Course[]> {
    return this.query<Course>('courses', [
      where('category', '==', category),
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc')
    ]);
  }

  async getCoursesByDifficulty(difficulty: Course['difficulty']): Promise<Course[]> {
    return this.query<Course>('courses', [
      where('difficulty', '==', difficulty),
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc')
    ]);
  }

  async searchCourses(searchTerm: string): Promise<Course[]> {
    // Note: Firestore doesn't support full-text search natively
    // For production, consider using Algolia or similar service
    const allCourses = await this.getCourses();
    return allCourses.filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}

export const databaseService = new FirestoreService();
