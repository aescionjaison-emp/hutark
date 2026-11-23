'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, ExternalLink, Video } from 'lucide-react';
import { YouTubeVideoSlide } from '../../types';

interface YouTubeVideoSliderProps {
  productName: string;
  videos?: YouTubeVideoSlide[];
  primaryColor?: string;
}

// Helper to extract standard 11-char YouTube ID from any URL format
function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return 'M3_Jb_5zT9I';
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : 'M3_Jb_5zT9I';
}

export default function YouTubeVideoSlider({
  productName,
  videos,
  primaryColor = '#0062c5',
}: YouTubeVideoSliderProps) {
  // Default authentic robotics demonstration video slides if none provided
  const fallbackVideos: YouTubeVideoSlide[] = [
    {
      id: '7zI3u19q_e0',
      title: `${productName} Field Locomotion & Dynamic Balance`,
      subtitle: 'AUTONOMOUS NAVIGATION TRIAL',
      description: `Watch ${productName} traverse outdoor sloped terrain, navigate unmapped industrial catwalks, and demonstrate continuous zero-fall stabilization under external disturbances.`,
      categoryTag: 'Locomotion Benchmark',
    },
    {
      id: 'M3_Jb_5zT9I',
      title: 'Sub-Millimeter Dual-Arm Fastener & Wiring Assembly',
      subtitle: 'HIGH-PRECISION WORKSTATION',
      description: `Real-time physical demonstration of dual 7-DoF force-controlled arms performing high-speed fastener torquing, wire harness routing, and electronic chip inspection.`,
      categoryTag: 'Dexterous Manipulation',
    },
    {
      id: 'fn3KWM1kuAw',
      title: 'Full-Shift Endurance & Rapid Autonomous Docking',
      subtitle: '24/7 UNATTENDED OPERATION',
      description: `Continuous operational deployment showcase illustrating autonomous pathfinding, obstacle avoidance, automatic battery dock return, and cloud fleet synchronization.`,
      categoryTag: 'Industrial Deployment',
    },
  ];

  const videoList = videos && videos.length > 0 ? videos : fallbackVideos;
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentVideo = videoList[currentIndex] || videoList[0];
  const videoId = extractYouTubeId(currentVideo.id);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? videoList.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === videoList.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="videos-section" className="py-24 bg-[#0a0c10] text-white overflow-hidden relative border-t border-b border-gray-800">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="site-container relative z-10">
        {/* Section Header matching AGIBOT design tone */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400 bg-cyan-950/60 px-4 py-1.5 rounded-full border border-cyan-800/50 backdrop-blur-md">
            <Video className="w-3.5 h-3.5" />
            <span>FIELD DEMONSTRATIONS & VIDEO SLIDES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Watch {productName} in Action
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light max-w-2xl mx-auto">
            Explore authentic multi-scenario performance testing, dynamic stability demonstrations, and high-precision physical manipulation video slides.
          </p>
        </div>

        {/* Video Slider Showcase Container */}
        <div className="max-w-6xl mx-auto bg-[#12151e]/90 rounded-3xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left 8 Cols: Video Embed / Player Area */}
            <div className="lg:col-span-8 bg-black relative flex items-center justify-center min-h-[320px] sm:min-h-[440px] lg:min-h-[500px]">
              {currentVideo.id?.endsWith('.mp4') || currentVideo.id?.endsWith('.webm') || currentVideo.id?.startsWith('data:video') || currentVideo.id?.includes('/uploads/') ? (
                <video
                  key={currentVideo.id}
                  src={currentVideo.id}
                  controls
                  className="w-full h-full min-h-[320px] sm:min-h-[440px] lg:min-h-[500px] object-contain bg-black"
                />
              ) : (
                <iframe
                  key={videoId}
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&controls=1`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full min-h-[320px] sm:min-h-[440px] lg:min-h-[500px] border-0"
                />
              )}
            </div>

            {/* Right 4 Cols: Video Information & Slide Navigation */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-gradient-to-b from-[#141722] to-[#0e1017]">
              <div className="space-y-4">
                {/* Slide Counter & Category Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30">
                    SLIDE {String(currentIndex + 1).padStart(2, '0')} / {String(videoList.length).padStart(2, '0')}
                  </span>
                  {currentVideo.categoryTag && (
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                      {currentVideo.categoryTag}
                    </span>
                  )}
                </div>

                {currentVideo.subtitle && (
                  <span className="block text-xs font-bold uppercase tracking-wider text-blue-400">
                    {currentVideo.subtitle}
                  </span>
                )}

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {currentVideo.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  {currentVideo.description}
                </p>

                <div className="pt-2">
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Open in YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  {videoList.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 transition-all rounded-full ${
                        idx === currentIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-white/30 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={prevSlide}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/15 text-white transition-all border border-white/10 active:scale-95 cursor-pointer"
                    aria-label="Previous Video Slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/15 text-white transition-all border border-white/10 active:scale-95 cursor-pointer"
                    aria-label="Next Video Slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Thumbnails Strip */}
          <div className="border-t border-white/10 p-4 bg-[#0d0f15] flex items-center space-x-4 overflow-x-auto no-scrollbar">
            {videoList.map((vid, idx) => {
              const thumbId = extractYouTubeId(vid.id);
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex-shrink-0 flex items-center space-x-3 p-2 rounded-xl transition-all text-left border ${
                    isActive
                      ? 'bg-blue-950/70 border-cyan-400 shadow-md ring-1 ring-cyan-400/40'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="relative w-20 h-12 bg-black rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <img
                      src={`https://img.youtube.com/vi/${thumbId}/hqdefault.jpg`}
                      alt={vid.title}
                      className="w-full h-full object-cover opacity-80"
                      onError={(e) => {
                        // Fallback image if youtube thumbnail fails
                        (e.target as any).src = '/images/hutark-mark.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                  <div className="max-w-[200px]">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase block">Slide {idx + 1}</span>
                    <span className="text-xs font-semibold text-white line-clamp-1 block">{vid.title}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
