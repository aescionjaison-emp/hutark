'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ProductData } from '../../types';

interface ProductSpecsMatrixProps {
  product: ProductData;
}

export default function ProductSpecsMatrix({ product }: ProductSpecsMatrixProps) {
  const allSpecs = useMemo(() => {
    if (product.specRows && product.specRows.length > 0) {
      return product.specRows;
    }

    return [
      { category: 'Basic Parameters', item: 'Total Height', value: '165 – 172 cm' },
      { category: 'Basic Parameters', item: 'Total System Weight', value: '58 – 65 kg (Including Battery)' },
      { category: 'Basic Parameters', item: 'Active Degrees of Freedom (DoF)', value: '38 – 44 Active DoF' },
      { category: 'Basic Parameters', item: 'Operating Temperature', value: '-10°C to +45°C' },
      { category: 'Basic Parameters', item: 'Enclosure Protection Rating', value: 'IP54 / Industrial Splashproof' },

      { category: 'Arm & Manipulation', item: 'Degrees of Freedom Per Arm', value: '7-DoF (Spherical Wrist)' },
      { category: 'Arm & Manipulation', item: 'Single Arm Rated Payload', value: '4.5 – 5.5 kg' },
      { category: 'Arm & Manipulation', item: 'Dual Arm Combined Payload', value: '10.0 – 12.0 kg' },
      { category: 'Arm & Manipulation', item: 'Arm Maximum Reach', value: '850 mm' },
      { category: 'Arm & Manipulation', item: 'Trajectory Repeatability', value: '±0.03 mm' },

      { category: 'Chassis & Mobility', item: 'Drive Architecture', value: 'Omnidirectional Dual-Wheel Drive / Bipedal Hybrid' },
      { category: 'Chassis & Mobility', item: 'Maximum Travel Speed', value: 'Up to 3.8 m/s' },
      { category: 'Chassis & Mobility', item: 'Turning Radius', value: '0 mm (360° In-Place Rotation)' },
      { category: 'Chassis & Mobility', item: 'Obstacle Crossing Ability', value: '15 cm Step / 35 mm Gap' },

      { category: 'Battery & Energy', item: 'Nominal Voltage & Capacity', value: '48 V / 30 Ah (1440 Wh)' },
      { category: 'Battery & Energy', item: 'Continuous Operating Runtime', value: '4.5 – 6.0 Hours' },
      { category: 'Battery & Energy', item: 'Charging Time', value: '1.2 Hours Fast-Charge (Hot-Swappable)' },

      { category: 'Perception & Compute', item: 'Primary AI Compute Unit', value: 'Up to 700 TOPS Heterogeneous Compute' },
      { category: 'Perception & Compute', item: 'Vision Sensors', value: 'Dual Stereo RGB-D Cameras + 360° Solid-State LiDAR' },
      { category: 'Perception & Compute', item: 'Real-Time Bus & OS', value: 'EtherCAT (1000 Hz) / Link-U OS' },
    ];
  }, [product.specRows]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    allSpecs.forEach((s) => set.add(s.category));
    return ['All', ...Array.from(set)];
  }, [allSpecs]);

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSpecs = useMemo(() => {
    if (activeCategory === 'All') return allSpecs;
    return allSpecs.filter((s) => s.category === activeCategory);
  }, [allSpecs, activeCategory]);

  const diagramImg = product.matchingListImg || product.heroImg;

  return (
    <section
      id="specifications-section"
      className="bg-white text-[#333333] pb-24 sm:pb-36"
      aria-label={`${product.name} Product Specifications`}
    >
      {/* Centered Heading (Reference: .A3Ultra_Five .A3Ultra_sec-tle) */}
      <div className="px-[4%] pt-20 sm:pt-24 pb-8 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-[26px] sm:text-[32px] lg:text-[36px] font-normal text-[#333333] leading-[1.4]"
        >
          Product Specifications
        </motion.h3>
      </div>

      {/* Wide Product Anatomy / Dimensional Visual (Reference: .A3Ultra_Five-img) */}
      {diagramImg && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="max-w-[1400px] w-[88%] mx-auto mt-6 mb-16"
        >
          <div className="relative w-full h-[360px] sm:h-[520px] lg:h-[680px]">
            <Image
              src={diagramImg}
              alt={`${product.name} Product Specifications`}
              fill
              sizes="(max-width: 1400px) 88vw, 1400px"
              className="object-contain"
            />
          </div>
        </motion.div>
      )}

      {/* Accessible HTML Technical Specifications Table */}
      <div className="max-w-[1200px] w-[90%] mx-auto">
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs sm:text-sm transition-colors border cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                    : 'bg-white text-[#555555] border-[#e0e0e0] hover:border-[#333333]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="border-t border-[#e5e5e5] overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e5e5e5] text-[12px] uppercase tracking-wider text-[#777777]">
                <th className="py-4 px-4 font-normal w-1/4">Category</th>
                <th className="py-4 px-4 font-normal w-1/3">Parameter</th>
                <th className="py-4 px-4 font-normal">Specification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#efefef] text-[14px] sm:text-[15px]">
              {filteredSpecs.map((spec, i) => (
                <tr key={i} className="hover:bg-[#fafafa] transition-colors">
                  <td className="py-4 px-4 text-[#777777] text-xs sm:text-sm">{spec.category}</td>
                  <td className="py-4 px-4 text-[#1a1a1a] font-normal">{spec.item}</td>
                  <td className="py-4 px-4 text-[#333333] font-medium">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
