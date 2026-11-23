'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Mail, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Download, 
  Cpu, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Radio, 
  Eye, 
  BatteryCharging, 
  Move, 
  Sliders, 
  Activity,
  Send,
  Sparkles,
  Edit3,
  Video
} from 'lucide-react';
import { ProductData } from '../../types';
import YouTubeVideoSlider from './YouTubeVideoSlider';
import AdminProductEditorDrawer from './AdminProductEditorDrawer';
import { getProductData } from '../../services/productStore';
import { adminAuth } from '../../services/adminAuth';

interface ProductDetailViewProps {
  product: ProductData;
  relatedProducts: ProductData[];
}

export default function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const searchParams = useSearchParams();
  const [currentProduct, setCurrentProduct] = useState<ProductData>(product);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Sync state with productStore and adminAuth
  useEffect(() => {
    const loaded = getProductData(product.id);
    setCurrentProduct(loaded);

    // Subscribe to auth state
    const unsubAuth = adminAuth.subscribe((auth) => {
      setIsAdmin(auth);
      if (auth && searchParams.get('admin') === 'true') {
        setIsAdminDrawerOpen(true);
      }
    });

    const handleUpdate = (e: any) => {
      if (e.detail?.id === product.id || e.detail?.all) {
        setCurrentProduct(getProductData(product.id));
      }
    };
    window.addEventListener('hutark_product_updated', handleUpdate);
    return () => {
      unsubAuth();
      window.removeEventListener('hutark_product_updated', handleUpdate);
    };
  }, [product.id, searchParams]);

  // Matching List Active Tab
  const [activeTab, setActiveTab] = useState<'all' | 'head' | 'arms' | 'chassis' | 'hands' | 'power'>('all');

  // Contact Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    industry: 'Manufacturing',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Styling & Theme Overrides from Admin
  const primaryColor = currentProduct.customStyles?.primaryColor || '#0062c5';
  const customFont = currentProduct.customStyles?.fontFamily;

  // Dynamic Image Paths & Sections with High-Fidelity Defaults
  const heroBannerBg = currentProduct.heroBannerBg || "/uploads/images/20261103/015bf1f9da95cc783f5e1e7363b3882c.png";
  const cinematicImg = currentProduct.cinematicImg || "/uploads/images/20261029/492548ce8722aa332e87aa47ce1019e5.png";
  const manipulationImg = currentProduct.manipulationImg || "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg";
  const interactionImg = currentProduct.interactionImg || "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg";
  const matchingDiagramImg = currentProduct.matchingListImg || "/uploads/images/20261029/62974a39fa9e903d8e47b2cd2befc16e.png";

  // Dynamic Cinematic Content
  const cinematicHeading = currentProduct.cinematicHeading || "Full Scenario Embodied Intelligence";
  const cinematicSubheading = currentProduct.cinematicSubheading || "PHYSICAL AI BREAKTHROUGH";
  const cinematicDesc = currentProduct.cinematicDesc || "Equipped with end-to-end foundation physical AI policy networks, navigating dynamic industrial shop floors, unmapped warehouses, and human co-working spaces with continuous multi-sensor real-time coordination.";
  const cinematicMetrics = currentProduct.cinematicMetrics || [
    { value: "1000 Hz", label: "Bus Sync Rate" },
    { value: "380 N·m", label: "Peak Joint Torque" },
    { value: "< 1 ms", label: "Control Latency" }
  ];

  // Dynamic Manipulation Content
  const manipulationHeading = currentProduct.manipulationHeading || "High Precision Dexterous Manipulation";
  const manipulationSubtitle = currentProduct.manipulationSubtitle || "SUB-MILLIMETER DEXTERITY";
  const manipulationDesc = currentProduct.manipulationDesc || "High-density optical-tactile fingertip sensors deliver dynamic micro-force feedback down to 0.01 N. Capable of handling delicate smartphone display glass, flexible cable harness insertion, and precision electronics fastener assembly.";
  const manipulationFeatures = currentProduct.manipulationFeatures || [
    "Multi-axis dynamic optical-tactile feedback array",
    "Sub-millimeter position & force impedance hybrid control",
    "Zero-damage handling of fragile glassware and electronic components"
  ];

  // Dynamic Interaction Content
  const interactionHeading = currentProduct.interactionHeading || "Natural Multimodal Cognitive Dialogue";
  const interactionSubtitle = currentProduct.interactionSubtitle || "HUMAN-ROBOT COLLABORATION";
  const interactionDesc = currentProduct.interactionDesc || "Powered by the GO-3 physical foundation model, interpreting natural language spoken tasks, spatial pointing gestures, and visual environmental state changes zero-shot.";
  const interactionBubbles = currentProduct.interactionBubbles || [
    { title: "Spatial Perception Intent:", text: "Workstation target acquired: Calibrating end-effector pose..." },
    { title: "Collaborative Feedback:", text: "Assembly verified: Tolerances strictly within ±0.03 mm." }
  ];

  // Dynamic Hardware Modules
  const hardwareModules = currentProduct.hardwareModules || [
    {
      title: "Dual-Arm High-Payload Coordination",
      subtitle: "7-DoF Active Degrees of Freedom Per Arm",
      desc: "Delivers sub-millimeter trajectory repeatability, dynamic gravity compensation, and high-load force compliance for heavy tooling and sensitive assembly.",
      img: "/uploads/images/20261029/55303dc4864d9d5c35f52263a4dd2e46.jpg"
    },
    {
      title: "Panoramic 3D Perception System",
      subtitle: "Integrated 3D LiDAR & RGB-D Vision",
      desc: "Millimeter-accuracy spatial point cloud generation, real-time SLAM navigation, and dynamic obstacle trajectory prediction across cluttered floors.",
      img: "/uploads/images/20261029/82066bacdbeb17a0674ca29cd13d5b12.jpg"
    },
    {
      title: "Modular Bio-Inspired Joint Actuators",
      subtitle: "High Torque-Density Planetary Drives",
      desc: "Proprietary Powerflow modular actuators deliver up to 380 N·m peak torque with dual absolute optical encoders and high-overload impact compliance.",
      img: "/uploads/images/20261029/8abd115118551853b3212bf47db783a0.jpg"
    },
    {
      title: "Omnidirectional Dynamic Mobility Chassis",
      subtitle: "Active Suspension & 360° Zero-Radius Rotation",
      desc: "Independent dual-wheel drive module with dynamic balance suspension, enabling seamless traversal across 15cm steps, ramp inclines, and warehouse docks.",
      img: "/uploads/images/20261029/a45cd3ea1909796be5cca32223c71fac.jpg"
    },
    {
      title: "Quick-Swap Industrial Energy Architecture",
      subtitle: "Continuous 24/7 Autonomous Operation",
      desc: "Hot-swappable dual battery design paired with autonomous magnetic docking stations ensures perpetual operational readiness with zero downtime.",
      img: "/uploads/images/20261029/208c523904a5188395bf9b50f0c94334.jpg"
    },
    {
      title: "Triple-Layer Industrial Safety Compliance",
      subtitle: "SIL-2 Certified Multi-Sensor Safeguards",
      desc: "Hardware-level dual emergency e-stops, 360° ultrasonic proximity rings, and low-latency motor braking ensure certified operator co-working safety.",
      img: "/uploads/images/20241230/1968be56db5f4f93c2d514a82df24944.png"
    }
  ];

  // Dynamic Application Scenarios
  const applicationScenarios = currentProduct.applicationScenarios || [
    {
      title: "Automotive & Electronics Assembly",
      subtitle: "High-Throughput Workstations",
      desc: "Handling wire harness routing, precision screw driving, and in-line automated optical inspection.",
      img: "/uploads/images/20261029/763c5b4b30767904e5cddda22e083597.png"
    },
    {
      title: "Hazardous Inspection & Patrol",
      subtitle: "Substations & Petrochemical Yards",
      desc: "Autonomous 24/7 patrol, infrared thermal anomaly detection, and remote dial readings across rough gravel.",
      img: "/uploads/images/20260429/6cc43e41089201e697d1bb7de197b8e8.png"
    },
    {
      title: "Scientific Cleanrooms & Biotech",
      subtitle: "Class-100 Contamination-Free",
      desc: "Semiconductor wafer cassette manipulation, vibration-damped chemical transfer, and sterile reagent mixing.",
      img: "/uploads/images/20251023/d59c5681d6db5d368849ac13334e98e9.png"
    },
    {
      title: "VR Teleoperation & Digital Twin",
      subtitle: "Human-in-the-Loop Cockpit",
      desc: "Real-time bilateral force-feedback teleoperation for hazardous tasks and offline demonstration data collection.",
      img: "/uploads/images/20261106/86677c2f141fe941919f878558713c2d.png"
    }
  ];

  // Dynamic Matching List Chips
  const matchingListChips = currentProduct.matchingListChips || [
    { label: "Head Vision", value: "RGB-D + LiDAR" },
    { label: "Dual Arms", value: "7-DoF Active" },
    { label: "Hands", value: "Tactile Fingertips" },
    { label: "Torso Control", value: "Dual Thor 2000T" },
    { label: "Base Mobility", value: "Omnidirectional" },
    { label: "Power Bay", value: "Hot-Swappable 48V" }
  ];

  // Dynamic Specification Rows
  const specRows = currentProduct.specRows || [
    { category: "Basic Parameters", item: "Total Height", value: "165 – 172 cm (Configurable)" },
    { category: "Basic Parameters", item: "Total System Weight", value: "58 – 65 kg (Including Battery)" },
    { category: "Basic Parameters", item: "Active Degrees of Freedom (DoF)", value: "38 – 44 Active DoF" },
    { category: "Basic Parameters", item: "Operating Temperature", value: "-10°C to +45°C" },
    { category: "Basic Parameters", item: "Enclosure Protection Rating", value: "IP54 / Industrial Splashproof" },

    { category: "Arm & Manipulation", item: "Degrees of Freedom Per Arm", value: "7-DoF (Spherical Wrist)" },
    { category: "Arm & Manipulation", item: "Single Arm Rated Payload", value: "4.5 – 5.5 kg" },
    { category: "Arm & Manipulation", item: "Dual Arm Combined Payload", value: "10.0 – 12.0 kg" },
    { category: "Arm & Manipulation", item: "Arm Maximum Reach", value: "850 mm" },
    { category: "Arm & Manipulation", item: "Trajectory Repeatability", value: "±0.05 mm" },

    { category: "Chassis & Mobility", item: "Drive Architecture", value: "Omnidirectional Dual-Wheel Drive / Bipedal Hybrid" },
    { category: "Chassis & Mobility", item: "Maximum Travel Speed", value: "Up to 3.8 m/s" },
    { category: "Chassis & Mobility", item: "Turning Radius", value: "0 mm (360° In-Place Rotation)" },
    { category: "Chassis & Mobility", item: "Obstacle Crossing Ability", value: "15 cm Step / 35 mm Gap" },
    { category: "Chassis & Mobility", item: "Maximum Gradeability", value: "15° Slope" },

    { category: "Battery & Energy", item: "Battery Chemistry", value: "High-Energy Density Automotive Lithium-Ion" },
    { category: "Battery & Energy", item: "Nominal Voltage & Capacity", value: "48 V / 30 Ah (1440 Wh)" },
    { category: "Battery & Energy", item: "Continuous Operating Runtime", value: "4.5 – 6.0 Hours" },
    { category: "Battery & Energy", item: "Charging Time", value: "1.2 Hours Fast-Charge (Hot-Swappable)" },

    { category: "Perception & Compute", item: "Primary AI Compute Unit", value: "Dual Drive Thor Platform (Up to 2000 TOPS)" },
    { category: "Perception & Compute", item: "Vision Sensors", value: "Dual Stereo RGB-D Cameras + 360° Solid-State LiDAR" },
    { category: "Perception & Compute", item: "Audio & Voice", value: "6-Channel Circular Beamforming Microphone Array" },
    { category: "Perception & Compute", item: "Real-Time Bus & OS", value: "EtherCAT (1000 Hz) / Link-U OS" }
  ];

  return (
    <div className="bg-white text-[#333333] pt-20 min-h-screen" style={{ fontFamily: customFont }}>
      {/* =========================================================================
          SECONDARY PRODUCT SUB-NAVIGATION & BREADCRUMBS
          ========================================================================= */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
        <div className="site-container flex items-center justify-between py-3">
          <div className="flex items-center space-x-2 text-xs">
            <Link href="/" className="text-gray-500 hover:text-brand-blue transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/products" className="text-gray-500 hover:text-brand-blue transition-colors">Products</Link>
            <span className="text-gray-300">/</span>
            <span className="font-bold text-gray-900">{currentProduct.name}</span>
          </div>

          <div className="hidden md:flex items-center space-x-5 text-xs font-semibold text-gray-600">
            <button onClick={() => scrollToSection('hero-section')} className="hover:text-[#0062c5] transition-colors cursor-pointer">Overview</button>
            <button onClick={() => scrollToSection('intelligence-section')} className="hover:text-[#0062c5] transition-colors cursor-pointer">Embodied AI</button>
            <button onClick={() => scrollToSection('dexterity-section')} className="hover:text-[#0062c5] transition-colors cursor-pointer">Dexterity</button>
            <button onClick={() => scrollToSection('hardware-section')} className="hover:text-[#0062c5] transition-colors cursor-pointer">Hardware</button>
            <button onClick={() => scrollToSection('scenarios-section')} className="hover:text-[#0062c5] transition-colors cursor-pointer">Scenarios</button>
            <button onClick={() => scrollToSection('matching-section')} className="hover:text-[#0062c5] transition-colors cursor-pointer">Matching List</button>
            <button onClick={() => scrollToSection('specifications-section')} className="hover:text-[#0062c5] transition-colors cursor-pointer">Specifications</button>
            <button onClick={() => scrollToSection('videos-section')} className="hover:text-[#0062c5] transition-colors cursor-pointer flex items-center space-x-1">
              <Video className="w-3.5 h-3.5 text-cyan-600" />
              <span>Video Slides</span>
            </button>
            <button 
              onClick={() => scrollToSection('contact-section')} 
              style={{ backgroundColor: primaryColor }}
              className="hover:opacity-90 text-white px-4 py-1.5 rounded-full transition-all text-xs font-bold shadow-sm cursor-pointer"
            >
              Inquire Now
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          1. HERO BANNER (MATCHING SCREENSHOT TOP: SKY, BLUE HILLS & ROBOT)
          ========================================================================= */}
      <section id="hero-section" className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center overflow-hidden bg-[#eef3f7] border-b border-gray-200">
        {/* Sky / Landscape Banner Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBannerBg}
            alt={currentProduct.name}
            fill
            priority
            className="object-cover object-left-bottom opacity-90"
          />
          {/* Subtle gradient to enhance text readability on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-white/90 lg:to-white/95" />
        </div>

        {/* Content Container */}
        <div className="site-container relative z-10 w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Robot Showcase */}
            <div className="hidden lg:block lg:col-span-6 min-h-[400px]">
              {currentProduct.heroImg && (
                <div className="relative w-full h-[520px] transition-transform duration-700 hover:scale-[1.02]">
                  <Image
                    src={currentProduct.heroImg}
                    alt={currentProduct.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              )}
            </div>

            {/* Right Hero Typography */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div 
                style={{ borderColor: primaryColor, color: primaryColor }}
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider bg-blue-50/90 px-3.5 py-1.5 rounded-full border shadow-sm backdrop-blur-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentProduct.series}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-950 tracking-tight leading-none uppercase">
                {currentProduct.name}
              </h1>

              <p className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-tight">
                {currentProduct.tagline}
              </p>

              <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed max-w-xl">
                {currentProduct.overview}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => scrollToSection('contact-section')}
                  style={{ backgroundColor: primaryColor }}
                  className="hover:opacity-95 text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg hover:shadow-xl text-sm flex items-center space-x-2.5 active:scale-95 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Inquire Deployment</span>
                </button>

                <button
                  onClick={() => scrollToSection('specifications-section')}
                  className="bg-white/90 hover:bg-white text-gray-900 border border-gray-300 font-semibold px-8 py-3.5 rounded-full transition-all shadow-sm text-sm flex items-center space-x-2 hover:border-gray-400 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-gray-600" />
                  <span>Specifications</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CINEMATIC DARK CHAMBER (MATCHING SCREENSHOT: FULL SCENARIO EMBODIED INTELLIGENCE)
          ========================================================================= */}
      <section id="intelligence-section" className="relative w-full min-h-[750px] lg:min-h-[850px] bg-[#050608] text-white flex items-center overflow-hidden">
        {/* Full-width atmospheric background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={cinematicImg}
            alt={cinematicHeading}
            fill
            className="object-cover object-center opacity-85"
          />
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/70" />
        </div>

        <div className="site-container relative z-10 w-full py-20">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              {cinematicSubheading}
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {cinematicHeading}
            </h2>

            <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
              {cinematicDesc}
            </p>

            {/* Metrics Chips */}
            <div className="pt-4 grid grid-cols-3 gap-4">
              {cinematicMetrics.map((met, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <div className="text-2xl font-black text-cyan-300">{met.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{met.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. MACRO DEXTEROUS MANIPULATION (MATCHING SCREENSHOT: ROBOT HAND ON GLASS SCREEN)
          ========================================================================= */}
      <section id="dexterity-section" className="relative w-full min-h-[650px] lg:min-h-[780px] bg-[#090b10] text-white flex items-center overflow-hidden">
        {/* High-res Macro Hand on Phone Glass */}
        <div className="absolute inset-0 z-0">
          <Image
            src={manipulationImg}
            alt={manipulationHeading}
            fill
            className="object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="site-container relative z-10 w-full py-20">
          <div className="max-w-xl space-y-6">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
              {manipulationSubtitle}
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {manipulationHeading}
            </h2>

            <p className="text-base text-gray-300 font-light leading-relaxed">
              {manipulationDesc}
            </p>

            <ul className="space-y-3 pt-2 text-sm text-gray-200">
              {manipulationFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. INTERACTIVE COGNITIVE DIALOGUE (MATCHING SCREENSHOT: FACE WITH CYAN BUBBLES)
          ========================================================================= */}
      <section id="interaction-section" className="relative w-full min-h-[650px] lg:min-h-[750px] bg-[#0c0f16] text-white flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={interactionImg}
            alt={interactionHeading}
            fill
            className="object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/45 to-transparent" />
        </div>

        {/* Floating Holographic Dialogue Bubbles (Left Side) */}
        <div className="hidden lg:block absolute left-16 top-1/3 z-20 space-y-4 max-w-xs">
          {interactionBubbles.map((bub, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-2xl backdrop-blur-md shadow-2xl text-xs border ${
                idx === 0 
                  ? 'bg-cyan-950/70 border-cyan-400/40 text-cyan-200 animate-pulse' 
                  : 'bg-blue-950/70 border-blue-400/40 text-blue-200'
              }`}
            >
              <span className="font-bold text-cyan-300 block mb-1">{bub.title}</span>
              &quot;{bub.text}&quot;
            </div>
          ))}
        </div>

        {/* Right Side Text Content */}
        <div className="site-container relative z-10 w-full py-20 flex justify-end">
          <div className="max-w-xl space-y-6 text-left">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
              {interactionSubtitle}
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {interactionHeading}
            </h2>

            <p className="text-base text-gray-300 font-light leading-relaxed">
              {interactionDesc}
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="border border-white/10 p-4 rounded-2xl bg-white/5 backdrop-blur-sm">
                <span className="text-xs font-bold text-cyan-400 uppercase">Expressive UI</span>
                <p className="text-xs text-gray-300 mt-1">High-luminance dual LED eye matrices communicate status & gaze intent intuitively.</p>
              </div>
              <div className="border border-white/10 p-4 rounded-2xl bg-white/5 backdrop-blur-sm">
                <span className="text-xs font-bold text-cyan-400 uppercase">Acoustic Array</span>
                <p className="text-xs text-gray-300 mt-1">6-mic circular beamforming isolating operator speech in 85 dB noisy factory floors.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. CORE HARDWARE & ENGINEERING CARDS (MATCHING SCREENSHOT: 2x3 WHITE GRID)
          ========================================================================= */}
      <section id="hardware-section" className="py-24 bg-[#f8f9fa] border-b border-gray-200">
        <div className="site-container">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0062c5]">
              ENGINEERING MATRIX
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
              Core Hardware Architecture
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-light max-w-2xl mx-auto">
              Modular precision components engineered for million-cycle industrial durability and microsecond synchronization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {hardwareModules.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 p-8 flex flex-col justify-between group overflow-hidden"
              >
                <div className="space-y-3 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0062c5]">
                    {item.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#0062c5] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="relative h-64 sm:h-72 w-full bg-[#f4f5f7] rounded-2xl overflow-hidden flex items-center justify-center p-4">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. INDUSTRIAL SCENARIOS & DEPLOYMENT (MATCHING SCREENSHOT: 2x2 DARK CARDS)
          ========================================================================= */}
      <section id="scenarios-section" className="py-24 bg-[#0a0c10] text-white">
        <div className="site-container">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
              INDUSTRIAL REAL-WORLD DEPLOYMENT
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Deployment Scenarios
            </h2>
            <p className="text-sm sm:text-base text-gray-400 font-light max-w-2xl mx-auto">
              Proven operational reliability across high-precision manufacturing, energy infrastructure, research, and remote teleoperation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {applicationScenarios.map((scen, idx) => (
              <div
                key={idx}
                className="relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[420px] flex flex-col justify-end p-8 border border-white/10 group shadow-2xl"
              >
                {/* Background Scenario Image */}
                <Image
                  src={scen.img}
                  alt={scen.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                <div className="relative z-10 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    {scen.subtitle}
                  </span>
                  <h4 className="text-2xl font-bold text-white tracking-tight">
                    {scen.title}
                  </h4>
                  <p className="text-sm text-gray-300 font-light leading-relaxed">
                    {scen.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. "MATCHING LIST" / ROBOT ANATOMY (MATCHING SCREENSHOT SECTION)
          ========================================================================= */}
      <section id="matching-section" className="py-24 bg-white border-b border-gray-200">
        <div className="site-container">
          <div className="text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0062c5]">
              ANATOMICAL BREAKDOWN
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
              Matching List
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-light max-w-2xl mx-auto">
              Inspect the comprehensive physical architecture, sub-assemblies, and sensor integration callouts for {product.name}.
            </p>

            {/* Interactive Component Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
              {[
                { id: 'all', label: 'All Components' },
                { id: 'head', label: 'Head & Vision' },
                { id: 'arms', label: 'Dual Arms' },
                { id: 'hands', label: 'Dexterous Hands' },
                { id: 'chassis', label: 'Mobility Chassis' },
                { id: 'power', label: 'Battery & Power' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#0062c5] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* High-Resolution Anatomy Diagram Image from Reference */}
          <div className="relative w-full min-h-[500px] sm:min-h-[700px] lg:min-h-[850px] bg-[#fafafa] rounded-3xl border border-gray-200 p-6 flex items-center justify-center overflow-hidden shadow-sm">
            <Image
              src={matchingDiagramImg}
              alt="Matching List Diagram"
              fill
              className="object-contain p-6"
            />
          </div>

          {/* Component Quick Specs Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            {matchingListChips.map((chip, idx) => (
              <div key={idx} className="bg-[#f9f9fb] p-4 rounded-2xl border border-gray-200 text-center">
                <span className="text-xs text-gray-500 font-semibold uppercase">{chip.label}</span>
                <p className="text-sm font-bold text-gray-900 mt-1">{chip.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. PRODUCT SPECIFICATIONS TABLE (MATCHING SCREENSHOT DARK TITLE TABLE)
          ========================================================================= */}
      <section id="specifications-section" className="py-24 bg-[#f8f9fa] border-b border-gray-200">
        <div className="site-container max-w-5xl">
          {/* Dark Table Header Bar matching the screenshot */}
          <div className="bg-[#1b1e24] text-white py-5 px-8 rounded-t-3xl shadow-md flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Product Specifications
            </h3>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              {product.name}
            </span>
          </div>

          {/* Structured Zebra Striped Specification Table */}
          <div className="bg-white border-x border-b border-gray-200 rounded-b-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-100/80 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <th className="py-4 px-6 w-1/4">Category</th>
                  <th className="py-4 px-6 w-1/3">Specification Parameter</th>
                  <th className="py-4 px-6">Technical Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {specRows.map((spec, i) => (
                  <tr
                    key={i}
                    className={`transition-colors hover:bg-blue-50/40 ${
                      i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'
                    }`}
                  >
                    <td className="py-4 px-6 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                      {spec.category}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900">
                      {spec.item}
                    </td>
                    <td className="py-4 px-6 font-bold text-[#0062c5]">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8.5 YOUTUBE VIDEO SECTION (SLIDES FORMAT MATCHING USER REQUIREMENT)
          ========================================================================= */}
      <YouTubeVideoSlider
        productName={currentProduct.name}
        videos={currentProduct.youtubeVideos}
        primaryColor={primaryColor}
      />

      {/* =========================================================================
          9. IN-LINE CONTACT US SECTION (MATCHING SCREENSHOT BOTTOM DARK FORM)
          ========================================================================= */}
      <section id="contact-section" className="relative py-24 bg-[#111319] text-white overflow-hidden">
        {/* Blurred Robot Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/uploads/images/20261029/763c5b4b30767904e5cddda22e083597.png"
            alt="Contact Background"
            fill
            className="object-cover opacity-20 filter blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111319] via-[#111319]/80 to-[#111319]" />
        </div>

        <div className="site-container relative z-10 max-w-4xl">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
              COMMERCIAL INQUIRIES & DEPLOYMENT
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Contact Us
            </h2>
            <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto">
              Request on-site pilot trials, enterprise pricing, or custom hardware modifications for {currentProduct.name}.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/15 p-8 sm:p-12 rounded-3xl shadow-2xl">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-cyan-400 mx-auto" />
                <h4 className="text-2xl font-bold text-white">Inquiry Received</h4>
                <p className="text-sm text-gray-300 max-w-md mx-auto">
                  Thank you for your interest in {product.name}. Our enterprise robotics deployment team will contact you within 24 hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 text-xs font-bold text-cyan-400 hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Dr. Jane Chen"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. jane@enterprise.com"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +1 (555) 019-2834"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      Organization / Company *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Global Logistics Labs"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Industry Sector
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full bg-[#1e222d] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Automotive">Automotive & Heavy Industry</option>
                    <option value="Electronics">3C & Semiconductor Manufacturing</option>
                    <option value="Warehousing">Logistics & Supply Chain</option>
                    <option value="Research">Academic & University Research</option>
                    <option value="Commercial">Hospitality & Commercial Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Project Requirements / Operational Scope
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={`Tell us about your workstation setup, required cycle times, and deployment timeline for ${product.name}...`}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="pt-2 text-right">
                  <button
                    type="submit"
                    className="bg-[#0062c5] hover:bg-blue-600 text-white font-bold px-10 py-3.5 rounded-full transition-all shadow-lg hover:shadow-cyan-500/25 text-sm inline-flex items-center space-x-2"
                  >
                    <span>Submit Deployment Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. EXPLORE RELATED MODELS IN THE LINEUP
          ========================================================================= */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="site-container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-[#0062c5] uppercase tracking-wider">PORTFOLIO</span>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">Explore Other HUTARK Robots</h3>
            </div>
            <Link href="/products" className="text-sm font-bold text-[#0062c5] hover:underline flex items-center space-x-1">
              <span>View Product Matrix</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((rel, i) => (
              <Link
                key={i}
                href={`/products/${rel.id}`}
                className="bg-[#fafafa] p-6 rounded-3xl border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div className="relative h-48 w-full bg-white rounded-2xl flex items-center justify-center p-4 mb-4 border border-gray-100">
                  <Image src={rel.heroImg} alt={rel.name} fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0062c5]">{rel.series}</span>
                  <h4 className="text-lg font-bold text-gray-900 mt-1">{rel.name}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{rel.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FLOATING ADMIN LIVE CUSTOMIZER TRIGGER (ONLY VISIBLE WHEN LOGGED IN AS ADMIN)
          ========================================================================= */}
      {isAdmin && (
        <>
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setIsAdminDrawerOpen(true)}
              className="flex items-center space-x-2.5 bg-[#0f121a] hover:bg-[#161c28] text-white px-5 py-3 rounded-full border border-cyan-500/50 shadow-2xl transition-all hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <Edit3 className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-bold tracking-wide">Edit Page (Admin)</span>
            </button>
          </div>

          {/* =========================================================================
              ADMIN PRODUCT EDITOR DRAWER
              ========================================================================= */}
          <AdminProductEditorDrawer
            product={currentProduct}
            isOpen={isAdminDrawerOpen}
            onClose={() => setIsAdminDrawerOpen(false)}
            onProductUpdated={(updated) => setCurrentProduct(updated)}
          />
        </>
      )}
    </div>
  );
}
