import { prisma } from '../config/db';

const initialProducts = [
  {
    id: 'A3Ultra',
    slug: 'A3Ultra',
    name: 'HUTARK A3 Ultra',
    series: 'HUTARK A Series',
    tagline: 'Ultra-Performance Dynamic Bipedal Humanoid Robot',
    heroSubtitle: 'AHA3 full-body bio-inspired actuation and GO-3 foundation model.',
    heroImg: '/uploads/images/20261019/d000d7c155d324f34dde6ae2d90e04b8.png',
    overview: 'Flagship commercial bipedal humanoid with 44 DoF and 3.8 m/s running gait.',
    specs: JSON.stringify([
      { label: 'Height', value: '172 cm' },
      { label: 'Weight', value: '62 kg' },
      { label: 'Degrees of Freedom', value: '44 DoF' },
      { label: 'Max Speed', value: '3.8 m/s' }
    ]),
    features: JSON.stringify([
      { title: 'AHA3 Architecture', description: 'Up to 380 N·m torque density modular planetary joint actuators.' }
    ])
  },
  {
    id: 'X2',
    slug: 'X2',
    name: 'HUTARK X2',
    series: 'HUTARK X Series',
    tagline: 'Wheeled-Bipedal Dual-Arm Agile Manipulator',
    heroSubtitle: 'Hybrid dynamic balance and continuous manipulation.',
    heroImg: '/uploads/images/20250924/bcdaf302f10439090f551e9906ef7285.png',
    overview: 'High-speed wheeled locomotion combined with dexterous dual-arm manipulators.',
    specs: JSON.stringify([
      { label: 'Max Speed', value: '5.0 m/s' },
      { label: 'Payload', value: '10.0 kg Total' }
    ]),
    features: JSON.stringify([
      { title: 'Adaptive Suspension', description: 'Overcomes 15 cm obstacles with ease.' }
    ])
  },
  {
    id: 'G2',
    slug: 'G2',
    name: 'HUTARK G2',
    series: 'HUTARK G Series',
    tagline: 'Commercial Service & Retail Humanoid Robot',
    heroSubtitle: 'Interactive multimodal assistant for retail showrooms and venues.',
    heroImg: '/uploads/images/20251031/afa47f3a6d43c28b95a1534ed8310ad7.png',
    overview: 'Natural voice interaction and expressive facial indicators.',
    specs: JSON.stringify([
      { label: 'Height', value: '160 cm' },
      { label: 'Navigation', value: '3D LiDAR SLAM' }
    ]),
    features: JSON.stringify([
      { title: 'Multimodal Intent', description: 'Understands complex verbal and spatial human intents.' }
    ])
  },
  {
    id: 'D1_Pro',
    slug: 'D1_Pro',
    name: 'HUTARK D1 Pro',
    series: 'HUTARK D Series',
    tagline: 'Quadruped Agile Robotic Explorer',
    heroSubtitle: 'All-terrain inspection and agile patrol.',
    heroImg: '/uploads/images/20250924/e044a723bc5ab5aa5b3a8e0a09bd51e0.png',
    overview: 'Four-legged robotic platform for rugged industrial substations and pipe racks.',
    specs: JSON.stringify([
      { label: 'Speed', value: '3.5 m/s' },
      { label: 'Incline', value: 'Up to 35°' }
    ]),
    features: JSON.stringify([
      { title: 'Direct-Drive Motors', description: 'Zero-backlash dynamic leg actuation.' }
    ])
  },
  {
    id: 'C5',
    slug: 'C5',
    name: 'HUTARK C5',
    series: 'HUTARK C Series',
    tagline: 'Commercial Autonomous Floor Care Robot',
    heroSubtitle: 'Heavy-duty industrial and transit concourse floor cleaning.',
    heroImg: '/uploads/images/20251023/d59c5681d6db5d368849ac13334e98e9.png',
    overview: 'Up to 2500 m²/h autonomous scrubbing and water recycling.',
    specs: JSON.stringify([
      { label: 'Cleaning Rate', value: '2500 m²/h' },
      { label: 'Endurance', value: '4.5 Hours' }
    ]),
    features: JSON.stringify([
      { title: 'Base Station Docking', description: 'Automated water exchange and charging.' }
    ])
  }
];

const initialNews = [
  {
    id: 'apc-2026',
    title: '2026 HUTARK Innovation Day: Witnessing the Leap in Embodied AI',
    date: '2026-11-03',
    category: 'Events',
    summary: 'At the 2026 HUTARK Innovation Day, breakthroughs in physical foundation models were unveiled.',
    img: '/uploads/images/20261103/015bf1f9da95cc783f5e1e7363b3882c.png',
    content: JSON.stringify([
      {
        sectionHeading: 'The Physical AI Epoch Begins',
        body: ['HUTARK brought together top global roboticists to unveil the next decade of embodied intelligence.']
      }
    ])
  },
  {
    id: '20000th-robot',
    title: 'The 20,000th General-Purpose Embodied Robot Rolled off the Production Line',
    date: '2026-10-29',
    category: 'Corporate',
    summary: 'HUTARK reached 20,000 produced humanoid and quadruped units.',
    img: '/uploads/images/20261029/492548ce8722aa332e87aa47ce1019e5.png',
    content: JSON.stringify([
      {
        sectionHeading: 'Industrial Scalability Realized',
        body: ['Mass production of general-purpose robots is now an economic reality.']
      }
    ])
  }
];

export async function seedDatabase() {
  console.log('Seeding initial products...');
  for (const p of initialProducts) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: p,
      create: p,
    });
  }

  console.log('Seeding initial news...');
  for (const n of initialNews) {
    await prisma.newsArticle.upsert({
      where: { id: n.id },
      update: n,
      create: n,
    });
  }

  console.log('Database seeded successfully.');
}

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

