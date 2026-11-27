'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Layers, ArrowUpRight } from 'lucide-react';
import { ProductData } from '../../types';

interface ScenarioItem {
  title: string;
  subtitle: string;
  desc: string;
  img: string;
}

interface ProductScenariosCarouselProps {
  product: ProductData;
}

export default function ProductScenariosCarousel({ product }: ProductScenariosCarouselProps) {
  // Construct dynamic scenario items
  const getScenarios = (): ScenarioItem[] => {
    if (product.applicationScenarios && product.applicationScenarios.length > 0) {
      return product.applicationScenarios;
    }

    return [
      {
        title: "Automotive & Electronics Assembly",
        subtitle: "PRECISION WORKCELL INTEGRATION",
        desc: "Wire harness routing, precision fastener torquing, in-line automated optical inspection, and fragile component sorting.",
        img: "/uploads/images/20261029/763c5b4b30767904e5cddda22e083597.png"
      },
      {
        title: "Hazardous Inspection & Infrastructure Patrol",
        subtitle: "UNATTENDED PERIMETER DEFENSE",
        desc: "Autonomous 24/7 facility patrol, infrared thermal anomaly detection, pressure gauge telemetry, and gravel yard navigation.",
        img: "/uploads/images/20260429/6cc43e41089201e697d1bb7de197b8e8.png"
      },
      {
        title: "Cleanroom Semiconductor & Biotech Logistics",
        subtitle: "CLASS-100 STERILE HANDLING",
        desc: "Semiconductor cassette manipulation, vibration-damped chemical transfer, reagent mixing, and micro-payload logistics.",
        img: "/uploads/images/20251023/d59c5681d6db5d368849ac13334e98e9.png"
      },
      {
        title: "Academic Research & Digital Twin Teleoperation",
        subtitle: "HUMAN-IN-THE-LOOP COCKPIT",
        desc: "Real-time bilateral force-feedback teleoperation for hazardous intervention and offline demonstration data collection.",
        img: "/uploads/images/20261106/86677c2f141fe941919f878558713c2d.png"
      },
      {
        title: "Reception, Hospitality & Guided Customer Tours",
        subtitle: "NATURAL COGNITIVE INTERACTION",
        desc: "Multimodal visitor greeting, intelligent pathway guidance, voice-driven facility exploration, and interactive brand kiosks.",
        img: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg"
      }
    ];
  };

  const scenarios = getScenarios();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState(scenarios[0]?.title || '');

  const goToScenario = (idx: number) => {
    if (idx === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setDisplayedTitle(scenarios[idx]?.title || '');
      setIsAnimating(false);
    }, 280);
  };

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + scenarios.length) % scenarios.length;
    goToScenario(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % scenarios.length;
    goToScenario(nextIdx);
  };

  const currentScenario = scenarios[currentIndex];

  return (
    <section className="py-24 bg-[#f8f9fa] text-[#1a1a1a] border-b border-gray-200 overflow-hidden">
      <div className="site-container">
        
        {/* Dynamic Section Title matching A3Ultra_Four-sec-tle */}
        <div className="text-center max-w-4xl mx-auto min-h-[90px] flex flex-col items-center justify-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8f7435] mb-2 block">
            INDUSTRIAL APPLICATION SCENARIOS
          </span>
          <h3 
            className={`text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 transition-all duration-300 ease-out ${
              isAnimating 
                ? 'opacity-0 translate-y-3' 
                : 'opacity-100 translate-y-0'
            }`}
          >
            {displayedTitle}
          </h3>
        </div>

        {/* Cinematic Media Carousel Viewport */}
        <div className="relative w-full max-w-6xl mx-auto">
          {/* Main 16:9 Showcase Slide */}
          <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-900 shadow-2xl border border-gray-200 group">
            <Image
              src={currentScenario.img}
              alt={currentScenario.title}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

            {/* Scenario Editorial Detail Box */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#bca874] block mb-2">
                {currentScenario.subtitle}
              </span>
              <h4 className="text-xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                {currentScenario.title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 font-light max-w-2xl leading-relaxed">
                {currentScenario.desc}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 px-2">
            {/* Scenario Tab Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {scenarios.map((scen, idx) => (
                <button
                  key={idx}
                  onClick={() => goToScenario(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-gray-200 border border-gray-300/80'
                  }`}
                >
                  {scen.title.split(' ')[0]} {scen.title.split(' ')[1] || ''}
                </button>
              ))}
            </div>

            {/* Previous / Next Arrows */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrev}
                type="button"
                className="w-12 h-12 rounded-full bg-white border border-gray-300 hover:border-gray-900 text-gray-800 hover:text-black flex items-center justify-center transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
                aria-label="Previous Scenario"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                type="button"
                className="w-12 h-12 rounded-full bg-gray-900 hover:bg-black text-white flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                aria-label="Next Scenario"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
