export const siteConfig = {
  name: 'Bigelow Designs',
  shortName: 'Bigelow',
  description:
    'Editorial interior design guides, honest furniture reviews, and design trend coverage for modern homes.',
  url: 'https://www.bigelowdesigns.com',
  ogImage: 'https://www.bigelowdesigns.com/og-default.jpg',
  locale: 'en_US',
  twitterHandle: '@bigelowdesigns',
  publisher: {
    name: 'Bigelow Designs',
    logo: 'https://www.bigelowdesigns.com/bigelow-interior-design-logo.webp',
  },
  nav: [
    {
      label: 'Room Guides',
      href: '/rooms',
      children: [
        { label: 'Living Room', href: '/rooms/living-room' },
        { label: 'Kitchen',     href: '/rooms/kitchen'     },
        { label: 'Bedroom',     href: '/rooms/bedroom'     },
        { label: 'Bathroom',    href: '/rooms/bathroom'    },
        { label: 'Home Office', href: '/rooms/home-office' },
        { label: 'Outdoor Guides', href: '/rooms/outdoor-guides' },
      ],
    },
    { label: 'Furniture Reviews', href: '/reviews'       },
    { label: 'Design Trends',    href: '/design-trends' },
  ],
} as const;

export type SiteNav = typeof siteConfig.nav;
