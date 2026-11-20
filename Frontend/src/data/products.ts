import { ProductData } from '../types';

export const PRODUCTS: Record<string, ProductData> = {
  // =========================================================================
  // 1. HUTARK A3 ULTRA — FLAGSHIP BIPEDAL HUMANOID
  // =========================================================================
  "A3Ultra": {
    id: "A3Ultra",
    name: "HUTARK A3 Ultra",
    series: "HUTARK A Series",
    tagline: "Ultra-Performance Dynamic Bipedal Humanoid Robot",
    heroSubtitle: "Engineered with AHA3 full-body compliance architecture and sub-millimeter dexterous dual-arm force control.",
    heroImg: "/uploads/images/20261019/d000d7c155d324f34dde6ae2d90e04b8.png",
    heroBannerBg: "/uploads/images/products/a3_hero_banner.jpg",
    overview: "HUTARK A3 Ultra represents the pinnacle of commercial bipedal humanoid engineering. Featuring 44 active degrees of freedom, an end-to-end embodied foundation model (GO-3), and extreme zero-shot terrain locomotion capabilities.",
    
    // Bespoke CGI Section Media & Content
    cinematicHeading: "Dynamic Whole-Body Bipedal Intelligence",
    cinematicSubheading: "BIPEDAL PHYSICAL AI BREAKTHROUGH",
    cinematicDesc: "AHA3 compliant bio-inspired joints deliver whole-body dynamic balancing, extreme terrain traversal, and seamless stair climbing at speeds up to 3.8 m/s.",
    cinematicImg: "/uploads/images/products/a3_cinematic_dark.jpg",
    cinematicMetrics: [
      { value: "44 DoF", label: "Active Articulation" },
      { value: "3.8 m/s", label: "Dynamic Run Speed" },
      { value: "< 1 ms", label: "Bus Sync Latency" }
    ],

    manipulationHeading: "7-DoF Sub-Millimeter Dexterous Manipulation",
    manipulationSubtitle: "HIGH-PAYLOAD BIPEDAL ARMS",
    manipulationDesc: "Dual 7-DoF robotic arms with spherical wrists deliver up to 12.0 kg combined payload with impedance force control for precision manufacturing assembly.",
    manipulationImg: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
    manipulationFeatures: [
      "Sub-millimeter ±0.03 mm trajectory repeatability",
      "Dynamic gravity & inertia compensation during bipedal steps",
      "Optical-tactile fingertips for fragile semiconductor & wire handling"
    ],

    interactionHeading: "Autonomous Multimodal Vision-to-Action",
    interactionSubtitle: "EMBODIED FOUNDATION MODEL",
    interactionDesc: "Equipped with the GO-3 physical foundation model, interpreting natural language tasks and spatial video telemetry for zero-shot tool use.",
    interactionImg: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg",
    interactionBubbles: [
      { title: "Bipedal Gait Engine:", text: "Terrain slope detected: Adjusting ankle compliance to 14° incline..." },
      { title: "Dual-Arm Assembly:", text: "Workstation reached: Securing micro-fastener with 4.2 N torque." }
    ],

    matchingListImg: "/uploads/images/products/a3_anatomy_diagram.jpg",
    matchingListChips: [
      { label: "Vision Head", value: "3D LiDAR + RGB-D" },
      { label: "Bipedal Legs", value: "AHA3 Bio-Actuators" },
      { label: "Dual Arms", value: "7-DoF High-Load" },
      { label: "Ankles", value: "6-Axis Force Sensors" },
      { label: "Compute Core", value: "Dual Thor 2000T" },
      { label: "Power Pack", value: "48V 1440Wh Li-Ion" }
    ],

    hardwareModules: [
      {
        title: "AHA3 Bio-Inspired Modular Joint Actuators",
        subtitle: "380 N·m Peak Torque Density",
        desc: "Proprietary planetary gearboxes with integrated absolute dual encoders provide instant compliance against high impact loads.",
        img: "/uploads/images/20261029/8abd115118551853b3212bf47db783a0.jpg"
      },
      {
        title: "High-Dynamic Bipedal Walking Locomotion",
        subtitle: "Zero-Shot Terrain Generalization",
        desc: "Dynamic whole-body momentum balance algorithm enabling continuous running up to 3.8 m/s, curb hopping, and stairs ascent.",
        img: "/uploads/images/20261029/55303dc4864d9d5c35f52263a4dd2e46.jpg"
      },
      {
        title: "Dual-Arm High-Payload Manipulation",
        subtitle: "12.0 kg Dual Arm Combined Capacity",
        desc: "Spherical wrist structure with sub-millimeter trajectory accuracy for industrial manufacturing workstations.",
        img: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg"
      },
      {
        title: "Dense Multi-Axis Tactile Fingertip Arrays",
        subtitle: "0.01 N Micro-Force Detection",
        desc: "Optical-tactile matrix measuring shear forces and contact geometry for handling delicate glass and wiring.",
        img: "/uploads/images/20261029/82066bacdbeb17a0674ca29cd13d5b12.jpg"
      },
      {
        title: "High-Density 48V Power Core System",
        subtitle: "4.5 Hours Continuous Operation",
        desc: "Automotive-grade lithium battery with intelligent thermal balancing and rapid automated contact charging.",
        img: "/uploads/images/20261029/208c523904a5188395bf9b50f0c94334.jpg"
      },
      {
        title: "Dual-Channel SIL-2 Safety Architecture",
        subtitle: "Hardware-Level Real-Time Safeguards",
        desc: "Hardware interlock e-stops, 360° proximity envelopes, and low-latency motor regenerative braking.",
        img: "/uploads/images/20241230/1968be56db5f4f93c2d514a82df24944.png"
      }
    ],

    applicationScenarios: [
      {
        title: "Automotive Assembly Workstations",
        subtitle: "Interior Trim & Fastener Insertion",
        desc: "Installing weather seals, wire harness clips, and dashboard fasteners on moving production lines.",
        img: "/uploads/images/20261029/763c5b4b30767904e5cddda22e083597.png"
      },
      {
        title: "Semiconductor Cleanroom Material Transport",
        subtitle: "Class-100 ISO Certified Operations",
        desc: "Vibration-damped wafer cassette handling and delicate chemical reagent transport between processing bays.",
        img: "/uploads/images/20251023/d59c5681d6db5d368849ac13334e98e9.png"
      },
      {
        title: "Hazardous Chemical Plant Inspection",
        subtitle: "Explosion-Safe Remote Intervention",
        desc: "Navigating elevated catwalks, stairwells, and reading analog gauges in chemical processing plants.",
        img: "/uploads/images/20260429/6cc43e41089201e697d1bb7de197b8e8.png"
      },
      {
        title: "Bipedal VR Telepresence Cockpit",
        subtitle: "Zero-Latency Bilateral Force Feedback",
        desc: "Remote operators control the full-body biped with realistic haptic feedback for complex troubleshooting.",
        img: "/uploads/images/20261106/86677c2f141fe941919f878558713c2d.png"
      }
    ],

    specRows: [
      { category: "Basic Parameters", item: "Total Height", value: "172 cm" },
      { category: "Basic Parameters", item: "Total Weight", value: "62 kg (Including Battery)" },
      { category: "Basic Parameters", item: "Active Degrees of Freedom (DoF)", value: "44 Active DoF" },
      { category: "Basic Parameters", item: "Walking / Running Speed", value: "Up to 3.8 m/s" },
      { category: "Basic Parameters", item: "Protection Rating", value: "IP54 Industrial Enclosure" },
      { category: "Arm & Manipulation", item: "Degrees of Freedom Per Arm", value: "7-DoF Spherical Wrist" },
      { category: "Arm & Manipulation", item: "Single Arm Rated Payload", value: "5.5 kg" },
      { category: "Arm & Manipulation", item: "Dual Arm Combined Payload", value: "12.0 kg" },
      { category: "Arm & Manipulation", item: "Trajectory Repeatability", value: "±0.03 mm" },
      { category: "Chassis & Mobility", item: "Locomotion Type", value: "Dynamic Bipedal Walking & Running" },
      { category: "Chassis & Mobility", item: "Stair Climbing Height", value: "Up to 22 cm step" },
      { category: "Chassis & Mobility", item: "Slope Gradeability", value: "25° Incline" },
      { category: "Battery & Energy", item: "Battery Chemistry", value: "High-Energy Density Lithium-Ion (48V / 30Ah)" },
      { category: "Battery & Energy", item: "Operating Runtime", value: "4.5 Hours Continuous Motion" },
      { category: "Perception & Compute", item: "Main AI Compute Platform", value: "Dual Drive Thor Platform (2000 TOPS)" },
      { category: "Perception & Compute", item: "Sensor Suite", value: "3D Solid-State LiDAR + Dual RGB-D + 6-Axis F/T" }
    ],

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
      }
    ],
    applications: [
      { title: "Precision Manufacturing", desc: "Automotive battery assembly, harness insertion, and in-line visual QA." }
    ],
    gallery: ["/uploads/images/products/a3_hero_banner.jpg", "/uploads/images/products/a3_cinematic_dark.jpg"]
  },

  // =========================================================================
  // 2. HUTARK X2 — WHEELED-BIPEDAL HYBRID MANIPULATOR
  // =========================================================================
  "X2": {
    id: "X2",
    name: "HUTARK X2",
    series: "HUTARK X Series",
    tagline: "Wheeled-Bipedal Dual-Arm Agile Manipulator",
    heroSubtitle: "Combining the agility of motorized wheels with the reach and dexterous capability of dual-arm humanoids.",
    heroImg: "/uploads/images/20250924/bcdaf302f10439090f551e9906ef7285.png",
    heroBannerBg: "/uploads/images/products/x2_hero_banner.jpg",
    overview: "HUTARK X2 integrates dynamic balance with active wheeled mobility. Capable of climbing curbs, traversing rough surfaces, and operating dual manipulators with continuous precision.",
    
    // Bespoke CGI Section Media & Content
    cinematicHeading: "High-Speed Wheeled-Bipedal Mobility",
    cinematicSubheading: "HYBRID MOBILITY REVOLUTION",
    cinematicDesc: "Active suspension with dual motorized hub wheels enables 5.0 m/s rapid transit, 360° zero-radius pivot rotation, and step traversal in high-density warehouses.",
    cinematicImg: "/uploads/images/products/x2_cinematic_dark.jpg",
    cinematicMetrics: [
      { value: "5.0 m/s", label: "Max Speed" },
      { value: "10.0 kg", label: "Dual Arm Payload" },
      { value: "6.0 Hours", label: "Long Runtime" }
    ],

    manipulationHeading: "Rapid Dual-Arm Sorting & Bin Picking",
    manipulationSubtitle: "HIGH-THROUGHPUT MANIPULATION",
    manipulationDesc: "Telescopic torso adjusts height from 115 cm to 165 cm, allowing the dual 7-DoF arms to reach deep warehouse totes and high rack shelves effortlessly.",
    manipulationImg: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
    manipulationFeatures: [
      "10.0 kg combined payload across both arms",
      "Dynamic in-motion grasping without stopping chassis",
      "Vacuum suction cup & 2-finger adaptive parallel gripper support"
    ],

    interactionHeading: "Automated Logistics Fleet Telematics",
    interactionSubtitle: "SMART WAREHOUSE INTEGRATION",
    interactionDesc: "Direct integration with WMS and ERP systems, receiving dispatch tasks over low-latency 5G/Wi-Fi 6 with millimeter visual fiducial alignment.",
    interactionImg: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg",
    interactionBubbles: [
      { title: "Fleet Management:", text: "Order #8491 assigned: Picking SKU-992 from Bay 14-C." },
      { title: "Obstacle Avoidance:", text: "Forklift path cleared: Resuming route at 3.5 m/s." }
    ],

    matchingListImg: "/uploads/images/products/x2_anatomy_diagram.jpg",
    matchingListChips: [
      { label: "Vision Head", value: "Dual RGB-D + LiDAR" },
      { label: "Torso Range", value: "115 – 165 cm Stroke" },
      { label: "Dual Arms", value: "7-DoF 10kg Payload" },
      { label: "Drive Wheels", value: "Dual Direct Hub Motors" },
      { label: "Suspension", value: "Active Pitch-Roll Legs" },
      { label: "Battery Pack", value: "48V 1800Wh Fast-Swap" }
    ],

    hardwareModules: [
      {
        title: "Active Dual-Hub Wheeled Suspension",
        subtitle: "Dynamic Balancing & Curb Traversal",
        desc: "Combines active hub motors with independent hip-knee suspension for traversing 15cm obstacles and ramps smoothly.",
        img: "/uploads/images/20261029/a45cd3ea1909796be5cca32223c71fac.jpg"
      },
      {
        title: "Telescopic Torso Elevation Mechanism",
        subtitle: "115 cm to 165 cm Variable Work Envelope",
        desc: "Enables floor-level bin picking up to high pallet shelf placement without compromising dynamic center of gravity.",
        img: "/uploads/images/20261029/55303dc4864d9d5c35f52263a4dd2e46.jpg"
      },
      {
        title: "High-Speed Dual Manipulator Arms",
        subtitle: "10.0 kg Total Grasp Capacity",
        desc: "Optimized for continuous 24/7 pick-and-place cycles with sub-millimeter precision and tool quick-changers.",
        img: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg"
      },
      {
        title: "360° Safety LiDAR & Time-of-Flight Envelopes",
        subtitle: "Collaborative Human Co-Working",
        desc: "Continuous perimeter safety monitoring with dynamic deceleration fields preventing collisions with workers and AGVs.",
        img: "/uploads/images/20261029/82066bacdbeb17a0674ca29cd13d5b12.jpg"
      },
      {
        title: "Quick-Swap 48V Power Bay System",
        subtitle: "6.0 Hours Extended Continuous Shift",
        desc: "Supports 90-second manual battery swap or fully autonomous docking station contact charging.",
        img: "/uploads/images/20261029/208c523904a5188395bf9b50f0c94334.jpg"
      },
      {
        title: "Modular Industrial End-Effector Interface",
        subtitle: "Standardized ISO 9409-1 Flange",
        desc: "Compatible with parallel grippers, magnetic grippers, suction arrays, and barcode scanning modules.",
        img: "/uploads/images/20241230/1968be56db5f4f93c2d514a82df24944.png"
      }
    ],

    applicationScenarios: [
      {
        title: "E-Commerce Fulfillment & Tote Picking",
        subtitle: "Mixed SKU Order Consolidation",
        desc: "Autonomous navigation through narrow aisles, picking individual items and placing them into sorting bins.",
        img: "/uploads/images/20261029/763c5b4b30767904e5cddda22e083597.png"
      },
      {
        title: "Warehouse Depalletizing & Kitting",
        subtitle: "High-Throughput Carton Transfer",
        desc: "Unloading stacked boxes from wooden pallets onto automated induction conveyors.",
        img: "/uploads/images/20260429/6cc43e41089201e697d1bb7de197b8e8.png"
      },
      {
        title: "Automated Machine Workstation Tending",
        subtitle: "CNC & Injection Molding Load/Unload",
        desc: "Loading raw metal stock into machining centers and removing finished components safely.",
        img: "/uploads/images/20251023/d59c5681d6db5d368849ac13334e98e9.png"
      },
      {
        title: "Cross-Docking & Parcel Distribution",
        subtitle: "Rapid Loading Dock Transfer",
        desc: "Traversing loading dock dock-plates and transporting irregular freight across warehouse zones.",
        img: "/uploads/images/20261106/86677c2f141fe941919f878558713c2d.png"
      }
    ],

    specRows: [
      { category: "Basic Parameters", item: "Height Envelope", value: "115 cm – 165 cm (Adjustable)" },
      { category: "Basic Parameters", item: "Total Weight", value: "48 kg" },
      { category: "Basic Parameters", item: "Active Degrees of Freedom", value: "28 DoF Total" },
      { category: "Basic Parameters", item: "Maximum Travel Speed", value: "Up to 5.0 m/s" },
      { category: "Arm & Manipulation", item: "Dual Arm Total Payload", value: "10.0 kg Total" },
      { category: "Arm & Manipulation", item: "Single Arm Payload", value: "5.0 kg" },
      { category: "Chassis & Mobility", item: "Drive Type", value: "Wheeled-Bipedal Dynamic Suspension" },
      { category: "Chassis & Mobility", item: "Step Crossing", value: "15 cm Height Clearance" },
      { category: "Chassis & Mobility", item: "Turning Radius", value: "0 mm (360° In-Place Rotation)" },
      { category: "Battery & Energy", item: "Continuous Runtime", value: "6.0 Hours" },
      { category: "Battery & Energy", item: "Fast-Charging Time", value: "1.0 Hour (Automated Dock)" }
    ],

    specs: [
      { label: "Height Range", value: "115 cm – 165 cm (Adjustable Torso)" },
      { label: "Max Speed", value: "Up to 5.0 m/s" },
      { label: "Dual Arm Payload", value: "10.0 kg Total" },
      { label: "Obstacle Clearance", value: "Up to 15 cm step" },
      { label: "Endurance", value: "6.0 Hours" }
    ],
    features: [{ title: "Adaptive Hybrid Wheels", description: "Combines active motorized wheels with dynamic hip and knee suspension." }],
    applications: [{ title: "Warehousing & Fulfilment", desc: "Rapid parcel sorting, tote picking, and automated replenishment." }],
    gallery: ["/uploads/images/products/x2_hero_banner.jpg", "/uploads/images/products/x2_cinematic_dark.jpg"]
  },

  // =========================================================================
  // 3. HUTARK D1 MAX — ALL-TERRAIN INDUSTRIAL QUADRUPED EXPLORER
  // =========================================================================
  "D1_Max": {
    id: "D1_Max",
    name: "HUTARK D1 Max",
    series: "HUTARK D Series",
    tagline: "Industrial Heavy Quadruped Robotic Inspection Platform",
    heroSubtitle: "High-capacity all-terrain four-legged robot with PTZ thermal imaging and optional 6-DoF intervention arm.",
    heroImg: "/uploads/images/20260429/6cc43e41089201e697d1bb7de197b8e8.png",
    heroBannerBg: "/uploads/images/products/d1_hero_banner.jpg",
    overview: "Engineered for utility grid inspection, tunnel surveys, petrochemical refineries, and disaster emergency response across severe unpaved terrains.",
    
    // Bespoke CGI Section Media & Content
    cinematicHeading: "All-Terrain Quadruped Autonomous Patrol",
    cinematicSubheading: "RUGGED INDUSTRIAL ROBOTICS",
    cinematicDesc: "IP67 fully sealed against torrential rain, mud, and dust. Operates reliably from -20°C to +55°C while ascending 35° steep rocky slopes and industrial stairwells.",
    cinematicImg: "/uploads/images/products/d1_cinematic_dark.jpg",
    cinematicMetrics: [
      { value: "IP67", label: "Ingress Protection" },
      { value: "35°", label: "Max Slope Incline" },
      { value: "20.0 kg", label: "Backpack Payload" }
    ],

    manipulationHeading: "Active Mobile Manipulation & Valve Turning",
    manipulationSubtitle: "OPTIONAL 6-DOF ARM",
    manipulationDesc: "Equipped with an optional 6-DoF robotic manipulator on its spine, enabling physical valve turning, circuit breaker tripping, and hazardous gas sampling.",
    manipulationImg: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
    manipulationFeatures: [
      "Mounted 6-DoF manipulator with 3.0 kg end-effector payload",
      "Unified walking-and-reaching whole-body stabilization",
      "Interchangeable gripper for analog valve keys and door handles"
    ],

    interactionHeading: "Autonomous Thermal Anomaly Detection",
    interactionSubtitle: "PTZ MULTI-SPECTRAL SENSING",
    interactionDesc: "High-resolution radiometric thermal camera detects overheating transformer bushings, pipeline corrosion, and methane gas leaks in real-time.",
    interactionImg: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg",
    interactionBubbles: [
      { title: "Substation Inspection:", text: "Transformer T-4 bushing temperature: 48.2°C (Normal range)." },
      { title: "Gas Detection Alert:", text: "Optical gas imaging: 0.0 ppm methane detected. Path clear." }
    ],

    matchingListImg: "/uploads/images/products/d1_anatomy_diagram.jpg",
    matchingListChips: [
      { label: "PTZ Turret", value: "Thermal + 30x Zoom" },
      { label: "Leg Actuators", value: "12 Direct-Drive Joints" },
      { label: "LiDAR Dome", value: "360° Solid-State SLAM" },
      { label: "All-Terrain Feet", value: "Rubberized High-Traction" },
      { label: "Enclosure", value: "IP67 Waterproof Shell" },
      { label: "Power Bay", value: "48V 1200Wh Battery" }
    ],

    hardwareModules: [
      {
        title: "Direct-Drive High-Torque Hip & Knee Actuators",
        subtitle: "12 Active Degrees of Freedom",
        desc: "Low-inertia direct drive motors allow dynamic self-righting after falls, back-flipping, and dynamic gait switching.",
        img: "/uploads/images/20261029/8abd115118551853b3212bf47db783a0.jpg"
      },
      {
        title: "PTZ Multi-Spectral Inspection Mast",
        subtitle: "Thermal Infrared + 30x Optical Zoom",
        desc: "Continuous automated dial reading, infrared temperature profiling, and acoustic corona discharge monitoring.",
        img: "/uploads/images/20261029/82066bacdbeb17a0674ca29cd13d5b12.jpg"
      },
      {
        title: "IP67 Submersible All-Weather Enclosure",
        subtitle: "Extreme Environmental Durability",
        desc: "Fully sealed magnesium-alloy chassis certified for immersion up to 1 meter and dusty gravel operations.",
        img: "/uploads/images/20241230/1968be56db5f4f93c2d514a82df24944.png"
      },
      {
        title: "High-Traction All-Terrain Rubber Foot Pads",
        subtitle: "Integrated Force Sensors",
        desc: "Measures normal ground reaction forces at 1000 Hz to prevent slipping on wet steel plates, mud, and ice.",
        img: "/uploads/images/20261029/a45cd3ea1909796be5cca32223c71fac.jpg"
      },
      {
        title: "Autonomous Inductive Charging Station",
        subtitle: "24/7 Remote Uncrewed Operation",
        desc: "Self-navigates into ruggedized outdoor doghouse base station for automatic inductive recharging without exposed contacts.",
        img: "/uploads/images/20261029/208c523904a5188395bf9b50f0c94334.jpg"
      },
      {
        title: "Emergency Failsafe & Cellular Failover",
        subtitle: "Dual 5G + Satellite Uplink",
        desc: "Maintains encrypted command telemetry even in remote mountainous regions and underground mine tunnels.",
        img: "/uploads/images/20261029/55303dc4864d9d5c35f52263a4dd2e46.jpg"
      }
    ],

    applicationScenarios: [
      {
        title: "High-Voltage Electrical Substation Patrol",
        subtitle: "Continuous Grid Health Monitoring",
        desc: "Reading analog gauges, inspecting capacitor banks, and scanning for thermal hotspots.",
        img: "/uploads/images/20260429/6cc43e41089201e697d1bb7de197b8e8.png"
      },
      {
        title: "Petrochemical Refinery Pipeline Security",
        subtitle: "Acoustic Gas & Vapor Leak Detection",
        desc: "Autonomous patrol along multi-level pipe racks and hazardous distillation units.",
        img: "/uploads/images/20261029/763c5b4b30767904e5cddda22e083597.png"
      },
      {
        title: "Mining Rail Tunnels & Underground Shafts",
        subtitle: "Hazardous Air Quality Reconnaissance",
        desc: "Assessing rock bolt stability and toxic gas concentrations following blasting operations.",
        img: "/uploads/images/20251023/d59c5681d6db5d368849ac13334e98e9.png"
      },
      {
        title: "Disaster Emergency Search & Recon",
        subtitle: "Rubble Traversal & Survivor Localization",
        desc: "Operating in collapsed buildings with thermal sensing to direct first-response rescue crews.",
        img: "/uploads/images/20261106/86677c2f141fe941919f878558713c2d.png"
      }
    ],

    specRows: [
      { category: "Basic Parameters", item: "Total Weight", value: "18.5 kg" },
      { category: "Basic Parameters", item: "Maximum Speed", value: "Up to 4.0 m/s" },
      { category: "Basic Parameters", item: "Payload Capacity", value: "20.0 kg (Backpack Mount)" },
      { category: "Basic Parameters", item: "Max Slope Incline", value: "35° Incline" },
      { category: "Basic Parameters", item: "Ingress Protection", value: "IP67 Submersible" },
      { category: "Chassis & Mobility", item: "Leg Degrees of Freedom", value: "12-DoF Direct Drive" },
      { category: "Chassis & Mobility", item: "Stair Climbing Ability", value: "20 cm Step" },
      { category: "Battery & Energy", item: "Operating Duration", value: "4.0 Hours Continuous Walk" },
      { category: "Battery & Energy", item: "Charging Method", value: "Autonomous Inductive Wireless Dock" },
      { category: "Perception & Compute", item: "Inspection Turret", value: "PTZ Radiometric Thermal + 30x Optical" }
    ],

    specs: [
      { label: "Max Speed", value: "4.0 m/s" },
      { label: "Payload", value: "20 kg" },
      { label: "Protection", value: "IP67 Submersible" },
      { label: "Slope Angle", value: "Up to 35°" }
    ],
    features: [{ title: "Multi-Sensor Mast", description: "Integrates PTZ optical zoom and infrared sensors." }],
    applications: [{ title: "Mining & Rail Tunnels", desc: "Structure crack assessment and track inspection." }],
    gallery: ["/uploads/images/products/d1_hero_banner.jpg", "/uploads/images/products/d1_cinematic_dark.jpg"]
  },

  // =========================================================================
  // 4. HUTARK G1 — FLAGSHIP COMMERCIAL SERVICE HUMANOID (REFERENCE MATCHED)
  // =========================================================================
  "G1": {
    id: "G1",
    name: "HUTARK G1",
    series: "HUTARK G Series",
    tagline: "Standard Commercial Delivery & Service Robot",
    heroSubtitle: "Full-stack intelligent humanoid robot with dual 7-DoF arms and omnidirectional mobility.",
    heroImg: "/uploads/images/20241230/1968be56db5f4f93c2d514a82df24944.png",
    heroBannerBg: "/uploads/images/20261103/015bf1f9da95cc783f5e1e7363b3882c.png",
    overview: "HUTARK G1 delivers consistent commercial service productivity across diverse indoor operational floors, featuring robust joint compliance, multimodal interaction, and modular tool changers.",
    
    cinematicHeading: "Full Scenario Embodied Intelligence",
    cinematicSubheading: "PHYSICAL AI BREAKTHROUGH",
    cinematicDesc: "Equipped with end-to-end foundation physical AI policy networks, navigating dynamic industrial shop floors, unmapped warehouses, and human co-working spaces with continuous multi-sensor real-time coordination.",
    cinematicImg: "/uploads/images/20261029/492548ce8722aa332e87aa47ce1019e5.png",
    cinematicMetrics: [
      { value: "1000 Hz", label: "Bus Sync Rate" },
      { value: "380 N·m", label: "Peak Joint Torque" },
      { value: "< 1 ms", label: "Control Latency" }
    ],

    manipulationHeading: "High Precision Dexterous Manipulation",
    manipulationSubtitle: "SUB-MILLIMETER DEXTERITY",
    manipulationDesc: "High-density optical-tactile fingertip sensors deliver dynamic micro-force feedback down to 0.01 N. Capable of handling delicate smartphone display glass, flexible cable harness insertion, and precision electronics fastener assembly.",
    manipulationImg: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
    manipulationFeatures: [
      "Multi-axis dynamic optical-tactile feedback array",
      "Sub-millimeter position & force impedance hybrid control",
      "Zero-damage handling of fragile glassware and electronic components"
    ],

    interactionHeading: "Natural Multimodal Cognitive Dialogue",
    interactionSubtitle: "HUMAN-ROBOT COLLABORATION",
    interactionDesc: "Powered by the GO-3 physical foundation model, interpreting natural language spoken tasks, spatial pointing gestures, and visual environmental state changes zero-shot.",
    interactionImg: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg",
    interactionBubbles: [
      { title: "Spatial Perception Intent:", text: "Workstation target acquired: Calibrating end-effector pose..." },
      { title: "Collaborative Feedback:", text: "Assembly verified: Tolerances strictly within ±0.03 mm." }
    ],

    matchingListImg: "/uploads/images/20261029/62974a39fa9e903d8e47b2cd2befc16e.png",
    matchingListChips: [
      { label: "Head Vision", value: "RGB-D + LiDAR" },
      { label: "Dual Arms", value: "7-DoF Active" },
      { label: "Hands", value: "Tactile Fingertips" },
      { label: "Torso Control", value: "Dual Thor 2000T" },
      { label: "Base Mobility", value: "Omnidirectional" },
      { label: "Power Bay", value: "Hot-Swappable 48V" }
    ],

    specs: [{ label: "Payload", value: "20 kg" }, { label: "Speed", value: "1.2 m/s" }],
    features: [{ title: "Safety Bumpers & Sensors", description: "Redundant emergency hardware triggers." }],
    applications: [{ title: "Office Food Delivery", desc: "Contactless delivery across corporate headquarters." }],
    gallery: ["/uploads/images/20241230/1968be56db5f4f93c2d514a82df24944.png"]
  },

  // =========================================================================
  // 5. HUTARK G2 — COMMERCIAL SERVICE & RETAIL SHOWROOM
  // =========================================================================
  "G2": {
    id: "G2",
    name: "HUTARK G2",
    series: "HUTARK G Series",
    tagline: "Commercial Service & Retail Humanoid Robot",
    heroSubtitle: "Interactive service assistant for retail showrooms, hospitality receptions, and public venues.",
    heroImg: "/uploads/images/20251031/afa47f3a6d43c28b95a1534ed8310ad7.png",
    heroBannerBg: "/uploads/images/20261103/015bf1f9da95cc783f5e1e7363b3882c.png",
    overview: "Equipped with expressive facial displays, high-fidelity voice interaction, natural non-verbal gestures, and omnidirectional indoor navigation.",
    cinematicImg: "/uploads/images/20261029/492548ce8722aa332e87aa47ce1019e5.png",
    manipulationImg: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
    interactionImg: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg",
    matchingListImg: "/uploads/images/20261029/62974a39fa9e903d8e47b2cd2befc16e.png",
    specs: [
      { label: "Height", value: "160 cm" },
      { label: "Interaction", value: "Multimodal Voice + Visual Intent" },
      { label: "Navigation", value: "3D LiDAR + RGB-D SLAM" }
    ],
    features: [{ title: "Embodied Dialogue", description: "Powered by domain-tuned large multimodal language models." }],
    applications: [{ title: "Retail Showrooms", desc: "Automotive dealerships, flagship stores, and customer guidance." }],
    gallery: ["/uploads/images/20251031/afa47f3a6d43c28b95a1534ed8310ad7.png"]
  },

  // =========================================================================
  // 6. HUTARK C5 — AUTONOMOUS COMMERCIAL FACILITY CARE ROBOT
  // =========================================================================
  "C5": {
    id: "C5",
    name: "HUTARK C5 Cleaning",
    series: "HUTARK C Series",
    tagline: "Commercial Autonomous Floor Care & Facility Maintenance Robot",
    heroSubtitle: "Autonomous scrubbing, sweeping, and disinfecting for large airports, malls, and industrial facilities.",
    heroImg: "/uploads/images/20251023/d59c5681d6db5d368849ac13334e98e9.png",
    heroBannerBg: "/uploads/images/20261103/015bf1f9da95cc783f5e1e7363b3882c.png",
    overview: "Delivers up to 2500 m²/h cleaning efficiency with autonomous water refilling, dirty water discharge, and multi-sensor obstacle avoidance.",
    
    cinematicHeading: "Commercial Autonomous Facility Care",
    cinematicSubheading: "PERPETUAL SANITATION ROBOTICS",
    cinematicDesc: "Equipped with dual counter-rotating high-pressure scrubbing discs and active water recycling, ensuring spotless hygiene across airports and malls.",
    cinematicImg: "/uploads/images/products/x2_cinematic_dark.jpg",
    cinematicMetrics: [
      { value: "2500 m²/h", label: "Cleaning Rate" },
      { value: "60 kg", label: "Brush Downforce" },
      { value: "4.5 Hours", label: "Scrubbing Runtime" }
    ],

    manipulationHeading: "Closed-Loop Filtration & Solution Scrubbing",
    manipulationSubtitle: "MULTI-STAGE FLUID DYNAMICS",
    manipulationDesc: "35L solution tank paired with 40L recovery tank and centrifugal vacuum squeegee ensures dry, safe, streak-free floors immediately behind the robot.",
    manipulationImg: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
    manipulationFeatures: [
      "Dual 60 kg variable downforce rotary scrub deck",
      "High-efficiency water recycling extending operational shifts",
      "Antibacterial UV-C floor disinfection array"
    ],

    interactionHeading: "Autonomous Multi-Service Base Station Docking",
    interactionSubtitle: "UNATTENDED 24/7 FLEET SCHEDULING",
    interactionDesc: "Navigates to automated utility docking station for clean water refilling, wastewater discharge, and rapid inductive battery charging.",
    interactionImg: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg",
    interactionBubbles: [
      { title: "Floor Care Telematics:", text: "Concourse Zone B: 1840 m² cleaned. Water level at 78%." },
      { title: "Docking Status:", text: "Schedule completed: Returning to Base Station #2 for discharge." }
    ],

    matchingListImg: "/uploads/images/products/c5_anatomy_diagram.jpg",
    matchingListChips: [
      { label: "Perception", value: "3D LiDAR + Ultrasound" },
      { label: "Scrub Deck", value: "Dual Rotary Discs" },
      { label: "Solution Tank", value: "35 L Clean Water" },
      { label: "Recovery Tank", value: "40 L Wastewater" },
      { label: "Squeegee", value: "Heavy-Duty Polyurethane" },
      { label: "Power Bay", value: "LiFePO4 3000 Cycles" }
    ],

    specRows: [
      { category: "Basic Parameters", item: "Cleaning Efficiency", value: "2500 m²/h" },
      { category: "Basic Parameters", item: "Solution Tank Capacity", value: "35 L" },
      { category: "Basic Parameters", item: "Recovery Tank Capacity", value: "40 L" },
      { category: "Basic Parameters", item: "Downforce Pressure", value: "Up to 60 kg Adjustable" },
      { category: "Battery & Energy", item: "Battery Chemistry", value: "Lithium Iron Phosphate (LiFePO4)" },
      { category: "Battery & Energy", item: "Continuous Runtime", value: "4.5 Hours Scrubbing" },
      { category: "Chassis & Mobility", item: "Navigation Suite", value: "Dual 3D LiDAR + 360° Ultrasound SLAM" }
    ],

    specs: [
      { label: "Cleaning Rate", value: "2500 m²/h" },
      { label: "Clean Water Tank", value: "35 L" },
      { label: "Recovery Tank", value: "40 L" },
      { label: "Endurance", value: "4.5 Hours per Charge" }
    ],
    features: [{ title: "Autonomous Base Station", description: "Automated docking, clean water refill, and battery swap." }],
    applications: [{ title: "Transit Hubs & Airports", desc: "Spotless floor hygiene across expansive public concourses." }],
    gallery: ["/uploads/images/20251023/d59c5681d6db5d368849ac13334e98e9.png"]
  },

  // Fallback mappings for other models in the series
  "A3": {
    id: "A3",
    name: "HUTARK A3",
    series: "HUTARK A Series",
    tagline: "Industrial-Grade Standard Bipedal Humanoid Robot",
    heroSubtitle: "High-stability bipedal walking platform designed for assembly line workstations.",
    heroImg: "/uploads/images/20260429/a657e46f829152dbed8c7cd370ef8054.png",
    heroBannerBg: "/uploads/images/products/a3_hero_banner.jpg",
    cinematicImg: "/uploads/images/products/a3_cinematic_dark.jpg",
    matchingListImg: "/uploads/images/products/a3_anatomy_diagram.jpg",
    overview: "HUTARK A3 delivers consistent industrial productivity across diverse indoor operational floors, featuring robust joint compliance and modular tool changers.",
    specs: [
      { label: "Height", value: "168 cm" },
      { label: "Weight", value: "58 kg" },
      { label: "Degrees of Freedom", value: "38 Active DoF" },
      { label: "Walking Speed", value: "Up to 2.2 m/s" },
      { label: "Payload Capacity", value: "4.0 kg per arm" },
      { label: "Battery Life", value: "4 Hours" }
    ],
    features: [{ title: "Workstation Ergonomics", description: "Human-proportioned dimensions allow seamless integration into legacy assembly cells." }],
    applications: [{ title: "Assembly Operations", desc: "Repetitive fastener driving, gasket placement, and packaging." }],
    gallery: ["/uploads/images/products/a3_hero_banner.jpg"]
  },

  "A2_Ultra": {
    id: "A2_Ultra",
    name: "HUTARK A2 Ultra",
    series: "HUTARK A Series",
    tagline: "Agile Research Bipedal Humanoid Robot",
    heroSubtitle: "Open-architecture dynamic humanoid for advanced university research and reinforcement learning.",
    heroImg: "/uploads/images/20250922/7528a0359f8f7e09788972bdb5c35c2a.png",
    heroBannerBg: "/uploads/images/products/a3_hero_banner.jpg",
    cinematicImg: "/uploads/images/products/a3_cinematic_dark.jpg",
    matchingListImg: "/uploads/images/products/a3_anatomy_diagram.jpg",
    overview: "Built specifically for robotics academic centers and foundational AI researchers with full low-level motor torque control.",
    specs: [
      { label: "Height", value: "165 cm" },
      { label: "Weight", value: "55 kg" },
      { label: "Degrees of Freedom", value: "36 DoF" },
      { label: "Control Frequency", value: "1000 Hz Low-Level EtherCAT" }
    ],
    features: [{ title: "Academic SDK", description: "Direct ROS 2, Isaac Lab, and MuJoCo bridge with verified digital twins." }],
    applications: [{ title: "Reinforcement Learning", desc: "Real-world policy validation and extreme terrain locomotion benchmark." }],
    gallery: ["/uploads/images/products/a3_hero_banner.jpg"]
  },

  "A2_Pro": {
    id: "A2_Pro",
    name: "HUTARK A2 Lite",
    series: "HUTARK A Series",
    tagline: "Cost-Effective Educational Humanoid Platform",
    heroSubtitle: "Accessible full-body bipedal development system for higher education laboratories.",
    heroImg: "/uploads/images/20250924/07684c1e0bf74d8cec9aab593d3afa8a.png",
    heroBannerBg: "/uploads/images/products/a3_hero_banner.jpg",
    cinematicImg: "/uploads/images/products/a3_cinematic_dark.jpg",
    matchingListImg: "/uploads/images/products/a3_anatomy_diagram.jpg",
    overview: "A lightweight, modular educational humanoid robot built for rapid algorithm deployment.",
    specs: [
      { label: "Height", value: "155 cm" },
      { label: "Weight", value: "48 kg" },
      { label: "Degrees of Freedom", value: "32 DoF" }
    ],
    features: [{ title: "Modular Architecture", description: "Quick-disconnect limbs and intuitive Python APIs." }],
    applications: [{ title: "Higher Education", desc: "Curriculum for embodied AI, computer vision, and control theory." }],
    gallery: ["/uploads/images/products/a3_hero_banner.jpg"]
  },

  "X1": {
    id: "X1",
    name: "HUTARK X1",
    series: "HUTARK X Series",
    tagline: "Compact Wheeled Inspection & Manipulation Robot",
    heroSubtitle: "Lightweight wheeled-biped platform for indoor security, inspection, and light tasks.",
    heroImg: "/uploads/images/20250115/93ff145215289a6030b2e08d06815827.png",
    heroBannerBg: "/uploads/images/products/x2_hero_banner.jpg",
    cinematicImg: "/uploads/images/products/x2_cinematic_dark.jpg",
    matchingListImg: "/uploads/images/products/x2_anatomy_diagram.jpg",
    overview: "Engineered for high maneuverability within compact commercial aisles and laboratory corridors.",
    specs: [
      { label: "Weight", value: "38 kg" },
      { label: "Max Speed", value: "4.0 m/s" },
      { label: "Battery Life", value: "7 Hours" }
    ],
    features: [{ title: "High-Torque Hub Motors", description: "Direct drive motors for virtually silent navigation." }],
    applications: [{ title: "Facility Patrolling", desc: "24/7 security patrol and environmental parameter recording." }],
    gallery: ["/uploads/images/products/x2_hero_banner.jpg"]
  },

  "G1_MAX": {
    id: "G1_MAX",
    name: "HUTARK G1 Max",
    series: "HUTARK G Series",
    tagline: "Heavy-Duty Commercial Assistant",
    heroSubtitle: "Enhanced payload and tray delivery capabilities for commercial hospitality.",
    heroImg: "/uploads/images/20240911/f3a327b21c97a466b04d58503326cfad.png",
    heroBannerBg: "/uploads/images/20261103/015bf1f9da95cc783f5e1e7363b3882c.png",
    cinematicImg: "/uploads/images/20261029/492548ce8722aa332e87aa47ce1019e5.png",
    matchingListImg: "/uploads/images/20261029/62974a39fa9e903d8e47b2cd2befc16e.png",
    overview: "Optimized for continuous food and beverage, linen, and specimen transport across complex multistory campuses.",
    specs: [
      { label: "Payload Capacity", value: "30 kg" },
      { label: "Continuous Run", value: "10 Hours" }
    ],
    features: [{ title: "Fleet Management Integration", description: "Autonomous elevator calling and door opening." }],
    applications: [{ title: "Hospitality & Healthcare", desc: "Autonomous medicine delivery and hotel room service." }],
    gallery: ["/uploads/images/20240911/f3a327b21c97a466b04d58503326cfad.png"]
  },

  "D1_Pro": {
    id: "D1_Pro",
    name: "HUTARK D1 Pro/Edu",
    series: "HUTARK D Series",
    tagline: "Quadruped Agile Robotic Explorer",
    heroSubtitle: "High-dynamic four-legged robot for rough terrain, industrial inspection, and search.",
    heroImg: "/uploads/images/20250924/e044a723bc5ab5aa5b3a8e0a09bd51e0.png",
    heroBannerBg: "/uploads/images/products/d1_hero_banner.jpg",
    cinematicImg: "/uploads/images/products/d1_cinematic_dark.jpg",
    matchingListImg: "/uploads/images/products/d1_anatomy_diagram.jpg",
    overview: "HUTARK D1 Pro delivers extreme dynamic stability across stairways, mud, gravel, and pipe racks with optional robotic arm mount.",
    specs: [
      { label: "Weight", value: "15 kg" },
      { label: "Speed", value: "Up to 3.5 m/s" },
      { label: "Payload", value: "5 kg" },
      { label: "Slope Angle", value: "Up to 35°" }
    ],
    features: [{ title: "Direct-Drive Actuation", description: "Ultra-low inertia actuators allow back-flipping and recovery from falls." }],
    applications: [{ title: "Power Substation Inspection", desc: "Thermal imaging and leak detection in high-voltage yards." }],
    gallery: ["/uploads/images/products/d1_hero_banner.jpg"]
  },

  "D1Ultra": {
    id: "D1Ultra",
    name: "HUTARK D1 Ultra",
    series: "HUTARK D Series",
    tagline: "Heavy-Duty All-Terrain Quadruped Robot",
    heroSubtitle: "IP67 waterproof and dustproof inspection robot for petrochemical and mining infrastructure.",
    heroImg: "/uploads/images/20250924/833452d6caa40f2728dae867dcdcfc2a.png",
    heroBannerBg: "/uploads/images/products/d1_hero_banner.jpg",
    cinematicImg: "/uploads/images/products/d1_cinematic_dark.jpg",
    matchingListImg: "/uploads/images/products/d1_anatomy_diagram.jpg",
    overview: "Designed for hazardous outdoor operations under extreme temperatures from -20°C to +55°C.",
    specs: [
      { label: "Protection Rating", value: "IP67" },
      { label: "Payload", value: "15 kg" },
      { label: "Endurance", value: "4 Hours Continuous Walk" }
    ],
    features: [{ title: "Explosion-Proof Certified Enclosure", description: "Safe for Zone 2 chemical and gas environments." }],
    applications: [{ title: "Petrochemical Refineries", desc: "Autonomous valve reading and acoustic gas leak detection." }],
    gallery: ["/uploads/images/products/d1_hero_banner.jpg"]
  },

  "D1_MaxPro": {
    id: "D1_MaxPro",
    name: "HUTARK D1 MaxPro",
    series: "HUTARK D Series",
    tagline: "Enterprise Quadruped with Integrated Robotic Arm",
    heroSubtitle: "Combines 4-legged mobility with a 6-DoF manipulator for physical valve turning and switch operations.",
    heroImg: "/uploads/images/20260429/f8c7c25c4ee29d792692196a875d0b91.png",
    heroBannerBg: "/uploads/images/products/d1_hero_banner.jpg",
    cinematicImg: "/uploads/images/products/d1_cinematic_dark.jpg",
    matchingListImg: "/uploads/images/products/d1_anatomy_diagram.jpg",
    overview: "The complete mobile manipulation quadruped for active intervention in uncrewed remote industrial sites.",
    specs: [{ label: "Arm Reach", value: "850 mm" }, { label: "Arm Payload", value: "3 kg" }],
    features: [{ title: "Active Mobile Manipulation", description: "Unified whole-body controller for walking while grasping." }],
    applications: [{ title: "Offshore Platforms", desc: "Emergency valve actuation and button press routines." }],
    gallery: ["/uploads/images/products/d1_hero_banner.jpg"]
  }
};
