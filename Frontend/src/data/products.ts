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
    gallery: ["/uploads/images/products/a3_hero_banner.jpg", "/uploads/images/products/a3_cinematic_dark.jpg"],
    youtubeVideos: [
      {
        id: "7zI3u19q_e0",
        title: "HUTARK A3 Ultra Dynamic Bipedal Locomotion & High-Speed Run",
        subtitle: "WHOLE-BODY BALANCE TRIAL",
        description: "Field benchmark of the AHA3 actuation system achieving 3.8 m/s running, curb hopping, and real-time stabilization across rough outdoor terrain.",
        categoryTag: "Locomotion Benchmark"
      },
      {
        id: "M3_Jb_5zT9I",
        title: "Dual 7-DoF Arm Fastener Insertion & Wire Routing",
        subtitle: "SUB-MILLIMETER DEXTERITY",
        description: "High-precision workstation demonstration featuring 12 kg dual-arm combined payload with sub-millimeter force compliance.",
        categoryTag: "Dexterous Manipulation"
      },
      {
        id: "fn3KWM1kuAw",
        title: "Stair Climbing & Unmapped Obstacle Traversal",
        subtitle: "PHYSICAL AI GENERALIZATION",
        description: "End-to-end foundation model navigation ascending 22cm industrial stairs without prior geometric maps.",
        categoryTag: "Field Trials"
      }
    ]
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
    gallery: ["/uploads/images/products/x2_hero_banner.jpg", "/uploads/images/products/x2_cinematic_dark.jpg"],
    youtubeVideos: [
      {
        id: "29ECwExc-_M",
        title: "HUTARK X2 Wheeled-Biped 5.0 m/s Transit & 360° Pivot",
        subtitle: "HYBRID MOBILITY DEMO",
        description: "Active suspension hub motors executing zero-radius turns, ramp climbing, and high-speed warehouse navigation.",
        categoryTag: "High-Speed Mobility"
      },
      {
        id: "W1czBcn3Cac",
        title: "Telescopic Torso Elevation & Pallet Bin Picking",
        subtitle: "WAREHOUSE AUTOMATION",
        description: "Variable height adjustment from 1.15m to 1.65m while picking items from high storage racks in motion.",
        categoryTag: "Logistics Trial"
      }
    ]
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
    gallery: ["/uploads/images/products/d1_hero_banner.jpg", "/uploads/images/products/d1_cinematic_dark.jpg"],
    youtubeVideos: [
      {
        id: "fn3KWM1kuAw",
        title: "HUTARK D1 Max IP67 All-Terrain Rough Slope Patrol",
        subtitle: "EXTREME TERRAIN PATROL",
        description: "Operating in torrential rain, mud, and climbing 35° steep rocky slopes in an uncrewed substation.",
        categoryTag: "Rugged Robotics"
      },
      {
        id: "29ECwExc-_M",
        title: "Spine 6-DoF Arm Operating High-Pressure Industrial Valves",
        subtitle: "ACTIVE INTERVENTION",
        description: "Autonomous physical valve turning and electrical breaker toggle in a petrochemical plant environment.",
        categoryTag: "Mobile Manipulation"
      }
    ]
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
    gallery: ["/uploads/images/20241230/1968be56db5f4f93c2d514a82df24944.png"],
    youtubeVideos: [
      {
        id: "M3_Jb_5zT9I",
        title: "HUTARK G1 Commercial Delivery & Dual-Arm Handling",
        subtitle: "INDOOR SERVICE DEPLOYMENT",
        description: "Autonomous tray delivery and corridor navigation with dynamic pedestrian obstacle bypass.",
        categoryTag: "Commercial Service"
      },
      {
        id: "7zI3u19q_e0",
        title: "Omnidirectional Wheel Base Navigation & Elevator Calling",
        subtitle: "CAMPUS INTRALOGISTICS",
        description: "Multi-floor autonomous delivery with smart elevator IoT integration and voice guidance.",
        categoryTag: "Facility Logistics"
      }
    ]
  },

  // =========================================================================
  // 5. HUTARK G2 — COMMERCIAL SERVICE & RETAIL SHOWROOM (REFERENCE EXACT MATCH)
  // =========================================================================
  "G2": {
    id: "G2",
    name: "HUTARK G2",
    series: "HUTARK G Series",
    tagline: "Industrial-Grade Interactive Wheeled Humanoid Robot",
    heroSubtitle: "Equipped with dual 7-DoF force-control arms, 360° LiDAR perception, and dual hot-swappable batteries for 24/7 intelligent operations.",
    heroImg: "/uploads/images/20251031/afa47f3a6d43c28b95a1534ed8310ad7.png",
    heroBannerBg: "/uploads/images/20261103/015bf1f9da95cc783f5e1e7363b3882c.png",
    overview: "HUTARK G2 is an industrial-grade embodied humanoid robot designed for smart factory logistics, precision assembly, commercial showroom presentation, and interactive retail assistance. Built with automotive-grade reliability, it combines agile omnidirectional mobility with sub-millimeter dual-arm dexterity.",
    
    // Cinematic Dark Chamber
    cinematicHeading: "Full Scenario Embodied Intelligence",
    cinematicSubheading: "PHYSICAL AI BREAKTHROUGH",
    cinematicDesc: "Powered by end-to-end foundation physical AI policy networks, navigating dynamic industrial shop floors, unmapped warehouses, and human co-working spaces with continuous multi-sensor real-time coordination.",
    cinematicImg: "/uploads/images/20261029/492548ce8722aa332e87aa47ce1019e5.png",
    cinematicMetrics: [
      { value: "26 DoF", label: "Active Degrees of Freedom" },
      { value: "5.0 kg", label: "Single Arm Rated Payload" },
      { value: "1,652 Wh", label: "Dual Battery Capacity" }
    ],

    // Macro Manipulation
    manipulationHeading: "High Precision Dexterous Manipulation",
    manipulationSubtitle: "SUB-MILLIMETER DEXTERITY",
    manipulationDesc: "High-density optical-tactile fingertip sensors deliver dynamic micro-force feedback down to 0.01 N. Capable of handling delicate smartphone display glass, flexible cable harness insertion, and precision electronics fastener assembly.",
    manipulationImg: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
    manipulationFeatures: [
      "Dual 7-DoF force-control arms with <0.5 N absolute accuracy",
      "Sub-millimeter position & force impedance hybrid control (±0.03 mm)",
      "Zero-damage handling of fragile glassware, wafers, and electronics"
    ],

    // Multimodal Interaction
    interactionHeading: "Natural Multimodal Cognitive Dialogue",
    interactionSubtitle: "HUMAN-ROBOT COLLABORATION",
    interactionDesc: "Powered by the GO-3 physical foundation model, interpreting natural language spoken tasks, spatial pointing gestures, and visual environmental state changes zero-shot.",
    interactionImg: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg",
    interactionBubbles: [
      { title: "Spatial Perception Intent:", text: "Workstation target acquired: Calibrating end-effector pose..." },
      { title: "Collaborative Feedback:", text: "Assembly verified: Tolerances strictly within ±0.03 mm." }
    ],

    // Matching List
    matchingListImg: "/uploads/images/20261029/62974a39fa9e903d8e47b2cd2befc16e.png",
    matchingListChips: [
      { label: "Head & Vision", value: "RGB-D + 3D LiDAR" },
      { label: "Dual Arms", value: "7-DoF Force-Control" },
      { label: "Dexterous Hands", value: "Tactile Fingertips" },
      { label: "Telescopic Waist", value: "1225 – 1795 mm" },
      { label: "Chassis Drive", value: "Omnidirectional 4-DoF" },
      { label: "Energy Bay", value: "Dual 1652Wh Hot-Swap" }
    ],

    // 6 Hardware Modules (2x3 Card Grid)
    hardwareModules: [
      {
        title: "Dual 7-DoF Force-Control Robotic Arms",
        subtitle: "High-Precision Industrial Manipulation",
        desc: "Equipped with spherical wrists, harmonic drive reducers, and high-frequency torque sensors delivering <0.5 N force control sensitivity and ±0.03 mm repeatability.",
        img: "/uploads/images/20261029/55303dc4864d9d5c35f52263a4dd2e46.jpg"
      },
      {
        title: "360° Panoramic Safety Perception Suite",
        subtitle: "Dual 3D LiDAR & Multi-Angle Cameras",
        desc: "Integrates 2x 3D LiDARs, 3x ultra-wide fisheye cameras, and head/wrist RGB-D depth vision sensors for 360-degree blind-spot-free spatial awareness.",
        img: "/uploads/images/20261029/82066bacdbeb17a0674ca29cd13d5b12.jpg"
      },
      {
        title: "Modular High-Torque Joint Actuators",
        subtitle: "High Power-Density Planetary Drives",
        desc: "Proprietary compact modular actuators with integrated dual absolute encoders and impact-absorbing compliance for industrial longevity.",
        img: "/uploads/images/20261029/8abd115118551853b3212bf47db783a0.jpg"
      },
      {
        title: "Active Telescopic Waist & Omnidirectional Chassis",
        subtitle: "Variable Height 1,225 mm – 1,795 mm",
        desc: "4-DoF chassis supporting Ackermann steering, crab-walking, and 360° in-place rotation with dynamic center-of-gravity stabilization.",
        img: "/uploads/images/20261029/a45cd3ea1909796be5cca32223c71fac.jpg"
      },
      {
        title: "Dual Hot-Swappable 48V Battery Architecture",
        subtitle: "1,652 Wh Capacity • 24/7 Operation",
        desc: "Supports quick manual hot-swap in under 60 seconds without shutting down the system, alongside autonomous magnetic return-to-dock contact charging.",
        img: "/uploads/images/20261029/208c523904a5188395bf9b50f0c94334.jpg"
      },
      {
        title: "Automotive-Grade Safety & SIL-2 Compliance",
        subtitle: "Hardware-Level Redundant Safeguards",
        desc: "Dual emergency stop buttons, 360° collision-sensing safety bumpers, and certified failsafe motor braking ensure certified operator co-working safety.",
        img: "/uploads/images/20241230/1968be56db5f4f93c2d514a82df24944.png"
      }
    ],

    // 4 Application Scenarios (2x2 Dark Grid)
    applicationScenarios: [
      {
        title: "Smart Manufacturing & Electronic Assembly",
        subtitle: "High-Precision Workstations",
        desc: "Precision screw tightening, wiring harness insertion, PCB optical inspection, and component kitting.",
        img: "/uploads/images/20261029/763c5b4b30767904e5cddda22e083597.png"
      },
      {
        title: "Commercial Retail & Guided Presentation",
        subtitle: "Flagship Showrooms & Receptions",
        desc: "Automotive showroom vehicle explanation, corporate exhibition tours, VIP reception, and intelligent interaction.",
        img: "/uploads/images/20260429/6cc43e41089201e697d1bb7de197b8e8.png"
      },
      {
        title: "Warehouse Intralogistics & Bin Picking",
        subtitle: "Automated Material Handling",
        desc: "Autonomous tote handling, tote transport across work cells, and cross-bay inventory sorting.",
        img: "/uploads/images/20251023/d59c5681d6db5d368849ac13334e98e9.png"
      },
      {
        title: "VR Teleoperation & Embodied Data Collection",
        subtitle: "Human-in-the-Loop Cockpit",
        desc: "Ultra-low-latency bilateral force-feedback teleoperation for complex manual assembly and demonstration data recording.",
        img: "/uploads/images/20261106/86677c2f141fe941919f878558713c2d.png"
      }
    ],

    // Product Specifications Table
    specRows: [
      { category: "Basic Parameters", item: "Total Height", value: "1,225 mm – 1,795 mm (Telescopic Waist)" },
      { category: "Basic Parameters", item: "Total System Weight", value: "185 kg (Including Dual Batteries)" },
      { category: "Basic Parameters", item: "Active Degrees of Freedom (DoF)", value: "26 Active DoF (3 Neck, 14 Arms, 3 Waist, 2 Legs, 4 Chassis)" },
      { category: "Basic Parameters", item: "Maximum Moving Speed", value: "1.5 m/s" },
      { category: "Basic Parameters", item: "Protection Rating", value: "IP42 Full Machine Industrial Protection" },

      { category: "Arm & Manipulation", item: "Degrees of Freedom Per Arm", value: "7-DoF Force-Control Arm" },
      { category: "Arm & Manipulation", item: "Single Arm Rated Payload", value: "5.0 kg" },
      { category: "Arm & Manipulation", item: "Force Control Accuracy", value: "< 0.5 N Absolute Precision" },
      { category: "Arm & Manipulation", item: "Trajectory Repeatability", value: "±0.03 mm" },
      { category: "Arm & Manipulation", item: "Dexterous Hands", value: "OmniHand Ultra Multi-Fingered Tactile Hands" },

      { category: "Chassis & Mobility", item: "Mobility Mechanism", value: "4-DoF Omnidirectional Chassis" },
      { category: "Chassis & Mobility", item: "Steering Modes", value: "Ackermann Steering, Crab-Walking, 360° In-Place Rotation" },
      { category: "Chassis & Mobility", item: "Turning Radius", value: "0 mm (Zero-Radius Turn)" },
      { category: "Chassis & Mobility", item: "Obstacle Clearance", value: "20 mm Step / 35 mm Gap" },

      { category: "Battery & Energy", item: "Battery Chemistry", value: "Dual High-Energy Lithium-Ion Packs" },
      { category: "Battery & Energy", item: "Total Battery Capacity", value: "1,652 Wh (Hot-Swappable)" },
      { category: "Battery & Energy", item: "Continuous Runtime", value: "4.0 – 5.0 Hours" },
      { category: "Battery & Energy", item: "Charging Options", value: "Direct Plug-In, Manual Hot-Swap (<60s), Auto-Docking" },

      { category: "Perception & Compute", item: "Main Compute Platform", value: "Dual NVIDIA Jetson Edge AI Platform" },
      { category: "Perception & Compute", item: "3D LiDAR Sensors", value: "2x 3D Solid-State LiDAR (360° Coverage)" },
      { category: "Perception & Compute", item: "Vision Suite", value: "Head RGB-D + Wrist RGB-D + 3x Panoramic Fisheye Cameras" },
      { category: "Perception & Compute", item: "Acoustic System", value: "6-Channel Circular Beamforming Microphone Array" }
    ],

    specs: [
      { label: "Height Range", value: "1,225 mm – 1,795 mm (Telescopic)" },
      { label: "Weight", value: "185 kg" },
      { label: "Degrees of Freedom", value: "26 Active DoF" },
      { label: "Single Arm Payload", value: "5.0 kg" },
      { label: "Max Speed", value: "1.5 m/s" },
      { label: "Battery Capacity", value: "1,652 Wh (Dual Hot-Swap)" },
      { label: "Endurance", value: "4.0 Hours Continuous Operation" },
      { label: "Protection", value: "IP42 Industrial Grade" }
    ],
    features: [
      { title: "Dual 7-DoF Force-Control Arms", description: "Sub-millimeter precision with <0.5 N force sensitivity." },
      { title: "Variable-Height Torso", description: "Telescopic waist expands operational range between 1.22m and 1.8m." },
      { title: "360° Perception Envelopes", description: "Dual 3D LiDAR and triple fisheye vision eliminate blind zones." }
    ],
    applications: [
      { title: "Smart Manufacturing", desc: "Precision assembly, electronics fastener insertion, and in-line quality inspection." },
      { title: "Commercial Presentation", desc: "Automotive showroom explanations and VIP guided reception tours." }
    ],
    gallery: [
      "/uploads/images/20261103/015bf1f9da95cc783f5e1e7363b3882c.png",
      "/uploads/images/20261029/492548ce8722aa332e87aa47ce1019e5.png"
    ],
    youtubeVideos: [
      {
        id: "M3_Jb_5zT9I",
        title: "HUTARK G2 Industrial Force-Control Dual Arms",
        subtitle: "SUB-MILLIMETER ASSEMBLY",
        description: "Executing precision screw torquing and flexible connector insertion with <0.5 N force sensitivity.",
        categoryTag: "Industrial Assembly"
      },
      {
        id: "7zI3u19q_e0",
        title: "360° LiDAR Autonomous Showroom Navigation & Guidance",
        subtitle: "COMMERCIAL PRESENTATION",
        description: "Omnidirectional Ackermann and crab-walking mobility safely guiding VIP visitors through busy retail spaces.",
        categoryTag: "Commercial Guidance"
      },
      {
        id: "fn3KWM1kuAw",
        title: "Dual Hot-Swap Battery Exchange & Auto-Docking",
        subtitle: "24/7 CONTINUOUS RUNTIME",
        description: "Under 60-second hot-swap battery exchange without powering down system computing cores.",
        categoryTag: "Perpetual Operations"
      }
    ]
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
    gallery: ["/uploads/images/20251023/d59c5681d6db5d368849ac13334e98e9.png"],
    youtubeVideos: [
      {
        id: "W1czBcn3Cac",
        title: "HUTARK C5 Commercial Floor Scrubbing at 2500 m²/h",
        subtitle: "PERPETUAL SANITATION TRIAL",
        description: "Autonomous disc scrubbing with 60 kg variable downforce and active water recycling in an airport terminal.",
        categoryTag: "Facility Sanitation"
      },
      {
        id: "fn3KWM1kuAw",
        title: "Multi-Service Autonomous Utility Base Station Docking",
        subtitle: "UNATTENDED WORKFLOW",
        description: "Self-docking to recharge, refill 35L clean water tank, and purge 40L wastewater with zero human intervention.",
        categoryTag: "Autonomous Docking"
      }
    ]
  },

  // =========================================================================
  // 7. HUTARK A3 — INDUSTRIAL WORKSTATION BIPEDAL HUMANOID
  // =========================================================================
  "A3": {
    id: "A3",
    name: "HUTARK A3",
    series: "HUTARK A Series",
    tagline: "Industrial Standard Bipedal Humanoid Robot",
    heroSubtitle: "High-stability bipedal walking platform designed for factory assembly line workstations.",
    heroImg: "/uploads/images/20260429/a657e46f829152dbed8c7cd370ef8054.png",
    heroBannerBg: "/uploads/images/products/a3_hero_banner.jpg",
    cinematicImg: "/uploads/images/products/a3_cinematic_dark.jpg",
    matchingListImg: "/uploads/images/products/a3_anatomy_diagram.jpg",
    overview: "HUTARK A3 delivers consistent industrial productivity across diverse indoor operational floors, featuring robust joint compliance, bipedal balance, and modular tool changers for automated workstations.",
    cinematicHeading: "Industrial Bipedal Workstation Autonomy",
    cinematicSubheading: "CONTINUOUS SHIFT RELIABILITY",
    cinematicDesc: "AHA3 compliant bipedal locomotion engineered for human-scale industrial manufacturing cells, enabling precise fastener insertion, parts kitting, and machine tending.",
    cinematicMetrics: [
      { value: "38 DoF", label: "Active Degrees of Freedom" },
      { value: "4.0 kg", label: "Single Arm Rated Payload" },
      { value: "4.0 Hours", label: "Continuous Shift Runtime" }
    ],
    manipulationHeading: "Dual-Arm Assembly & Part Handling",
    manipulationSubtitle: "SUB-MILLIMETER WORKSTATION ACCURACY",
    manipulationDesc: "Dual 7-DoF arms with impedance control deliver sub-millimeter trajectory repeatability for handling electronic connectors, sheet metal parts, and packaging.",
    manipulationImg: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
    manipulationFeatures: [
      "Sub-millimeter ±0.04 mm trajectory repeatability",
      "Dynamic gravity & inertia compensation during walking steps",
      "Modular industrial tool changer supporting suction & clamp grippers"
    ],
    interactionHeading: "Shop Floor Workstation Coordination",
    interactionSubtitle: "INDUSTRIAL MES / SCADA LINK",
    interactionDesc: "Direct integration with manufacturing execution systems, receiving build orders and reporting quality inspection telemetry in real-time.",
    interactionImg: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg",
    interactionBubbles: [
      { title: "MES Dispatch:", text: "Workstation #04: Assembly sequence initiated for Chassis Bracket B." },
      { title: "Torque Verification:", text: "Fasteners torqued to 3.8 N·m. QA status: PASS." }
    ],
    matchingListChips: [
      { label: "Vision Suite", value: "3D LiDAR + RGB-D" },
      { label: "Bipedal Legs", value: "Bio-Actuators" },
      { label: "Dual Arms", value: "7-DoF Active" },
      { label: "Hands", value: "Industrial Grippers" },
      { label: "Compute Core", value: "Dual Drive Thor" },
      { label: "Power Pack", value: "48V 1200Wh Battery" }
    ],
    specRows: [
      { category: "Basic Parameters", item: "Total Height", value: "168 cm" },
      { category: "Basic Parameters", item: "Total Weight", value: "58 kg (Including Battery)" },
      { category: "Basic Parameters", item: "Active Degrees of Freedom (DoF)", value: "38 Active DoF" },
      { category: "Basic Parameters", item: "Walking Speed", value: "Up to 2.2 m/s" },
      { category: "Basic Parameters", item: "Protection Rating", value: "IP54 Industrial Protection" },
      { category: "Arm & Manipulation", item: "Degrees of Freedom Per Arm", value: "7-DoF" },
      { category: "Arm & Manipulation", item: "Single Arm Rated Payload", value: "4.0 kg" },
      { category: "Arm & Manipulation", item: "Dual Arm Combined Payload", value: "8.5 kg" },
      { category: "Arm & Manipulation", item: "Trajectory Repeatability", value: "±0.04 mm" },
      { category: "Chassis & Mobility", item: "Locomotion Type", value: "Dynamic Bipedal Walking" },
      { category: "Chassis & Mobility", item: "Obstacle Clearance", value: "15 cm Step / 15° Slope" },
      { category: "Battery & Energy", item: "Battery Capacity", value: "48V / 25Ah (1200 Wh)" },
      { category: "Battery & Energy", item: "Continuous Runtime", value: "4.0 Hours" },
      { category: "Battery & Energy", item: "Charging Time", value: "1.5 Hours Fast-Charge" },
      { category: "Perception & Compute", item: "Perception Suite", value: "Solid-State LiDAR + Dual RGB-D Depth Cameras" }
    ],
    youtubeVideos: [
      {
        id: "7zI3u19q_e0",
        title: "HUTARK A3 Whole-Body Motion Control & Industrial Gait",
        subtitle: "FACTORY LINE TRIAL",
        description: "Autonomous factory workstation traversal, curb step-over, and synchronized dual-arm grasping tests.",
        category: "Demonstration"
      },
      {
        id: "M3_Jb_5zT9I",
        title: "Precision Fastener Installation & Dexterous Assembly",
        subtitle: "TACTILE GRIPPER DEMO",
        description: "Executing sub-millimeter bolt insertion and electrical wire harness connector clicks in production testing.",
        category: "Assembly"
      }
    ],
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

  // =========================================================================
  // 8. HUTARK A2 ULTRA — FULL-SIZE BIPEDAL HUMANOID
  // =========================================================================
  "A2_Ultra": {
    id: "A2_Ultra",
    name: "HUTARK A2 Ultra",
    series: "HUTARK A Series",
    tagline: "Commercial Full-Size Bipedal Humanoid Robot",
    heroSubtitle: "Proven endurance bipedal humanoid with 40+ degrees of freedom and AHA architecture.",
    heroImg: "/uploads/images/20250922/7528a0359f8f7e09788972bdb5c35c2a.png",
    heroBannerBg: "/uploads/images/products/a3_hero_banner.jpg",
    cinematicImg: "/uploads/images/products/a3_cinematic_dark.jpg",
    matchingListImg: "/uploads/images/products/a3_anatomy_diagram.jpg",
    overview: "HUTARK A2 Ultra is a commercially deployed full-size bipedal humanoid robot. Engineered for complex commercial tasks, reception, showroom tours, and industrial pilot deployments with exceptional walking endurance.",
    cinematicHeading: "Commercial Bipedal Walking Endurance",
    cinematicSubheading: "FULL-SCALE EMBODIED INTELLIGENCE",
    cinematicDesc: "Proven endurance architecture capable of walking continuous long distances, negotiating tight turns (60 cm radius), and performing natural human-like gestures.",
    cinematicMetrics: [
      { value: "40+ DoF", label: "Active Degrees of Freedom" },
      { value: "60 cm", label: "Tight Turning Radius" },
      { value: "169 cm", label: "Human-Scale Height" }
    ],
    manipulationHeading: "Force-Compliant Manipulation Arms",
    manipulationSubtitle: "DUAL 7-DOF ARMS",
    manipulationDesc: "Equipped with dual 7-DoF arms and multi-fingered dexterous hands, capable of object handover, tool handling, and precision tactile interaction.",
    manipulationImg: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
    manipulationFeatures: [
      "Multi-fingered dexterous hand compatibility",
      "Dynamic bipedal balance with payload compensation",
      "Natural conversational arm gestures during speech"
    ],
    interactionHeading: "Multimodal Voice & Expressive Gaze",
    interactionSubtitle: "HUMAN-ROBOT INTERACTION",
    interactionDesc: "Equipped with large language models and full-duplex speech recognition for natural conversations in retail, corporate receptions, and exhibitions.",
    interactionImg: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg",
    interactionBubbles: [
      { title: "Reception Dialogue:", text: "Welcome to HUTARK Innovation Center. Please follow me to the showcase area." },
      { title: "Gaze Alignment:", text: "Visitor located: Aligning head orientation and greeting posture." }
    ],
    matchingListChips: [
      { label: "Vision Head", value: "RGB-D + LiDAR" },
      { label: "Bipedal Legs", value: "AHA Joint Actuators" },
      { label: "Dual Arms", value: "7-DoF Active" },
      { label: "Hands", value: "OmniHand Multi-Finger" },
      { label: "Compute Unit", value: "High-Performance Edge AI" },
      { label: "Battery Pack", value: "700 Wh Quick-Swap" }
    ],
    specRows: [
      { category: "Basic Parameters", item: "Total Height", value: "169 cm" },
      { category: "Basic Parameters", item: "Total Weight", value: "69 kg (Including Battery)" },
      { category: "Basic Parameters", item: "Active Degrees of Freedom (DoF)", value: "40+ Active DoF" },
      { category: "Basic Parameters", item: "Turning Radius", value: "60 cm (Tight Turning Radius)" },
      { category: "Basic Parameters", item: "Walking Speed", value: "Up to 2.0 m/s" },
      { category: "Arm & Manipulation", item: "Degrees of Freedom Per Arm", value: "7-DoF" },
      { category: "Arm & Manipulation", item: "Single Arm Payload", value: "5.0 kg" },
      { category: "Arm & Manipulation", item: "Dexterous Hands", value: "OmniHand Multi-Fingered Tactile Hands" },
      { category: "Chassis & Mobility", item: "Locomotion Type", value: "Bipedal Walking & Step Traversal" },
      { category: "Battery & Energy", item: "Battery Capacity", value: "700 Wh (Supports Battery Swapping)" },
      { category: "Battery & Energy", item: "Continuous Runtime", value: "2.0 – 3.0 Hours" },
      { category: "Perception & Compute", item: "Perception Suite", value: "3D LiDAR + Multi-Angle RGB-D Cameras" }
    ],
    youtubeVideos: [
      {
        id: "7zI3u19q_e0",
        title: "HUTARK A2 Ultra Natural Bipedal Walking & Showroom Guidance",
        subtitle: "VIP RECEPTION RUNTIME",
        description: "Autonomous guest greeting, 60 cm tight radius pivoting, and continuous multi-room guidance demonstration.",
        category: "Commercial"
      },
      {
        id: "M3_Jb_5zT9I",
        title: "Multimodal Voice & Human Gesture Alignment",
        subtitle: "EMBODIED CONVERSATION",
        description: "Full-duplex natural language interaction with coordinated head gaze and expressive hand gestures.",
        category: "Interaction"
      }
    ],
    specs: [
      { label: "Height", value: "169 cm" },
      { label: "Weight", value: "69 kg" },
      { label: "Degrees of Freedom", value: "40+ Active DoF" },
      { label: "Turning Radius", value: "60 cm" },
      { label: "Battery Capacity", value: "700 Wh" },
      { label: "Endurance", value: "2.0 Hours per Charge" }
    ],
    features: [{ title: "AHA Compliant Actuation", description: "Bio-inspired joint architecture for smooth, human-like bipedal motion." }],
    applications: [{ title: "Commercial Showrooms & Reception", desc: "VIP guidance, vehicle explanation, and exhibition presentation." }],
    gallery: ["/uploads/images/products/a3_hero_banner.jpg"]
  },

  // =========================================================================
  // 9. HUTARK A2 LITE — EDUCATIONAL BIPEDAL PLATFORM
  // =========================================================================
  "A2_Pro": {
    id: "A2_Pro",
    name: "HUTARK A2 Lite",
    series: "HUTARK A Series",
    tagline: "Cost-Effective Educational Humanoid Platform",
    heroSubtitle: "Accessible full-body bipedal development system for higher education and university laboratories.",
    heroImg: "/uploads/images/20250924/07684c1e0bf74d8cec9aab593d3afa8a.png",
    heroBannerBg: "/uploads/images/products/a3_hero_banner.jpg",
    cinematicImg: "/uploads/images/products/a3_cinematic_dark.jpg",
    matchingListImg: "/uploads/images/products/a3_anatomy_diagram.jpg",
    overview: "A lightweight, modular educational humanoid robot built for rapid algorithm deployment, ROS 2 curriculum, and embodied AI research.",
    cinematicHeading: "Accessible Educational Embodied Robotics",
    cinematicSubheading: "OPEN PLATFORM FOR EDUCATORS",
    cinematicDesc: "Designed with comprehensive open-source Python SDKs, verified simulation digital twins, and modular quick-service joints.",
    cinematicMetrics: [
      { value: "32 DoF", label: "Active Degrees of Freedom" },
      { value: "48 kg", label: "Lightweight Structure" },
      { value: "ROS 2", label: "Native Bridge" }
    ],
    manipulationHeading: "Modular Manipulator Limbs",
    manipulationSubtitle: "RAPID ALGORITHM VALIDATION",
    manipulationDesc: "5-DoF arms with modular tool plates allow students and researchers to implement custom kinematic algorithms and end-effectors.",
    manipulationImg: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
    manipulationFeatures: [
      "Open API for joint torque, position, and velocity control",
      "Compatible with parallel grippers and suction cups",
      "Software limits and hardware collision protection"
    ],
    interactionHeading: "Interactive Voice & Educational UI",
    interactionSubtitle: "TEACHING & DEMONSTRATION",
    interactionDesc: "Includes visual programming nodes, interactive speech feedback, and browser-based teleoperation dashboards.",
    interactionImg: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg",
    interactionBubbles: [
      { title: "SDK Connection:", text: "ROS 2 node active: Telemetry streaming at 200 Hz." },
      { title: "Gait Controller:", text: "Sim-to-Real policy deployed: Balance verified on flat terrain." }
    ],
    matchingListChips: [
      { label: "Vision Head", value: "RGB-D Camera" },
      { label: "Bipedal Legs", value: "Modular Actuators" },
      { label: "Arms", value: "5-DoF Active" },
      { label: "Hands", value: "Adaptive Grippers" },
      { label: "Compute Core", value: "NVIDIA Jetson Orin" },
      { label: "Battery", value: "36V 500Wh Battery" }
    ],
    specRows: [
      { category: "Basic Parameters", item: "Total Height", value: "155 cm" },
      { category: "Basic Parameters", item: "Total Weight", value: "48 kg" },
      { category: "Basic Parameters", item: "Active Degrees of Freedom", value: "32 DoF" },
      { category: "Basic Parameters", item: "Maximum Speed", value: "1.5 m/s" },
      { category: "Arm & Manipulation", item: "Degrees of Freedom Per Arm", value: "5-DoF" },
      { category: "Arm & Manipulation", item: "Single Arm Payload", value: "2.5 kg" },
      { category: "Chassis & Mobility", item: "Locomotion Type", value: "Bipedal Walking" },
      { category: "Battery & Energy", item: "Battery Capacity", value: "36V / 14Ah (500 Wh)" },
      { category: "Battery & Energy", item: "Operating Runtime", value: "2.0 Hours" },
      { category: "Perception & Compute", item: "Compute Platform", value: "NVIDIA Jetson Orin + ROS 2 Native" }
    ],
    youtubeVideos: [
      {
        id: "7zI3u19q_e0",
        title: "HUTARK A2 Lite ROS 2 Sim-to-Real Gait Policy Deployment",
        subtitle: "UNIVERSITY LAB EXPERIMENT",
        description: "Reinforcement learning walking controller transfer from simulation digital twin to physical hardware in real-time.",
        category: "Research"
      },
      {
        id: "29ECwExc-_M",
        title: "Open API Joint Control & Kinematic Teaching",
        subtitle: "ACADEMIC CURRICULUM",
        description: "Students demonstrating impedance control and trajectory recording using the open-source Python SDK.",
        category: "Education"
      }
    ],
    specs: [
      { label: "Height", value: "155 cm" },
      { label: "Weight", value: "48 kg" },
      { label: "Degrees of Freedom", value: "32 DoF" }
    ],
    features: [{ title: "Modular Architecture", description: "Quick-disconnect limbs and intuitive Python APIs." }],
    applications: [{ title: "Higher Education", desc: "Curriculum for embodied AI, computer vision, and control theory." }],
    gallery: ["/uploads/images/products/a3_hero_banner.jpg"]
  },

  // =========================================================================
  // 10. HUTARK X1 — LIGHTWEIGHT MODULAR HUMANOID
  // =========================================================================
  "X1": {
    id: "X1",
    name: "HUTARK X1",
    series: "HUTARK X Series",
    tagline: "Full-Stack Open-Source Lightweight Humanoid Robot",
    heroSubtitle: "Modular, lightweight humanoid robot with 34 active degrees of freedom.",
    heroImg: "/uploads/images/20250115/93ff145215289a6030b2e08d06815827.png",
    heroBannerBg: "/uploads/images/products/x2_hero_banner.jpg",
    cinematicImg: "/uploads/images/products/x2_cinematic_dark.jpg",
    matchingListImg: "/uploads/images/products/x2_anatomy_diagram.jpg",
    overview: "HUTARK X1 is a full-stack lightweight humanoid robot featuring a modular, high-efficiency structure designed for rapid embodied AI benchmarking and research.",
    cinematicHeading: "Lightweight High-Agility Humanoid",
    cinematicSubheading: "OPEN MODULAR PLATFORM",
    cinematicDesc: "With a total weight of only 33 kg, X1 delivers extraordinary power-to-weight ratio, high agility, and safe co-working dynamics.",
    cinematicMetrics: [
      { value: "34 DoF", label: "Active Degrees of Freedom" },
      { value: "33 kg", label: "Total Lightweight Mass" },
      { value: "130 cm", label: "Compact Height" }
    ],
    manipulationHeading: "Dynamic Dexterous Manipulation",
    manipulationSubtitle: "HIGH POWER DENSITY",
    manipulationDesc: "Compact 7-DoF arms with integrated cable management allow agile manipulation, grasping, and precision motion.",
    manipulationImg: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
    manipulationFeatures: [
      "Ultra-light carbon fiber composite arm shells",
      "Direct torque sensing across all articulated joints",
      "Seamless integration with omnidirectional gripper hands"
    ],
    interactionHeading: "Real-Time Telepresence & Perception",
    interactionSubtitle: "LOW-LATENCY EMBODIED AI",
    interactionDesc: "Ultra-compact head sensor array providing wide-angle stereo vision and instant spatial SLAM mapping.",
    interactionImg: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg",
    interactionBubbles: [
      { title: "Telemetry Stream:", text: "Joint angles synchronized: Zero drift across 10,000 steps." },
      { title: "Navigation Loop:", text: "Aisle route planned: Traversing commercial floor at 1.0 m/s." }
    ],
    matchingListChips: [
      { label: "Stereo Head", value: "Dual RGB-D Depth" },
      { label: "Bipedal Legs", value: "Direct-Drive Actuators" },
      { label: "Dual Arms", value: "7-DoF Compact" },
      { label: "Hands", value: "Modular Grippers" },
      { label: "Core Compute", value: "NVIDIA Jetson Module" },
      { label: "Battery", value: "48V 600Wh Li-Ion" }
    ],
    specRows: [
      { category: "Basic Parameters", item: "Total Height", value: "130 cm" },
      { category: "Basic Parameters", item: "Total Weight", value: "33 kg" },
      { category: "Basic Parameters", item: "Active Degrees of Freedom", value: "34 DoF" },
      { category: "Basic Parameters", item: "Maximum Walking Speed", value: "1.0 m/s" },
      { category: "Battery & Energy", item: "Continuous Runtime", value: "~2.0 Hours" },
      { category: "Perception & Compute", item: "Compute Platform", value: "NVIDIA Jetson Edge Module" }
    ],
    youtubeVideos: [
      {
        id: "29ECwExc-_M",
        title: "HUTARK X1 Ultra-Lightweight 33kg Agile Locomotion",
        subtitle: "HIGH-AGILITY TRIAL",
        description: "Demonstrating fast acceleration, agile cornering, and instant recovery from lateral disturbance pushes.",
        category: "Dynamics"
      },
      {
        id: "7zI3u19q_e0",
        title: "Low-Latency VR Teleoperation & Dexterous Manipulation",
        subtitle: "IMMERSIVE CONTROL",
        description: "Sub-10ms bilateral teleoperation using VR spatial controllers for hazardous remote handling.",
        category: "Teleoperation"
      }
    ],
    specs: [
      { label: "Height", value: "130 cm" },
      { label: "Weight", value: "33 kg" },
      { label: "Degrees of Freedom", value: "34 DoF" },
      { label: "Max Speed", value: "1.0 m/s" },
      { label: "Battery Life", value: "~2.0 Hours" }
    ],
    features: [{ title: "High-Torque Hub Motors", description: "Direct drive motors for virtually silent navigation." }],
    applications: [{ title: "Facility Patrolling", desc: "24/7 security patrol and environmental parameter recording." }],
    gallery: ["/uploads/images/products/x2_hero_banner.jpg"]
  },

  // =========================================================================
  // 11. HUTARK G1 MAX — HEAVY-DUTY COMMERCIAL SERVICE
  // =========================================================================
  "G1_MAX": {
    id: "G1_MAX",
    name: "HUTARK G1 Max",
    series: "HUTARK G Series",
    tagline: "Heavy-Duty Commercial Autonomous Assistant",
    heroSubtitle: "Enhanced payload and tray delivery capabilities for commercial hospitality and healthcare.",
    heroImg: "/uploads/images/20240911/f3a327b21c97a466b04d58503326cfad.png",
    heroBannerBg: "/uploads/images/20261103/015bf1f9da95cc783f5e1e7363b3882c.png",
    cinematicImg: "/uploads/images/20261029/492548ce8722aa332e87aa47ce1019e5.png",
    matchingListImg: "/uploads/images/20261029/62974a39fa9e903d8e47b2cd2befc16e.png",
    overview: "Optimized for continuous food and beverage, linen, and medical specimen transport across complex multistory campuses with autonomous elevator integration.",
    cinematicHeading: "Commercial Multi-Floor Transport Autonomy",
    cinematicSubheading: "HEAVY-DUTY FLEET OPERATIONS",
    cinematicDesc: "Features high-capacity dual compartments with motorized doors, smart tray leveling, and 30 kg cargo payload.",
    cinematicMetrics: [
      { value: "30 kg", label: "Payload Capacity" },
      { value: "10 Hours", label: "Continuous Run" },
      { value: "360°", label: "Safety LiDAR Envelopes" }
    ],
    manipulationHeading: "Automated Compartment Access",
    manipulationSubtitle: "SECURE PIN & RFID DISPATCH",
    manipulationDesc: "Contactless delivery compartments with automated UV sterilization between dispatch runs.",
    manipulationImg: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
    manipulationFeatures: [
      "Motorized dual-door lockable chambers",
      "Dynamic tray leveling on ramps and elevator transitions",
      "Integrated UV-C surface sanitization"
    ],
    interactionHeading: "Voice & Touchscreen Guest Interaction",
    interactionSubtitle: "HOSPITALITY CO-WORKING",
    interactionDesc: "Large multi-touch interface paired with voice guidance in 12 languages for seamless guest interaction.",
    interactionImg: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg",
    interactionBubbles: [
      { title: "Elevator Calling:", text: "Transit link established: Arriving at Floor 8 for delivery." },
      { title: "Recipient Arrival:", text: "PIN 4892 verified: Unlocking Compartment A." }
    ],
    matchingListChips: [
      { label: "Perception", value: "Dual 3D LiDAR" },
      { label: "Cargo Bay", value: "30 kg Dual Chamber" },
      { label: "Chassis", value: "Omnidirectional Base" },
      { label: "Safety", value: "360° Proximity Bumper" },
      { label: "Compute", value: "Fleet Dispatch Core" },
      { label: "Power Bay", value: "2000 Wh Fast-Swap" }
    ],
    specRows: [
      { category: "Basic Parameters", item: "Total Height", value: "145 cm" },
      { category: "Basic Parameters", item: "Cargo Payload Capacity", value: "30 kg" },
      { category: "Basic Parameters", item: "Chassis Speed", value: "1.2 m/s" },
      { category: "Battery & Energy", item: "Operating Duration", value: "10 Hours Continuous" },
      { category: "Battery & Energy", item: "Battery Capacity", value: "2000 Wh" },
      { category: "Perception & Compute", item: "Perception Suite", value: "Dual 3D LiDAR + 3D ToF Sensors" }
    ],
    youtubeVideos: [
      {
        id: "M3_Jb_5zT9I",
        title: "HUTARK G1 Max Commercial Campus Autonomous Multi-Floor Transit",
        subtitle: "HOSPITAL DISPATCH TRIAL",
        description: "Autonomous elevator calling, automatic compartment opening, and 30 kg cargo delivery across hospital wings.",
        category: "Healthcare"
      },
      {
        id: "W1czBcn3Cac",
        title: "Automated UV-C Chamber Sanitization Routine",
        subtitle: "INFECTION CONTROL",
        description: "Autonomous sterilization cycle between delivery dispatches ensuring complete microbial disinfection.",
        category: "Sterilization"
      }
    ],
    specs: [
      { label: "Payload Capacity", value: "30 kg" },
      { label: "Continuous Run", value: "10 Hours" }
    ],
    features: [{ title: "Fleet Management Integration", description: "Autonomous elevator calling and door opening." }],
    applications: [{ title: "Hospitality & Healthcare", desc: "Autonomous medicine delivery and hotel room service." }],
    gallery: ["/uploads/images/20240911/f3a327b21c97a466b04d58503326cfad.png"]
  },

  // =========================================================================
  // 12. HUTARK D1 PRO — AGILE QUADRUPED EXPLORER
  // =========================================================================
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
    cinematicHeading: "High-Dynamic Quadruped Locomotion",
    cinematicSubheading: "EXTREME TERRAIN AGILITY",
    cinematicDesc: "Proprietary direct-drive joint actuators enable back-flipping, high-speed running, and rapid recovery from falls.",
    cinematicMetrics: [
      { value: "12 DoF", label: "Direct-Drive Actuators" },
      { value: "3.5 m/s", label: "Max Run Speed" },
      { value: "35°", label: "Slope Gradeability" }
    ],
    manipulationHeading: "Spine-Mounted Tool Integration",
    manipulationSubtitle: "MODULAR TOP FLANGE",
    manipulationDesc: "Equipped with power and data ports for mounting PTZ inspection cameras, lidar domes, or lightweight manipulator arms.",
    manipulationImg: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
    manipulationFeatures: [
      "Standard 24V/48V auxiliary power output",
      "Dynamic gait stabilization with active top payloads",
      "Quick-release rail system for sensor suites"
    ],
    interactionHeading: "Autonomous Terrain SLAM Navigation",
    interactionSubtitle: "UNSTRUCTURED OUTDOOR MAPPING",
    interactionDesc: "Real-time elevation mapping and footstep planning across rocky slopes, fallen branches, and concrete curbs.",
    interactionImg: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg",
    interactionBubbles: [
      { title: "Footstep Planner:", text: "Gravel incline detected: Activating trot-run gait at 2.8 m/s." },
      { title: "Thermal Scan:", text: "Transformer bank temperature: Nominal (36.5°C)." }
    ],
    matchingListChips: [
      { label: "Leg Joints", value: "12 Direct-Drive" },
      { label: "Foot Sensors", value: "3-Axis Force Array" },
      { label: "Vision Suite", value: "RGB-D + Solid-State LiDAR" },
      { label: "Enclosure", value: "IP67 Magnesium Alloy" },
      { label: "Compute Core", value: "NVIDIA Jetson AGX" },
      { label: "Battery Pack", value: "48V 800Wh Battery" }
    ],
    specRows: [
      { category: "Basic Parameters", item: "Total Weight", value: "15 kg" },
      { category: "Basic Parameters", item: "Maximum Speed", value: "Up to 3.5 m/s" },
      { category: "Basic Parameters", item: "Max Payload", value: "5.0 kg" },
      { category: "Basic Parameters", item: "Slope Climbing Angle", value: "Up to 35°" },
      { category: "Chassis & Mobility", item: "Leg Actuation", value: "12-DoF Direct Drive Actuators" },
      { category: "Battery & Energy", item: "Continuous Runtime", value: "3.0 Hours Continuous Motion" },
      { category: "Perception & Compute", item: "Sensors", value: "3D LiDAR + Intel RealSense RGB-D" }
    ],
    youtubeVideos: [
      {
        id: "fn3KWM1kuAw",
        title: "HUTARK D1 Pro High-Dynamic Quadruped Backflip & Terrain Parkour",
        subtitle: "DYNAMIC ACTUATION BENCHMARK",
        description: "Showcasing high power-density direct-drive actuators executing backflips, 3.5 m/s sprints, and stair runs.",
        category: "Locomotion"
      },
      {
        id: "29ECwExc-_M",
        title: "Rough Gravel & Concrete Obstacle Traverse",
        subtitle: "OUTDOOR MOBILITY",
        description: "Trot-run gait across unstructured construction terrain with real-time elevation mapping and footstep planning.",
        category: "Terrain"
      }
    ],
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

  // =========================================================================
  // 13. HUTARK D1 ULTRA — INDUSTRIAL IP67 QUADRUPED
  // =========================================================================
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
    overview: "Designed for hazardous outdoor operations under extreme temperatures from -20°C to +55°C across petrochemical yards, oil refineries, and offshore rigs.",
    cinematicHeading: "Submersible IP67 Petrochemical Patrol",
    cinematicSubheading: "RUGGED HAZARDOUS ENVIRONMENT ROBOTICS",
    cinematicDesc: "Certified for water immersion up to 1 meter, severe dust storms, and explosive Zone 2 industrial gas environments.",
    cinematicMetrics: [
      { value: "IP67", label: "Submersible Ingress Rating" },
      { value: "15 kg", label: "Payload Capacity" },
      { value: "4.0 Hours", label: "Continuous Patrol" }
    ],
    manipulationHeading: "Multi-Spectral PTZ Sensor Turret",
    manipulationSubtitle: "ACOUSTIC & RADIOMETRIC SENSING",
    manipulationDesc: "Continuous acoustic gas leak detection and radiometric thermal profiling for identifying pipeline micro-leaks.",
    manipulationImg: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
    manipulationFeatures: [
      "Radiometric thermal camera with ±1°C sensitivity",
      "Ultrasonic acoustic sensor identifying pressurized gas leaks",
      "30x optical zoom reading analog pressure dials"
    ],
    interactionHeading: "Autonomous Docking & Remote SCADA Uplink",
    interactionSubtitle: "UNCREWED 24/7 OPERATION",
    interactionDesc: "Returns automatically to ruggedized doghouse charging base for inductive charging and encrypted SCADA upload.",
    interactionImg: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg",
    interactionBubbles: [
      { title: "Valve Inspection:", text: "Cracking unit line 4: Pressure dial reads 4.2 Bar. Leak status: ZERO." },
      { title: "Charging Dock:", text: "Patrol loop complete: Docked at Base Shelter #1. Charging active." }
    ],
    matchingListChips: [
      { label: "PTZ Turret", value: "Thermal + Acoustic" },
      { label: "IP67 Shell", value: "Submersible Sealing" },
      { label: "Leg Joints", value: "High-Torque Planetary" },
      { label: "Foot Pads", value: "Oil-Resistant Rubber" },
      { label: "Compute Core", value: "Dual Jetson Orin" },
      { label: "Battery Bay", value: "48V 1400Wh Battery" }
    ],
    specRows: [
      { category: "Basic Parameters", item: "Protection Rating", value: "IP67 Submersible (1 Meter Depth)" },
      { category: "Basic Parameters", item: "Total Weight", value: "18.5 kg" },
      { category: "Basic Parameters", item: "Max Payload", value: "15.0 kg" },
      { category: "Basic Parameters", item: "Operating Temperature", value: "-20°C to +55°C" },
      { category: "Battery & Energy", item: "Continuous Runtime", value: "4.0 Hours Patrol" },
      { category: "Battery & Energy", item: "Charging Type", value: "Autonomous Inductive Charging Station" }
    ],
    youtubeVideos: [
      {
        id: "fn3KWM1kuAw",
        title: "HUTARK D1 Ultra IP67 Water Immersion & Petrochemical Patrol",
        subtitle: "SUBMERSIBLE PATROL",
        description: "Operating in torrential rain, 1-meter water fording, and explosive gas Zone 2 inspection rounds.",
        category: "Hazardous"
      },
      {
        id: "M3_Jb_5zT9I",
        title: "Acoustic Gas Leak Detection & Thermal Radiometric Scan",
        subtitle: "PREDICTIVE MAINTENANCE",
        description: "Scanning high-pressure gas pipelines with ultrasonic sensors and identifying minute valve thermal anomalies.",
        category: "Inspection"
      }
    ],
    specs: [
      { label: "Protection Rating", value: "IP67" },
      { label: "Payload", value: "15 kg" },
      { label: "Endurance", value: "4 Hours Continuous Walk" }
    ],
    features: [{ title: "Explosion-Proof Certified Enclosure", description: "Safe for Zone 2 chemical and gas environments." }],
    applications: [{ title: "Petrochemical Refineries", desc: "Autonomous valve reading and acoustic gas leak detection." }],
    gallery: ["/uploads/images/products/d1_hero_banner.jpg"]
  },

  // =========================================================================
  // 14. HUTARK D1 MAXPRO — ACTIVE MOBILE MANIPULATION QUADRUPED
  // =========================================================================
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
    overview: "The complete mobile manipulation quadruped for active intervention in uncrewed remote industrial sites, capable of turning physical valves and toggling electrical switches.",
    cinematicHeading: "Mobile Manipulation Quadruped Platform",
    cinematicSubheading: "PHYSICAL INTERVENTION ROBOTICS",
    cinematicDesc: "Integrates a high-precision 6-DoF robotic arm on the spine of an industrial quadruped with unified balance control.",
    cinematicMetrics: [
      { value: "6-DoF Arm", label: "Integrated Robotic Arm" },
      { value: "3.0 kg", label: "Arm End-Effector Payload" },
      { value: "850 mm", label: "Maximum Working Reach" }
    ],
    manipulationHeading: "Physical Valve Turning & Switch Toggling",
    manipulationSubtitle: "WHOLE-BODY STABILIZATION",
    manipulationDesc: "Unified whole-body controller stabilizes quadruped feet while the arm applies up to 15 N·m torque to industrial valves.",
    manipulationImg: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
    manipulationFeatures: [
      "Mounted 6-DoF arm with ±0.05 mm repeatability",
      "Dynamic whole-body gravity and reaction force compensation",
      "Interchangeable gripper for analog switches and lever valves"
    ],
    interactionHeading: "Autonomous Visual Grasp Alignment",
    interactionSubtitle: "EYE-IN-HAND VISION",
    interactionDesc: "Wrist-mounted depth camera identifies valve geometry and autonomously calculates grasp orientation.",
    interactionImg: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg",
    interactionBubbles: [
      { title: "Valve Alignment:", text: "Main steam valve identified: Aligning 2-finger gripper to handle." },
      { title: "Actuation Verified:", text: "Valve rotated 90° clockwise. Flow confirmed isolated." }
    ],
    matchingListChips: [
      { label: "Spine Arm", value: "6-DoF Manipulator" },
      { label: "Wrist Vision", value: "Eye-in-Hand Depth" },
      { label: "Legs", value: "12 Direct-Drive Joints" },
      { label: "Gripper", value: "Parallel Electric" },
      { label: "Compute Core", value: "Dual Jetson Orin" },
      { label: "Battery", value: "48V 1600Wh Battery" }
    ],
    specRows: [
      { category: "Basic Parameters", item: "Arm Degrees of Freedom", value: "6-DoF Integrated Robotic Arm" },
      { category: "Basic Parameters", item: "Arm Maximum Reach", value: "850 mm" },
      { category: "Basic Parameters", item: "Arm Payload Capacity", value: "3.0 kg at Full Extension" },
      { category: "Basic Parameters", item: "Total Weight", value: "22 kg (Including Arm & Battery)" },
      { category: "Chassis & Mobility", item: "Quadruped Mobility", value: "12-DoF Direct Drive High-Torque Legs" },
      { category: "Battery & Energy", item: "Operating Duration", value: "3.5 Hours Active Manipulation" },
      { category: "Perception & Compute", item: "Perception Suite", value: "Spine 3D LiDAR + Wrist RGB-D Camera" }
    ],
    youtubeVideos: [
      {
        id: "fn3KWM1kuAw",
        title: "HUTARK D1 MaxPro Active Valve Turning with Spine 6-DoF Arm",
        subtitle: "PHYSICAL INTERVENTION",
        description: "Quadruped stabilizing whole-body stance while mounted 6-DoF robotic arm applies 15 N·m torque to steam valves.",
        category: "Manipulation"
      },
      {
        id: "M3_Jb_5zT9I",
        title: "Autonomous Electrical Breaker Switch Toggling",
        subtitle: "REMOTE SUBSTATION DISPATCH",
        description: "Eye-in-hand visual servoing detecting switch orientation and toggling remote substation breakers autonomously.",
        category: "Substation"
      }
    ],
    specs: [{ label: "Arm Reach", value: "850 mm" }, { label: "Arm Payload", value: "3 kg" }],
    features: [{ title: "Active Mobile Manipulation", description: "Unified whole-body controller for walking while grasping." }],
    applications: [{ title: "Offshore Platforms", desc: "Emergency valve actuation and button press routines." }],
    gallery: ["/uploads/images/products/d1_hero_banner.jpg"]
  }
};
