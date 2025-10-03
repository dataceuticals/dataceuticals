# 🔥 Firebase Setup Guide for DataCeuTicals

This guide will walk you through setting up Firebase Authentication, Firestore Database, and Storage for your DataCeuTicals project.

## 📋 Prerequisites

- Node.js 18+ and pnpm installed
- Firebase account (free tier is sufficient to start)
- Basic understanding of Firebase services

## 🚀 Step-by-Step Setup

### 1. Firebase Project Creation

1. **Go to [Firebase Console](https://console.firebase.google.com/)**
2. **Click "Create a project"**
3. **Enter project details:**
   - Project name: `dataceuticals` (or your preferred name)
   - Enable Google Analytics: `Yes` (recommended)
   - Choose analytics account or create new
4. **Click "Create project"**

### 2. Enable Authentication

1. **In Firebase Console → Authentication → Get started**
2. **Click "Get started"**
3. **Enable sign-in methods:**
   - **Email/Password** ✅ (primary method)
   - **Google** ✅ (optional, for convenience)
   - **Anonymous** ✅ (optional, for guest users)
4. **Click "Save"**

### 3. Enable Firestore Database

1. **In Firebase Console → Firestore Database → Create database**
2. **Choose security rules:**
   - Select **"Start in test mode"** (we'll secure it later)
3. **Choose location:**
   - Select location closest to your users (e.g., `us-central1`)
4. **Click "Done"**

### 4. Enable Storage

1. **In Firebase Console → Storage → Get started**
2. **Choose security rules:**
   - Select **"Start in test mode"** (we'll secure it later)
3. **Choose location:**
   - Select same location as Firestore
4. **Click "Done"**

### 5. Get Firebase Configuration

1. **In Firebase Console → Project Settings (gear icon)**
2. **Scroll down to "Your apps"**
3. **Click "Add app" → Web app**
4. **Register app:**
   - App nickname: `dataceuticals-web`
   - Check "Also set up Firebase Hosting" (optional)
5. **Click "Register app"**
6. **Copy the config object** (you'll need this for `.env.local`)

### 6. Environment Configuration

Create `.env.local` in your project root:

```env
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**⚠️ Important:** Replace all `your_*_here` values with your actual Firebase config values.

### 7. Install Dependencies

Run this command in your project root:

```bash
pnpm install
```

This will install Firebase packages and build the services package.

### 8. Build Services Package

```bash
pnpm build:services
```

### 9. Test the Setup

1. **Start your development server:**
   ```bash
   pnpm dev
   ```

2. **Navigate to test pages:**
   - `/test-auth` - Test authentication state
   - `/auth/login` - Login page
   - `/auth/signup` - Signup page

3. **Try creating an account:**
   - Go to `/auth/signup`
   - Fill in the form with test data
   - Submit and check Firebase Console → Authentication → Users

## 🔧 Project Structure

```
packages/services/
├── src/
│   ├── firebase/
│   │   └── config.ts          # Firebase initialization
│   ├── auth/
│   │   └── authService.ts     # Authentication logic
│   ├── storage/
│   │   └── storageService.ts  # File upload/download
│   ├── database/
│   │   └── databaseService.ts # Firestore operations
│   ├── types/
│   │   └── auth.ts           # Type definitions
│   └── index.ts              # Main exports
```

## 🎯 What's Implemented

### ✅ Authentication Service
- User signup with email/password
- User signin
- User signout
- Auth state management
- Error handling
- User profile creation in Firestore

### ✅ Storage Service
- File upload to Firebase Storage
- File download URLs
- File deletion
- Image and document uploads
- File path generation
- File size formatting

### ✅ Database Service
- Generic CRUD operations
- Course management
- Test series management
- User progress tracking
- Query operations with constraints

### ✅ React Context
- Global authentication state
- Loading states
- Error handling
- Automatic auth state updates

## 🧪 Testing Your Setup

### 1. Create a Test User
1. Go to `/auth/signup`
2. Fill in test data:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
3. Submit the form
4. Check Firebase Console → Authentication → Users

### 2. Verify User Document
1. Check Firebase Console → Firestore Database
2. Look for `users` collection
3. Verify your test user document exists with profile data

### 3. Test Login
1. Go to `/auth/login`
2. Use your test credentials
3. Verify successful login and redirect

## 🔒 Security Rules (Next Steps)

**⚠️ Important:** Your database and storage are currently in "test mode" which allows anyone to read/write. For production, you'll need to set up proper security rules.

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public courses can be read by anyone
    match /courses/{courseId} {
      allow read: if resource.data.isPublished == true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### Storage Security Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Users can upload to their own folder
    match /uploads/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public assets can be read by anyone
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

## 🚨 Troubleshooting

### Common Issues

1. **"Cannot find module 'firebase/app'"**
   - Run `pnpm build:services` first
   - Check that Firebase packages are installed

2. **"Firebase: Error (auth/invalid-api-key)"**
   - Verify your `.env.local` file has correct values
   - Check that environment variables are loaded

3. **"Firebase: Error (auth/operation-not-allowed)"**
   - Enable Email/Password authentication in Firebase Console
   - Check authentication methods are properly configured

4. **"Firebase: Error (storage/unauthorized)"**
   - Check Storage security rules
   - Verify user is authenticated before upload

### Debug Steps

1. **Check browser console** for error messages
2. **Verify environment variables** are loaded correctly
3. **Check Firebase Console** for any service errors
4. **Test with `/test-auth` page** to verify auth state

## 📚 Next Steps

After successful setup:

1. **Create your first course** using the database service
2. **Upload course materials** using the storage service
3. **Implement protected routes** for authenticated users
4. **Add user profile management**
5. **Set up proper security rules** for production

## 🆘 Need Help?

- Check Firebase Console for service status
- Review Firebase documentation
- Check browser console for detailed error messages
- Verify all environment variables are set correctly

---

**🎉 Congratulations!** You now have a fully functional Firebase backend with authentication, database, and storage services integrated into your Next.js application.
