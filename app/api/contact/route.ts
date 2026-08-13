import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // IMPORTANT NOTE FOR DEPLOYMENT:
    // To actually send this email, you would integrate a transactional email provider here.
    // E.g., Resend, SendGrid, Amazon SES.
    //
    // Example using Resend:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contact@yourdomain.com',
    //   to: 'jobs.premmandal@gmail.com',
    //   subject: `New Contact Form Submission from ${name}`,
    //   text: `Email: ${email}\n\nMessage: ${message}`,
    // });

    console.log('--- NEW CONTACT FORM SUBMISSION ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log('-----------------------------------');

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
