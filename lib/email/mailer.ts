export async function sendEmail(to: string, subject: string, html: string) {
  console.log(`[Email] Sending email to ${to}`);
  console.log(`[Email] Subject: ${subject}`);
  console.log(`[Email] Body length: ${html.length} chars`);

  if (!process.env.EMAIL_API_KEY) {
    console.warn("EMAIL_API_KEY is missing. Simulating successful send.");
  }

  return true;
}

export async function sendResumeReadyEmail(email: string, name: string, orderId: string, secureToken: string) {
  const link = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/resume-access/${secureToken}`;

  const html = `
    <div style="font-family: sans-serif; max-w-xl mx-auto">
      <h2>Your ATS-Optimized Resume Is Ready</h2>
      <p>Hi ${name},</p>
      <p>Great news! Your ATS-optimized resume for order #${orderId} has been professionally reviewed and is ready for download.</p>
      <p>Click the secure link below to proceed with the payment and download your finalized files:</p>
      <a href="${link}" style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">View My Resume</a>
      <p style="margin-top: 24px; font-size: 12px; color: #666;">This link is private. Do not share it with anyone.</p>
    </div>
  `;

  return sendEmail(email, "Your ATS-Optimized Resume Is Ready", html);
}
