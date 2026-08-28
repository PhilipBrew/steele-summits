export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'reading-a-mountain-weather-forecast',
    title: 'How to Read a Mountain Weather Forecast',
    category: 'Walking Skills',
    date: '2026-06-15',
    excerpt:
      'A valley forecast and a summit forecast can be two completely different days. Here is what actually matters before you set off.',
    body: 'Cloud base, wind speed at height, and freezing level tell you far more about a day on the hill than the forecast for the nearest town ever will. Before any guided walk, we check a specialist mountain forecast rather than a general weather app — and build in a turnaround point in case conditions close in earlier than planned.',
  },
  {
    slug: 'why-yoga-and-hillwalking-work-so-well-together',
    title: 'Why Yoga and Hillwalking Work So Well Together',
    category: 'Yoga',
    date: '2026-05-22',
    excerpt:
      'Mobility, breath control, and recovery make a bigger difference on a long day out than most walkers expect.',
    body: 'Steady, controlled breathing is as useful on a steep ascent as it is on a yoga mat, and the mobility work that keeps hips and ankles moving well is exactly what prevents niggles on uneven ground. A short practice the evening before a big walk — or the day after one — tends to matter more than people expect.',
  },
  {
    slug: 'essential-packing-list-for-a-day-on-the-hill',
    title: 'The Essential Packing List for a Day on the Hill',
    category: 'Getting Started',
    date: '2026-04-30',
    excerpt:
      'What actually needs to be in the bag, and what is safe to leave behind, for a standard guided walk.',
    body: 'Waterproofs, spare layers, a map and compass, a head torch, and more food and water than feels necessary — that is the shortlist that matters most. Everything else depends on the route and the season, and we talk it through with everyone before a walk rather than handing out a generic list.',
  },
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find(post => post.slug === slug);
