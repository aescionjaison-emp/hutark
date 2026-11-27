'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, ArrowRight, X, ChevronRight, Download, Sliders, Shield, Cpu, Zap, Activity } from 'lucide-react';
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

  // Esc key listener for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVideoModalOpen(false);
    };
    if (isVideoModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVideoModalOpen]);

  // Video source: check product youtubeVideos or fallback
  const firstVideo = product.youtubeVideos?.[0];
  const videoId = firstVideo?.id || 'M3_Jb_5zT9I';
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

  // Determine key telemetry chips based on product specifications
  const getHeroTelemetry = () => {
    if (product.specs && product.specs.length > 0) {
      return product.specs.slice(0, 4);
    }
    return [
      { label: 'Degrees of Freedom', value: '44 DoF' },
      { label: 'Peak Joint Torque', value: '380 N·m' },
      { label: 'Dynamic Locomotion', value: '3.8 m/s' },
      { label: 'AI Compute Core', value: '700 TOPS' },
    ];
  };

  const telemetryList = getHeroTelemetry();

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden bg-[#f0f2f5] text-[#1a1a1a] pt-24 pb-16 border-b border-gray-200">
      {/* Ambient background studio lighting & subtle radial highlights */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-40 right-1/4 w-[750px] h-[750px] bg-gradient-to-br from-white/90 via-blue-50/40 to-transparent rounded-full blur-3xl opacity-75" />
        <div className="absolute bottom-0 left-10 w-[550px] h-[550px] bg-gradient-to-tr from-amber-50/30 via-gray-100/40 to-transparent rounded-full blur-3xl opacity-60" />
        {/* Subtle engineering grid line */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="site-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Editorial Typography & Actions (Reference: A3Ultra_One-con) */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-6 sm:space-y-8 text-left z-20">
            {/* Series / Category Kicker */}
            <div className="inline-flex items-center space-x-3">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.28em] uppercase text-gray-500 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200/80 shadow-xs">
                {product.series || 'HUTARK EMBODIED ROBOTICS'}
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-700 tracking-wider uppercase">Production Active</span>
            </div>

            {/* Oversized Metallic Gradient Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl 2xl:text-[5.2rem] font-bold tracking-tight leading-[1.02] text-gray-950">
                <span className="bg-gradient-to-b from-[#8f7435] via-[#bca874] to-[#786127] bg-clip-text text-transparent block">
                  {product.name}
                </span>
              </h1>

              {/* Subheading Hierarchy (Reference: strong + span) */}
              <div className="space-y-1.5 pt-1">
                <p className="text-xl sm:text-2xl font-normal text-gray-900 tracking-tight">
                  {product.tagline || 'Full-Size General-Purpose Humanoid Robot'}
                </p>
                <p className="text-sm sm:text-base text-gray-500 font-light max-w-xl leading-relaxed">
                  {product.heroSubtitle || product.overview || 'Your 24/7 Productivity Partner engineered for high-precision autonomous industrial deployment.'}
                </p>
              </div>
            </div>

            {/* Action Buttons (Reference: A3Ultra_One-actions) */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Watch Video Button */}
              <button
                onClick={handleVideoTrigger}
                type="button"
                className="group inline-flex items-center space-x-3 bg-gray-900 hover:bg-black text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Click to Watch Video</span>
                <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-black flex items-center justify-center transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
              </button>

              {/* Specifications / User Manual Button */}
              <button
                onClick={onSpecsClick}
                type="button"
                className="inline-flex items-center space-x-2 text-gray-800 hover:text-black bg-white/80 hover:bg-white border border-gray-300/80 hover:border-gray-400 px-6 py-3.5 rounded-full text-sm font-semibold transition-all shadow-xs hover:shadow-md cursor-pointer"
              >
                <span>Product Specifications</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Telemetry Metric Badges */}
            <div className="pt-4 border-t border-gray-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
              {telemetryList.map((tel, idx) => (
                <div key={idx} className="bg-white/60 backdrop-blur-xs p-3 rounded-xl border border-gray-200/60">
                  <span className="block text-lg sm:text-xl font-bold tracking-tight text-gray-900">
                    {tel.value}
                  </span>
                  <span className="block text-[11px] text-gray-500 font-medium tracking-wide truncate">
                    {tel.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Full-Scale High-Resolution Robot Imagery */}
          <div className="lg:col-span-5 xl:col-span-6 relative flex items-center justify-center min-h-[420px] sm:min-h-[520px] lg:min-h-[640px]">
            {product.heroImg ? (
              <div className="relative w-full h-[450px] sm:h-[580px] lg:h-[700px] transition-transform duration-700 ease-out hover:scale-[1.02]">
                <Image
                  src={product.heroImg}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-center drop-shadow-2xl"
                />
              </div>
            ) : (
              <div className="w-72 h-96 bg-gray-200 rounded-3xl flex items-center justify-center text-gray-400">
                <span>Robot Imagery</span>
              </div>
            )}

            {/* Ground shadow plane */}
            <div className="absolute -bottom-6 w-3/4 h-8 bg-black/15 blur-xl rounded-full pointer-events-none" />
          </div>

        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE FULLSCREEN VIDEO MODAL (Reference: #hi-video-pop)
          ========================================================================= */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer group"
              title="Close Video"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            </button>

            {/* Video Player */}
            {videoEmbedUrl ? (
              <iframe
                src={videoEmbedUrl}
                title={`${product.name} Video Showcase`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white p-8">
                <Play className="w-16 h-16 text-cyan-400 mb-4 opacity-75" />
                <h4 className="text-xl font-bold mb-2">{product.name} Official Product Showcase</h4>
                <p className="text-sm text-gray-400 max-w-md text-center">
                  Official high-definition footage demonstrating autonomous locomotion, dexterous manipulation, and real-time vision-language coordination.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
