export interface ShareIconProps {
  size?: number;
}

export const XIcon = ({ size = 20 }: ShareIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M4 4L20 20M20 4L4 20" />
  </svg>
);

export const FacebookIcon = ({ size = 20 }: ShareIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M14 8.5h-1.5a2 2 0 00-2 2V12h3.3l-.4 2.5H10.5V21" />
  </svg>
);

export const LinkedInIcon = ({ size = 20 }: ShareIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <line x1="7.5" y1="10.5" x2="7.5" y2="16.5" />
    <circle cx="7.5" cy="7.2" r="0.6" fill="currentColor" stroke="none" />
    <path d="M11.5 16.5v-4a2 2 0 0 1 4 0v4" />
    <line x1="11.5" y1="10.5" x2="11.5" y2="16.5" />
  </svg>
);

export const WhatsAppIcon = ({ size = 20 }: ShareIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 20l1.3-3.9A8 8 0 1 1 8.9 19L4 20Z" />
    <path d="M9 10c0 3 2 5 5 5" strokeLinecap="round" />
  </svg>
);

export const EmailIcon = ({ size = 20 }: ShareIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);
