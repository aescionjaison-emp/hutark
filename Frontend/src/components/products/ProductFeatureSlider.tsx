'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { ProductData } from '../../types';

interface FeatureSlide {
  title: string;
  category: string;
  desc: string;
  image: string;
  tags: string[];
}

interface ProductFeatureSliderProps {
  product: ProductData;
}

export default function ProductFeatureSlider({ product }: ProductFeatureSliderProps) {
  // Construct dynamic slides tailored to the current product
  const getProductSlides = (): FeatureSlide[] => {
    const slides: FeatureSlide[] = [];

    // Slide 1: 24/7 Autonomous Locomotion & Perception
    slides.push({
      title: "24/7 Autonomous Operation · Your Reliable Around-the-Clock Partner",
      category: "AUTONOMOUS EMBODIED INTELLIGENCE",
      desc: product.cinematicDesc || "Continuous multi-shift autonomous operation featuring self-docking, real-time dynamic SLAM mapping, and zero-fall stabilization across rugged industrial shop floors.",
      image: product.cinematicImg || "/uploads/images/20261029/492548ce8722aa332e87aa47ce1019e5.png",
      tags: [
        "360° All-Domain Sensory Fusion",
        "700 TOPS Heterogeneous Compute",
        "EtherCAT 1000 Hz Real-Time Bus",
        "Autonomous Inductive Recharging"
      ]
    });

    // Slide 2: Dexterous Manipulation
    slides.push({
      title: "Versatile Task Execution · Sub-Millimeter Dexterity",
      category: "HIGH-PRECISION MANIPULATION",
      desc: product.manipulationDesc || "Dual active arms with spherical wrists delivering sub-millimeter trajectory repeatability, optical-tactile micro-force feedback, and zero-damage component handling.",
      image: product.manipulationImg || "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
      tags: product.manipulationFeatures && product.manipulationFeatures.length > 0
        ? product.manipulationFeatures
        : [
            "Perception-Control Hybrid Loop",
            "Multi-DoF Dexterous End-Effectors",
            "Few-Shot Self-Supervised Learning",
            "Force-Impedance Compliance"
          ]
    });

    // Slide 3: Cognitive Multimodal Collaboration
    slides.push({
      title: "Cognitive Multimodal Interaction · Seamless Co-Working",
      category: "NATURAL HUMAN-ROBOT DIALOGUE",
      desc: product.interactionDesc || "Powered by embodied physical foundation models, interpreting operator spoken instructions, pointing gestures, and spatial environmental states zero-shot.",
      image: product.interactionImg || "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg",
      tags: [
        "Spatial Visual-Language-Action Core",
        "6-Mic Circular Beamforming Array",
        "Intuitive Dual LED Status Display",
        "Multi-Operator Priority Arbitration"
      ]
    });

    // Slide 4: Modular Actuation & Powerflow Hardware
    if (product.hardwareModules && product.hardwareModules.length > 0) {
      const mod = product.hardwareModules[0];
      slides.push({
        title: "Bio-Inspired Modular Actuation · Extreme Torque Density",
        category: "POWERFLOW MECHATRONICS",
        desc: mod.desc,
        image: mod.img || "/uploads/images/20261029/8abd115118551853b3212bf47db783a0.jpg",
        tags: [
          "380 N·m Peak Joint Torque",
          "Dual Absolute Optical Encoders",
          "Impact-Resistant Planetary Drives",
          "Instant Thermal Dissipation"
        ]
      });
    }

    // Slide 5: Comprehensive Industrial Safety Architecture
    slides.push({
      title: "Comprehensive Safety · Certified Human Co-Working Companion",
      category: "MULTI-LAYER SAFEGUARDS",
      desc: "SIL-2 compliant multi-sensor safety envelope with hardware emergency braking, 360° ultrasonic proximity rings, and low-inertia compliant bio-composite limbs.",
      image: "/uploads/images/20241230/1968be56db5f4f93c2d514a82df24944.png",
      tags: [
        "Four-Layer Redundant Protection",
        "Thousands of Extreme Drop & Shock Tests",
        "Carbon Fiber Reinforced Nylon Shell",
        "Collision Detection Within 2 Milliseconds"
      ]
    });

    return slides;
  };

  const slides = getProductSlides();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState(slides[0]?.title || '');

  // Handle title transition matching AGIBOT: is-leaving -> update text -> is-entering
  const goToSlide = (newIndex: number) => {
    if (newIndex === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setDisplayedTitle(slides[newIndex]?.title || '');
      setIsAnimating(false);
    }, 280);
  };

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % slides.length;
    goToSlide(nextIdx);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative w-full bg-white text-[#1a1a1a] py-24 overflow-hidden border-b border-gray-200">
      <div className="site-container">
        
        {/* Dynamic Section Title with Leave/Enter Slide Animation (Reference: A3Ultra_sec-tle) */}
        <div className="text-center max-w-4xl mx-auto min-h-[90px] flex flex-col items-center justify-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8f7435] mb-2 block">
            {currentSlide.category}
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

        {/* Carousel Viewport (Reference: A3Ultra_swiperBox) */}
        <div className="relative w-full max-w-6xl mx-auto">
          {/* Main 16:9 Slide Container */}
          <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-900 shadow-2xl border border-gray-200/80 group">
            {/* Background Image / Media */}
            <Image
              src={currentSlide.image}
              alt={currentSlide.title}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Bottom Gradient Overlay (Reference: slide-media::after) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

            {/* Slide Tags Overlay (Reference: slide-overlay & slide-tags) */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-10">
              <p className="text-xs sm:text-sm text-gray-300 font-light max-w-2xl mb-5 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {currentSlide.desc}
              </p>

              <ul className="flex flex-wrap items-center gap-2.5 sm:gap-4">
                {currentSlide.tags.map((tag, idx) => (
                  <li 
                    key={idx}
                    className="inline-flex items-center space-x-2 bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-full border border-white/20 shadow-md"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#bca874] text-black flex items-center justify-center text-[10px] font-black flex-shrink-0">
                      ✓
                    </span>
                    <span>{tag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navigation Controls (Reference: A3Ultra_swiper-prev & next) */}
          <div className="flex items-center justify-between mt-8 px-2">
            {/* Slide Indicators */}
            <div className="flex items-center space-x-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx 
                      ? 'w-8 bg-gray-900' 
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Chevrons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrev}
                type="button"
                className="w-12 h-12 rounded-full bg-white border border-gray-300 hover:border-gray-900 text-gray-800 hover:text-black flex items-center justify-center transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
                aria-label="Previous Feature"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                type="button"
                className="w-12 h-12 rounded-full bg-gray-900 hover:bg-black text-white flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                aria-label="Next Feature"
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
