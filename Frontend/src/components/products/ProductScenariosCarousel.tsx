'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
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
  const getScenarios = (): ScenarioItem[] => {
    if (product.applicationScenarios && product.applicationScenarios.length > 0) {
      return product.applicationScenarios;
    }

    return [
      {
        title: 'Reception & Guided Tours',
        subtitle: 'COMMERCIAL INTERACTION',
        desc: 'Multimodal visitor greeting, intelligent pathway guidance, and interactive exhibition walkthroughs.',
        img: '/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg',
      },
      {
        title: 'Automotive & Electronics Assembly',
        subtitle: 'PRECISION WORKCELLS',
        desc: 'Wire harness routing, precision fastener torquing, and automated optical inspection.',
        img: '/uploads/images/20261029/763c5b4b30767904e5cddda22e083597.png',
      },
      {
        title: 'Patrol & Inspection',
        subtitle: 'INFRASTRUCTURE DEFENSE',
        desc: 'Autonomous 24/7 facility patrol, thermal anomaly detection, and remote gauge telemetry.',
        img: '/uploads/images/20260429/6cc43e41089201e697d1bb7de197b8e8.png',
      },
      {
        title: 'Research & Education',
        subtitle: 'EMBODIED AI LABS',
        desc: 'Open-SDK physical AI experimentation, bilateral teleoperation, and benchmark data collection.',
        img: '/uploads/images/20261106/86677c2f141fe941919f878558713c2d.png',
      },
      {
        title: 'Cleanroom & Biotech Operations',
        subtitle: 'STERILE LOGISTICS',
        desc: 'Wafer cassette manipulation, vibration-damped chemical transfer, and reagent handling.',
        img: '/uploads/images/20251023/d59c5681d6db5d368849ac13334e98e9.png',
      },
    ];
  };

  const scenarios = getScenarios();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [titlePhase, setTitlePhase] = useState<'idle' | 'leaving' | 'entering'>('idle');
  const [displayedTitle, setDisplayedTitle] = useState(scenarios[0]?.title || '');
  const touchStartX = useRef<number | null>(null);

  const goToScenario = (nextIdx: number) => {
    if (nextIdx === currentIndex || nextIdx < 0 || nextIdx >= scenarios.length) return;
    setTitlePhase('leaving');
    setCurrentIndex(nextIdx);

    setTimeout(() => {
      setDisplayedTitle(scenarios[nextIdx]?.title || '');
      setTitlePhase('entering');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTitlePhase('idle');
        });
      });
    }, 320);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + scenarios.length) % scenarios.length;
    goToScenario(prevIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % scenarios.length;
    goToScenario(nextIdx);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  return (
    <section
      className="relative w-full bg-white text-[#333333] overflow-hidden"
      aria-label={`${product.name} Application Scenarios`}
    >
      {/* Centered Section Title (Reference: .A3Ultra_sec-tle) */}
      <div className="px-[4%] pt-20 sm:pt-24 pb-8 sm:pb-10 text-center">
        <h3
          className={`inline-block min-h-[1.2em] text-[clamp(22px,1.875vw,36px)] font-normal text-[#333333] leading-[1.4] transition-all duration-400 ease-out ${
            titlePhase === 'leaving'
              ? 'opacity-0 translate-y-4'
              : titlePhase === 'entering'
              ? 'opacity-0 -translate-y-4'
              : 'opacity-100 translate-y-0'
          }`}
        >
          {displayedTitle}
        </h3>
      </div>

      {/* Centered Peeking Swiper Viewport (Reference: .A3Ultra_Four) */}
      <div
        className="relative w-full overflow-hidden pb-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative flex items-center justify-center">
          <div className="relative w-[86%] sm:w-[74%] lg:w-[62.5%] max-w-[1200px] aspect-video">
            {scenarios.map((scen, idx) => {
              const offset = idx - currentIndex;
              let normalizedOffset = offset;
              if (offset > scenarios.length / 2) normalizedOffset -= scenarios.length;
              if (offset < -scenarios.length / 2) normalizedOffset += scenarios.length;

              const isActive = idx === currentIndex;
              const isVisible = Math.abs(normalizedOffset) <= 1;

              return (
                <div
                  key={idx}
                  onClick={() => !isActive && goToScenario(idx)}
                  className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? 'z-20 opacity-100 scale-100 cursor-default'
                      : isVisible
                      ? 'z-10 opacity-35 scale-[0.8] cursor-pointer hover:opacity-50'
                      : 'z-0 opacity-0 scale-[0.7] pointer-events-none'
                  }`}
                  style={{
                    transform: `translateX(${normalizedOffset * 102}%) scale(${isActive ? 1 : 0.8})`,
                  }}
                >
                  <div className="relative w-full h-full rounded-[6px] overflow-hidden bg-[#e8e8e8]">
                    <Image
                      src={scen.img}
                      alt={scen.title}
                      fill
                      sizes="(max-width: 768px) 86vw, 1200px"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / Right Minimal Chevron Arrows (Reference: .A3Ultra_Four .A3Ultra_swiper-prev / next) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Scenario"
            className="absolute left-3 sm:left-[6%] lg:left-[13%] top-1/2 -translate-y-1/2 z-30 w-10 h-11 flex items-center justify-center text-[#999999] hover:text-[#333333] transition-colors cursor-pointer"
          >
            <svg className="w-7 h-7 rotate-180 fill-current" viewBox="0 0 1024 1024">
              <path d="M384.284223 63.564711l383.739825 447.696462-383.739825 448.208115h-127.913275l383.739825-448.208115-383.739825-447.696462z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Scenario"
            className="absolute right-3 sm:right-[6%] lg:right-[13%] top-1/2 -translate-y-1/2 z-30 w-10 h-11 flex items-center justify-center text-[#333333] hover:text-black transition-colors cursor-pointer"
          >
            <svg className="w-7 h-7 fill-current" viewBox="0 0 1024 1024">
              <path d="M384.284223 63.564711l383.739825 447.696462-383.739825 448.208115h-127.913275l383.739825-448.208115-383.739825-447.696462z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
