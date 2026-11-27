'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Compass,
  Send,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Award,
  Rocket,
  Users,
  Box,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { siteContentStore, FullSiteContent } from '../../services/siteContentStore';

const VALUE_ICONS = [Sparkles, Rocket, Users, Box, GraduationCap];

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<FullSiteContent['about']>(
    () => siteContentStore.getSiteContent().about
  );
  const [activeValueIndex, setActiveValueIndex] = useState(0);
  const [activeNavId, setActiveNavId] = useState('who-we-are');

  useEffect(() => {
    setAboutData(siteContentStore.getSiteContent().about);
    const unsub = siteContentStore.subscribe((sc) => {
      setAboutData(sc.about);
    });
    return () => unsub();
  }, []);

  const visibility = useMemo(
    () => ({
      whoWeAre: aboutData.sectionVisibility?.whoWeAre !== false,
      missionVision: aboutData.sectionVisibility?.missionVision !== false,
      values: aboutData.sectionVisibility?.values !== false,
      milestones: aboutData.sectionVisibility?.milestones !== false,
      awards:
        aboutData.sectionVisibility?.awards === true &&
        (aboutData.awards?.filter((a) => a.visible !== false).length || 0) > 0,
    }),
    [aboutData]
  );

  const visibleValues = useMemo(
    () => (aboutData.coreValues || []).filter((v) => v.visible !== false),
    [aboutData.coreValues]
  );

  const visibleMilestones = useMemo(
    () => (aboutData.milestones || []).filter((m) => m.visible !== false),
    [aboutData.milestones]
  );

  const visibleAwards = useMemo(
    () => (aboutData.awards || []).filter((a) => a.visible !== false),
    [aboutData.awards]
  );

  // Group milestones chronologically by year descending
  const milestoneYears = useMemo(() => {
    const yearSet = new Set<string>();
    visibleMilestones.forEach((m) => yearSet.add(m.year));
    return Array.from(yearSet).sort((a, b) => Number(b) - Number(a));
  }, [visibleMilestones]);

  const [selectedYear, setSelectedYear] = useState<string>(milestoneYears[0] || '2026');
  const [autoCycleReset, setAutoCycleReset] = useState(0);

  useEffect(() => {
    if (milestoneYears.length > 0 && !milestoneYears.includes(selectedYear)) {
      setSelectedYear(milestoneYears[0]);
    }
  }, [milestoneYears, selectedYear]);

  // Automatic 5-second one-by-one cycling through milestones
  useEffect(() => {
    if (milestoneYears.length <= 1) return;
    const timer = setInterval(() => {
      setSelectedYear((prev) => {
        const idx = milestoneYears.indexOf(prev);
        const nextIdx = (idx + 1) % milestoneYears.length;
        return milestoneYears[nextIdx];
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [milestoneYears, autoCycleReset]);

  // Scroll-driven one-by-one progression through Milestones when scrolling
  useEffect(() => {
    if (milestoneYears.length <= 1) return;
    let lastScrollIdx = -1;
    const handleMilestoneScroll = () => {
      const el = document.getElementById('milestones');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Only step while Milestones is actively passing through the viewport
      if (rect.top < vh * 0.65 && rect.bottom > vh * 0.25) {
        const totalTravel = rect.height - vh * 0.4;
        const rawProgress = Math.max(0, Math.min(0.999, (vh * 0.65 - rect.top) / Math.max(1, totalTravel)));
        const targetIdx = Math.min(
          milestoneYears.length - 1,
          Math.floor(rawProgress * milestoneYears.length)
        );
        if (targetIdx !== lastScrollIdx) {
          lastScrollIdx = targetIdx;
          setSelectedYear(milestoneYears[targetIdx]);
          setAutoCycleReset((c) => c + 1);
        }
      }
    };
    window.addEventListener('scroll', handleMilestoneScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleMilestoneScroll);
  }, [milestoneYears]);

  const activeYearEvents = useMemo(
    () => visibleMilestones.filter((m) => m.year === selectedYear),
    [visibleMilestones, selectedYear]
  );

  const navItems = useMemo(() => {
    const items: { id: string; label: string }[] = [];
    if (visibility.whoWeAre) items.push({ id: 'who-we-are', label: aboutData.whoWeAreHeading || 'Who We Are' });
    if (visibility.missionVision) items.push({ id: 'mission-vision', label: 'Mission & Vision' });
    if (visibility.values) items.push({ id: 'our-values', label: aboutData.valuesHeading || 'Our Values' });
    if (visibility.milestones) items.push({ id: 'milestones', label: aboutData.milestonesHeading || 'Milestones' });
    if (visibility.awards) items.push({ id: 'awards', label: aboutData.awardsHeading || 'Awards & Honors' });
    return items;
  }, [visibility, aboutData]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 220;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveNavId(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleYearStep = (dir: -1 | 1) => {
    if (milestoneYears.length === 0) return;
    const idx = milestoneYears.indexOf(selectedYear);
    const nextIdx = (idx + dir + milestoneYears.length) % milestoneYears.length;
    setSelectedYear(milestoneYears[nextIdx]);
    setAutoCycleReset((c) => c + 1);
  };

  return (
    <div className="bg-[#060d18] text-white min-h-screen selection:bg-[#0066cc] selection:text-white">
      {/* =========================================================================
          01. ABOUT HERO (.about-abnner — 100vh symmetric dark architectural backdrop)
          ========================================================================= */}
      <section
        className="relative w-full h-[100svh] min-h-[650px] flex items-center justify-center overflow-hidden bg-[#060d18]"
        aria-label="About HUTARK Hero"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={aboutData.heroImg || '/uploads/images/products/a3_cinematic_dark.jpg'}
            alt={aboutData.heroTitle || 'About HUTARK'}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-45"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, rgba(16,34,62,0.45) 0%, rgba(6,13,24,0.88) 72%, #060d18 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(26px,2.5vw,48px)] font-bold uppercase tracking-[0.04em] leading-[1.3] text-white"
          >
            {aboutData.heroTitle || 'CREATE UNLIMITED PRODUCTIVITY VIA INTELLIGENT MACHINES'}
          </motion.h1>
        </div>

        {/* Bottom-Center Double Chevron Scroll Cue */}
        <button
          type="button"
          onClick={() => scrollToSection(navItems[0]?.id || 'who-we-are')}
          aria-label="Scroll to Who We Are"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors animate-bounce cursor-pointer"
        >
          <div className="flex flex-col items-center -space-y-2.5">
            <ChevronDown className="w-6 h-6" />
            <ChevronDown className="w-6 h-6" />
          </div>
        </button>
      </section>

      {/* =========================================================================
          STICKY INTERNAL SECTION NAVIGATION BAR
          ========================================================================= */}
      {navItems.length > 0 && (
        <nav
          aria-label="About section navigation"
          className="sticky top-[72px] z-30 bg-[#060d18]/90 backdrop-blur-md border-y border-white/10"
        >
          <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-center gap-6 sm:gap-12 overflow-x-auto no-scrollbar h-12">
            {navItems.map((item) => {
              const isActive = activeNavId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`relative h-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    isActive ? 'text-white' : 'text-white/55 hover:text-white/90'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#0066cc]" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* =========================================================================
          02. WHO WE ARE (.aboutTwo)
          ========================================================================= */}
      {visibility.whoWeAre && (
        <section
          id="who-we-are"
          className="relative w-full py-28 sm:py-40 lg:py-48 overflow-hidden bg-[#060d18]"
        >
          {/* Cosmic Horizon Backdrop */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div
              className="absolute -bottom-1/3 right-[-10%] w-[110%] h-[90%] rounded-full opacity-35 blur-3xl"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(24,119,242,0.35) 0%, rgba(11,55,115,0.2) 45%, transparent 75%)',
              }}
            />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 flex">
            {/* Left Vertical Rail Label */}
            <div className="hidden md:flex flex-col items-center mr-12 lg:mr-16 pt-1 select-none">
              <div className="w-[1px] h-14 bg-white/15 mb-4" />
              <span
                className="text-[11px] font-semibold tracking-[0.28em] text-[#1890ff] uppercase"
                style={{ writingMode: 'vertical-rl' }}
              >
                WHO WE ARE
              </span>
              <div className="w-[1px] flex-1 bg-white/10 mt-4" />
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 max-w-[820px]"
            >
              <div className="inline-block mb-10">
                <h2 className="text-[clamp(28px,2.3vw,44px)] font-bold text-white leading-tight">
                  {aboutData.whoWeAreHeading || 'Who We Are'}
                </h2>
                <div className="h-[5px] w-3/4 bg-[#0066cc] mt-1.5" />
              </div>

              <p className="text-[15px] sm:text-[17px] text-white/80 leading-[1.85] font-normal">
                {aboutData.whoWeAreText || aboutData.heroDesc}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* =========================================================================
          03. MISSION & VISION (.aboutThree)
          ========================================================================= */}
      {visibility.missionVision && (
        <section
          id="mission-vision"
          className="relative w-full py-24 sm:py-36 overflow-hidden bg-[#060d18]"
        >
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 flex">
            {/* Left Vertical Rail Label */}
            <div className="hidden md:flex flex-col items-center mr-12 lg:mr-16 pt-1 select-none">
              <div className="w-[1px] h-14 bg-white/15 mb-4" />
              <span
                className="text-[11px] font-semibold tracking-[0.28em] text-[#1890ff] uppercase"
                style={{ writingMode: 'vertical-rl' }}
              >
                MISSION &amp; VISION
              </span>
              <div className="w-[1px] flex-1 bg-white/10 mt-4" />
            </div>

            <div className="flex-1">
              <div className="inline-block mb-12">
                <h2 className="text-[clamp(28px,2.3vw,44px)] font-bold text-white leading-tight">
                  Mission &amp; Vision
                </h2>
                <div className="h-[5px] w-3/4 bg-[#0066cc] mt-1.5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Mission Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.65 }}
                  className="border border-white/15 rounded-[12px] bg-white/[0.02] hover:border-white/30 transition-colors px-8 py-14 min-h-[260px] flex flex-col items-center justify-center text-center"
                >
                  <Compass className="w-10 h-10 text-white stroke-[1.4] mb-5" />
                  <h3 className="text-[22px] sm:text-[26px] font-bold text-white mb-3">
                    {aboutData.missionTitle || 'Our Mission'}
                  </h3>
                  <p className="text-[15px] text-white/75 max-w-md leading-relaxed">
                    {aboutData.missionStatement ||
                      'Scale safe, capable, and economically accessible general-purpose embodied intelligence to every enterprise worldwide.'}
                  </p>
                </motion.div>

                {/* Vision Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.65, delay: 0.1 }}
                  className="border border-white/15 rounded-[12px] bg-white/[0.02] hover:border-white/30 transition-colors px-8 py-14 min-h-[260px] flex flex-col items-center justify-center text-center"
                >
                  <Send className="w-10 h-10 text-white stroke-[1.4] mb-5" />
                  <h3 className="text-[22px] sm:text-[26px] font-bold text-white mb-3">
                    {aboutData.visionTitle || 'Our Vision'}
                  </h3>
                  <p className="text-[15px] text-white/75 max-w-md leading-relaxed">
                    {aboutData.visionStatement ||
                      'To build a global physical AI robotics ecosystem that liberates human labor and amplifies industrial productivity.'}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          04. OUR VALUES (.aboutSeven — Interactive Expanding Horizontal Panels)
          ========================================================================= */}
      {visibility.values && visibleValues.length > 0 && (
        <section
          id="our-values"
          className="relative w-full py-24 sm:py-32 overflow-hidden bg-[#060d18]"
        >
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 flex">
            {/* Left Vertical Rail Label */}
            <div className="hidden md:flex flex-col items-center mr-12 lg:mr-16 pt-1 select-none">
              <div className="w-[1px] h-14 bg-white/15 mb-4" />
              <span
                className="text-[11px] font-semibold tracking-[0.28em] text-[#1890ff] uppercase"
                style={{ writingMode: 'vertical-rl' }}
              >
                OUR VALUES
              </span>
              <div className="w-[1px] flex-1 bg-white/10 mt-4" />
            </div>

            <div className="flex-1">
              <div className="inline-block mb-12">
                <h2 className="text-[clamp(28px,2.3vw,44px)] font-bold text-white leading-tight">
                  {aboutData.valuesHeading || 'Our Values'}
                </h2>
                <div className="h-[5px] w-3/4 bg-[#0066cc] mt-1.5" />
              </div>

              {/* Desktop Expanding Accordion Panels */}
              <div className="hidden lg:flex items-stretch gap-5 h-[420px]">
                {visibleValues.map((val, idx) => {
                  const isActive = activeValueIndex === idx;
                  const Icon = VALUE_ICONS[idx % VALUE_ICONS.length];
                  const bullets =
                    val.statements && val.statements.length > 0 ? val.statements : [val.desc];

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveValueIndex(idx)}
                      onClick={() => setActiveValueIndex(idx)}
                      className={`rounded-[12px] border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer overflow-hidden flex flex-col ${
                        isActive
                          ? 'flex-[2.6] border-[#3b82f6]/50 p-9 justify-start text-left'
                          : 'flex-1 border-white/15 bg-white/[0.02] hover:border-white/30 p-6 items-center justify-between text-center'
                      }`}
                      style={
                        isActive
                          ? {
                              background:
                                'linear-gradient(180deg, rgba(14,38,76,0.88) 0%, rgba(16,68,140,0.94) 100%)',
                            }
                          : undefined
                      }
                    >
                      {isActive ? (
                        <div className="space-y-5">
                          <h3 className="text-[22px] font-bold text-white">{val.title}</h3>
                          <ul className="space-y-3 text-[14px] text-white/85 leading-relaxed">
                            {bullets.map((line, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2">
                                <span className="text-white/60 mt-0.5">·</span>
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1 flex items-center justify-center">
                            <Icon className="w-9 h-9 text-white/90 stroke-[1.5]" />
                          </div>
                          <h3 className="text-[16px] font-medium text-white leading-snug pb-2">
                            {val.title}
                          </h3>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile / Tablet Expandable Stack */}
              <div className="lg:hidden space-y-3">
                {visibleValues.map((val, idx) => {
                  const isActive = activeValueIndex === idx;
                  const bullets =
                    val.statements && val.statements.length > 0 ? val.statements : [val.desc];

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveValueIndex(idx)}
                      className={`w-full text-left rounded-[12px] border p-5 transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#3b82f6]/50 bg-[#0e2a54]/90'
                          : 'border-white/15 bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">{val.title}</h3>
                        <ChevronDown
                          className={`w-4 h-4 text-white/70 transition-transform ${
                            isActive ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                      {isActive && (
                        <ul className="mt-3 space-y-2 text-sm text-white/80 leading-relaxed">
                          {bullets.map((line, bIdx) => (
                            <li key={bIdx}>· {line}</li>
                          ))}
                        </ul>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          05. MILESTONES (.aboutFour — Interactive Year Star-Axis Timeline)
          ========================================================================= */}
      {visibility.milestones && milestoneYears.length > 0 && (
        <section
          id="milestones"
          className="relative w-full py-24 sm:py-32 overflow-hidden bg-[#060d18]"
        >
          {/* Subtle Mountain Horizon Glow */}
          <div
            className="absolute inset-x-0 bottom-0 h-56 pointer-events-none opacity-40"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(16,38,70,0.45) 70%, #050a14 100%)',
            }}
          />

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 flex">
            {/* Left Vertical Rail Label */}
            <div className="hidden md:flex flex-col items-center mr-12 lg:mr-16 pt-1 select-none">
              <div className="w-[1px] h-14 bg-white/15 mb-4" />
              <span
                className="text-[11px] font-semibold tracking-[0.28em] text-[#1890ff] uppercase"
                style={{ writingMode: 'vertical-rl' }}
              >
                MILESTONES
              </span>
              <div className="w-[1px] flex-1 bg-white/10 mt-4" />
            </div>

            <div className="flex-1">
              <div className="inline-block mb-12">
                <h2 className="text-[clamp(28px,2.3vw,44px)] font-bold text-white leading-tight">
                  {aboutData.milestonesHeading || 'Milestones'}
                </h2>
                <div className="h-[5px] w-3/4 bg-[#0066cc] mt-1.5" />
              </div>

              {/* Split Year Watermark (Left) + Dotted Event List (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start min-h-[340px]">
                {/* Left: Oversized Translucent Year + Prev/Next Buttons */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                  <div className="text-[clamp(72px,9vw,160px)] font-bold leading-none text-white/[0.14] select-none tracking-tight">
                    {selectedYear}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => handleYearStep(-1)}
                      aria-label="Newer Year"
                      className="w-10 h-10 rounded-full border border-white/25 hover:border-white text-white/75 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleYearStep(1)}
                      aria-label="Older Year"
                      className="w-10 h-10 rounded-full border border-white/25 hover:border-white text-white/75 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right: Vertical Dotted Line + Milestones */}
                <div className="lg:col-span-7 relative pl-8 border-l border-dashed border-white/25 space-y-7">
                  {activeYearEvents.map((ev, idx) => (
                    <motion.div
                      key={`${selectedYear}-${idx}`}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.06 }}
                      className="relative"
                    >
                      <span className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-white" />
                      <div className="flex items-baseline gap-4">
                        <span className="text-sm font-semibold text-white/50 tabular-nums min-w-[24px]">
                          {ev.month || String(idx + 1)}
                        </span>
                        <div className="space-y-1">
                          <h3 className="text-[16px] sm:text-[17px] font-medium text-white">
                            {ev.title}
                          </h3>
                          <p className="text-[14px] text-white/65 leading-relaxed">{ev.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Horizontal Star-Node Year Axis */}
              <div className="mt-16 pt-6 border-t border-white/15 flex items-center justify-around sm:justify-end sm:gap-20">
                {milestoneYears.map((yr) => {
                  const isActive = yr === selectedYear;
                  return (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => {
                        setSelectedYear(yr);
                        setAutoCycleReset((c) => c + 1);
                      }}
                      className="relative flex flex-col items-center -mt-9 group cursor-pointer"
                    >
                      <span
                        className={`text-lg transition-transform ${
                          isActive
                            ? 'text-white scale-125'
                            : 'text-white/40 group-hover:text-white/80'
                        }`}
                      >
                        ✦
                      </span>
                      <span
                        className={`mt-2 text-sm sm:text-base font-medium transition-colors ${
                          isActive ? 'text-white' : 'text-white/40 group-hover:text-white/75'
                        }`}
                      >
                        {yr}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          06. AWARDS & HONORS (CONDITIONAL — HIDDEN WHEN UNPUBLISHED / EMPTY)
          ========================================================================= */}
      {visibility.awards && (
        <section id="awards" className="relative w-full py-24 overflow-hidden bg-[#060d18]">
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 flex">
            <div className="hidden md:flex flex-col items-center mr-12 lg:mr-16 pt-1 select-none">
              <div className="w-[1px] h-14 bg-white/15 mb-4" />
              <span
                className="text-[11px] font-semibold tracking-[0.28em] text-[#1890ff] uppercase"
                style={{ writingMode: 'vertical-rl' }}
              >
                AWARDS &amp; HONORS
              </span>
              <div className="w-[1px] flex-1 bg-white/10 mt-4" />
            </div>

            <div className="flex-1">
              <div className="inline-block mb-12">
                <h2 className="text-[clamp(28px,2.3vw,44px)] font-bold text-white leading-tight">
                  {aboutData.awardsHeading || 'Awards & Honors'}
                </h2>
                <div className="h-[5px] w-3/4 bg-[#0066cc] mt-1.5" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleAwards.map((aw, idx) => (
                  <div
                    key={idx}
                    className="border border-white/15 rounded-[12px] bg-white/[0.02] p-6 space-y-3"
                  >
                    {aw.img && (
                      <div className="relative w-full h-44 bg-black/30 rounded-lg overflow-hidden mb-3">
                        <Image src={aw.img} alt={aw.title} fill className="object-contain p-2" />
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs text-[#1890ff]">
                      <span>{aw.issuer}</span>
                      <span>{aw.year}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{aw.title}</h3>
                    {aw.desc && <p className="text-sm text-white/70 leading-relaxed">{aw.desc}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
