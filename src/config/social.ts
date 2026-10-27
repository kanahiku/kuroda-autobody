/**
 * Social and directory profile links.
 * Replace every URL when setting up a new site. `sameAs` is derived so schema.org
 * and the header/footer icons cannot drift apart.
 */
const profiles = [
  { label: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/kurodaautobody/' },
  {
    label: 'Facebook',
    icon: 'tabler:brand-facebook',
    href: 'https://www.facebook.com/profile.php?id=100063456943749',
  },
] as const;

export const SOCIAL = {
  /** Rendered by `SocialLinks` (header utility bar + footer "Visit Us"). */
  nav: profiles,
  sameAs: profiles.map((profile) => profile.href),
};
