import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend safely
const resend = new Resend(process.env.RESEND_API_KEY);

// Optional: central email config
const FROM_EMAIL = process.env.FROM_EMAIL || 'DJ Rocky <onboarding@resend.dev>';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body?.email?.trim();

    // ✅ Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // ✅ Validate env variables
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!process.env.RESEND_API_KEY) {
      console.error('❌ Missing RESEND_API_KEY');
      return NextResponse.json(
        { error: 'Server misconfiguration (API key)' },
        { status: 500 }
      );
    }

    if (!audienceId) {
      console.error('❌ Missing RESEND_AUDIENCE_ID');
      return NextResponse.json(
        { error: 'Server misconfiguration (Audience ID)' },
        { status: 500 }
      );
    }

    console.log('📩 Adding contact:', email);
    console.log('📌 Audience:', audienceId);

    // ✅ 1. Create contact
    const { data: contact, error: contactError } =
      await resend.contacts.create({
        audienceId,
        email,
      });

    console.log('📊 CONTACT RESPONSE:', { contact, contactError });

    // ❗ Handle Resend errors properly
    if (contactError) {
      // Duplicate email case
      if (contactError.message?.includes('already exists')) {
        return NextResponse.json(
          { error: 'Already subscribed' },
          { status: 409 }
        );
      }

      console.error('❌ Contact creation failed:', contactError);
      return NextResponse.json(
        { error: 'Failed to add contact' },
        { status: 500 }
      );
    }

    // ✅ 2. Send welcome email
    const { error: emailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '🎵 Welcome to DJ Rocky World!',
      html: `
        <div style="font-family: Arial; background:#0a0a0a; color:#929292; padding:40px;">
          <h1 style="color:#fff;">🎧 DJ ROCKY</h1>
          <p>Welcome to the Future Afro movement!</p>
          <p>You’ll now get updates on music, tours, and exclusives.</p>
        </div>
      `,
    });

    if (emailError) {
      console.error('⚠️ Email send failed:', emailError);
      // don’t fail request if email fails
    }

    // ✅ 3. Notify admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: 'djrockyug@gmail.com',
      subject: `📧 New Subscriber`,
      text: `New subscriber: ${email}`,
    });

    // ✅ 4. Optional debug: list contacts (temporary)
    const list = await resend.contacts.list({
      audienceId,
      limit: 5,
    });

    console.log('📋 CONTACT LIST SAMPLE:', list);

    return NextResponse.json(
      {
        message: 'Successfully subscribed!',
        contactId: contact?.id || null,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('🔥 Newsletter error:', error);

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}