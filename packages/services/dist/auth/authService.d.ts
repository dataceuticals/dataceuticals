import { User, SignUpData, SignInData } from '../types/auth';
export declare class AuthService {
    signUp(data: SignUpData): Promise<User>;
    signIn(data: SignInData): Promise<User>;
    signInWithGoogle(): Promise<User>;
    signOut(): Promise<void>;
    getCurrentUser(): Promise<User | null>;
    onAuthStateChanged(callback: (user: User | null) => void): () => void;
    private handleAuthError;
}
export declare const authService: AuthService;
//# sourceMappingURL=authService.d.ts.map