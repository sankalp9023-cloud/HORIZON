/**
 * Verified portfolio projects. Add a project here when its details are ready.
 */
export const projects = [
  {
    id: 'lifestack',
    name: 'LifeStack',
    subtitle: 'Personal productivity companion · Beta 0.1.0',
    description: 'A calm, all-in-one space to organize tasks, habits, study, and projects. Track consistency and progress with streaks, XP, levels, and badges. Guest-trial work is saved locally in the browser.',
    status: 'In Progress',
    year: '2026',
    category: 'Productivity',
    visualType: 'cover-image',
    imageSrc: '/lifestack-cover.jpeg',
    featured: true,
    metrics: [
      { label: 'Release', value: 'Beta 0.1.0' },
      { label: 'Trial mode', value: 'Guest access' },
      { label: 'Progress', value: 'XP · Streaks · Badges' }
    ],
    technologies: ['React', 'Vite', 'Fastify', 'Prisma', 'PostgreSQL', 'Vercel'],
    links: {}
  }
];

export const projectCategories = ['All', 'Productivity'];
