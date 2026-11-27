'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ProductData, FeatureVideoSlide } from '../../types';

interface ProductFeatureSliderProps {
  product: ProductData;
}

export default function ProductFeatureSlider({ product }: ProductFeatureSliderProps) {
  const sanitizeImg = (url: string | undefined, fallback: string) => {
    if (!url) return fallback;
    if (url.includes('33d570751012965d2455b2f1c9a6d43d') || url.includes('3b46c5afb682b2c6798d153344ad4cc3')) {
      return fallback;
    }
    return url;
  };

  const getProductSlides = (): FeatureVideoSlide[] => {
    if (product.featureSlides && product.featureSlides.length > 0) {
      return product.featureSlides;
    }

    const fallbackA = product.cinematicImg && !product.cinematicImg.includes('492548ce8722aa332e87aa47ce1019e5')
      ? product.cinematicImg
      : product.heroImg;
    const fallbackB = product.hardwareModules?.[0]?.img || '/uploads/images/20261029/55303dc4864d9d5c35f52263a4dd2e46.jpg';
    const fallbackC = product.applicationScenarios?.[0]?.img || '/uploads/images/20261029/763c5b4b30767904e5cddda22e083597.png';

    const slides: FeatureVideoSlide[] = [
      {
        title: product.cinematicHeading || '24/7 Autonomous Operation · Your Reliable Around-the-Clock Partner',
        video: product.cinematicVideo || '/static/index/en/video/index2/index2_One-v1.mp4',
        image: fallbackA,
        tags: [
          '360° All-Domain Perception',
          '700 TOPS Full-Performance Compute',
          'Three-Tier Heterogeneous Computing Architecture',
          'Autonomous Charging + Long-Lasting Battery Life',
        ],
      },
      {
        title: product.manipulationHeading || 'Versatile Task Execution · A Capable Autonomous Partner',
        video: '/static/index/en/video/index2/index2_One-v2.mp4',
        image: sanitizeImg(product.manipulationImg, fallbackB),
        tags:
          product.manipulationFeatures && product.manipulationFeatures.length > 0
            ? product.manipulationFeatures
            : [
                'Perception-Control Fusion',
                'Sub-Millimeter Dexterous Manipulation',
                'Few-Shot Self-Learning',
                'Impedance Force Compliance',
              ],
      },
      {
        title: product.interactionHeading || 'Comprehensive Safety · A Trusted, Gentle Companion',
        video: '/static/index/en/video/index2/index2_One-v3.mp4',
        image: sanitizeImg(product.interactionImg, fallbackC),
        tags: [
          'Four-Layer Safety Protection',
          'Thousands of Extreme-Condition Tests',
          'Proprietary Carbon Fiber-Reinforced Composite',
        ],
      },
    ];

    if (product.hardwareModules && product.hardwareModules.length > 0) {
      const loopVideos = [
        '/static/index/en/video/index2/index2_One-v1.mp4',
        '/static/index/en/video/index2/index2_One-v2.mp4',
        '/static/index/en/video/index2/index2_One-v3.mp4',
      ];
      product.hardwareModules.slice(0, 3).forEach((mod, i) => {
        slides.push({
          title: mod.title,
          video: loopVideos[i % loopVideos.length],
          image: mod.img,
          tags: [mod.subtitle, `${product.name} Engineering Architecture`],
        });
      });
    }

    return slides;
  };

  const slides = getProductSlides();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [titlePhase, setTitlePhase] = useState<'idle' | 'leaving' | 'entering'>('idle');
  const [displayedTitle, setDisplayedTitle] = useState(slides[0]?.title || '');
  const touchStartX = useRef<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Play active slide video in loop, pause inactive slides (Reference: playActiveVideo)
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === currentIndex) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [currentIndex, slides.length]);

  const goToSlide = (nextIdx: number) => {
    if (nextIdx === currentIndex || nextIdx < 0 || nextIdx >= slides.length) return;
    setTitlePhase('leaving');
    setCurrentIndex(nextIdx);

    setTimeout(() => {
      setDisplayedTitle(slides[nextIdx]?.title || '');
      setTitlePhase('entering');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTitlePhase('idle');
        });
      });
    }, 320);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % slides.length;
    goToSlide(nextIdx);
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
      aria-label={`${product.name} Key Capabilities`}
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

      {/* Centered Peeking Swiper Viewport (Reference: .A3Ultra_swiperBox) */}
      <div
        className="relative w-full overflow-hidden pb-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative flex items-center justify-center">
          <div className="relative w-[86%] sm:w-[74%] lg:w-[62.5%] max-w-[1200px] aspect-video">
            {slides.map((slide, idx) => {
              const offset = idx - currentIndex;
              let normalizedOffset = offset;
              if (offset > slides.length / 2) normalizedOffset -= slides.length;
              if (offset < -slides.length / 2) normalizedOffset += slides.length;

              const isActive = idx === currentIndex;
              const isVisible = Math.abs(normalizedOffset) <= 1;

              return (
                <div
                  key={idx}
                  onClick={() => !isActive && goToSlide(idx)}
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
                  {/* 16:9 Media Frame (Reference: .slide-media) */}
                  <div className="relative w-full h-full rounded-[6px] overflow-hidden bg-[#e8e8e8]">
                    {slide.video ? (
                      <video
                        ref={(el) => {
                          videoRefs.current[idx] = el;
                        }}
                        src={slide.video}
                        poster={slide.image}
                        autoPlay={isActive}
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="block w-full h-full object-cover object-center"
                      />
                    ) : (
                      <Image
                        src={slide.image || product.heroImg}
                        alt={slide.title}
                        fill
                        sizes="(max-width: 768px) 86vw, 1200px"
                        className="object-cover object-center"
                      />
                    )}
                    {/* Reference Bottom Gradient Overlay */}
                    <div
                      className="hidden md:block absolute inset-0 pointer-events-none z-[1]"
                      style={{
                        background:
                          'linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.92) 100%)',
                      }}
                    />

                    {/* Desktop Slide Tags Overlay */}
                    <div className="hidden md:block absolute left-0 right-0 bottom-0 z-[2] p-6">
                      <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3">
                        {slide.tags.map((tag, tIdx) => (
                          <li
                            key={tIdx}
                            className="inline-flex items-center text-white text-[15px] lg:text-[16px] leading-[1.3] font-normal"
                          >
                            <span className="w-5 h-5 rounded-full bg-[#bca874] text-black flex items-center justify-center text-[11px] font-bold mr-2.5 flex-shrink-0">
                              ✓
                            </span>
                            <span>{tag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / Right Minimal Chevron Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Feature"
            className="absolute left-3 sm:left-[6%] lg:left-[13%] top-1/2 -translate-y-1/2 z-30 w-10 h-11 flex items-center justify-center text-[#999999] hover:text-[#333333] transition-colors cursor-pointer"
          >
            <svg className="w-7 h-7 rotate-180 fill-current" viewBox="0 0 1024 1024">
              <path d="M384.284223 63.564711l383.739825 447.696462-383.739825 448.208115h-127.913275l383.739825-448.208115-383.739825-447.696462z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Feature"
            className="absolute right-3 sm:right-[6%] lg:right-[13%] top-1/2 -translate-y-1/2 z-30 w-10 h-11 flex items-center justify-center text-[#333333] hover:text-black transition-colors cursor-pointer"
          >
            <svg className="w-7 h-7 fill-current" viewBox="0 0 1024 1024">
              <path d="M384.284223 63.564711l383.739825 447.696462-383.739825 448.208115h-127.913275l383.739825-448.208115-383.739825-447.696462z" />
            </svg>
          </button>
        </div>

        {/* Mobile Tags Below Media */}
        <div className="md:hidden px-[7%] pt-5">
          <ul className="flex flex-col gap-2.5">
            {slides[currentIndex]?.tags.map((tag, tIdx) => (
              <li
                key={tIdx}
                className="flex items-start text-[#333333] text-[14px] leading-[1.4]"
              >
                <span className="w-4 h-4 rounded-full bg-[#bca874] text-black flex items-center justify-center text-[10px] font-bold mr-2.5 mt-0.5 flex-shrink-0">
                  ✓
                </span>
                <span>{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
