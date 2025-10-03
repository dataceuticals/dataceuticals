import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { User, SignUpData, SignInData, AuthError } from '../types/auth';

export class AuthService {
  // Sign up new user
  async signUp(data: SignUpData): Promise<User> {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Update display name if provided
      if (data.displayName) {
        await updateProfile(firebaseUser, {
          displayName: data.displayName,
        });
      }

      // Create user document in Firestore
      const userData: Omit<User, 'uid'> = {
        email: firebaseUser.email,
        displayName: data.displayName || null,
        photoURL: null,
        emailVerified: firebaseUser.emailVerified,
        role: 'user',
        permissions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), userData);

      return {
        uid: firebaseUser.uid,
        ...userData,
      };
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Sign in existing user
  async signIn(data: SignInData): Promise<User> {
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        return {
          uid: firebaseUser.uid,
          ...userDoc.data(),
        } as User;
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
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Sign in with Google
  async signInWithGoogle(): Promise<User> {
    try {
      const provider = new GoogleAuthProvider();
      const { user: firebaseUser } = await signInWithPopup(auth, provider);

      // Check if user document exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (!userDoc.exists()) {
        // Create new user document for Google user
        const userData: Omit<User, 'uid'> = {
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
          role: 'user',
          permissions: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      }

      // Return user data
      if (userDoc.exists()) {
        return {
          uid: firebaseUser.uid,
          ...userDoc.data(),
        } as User;
      } else {
        return {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
          role: 'user' as const,
          permissions: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Sign out user
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        unsubscribe();
        
        if (!firebaseUser) {
          resolve(null);
          return;
        }

        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            resolve({
              uid: firebaseUser.uid,
              ...userDoc.data(),
            } as User);
          } else {
            // Fallback to basic user data
            resolve({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              emailVerified: firebaseUser.emailVerified,
              role: 'user' as const,
              permissions: [],
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
        } catch (error) {
          console.error('Error getting user data:', error);
          resolve(null);
        }
      });
    });
  }

  // Listen to auth state changes
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        callback(null);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          callback({
            uid: firebaseUser.uid,
            ...userDoc.data(),
          } as User);
        } else {
          callback({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified,
            role: 'user' as const,
            permissions: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      } catch (error) {
        console.error('Error getting user data:', error);
        callback(null);
      }
    });
  }

  // Handle Firebase auth errors
  private handleAuthError(error: any): AuthError {
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

export const authService = new AuthService();
