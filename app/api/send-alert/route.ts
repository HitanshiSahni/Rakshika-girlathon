import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { emails, message } = await req.json();

    if (!emails || emails.length === 0) {
      return NextResponse.json({ error: 'No email recipients provided' }, { status: 400 });
    }

    const results = [];

    for (const to of emails) {
      try {
        await resend.emails.send({
          from: 'onboarding@resend.dev', // or a custom domain if verified
          to,
          subject: '🚨 Rakshika Panic Alert',
          text: message,
        });
        results.push({ name: to, email: { success: true } });
      } catch (err: any) {
        results.push({ name: to, email: { success: false, error: err.message } });
      }
    }

    return NextResponse.json({ success: true, result: results });
  } catch (err: any) {
    console.error('[SEND_ALERT_ERROR]', err);
    return NextResponse.json({ success: false, error: 'Alert failed' }, { status: 500 });
  }
}
