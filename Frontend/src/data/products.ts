import { ProductData } from '../types';

export const PRODUCTS: Record<string, ProductData> = {
  "A3Ultra": {
    id: "A3Ultra",
    name: "HUTARK A3 Ultra",
    series: "HUTARK A Series",
    tagline: "Ultra-Performance Dynamic Bipedal Humanoid Robot",
    heroSubtitle: "Engineered with AHA3 full-body compliance architecture and sub-millimeter dexterous dual-arm force control.",
    heroImg: "/uploads/images/20261019/d000d7c155d324f34dde6ae2d90e04b8.png",
    overview: "HUTARK A3 Ultra represents the pinnacle of commercial bipedal humanoid engineering. Featuring 44 active degrees of freedom, an end-to-end embodied foundation model (GO-3), and extreme zero-shot terrain locomotion capabilities.",
    specs: [
      { label: "Height", value: "172 cm" },
      { label: "Weight", value: "62 kg" },
      { label: "Degrees of Freedom", value: "44 Active DoF" },
      { label: "Walking Speed", value: "Up to 3.8 m/s (Run)" },
      { label: "Arm Payload (Single)", value: "5.5 kg" },
      { label: "Arm Payload (Dual)", value: "12.0 kg" },
      { label: "Battery Endurance", value: "4.5 Hours Continuous Operation" },
      { label: "Perception Compute", value: "Dual Drive Thor Platform (2000 TOPS)" }
    ],
    features: [
      {
        title: "AHA3 Full-Body Bio-Inspired Actuation",
        description: "Equipped with proprietary Powerflow modular planetary joint actuators delivering up to 380 N·m torque density.",
      },
      {
        title: "GO-3 Physical Foundation Model",
        description: "Trained on hundreds of thousands of hours of teleoperation and simulation data for real-time vision-to-action transfer.",
      },
      {
        title: "Sub-Millimeter Tactile Sensing",
        description: "Dense array optical-tactile fingertips enable handling fragile glassware, delicate wiring, and micro-fasteners.",
      }
    ],
    applications: [
      { title: "Precision Manufacturing", desc: "Automotive battery assembly, harness insertion, and in-line visual QA." },
      { title: "Scientific Cleanrooms", desc: "Semiconductor wafer cassette transfer and chemical reagent handling." },
      { title: "Commercial Logistics", desc: "Mixed parcel depalletizing, shelf stocking, and micro-fulfillment replenishment." }
    ],
    gallery: [
      "/uploads/images/20261019/d000d7c155d324f34dde6ae2d90e04b8.png",
      "/uploads/images/20260429/a657e46f829152dbed8c7cd370ef8054.png"
    ]
  },
  "A3": {
    id: "A3",
    name: "HUTARK A3",
    series: "HUTARK A Series",
    tagline: "Industrial-Grade Standard Bipedal Humanoid Robot",
    heroSubtitle: "High-stability bipedal walking platform designed for assembly line workstations and structured material handling.",
    heroImg: "/uploads/images/20260429/a657e46f829152dbed8c7cd370ef8054.png",
    overview: "HUTARK A3 delivers consistent industrial productivity across diverse indoor operational floors, featuring robust joint compliance and modular tool changers.",
    specs: [
      { label: "Height", value: "168 cm" },
      { label: "Weight", value: "58 kg" },
      { label: "Degrees of Freedom", value: "38 Active DoF" },
      { label: "Walking Speed", value: "Up to 2.2 m/s" },
      { label: "Payload Capacity", value: "4.0 kg per arm" },
      { label: "Battery Life", value: "4 Hours" }
    ],
    features: [
      {
        title: "Industrial Workstation Ergonomics",
        description: "Human-proportioned dimensions allow seamless integration into legacy assembly cells without floor reconfiguration."
      }
    ],
    applications: [
      { title: "Assembly Operations", desc: "Repetitive fastener driving, gasket placement, and packaging." }
    ],
    gallery: ["/uploads/images/20260429/a657e46f829152dbed8c7cd370ef8054.png"]
  },
  "A2_Ultra": {
    id: "A2_Ultra",
    name: "HUTARK A2 Ultra",
    series: "HUTARK A Series",
    tagline: "Agile Research Bipedal Humanoid Robot",
    heroSubtitle: "Open-architecture dynamic humanoid for advanced university research, sim2real reinforcement learning, and biomechanics.",
    heroImg: "/uploads/images/20250922/7528a0359f8f7e09788972bdb5c35c2a.png",
    overview: "Built specifically for robotics academic centers and foundational AI researchers with full low-level motor torque control.",
    specs: [
      { label: "Height", value: "165 cm" },
      { label: "Weight", value: "55 kg" },
      { label: "Degrees of Freedom", value: "36 DoF" },
      { label: "Control Frequency", value: "1000 Hz Low-Level EtherCAT" }
    ],
    features: [
      {
        title: "Link-U OS Academic SDK",
        description: "Direct ROS 2, Isaac Lab, and MuJoCo bridge with verified digital twins."
      }
    ],
    applications: [
      { title: "Reinforcement Learning", desc: "Real-world policy validation and extreme terrain locomotion benchmark." }
    ],
    gallery: ["/uploads/images/20250922/7528a0359f8f7e09788972bdb5c35c2a.png"]
  },
  "A2_Pro": {
    id: "A2_Pro",
    name: "HUTARK A2 Lite",
    series: "HUTARK A Series",
    tagline: "Cost-Effective Educational Humanoid Platform",
    heroSubtitle: "Accessible full-body bipedal development system for higher education laboratories.",
    heroImg: "/uploads/images/20250924/07684c1e0bf74d8cec9aab593d3afa8a.png",
    overview: "A lightweight, modular educational humanoid robot built for rapid algorithm deployment.",
    specs: [
      { label: "Height", value: "155 cm" },
      { label: "Weight", value: "48 kg" },
      { label: "Degrees of Freedom", value: "32 DoF" }
    ],
    features: [{ title: "Modular Architecture", description: "Quick-disconnect limbs and intuitive Python APIs." }],
    applications: [{ title: "Higher Education", desc: "Curriculum for embodied AI, computer vision, and control theory." }],
    gallery: ["/uploads/images/20250924/07684c1e0bf74d8cec9aab593d3afa8a.png"]
  },
  "X2": {
    id: "X2",
    name: "HUTARK X2",
    series: "HUTARK X Series",
    tagline: "Wheeled-Bipedal Dual-Arm Agile Manipulator",
    heroSubtitle: "Combining the agility of wheeled movement with the reach and dexterous capability of dual-arm humanoids.",
    heroImg: "/uploads/images/20250924/bcdaf302f10439090f551e9906ef7285.png",
    overview: "HUTARK X2 integrates dynamic balance with active wheeled mobility. Capable of climbing curbs, traversing rough surfaces, and operating dual manipulators with continuous precision.",
    specs: [
      { label: "Height Range", value: "115 cm – 165 cm (Adjustable Torso)" },
      { label: "Max Speed", value: "Up to 5.0 m/s" },
      { label: "Dual Arm Payload", value: "10.0 kg Total" },
      { label: "Obstacle Clearance", value: "Up to 15 cm step" },
      { label: "Endurance", value: "6.0 Hours" }
    ],
    features: [
      { title: "Adaptive Hybrid Wheels", description: "Combines active motorized wheels with dynamic hip and knee suspension." }
    ],
    applications: [
      { title: "Warehousing & Fulfilment", desc: "Rapid parcel sorting, tote picking, and automated replenishment." }
    ],
    gallery: ["/uploads/images/20250924/bcdaf302f10439090f551e9906ef7285.png"]
  },
  "X1": {
    id: "X1",
    name: "HUTARK X1",
    series: "HUTARK X Series",
    tagline: "Compact Wheeled Inspection & Manipulation Robot",
    heroSubtitle: "Lightweight wheeled-biped platform for indoor security, inspection, and light tasks.",
    heroImg: "/uploads/images/20250115/93ff145215289a6030b2e08d06815827.png",
    overview: "Engineered for high maneuverability within compact commercial aisles and laboratory corridors.",
    specs: [
      { label: "Weight", value: "38 kg" },
      { label: "Max Speed", value: "4.0 m/s" },
      { label: "Battery Life", value: "7 Hours" }
    ],
    features: [{ title: "High-Torque Hub Motors", description: "Direct drive motors for virtually silent navigation." }],
    applications: [{ title: "Facility Patrolling", desc: "24/7 security patrol and environmental parameter recording." }],
    gallery: ["/uploads/images/20250115/93ff145215289a6030b2e08d06815827.png"]
  },
  "G2": {
    id: "G2",
    name: "HUTARK G2",
    series: "HUTARK G Series",
    tagline: "Commercial Service & Retail Humanoid Robot",
    heroSubtitle: "Interactive service assistant for retail showrooms, hospitality receptions, and public venues.",
    heroImg: "/uploads/images/20251031/afa47f3a6d43c28b95a1534ed8310ad7.png",
    overview: "Equipped with expressive facial displays, high-fidelity voice interaction, and natural non-verbal gestures.",
    specs: [
      { label: "Height", value: "160 cm" },
      { label: "Interaction", value: "Multimodal Voice + Visual Intent" },
      { label: "Navigation", value: "3D LiDAR + RGB-D SLAM" }
    ],
    features: [{ title: "Embodied Dialogue", description: "Powered by domain-tuned large multimodal language models." }],
    applications: [{ title: "Retail Showrooms", desc: "Automotive dealerships, flagship stores, and customer guidance." }],
    gallery: ["/uploads/images/20251031/afa47f3a6d43c28b95a1534ed8310ad7.png"]
  },
  "G1_MAX": {
    id: "G1_MAX",
    name: "HUTARK G1 Max",
    series: "HUTARK G Series",
    tagline: "Heavy-Duty Commercial Assistant",
    heroSubtitle: "Enhanced payload and tray delivery capabilities for commercial hospitality.",
    heroImg: "/uploads/images/20240911/f3a327b21c97a466b04d58503326cfad.png",
    overview: "Optimized for continuous food and beverage, linen, and specimen transport across complex multistory campuses.",
    specs: [
      { label: "Payload Capacity", value: "30 kg" },
      { label: "Continuous Run", value: "10 Hours" }
    ],
    features: [{ title: "Fleet Management Integration", description: "Autonomous elevator calling and door opening." }],
    applications: [{ title: "Hospitality & Healthcare", desc: "Autonomous medicine delivery and hotel room service." }],
    gallery: ["/uploads/images/20240911/f3a327b21c97a466b04d58503326cfad.png"]
  },
  "G1": {
    id: "G1",
    name: "HUTARK G1",
    series: "HUTARK G Series",
    tagline: "Standard Commercial Delivery Robot",
    heroSubtitle: "Cost-effective, reliable commercial transport unit.",
    heroImg: "/uploads/images/20241230/1968be56db5f4f93c2d514a82df24944.png",
    overview: "Compact footprint and intelligent obstacle bypass in congested dining rooms and lobbies.",
    specs: [{ label: "Payload", value: "20 kg" }, { label: "Speed", value: "1.2 m/s" }],
    features: [{ title: "Safety Bumpers & Sensors", description: "Redundant emergency hardware triggers." }],
    applications: [{ title: "Office Food Delivery", desc: "Contactless delivery across corporate headquarters." }],
    gallery: ["/uploads/images/20241230/1968be56db5f4f93c2d514a82df24944.png"]
  },
  "D1_Pro": {
    id: "D1_Pro",
    name: "HUTARK D1 Pro/Edu",
    series: "HUTARK D Series",
    tagline: "Quadruped Agile Robotic Explorer",
    heroSubtitle: "High-dynamic four-legged robot for rough terrain, industrial inspection, and search.",
    heroImg: "/uploads/images/20250924/e044a723bc5ab5aa5b3a8e0a09bd51e0.png",
    overview: "HUTARK D1 Pro delivers extreme dynamic stability across stairways, mud, gravel, and pipe racks with optional robotic arm mount.",
    specs: [
      { label: "Weight", value: "15 kg" },
      { label: "Speed", value: "Up to 3.5 m/s" },
      { label: "Payload", value: "5 kg" },
      { label: "Slope Angle", value: "Up to 35°" }
    ],
    features: [{ title: "Direct-Drive Actuation", description: "Ultra-low inertia actuators allow back-flipping and recovery from falls." }],
    applications: [{ title: "Power Substation Inspection", desc: "Thermal imaging and leak detection in high-voltage yards." }],
    gallery: ["/uploads/images/20250924/e044a723bc5ab5aa5b3a8e0a09bd51e0.png"]
  },
  "D1Ultra": {
    id: "D1Ultra",
    name: "HUTARK D1 Ultra",
    series: "HUTARK D Series",
    tagline: "Heavy-Duty All-Terrain Quadruped Robot",
    heroSubtitle: "IP67 waterproof and dustproof inspection robot for petrochemical and mining infrastructure.",
    heroImg: "/uploads/images/20250924/833452d6caa40f2728dae867dcdcfc2a.png",
    overview: "Designed for hazardous outdoor operations under extreme temperatures from -20°C to +55°C.",
    specs: [
      { label: "Protection Rating", value: "IP67" },
      { label: "Payload", value: "15 kg" },
      { label: "Endurance", value: "4 Hours Continuous Walk" }
    ],
    features: [{ title: "Explosion-Proof Certified Enclosure", description: "Safe for Zone 2 chemical and gas environments." }],
    applications: [{ title: "Petrochemical Refineries", desc: "Autonomous valve reading and acoustic gas leak detection." }],
    gallery: ["/uploads/images/20250924/833452d6caa40f2728dae867dcdcfc2a.png"]
  },
  "D1_Max": {
    id: "D1_Max",
    name: "HUTARK D1 Max",
    series: "HUTARK D Series",
    tagline: "Industrial Heavy Quadruped Platform",
    heroSubtitle: "High-capacity inspection unit with dual LiDAR, thermal camera, and acoustic array.",
    heroImg: "/uploads/images/20260429/6cc43e41089201e697d1bb7de197b8e8.png",
    overview: "Engineered for utility grid inspection, tunnel surveys, and disaster emergency response.",
    specs: [{ label: "Max Speed", value: "4.0 m/s" }, { label: "Payload", value: "20 kg" }],
    features: [{ title: "Multi-Sensor Mast", description: "Integrates PTZ optical zoom and infrared sensors." }],
    applications: [{ title: "Mining & Rail Tunnels", desc: "Structure crack assessment and track inspection." }],
    gallery: ["/uploads/images/20260429/6cc43e41089201e697d1bb7de197b8e8.png"]
  },
  "D1_MaxPro": {
    id: "D1_MaxPro",
    name: "HUTARK D1 MaxPro",
    series: "HUTARK D Series",
    tagline: "Enterprise Quadruped with Integrated Robotic Arm",
    heroSubtitle: "Combines 4-legged mobility with a 6-DoF manipulator for physical valve turning and switch operations.",
    heroImg: "/uploads/images/20260429/f8c7c25c4ee29d792692196a875d0b91.png",
    overview: "The complete mobile manipulation quadruped for active intervention in uncrewed remote industrial sites.",
    specs: [{ label: "Arm Reach", value: "850 mm" }, { label: "Arm Payload", value: "3 kg" }],
    features: [{ title: "Active Mobile Manipulation", description: "Unified whole-body controller for walking while grasping." }],
    applications: [{ title: "Offshore Platforms", desc: "Emergency valve actuation and button press routines." }],
    gallery: ["/uploads/images/20260429/f8c7c25c4ee29d792692196a875d0b91.png"]
  },
  "C5": {
    id: "C5",
    name: "HUTARK C5 Cleaning",
    series: "HUTARK C Series",
    tagline: "Commercial Autonomous Floor Care Robot",
    heroSubtitle: "Autonomous scrubbing, sweeping, and disinfecting for large airports, malls, and industrial facilities.",
    heroImg: "/uploads/images/20251023/d59c5681d6db5d368849ac13334e98e9.png",
    overview: "Delivers up to 2500 m²/h cleaning efficiency with autonomous water refilling and dirty water discharge.",
    specs: [
      { label: "Cleaning Rate", value: "2500 m²/h" },
      { label: "Clean Water Tank", value: "35 L" },
      { label: "Recovery Tank", value: "40 L" },
      { label: "Endurance", value: "4.5 Hours per Charge" }
    ],
    features: [{ title: "Autonomous Base Station", description: "Automated docking, clean water refill, and battery swap." }],
    applications: [{ title: "Transit Hubs & Airports", desc: "Spotless floor hygiene across expansive public concourses." }],
    gallery: ["/uploads/images/20251023/d59c5681d6db5d368849ac13334e98e9.png"]
  }
};

