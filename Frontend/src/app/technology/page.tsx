'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Cpu, Layers, GitBranch, Terminal, Shield, Zap, ArrowRight, Download } from 'lucide-react';

const TECH_PILLARS = [
  {
    icon: Cpu,
    title: "Link-U OS",
    subtitle: "Embodied Robot Operating System",
    desc: "A hard real-time, microsecond-deterministic robotics operating system built on a microkernel architecture. Link-U OS coordinates joint actuation, sensor fusion, SLAM navigation, and neural policy execution."
  },
  {
    icon: Zap,
    title: "AHA3 Bio-Inspired Hardware",
    subtitle: "High-Torque Density Modular Actuators",
    desc: "Proprietary Powerflow planetary actuators deliver up to 380 N·m peak torque with integrated absolute optical encoders and high-overload impact compliance."
  },
  {
    icon: Layers,
    title: "GO-3 Foundation Model",
    subtitle: "Multimodal Vision-Language-Action Neural System",
    desc: "Trained on hundreds of thousands of hours of high-fidelity robotic telemetry. GO-3 processes spatial video and high-rate proprioception to synthesize continuous end-effector actions zero-shot."
  },
  {
    icon: GitBranch,
    title: "Digital Twin & Sim2Real",
    subtitle: "Photorealistic Physics Simulation",
    desc: "Isaac Lab and MuJoCo verified simulation models allow developers to train and test manipulation skills in parallel across thousands of synthetic environments before zero-shot hardware deployment."
  }
];

export default function TechnologyPage() {
  return (
    <div className="bg-white text-[#333333] pt-20 min-h-screen">
      {/* =========================================================================
          HERO BANNER
          ========================================================================= */}
      <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-white border-b border-gray-100">
        <div className="site-container max-w-4xl text-center space-y-5">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-brand-blue border border-blue-100">
            Core Technology & OS
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            The Physical AI Architecture
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            HUTARK bridges hardware engineering and artificial intelligence through Link-U OS, modular compliance actuators, and foundation physical neural models.
          </p>
        </div>
      </section>

      {/* =========================================================================
          FOUR PILLARS OF TECHNOLOGY
          ========================================================================= */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {TECH_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#f8f8f8] p-10 sm:p-12 rounded-3xl border border-gray-200/80 hover:border-blue-300 hover:shadow-lg transition-all space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          LINK-U OS SPECIFICATIONS & DEVELOPER TOOLS
          ========================================================================= */}
      <section className="py-24 bg-[#fbfbfb] border-b border-gray-100">
        <div className="site-container max-w-5xl">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
              Open Development Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Link-U OS Developer Stack
            </h2>
            <p className="text-base text-gray-600 font-light max-w-xl mx-auto">
              Open APIs, high-level Python libraries, and low-level EtherCAT communication for robotics engineers and AI researchers.
            </p>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Framework</span>
                <h4 className="text-lg font-bold text-gray-900">ROS 2 & Isaac Sim</h4>
                <p className="text-xs text-gray-600">Native bridge nodes supporting Humble, Iron, and Jazzy distributions.</p>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Latency</span>
                <h4 className="text-lg font-bold text-gray-900">&lt; 1 ms Bus Cycle</h4>
                <p className="text-xs text-gray-600">Deterministic EtherCAT real-time bus synchronizing all 44 joint axes.</p>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Telemetry</span>
                <h4 className="text-lg font-bold text-gray-900">High-Rate Logging</h4>
                <p className="text-xs text-gray-600">MCAP compressed multimodal recording for offline reinforcement learning.</p>
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="bg-gray-900 text-gray-100 p-6 rounded-2xl font-mono text-xs overflow-x-auto space-y-2 border border-gray-800">
              <div className="text-gray-500"># Initializing HUTARK A3 Ultra whole-body controller</div>
              <div><span className="text-blue-400">import</span> hutark_os <span className="text-blue-400">as</span> hos</div>
              <div>robot = hos.connect(<span className="text-green-400">&quot;192.168.1.100&quot;</span>, model=<span className="text-green-400">&quot;A3Ultra&quot;</span>)</div>
              <div>robot.arms.enable_compliance_mode(stiffness=0.35, damping=0.8)</div>
              <div>robot.navigate_to_pose(x=4.2, y=-1.5, yaw=1.57)</div>
              <div className="text-gray-500"># Start foundation vision-to-action policy loop</div>
              <div>robot.policies.load_model(<span className="text-green-400">&quot;GO-3-Standard&quot;</span>).run_continuous()</div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500">
                Documentation and SDK binaries are available for enterprise customers and registered academic partners.
              </span>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 text-xs font-bold bg-brand-blue text-white px-5 py-2.5 rounded-full hover:bg-blue-600 transition-colors shadow-sm"
              >
                <span>Request SDK Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

