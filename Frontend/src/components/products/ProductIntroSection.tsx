'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ProductData } from '../../types';

interface ProductIntroSectionProps {
  product: ProductData;
}

export default function ProductIntroSection({ product }: ProductIntroSectionProps) {
  const rawCinematic = product.cinematicImg;
  const bgImg =
    rawCinematic && !rawCinematic.includes('492548ce8722aa332e87aa47ce1019e5')
      ? rawCinematic
      : product.heroImg;
  const heading = product.cinematicHeading || product.name;
  const subheading = product.cinematicSubheading || product.tagline || 'Your 24/7 Productivity Partner';

  return (
    <section
      className="relative w-full min-h-[80vh] lg:min-h-[100vh] bg-white overflow-hidden"
      aria-label={`${product.name} Introduction`}
    >
      {/* Full-Bleed Atmospheric Robot Visual (Reference: .A3Ultra_Two-video) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImg}
          alt={heading}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle top gradient so white centered text remains legible over any product visual */}
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-black/55 via-black/25 to-transparent pointer-events-none" />
      </div>

      {/* Top-Centered Editorial Title & Wide-Tracked Tagline (Reference: .A3Ultra_Two-con) */}
      <div className="relative z-[2] text-center px-[4%] pt-24 sm:pt-32">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-[28px] sm:text-[36px] lg:text-[40px] font-normal text-white leading-[1.4]"
        >
          {heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2.5 text-[14px] sm:text-[18px] lg:text-[20px] font-normal text-white tracking-[0.28em]"
        >
          {subheading}
        </motion.p>
      </div>
    </section>
  );
}
