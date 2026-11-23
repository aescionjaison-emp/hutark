'use client';

export interface HeroSlide {
  title: string;
  titleFormatted: string;
  img: string;
  link: string;
}

export interface IntelligenceCard {
  title: string;
  subtitle: string;
  desc: string;
  video: string;
  poster: string;
}

export interface HomeProductItem {
  name: string;
  img: string;
  link: string;
}

export interface NewsItem {
  title: string;
  date: string;
  img: string;
  link: string;
}

export interface TechPillar {
  title: string;
  subtitle: string;
  desc: string;
  iconName?: string;
}

export interface CoreValue {
  title: string;
  desc: string;
}

export interface Milestone {
  year: string;
  title: string;
  desc: string;
}

export interface LeaderProfile {
  name: string;
  role: string;
  bio: string;
  img?: string;
}

export interface GlobalSiteSettings {
  siteName: string;
  logoUrl: string;
  fontFamily: string;
  accentColor: string;
  contactEmail: string;
  contactPhone: string;
  footerCopyright: string;
}

export interface FullSiteContent {
  global: GlobalSiteSettings;
  home: {
    heroSlides: HeroSlide[];
    intelligences: IntelligenceCard[];
    productsGrid: HomeProductItem[];
    featuredNews: NewsItem;
    newsList: { title: string; date: string; link: string }[];
  };
  rd: {
    badge: string;
    heroTitle: string;
    heroDesc: string;
    pillars: TechPillar[];
  };
  about: {
    badge: string;
    heroTitle: string;
    heroDesc: string;
    coreValues: CoreValue[];
    milestones: Milestone[];
    leadership: LeaderProfile[];
  };
}

export const DEFAULT_SITE_CONTENT: FullSiteContent = {
  global: {
    siteName: 'HUTARK Robotics',
    logoUrl: '/static/index/en/images/logo.png',
    fontFamily: 'Inter, system-ui, sans-serif',
    accentColor: '#0062c5',
    contactEmail: 'sales@hutark.com',
    contactPhone: '+86 (021) 8000-8888',
    footerCopyright: 'Copyright © 2023-2026 HUTARK Innovation Technology Co., Ltd. All rights reserved.'
  },
  home: {
    heroSlides: [
      {
        title: "HUTARK Tops Both the Gold Medal and Overall Medal Standings",
        titleFormatted: "HUTARK Tops Both the Gold Medal <br /> and Overall Medal Standings",
        img: "/uploads/images/20261103/710faba11315ce158d297edc209d14bf.png",
        link: "/news"
      },
      {
        title: "The 20,000th General-purpose Embodied Robot Rolled off the Production Line",
        titleFormatted: "The 20,000th General-purpose Embodied <br /> Robot Rolled off the Production Line",
        img: "/uploads/images/20261029/492548ce8722aa332e87aa47ce1019e5.png",
        link: "/products/A3Ultra"
      },
      {
        title: "2026 HUTARK Innovation Day: Witness Embodied AI Latest Advances",
        titleFormatted: "2026 HUTARK Innovation Day <br /> Witness Embodied AI Latest Advances",
        img: "/uploads/images/20261103/015bf1f9da95cc783f5e1e7363b3882c.png",
        link: "/news"
      },
      {
        title: "APC 2026: Keynote Speech by Deng Taihua",
        titleFormatted: "APC 2026 <br /> Keynote Speech by Deng Taihua",
        img: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
        link: "/about"
      }
    ],
    intelligences: [
      {
        title: "Locomotion Intelligence",
        subtitle: "Robust Dynamic Locomotion & Terrain Adaptation",
        desc: "Robust bipedal balance, high-speed agile gait generation, and zero-shot terrain adaptation over stairs, gravel, ice, and steep inclines.",
        video: "/static/index/en/video/index2/index2_One-v1.mp4",
        poster: "/static/index/en/video/index2/index2_One-v1-img.jpg"
      },
      {
        title: "Interactive Intelligence",
        subtitle: "Multimodal Intent & Conversational Reasoning",
        desc: "Multimodal audio-visual perception, spatial intention recognition, expressive non-verbal gestures, and emotional conversational reasoning.",
        video: "/static/index/en/video/index2/index2_One-v2.mp4",
        poster: "/static/index/en/video/index2/index2_One-v2-img.jpg"
      },
      {
        title: "Manipulation Intelligence",
        subtitle: "Sub-Millimeter Dexterity & Tactile Feedback",
        desc: "Sub-millimeter dexterous dual-arm coordination, force-feedback tactile sensing, and generalist foundation vision-to-action manipulation policies.",
        video: "/static/index/en/video/index2/index2_One-v3.mp4",
        poster: "/static/index/en/video/index2/index2_One-v3-img.jpg"
      }
    ],
    productsGrid: [
      { name: "HUTARK A3 Ultra", img: "/uploads/images/20261029/a45cd3ea1909796be5cca32223c71fac.jpg", link: "/products/A3Ultra" },
      { name: "HUTARK X2", img: "/uploads/images/20261029/82066bacdbeb17a0674ca29cd13d5b12.jpg", link: "/products/X2" },
      { name: "HUTARK G2", img: "/uploads/images/20261029/55303dc4864d9d5c35f52263a4dd2e46.jpg", link: "/products/G2" },
      { name: "HUTARK D1 Max", img: "/uploads/images/20261029/62974a39fa9e903d8e47b2cd2befc16e.png", link: "/products/D1_Max" },
      { name: "HUTARK A2 Ultra", img: "/uploads/images/20250922/7528a0359f8f7e09788972bdb5c35c2a.png", link: "/products/A2_Ultra" },
      { name: "HUTARK C5", img: "/uploads/images/20261029/8abd115118551853b3212bf47db783a0.jpg", link: "/products/C5" }
    ],
    featuredNews: {
      title: "Six HUTARK G2 Robots Complete 1,730 Tasks in 24-Hour Shanghai Convenience Store Trial",
      date: "2026-11-06",
      img: "/uploads/images/20261106/86677c2f141fe941919f878558713c2d.png",
      link: "/news"
    },
    newsList: [
      { title: "HUTARK Unveils GO-3 Preview, Takes Top Spot on Three Embodied AI Benchmarks", date: "2026-10-30", link: "/news" },
      { title: "World Robot Conference 2026: A3 Ultra Demonstrates Whole-Body Obstacle Negotiation", date: "2026-08-25", link: "/news" },
      { title: "Strategic Partnership Signed for Mass Deployment of Humanoid Robots in Smart Logistics", date: "2026-07-12", link: "/news" }
    ]
  },
  rd: {
    badge: "R & D & Innovation",
    heroTitle: "R & D: The Physical AI Architecture",
    heroDesc: "HUTARK bridges hardware engineering and artificial intelligence through Link-U OS, modular compliance actuators, and foundation physical neural models.",
    pillars: [
      {
        title: "Link-U OS",
        subtitle: "Embodied Robot Operating System",
        desc: "A hard real-time, microsecond-deterministic robotics operating system built on a microkernel architecture. Link-U OS coordinates joint actuation, sensor fusion, SLAM navigation, and neural policy execution."
      },
      {
        title: "AHA3 Bio-Inspired Hardware",
        subtitle: "High-Torque Density Modular Actuators",
        desc: "Proprietary Powerflow planetary actuators deliver up to 380 N·m peak torque with integrated absolute optical encoders and high-overload impact compliance."
      },
      {
        title: "GO-3 Foundation Model",
        subtitle: "Multimodal Vision-Language-Action Neural System",
        desc: "Trained on hundreds of thousands of hours of high-fidelity robotic telemetry. GO-3 processes spatial video and high-rate proprioception to synthesize continuous end-effector actions zero-shot."
      },
      {
        title: "Digital Twin & Sim2Real",
        subtitle: "Photorealistic Physics Simulation",
        desc: "Isaac Lab and MuJoCo verified simulation models allow developers to train and test manipulation skills in parallel across thousands of synthetic environments before zero-shot hardware deployment."
      }
    ]
  },
  about: {
    badge: "About HUTARK",
    heroTitle: "Empowering the World with Embodied Intelligence",
    heroDesc: "HUTARK is a global pioneer dedicated to researching, manufacturing, and deploying general-purpose humanoid robots and embodied foundation models.",
    coreValues: [
      { title: "Customer First", desc: "We focus on solving real-world physical automation bottlenecks with uncompromising reliability and rapid deployment cycles." },
      { title: "Ultimate Innovation", desc: "From bio-inspired harmonic joint actuation to foundation vision-language-action AI, we pursue frontier breakthroughs." },
      { title: "Practical Dedication", desc: "General-purpose robots must prove their economic value on production lines, cleanrooms, and commercial floors every single day." },
      { title: "Open Collaboration", desc: "We build an open ecosystem with Link-U OS, sharing developer SDKs and simulation environments with global robotics researchers." }
    ],
    milestones: [
      { year: "2026", title: "20,000th Robot & GO-3 Foundation Model", desc: "Celebrated mass production milestone and rolled out the AHA3 compliance architecture and Link-U OS 1.0 globally." },
      { year: "2025", title: "Commercial Fleet Deployments", desc: "Deployed hundreds of HUTARK A3 and X2 units across automotive, electronics, and micro-fulfillment facilities." },
      { year: "2024", title: "Bipedal Locomotion Breakthrough", desc: "Debuted full-body bipedal dynamic balance with real-time push recovery and blind terrain adaptation." },
      { year: "2023", title: "Foundation of HUTARK", desc: "Established with the vision of accelerating embodied artificial intelligence into physical reality." }
    ],
    leadership: [
      { name: "Deng Taihua", role: "Chairman & Chief Executive Officer", bio: "Former executive leading global communication and smart hardware engineering divisions, guiding HUTARK's commercial strategy." },
      { name: "Dr. Peng Zhihui", role: "Chief Technology Officer & Co-Founder", bio: "Pioneering roboticist and embedded architecture designer, directing actuator innovation and whole-body dynamic control." },
      { name: "Dr. Lin Chen", role: "Chief Scientist — Physical AI", bio: "Leading expert in reinforcement learning and Sim2Real foundation models, architect of the GO-3 embodied neural system." }
    ]
  }
};

const SITE_STORAGE_KEY = 'hutark_site_content';
const SITE_CONTENT_EVENT = 'hutark_site_content_updated';

export const siteContentStore = {
  getSiteContent(): FullSiteContent {
    if (typeof window === 'undefined') return DEFAULT_SITE_CONTENT;
    try {
      const stored = localStorage.getItem(SITE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Deep merge with defaults to ensure all keys exist
        return {
          global: { ...DEFAULT_SITE_CONTENT.global, ...(parsed.global || {}) },
          home: { ...DEFAULT_SITE_CONTENT.home, ...(parsed.home || {}) },
          rd: { ...DEFAULT_SITE_CONTENT.rd, ...(parsed.rd || {}) },
          about: { ...DEFAULT_SITE_CONTENT.about, ...(parsed.about || {}) }
        };
      }
    } catch (e) {
      console.warn('Failed to parse site content from localStorage:', e);
    }
    return DEFAULT_SITE_CONTENT;
  },

  saveSiteContent(content: FullSiteContent): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(SITE_STORAGE_KEY, JSON.stringify(content));
      window.dispatchEvent(new CustomEvent(SITE_CONTENT_EVENT, { detail: content }));
    } catch (e) {
      console.error('Failed to save site content:', e);
    }
  },

  resetSiteContent(): FullSiteContent {
    if (typeof window === 'undefined') return DEFAULT_SITE_CONTENT;
    try {
      localStorage.removeItem(SITE_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent(SITE_CONTENT_EVENT, { detail: DEFAULT_SITE_CONTENT }));
    } catch (e) {}
    return DEFAULT_SITE_CONTENT;
  },

  subscribe(callback: (content: FullSiteContent) => void): () => void {
    if (typeof window === 'undefined') return () => {};
    callback(siteContentStore.getSiteContent());

    const handler = (e: any) => {
      callback(e.detail || siteContentStore.getSiteContent());
    };

    window.addEventListener(SITE_CONTENT_EVENT, handler);
    window.addEventListener('storage', (e) => {
      if (e.key === SITE_STORAGE_KEY) {
        callback(siteContentStore.getSiteContent());
      }
    });

    return () => {
      window.removeEventListener(SITE_CONTENT_EVENT, handler);
    };
  }
};
