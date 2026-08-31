import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const token = process.env.SANITY_SEED_TOKEN;

if (!projectId || !dataset || !apiVersion || !token) {
  throw new Error(
    'Missing one of NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION, SANITY_SEED_TOKEN',
  );
}

const client = createClient({ projectId, dataset, apiVersion, token });

// Minimal markdown-ish -> Portable Text converter, just enough for this
// script's own drafted content: "## " headings, "- " bullets, blank-line
// separated paragraphs.
const toBlocks = (markdown: string) => {
  const lines = markdown.trim().split('\n');
  const blocks: object[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push(makeBlock(paragraph.join(' ').trim(), 'normal'));
    paragraph = [];
  };

  const makeBlock = (text: string, style: string, listItem?: 'bullet') => ({
    _type: 'block',
    style,
    ...(listItem ? { listItem, level: 1 } : {}),
    markDefs: [],
    children: [{ _type: 'span', text, marks: [] }],
  });

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line === '') {
      flushParagraph();
    } else if (line.startsWith('## ')) {
      flushParagraph();
      blocks.push(makeBlock(line.slice(3), 'h2'));
    } else if (line.startsWith('- ')) {
      flushParagraph();
      blocks.push(makeBlock(line.slice(2), 'normal', 'bullet'));
    } else {
      paragraph.push(line);
    }
  }
  flushParagraph();

  return blocks;
};

const DRAFT_NOTICE =
  '⚠️ Draft placeholder — this page has not yet been reviewed by a qualified solicitor. Do not rely on it as legal advice or legal cover. Replace this content with properly drafted terms before the site is publicly indexed.';

const privacyPolicyMarkdown = `
${DRAFT_NOTICE}

## Who we are

Steele Summit is a Mountain Leader and Yoga Teacher business operating guided walks, expeditions and yoga sessions across the Lake District and Northumberland. You can contact us at hello@steelesummit.co.uk.

## Information we collect

When you use the contact form on this website, we collect the information you provide: your name, email address, an optional phone number, and the content of your message. We do not require you to create an account, and we do not process payments on this website.

## How we use your information

We use the information you provide solely to respond to your enquiry and, where you go on to book a walk or session with us, to arrange and deliver that service.

## How your information is handled

Contact form submissions are sent as an email directly to our inbox using Resend, an email-delivery service, and are received in a Google Workspace mailbox. We do not store form submissions in a separate database — once sent, your enquiry exists only as an email in our inbox (and any reply you receive).

## Cookies and tracking

This website does not currently use any analytics, advertising, or tracking cookies. If this changes in future, we will update this policy and, where required, ask for your consent first.

## Sharing your information

We do not sell or share your personal information with third parties, other than the service providers named above (Resend and Google Workspace) who help us receive and respond to your enquiry.

## How long we keep your information

We keep enquiry emails for as long as reasonably necessary to respond to you and, where applicable, to deliver and administer any booking — typically no longer than is needed for those purposes, unless we're required to keep it for longer by law.

## Your rights

Under UK data protection law, you have the right to ask us what personal information we hold about you, to ask us to correct or delete it, and to object to how we use it. To exercise any of these rights, contact us at hello@steelesummit.co.uk. You also have the right to complain to the Information Commissioner's Office (ico.org.uk) if you believe your data has been mishandled.

## Children's privacy

This website is not directed at children, and we do not knowingly collect personal information from children.

## Changes to this policy

We may update this policy from time to time. The date at the top of this page shows when it was last revised.

## Contact us

If you have any questions about this policy, email hello@steelesummit.co.uk.
`;

const termsMarkdown = `
${DRAFT_NOTICE}

## About these terms

These terms apply when you make an enquiry or booking with Steele Summit for a guided walk, expedition, or yoga session, whether made through this website, by email, or by phone.

## Enquiries and bookings

Enquiries made through this website are not a confirmed booking — a booking is only confirmed once we've corresponded with you directly and agreed on the details, dates, and any payment. We do not currently take payment through this website.

## Nature of the activities

Mountain walking, hillwalking, and expeditions take place in an outdoor environment and carry inherent risks, including but not limited to changeable weather, difficult terrain, and physical exertion. Yoga sessions involve physical movement and stretching. By booking, you confirm that you believe yourself to be reasonably fit and suited to the activity you've booked, and you agree to follow the guidance of your Mountain Leader or yoga teacher at all times.

## Weather and changes to plans

Mountain routes and outdoor sessions may need to be changed, shortened, or rescheduled at short notice due to weather, ground conditions, or safety concerns. We'll always aim to offer a suitable alternative where possible.

## Cancellations

[Cancellation and refund policy to be confirmed — for example, notice period required for a full refund, and any non-refundable deposit.]

## Your responsibilities

Please tell us about any medical conditions, injuries, or other factors that might affect your ability to safely take part before your session. Please also bring appropriate clothing and equipment as advised by us in advance.

## Liability

Nothing in these terms excludes or limits our liability for death or personal injury caused by our negligence, or for any other liability that cannot be excluded or limited under English law. Beyond that, participation in outdoor activities is at your own risk, and Steele Summit accepts no liability for loss, damage, or injury arising from circumstances outside our reasonable control.

## Website content

The text, images, and branding on this website belong to Steele Summit and may not be reused without our permission.

## Governing law

These terms are governed by the laws of England and Wales.

## Changes to these terms

We may update these terms from time to time. The date at the top of this page shows when they were last revised.

## Contact us

If you have any questions about these terms, email hello@steelesummit.co.uk.
`;

const seed = async () => {
  await client.createIfNotExists({
    _id: 'privacyPolicyPage',
    _type: 'privacyPolicyPage',
    title: 'Privacy Policy',
    lastUpdated: new Date().toISOString().slice(0, 10),
    body: toBlocks(privacyPolicyMarkdown),
  });
  console.log('privacyPolicyPage seeded (or already existed).');

  await client.createIfNotExists({
    _id: 'termsPage',
    _type: 'termsPage',
    title: 'Terms & Conditions',
    lastUpdated: new Date().toISOString().slice(0, 10),
    body: toBlocks(termsMarkdown),
  });
  console.log('termsPage seeded (or already existed).');
};

seed().catch(error => {
  console.error(error);
  process.exit(1);
});
