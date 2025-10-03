import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { Resend } from 'resend';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Check if already subscribed
    const docRef = doc(db, 'newsletters', email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json({ message: 'Already subscribed' }, { status: 200 });
    }

    // Add to Firestore
    await setDoc(docRef, {
      email,
      subscribedAt: new Date().toISOString(),
      active: true
    });

    // Send welcome email
    await resend.emails.send({
      from: 'DataCeuticals <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to DataCeuticals Newsletter!',
      html: `
        <h2>Welcome to DataCeuticals!</h2>
        <p>Thank you for subscribing to our newsletter. You'll receive updates about:</p>
        <ul>
          <li>Latest medical education resources</li>
          <li>Career guidance tips</li>
          <li>Exam preparation strategies</li>
        </ul>
        <p>Stay tuned for valuable content!</p>
      `
    });

    return NextResponse.json({ message: 'Subscribed successfully' });
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ 
      error: 'Subscription failed', 
      details: error.message 
    }, { status: 500 });
  }
}