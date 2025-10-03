import { QueryConstraint, DocumentData } from 'firebase/firestore';
export interface DatabaseService {
    create<T extends DocumentData>(collectionName: string, data: T): Promise<string>;
    getById<T>(collectionName: string, id: string): Promise<T | null>;
    update<T extends DocumentData>(collectionName: string, id: string, data: Partial<T>): Promise<void>;
    delete(collectionName: string, id: string): Promise<void>;
    query<T>(collectionName: string, constraints?: QueryConstraint[]): Promise<T[]>;
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
    duration: number;
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
    duration: number;
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
    overallProgress: number;
    lastAccessed: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface TestResult {
    testSeriesId: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    timeTaken: number;
    completedAt: Date;
    answers: Answer[];
}
export interface Answer {
    questionId: string;
    selectedAnswer: string | string[];
    isCorrect: boolean;
    timeSpent: number;
}
export declare class FirestoreService implements DatabaseService {
    create<T extends DocumentData>(collectionName: string, data: T): Promise<string>;
    getById<T>(collectionName: string, id: string): Promise<T | null>;
    update<T extends DocumentData>(collectionName: string, id: string, data: Partial<T>): Promise<void>;
    delete(collectionName: string, id: string): Promise<void>;
    query<T>(collectionName: string, constraints?: QueryConstraint[]): Promise<T[]>;
    getCourses(): Promise<Course[]>;
    getCourse(id: string): Promise<Course | null>;
    createCourse(course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<string>;
    getTestSeries(courseId: string): Promise<TestSeries[]>;
    getTestSeriesById(id: string): Promise<TestSeries | null>;
    createTestSeries(testSeries: Omit<TestSeries, 'id' | 'createdAt' | 'updatedAt'>): Promise<string>;
    getUserProgress(userId: string, courseId: string): Promise<UserProgress | null>;
    updateUserProgress(progress: UserProgress): Promise<void>;
    getCoursesByCategory(category: string): Promise<Course[]>;
    getCoursesByDifficulty(difficulty: Course['difficulty']): Promise<Course[]>;
    searchCourses(searchTerm: string): Promise<Course[]>;
}
export declare const databaseService: FirestoreService;
//# sourceMappingURL=databaseService.d.ts.map