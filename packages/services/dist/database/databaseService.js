"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseService = exports.FirestoreService = void 0;
const firestore_1 = require("firebase/firestore");
const config_1 = require("../firebase/config");
class FirestoreService {
    // Generic CRUD operations
    async create(collectionName, data) {
        try {
            const docRef = await (0, firestore_1.addDoc)((0, firestore_1.collection)(config_1.db, collectionName), {
                ...data,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return docRef.id;
        }
        catch (error) {
            throw new Error(`Failed to create document: ${error.message}`);
        }
    }
    async getById(collectionName, id) {
        try {
            const docRef = (0, firestore_1.doc)(config_1.db, collectionName, id);
            const docSnap = await (0, firestore_1.getDoc)(docRef);
            if (docSnap.exists()) {
                return {
                    id: docSnap.id,
                    ...docSnap.data(),
                };
            }
            return null;
        }
        catch (error) {
            throw new Error(`Failed to get document: ${error.message}`);
        }
    }
    async update(collectionName, id, data) {
        try {
            const docRef = (0, firestore_1.doc)(config_1.db, collectionName, id);
            await (0, firestore_1.updateDoc)(docRef, {
                ...data,
                updatedAt: new Date(),
            });
        }
        catch (error) {
            throw new Error(`Failed to update document: ${error.message}`);
        }
    }
    async delete(collectionName, id) {
        try {
            const docRef = (0, firestore_1.doc)(config_1.db, collectionName, id);
            await (0, firestore_1.deleteDoc)(docRef);
        }
        catch (error) {
            throw new Error(`Failed to delete document: ${error.message}`);
        }
    }
    async query(collectionName, constraints = []) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(config_1.db, collectionName), ...constraints);
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
        }
        catch (error) {
            throw new Error(`Failed to query collection: ${error.message}`);
        }
    }
    // Course-specific operations
    async getCourses() {
        return this.query('courses', [
            (0, firestore_1.where)('isPublished', '==', true),
            (0, firestore_1.orderBy)('createdAt', 'desc')
        ]);
    }
    async getCourse(id) {
        return this.getById('courses', id);
    }
    async createCourse(course) {
        return this.create('courses', course);
    }
    // Test Series operations
    async getTestSeries(courseId) {
        return this.query('testSeries', [
            (0, firestore_1.where)('courseId', '==', courseId),
            (0, firestore_1.where)('isPublished', '==', true),
            (0, firestore_1.orderBy)('createdAt', 'desc')
        ]);
    }
    async getTestSeriesById(id) {
        return this.getById('testSeries', id);
    }
    async createTestSeries(testSeries) {
        return this.create('testSeries', testSeries);
    }
    // User Progress operations
    async getUserProgress(userId, courseId) {
        const results = await this.query('userProgress', [
            (0, firestore_1.where)('userId', '==', userId),
            (0, firestore_1.where)('courseId', '==', courseId),
            (0, firestore_1.limit)(1)
        ]);
        return results.length > 0 ? results[0] : null;
    }
    async updateUserProgress(progress) {
        if (progress.id) {
            await this.update('userProgress', progress.id, progress);
        }
        else {
            await this.create('userProgress', progress);
        }
    }
    // Utility methods
    async getCoursesByCategory(category) {
        return this.query('courses', [
            (0, firestore_1.where)('category', '==', category),
            (0, firestore_1.where)('isPublished', '==', true),
            (0, firestore_1.orderBy)('createdAt', 'desc')
        ]);
    }
    async getCoursesByDifficulty(difficulty) {
        return this.query('courses', [
            (0, firestore_1.where)('difficulty', '==', difficulty),
            (0, firestore_1.where)('isPublished', '==', true),
            (0, firestore_1.orderBy)('createdAt', 'desc')
        ]);
    }
    async searchCourses(searchTerm) {
        // Note: Firestore doesn't support full-text search natively
        // For production, consider using Algolia or similar service
        const allCourses = await this.getCourses();
        return allCourses.filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }
}
exports.FirestoreService = FirestoreService;
exports.databaseService = new FirestoreService();
//# sourceMappingURL=databaseService.js.map