import { NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  consent?: boolean;
  company?: string;
  service?: string;
}

const GENERAL_ENQUIRY = 'General Enquiry';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = {
  name: 100,
  email: 254,
  phone: 30,
  message: 5000,
  service: 100,
};

// Single-line fields go straight into email headers (subject, replyTo) —
// strip CR/LF so a crafted value can't inject extra header lines.
const sanitizeLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

export const POST = async (request: Request) => {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL;

  if (!apiKey || !notifyEmail) {
    return NextResponse.json(
      { message: 'Contact form is not configured' },
      { status: 500 },
    );
  }

  const { name, email, phone, message, consent, company, service } =
    (await request.json()) as ContactPayload;

  if (company) {
    return NextResponse.json({ sent: true });
  }

  if (!name || !email || !message || !consent) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 },
    );
  }

  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    (phone && phone.length > MAX_LENGTHS.phone) ||
    message.length > MAX_LENGTHS.message ||
    (service && service.length > MAX_LENGTHS.service)
  ) {
    return NextResponse.json({ message: 'Field too long' }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { message: 'Invalid email address' },
      { status: 400 },
    );
  }

  const safeName = sanitizeLine(name);
  const safeEmail = sanitizeLine(email);
  const safePhone = phone ? sanitizeLine(phone) : undefined;
  const safeService =
    service && sanitizeLine(service) !== GENERAL_ENQUIRY
      ? sanitizeLine(service)
      : undefined;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `Steele Summit website <${notifyEmail}>`,
    to: notifyEmail,
    replyTo: safeEmail,
    subject: safeService
      ? `New enquiry from ${safeName} — ${safeService}`
      : `New enquiry from ${safeName}`,
    text: [
      `Name: ${safeName}`,
      `Email: ${safeEmail}`,
      safePhone ? `Phone: ${safePhone}` : null,
      safeService ? `Service: ${safeService}` : null,
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n'),
  });

  if (error) {
    return NextResponse.json(
      { message: 'Failed to send message' },
      { status: 502 },
    );
  }

  return NextResponse.json({ sent: true });
};
