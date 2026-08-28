export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '/blog', label: 'Blog' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
];
