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
    <section
      id="product-video-section"
      className="relative w-full bg-white text-[#333333] py-16 sm:py-20 border-b border-gray-100"
    >
      <div className="site-container">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h3 className="text-[26px] sm:text-[32px] lg:text-[36px] font-normal text-[#333333] leading-[1.4]">
            {productName} · Operational Video Showcase
          </h3>
        </div>

        <YouTubeVideoSlider
          productName={productName}
          videos={videos}
          primaryColor={primaryColor}
        />
      </div>
    </section>
  );
}
