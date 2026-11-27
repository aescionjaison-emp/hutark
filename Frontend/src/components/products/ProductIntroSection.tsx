'use client';

import React from 'react';
import Image from 'next/image';
import { ProductData } from '../../types';

interface ProductIntroSectionProps {
  product: ProductData;
}

export default function ProductIntroSection({ product }: ProductIntroSectionProps) {
  // Use product dynamic cinematic assets with authentic fallbacks
  const bgImg = product.cinematicImg || "/uploads/images/20261029/492548ce8722aa332e87aa47ce1019e5.png";
  const heading = product.cinematicHeading || `${product.name} Embodied Intelligence`;
  const subheading = product.cinematicSubheading || "PHYSICAL AI BREAKTHROUGH";
  const desc = product.cinematicDesc || product.overview || "Equipped with end-to-end foundation physical AI policy networks, navigating dynamic industrial shop floors, unmapped warehouses, and human co-working spaces with continuous multi-sensor real-time coordination.";
  
  const metrics = product.cinematicMetrics && product.cinematicMetrics.length > 0
    ? product.cinematicMetrics
    : [
        { value: "1000 Hz", label: "Real-Time Bus Sync" },
        { value: "380 N·m", label: "Peak Joint Torque" },
        { value: "< 1 ms", label: "Control Latency" }
      ];

  return (
    <section className="relative w-full min-h-[75vh] lg:min-h-[85vh] bg-[#050608] text-white flex items-center justify-center overflow-hidden">
      {/* Background Cinematic Visual with Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImg}
          alt={heading}
          fill
          sizes="100vw"
          className="object-cover object-center opacity-70 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Top and Bottom Gradients for Seamless Blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/90" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#050608]/50 to-[#050608]" />
      </div>

      {/* Content Container (Reference: A3Ultra_Two-con) */}
      <div className="site-container relative z-10 w-full py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Subtitle / Category Kicker */}
          <div className="inline-block">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.35em] text-[#bca874] border-b border-[#bca874]/30 pb-1.5">
              {subheading}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.1]">
            {heading}
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            {desc}
          </p>

          {/* Key Engineering Metrics Chips */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {metrics.map((met, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all hover:bg-white/10"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {met.value}
                </div>
                <div className="text-xs text-gray-400 font-medium tracking-wider uppercase mt-1">
                  {met.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
