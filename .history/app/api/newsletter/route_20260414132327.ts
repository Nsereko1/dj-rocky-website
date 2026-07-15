import { NextRequest, NextResponse } from 'next/server';
import { resend, FROM_EMAIL } from '@/app/lib/resend';

// Store emails (in production, use a database like Supabase, Upstash, or Vercel Postgres)
const subscribers: Set<string> = new Set();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    if (subscribers.has(email)) {
      return NextResponse.json(
        { error: 'Already subscribed' },
        { status: 409 }
      );
    }

    // Add to subscribers
    subscribers.add(email);

    // Send welcome email via Resend
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '🎵 Welcome to DJ Rocky World!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body style="font-family: Arial, sans-serif; background: #0a0a0a; color: #929292; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 12px; padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 32px; margin-bottom: 10px;">🎧 DJ ROCKY</h1>
              <p style="font-size: 18px; margin-bottom: 30px;">Welcome to the Future Afro movement!</p>
              
              <div style="background: #2a2a2a; border-radius: 8px; padding: 30px; margin-bottom: 30px;">
                <h2 style="color: #ffffff; font-size: 24px; margin-bottom: 20px;">You're In! 🎉</h2>
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  Thanks for joining the DJ Rocky newsletter. You'll be the first to know about:
                </p>
                <ul style="text-align: left; font-size: 16px; line-height: 1.8;">
                  <li>🎵 New music releases</li>
                  <li>🌍 Tour announcements</li>
                  <li>🎟️ Exclusive pre-sale tickets</li>
                  <li>👕 Merch drops</li>
                  <li>🎧 Behind-the-scenes content</li>
                </ul>
              </div>
              
              <a href="https://www.djrockyworld.com/music" style="display: inline-block; background: #2a2a2a; color: #929292; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-bottom: 30px;">
                Listen to Latest Release
              </a>
              
              <p style="font-size: 14px; color: #666; margin-top: 40px;">
                Follow us: 
                <a href="https://instagram.com/djrockyug" style="color: #929292; margin: 0 10px;">Instagram</a> •
                <a href="https://x.com/djrockyug" style="color: #929292; margin: 0 10px;">X</a> •
                <a href="https://open.spotify.com/artist/0G55Xq51I94cNd8Qw1zY7R" style="color: #929292; margin: 0 10px;">Spotify</a>
              </p>
              
              <p style="font-size: 12px; color: #555; margin-top: 40px;">
                © 2026 DJ Rocky / WME / BMLN. All rights reserved.<br>
                Kampala, Uganda
              </p>
            </div>
          </body>
        </html>
      `,
    });

    // Notify admin about new subscriber (optional)
    await resend.emails.send({
      from: FROM_EMAIL,
      to: 'djrockyug@gmail.com',
      subject: `📧 New Newsletter Subscriber: ${email}`,
      text: `New subscriber: ${email}\nTotal subscribers: ${subscribers.size}`,
    });

    return NextResponse.json(
      { message: 'Successfully subscribed!', total: subscribers.size },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    subscribers: Array.from(subscribers),
    total: subscribers.size 
  });
}