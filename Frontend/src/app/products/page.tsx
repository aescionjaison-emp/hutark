'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Layers } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

const SERIES_TABS = [
  { id: 'all', label: 'All Products' },
  { id: 'A Series', label: 'HUTARK A Series (Humanoid)' },
  { id: 'X Series', label: 'HUTARK X Series (Wheeled-Bipedal)' },
  { id: 'G Series', label: 'HUTARK G Series (Commercial Service)' },
  { id: 'D Series', label: 'HUTARK D Series (Quadruped)' },
  { id: 'C Series', label: 'HUTARK C Series (Cleaning)' },
];

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const productList = Object.values(PRODUCTS);

  const filteredProducts =
    activeTab === 'all'
      ? productList
      : productList.filter((p) =>
          p.series.toLowerCase().includes(activeTab.toLowerCase().split(' ')[0])
        );

  return (
    <div className="bg-white text-[#333333] pt-20 min-h-screen">
      {/* =========================================================================
          HERO BANNER (CLEAN LIGHT APPEARANCE)
          ========================================================================= */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="site-container text-center max-w-4xl space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-brand-blue border border-blue-100">
            HUTARK Fleet Portfolio
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
            General-Purpose Embodied Robots
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-light max-w-2xl mx-auto">
            From agile bipedal industrial workers and high-speed quadruped inspectors to dexterous wheeled service humanoids — engineered for commercial and enterprise scale.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SERIES FILTER TABS (STICKY WHITE BAR)
          ========================================================================= */}
      <section className="sticky top-20 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
        <div className="site-container flex items-center justify-start sm:justify-center overflow-x-auto gap-2 no-scrollbar">
          {SERIES_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-blue text-white shadow-md shadow-blue-500/20'
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* =========================================================================
          PRODUCTS GRID (WHITE/LIGHT CARDS)
          ========================================================================= */}
      <section className="py-20 bg-[#fbfbfb]">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Product Image Frame */}
                <div className="relative h-72 w-full bg-[#f8f8f8] flex items-center justify-center p-6 overflow-hidden">
                  <Image
                    src={product.heroImg}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-semibold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                      {product.series}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-brand-blue transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 font-light">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Specs Snapshot */}
                  {product.specs && product.specs.length > 0 && (
                    <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-gray-100 text-xs">
                      {product.specs.slice(0, 4).map((spec, i) => (
                        <div key={i} className="bg-[#f8f8f8] p-2.5 rounded-xl">
                          <span className="text-gray-500 block truncate">{spec.label}</span>
                          <span className="text-gray-900 font-bold block truncate mt-0.5">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between text-sm font-semibold text-brand-blue group-hover:translate-x-1 transition-transform">
                    <span>Explore Specifications</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

