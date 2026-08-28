export interface Testimonial {
  quote: string;
  name: string;
  context: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'My first Wainwright, and I never once felt out of my depth. The pace was exactly right and the route choice on the day made all the difference.',
    name: 'Fiona Grant',
    context: 'Guided walk, 2025',
  },
  {
    quote:
      'The yoga session the evening before our two-day walk meant I started the hardest climb of the trip actually feeling ready for it.',
    name: 'Tom Reilly',
    context: 'Multi-day adventure, 2025',
  },
  {
    quote:
      'No mirrors, no big class, just a quiet spot on the hillside and a practice that actually fit how my body felt that day.',
    name: 'Priya Chandra',
    context: 'Hill & Summit Yoga client',
  },
];
