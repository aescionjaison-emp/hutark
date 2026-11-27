'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, ChevronRight, X } from 'lucide-react';
import { ProductData } from '../../types';

interface ProductCinematicHeroProps {
  product: ProductData;
  onWatchVideoClick?: () => void;
  onSpecsClick?: () => void;
}

export default function ProductCinematicHero({
  product,
  onWatchVideoClick,
  onSpecsClick,
}: ProductCinematicHeroProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVideoModalOpen(false);
    };
    if (isVideoModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVideoModalOpen]);

  const customHeroVideo = product.heroVideo;
  const isDirectVideo =
    !!customHeroVideo &&
    (customHeroVideo.endsWith('.mp4') ||
      customHeroVideo.endsWith('.webm') ||
      customHeroVideo.endsWith('.mov') ||
      customHeroVideo.includes('/uploads/') ||
      customHeroVideo.startsWith('/static/') ||
      customHeroVideo.startsWith('data:video'));

  const firstVideo = product.youtubeVideos?.[0];
  const videoId = customHeroVideo && !isDirectVideo ? customHeroVideo : firstVideo?.id || 'M3_Jb_5zT9I';
  const cleanId = videoId.includes('v=')
    ? videoId.split('v=')[1]?.split('&')[0]
    : videoId.includes('youtu.be/')
    ? videoId.split('youtu.be/')[1]?.split('?')[0]
    : videoId;
  const videoEmbedUrl = `https://www.youtube-nocookie.com/embed/${cleanId}?autoplay=1&rel=0`;

  const handleVideoTrigger = () => {
    if (onWatchVideoClick) {
      onWatchVideoClick();
    } else {
      setIsVideoModalOpen(true);
    }
  };

  return (
    <section
      className="relative w-full min-h-[650px] md:h-[100svh] overflow-hidden bg-[#f0f0f0] text-[#1a1a1a] flex flex-col md:block pt-24 md:pt-0"
      aria-label={`${product.name} Hero`}
    >
      {/* Reference-Matched Warm Studio Architectural Backdrop (#f0f0f0) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 80% at 28% 58%, #ffffff 0%, #f4f2ed 48%, #eae7df 100%)',
        }}
      />
      {/* Subtle architectural floor horizon curve matching reference */}
      <div
        className="absolute inset-x-0 bottom-0 h-[34%] z-0 pointer-events-none opacity-65"
        style={{
          background:
            'linear-gradient(180deg, rgba(240,238,233,0) 0%, rgba(226,220,208,0.55) 60%, rgba(235,233,228,0.9) 100%)',
        }}
      />

      {/* Right-Aligned Editorial Typography Block (Reference: .A3Ultra_One-con) */}
      <div className="relative md:absolute z-[2] w-full md:w-[46%] left-0 md:left-1/2 md:top-[43%] md:-translate-y-1/2 px-[8%] md:px-0 md:pr-12 text-left order-1">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-semibold leading-none tracking-tight text-[clamp(33px,3.333vw,64px)]"
          style={{
            background: 'linear-gradient(360deg, rgb(179, 154, 99) 0%, rgb(219, 206, 172) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {product.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-[clamp(8px,0.52vw,10px)] leading-none"
        >
          <strong className="block font-normal text-[#1a1a1a] text-[clamp(24px,2.604vw,50px)] leading-[1.12]">
            {product.tagline || product.series || 'Full-Size Humanoid Robot'}
          </strong>
          <span className="block font-light text-black text-[clamp(16px,1.5625vw,30px)] mt-[clamp(12px,1.04vw,20px)] leading-[1.2]">
            {product.heroSubtitle || 'Your 24/7 Productivity Partner'}
          </span>
        </motion.div>

        {/* Minimal Action Links (Reference: .A3Ultra_One-actions) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-[clamp(24px,2.6vw,50px)] flex flex-wrap items-center gap-[clamp(24px,4.16vw,80px)]"
        >
          <button
            type="button"
            onClick={handleVideoTrigger}
            className="inline-flex items-center text-[clamp(14px,0.9375vw,18px)] leading-[1.4] font-normal text-[#333333] hover:opacity-75 transition-opacity cursor-pointer"
          >
            <span>Click to Watch Video</span>
            <span className="ml-2.5 w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] rounded-full border border-[#333333] flex items-center justify-center">
              <Play className="w-2.5 h-2.5 fill-[#333333] text-[#333333] ml-0.5" />
            </span>
          </button>

          <button
            type="button"
            onClick={onSpecsClick}
            className="inline-flex items-center text-[clamp(14px,0.9375vw,18px)] leading-[1.4] font-normal text-[#333333] hover:opacity-75 transition-opacity cursor-pointer"
          >
            <span>Product Specifications</span>
            <ChevronRight className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-black ml-1" />
          </button>
        </motion.div>
      </div>

      {/* Left Robot Visual (Single Clean Product Cutout — Reference: left-half hero subject) */}
      {(product.heroImg || product.heroBannerBg) && (
        <div className="relative md:absolute md:inset-y-0 md:left-0 w-full md:w-[50%] z-[1] flex items-end md:items-center justify-center pointer-events-none mt-6 md:mt-0 md:pt-16 order-2">
          <div className="relative w-[84%] md:w-[80%] h-[46vh] md:h-[78vh] max-h-[820px]">
            <Image
              src={product.heroImg || product.heroBannerBg || ''}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 84vw, 48vw"
              className="object-contain object-bottom md:object-center drop-shadow-[0_24px_38px_rgba(0,0,0,0.16)]"
            />
          </div>
        </div>
      )}

      {/* Fullscreen Video Modal (Reference: #hi-video-pop) */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-black aspect-video overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Video"
            >
              <X className="w-5 h-5" />
            </button>
            {isDirectVideo && customHeroVideo ? (
              <video
                src={customHeroVideo}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <iframe
                src={videoEmbedUrl}
                title={`${product.name} Showcase Video`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
