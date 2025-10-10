import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  console.log('=== Contact API Called ===');
  
  try {
    const { name, email, subject, message } = await request.json();
    console.log('Received data:', { name, email, subject, message });

    if (!name || !email || !message) {
      console.log('Missing required fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get technical data
    const forwarded = request.headers.get('x-forwarded-for');
    const rawIp = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    const ip = rawIp === '::1' ? 'localhost' : rawIp;
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer') || 'direct';
    
    // Get IP location data
    let locationData = { city: 'Unknown', country: 'Unknown', isp: 'Unknown' };
    
    if (ip === 'localhost') {
      // For localhost, get public IP and location
      try {
        const publicIpResponse = await fetch('https://api.ipify.org?format=json');
        const publicIpData = await publicIpResponse.json();
        const publicIp = publicIpData.ip;
        
        const geoResponse = await fetch(`http://ip-api.com/json/${publicIp}`);
        const geoData = await geoResponse.json();
        locationData = {
          city: geoData.city || 'Unknown',
          country: geoData.country || 'Unknown',
          isp: geoData.isp || 'Unknown'
        };
      } catch (error) {
        console.log('Public IP geolocation failed:', error);
      }
    } else if (ip !== 'unknown') {
      try {
        const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
        const geoData = await geoResponse.json();
        locationData = {
          city: geoData.city || 'Unknown',
          country: geoData.country || 'Unknown',
          isp: geoData.isp || 'Unknown'
        };
      } catch (error) {
        console.log('Geolocation failed:', error);
      }
    }

    // Parse user agent for readable format
    const getBrowser = (ua: string) => {
      if (ua.includes('Chrome')) return 'Chrome';
      if (ua.includes('Firefox')) return 'Firefox';
      if (ua.includes('Safari')) return 'Safari';
      return 'Unknown';
    };
    
    const getOS = (ua: string) => {
      if (ua.includes('Android')) return 'Android';
      if (ua.includes('iPhone')) return 'iOS';
      if (ua.includes('Windows')) return 'Windows';
      if (ua.includes('Mac')) return 'macOS';
      if (ua.includes('Linux')) return 'Linux';
      return 'Unknown';
    };
    
    const getDevice = (ua: string) => {
      if (ua.includes('Mobile')) return 'Mobile';
      if (ua.includes('Tablet')) return 'Tablet';
      return 'Desktop';
    };

    const contactData = {
      name,
      email,
      subject: subject || 'No subject',
      message,
      timestamp: new Date().toISOString(),
      status: 'new',
      ip_address: ip,
      user_agent: userAgent,
      referrer: referer,
      page_url: referer,
      browser: getBrowser(userAgent),
      os: getOS(userAgent),
      device_type: getDevice(userAgent),
      city: locationData.city,
      country: locationData.country,
      network_carrier: locationData.isp
    };
    console.log('Contact data prepared:', contactData);

    // Store in Firebase
    console.log('Attempting to store in Firebase...');
    try {
      await addDoc(collection(db, 'contacts'), contactData);
      console.log('✅ Firebase storage successful');
    } catch (firebaseError) {
      console.error('❌ Firebase error:', firebaseError);
      throw firebaseError;
    }

    // Send email notification
    console.log('Attempting to send email...');
    console.log('Resend API Key exists:', !!process.env.RESEND_API_KEY);
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: process.env.CONTACT_EMAIL || 'your-email@domain.com',
        subject: `New Contact: ${subject || 'No subject'}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <p><strong>Submitted:</strong> ${contactData.country === 'India' ? 
            new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' (IST)' :
            `${new Date().toLocaleString()} (User Local) | UTC: ${new Date().toISOString().replace('T', ' ').slice(0, -5)} | IST: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`
          }</p>
          
          <hr>
          <h4>📍 Technical Details</h4>
          <p><strong>IP Address:</strong> ${ip}</p>
          <p><strong>Location:</strong> ${contactData.city}, ${contactData.country}</p>
          <p><strong>Network/ISP:</strong> ${contactData.network_carrier}</p>
          <p><strong>Device:</strong> ${contactData.device_type}</p>
          <p><strong>Browser:</strong> ${contactData.browser}</p>
          <p><strong>OS:</strong> ${contactData.os}</p>
          <p><strong>Source Page:</strong> ${referer}</p>
        `
      });
      console.log('✅ Email sent successfully');
    } catch (emailError) {
      console.error('❌ Email error:', emailError);
      throw emailError;
    }

    console.log('=== Contact API Success ===');
    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('=== Contact API Error ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}