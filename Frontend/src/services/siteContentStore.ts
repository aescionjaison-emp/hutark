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
  department?: string;
  img?: string;
  tags?: string[];
  education?: string;
}

export interface CeoProfile {
  name: string;
  role: string;
  quote: string;
  bio: string;
  achievements: string[];
  img: string;
  stats: { label: string; value: string }[];
}

export interface OpenRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
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
    newsList: NewsItem[];
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
    ceo: CeoProfile;
    leadership: LeaderProfile[];
    openRoles: OpenRole[];
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
      { title: "HUTARK Unveils GO-3 Preview, Takes Top Spot on Three Embodied AI Benchmarks", date: "2026-10-30", img: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg", link: "/news" },
      { title: "World Robot Conference 2026: A3 Ultra Demonstrates Whole-Body Obstacle Negotiation", date: "2026-08-25", img: "/uploads/images/20261029/492548ce8722aa332e87aa47ce1019e5.png", link: "/news" },
      { title: "Strategic Partnership Signed for Mass Deployment of Humanoid Robots in Smart Logistics", date: "2026-07-12", img: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg", link: "/news" }
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
    ceo: {
      name: "Deng Taihua",
      role: "Chairman of the Board & Chief Executive Officer",
      quote: "The convergence of physical foundation AI, microsecond-deterministic motor dynamics, and sub-millimeter dexterity is the defining technological renaissance of our generation. At HUTARK, our mission is to scale safe, capable, and economically accessible general-purpose humanoid intelligence to every enterprise worldwide.",
      bio: "Deng Taihua has over 25 years of global executive leadership in telecommunications, computing infrastructure, and intelligent hardware systems. Prior to leading HUTARK, he served as a Senior Vice President at Huawei, directing multi-billion-dollar global product lines across wireless networks and smart computing architectures. At HUTARK, Deng leads corporate strategy, global supply chain scaling, commercialization of general-purpose humanoid fleets, and the mission to liberate human labor through physical AI.",
      achievements: [
        "Spearheaded HUTARK's scaling to 20,000+ general-purpose embodied robots produced",
        "Architected global expansion across Asian, European, and North American industrial hubs",
        "Pioneered enterprise deployments across Tier-1 automotive and cleanroom electronics sectors"
      ],
      img: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
      stats: [
        { label: "Robots Produced", value: "20,000+" },
        { label: "Core AI Patents", value: "300+" },
        { label: "R&D Engineers", value: "80%" }
      ]
    },
    leadership: [
      {
        name: "Dr. Peng Zhihui",
        role: "Chief Technology Officer & Co-Founder",
        department: "Hardware & Actuator Dynamics",
        bio: "Pioneering roboticist and embedded hardware designer. Directs AHA3 modular compliance joints, harmonic drive dynamics, and full-body dynamic balance architectures.",
        img: "/uploads/team/peng_zhihui.svg",
        tags: ["AHA3 Actuation", "Bipedal Control", "Embedded HW"],
        education: "M.S. & Ph.D. in Robotics and Information Systems"
      },
      {
        name: "Dr. Lin Chen",
        role: "Chief Scientist — Physical AI",
        department: "AI Research & Sim2Real",
        bio: "Architect of the GO-3 multimodal vision-language-action foundation model. Leads reinforcement learning, cross-embodiment policy transfer, and synthetic simulation scaling.",
        img: "/uploads/team/lin_chen.svg",
        tags: ["GO-3 Model", "Reinforcement Learning", "Sim2Real"],
        education: "Ph.D. in Computer Science & Robotics (Postdoc Stanford)"
      },
      {
        name: "Dr. Katherine Zhao",
        role: "VP of Hardware Engineering",
        department: "Mechanical & Structural Dynamics",
        bio: "Directs mechanical structural engineering, titanium-aluminum composite chassis design, and planetary reducer thermal dissipation across the A and X humanoid series.",
        img: "/uploads/team/katherine_zhao.svg",
        tags: ["Harmonic Reducers", "Thermal Systems", "Structural Mechanics"],
        education: "Ph.D. in Mechanical Engineering"
      },
      {
        name: "Marcus Vance",
        role: "VP of Global Enterprise Deployment",
        department: "Commercial Operations & Fleet Delivery",
        bio: "Leads global commercial operations, enterprise SLA delivery, and industrial manufacturing line integrations across automotive, electronics, and micro-fulfillment clients.",
        img: "/uploads/team/marcus_vance.svg",
        tags: ["Enterprise Fleet", "Tier-1 Auto", "Global Operations"],
        education: "M.S. in Industrial Engineering & Operations Research"
      },
      {
        name: "Sofia Patel",
        role: "Head of Human-Robot Collaboration & Safety",
        department: "Safety Standards & Compliance",
        bio: "Directs whole-body collision mitigation, soft-skin compliance, force-limiting algorithms, and international ISO 13482 functional safety certification.",
        img: "/uploads/team/sofia_patel.svg",
        tags: ["ISO 13482", "Safe Collaboration", "Ergonomics"],
        education: "Ph.D. in Robotics Safety & Biomechanics"
      },
      {
        name: "Dr. Ethan Wei",
        role: "Director of Link-U OS & Systems",
        department: "Real-Time Embedded Systems",
        bio: "Directs the microsecond-deterministic Link-U Robot Operating System, real-time CAN-FD bus scheduling, and 3D semantic neural mapping on heterogeneous neural compute.",
        img: "/uploads/team/ethan_wei.svg",
        tags: ["Link-U OS", "Real-Time Microkernel", "Spatial SLAM"],
        education: "Ph.D. in Computer Engineering & Real-Time Kernels"
      }
    ],
    openRoles: [
      {
        id: "role-ai-policy",
        title: "Senior Embodied AI Policy Researcher (Sim2Real)",
        department: "Physical AI & Deep Learning",
        location: "Shanghai R&D Campus / Hybrid",
        type: "Full-Time",
        experience: "5+ Years",
        summary: "Lead reinforcement learning and imitation learning policy development for dexterous dual-arm manipulation using the GO-3 foundation model architecture.",
        responsibilities: [
          "Train large-scale vision-language-action (VLA) foundation policies on multi-modal robotic telemetry datasets.",
          "Develop domain-randomization and Sim2Real transfer pipelines using Isaac Sim / MuJoCo testbeds.",
          "Collaborate with hardware teams to optimize low-latency neural inference on embedded edge accelerators."
        ],
        requirements: [
          "Ph.D. or Master's in Computer Science, Robotics, or Machine Learning with top-tier conference publications (NeurIPS, ICRA, IROS, RSS).",
          "Proficiency in PyTorch, JAX, reinforcement learning algorithms (PPO, SAC, Diffusion Policy), and real-time inference.",
          "Demonstrated track record of deploying policies onto physical robotic arms or bipedal platforms."
        ]
      },
      {
        id: "role-actuator-mech",
        title: "Principal Actuator & Dynamic Systems Engineer",
        department: "Robotics Hardware & Actuators",
        location: "Shanghai R&D Campus",
        type: "Full-Time",
        experience: "7+ Years",
        summary: "Architect next-generation high-torque-density planar harmonic reducers and cycloidal planetary drives with integrated optical absolute encoders.",
        responsibilities: [
          "Design ultra-compact, high-overload modular rotary actuators exceeding 380 N·m torque density.",
          "Perform multi-physics FEA stress, thermal dissipation, and dynamic vibration simulations.",
          "Work with precision tooling partners for sub-micron machining tolerances and accelerated lifetime fatigue validation."
        ],
        requirements: [
          "Degree in Mechanical Engineering or Mechatronics with extensive experience in precision gearhead design.",
          "Deep expertise in gear design standards (AGMA, DIN), bearing selection, and high-efficiency PMSM motor integration.",
          "Proficiency in CAD (SolidWorks/Creo/NX) and FEA simulation packages (ANSYS/Abaqus)."
        ]
      },
      {
        id: "role-kernel-os",
        title: "Embedded Real-Time OS Kernel Architect (Link-U OS)",
        department: "Embedded Systems & Link-U OS",
        location: "Beijing AI Lab",
        type: "Full-Time",
        experience: "5+ Years",
        summary: "Architect microsecond-deterministic microkernel abstractions and CAN-FD / EtherCAT bus drivers coordinating 32+ multi-DoF joint nodes.",
        responsibilities: [
          "Design core scheduling, IPC, and shared-memory communication mechanisms for Link-U OS hard real-time kernel.",
          "Implement determinism benchmarks ensuring jitter < 5 microseconds across multi-core ARM/RISC-V architectures.",
          "Integrate hardware security modules (HSM) and encrypted over-the-air (OTA) bootloaders."
        ],
        requirements: [
          "BS/MS in Computer Science, Computer Engineering, or Electrical Engineering.",
          "Expert knowledge of real-time operating systems (RTOS: FreeRTOS, Zephyr, QNX, PREEMPT_RT Linux).",
          "Mastery of modern C, C++, and Rust with low-level register manipulation, memory-mapped I/O, and driver architecture."
        ]
      },
      {
        id: "role-fleet-solutions",
        title: "Robotics Fleet Solutions Architect",
        department: "Solutions & Enterprise Deployment",
        location: "Munich, Germany / Hybrid",
        type: "Full-Time",
        experience: "4+ Years",
        summary: "Lead customer engineering, factory integration, and autonomous fleet deployment for Tier-1 automotive and smart warehouse automation accounts in Europe.",
        responsibilities: [
          "Architect end-to-end integration between HUTARK Fleet Management System and enterprise MES/WMS platforms.",
          "Conduct on-site operational feasibility assessments, cycle-time optimizations, and robotic workcell design.",
          "Deliver tier-1 enterprise technical support and train customer robotics maintenance teams."
        ],
        requirements: [
          "Bachelor's or Master's in Robotics, Industrial Automation, or Systems Engineering.",
          "Strong background in industrial protocols (OPC UA, MQTT, ROS2, REST APIs) and automated material handling.",
          "Fluent English; German language proficiency is a strong advantage. Willingness to travel across European industrial sites."
        ]
      },
      {
        id: "role-vision-slam",
        title: "Computer Vision & Spatial SLAM Engineer",
        department: "Physical AI & Deep Learning",
        location: "Shanghai R&D Campus",
        type: "Full-Time",
        experience: "3+ Years",
        summary: "Develop high-speed 6-DoF visual-inertial odometry, dense 3D semantic mapping, and dynamic obstacle avoidance algorithms for bipedal navigation.",
        responsibilities: [
          "Develop real-time VIO/LiDAR-inertial state estimation systems robust to rapid head motion and dynamic illumination changes.",
          "Implement multi-camera depth estimation, 3D Gaussian splatting representations, and semantic occupancy grids.",
          "Benchmark navigation reliability on complex multi-floor industrial facilities and cluttered environments."
        ],
        requirements: [
          "Master's or Ph.D. in Computer Science, Robotics, or Electrical Engineering.",
          "Proficiency in C++, CUDA, OpenCV, Ceres Solver, GTSAM, and point-cloud processing (PCL).",
          "Hands-on experience with hardware sensor synchronization (ToF, Stereo, IMU, Solid-State LiDAR)."
        ]
      },
      {
        id: "role-safety-lead",
        title: "Human-Robot Safety & Standards Compliance Lead",
        department: "Robotics Hardware & Actuators",
        location: "Shanghai R&D Campus / Hybrid",
        type: "Full-Time",
        experience: "5+ Years",
        summary: "Oversee ISO 13482 and ISO 10218 safety certification, impact force limiting, and functional safety architecture across our entire humanoid lineup.",
        responsibilities: [
          "Lead hazard identification and risk assessment (HIRA) per ISO 12100 and ISO 13482 standards.",
          "Design hardware-in-the-loop (HIL) safety interlocks, emergency stop architectures, and torque monitoring watchdogs.",
          "Liaise with international testing authorities (TÜV, CE, UL) for global commercial type-approvals."
        ],
        requirements: [
          "Degree in Electrical Engineering, Mechatronics, or Safety Engineering.",
          "Certified Functional Safety Expert (CFSE/TÜV) or equivalent with experience in machinery safety directives.",
          "Deep understanding of dual-channel safety PLCs, ISO 13849 (PLd/PLe), and IEC 61508."
        ]
      }
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
        const parsedAbout = parsed.about || {};
        const aboutMerged = {
          ...DEFAULT_SITE_CONTENT.about,
          ...parsedAbout,
          ceo: parsedAbout.ceo ? { ...DEFAULT_SITE_CONTENT.about.ceo, ...parsedAbout.ceo } : DEFAULT_SITE_CONTENT.about.ceo,
          openRoles: parsedAbout.openRoles && parsedAbout.openRoles.length > 0 ? parsedAbout.openRoles : DEFAULT_SITE_CONTENT.about.openRoles,
          leadership: parsedAbout.leadership && parsedAbout.leadership.length > 0 ? parsedAbout.leadership : DEFAULT_SITE_CONTENT.about.leadership,
        };
        return {
          global: { ...DEFAULT_SITE_CONTENT.global, ...(parsed.global || {}) },
          home: { ...DEFAULT_SITE_CONTENT.home, ...(parsed.home || {}) },
          rd: { ...DEFAULT_SITE_CONTENT.rd, ...(parsed.rd || {}) },
          about: aboutMerged
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
