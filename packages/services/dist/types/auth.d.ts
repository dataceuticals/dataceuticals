export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean;
    role: 'user' | 'content_writer' | 'admin' | 'owner';
    permissions: string[];
    createdAt: Date;
    updatedAt: Date;
}
export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}
export interface SignUpData {
    email: string;
    password: string;
    displayName?: string;
}
export interface SignInData {
    email: string;
    password: string;
}
export interface AuthError {
    code: string;
    message: string;
}
//# sourceMappingURL=auth.d.ts.map