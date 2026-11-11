'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Compass, Eye, ShieldCheck, Users, Milestone, ChevronRight } from 'lucide-react';

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

const LEADERSHIP = [
  {
    name: "Deng Taihua",
    role: "Chairman & Chief Executive Officer",
    bio: "Former executive leading global communication and smart hardware engineering divisions, guiding HUTARK's commercial strategy."
  },
  {
    name: "Dr. Peng Zhihui",
    role: "Chief Technology Officer & Co-Founder",
    bio: "Pioneering roboticist and embedded architecture designer, directing actuator innovation and whole-body dynamic control."
  },
  {
    name: "Dr. Lin Chen",
    role: "Chief Scientist — Physical AI",
    bio: "Leading expert in reinforcement learning and Sim2Real foundation models, architect of the GO-3 embodied neural system."
  }
];

export default function AboutPage() {
  return (
    <div className="bg-white text-[#333333] pt-20 min-h-screen">
      {/* =========================================================================
          HERO BANNER (CLEAN LIGHT GRADIENT WITH ROBOTIC ACCENTS)
          ========================================================================= */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="site-container max-w-4xl text-center space-y-5">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-brand-blue border border-blue-100">
            About HUTARK
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Empowering the World with Embodied Intelligence
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            HUTARK is a global pioneer dedicated to researching, manufacturing, and deploying general-purpose humanoid robots and embodied foundation models.
          </p>
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
                At HUTARK, we believe general-purpose humanoid robots will fundamentally reshape productive human society. By integrating mechanical dexterity, robust bipedal locomotion, and real-time vision-to-action neural networks, we build intelligent machines that operate alongside humans.
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

            <div className="lg:col-span-6 relative h-[420px] rounded-3xl overflow-hidden shadow-xl bg-gray-100">
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
            {CORE_VALUES.map((val, idx) => (
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
            {MILESTONES.map((m, idx) => (
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
          LEADERSHIP & BOARD (#Leadership)
          ========================================================================= */}
      <section id="Leadership" className="py-24 bg-white">
        <div className="site-container">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
              Governance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Board & Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {LEADERSHIP.map((lead, idx) => (
              <div
                key={idx}
                className="bg-[#f8f8f8] p-8 rounded-3xl border border-gray-200 space-y-3"
              >
                <h4 className="text-xl font-bold text-gray-900">{lead.name}</h4>
                <p className="text-xs font-semibold text-brand-blue uppercase">{lead.role}</p>
                <p className="text-sm text-gray-600 font-light leading-relaxed pt-2">
                  {lead.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

