export const siteConfig = {
  name: 'Bigelow Designs',
  shortName: 'Bigelow',
  description:
    'Interior design inspiration, room ideas, and honest product reviews for modern American & British homes.',
  url: 'https://bigelowdesigns.com',
  ogImage: 'https://bigelowdesigns.com/og-default.jpg',
  locale: 'en_US',
  twitterHandle: '@bigelowdesigns',
  publisher: {
    name: 'Bigelow Designs',
    logo: 'https://bigelowdesigns.com/logo.png',
  },
  nav: [
    {
      label: 'Rooms',
      href: '/rooms',
      children: [
        { label: 'Living Room', href: '/rooms/living-room' },
        { label: 'Kitchen', href: '/rooms/kitchen' },
        { label: 'Bedroom', href: '/rooms/bedroom' },
        { label: 'Bathroom', href: '/rooms/bathroom' },
        { label: 'Home Office', href: '/rooms/home-office' },
        { label: 'Outdoor', href: '/rooms/outdoor' },
      ],
    },
    {
      label: 'Styles',
      href: '/styles',
      children: [
        { label: 'Scandinavian', href: '/styles/scandinavian' },
        { label: 'Japandi', href: '/styles/japandi' },
        { label: 'Mid-Century Modern', href: '/styles/mid-century-modern' },
        { label: 'Farmhouse', href: '/styles/farmhouse' },
        { label: 'Coastal', href: '/styles/coastal' },
      ],
    },
    { label: 'Guides', href: '/guides' },
    { label: 'Reviews', href: '/reviews' },
  ],
} as const;

export type SiteNav = typeof siteConfig.nav;
