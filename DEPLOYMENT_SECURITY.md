# Deployment Security Checklist

## ✅ Pre-Deployment Security Audit

### Environment Variables
- [ ] All API keys moved to Vercel environment variables
- [ ] No hardcoded credentials in source code
- [ ] Production vs development environment separation
- [ ] Firebase security rules configured

### Sensitive Files Excluded
- [ ] `.env.local` not committed
- [ ] `.env.production` not committed  
- [ ] `subscribers.json` cleared of personal data
- [ ] No Firebase service account keys in repo

### API Security
- [ ] Razorpay webhooks configured with proper signatures
- [ ] Firebase security rules implemented
- [ ] Rate limiting on API endpoints
- [ ] Input validation on all forms

### Build Configuration
- [ ] TypeScript errors ignored only for deployment
- [ ] ESLint warnings reviewed
- [ ] Next.js config optimized for production

## 🔒 Vercel Environment Variables Required

```bash
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
NEXT_PUBLIC_RAZORPAY_KEY_ID
RESEND_API_KEY
NEXT_PUBLIC_API_URL
```

## 🚀 Deployment Steps

1. **Clean Repository**
   ```bash
   git add .
   git commit -m "Security: Remove sensitive data and hardcoded keys"
   git push origin main
   ```

2. **Vercel Setup**
   - Connect GitHub repository
   - Add all environment variables
   - Configure build settings
   - Deploy

3. **Post-Deployment**
   - Test all API endpoints
   - Verify payment integration
   - Check Firebase connectivity
   - Monitor error logs

## ⚠️ Never Commit
- API keys or secrets
- Database credentials
- Personal user data
- Firebase service account keys
- Payment gateway secrets