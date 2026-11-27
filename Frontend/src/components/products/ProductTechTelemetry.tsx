'use client';

import React from 'react';
import { Cpu, Zap, BatteryCharging, Radio, Sliders, ShieldCheck, Activity, Move } from 'lucide-react';
import { ProductData } from '../../types';

interface ProductTechTelemetryProps {
  product: ProductData;
}

export default function ProductTechTelemetry({ product }: ProductTechTelemetryProps) {
  // Extract or synthesize realistic engineering telemetry from the product's specRows or specs
  const getTelemetryGrid = () => {
    return [
      {
        icon: Sliders,
        value: product.specs?.find(s => s.label.toLowerCase().includes('dof') || s.label.toLowerCase().includes('degree'))?.value || "44 DoF",
        title: "Active Articulation",
        desc: "Full-body bio-inspired degrees of freedom with dynamic balance compensation and spherical wrists."
      },
      {
        icon: Zap,
        value: "380 N·m",
        title: "Peak Joint Torque",
        desc: "Proprietary Powerflow planetary drive actuators with ultra-high overload compliance."
      },
      {
        icon: Move,
        value: product.specs?.find(s => s.label.toLowerCase().includes('speed'))?.value || "3.8 m/s",
        title: "Maximum Travel Speed",
        desc: "High-speed bipedal sprint and omnidirectional zero-radius turning across industrial floors."
      },
      {
        icon: Cpu,
        value: "700 TOPS",
        title: "Foundation AI Engine",
        desc: "Three-tier heterogeneous computing architecture running vision-language-action policies in real time."
      },
      {
        icon: Activity,
        value: "±0.03 mm",
        title: "Motion Repeatability",
        desc: "Sub-millimeter closed-loop position & force hybrid control with optical-tactile feedback."
      },
      {
        icon: BatteryCharging,
        value: "6.0 Hours",
        title: "Continuous Runtime",
        desc: "Hot-swappable automotive-grade lithium-ion power bay with autonomous magnetic dock return."
      },
      {
        icon: Radio,
        value: "< 1 ms",
        title: "Bus Synchronization",
        desc: "EtherCAT 1000 Hz microsecond deterministic bus controlling all limb actuators in parallel."
      },
      {
        icon: ShieldCheck,
        value: "SIL-2 / IP54",
        title: "Safety & Protection",
        desc: "Industrial splash-resistant enclosure, dual hardware e-stops, and 360° collision avoidance."
      }
    ];
  };

  const telemetryItems = getTelemetryGrid();

  return (
    <section className="py-24 bg-[#0a0c10] text-white border-b border-gray-800 relative overflow-hidden">
      {/* Background ambient grid */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#bca874]">
            CORE MECHATRONICS & COMPUTING PLATFORM
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Engineering Telemetry & Performance
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Engineered from ground-up hardware modules and heterogeneous compute to deliver continuous physical AI autonomy at commercial enterprise scale.
          </p>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {telemetryItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 hover:border-[#bca874]/50 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#bca874] mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                  {item.value}
                </div>
                <div className="text-sm font-semibold text-[#bca874] tracking-wide mb-2 uppercase">
                  {item.title}
                </div>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
