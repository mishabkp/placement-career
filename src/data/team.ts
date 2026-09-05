export interface TeamMember {
  name: string;
  role: string;
  /** Two-letter initials, e.g. 'MK' */
  avatar: string;
  /** Single-letter initial, used as a fallback when the photo fails to load */
  initial: string;
  /** Photo path — shown in the About page team cards */
  image: string;
  /** Placeholder contact number — replace with the real WhatsApp / call number before going live. */
  phone: string;
  dept: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Mishab KP',
    role: 'Full Stack Strategist',
    avatar: 'MK',
    initial: 'M',
    image: '/mishab.png',
    phone: '+919656760092',
    dept: 'B.Tech CSE • MGM College',
  },
  {
    name: 'Shareef KC',
    role: 'Cloud & Data Specialist',
    avatar: 'SK',
    initial: 'S',
    image: '/shareef.png',
    phone: '+917907470882',
    dept: 'B.Tech CSE • MGM College',
  },
  {
    name: 'Fina Nargees',
    role: 'Lead UI/UX Architect',
    avatar: 'FN',
    initial: 'F',
    image: '/fina.png',
    phone: '+919496906158',
    dept: 'B.Tech CSE • MGM College',
  },
  {
    name: 'Vimal KT',
    role: 'Innovation Lead',
    avatar: 'VK',
    initial: 'V',
    image: '/vimal.png',
    phone: '+918075790266',
    dept: 'B.Tech CSE • MGM College',
  },
];
