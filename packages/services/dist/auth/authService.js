"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const config_1 = require("../firebase/config");
class AuthService {
    // Sign up new user
    async signUp(data) {
        try {
            const { user: firebaseUser } = await (0, auth_1.createUserWithEmailAndPassword)(config_1.auth, data.email, data.password);
            // Update display name if provided
            if (data.displayName) {
                await (0, auth_1.updateProfile)(firebaseUser, {
                    displayName: data.displayName,
                });
            }
            // Create user document in Firestore
            const userData = {
                email: firebaseUser.email,
                displayName: data.displayName || null,
                photoURL: null,
                emailVerified: firebaseUser.emailVerified,
                role: 'user',
                permissions: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            await (0, firestore_1.setDoc)((0, firestore_1.doc)(config_1.db, 'users', firebaseUser.uid), userData);
            return {
                uid: firebaseUser.uid,
                ...userData,
            };
        }
        catch (error) {
            throw this.handleAuthError(error);
        }
    }
    // Sign in existing user
    async signIn(data) {
        try {
            const { user: firebaseUser } = await (0, auth_1.signInWithEmailAndPassword)(config_1.auth, data.email, data.password);
            // Get user data from Firestore
            const userDoc = await (0, firestore_1.getDoc)((0, firestore_1.doc)(config_1.db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
                return {
                    uid: firebaseUser.uid,
                    ...userDoc.data(),
                };
            }
            // Fallback to basic user data if document doesn't exist
            return {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                emailVerified: firebaseUser.emailVerified,
                role: 'user',
                permissions: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        }
        catch (error) {
            throw this.handleAuthError(error);
        }
    }
    // Sign in with Google
    async signInWithGoogle() {
        try {
            const provider = new auth_1.GoogleAuthProvider();
            const { user: firebaseUser } = await (0, auth_1.signInWithPopup)(config_1.auth, provider);
            // Check if user document exists in Firestore
            const userDoc = await (0, firestore_1.getDoc)((0, firestore_1.doc)(config_1.db, 'users', firebaseUser.uid));
            if (!userDoc.exists()) {
                // Create new user document for Google user
                const userData = {
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    emailVerified: firebaseUser.emailVerified,
                    role: 'user',
                    permissions: [],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                await (0, firestore_1.setDoc)((0, firestore_1.doc)(config_1.db, 'users', firebaseUser.uid), userData);
            }
            // Return user data
            if (userDoc.exists()) {
                return {
                    uid: firebaseUser.uid,
                    ...userDoc.data(),
                };
            }
            else {
                return {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    emailVerified: firebaseUser.emailVerified,
                    role: 'user',
                    permissions: [],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
            }
        }
        catch (error) {
            throw this.handleAuthError(error);
        }
    }
    // Sign out user
    async signOut() {
        try {
            await (0, auth_1.signOut)(config_1.auth);
        }
        catch (error) {
            throw this.handleAuthError(error);
        }
    }
    // Get current user
    async getCurrentUser() {
        return new Promise((resolve) => {
            const unsubscribe = (0, auth_1.onAuthStateChanged)(config_1.auth, async (firebaseUser) => {
                unsubscribe();
                if (!firebaseUser) {
                    resolve(null);
                    return;
                }
                try {
                    // Get user data from Firestore
                    const userDoc = await (0, firestore_1.getDoc)((0, firestore_1.doc)(config_1.db, 'users', firebaseUser.uid));
                    if (userDoc.exists()) {
                        resolve({
                            uid: firebaseUser.uid,
                            ...userDoc.data(),
                        });
                    }
                    else {
                        // Fallback to basic user data
                        resolve({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            displayName: firebaseUser.displayName,
                            photoURL: firebaseUser.photoURL,
                            emailVerified: firebaseUser.emailVerified,
                            role: 'user',
                            permissions: [],
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        });
                    }
                }
                catch (error) {
                    console.error('Error getting user data:', error);
                    resolve(null);
                }
            });
        });
    }
    // Listen to auth state changes
    onAuthStateChanged(callback) {
        return (0, auth_1.onAuthStateChanged)(config_1.auth, async (firebaseUser) => {
            if (!firebaseUser) {
                callback(null);
                return;
            }
            try {
                const userDoc = await (0, firestore_1.getDoc)((0, firestore_1.doc)(config_1.db, 'users', firebaseUser.uid));
                if (userDoc.exists()) {
                    callback({
                        uid: firebaseUser.uid,
                        ...userDoc.data(),
                    });
                }
                else {
                    callback({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName,
                        photoURL: firebaseUser.photoURL,
                        emailVerified: firebaseUser.emailVerified,
                        role: 'user',
                        permissions: [],
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });
                }
            }
            catch (error) {
                console.error('Error getting user data:', error);
                callback(null);
            }
        });
    }
    // Handle Firebase auth errors
    handleAuthError(error) {
        let message = 'An unexpected error occurred';
        switch (error.code) {
            case 'auth/email-already-in-use':
                message = 'An account with this email already exists';
                break;
            case 'auth/invalid-email':
                message = 'Please enter a valid email address';
                break;
            case 'auth/weak-password':
                message = 'Password should be at least 6 characters long';
                break;
            case 'auth/user-not-found':
                message = 'No account found with this email address';
                break;
            case 'auth/wrong-password':
                message = 'Incorrect password';
                break;
            case 'auth/too-many-requests':
                message = 'Too many failed attempts. Please try again later';
                break;
            default:
                message = error.message || message;
        }
        return {
            code: error.code || 'unknown',
            message,
        };
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=authService.js.map