'use client';

import React from 'react';
import YouTubeVideoSlider from './YouTubeVideoSlider';
import { YouTubeVideoSlide } from '../../types';

interface ProductVideoExperienceProps {
  productName: string;
  videos?: YouTubeVideoSlide[];
  primaryColor?: string;
}

export default function ProductVideoExperience({
  productName,
  videos,
  primaryColor = '#0062c5',
}: ProductVideoExperienceProps) {
  return (
    <section id="product-video-section" className="relative w-full bg-[#0a0c10] text-white py-20 border-b border-gray-800">
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#bca874]">
            FIELD DEMONSTRATION & TELEMETRY
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Operational Video Experience
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
            High-definition multicam footage capturing {productName} operating autonomously across industrial workcells, testing grounds, and human-collaborative environments.
          </p>
        </div>

        {/* Video Slider Component */}
        <YouTubeVideoSlider
          productName={productName}
          videos={videos}
          primaryColor={primaryColor}
        />
      </div>
    </section>
  );
}
