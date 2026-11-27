'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Sliders, Layers, ChevronRight, CheckCircle2, Download } from 'lucide-react';
import { ProductData } from '../../types';

interface ProductSpecsMatrixProps {
  product: ProductData;
}

export default function ProductSpecsMatrix({ product }: ProductSpecsMatrixProps) {
  // Use product specRows or fallback to structured specification defaults
  const allSpecs = useMemo(() => {
    if (product.specRows && product.specRows.length > 0) {
      return product.specRows;
    }

    return [
      { category: "Basic Parameters", item: "Total Height", value: "165 – 172 cm" },
      { category: "Basic Parameters", item: "Total System Weight", value: "58 – 65 kg (Including Battery)" },
      { category: "Basic Parameters", item: "Active Degrees of Freedom (DoF)", value: "38 – 44 Active DoF" },
      { category: "Basic Parameters", item: "Operating Temperature", value: "-10°C to +45°C" },
      { category: "Basic Parameters", item: "Enclosure Protection Rating", value: "IP54 / Industrial Splashproof" },

      { category: "Arm & Manipulation", item: "Degrees of Freedom Per Arm", value: "7-DoF (Spherical Wrist)" },
      { category: "Arm & Manipulation", item: "Single Arm Rated Payload", value: "4.5 – 5.5 kg" },
      { category: "Arm & Manipulation", item: "Dual Arm Combined Payload", value: "10.0 – 12.0 kg" },
      { category: "Arm & Manipulation", item: "Arm Maximum Reach", value: "850 mm" },
      { category: "Arm & Manipulation", item: "Trajectory Repeatability", value: "±0.03 mm" },

      { category: "Chassis & Mobility", item: "Drive Architecture", value: "Omnidirectional Dual-Wheel Drive / Bipedal Hybrid" },
      { category: "Chassis & Mobility", item: "Maximum Travel Speed", value: "Up to 3.8 m/s" },
      { category: "Chassis & Mobility", item: "Turning Radius", value: "0 mm (360° In-Place Rotation)" },
      { category: "Chassis & Mobility", item: "Obstacle Crossing Ability", value: "15 cm Step / 35 mm Gap" },
      { category: "Chassis & Mobility", item: "Maximum Gradeability", value: "15° Slope" },

      { category: "Battery & Energy", item: "Battery Chemistry", value: "High-Energy Density Automotive Lithium-Ion" },
      { category: "Battery & Energy", item: "Nominal Voltage & Capacity", value: "48 V / 30 Ah (1440 Wh)" },
      { category: "Battery & Energy", item: "Continuous Operating Runtime", value: "4.5 – 6.0 Hours" },
      { category: "Battery & Energy", item: "Charging Time", value: "1.2 Hours Fast-Charge (Hot-Swappable)" },

      { category: "Perception & Compute", item: "Primary AI Compute Unit", value: "Dual Drive Thor Platform (Up to 2000 TOPS)" },
      { category: "Perception & Compute", item: "Vision Sensors", value: "Dual Stereo RGB-D Cameras + 360° Solid-State LiDAR" },
      { category: "Perception & Compute", item: "Audio & Voice", value: "6-Channel Circular Beamforming Microphone Array" },
      { category: "Perception & Compute", item: "Real-Time Bus & OS", value: "EtherCAT (1000 Hz) / Link-U OS" }
    ];
  }, [product.specRows]);

  // Unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    allSpecs.forEach(s => set.add(s.category));
    return ['All Specifications', ...Array.from(set)];
  }, [allSpecs]);

  const [activeCategory, setActiveCategory] = useState('All Specifications');

  const filteredSpecs = useMemo(() => {
    if (activeCategory === 'All Specifications') return allSpecs;
    return allSpecs.filter(s => s.category === activeCategory);
  }, [allSpecs, activeCategory]);

  const diagramImg = product.matchingListImg || product.heroImg;

  return (
    <section id="specifications-section" className="py-24 bg-white text-[#1a1a1a] border-b border-gray-200">
      <div className="site-container max-w-6xl">
        
        {/* Section Header matching A3Ultra_Five */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8f7435]">
            TECHNICAL ENGINEERING MATRIX
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Product Specifications
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-light leading-relaxed">
            Side-by-side dimensional, electrical, mechatronic, and computing specifications for {product.name}.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gray-900 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Anatomical Dimension Visual if available */}
        {diagramImg && (
          <div className="mb-14 rounded-3xl bg-[#f8f9fa] border border-gray-200 p-8 flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px]">
              <Image
                src={diagramImg}
                alt={`${product.name} Engineering Dimensions`}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
              />
            </div>
          </div>
        )}

        {/* Structured Specification Table Container */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Header Bar */}
          <div className="bg-[#14171f] text-white py-5 px-8 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#bca874]" />
              <h3 className="text-base sm:text-lg font-bold tracking-tight uppercase">
                {product.name} Technical Parameter Sheets
              </h3>
            </div>
            <span className="text-xs font-medium text-gray-400 hidden sm:inline-block">
              {filteredSpecs.length} Active Records
            </span>
          </div>

          {/* Accessible Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  <th className="py-4 px-6 w-1/4">Category</th>
                  <th className="py-4 px-6 w-1/3">Engineering Parameter</th>
                  <th className="py-4 px-6">Specification Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSpecs.map((spec, i) => (
                  <tr
                    key={i}
                    className={`transition-colors hover:bg-amber-50/30 ${
                      i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'
                    }`}
                  >
                    <td className="py-4 px-6 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                      {spec.category}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900">
                      {spec.item}
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-950">
                      <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-xs font-mono font-semibold">
                        {spec.value}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
