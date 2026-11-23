'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Compass,
  Eye,
  Users,
  ChevronRight,
  Briefcase,
  MapPin,
  Clock,
  Search,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Building,
  Mail,
  Phone,
  User,
  Send,
  X,
  Share2,
  Check,
  Quote,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Cpu,
  ShieldCheck
} from 'lucide-react';
import { siteContentStore, CeoProfile, LeaderProfile, OpenRole } from '../../services/siteContentStore';
import { inquiryStore } from '../../services/inquiryStore';

const CORE_VALUES = [
  {
    title: "Customer First",
    desc: "We focus on solving real-world physical automation bottlenecks with uncompromising reliability and rapid deployment cycles."
  },
  {
    title: "Ultimate Innovation",
    desc: "From bio-inspired harmonic joint actuation to foundation vision-language-action AI, we pursue frontier breakthroughs."
  },
  {
    title: "Practical Dedication",
    desc: "General-purpose robots must prove their economic value on production lines, cleanrooms, and commercial floors every single day."
  },
  {
    title: "Open Collaboration",
    desc: "We build an open ecosystem with Link-U OS, sharing developer SDKs and simulation environments with global robotics researchers."
  }
];

const MILESTONES = [
  {
    year: "2026",
    title: "20,000th Robot & GO-3 Foundation Model",
    desc: "Celebrated mass production milestone and rolled out the AHA3 compliance architecture and Link-U OS 1.0 globally."
  },
  {
    year: "2025",
    title: "Commercial Fleet Deployments",
    desc: "Deployed hundreds of HUTARK A3 and X2 units across automotive, electronics, and micro-fulfillment facilities."
  },
  {
    year: "2024",
    title: "Bipedal Locomotion Breakthrough",
    desc: "Debuted full-body bipedal dynamic balance with real-time push recovery and blind terrain adaptation."
  },
  {
    year: "2023",
    title: "Foundation of HUTARK",
    desc: "Established with the vision of accelerating embodied artificial intelligence into physical reality."
  }
];

const DEFAULT_CEO: CeoProfile = {
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
};

const DEFAULT_LEADERSHIP: LeaderProfile[] = [
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
];

const DEFAULT_OPEN_ROLES: OpenRole[] = [
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
];

export default function AboutPage() {
  const [aboutContent, setAboutContent] = useState(() => siteContentStore.getSiteContent().about);

  // Careers / Opening Roles State
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>(null);
  const [copiedRoleId, setCopiedRoleId] = useState<string | null>(null);

  // Application Modal State
  const [selectedRoleForApply, setSelectedRoleForApply] = useState<OpenRole | null>(null);
  const [applicantForm, setApplicantForm] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    portfolioUrl: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const unsub = siteContentStore.subscribe((content) => {
      setAboutContent(content.about);
    });
    return () => unsub();
  }, []);

  const coreValues = aboutContent?.coreValues && aboutContent.coreValues.length > 0 ? aboutContent.coreValues : CORE_VALUES;
  const milestones = aboutContent?.milestones && aboutContent.milestones.length > 0 ? aboutContent.milestones : MILESTONES;
  const ceo = aboutContent?.ceo || DEFAULT_CEO;
  const leadership = aboutContent?.leadership && aboutContent.leadership.length >= 6 ? aboutContent.leadership : DEFAULT_LEADERSHIP;
  const openRoles = aboutContent?.openRoles && aboutContent.openRoles.length > 0 ? aboutContent.openRoles : DEFAULT_OPEN_ROLES;

  // Extract unique departments for filter pills
  const departments = useMemo(() => {
    const set = new Set<string>();
    openRoles.forEach((r) => set.add(r.department));
    return ['All', ...Array.from(set)];
  }, [openRoles]);

  // Filter roles by department and search keyword
  const filteredRoles = useMemo(() => {
    return openRoles.filter((role) => {
      const matchDept = selectedDept === 'All' || role.department === selectedDept;
      const matchSearch =
        searchQuery.trim() === '' ||
        role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.department.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDept && matchSearch;
    });
  }, [openRoles, selectedDept, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedRoleId(expandedRoleId === id ? null : id);
  };

  const handleShareRole = (role: OpenRole) => {
    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/about#${role.id}` : '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopiedRoleId(role.id);
      setTimeout(() => setCopiedRoleId(null), 2500);
    }
  };

  const handleOpenApplyModal = (role: OpenRole) => {
    setSelectedRoleForApply(role);
    setSubmitStatus('idle');
    setApplicantForm({
      name: '',
      email: '',
      phone: '',
      organization: '',
      portfolioUrl: '',
      message: ''
    });
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoleForApply) return;
    setSubmitStatus('submitting');

    setTimeout(() => {
      // Record inside inquiryStore so it displays in /admin
      inquiryStore.saveInquiry({
        type: 'career_application',
        name: applicantForm.name,
        email: applicantForm.email,
        phone: applicantForm.phone,
        company: applicantForm.organization || 'Independent Candidate',
        productName: selectedRoleForApply.title,
        deploymentTier: `${selectedRoleForApply.department} (${selectedRoleForApply.type})`,
        message: `Candidate Application for ${selectedRoleForApply.title} [${selectedRoleForApply.location}]. Portfolio/Resume: ${applicantForm.portfolioUrl || 'None provided'}. Note: ${applicantForm.message || 'No additional note provided.'}`
      });

      setSubmitStatus('success');
    }, 600);
  };

  return (
    <div className="bg-white text-[#333333] pt-20 min-h-screen">
      {/* =========================================================================
          HERO BANNER (CLEAN LIGHT GRADIENT WITH ROBOTIC ACCENTS)
          ========================================================================= */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="site-container max-w-4xl text-center space-y-5">
          <span className="block text-xs font-bold uppercase tracking-widest text-brand-blue">
            {aboutContent?.badge || 'About HUTARK'}
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {aboutContent?.heroTitle || 'Empowering the World with Embodied Intelligence'}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            {aboutContent?.heroDesc || 'HUTARK is a global pioneer dedicated to researching, manufacturing, and deploying general-purpose humanoid robots and embodied foundation models.'}
          </p>

          {/* Quick Sub-navigation */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#CEO"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Our CEO
            </a>
            <a
              href="#Team"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Our Team
            </a>
            <a
              href="#Careers"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-blue-50 text-brand-blue border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              Opening Roles ({openRoles.length})
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHO WE ARE (#Identity)
          ========================================================================= */}
      <section id="Identity" className="py-24 border-b border-gray-100">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Pioneering General-Purpose Physical Robotics
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-light">
                At HUTARK, we believe general-purpose humanoid robots will fundamentally reshape productive human society. By integrating mechanical dexterity, robust bipedal locomotion, and real-time vision-to-action neural networks, we build intelligent machines that operate safely alongside humans.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                <div>
                  <span className="block text-3xl font-extrabold text-brand-blue">20,000+</span>
                  <span className="text-xs text-gray-500 font-medium">Robots Produced</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold text-brand-blue">80%</span>
                  <span className="text-xs text-gray-500 font-medium">R&D Engineers</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold text-brand-blue">300+</span>
                  <span className="text-xs text-gray-500 font-medium">Core Patents</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative h-[420px] rounded-3xl overflow-hidden shadow-xl bg-gray-100 border border-gray-200/80">
              <Image
                src="/uploads/images/20261029/492548ce8722aa332e87aa47ce1019e5.png"
                alt="HUTARK Manufacturing Facility"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MISSION & VISION (#Purpose)
          ========================================================================= */}
      <section id="Purpose" className="py-24 bg-[#f8f8f8] border-b border-gray-100">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-10 sm:p-12 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              <p className="text-base text-gray-600 leading-relaxed font-light">
                To liberate human potential from dangerous, tedious, and structurally scarce physical labor by delivering dependable, generalist embodied robots at accessible scale.
              </p>
            </div>

            <div className="bg-white p-10 sm:p-12 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-brand-cyan flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              <p className="text-base text-gray-600 leading-relaxed font-light">
                To build the world’s most trusted embodied intelligence platform, establishing general-purpose humanoids as ubiquitous assistants in manufacturing, science, commerce, and daily life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CORE VALUES (#Ethos)
          ========================================================================= */}
      <section id="Ethos" className="py-24 bg-white border-b border-gray-100">
        <div className="site-container">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
              Our Ethos
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="bg-[#f8f8f8] p-8 rounded-2xl border border-gray-200/80 space-y-3"
              >
                <span className="text-xs font-bold text-brand-blue uppercase">0{idx + 1}</span>
                <h4 className="text-xl font-bold text-gray-900">{val.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-light">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          MILESTONES & JOURNEY (#Journey)
          ========================================================================= */}
      <section id="Journey" className="py-24 bg-[#fbfbfb] border-b border-gray-100">
        <div className="site-container">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
              Timeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Milestones & Journey
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="md:w-32 flex-shrink-0">
                  <span className="text-3xl font-extrabold text-brand-blue">{m.year}</span>
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="text-lg font-bold text-gray-900">{m.title}</h4>
                  <p className="text-sm text-gray-600 font-light">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1A: CEO SPOTLIGHT (#CEO & #Leadership)
          ========================================================================= */}
      <section id="CEO" className="py-24 bg-white border-b border-gray-100 scroll-mt-20">
        <div className="site-container">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
              Executive Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Meet Our CEO
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-light">
              Guiding HUTARK&apos;s technological strategy, volume manufacturing scalability, and physical AI frontier research.
            </p>
          </div>

          <div className="max-w-6xl mx-auto bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-3xl border border-gray-200/90 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* CEO Portrait Column */}
              <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-[520px] bg-gray-900 overflow-hidden flex flex-col justify-end p-8 text-white">
                {/* CEO Portrait Asset */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ceo.img || "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg"}
                  alt={ceo.name}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-90 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                <div className="relative z-10 space-y-3">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-blue text-white shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Executive Spotlight</span>
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{ceo.name}</h3>
                    <p className="text-xs sm:text-sm text-cyan-300 font-medium">{ceo.role}</p>
                  </div>

                  {/* Stat Highlights */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/20 text-center">
                    {(ceo.stats || [
                      { label: "Robots Produced", value: "20,000+" },
                      { label: "Core AI Patents", value: "300+" },
                      { label: "R&D Engineers", value: "80%" }
                    ]).map((s, idx) => (
                      <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/10">
                        <span className="block text-base sm:text-lg font-extrabold text-white">{s.value}</span>
                        <span className="block text-[10px] text-gray-300 leading-tight">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CEO Biography & Vision Statement */}
              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8">
                {/* Vision Quote Banner */}
                <div className="relative bg-blue-50/70 border border-blue-100 rounded-2xl p-6 sm:p-8 space-y-3">
                  <Quote className="w-8 h-8 text-brand-blue/30 absolute top-4 right-4" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brand-blue">
                    Executive Philosophy
                  </span>
                  <p className="text-sm sm:text-base text-gray-800 italic leading-relaxed font-medium">
                    &ldquo;{ceo.quote}&rdquo;
                  </p>
                </div>

                {/* Biography Narrative */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                    <Building className="w-4 h-4 text-brand-blue" />
                    <span>Leadership & Corporate Mandate</span>
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light">
                    {ceo.bio}
                  </p>
                </div>

                {/* Key Achievements Bullet Points */}
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Strategic Milestones Under Leadership
                  </span>
                  <div className="space-y-2">
                    {(ceo.achievements || [
                      "Spearheaded HUTARK's scaling to 20,000+ general-purpose embodied robots produced",
                      "Architected global expansion across Asian, European, and North American industrial hubs",
                      "Pioneered enterprise deployments across Tier-1 automotive and cleanroom electronics sectors"
                    ]).map((ach, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2 flex items-center space-x-4">
                  <a
                    href="#Careers"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-brand-blue transition-colors text-xs font-bold shadow-sm"
                  >
                    <span>Join Our Team</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link
                    href="/news"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-600 hover:text-brand-blue transition-colors"
                  >
                    <span>Read Executive Speeches</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1B: OUR TEAM & CORE PIONEERS (#Team & #Leadership)
          ========================================================================= */}
      <section id="Team" className="py-24 bg-[#fbfbfb] border-b border-gray-100 scroll-mt-20">
        <div className="site-container">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
              World-Class Innovators
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Our Leadership & Engineering Team
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-light">
              Cross-disciplinary roboticists, artificial intelligence researchers, and mechanical hardware pioneers advancing embodied autonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {leadership.map((lead, idx) => {
              const initials = lead.name
                .replace(/^Dr\.\s*/i, '')
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('');

              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-5">
                    {/* Top Row: Avatar & Department */}
                    <div className="flex items-start justify-between">
                      {lead.img && lead.img.trim() !== '' ? (
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-md group-hover:scale-105 transition-transform bg-gray-50 flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={lead.img}
                            alt={lead.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
                          {initials}
                        </div>
                      )}
                      <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-right max-w-[180px] truncate">
                        {lead.department || 'Executive Leadership'}
                      </span>
                    </div>

                    {/* Name & Role */}
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-brand-blue transition-colors">
                        {lead.name}
                      </h4>
                      <p className="text-xs font-semibold text-brand-blue uppercase tracking-wider">
                        {lead.role}
                      </p>
                    </div>

                    {/* Bio Narrative */}
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                      {lead.bio}
                    </p>

                    {/* Tags */}
                    {lead.tags && lead.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {lead.tags.map((t, tidx) => (
                          <span
                            key={tidx}
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-brand-blue border border-blue-100"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Education / Credentials Footer */}
                  {lead.education && (
                    <div className="pt-4 border-t border-gray-100 flex items-center space-x-2 text-xs text-gray-500 font-light">
                      <GraduationCap className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{lead.education}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: OPENING ROLES & CAREERS (#Careers)
          ========================================================================= */}
      <section id="Careers" className="py-24 bg-white border-b border-gray-100 scroll-mt-20">
        <div className="site-container">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
              Join Our Mission
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Opening Roles
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
              Shape the future of physical artificial intelligence with us. We are assembling the world’s most ambitious roboticists, AI researchers, and systems engineers.
            </p>
          </div>

          {/* Search & Department Filters */}
          <div className="max-w-5xl mx-auto space-y-6 mb-12">
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search open positions by title, specialty, or location (e.g., Sim2Real, Actuator, Kernel, Munich)..."
                className="w-full bg-[#f8f8f8] hover:bg-gray-100 focus:bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {departments.map((dept) => {
                const isSelected = selectedDept === dept;
                const count =
                  dept === 'All'
                    ? openRoles.length
                    : openRoles.filter((r) => r.department === dept).length;

                return (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${isSelected
                      ? 'bg-brand-blue text-white shadow-md shadow-blue-500/20'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                  >
                    <span>{dept}</span>
                    <span className="ml-1.5 opacity-75 font-mono text-[11px]">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Job Listings List */}
          <div className="max-w-5xl mx-auto space-y-5">
            {filteredRoles.length === 0 ? (
              <div className="bg-[#f8f8f8] border border-gray-200 rounded-3xl p-12 text-center space-y-4">
                <Briefcase className="w-10 h-10 text-gray-400 mx-auto" />
                <h4 className="text-lg font-bold text-gray-800">No matching open roles found</h4>
                <p className="text-sm text-gray-500 font-light max-w-md mx-auto">
                  Try adjusting your search query or department filter, or send an open speculative application to our recruiting desk.
                </p>
                <a
                  href="mailto:careers@hutark.com?subject=Speculative General Application - HUTARK Robotics"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Speculative Application (careers@hutark.com)</span>
                </a>
              </div>
            ) : (
              filteredRoles.map((role) => {
                const isExpanded = expandedRoleId === role.id;

                return (
                  <div
                    key={role.id}
                    id={role.id}
                    className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200 space-y-6"
                  >
                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-brand-blue border border-blue-100">
                            {role.department}
                          </span>
                          <span className="flex items-center space-x-1 px-3 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span>{role.location}</span>
                          </span>
                          <span className="flex items-center space-x-1 px-3 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span>{role.type} • {role.experience}</span>
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                          {role.title}
                        </h3>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2.5 flex-shrink-0">
                        <button
                          onClick={() => handleShareRole(role)}
                          title="Share position link"
                          className="p-3 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {copiedRoleId === role.id ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Share2 className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleOpenApplyModal(role)}
                          className="px-6 py-3 rounded-xl bg-brand-blue text-white hover:bg-blue-700 transition-colors text-xs font-bold flex items-center space-x-2 shadow-sm"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Role Summary */}
                    <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
                      {role.summary}
                    </p>

                    {/* Expandable Accordion for Responsibilities & Requirements */}
                    <div>
                      <button
                        onClick={() => toggleExpand(role.id)}
                        className="inline-flex items-center space-x-1.5 text-xs font-semibold text-brand-blue hover:text-blue-800 transition-colors py-1 cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide' : 'View'} Key Responsibilities & Requirements</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                          {/* Responsibilities */}
                          <div className="space-y-3 bg-[#fbfbfb] p-5 rounded-2xl border border-gray-100">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center space-x-2">
                              <Cpu className="w-3.5 h-3.5 text-brand-blue" />
                              <span>Key Responsibilities</span>
                            </h5>
                            <ul className="space-y-2 text-xs text-gray-600">
                              {role.responsibilities.map((resp, rIdx) => (
                                <li key={rIdx} className="flex items-start space-x-2">
                                  <span className="text-brand-blue font-bold">•</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Requirements */}
                          <div className="space-y-3 bg-[#fbfbfb] p-5 rounded-2xl border border-gray-100">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center space-x-2">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Ideal Candidate Profile</span>
                            </h5>
                            <ul className="space-y-2 text-xs text-gray-600">
                              {role.requirements.map((req, rIdx) => (
                                <li key={rIdx} className="flex items-start space-x-2">
                                  <span className="text-emerald-600 font-bold">•</span>
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* General Inquiries Bottom Banner */}
          <div className="max-w-5xl mx-auto mt-14 bg-gradient-to-r from-gray-50 via-[#f8f8f8] to-gray-50 p-8 sm:p-10 rounded-3xl border border-gray-200 text-center space-y-4">
            <h4 className="text-xl font-bold text-gray-900">Don&apos;t see the exact fit for your domain?</h4>
            <p className="text-sm text-gray-600 font-light max-w-xl mx-auto">
              We are constantly seeking brilliant minds across computer vision, whole-body dynamic control, high-precision machining, and autonomous fleet orchestration.
            </p>
            <div className="pt-2">
              <a
                href="mailto:careers@hutark.com?subject=Open Talent Application - Embodied Robotics"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-brand-blue transition-colors text-xs font-bold"
              >
                <Mail className="w-4 h-4" />
                <span>Submit General Inquiry (careers@hutark.com)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE JOB APPLICATION MODAL
          ========================================================================= */}
      {selectedRoleForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue">
                  Application • {selectedRoleForApply.department}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {selectedRoleForApply.title}
                </h3>
                <p className="text-xs text-gray-500">
                  Location: {selectedRoleForApply.location} • {selectedRoleForApply.type}
                </p>
              </div>
              <button
                onClick={() => setSelectedRoleForApply(null)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitStatus === 'success' ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Application Submitted!</h4>
                <p className="text-sm text-gray-600 font-light max-w-md mx-auto leading-relaxed">
                  Thank you for applying to join HUTARK. Our talent acquisition committee and engineering leads will review your credentials and get back to you within 48 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSelectedRoleForApply(null)}
                    className="px-6 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-brand-blue transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={applicantForm.name}
                      onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })}
                      placeholder="e.g. Dr. Alex Mercer"
                      className="w-full bg-[#f8f8f8] border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={applicantForm.email}
                        onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                        placeholder="alex@domain.com"
                        className="w-full bg-[#f8f8f8] border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Direct Phone / WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={applicantForm.phone}
                        onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-[#f8f8f8] border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Current Organization / University
                  </label>
                  <input
                    type="text"
                    value={applicantForm.organization}
                    onChange={(e) => setApplicantForm({ ...applicantForm, organization: e.target.value })}
                    placeholder="e.g. Stanford AI Lab / Apex Robotics"
                    className="w-full bg-[#f8f8f8] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    LinkedIn / Google Scholar / GitHub / Portfolio URL
                  </label>
                  <input
                    type="url"
                    value={applicantForm.portfolioUrl}
                    onChange={(e) => setApplicantForm({ ...applicantForm, portfolioUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/... or https://scholar.google.com/..."
                    className="w-full bg-[#f8f8f8] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Candidate Summary / Cover Note
                  </label>
                  <textarea
                    rows={4}
                    value={applicantForm.message}
                    onChange={(e) => setApplicantForm({ ...applicantForm, message: e.target.value })}
                    placeholder="Briefly describe your relevant robotics, deep learning, or hardware experience and what you hope to build at HUTARK..."
                    className="w-full bg-[#f8f8f8] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white"
                  />
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRoleForApply(null)}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="px-6 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-sm disabled:opacity-50"
                  >
                    {submitStatus === 'submitting' ? (
                      <span>Submitting Profile...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
