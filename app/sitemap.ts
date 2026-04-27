import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.coursquiz.com/',
      lastModified: new Date('2026-02-03T06:48:10+00:00'),
      priority: 1.00,
    },
    {
      url: 'https://www.coursquiz.com/auth/login',  
      lastModified: new Date('2026-02-03T06:48:10+00:00'),
      priority: 0.9,
    },
    {
      url: 'https://www.coursquiz.com/blog',
      lastModified: new Date('2026-02-03T06:48:10+00:00'),
      priority: 0.80,
    },
    {
      url: 'https://www.coursquiz.com/blog/methodes-apprentissage-etudiants-universite',
      lastModified: new Date('2026-02-03T06:48:10+00:00'),
      priority: 0.64,
    },
    {
      url: 'https://www.coursquiz.com/blog/techniques-memorisation-etudiants',
      lastModified: new Date('2026-02-03T06:48:10+00:00'),
      priority: 0.64,
    },
    {
      url: 'https://www.coursquiz.com/blog/gestion-temps-etudiants-universite',
      lastModified: new Date('2026-02-03T06:48:10+00:00'),
      priority: 0.64,
    },
    {
      url: 'https://www.coursquiz.com/blog/meilleurs-outils-reussir-annee',
      lastModified: new Date('2026-02-03T06:48:10+00:00'),
      priority: 0.64,
    },
  ];
}
