import { type MsmeChallengeListItem } from "./msme-challenges-list";

export interface ProgramMetadata {
  program: string;
  platform: string;
  category: string;
  program_duration: string;
  format: string;
  culmination: string;
  opportunity: string;
  source_document: string;
  version: string;
  created_date: string;
  total_challenges: number;
}

export interface ChallengePRD {
  executive_summary: string;
  problem_statement?: {
    overview: string;
    current_state?: string[];
    desired_state?: string[];
    impact?: string;
    root_causes?: string[];
    constraints?: string[];
    requirements?: string[];
    use_cases?: string[];
    fire_risks?: string[];
    current_issues?: string[];
  };
  functional_requirements?: {
    id: string;
    category: string;
    requirement: string;
    priority: string;
  }[];
  non_functional_requirements?: {
    id: string;
    category: string;
    requirement: string;
  }[];
  technical_specifications?: {
    architecture?: string;
    tech_stack_recommended?: string[];
    integration_points?: string[];
    hardware_requirements?: string[];
    frontend?: string;
    backend?: string;
    cad_integration?: string;
    nesting?: string;
    design_tools?: string[];
    semiconductor?: string;
    pcb?: string;
    testing?: string;
    hardware?: string[];
    software?: string[];
    power?: string;
    sensing?: string;
    processor?: string;
    display?: string;
    battery?: string;
    plc?: string;
    tension_control?: string;
    hmi?: string;
    data?: string;
    sensors?: string[];
    controller?: string;
    database?: string;
    ml_platform?: string;
    widget?: string;
    analytics?: string;
    nlp?: string;
    optics?: string;
    led?: string;
    gimbal?: string;
    vision?: string;
    ai?: string;
    compute?: string;
    actuator?: string;
    positioning?: string;
    vitals?: string;
    safety?: string;
    network?: string;
    wearable?: string;
  };
  success_metrics: {
    primary_kpis: {
      metric?: string;
      baseline?: string;
      target: string;
      timeframe?: string;
    }[];
    secondary_kpis?: {
      metric: string;
      baseline: string;
      target: string;
    }[];
  };
  timeline_weeks: number;
  budget_estimate: string;
  eligibility_criteria?: {
    msme_requirements: string[];
    problem_requirements: string[];
  };
  evaluation_criteria?: string[];
}

export interface NagpurNextChallenge extends MsmeChallengeListItem {
  challenge_number: number;
  official_title: string;
  domain: string;
  tech_stack: string[];
  hmw_statement: string;
  challenge_overview: string;
  student_deliverables: string[];
  expected_outcome: string;
  complexity: "Variable" | "Low" | "Medium" | "High" | "Very High";
  skills_required: string[];
  prd?: ChallengePRD;
  reference_videos?: string[];
  existing_product?: string;
  proposed_solution_pdf?: string;
  industry_context?: string;
  tags: string[];
}

export const NAGPUR_NEXT_PROGRAM_META: ProgramMetadata = {
  program: "Nagpur NEXT Student Innovation Challenge 2026",
  platform: "Inpulse by InUnity",
  category: "MSME Innovation",
  program_duration: "3 months of intensive collaboration",
  format: "Student teams partnered with MSME mentors",
  culmination: "Demo Day pitch to industry leaders",
  opportunity: "Incubation support for winning solutions",
  source_document: "Nagpur_NEXT_Innovation_Challenge_Documentation.docx",
  version: "2.0.0",
  created_date: "2026-04-07",
  total_challenges: 12,
};

export const NAGPUR_NEXT_CHALLENGES: NagpurNextChallenge[] = [
  {
    id: "challenge-nag-011",
    challenge_number: 11,
    official_title: "Intelligent Lighting Systems for Drones",
    title: "SAR Drone Lighting Systems",
    domain: "Drones / Emergency Response",
    tech_stack: ["Swarm Intelligence", "LED Systems", "Communication Protocols", "Path Planning"],
    hmw_statement: "How might we enable coordinated fleets of drones with intelligent lighting to cover dark zones during search-and-rescue?",
    challenge_overview: "Single drones have limited range/battery. Coordinated fleets with adaptive beam lighting (10-120°) are needed for large-area SAR at night.",
    company: "Navitas (Zero Systems)",
    region: "Nagpur",
    department: "Drone Lab",
    sector: "Drones",
    status: "Published",
    applicants: 12,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Adaptive beam (10-120°) drone lights slaved to camera tracking for emergency response.",
    problemLocation: "SAR Operation Zones",
    businessImpact: "+50% faster coverage; camera-integrated target illumination.",
    desiredOutcome: "Ultra-efficient <50W lighting with MAVLink flight controller integration.",
    student_deliverables: [
      "Design swarm coordination algorithms",
      "Develop energy-efficient LED systems",
      "Create fleet communication protocols",
      "Implement autonomous path planning",
    ],
    expected_outcome: "Efficient large-area nighttime SAR coverage.",
    proposed_solution_pdf: "/Azhar - Nagpur NEXT - MSME Presentation Template.pptx.pdf",
    complexity: "High",
    skills_required: ["Embedded Systems", "Optics", "Mechanical Design", "Drone Systems"],
    tags: ["Drones", "SAR", "Emergency Response", "Adaptive Optics", "UAV Payloads"],
    prd: {
      executive_summary: "Design an adaptive lighting system for search and rescue drones.",
      problem_statement: {
        overview: "Current search and rescue (SAR) operations using drones at night are heavily constrained by lighting. Single-purpose payload drones have limited range and battery life, and static lighting systems cannot adapt to varying altitudes or tracking requirements.",
        current_state: [
          "Drones equipped with standard lights waste battery illuminating non-essential areas.",
          "Fixed beam angles fail to provide adequate coverage during multi-altitude sweeps.",
          "Lack of tracking integration makes target acquisition slow and manual."
        ],
        impact: "Inefficient lighting drastically reduces the effective operational window for nighttime SAR, increasing the risk to lost individuals and extending mission timelines."
      },
      success_metrics: {
        primary_kpis: [
          { metric: "Beam Adjustable", target: "10-120°" },
          { metric: "Power", target: "<50W" },
        ],
      },
      timeline_weeks: 12,
      budget_estimate: "₹5-8 Lakhs for prototype",
    },
  },  {
    id: "challenge-nag-012",
    challenge_number: 12,
    official_title: "Fire Detection and Suppression System",
    title: "Industrial Fire Detection AI",
    domain: "Industrial Safety",
    tech_stack: ["Fire Sensors", "Microcontrollers", "Suppression Systems", "Automation"],
    hmw_statement: "How might we design an automatic system to detect and suppress fires early in cotton industries?",
    challenge_overview: "Cotton is highly flammable. Smoke detectors trigger too late. Needs thermal/vision-based early hot-spot detection with targeted suppression.",
    company: "Automation Controls",
    region: "Nagpur",
    department: "Safety Division",
    sector: "Manufacturing",
    status: "Published",
    applicants: 10,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Thermal+AI fire detection with targeted pan-tilt water mist for cotton ginning safety.",
    problemLocation: "Cotton Ginning Unit",
    businessImpact: "Detection <10 seconds; zero water drenching damage.",
    desiredOutcome: "99% false alarm suppression in dusty environments.",
    student_deliverables: [
      "Identify early fire sensors (thermal/flame)",
      "Design control logic for suppression",
      "Develop targeted misting mechanism",
      "Demonstrate simulated fire response",
    ],
    expected_outcome: "Automatic early fire detection and suppression for cotton plants.",
    reference_videos: ["https://www.youtube.com/shorts/VO9VtvpyVUI"],
    complexity: "High",
    skills_required: ["Computer Vision", "Deep Learning", "Embedded Systems", "Mechanical Design"],
    tags: ["Fire Safety", "Computer Vision", "Industrial Safety", "Cotton Industry", "AI"],
    prd: {
      executive_summary: "Design AI-powered fire detection using thermal cameras with targeted suppression.",
      success_metrics: {
        primary_kpis: [
          { metric: "Detection Time", target: "<10 seconds" },
          { metric: "False Alarm Rate", target: "<1%" },
        ],
      },
      timeline_weeks: 12,
      budget_estimate: "₹8-12 Lakhs for prototype",
    },
  },  {
    id: "challenge-nag-001",
    challenge_number: 1,
    official_title: "Workflow Optimisation for Shopfloor",
    title: "Workflow Optimisation for Shopfloor",
    domain: "Manufacturing Automation",
    tech_stack: ["IoT Sensors", "Real-time Dashboards", "Mobile Apps", "Data Analytics"],
    hmw_statement: "How might we design a digital workflow system that streamlines shop-floor operations and boosts efficiency beyond the current 50–60%?",
    challenge_overview: "Manufacturing industries in the MSME sector face inefficient workflows, lack of real-time visibility, and dependence on manual coordination, resulting in efficiency levels of only 50–60%. Companies like Ashta Tech Automation Pvt. Ltd. deal with unplanned downtime, delayed job allocation, and material unavailability.",
    company: "Ashta Tech Automation Pvt. Ltd.",
    region: "Nagpur",
    department: "Shopfloor",
    sector: "Manufacturing",
    status: "Published",
    applicants: 12,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Design a digital workflow system for Ashta Tech to transform shop-floor operations and boost OEE from 50-60% to 75%+.",
    problemLocation: "Ashta Tech Shopfloor",
    businessImpact: "25% order delays; customer churn; ₹25-40L annual opportunity cost.",
    desiredOutcome: "Reduced idle time, proactive alerts, 75%+ OEE, and data-driven insights.",
    student_deliverables: [
      "Identify inefficiencies in shop-floor workflows",
      "Design a digital job management system",
      "Develop a real-time monitoring dashboard",
      "Create downtime tracking and root-cause analysis",
      "Integrate mobile/tablet-based operator interfaces",
      "Consider scalability across factory sizes",
    ],
    expected_outcome: "Reduce machine idle time, improve coordination, increase OEE, enhance productivity.",
    complexity: "High",
    skills_required: ["IoT/Embedded Systems", "Web Development", "Database Design", "UI/UX", "Industrial Protocols"],
    tags: ["Industry 4.0", "MES", "OEE", "IoT", "Manufacturing", "Digital Transformation"],
    prd: {
      executive_summary: "Design a comprehensive digital workflow system to transform shop-floor operations in MSME manufacturing facilities.",
      problem_statement: {
        overview: "Manufacturing MSMEs operate at 50-60% efficiency due to lack of real-time visibility, manual coordination, and reactive problem-solving.",
        current_state: ["Manual job allocation via paper job cards", "No real-time visibility into machine status", "Reactive response to breakdowns"],
        desired_state: ["Digital job management with real-time tracking", "Live dashboard showing all machine status", "Mobile-first operator interfaces"],
        impact: "25% of orders face delays; customer churn due to missed deadlines; ₹25-40 Lakhs annual opportunity cost.",
        root_causes: ["No digital infrastructure for shopfloor operations", "Lack of IoT connectivity to machines"],
      },
      functional_requirements: [
        { id: "FR-001", category: "Job Management", requirement: "Digital job card creation with barcode/QR assignment", priority: "P0" },
        { id: "FR-002", category: "Job Management", requirement: "Real-time job status tracking", priority: "P0" },
        { id: "FR-003", category: "Machine Monitoring", requirement: "Machine status dashboard", priority: "P0" },
      ],
      success_metrics: {
        primary_kpis: [
          { metric: "OEE", baseline: "55-60%", target: "70-75%", timeframe: "6 months" },
          { metric: "On-Time Delivery", baseline: "75%", target: "90%", timeframe: "6 months" },
        ],
      },
      timeline_weeks: 12,
      budget_estimate: "₹5-10 Lakhs for MVP including hardware",
    },
  },

  {
    id: "challenge-nag-003",
    challenge_number: 3,
    official_title: "Swappable Battery for Tractors",
    title: "Swappable Battery for Tractors",
    domain: "Electric Mobility / AgriTech",
    tech_stack: ["Battery Management Systems", "Mechanical Engineering", "Solar Integration", "IoT"],
    hmw_statement: "How might we design a fast, safe, and cost-effective battery swapping system for tractors to minimize downtime and enable reliable electric farming operations?",
    challenge_overview: "Electric tractors face major downtime due to long plug-in charging times (several hours), which is impractical during critical farming windows. Existing solutions rely on stable power infrastructure unavailable in rural areas.",
    company: "Tractor Seva",
    region: "Nagpur",
    department: "R&D",
    sector: "Electric Mobility",
    status: "Published",
    applicants: 8,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Designing a battery swapping ecosystem to solve charging downtime for electric tractors in rural scenarios.",
    problemLocation: "Rural Farms",
    businessImpact: "75%+ fleet utilization and reduced operational downtime.",
    desiredOutcome: "Battery swap in <5 minutes with solar-ready infrastructure.",
    student_deliverables: [
      "Identify energy requirements and duty cycles",
      "Design modular, durable battery packs",
      "Develop a mechanical docking/locking mechanism",
      "Integrate BMS and charging infrastructure",
      "Consider rural infrastructure constraints",
    ],
    expected_outcome: "Enable reliable electric farming operations with minimal downtime.",
    complexity: "High",
    skills_required: ["Mechanical Engineering", "Battery Systems", "Embedded Systems", "IoT", "Rural Design"],
    tags: ["Electric Vehicles", "Battery Swap", "AgriTech", "Rural Technology", "Sustainable Farming"],
    prd: {
      executive_summary: "Design a complete swappable battery ecosystem for electric tractors including standardized battery packs and quick-swap mechanisms.",
      problem_statement: {
        overview: "Electric tractor charging takes 6-8 hours, but farming operations during sowing/harvesting require 12-14 hour continuous operation.",
      },
      success_metrics: {
        primary_kpis: [
          { metric: "Swap Time", target: "<5 minutes" },
          { metric: "Fleet Utilization", baseline: "40%", target: "75%" },
        ],
      },
      timeline_weeks: 12,
      budget_estimate: "₹15-25 Lakhs for prototype system",
    },
  },
  {
    id: "challenge-nag-004",
    challenge_number: 4,
    official_title: "Digital Platform for Custom Furniture",
    title: "Digital Platform for Custom Furniture",
    domain: "Manufacturing / Sustainability",
    tech_stack: ["CAD Integration", "Nesting Algorithms", "Web Platform", "Supply Chain"],
    hmw_statement: "How might we design a digital customization and sourcing platform that helps customers create dimension-based metal furniture while reducing material waste?",
    challenge_overview: "Metal furniture manufacturing involves significant material waste due to standardized sizing and poor design-production coordination. Customers struggle to find furniture that fits exact spatial needs.",
    company: "Aviven Engitech Pvt. Ltd. (Modura)",
    region: "Nagpur",
    department: "Digital Experience",
    sector: "Manufacturing",
    status: "Published",
    applicants: 5,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Web platform for 3D furniture customization with automated nesting to reduce sheet-metal waste.",
    problemLocation: "Modura Manufacturing Unit",
    businessImpact: "Design cycle reduced from 14 days to 2 days; material waste <8%.",
    desiredOutcome: "Mass customization with closed-loop recycling for offcuts.",
    student_deliverables: [
      "Identify customer requirements for customizable metal furniture",
      "Develop a dimension-based digital configuration system",
      "Design an intelligent sheet-metal nesting engine",
      "Propose a recycling loop for tracking offcuts",
    ],
    expected_outcome: "Reduce material waste and enable mass customization.",
    complexity: "Medium",
    skills_required: ["Web Development", "3D Graphics (Three.js)", "CAD Integration", "Algorithm Design", "UI/UX"],
    tags: ["3D Configurator", "Custom Manufacturing", "Sustainability", "CAD/CAM", "Material Optimization"],
    prd: {
      executive_summary: "Build a 3D configurator platform enabling customers to customize metal furniture dimensions and optimize material usage.",
      problem_statement: {
        overview: "Design-to-production cycle takes 7-14 days due to manual 2D drawings. 15-20% material waste from poor nesting.",
      },
      success_metrics: {
        primary_kpis: [
          { metric: "Design Cycle Time", baseline: "7-14 days", target: "1-2 days" },
          { metric: "Material Waste", baseline: "15-20%", target: "<8%" },
        ],
      },
      timeline_weeks: 12,
      budget_estimate: "₹3-5 Lakhs for MVP platform",
    },
  },
  {
    id: "challenge-nag-005",
    challenge_number: 5,
    official_title: "RF Power Amplifier Circuit for Defence",
    title: "RF Power Amplifier for Defence",
    domain: "Defence / Electronics",
    tech_stack: ["RF Design Tools", "PCB Design", "Simulation Software", "High-Frequency Electronics"],
    hmw_statement: "How might we design and prototype a compact, energy-efficient RF power amplifier circuit for defense communication systems?",
    challenge_overview: "Indigenous (Made-in-India) RF amplifier solutions reduce dependency on imported components with ITAR restrictions. Students work hands-on with GHz-range RF circuit design.",
    company: "SMARK Automations",
    region: "Nagpur",
    department: "Electronics Lab",
    sector: "Defence",
    status: "Published",
    applicants: 3,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Indigenous RF power amplifier design to replace tactical imports in defense systems.",
    problemLocation: "SMARK R&D Facility",
    businessImpact: "Eliminates ITAR restrictions; 40% cost reduction vs imports.",
    desiredOutcome: "Functional RF hardware prototype meeting JSS 55555 specs.",
    student_deliverables: [
      "Design and simulate GHz RF power amplifier",
      "Optimize gain, efficiency, and stability",
      "Design PCB layout for high-frequency operation",
      "Demonstrate functional hardware module",
    ],
    expected_outcome: "Indigenous RF amplifier solution for defense applications.",
    complexity: "Very High",
    skills_required: ["RF Circuit Design", "PCB Design", "Simulation (ADS)", "Electronics Prototyping"],
    tags: ["Defence Electronics", "RF Engineering", "Make in India", "Atmanirbhar Bharat", "iDEX"],
    prd: {
      executive_summary: "Design, simulate, and prototype an indigenous RF power amplifier for tactical defence communications.",
      problem_statement: {
        overview: "Defence systems depend on imported RF components with 6-12 month lead times.",
      },
      success_metrics: {
        primary_kpis: [
          { metric: "Efficiency", target: "PAE > 40%" },
          { metric: "Gain", target: "30-40 dB" },
        ],
      },
      timeline_weeks: 12,
      budget_estimate: "₹5-8 Lakhs for prototype",
    },
  },
  {
    id: "challenge-nag-006",
    challenge_number: 6,
    official_title: "Modular Air Purification Platform",
    title: "Modular Air Purification Platform",
    domain: "CleanTech / Healthcare",
    tech_stack: ["Filtration Systems", "Airflow Design", "Modular Engineering", "Sensors"],
    hmw_statement: "How might we design a modular air purification platform that can be easily configured for different environments?",
    challenge_overview: "Different environments face varying pollutants (dust, pathogens, VOCs). One-size-fits-all purifiers are inefficient. Needs a modular, bio-integrated approach.",
    company: "Biowall Agritech Pvt. Ltd. (Mitrasena)",
    region: "Nagpur",
    department: "Product Design",
    sector: "CleanTech",
    status: "Published",
    applicants: 7,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Stackable, smart air purifiers combining bio-filtration with HEPA for schools and hospitals.",
    problemLocation: "Urban Offices/Hospitals",
    businessImpact: "Energy efficiency +40% vs single boxes; linear scaling to 5000 sqft.",
    desiredOutcome: "Interconnected units with PM2.5 monitoring and bio-filtering.",
    student_deliverables: [
      "Identify common pollutants across different environments",
      "Design modular filtration units (HEPA/Bio/Carbon)",
      "Develop scalable airflow enclosure",
      "Prototype smart monitoring and control",
    ],
    expected_outcome: "Versatile air purification platform adaptable to various environments.",
    complexity: "Medium",
    skills_required: ["Mechanical Engineering", "IoT/Embedded", "Air Quality Science", "Mobile App Development"],
    tags: ["CleanTech", "Air Quality", "Bio-Filtration", "IoT", "Smart Buildings"],
    prd: {
      executive_summary: "Design a modular air purification system combining bio-filtration with smart monitoring.",
      success_metrics: {
        primary_kpis: [
          { metric: "PM2.5 Reduction", target: ">90%" },
          { metric: "Energy Efficiency", target: "30-40% better than box units" },
        ],
      },
      timeline_weeks: 12,
      budget_estimate: "₹3-5 Lakhs for prototype",
    },
  },
  {
    id: "challenge-nag-007",
    challenge_number: 7,
    official_title: "Indigenous Digital Caliper and Gauge",
    title: "Indigenous Digital Caliper & Gauge",
    domain: "Precision Instruments",
    tech_stack: ["Embedded Systems", "Sensing Mechanisms", "Bluetooth/USB", "Data Integration"],
    hmw_statement: "How might we develop an indigenous digital caliper system that eliminates import dependency and enables real-time data integration?",
    challenge_overview: "90% of precision instruments are imported. Need a 'Made in India' connected caliper for paperless quality control in MSME shopfloors.",
    company: "Sanjay Precision Works",
    region: "Nagpur",
    department: "Quality Control",
    sector: "Manufacturing",
    status: "Published",
    applicants: 15,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Bluetooth-enabled digital caliper for paperless QC and real-time SPC charts in factories.",
    problemLocation: "Sanjay Precision Unit",
    businessImpact: "Price point reduction (₹6K vs ₹25K for connected units); zero transcription errors.",
    desiredOutcome: "Paperless QC records and one-tap data transfer to app.",
    student_deliverables: [
      "Design sensing mechanisms for precision measurement",
      "Develop embedded electronics with display",
      "Integrate Bluetooth/USB for data transfer",
      "Demonstrate working digital caliper prototype",
    ],
    expected_outcome: "Made-in-India digital measurement system with data connectivity.",
    complexity: "High",
    skills_required: ["Embedded Systems", "Bluetooth/BLE", "Mobile App Development", "Precision Mechanics"],
    tags: ["Make in India", "Precision Engineering", "Metrology", "Quality Control", "SPC"],
    prd: {
      executive_summary: "Develop an indigenous digital caliper with Bluetooth connectivity for real-time data transfer.",
      success_metrics: {
        primary_kpis: [
          { metric: "Resolution", target: "0.01mm" },
          { metric: "Price", target: "₹5,000-8,000" },
        ],
      },
      timeline_weeks: 12,
      budget_estimate: "₹3-5 Lakhs for prototype",
    },
  },
  {
    id: "challenge-nag-008",
    challenge_number: 8,
    official_title: "Transformer Manufacturing",
    title: "Transformer Coil Winding Automation",
    domain: "Manufacturing / Automation",
    tech_stack: ["Coil Winding Machines", "Process Monitoring", "Quality Control Systems"],
    hmw_statement: "How might we transform labor-intensive inductor and transformer manufacturing into a streamlined, reliable process?",
    challenge_overview: "Manual winding and testing in SMEs leads to quality variations and worker fatigue. Needs automated winding mechanisms with multi-gauge handling.",
    company: "Beta Computronics Pvt. Ltd.",
    region: "Nagpur",
    department: "Production",
    sector: "Manufacturing",
    status: "Published",
    applicants: 9,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Servo-based winding automation to reduce defects and setup time in transformer manufacturing.",
    problemLocation: "Beta Computronics Unit",
    businessImpact: "Setup time <5 mins (was 60 mins); defects <2%.",
    desiredOutcome: "Precision winding with closed-loop tension control and digital counting.",
    student_deliverables: [
      "Design automated winding mechanisms",
      "Improve fixtures and tooling for consistency",
      "Develop process monitoring for quality control",
      "Integrate digital traceability",
    ],
    expected_outcome: "Streamline transformer manufacturing with improved consistency.",
    reference_videos: ["https://youtu.be/lequv5Bh6yE", "https://youtu.be/lKdDKrGZrcw"],
    complexity: "High",
    skills_required: ["PLC Programming", "Servo Systems", "Mechanical Design", "Industrial IoT"],
    tags: ["Transformer", "Automation", "PLC", "Quality Control", "Industry 4.0"],
    prd: {
      executive_summary: "Design a precision winding automation system with closed-loop tension control.",
      success_metrics: {
        primary_kpis: [
          { metric: "Defect Rate", baseline: "5%", target: "<2%" },
          { metric: "Setup Time", baseline: "60 min", target: "<5 min" },
        ],
      },
      timeline_weeks: 12,
      budget_estimate: "₹8-12 Lakhs for retrofit",
    },
  },
  {
    id: "challenge-nag-009",
    challenge_number: 9,
    official_title: "Improving the Yield of Food Processing Centers",
    title: "Food Processing Yield Improvement",
    domain: "Food Processing / AgriTech",
    tech_stack: ["Automation", "Machine Design", "Computer Vision", "Process Optimization"],
    hmw_statement: "How might we develop machinery that minimizes peeling and cutting losses for processed onion products?",
    challenge_overview: "Yield losses occur during manual peeling/cutting due to onion size/shape variations. Needs adaptive machinery to maintain precision.",
    company: "Baron Integrated Services Pvt. Ltd.",
    region: "Nagpur",
    department: "Process Floor",
    sector: "Food Processing",
    status: "Published",
    applicants: 11,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Yield monitoring and adaptive drying for onion processing to save ₹50-80L annually.",
    problemLocation: "Baron Dehydration Unit",
    businessImpact: "Yield +0.5% (significant revenue); energy -20%.",
    desiredOutcome: "Inline moisture measurement and adaptive heat control.",
    student_deliverables: [
      "Analyze current peeling/cutting loss points",
      "Develop innovative machinery designs",
      "Design for size/shape variation tolerance",
      "Maintain product quality while maximizing yield",
    ],
    expected_outcome: "Redefine onion processing with minimal loss.",
    complexity: "Medium",
    skills_required: ["Process Engineering", "IoT/Sensors", "Machine Learning", "Food Science"],
    tags: ["Food Processing", "Dehydration", "AI/ML", "Process Optimization", "AgriTech"],
    prd: {
      executive_summary: "Develop AI-powered process optimization for dehydration plants.",
      success_metrics: {
        primary_kpis: [
          { metric: "Yield Improvement", target: "+0.5% net" },
          { metric: "Quality Rejects", baseline: "5%", target: "<2%" },
        ],
      },
      timeline_weeks: 12,
      budget_estimate: "₹12-18 Lakhs for pilot",
    },
  },
  {
    id: "challenge-nag-010",
    challenge_number: 10,
    official_title: "Real-time Feedback Tool for User Experience",
    title: "Real-time UX Feedback Tool",
    domain: "Product Development / UX",
    tech_stack: ["Web/Mobile Plugins", "Analytics", "Real-time Processing", "Dashboards"],
    hmw_statement: "How might we design a tool that seamlessly captures user experience data during initial product interactions?",
    challenge_overview: "Standard surveys have 2% response rates. Need an in-context, lightweight widget to capture sentiment during onboarding or first use.",
    company: "Techwalnut Innovations LLP",
    region: "Nagpur",
    department: "Software Product",
    sector: "Product Development",
    status: "Published",
    applicants: 6,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "Lightweight (<50KB) privacy-first UX feedback widget with real-time sentiment analysis.",
    problemLocation: "Techwalnut SaaS Platform",
    businessImpact: "Response rates 10-15%; time-to-insight reduced to hours.",
    desiredOutcome: "Sentiment-linked behavioral data with auto-theming of feedback.",
    student_deliverables: [
      "Design intuitive feedback mechanisms",
      "Develop real-time analysis pipeline",
      "Create visualization dashboards for product teams",
      "Integrate with development workflows",
    ],
    expected_outcome: "Enable teams to rapidly address user pain points.",
    complexity: "Medium",
    skills_required: ["Frontend Development", "Backend Development", "NLP/ML", "Product Design"],
    tags: ["UX Research", "SaaS", "Product Analytics", "Sentiment Analysis", "Customer Feedback"],
    prd: {
      executive_summary: "Build a lightweight UX feedback widget for in-context sentiment capture.",
      success_metrics: {
        primary_kpis: [
          { metric: "Response Rate", baseline: "2%", target: ">10%" },
          { metric: "Widget Size", target: "<50KB" },
        ],
      },
      timeline_weeks: 12,
      budget_estimate: "₹3-5 Lakhs for MVP",
    },
  },


  {
    id: "challenge-nag-013",
    challenge_number: 13,
    official_title: "Worker Safety System",
    title: "Raksha: GPS-Denied Safety Tracking",
    domain: "Worker Safety / IoT",
    tech_stack: ["UWB/BLE Mesh", "Wearable Sensors", "LoRaWAN", "Edge Computing"],
    hmw_statement: "How might we enable location tracking and vitals monitoring for workers in GPS-denied confined spaces?",
    challenge_overview: "Mines and boilers have no cellular/GPS. Need UWB/BLE mesh networks to monitor vitals and location for emergency response.",
    company: "Hixaa Technologies Private Limited",
    region: "Nagpur",
    department: "Safety IoT",
    sector: "Industrial Safety",
    status: "Published",
    applicants: 18,
    progress: 0,
    publishedToInnovators: true,
    lastUpdated: "Apr 15, 2026",
    verificationStage: "live",
    summary: "UWB positioning and vital sign mesh network for workers in tunnels and mines.",
    problemLocation: "Mines / Confined Spaces",
    businessImpact: "Emergency response <5 mins; real-time location visibility.",
    desiredOutcome: "1-3m positioning accuracy with man-down detection.",
    student_deliverables: [
      "Design GPS-denied location tracking (UWB)",
      "Develop wearable vits monitoring",
      "Create local mesh/LoRa network",
      "Implement SOS/Panic alert systems",
    ],
    expected_outcome: "Real-time worker safety in connectivity-challenged environments.",
    existing_product: "https://hixaa.com/products/",
    complexity: "Very High",
    skills_required: ["Embedded Systems", "Wireless Protocols", "Wearable Design", "Mobile App Development"],
    tags: ["Worker Safety", "IoT", "UWB", "Confined Space", "Wearables", "Mesh Networking"],
    prd: {
      executive_summary: "Extend Raksha IoT platform with GPS-denied positioning and vitals mesh.",
      success_metrics: {
        primary_kpis: [
          { metric: "Positioning Accuracy", target: "1-3m" },
          { metric: "Response Time", baseline: "40 min", target: "<5 min" },
        ],
      },
      timeline_weeks: 12,
      budget_estimate: "₹10-15 Lakhs for pilot",
    },
  },
];
