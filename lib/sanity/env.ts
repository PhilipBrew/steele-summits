const assertValue = <T>(value: T | undefined, errorMessage: string): T => {
  if (value === undefined) {
    throw new Error(errorMessage);
  }
  return value;
};

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
);

export const apiVersion = assertValue(
  process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  'Missing environment variable: NEXT_PUBLIC_SANITY_API_VERSION',
);

// Optional — only required to preview drafts via Draft Mode. Left
// unasserted (unlike the values above) so the app still runs without it;
// lib/sanity/client.ts throws a clearer error at the point of use instead.
export const previewToken = process.env.SANITY_API_READ_TOKEN;
