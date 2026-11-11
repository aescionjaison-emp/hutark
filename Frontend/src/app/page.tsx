'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HERO_SLIDES = [
  {
    title: "HUTARK Tops Both the Gold Medal and Overall Medal Standings",
    titleFormatted: "HUTARK Tops Both the Gold Medal <br /> and Overall Medal Standings",
    img: "/uploads/images/20261103/710faba11315ce158d297edc209d14bf.png",
    link: "/news"
  },
  {
    title: "The 20,000th General-purpose Embodied Robot Rolled off the Production Line",
    titleFormatted: "The 20,000th General-purpose Embodied <br /> Robot Rolled off the Production Line",
    img: "/uploads/images/20261029/492548ce8722aa332e87aa47ce1019e5.png",
    link: "/products/A3Ultra"
  },
  {
    title: "2026 HUTARK Innovation Day: Witness Embodied AI Latest Advances",
    titleFormatted: "2026 HUTARK Innovation Day <br /> Witness Embodied AI Latest Advances",
    img: "/uploads/images/20261103/015bf1f9da95cc783f5e1e7363b3882c.png",
    link: "/news/apc-2026"
  },
  {
    title: "APC 2026: Keynote Speech by Deng Taihua",
    titleFormatted: "APC 2026 <br /> Keynote Speech by Deng Taihua",
    img: "/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg",
    link: "/about"
  }
];

const INTELLIGENCES = [
  {
    title: "Locomotion Intelligence",
    subtitle: "Robust Dynamic Locomotion & Terrain Adaptation",
    desc: "Robust bipedal balance, high-speed agile gait generation, and zero-shot terrain adaptation over stairs, gravel, ice, and steep inclines.",
    video: "/static/index/en/video/index2/index2_One-v1.mp4",
    poster: "/static/index/en/video/index2/index2_One-v1-img.jpg"
  },
  {
    title: "Interactive Intelligence",
    subtitle: "Multimodal Intent & Conversational Reasoning",
    desc: "Multimodal audio-visual perception, spatial intention recognition, expressive non-verbal gestures, and emotional conversational reasoning.",
    video: "/static/index/en/video/index2/index2_One-v2.mp4",
    poster: "/static/index/en/video/index2/index2_One-v2-img.jpg"
  },
  {
    title: "Manipulation Intelligence",
    subtitle: "Sub-Millimeter Dexterity & Tactile Feedback",
    desc: "Sub-millimeter dexterous dual-arm coordination, force-feedback tactile sensing, and generalist foundation vision-to-action manipulation policies.",
    video: "/static/index/en/video/index2/index2_One-v3.mp4",
    poster: "/static/index/en/video/index2/index2_One-v3-img.jpg"
  }
];

const PRODUCTS_GRID = [
  {
    name: "HUTARK A3 Ultra",
    img: "/uploads/images/20261029/a45cd3ea1909796be5cca32223c71fac.jpg",
    link: "/products/A3Ultra"
  },
  {
    name: "HUTARK X2",
    img: "/uploads/images/20261029/82066bacdbeb17a0674ca29cd13d5b12.jpg",
    link: "/products/X2"
  },
  {
    name: "HUTARK G2",
    img: "/uploads/images/20261029/55303dc4864d9d5c35f52263a4dd2e46.jpg",
    link: "/products/G2"
  },
  {
    name: "HUTARK D1 Max",
    img: "/uploads/images/20261029/62974a39fa9e903d8e47b2cd2befc16e.png",
    link: "/products/D1_Max"
  },
  {
    name: "AGILINK",
    img: "/uploads/images/20261029/208c523904a5188395bf9b50f0c94334.jpg",
    link: "https://www.agilink-ai.com/"
  },
  {
    name: "HUTARK C5",
    img: "/uploads/images/20261029/8abd115118551853b3212bf47db783a0.jpg",
    link: "/products/C5"
  }
];

const NEWS_FEATURED = {
  title: "Six HUTARK G2 Robots Complete 1,730 Tasks in 24-Hour Shanghai Convenience Store Trial",
  date: "2026-11-06",
  img: "/uploads/images/20261106/86677c2f141fe941919f878558713c2d.png",
  link: "/news/apc-2026"
};

const NEWS_LIST = [
  {
    title: "HUTARK Unveils GO-3 Preview, Takes Top Spot on Three Embodied AI Benchmarks",
    date: "2026-10-29",
    img: "/uploads/images/20261029/763c5b4b30767904e5cddda22e083597.png",
    link: "/news/20000th-robot"
  },
  {
    title: "How Much Work Do Robots Really Deliver? The Thinking Behind Worken",
    date: "2026-10-29",
    img: "/uploads/images/20261030/d89c249b459c88e11287941894232068.png",
    link: "/news/gold-medals"
  },
  {
    title: "HUTARK Introduces Worken to Measure Productive Robot Work at HUTARK Innovation Day 2026",
    date: "2026-10-28",
    img: "/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg",
    link: "/news/apc-2026"
  }
];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white text-[#333333] overflow-x-hidden">
      {/* =========================================================================
          SECTION 1: HERO BANNER CAROUSEL (.index2_banner)
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[640px] max-h-[1080px] bg-black">
        {/* Main Fullscreen Images */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Link href={slide.link} className="block w-full h-full relative group">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                priority={idx === 0}
                className="object-cover object-center"
              />
              {/* Reference subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            </Link>
          </div>
        ))}

        {/* Reference Bottom Thumbnail Strip (.thumb_box in #f6f6f6) */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#f6f6f6] border-t border-gray-200">
          <div className="site-container">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`text-center py-5 px-3 relative transition-all group ${
                    activeSlide === idx ? 'bg-white shadow-sm' : 'hover:bg-gray-100/70'
                  }`}
                >
                  {/* Top indicator line matching reference linear-gradient(105deg, #6b5ba0 0%, #37a5d0 100%) */}
                  {activeSlide === idx && (
                    <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6b5ba0] to-[#37a5d0]" />
                  )}

                  <div className="text-[13px] sm:text-[14px] lg:text-[15px] font-medium text-[#333333] leading-snug">
                    <span dangerouslySetInnerHTML={{ __html: slide.titleFormatted }} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: THREE INTELLIGENCES IN ONE (.index2_One)
          ========================================================================= */}
      <section className="pt-28 pb-16 bg-white">
        <div className="site-container">
          {/* Section Title (.index2_tle txt-c) */}
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#111111]">
              Three Intelligences in One
            </h2>
            <p className="text-base sm:text-lg text-[#666666] font-normal">
              Building a Competitive Full-Stack Product Portfolio
            </p>
          </div>

          {/* 3 Immersive Video / Animation Cards (.box .sec_item) */}
          <div className="space-y-12">
            {INTELLIGENCES.map((item, idx) => (
              <div
                key={idx}
                className="relative w-full h-[70vh] min-h-[500px] max-h-[820px] rounded-3xl overflow-hidden shadow-2xl group border border-gray-100"
              >
                {/* Background Video (plays directly in loop) */}
                <div className="absolute inset-0 w-full h-full bg-black">
                  <video
                    src={item.video}
                    poster={item.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Reference Gradient Overlay (linear-gradient to bottom from transparent to dark) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>

                {/* Content Overlay (.content-wrapper) */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-14 lg:p-20 z-10 text-white text-center sm:text-left">
                  <div className="max-w-3xl space-y-4">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                      0{idx + 1} // {item.subtitle}
                    </span>
                    <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed max-w-2xl drop-shadow">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: HUTARK PRODUCTS MATRIX (.index2_Two - 2 COLUMNS)
          ========================================================================= */}
      <section className="pt-28 pb-24 bg-white border-t border-gray-100">
        <div className="site-container">
          {/* Section Heading (.index2_tle txt-c) */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#111111]">
              HUTARK Products
            </h2>
          </div>

          {/* Exact 2-Column Product Grid Matching Reference (.list ul) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {PRODUCTS_GRID.map((prod, idx) => (
              <Link
                key={idx}
                href={prod.link}
                className="group relative bg-[#f8f8f8] rounded-3xl overflow-hidden border border-gray-200/80 transition-all duration-500 hover:shadow-2xl hover:border-gray-300 block"
              >
                {/* Product Title Top Center (.tit_con .tit) */}
                <div className="absolute top-10 left-0 right-0 z-10 text-center px-6">
                  <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#333333] tracking-tight group-hover:text-[#0062c5] transition-colors">
                    {prod.name}
                  </h3>
                </div>

                {/* Aspect Ratio 90% Container (.imgBox img) */}
                <div className="relative w-full pt-[90%] overflow-hidden flex items-center justify-center">
                  <Image
                    src={prod.img}
                    alt={prod.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Hover Glow Pill */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-gray-900 shadow-lg">
                  Explore Model →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: NEWS CENTER (.indexFour - WHITE & #f8f8f8)
          ========================================================================= */}
      <section className="pt-24 pb-32 bg-white border-t border-gray-100">
        <div className="site-container">
          {/* Section Header (.tle) */}
          <div className="flex items-center justify-between mb-12">
            <h4 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#1c2025] uppercase">
              News Center
            </h4>
            <Link
              href="/news"
              className="inline-flex items-center space-x-2 text-sm font-semibold text-white px-7 py-3 rounded-full bg-gradient-to-r from-[#37a5d0] to-[#6b5ba0] hover:shadow-lg hover:scale-105 transition-all"
            >
              <span>More</span>
              <svg viewBox="0 0 1024 1024" width="13" height="13" className="fill-white">
                <path d="M283.8 971.7c30.4 31.3 79.7 31.3 110.2 0l391.7-403.2c30.4-31.3 30.4-82.1 0-113.4L394 51.9c-30.5-31.3-79.8-31.3-110.2 0-30.4 31.3-30.4 82.1 0 113.4l336.6 346.5-336.6 346.5c-30.4 31.3-30.4 82.1 0 113.4z" />
              </svg>
            </Link>
          </div>

          {/* News Box (.box split into .le and .re) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Featured Big Card (.le) */}
            <div className="lg:col-span-5 bg-[#f8f8f8] rounded-2xl overflow-hidden border border-gray-200/80 group flex flex-col justify-between hover:shadow-xl transition-all">
              <Link href={NEWS_FEATURED.link} className="block flex-1 flex flex-col justify-between">
                <div className="relative w-full h-72 sm:h-96 overflow-hidden">
                  <Image
                    src={NEWS_FEATURED.img}
                    alt={NEWS_FEATURED.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-8 sm:p-10 space-y-3">
                  <h6 className="text-xl sm:text-2xl font-bold text-[#111111] leading-snug group-hover:text-[#0062c5] transition-colors">
                    {NEWS_FEATURED.title}
                  </h6>
                  <div className="text-sm text-[#adadad] font-medium pt-2">
                    {NEWS_FEATURED.date}
                  </div>
                </div>
              </Link>
            </div>

            {/* Right List of 3 Stories (.re) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-5">
              {NEWS_LIST.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="bg-[#f8f8f8] rounded-2xl overflow-hidden border border-gray-200/80 group hover:shadow-lg hover:border-gray-300 transition-all block flex-1"
                >
                  <div className="flex flex-col sm:flex-row h-full">
                    {/* Thumbnail (.imgBox) */}
                    <div className="sm:w-[38%] relative h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Info (.info) */}
                    <div className="sm:w-[62%] p-6 sm:p-8 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="text-xs text-[#adadad] font-medium">
                          {item.date}
                        </div>
                        <h6 className="text-base sm:text-lg font-semibold text-[#333333] leading-snug group-hover:text-[#0062c5] transition-colors line-clamp-2">
                          {item.title}
                        </h6>
                      </div>
                      <div className="text-xs font-semibold text-[#111111] group-hover:text-[#0062c5] transition-colors pt-4 flex items-center space-x-1">
                        <span>More+</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
