export interface Service {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
}

export const services: Service[] = [
  {
    slug: 'guided-mountain-walks',
    name: 'Guided Mountain Walks',
    category: 'Walking',
    summary:
      'Full-day guided walks across classic Lakeland fells and Northumberland’s wild hills, paced to the group.',
    description:
      'Routes are chosen the week of the walk based on conditions, group experience, and what the weather window actually allows — not a fixed itinerary booked months in advance. Every walk is led by a qualified Mountain Leader, with navigation, mountain safety, and photo stops built in along the way.',
  },
  {
    slug: 'hill-and-summit-yoga',
    name: 'Hill & Summit Yoga',
    category: 'Yoga',
    summary:
      'Outdoor yoga sessions on the hillside, blending movement with big views.',
    description:
      'A gentle, all-levels practice held outdoors where the weather allows — usually a short walk-in to a quiet spot with a view worth sitting in. Sessions focus on mobility, breath, and recovery, and are just as useful the day before a big walk as the day after one.',
  },
  {
    slug: 'multi-day-adventures',
    name: 'Multi-Day Mountain Adventures',
    category: 'Walking',
    summary:
      'Two- to four-day guided expeditions with wild camping or bothy stays.',
    description:
      'For walkers who want more than a single summit — multi-day routes linking several peaks, with nights spent wild camping or in a bothy along the way. Pace, distance, and difficulty are agreed with the group in advance, and full kit guidance is provided before you set off.',
  },
  {
    slug: 'studio-and-online-yoga',
    name: 'Studio & Online Yoga Sessions',
    category: 'Yoga',
    summary:
      'Weekly yoga sessions for building strength and calm between trips to the hills.',
    description:
      'Regular indoor and online sessions for the weeks between mountain days — building the mobility, core strength, and steady breathing that make the big days on the hill feel easier. Suitable for complete beginners as well as regular walkers.',
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find(service => service.slug === slug);
