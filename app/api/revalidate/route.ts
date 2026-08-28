import { revalidateTag, revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

interface WebhookPayload {
  _type: string;
  slug?: string;
}

export const POST = async (request: Request) => {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: 'Revalidation secret not configured' },
      { status: 500 },
    );
  }

  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);

  if (!signature || !(await isValidSignature(body, signature, secret))) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }

  const payload = JSON.parse(body) as WebhookPayload;

  revalidateTag(payload._type, 'max');
  if (payload.slug) {
    const pathPrefix = payload._type === 'blogPost' ? '/blog' : '/services';
    revalidatePath(`${pathPrefix}/${payload.slug}`);
  }

  return NextResponse.json({
    revalidated: true,
    type: payload._type,
    now: Date.now(),
  });
};
