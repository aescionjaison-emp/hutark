'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  Search, 
  SlidersHorizontal, 
  Layers, 
  Cpu, 
  Zap, 
  Battery, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  Eye, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Table,
  LayoutGrid,
  X,
  Edit3
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductData } from '../../types';
import { 
  siteContentStore, 
  DEFAULT_PRODUCTS_PAGE_CONTENT, 
  ProductsPageContent,
  DexterousHandItem
} from '../../services/siteContentStore';
import { adminAuth } from '../../services/adminAuth';

// Series filter definitions
const SERIES_FILTERS = [
  { id: 'all', label: 'All Fleet Models', count: 14 },
  { id: 'A Series', label: 'HUTARK A Series (Bipedal Humanoid)', count: 4 },
  { id: 'X Series', label: 'HUTARK X Series (Wheeled-Bipedal)', count: 2 },
  { id: 'G Series', label: 'HUTARK G Series (Commercial Service)', count: 3 },
  { id: 'D Series', label: 'HUTARK D Series (Dynamic Quadruped)', count: 4 },
  { id: 'C Series', label: 'HUTARK C Series (Industrial Facility)', count: 1 },
  { id: 'hands', label: 'AGILINK Dexterous Hands', count: 4 }
];

export default function ProductsPage() {
  const [content, setContent] = useState<ProductsPageContent>(() => {
    return siteContentStore.getSiteContent().productsPage || DEFAULT_PRODUCTS_PAGE_CONTENT;
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubStore = siteContentStore.subscribe((sc) => {
      if (sc.productsPage) {
        setContent(sc.productsPage);
      }
    });
    const unsubAuth = adminAuth.subscribe((auth) => {
      setIsAdmin(auth);
    });
    return () => {
      unsubStore();
      unsubAuth();
    };
  }, []);

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const allProducts = useMemo(() => Object.values(PRODUCTS), []);

  // Filter products by tab and search
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Tab matching
      const matchesTab =
        activeTab === 'all' ||
        activeTab === 'hands' ||
        product.series.toLowerCase().includes(activeTab.toLowerCase().split(' ')[0]);

      // Search matching
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.series.toLowerCase().includes(q) ||
        product.tagline.toLowerCase().includes(q) ||
        product.overview.toLowerCase().includes(q) ||
        (product.specs && product.specs.some(s => s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q)));

      return matchesTab && matchesSearch;
    });
  }, [allProducts, activeTab, searchQuery]);

  return (
    <div className="bg-[#f8f9fc] text-[#333333] pt-20 min-h-screen">
      {/* =========================================================================
          HERO BANNER (CLEAN WHITE / ENTERPRISE SHOWCASE)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-200/90 shadow-sm relative overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-blue-50/70 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="site-container relative z-10">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
              {content.heroTitle || 'Autonomous Embodied Robots & Dexterous Platforms'}
            </h1>
            
            <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed max-w-3xl">
              {content.heroDesc || 'From flagship dynamic bipedal humanoids and high-speed wheeled manipulators to agile quadruped robots and sub-millimeter tactile hands. Every model is engineered for commercial enterprise scale and continuous physical AI deployment.'}
            </p>
          </div>

          {/* KPI Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-10 mt-10 border-t border-gray-100">
            {content.kpiStats && content.kpiStats.length > 0 ? (
              content.kpiStats.map((stat, idx) => (
                <div key={idx} className="bg-[#f8f9fc] p-4 rounded-2xl border border-gray-200/80">
                  <span className={`text-2xl font-black block tracking-tight ${idx === 1 ? 'text-[#0062c5]' : idx === 4 ? 'text-emerald-600' : 'text-gray-900'}`}>
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                </div>
              ))
            ) : (
              <>
                <div className="bg-[#f8f9fc] p-4 rounded-2xl border border-gray-200/80">
                  <span className="text-2xl font-black text-gray-900 block tracking-tight">14 Models</span>
                  <span className="text-xs text-gray-500 font-medium">Bipedal, Wheeled &amp; Quadruped</span>
                </div>
                <div className="bg-[#f8f9fc] p-4 rounded-2xl border border-gray-200/80">
                  <span className="text-2xl font-black text-[#0062c5] block tracking-tight">44 DoF</span>
                  <span className="text-xs text-gray-500 font-medium">Flagship Peak Articulation</span>
                </div>
                <div className="bg-[#f8f9fc] p-4 rounded-2xl border border-gray-200/80">
                  <span className="text-2xl font-black text-gray-900 block tracking-tight">380 N·m</span>
                  <span className="text-xs text-gray-500 font-medium">Powerflow Joint Torque</span>
                </div>
                <div className="bg-[#f8f9fc] p-4 rounded-2xl border border-gray-200/80">
                  <span className="text-2xl font-black text-gray-900 block tracking-tight">±0.03 mm</span>
                  <span className="text-xs text-gray-500 font-medium">Sub-Millimeter Repeatability</span>
                </div>
                <div className="bg-[#f8f9fc] p-4 rounded-2xl border border-gray-200/80 col-span-2 sm:col-span-1">
                  <span className="text-2xl font-black text-emerald-600 block tracking-tight">GO-3 AI</span>
                  <span className="text-xs text-gray-500 font-medium">Vision-Language-Action Core</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE SEARCH & SERIES FILTER TOOLBAR (STICKY)
          ========================================================================= */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
        <div className="site-container space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search robot models, specs, sensors, or payload..."
                className="w-full bg-[#f8f9fc] border border-gray-200 rounded-full pl-10 pr-9 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0062c5] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Mode Toggle & Status Count */}
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-500 font-medium">
                Showing <strong className="text-gray-900 font-bold">{filteredProducts.length}</strong> models
              </span>
              <div className="bg-gray-100 p-1 rounded-xl flex items-center space-x-1 border border-gray-200/80">
                <button
                  onClick={() => setViewMode('grid')}
                  title="Card View"
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cards</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  title="Comparison Matrix View"
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    viewMode === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Compare</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-start overflow-x-auto gap-2 no-scrollbar pt-1">
            {SERIES_FILTERS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  activeTab === tab.id
                    ? 'bg-[#0062c5] text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200/80'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRODUCTS SHOWCASE: CARD GRID VIEW
          ========================================================================= */}
      {viewMode === 'grid' && activeTab !== 'hands' && (
        <section className="py-12 sm:py-16">
          <div className="site-container">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-gray-200 p-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No matching robots found</h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  We could not find any model matching &quot;{searchQuery}&quot;. Try resetting your search filters or browse all series.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                  className="bg-[#0062c5] hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => {
                  // Key metric extractions
                  const dofSpec = product.specs?.find(s => s.label.toLowerCase().includes('degree') || s.label.toLowerCase().includes('dof'))?.value || '44 DoF';
                  const speedSpec = product.specs?.find(s => s.label.toLowerCase().includes('speed') || s.label.toLowerCase().includes('walking') || s.label.toLowerCase().includes('velocity'))?.value || '3.8 m/s';
                  const payloadSpec = product.specs?.find(s => s.label.toLowerCase().includes('payload') || s.label.toLowerCase().includes('arm') || s.label.toLowerCase().includes('load'))?.value || '12.0 kg';
                  const runtimeSpec = product.specs?.find(s => s.label.toLowerCase().includes('runtime') || s.label.toLowerCase().includes('battery') || s.label.toLowerCase().includes('operation'))?.value || '4.5 Hours';

                  return (
                    <div
                      key={product.id}
                      className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-200/90 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Product Image Frame */}
                      <div className="relative h-72 w-full bg-gradient-to-b from-[#f8f9fc] to-white flex items-center justify-center p-6 overflow-hidden border-b border-gray-100">
                        <Image
                          src={product.heroImg}
                          alt={product.name}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Series & Model Badge */}
                        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                          <span className="text-[11px] font-bold text-gray-700 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-gray-200/80">
                            {product.series}
                          </span>
                        </div>

                        {/* Availability Pill */}
                        <div className="absolute top-4 right-4">
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 uppercase tracking-wider">
                            Enterprise Fleet Tier
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#0062c5] transition-colors tracking-tight">
                            {product.name}
                          </h3>
                          <p className="text-xs font-semibold text-[#0062c5]">
                            {product.tagline}
                          </p>
                          <p className="text-xs text-gray-600 font-light leading-relaxed line-clamp-3 pt-1">
                            {product.overview}
                          </p>
                        </div>

                        {/* 4-Stat Core Specifications Grid */}
                        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 text-xs">
                          <div className="bg-[#f8f9fc] p-2.5 rounded-xl border border-gray-100">
                            <span className="text-[10px] text-gray-500 font-medium block uppercase tracking-wider">Articulation</span>
                            <span className="text-sm font-black text-gray-900 block truncate mt-0.5">
                              {dofSpec}
                            </span>
                          </div>
                          <div className="bg-[#f8f9fc] p-2.5 rounded-xl border border-gray-100">
                            <span className="text-[10px] text-gray-500 font-medium block uppercase tracking-wider">Max Velocity</span>
                            <span className="text-sm font-black text-gray-900 block truncate mt-0.5">
                              {speedSpec}
                            </span>
                          </div>
                          <div className="bg-[#f8f9fc] p-2.5 rounded-xl border border-gray-100">
                            <span className="text-[10px] text-gray-500 font-medium block uppercase tracking-wider">Arm / Payload</span>
                            <span className="text-sm font-black text-gray-900 block truncate mt-0.5">
                              {payloadSpec}
                            </span>
                          </div>
                          <div className="bg-[#f8f9fc] p-2.5 rounded-xl border border-gray-100">
                            <span className="text-[10px] text-gray-500 font-medium block uppercase tracking-wider">Operating Time</span>
                            <span className="text-sm font-black text-gray-900 block truncate mt-0.5">
                              {runtimeSpec}
                            </span>
                          </div>
                        </div>

                        {/* Manipulation & Hardware Highlights */}
                        {product.manipulationFeatures && product.manipulationFeatures.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[11px] font-bold text-gray-700 block uppercase tracking-wider">Key Architecture</span>
                            <div className="space-y-1">
                              {product.manipulationFeatures.slice(0, 2).map((feat, idx) => (
                                <div key={idx} className="flex items-start space-x-1.5 text-xs text-gray-600">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                  <span className="line-clamp-1">{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Primary & Secondary Action CTAs */}
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                          <Link
                            href={`/products/${product.id}`}
                            className="flex-1 text-center bg-[#0062c5] hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5"
                          >
                            <span>Explore Model</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>

                          <Link
                            href={`/products/${product.id}#acquire`}
                            className="text-xs font-bold text-gray-700 hover:text-[#0062c5] bg-gray-100 hover:bg-gray-200 py-2.5 px-4 rounded-xl transition-colors"
                          >
                            Acquire
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          AGILINK DEXTEROUS HANDS DEDICATED SHOWCASE (WHEN ALL OR HANDS TAB ACTIVE)
          ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'hands') && (
        <section className="py-16 bg-white border-t border-b border-gray-200/90">
          <div className="site-container space-y-10">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0062c5] text-xs font-bold tracking-wider uppercase">
                <Cpu className="w-3.5 h-3.5" />
                <span>{content.handsSubheading || 'End-Effector Manipulation Hardware'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {content.handsHeading || 'AGILINK Dexterous Hands Series'}
              </h2>
              <p className="text-sm text-gray-600 font-light">
                {content.handsDesc || 'Sub-millimeter anthropomorphic 5-finger hands with multi-axis optical-tactile matrices, high-grip torque planetary drives, and zero-shot telepresence force feedback.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(content.handsList && content.handsList.length > 0 ? content.handsList : []).map((hand, idx) => (
                <div
                  key={hand.id || idx}
                  className="bg-[#f8f9fc] rounded-3xl p-6 border border-gray-200/90 flex flex-col justify-between hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="space-y-4">
                    <div className="relative h-48 w-full bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src={hand.img || '/uploads/images/20261029/a8f6153c54f1851135bef57ff7a62e92.png'}
                        alt={hand.name}
                        fill
                        className="object-contain p-2 hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-2 left-2 text-[10px] font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
                        {hand.series}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{hand.name}</h4>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-3 font-light leading-relaxed">
                        {hand.desc}
                      </p>
                    </div>

                    <div className="space-y-1.5 py-2 border-t border-b border-gray-200 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Articulation:</span>
                        <span className="text-gray-900 font-bold">{hand.dof}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Grip Payload:</span>
                        <span className="text-gray-900 font-bold">{hand.payload}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Tactile Array:</span>
                        <span className="text-[#0062c5] font-bold truncate max-w-[130px]">{hand.tactile}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {(hand.features || []).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start space-x-1.5 text-[11px] text-gray-600">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5">
                    <Link
                      href="/contact"
                      className="block w-full text-center bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 text-xs font-bold py-2 rounded-xl transition-colors"
                    >
                      Inquire Hand Unit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          TECHNICAL SPEC MATRIX / SIDE-BY-SIDE COMPARISON TABLE VIEW
          ========================================================================= */}
      {(viewMode === 'table' || activeTab === 'all') && (
        <section className="py-16">
          <div className="site-container space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold text-[#0062c5] uppercase tracking-wider block">
                {content.tableSubheading || 'Technical Architecture Comparison'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {content.tableHeading || 'Fleet Engineering Specifications Matrix'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-light">
                {content.tableDesc || 'Side-by-side engineering specifications across all active HUTARK robot models for research, manufacturing, and commercial procurement.'}
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f8f9fc] border-b border-gray-200 text-gray-700 uppercase font-bold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-4 px-6 min-w-[200px]">Model &amp; Series</th>
                      <th className="py-4 px-4 min-w-[120px]">Form Factor</th>
                      <th className="py-4 px-4 min-w-[100px]">DoF Articulation</th>
                      <th className="py-4 px-4 min-w-[120px]">Max Velocity</th>
                      <th className="py-4 px-4 min-w-[120px]">Arm / Payload</th>
                      <th className="py-4 px-4 min-w-[120px]">Continuous Runtime</th>
                      <th className="py-4 px-4 min-w-[180px]">Primary Sensors</th>
                      <th className="py-4 px-4 min-w-[140px]">Foundation AI</th>
                      <th className="py-4 px-6 text-right min-w-[120px]">Direct Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {allProducts.map((p) => {
                      const dof = p.specs?.find(s => s.label.toLowerCase().includes('dof') || s.label.toLowerCase().includes('degree'))?.value || '44 DoF';
                      const speed = p.specs?.find(s => s.label.toLowerCase().includes('speed') || s.label.toLowerCase().includes('velocity'))?.value || '3.8 m/s';
                      const payload = p.specs?.find(s => s.label.toLowerCase().includes('payload') || s.label.toLowerCase().includes('arm'))?.value || '12.0 kg';
                      const runtime = p.specs?.find(s => s.label.toLowerCase().includes('runtime') || s.label.toLowerCase().includes('battery'))?.value || '4.5 Hours';
                      const sensors = p.specs?.find(s => s.label.toLowerCase().includes('sensor') || s.label.toLowerCase().includes('vision'))?.value || '3D LiDAR + RGB-D';
                      const compute = p.specs?.find(s => s.label.toLowerCase().includes('compute') || s.label.toLowerCase().includes('model'))?.value || 'GO-3 Foundation AI';

                      return (
                        <tr key={p.id} className="hover:bg-blue-50/40 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <div className="relative w-10 h-10 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                                <Image
                                  src={p.heroImg}
                                  alt={p.name}
                                  fill
                                  className="object-contain p-1"
                                />
                              </div>
                              <div>
                                <Link href={`/products/${p.id}`} className="font-bold text-gray-900 hover:text-[#0062c5] transition-colors block">
                                  {p.name}
                                </Link>
                                <span className="text-[10px] text-gray-500 font-medium block">{p.series}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-700 font-medium">
                            {p.series.includes('A Series') ? 'Bipedal Humanoid' : p.series.includes('X Series') ? 'Wheeled-Bipedal' : p.series.includes('D Series') ? 'Quadruped Robot' : p.series.includes('C Series') ? 'Autonomous Service' : 'Commercial Humanoid'}
                          </td>
                          <td className="py-4 px-4 text-gray-900 font-bold">{dof}</td>
                          <td className="py-4 px-4 text-gray-700">{speed}</td>
                          <td className="py-4 px-4 text-gray-700">{payload}</td>
                          <td className="py-4 px-4 text-gray-700">{runtime}</td>
                          <td className="py-4 px-4 text-gray-600 truncate max-w-[180px]">{sensors}</td>
                          <td className="py-4 px-4 text-[#0062c5] font-semibold">{compute}</td>
                          <td className="py-4 px-6 text-right">
                            <Link
                              href={`/products/${p.id}`}
                              className="inline-flex items-center space-x-1 text-xs font-bold text-[#0062c5] hover:text-blue-800 transition-colors"
                            >
                              <span>Explore</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          ENTERPRISE PROCUREMENT & EVALUATION CTA
          ========================================================================= */}
      <section className="py-16 bg-white border-t border-gray-200/90">
        <div className="site-container">
          <div className="bg-gradient-to-r from-gray-900 via-[#10192e] to-gray-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block">
                {content.ctaBadge || 'Enterprise & Research Acquisition'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {content.ctaHeading || 'Procure Evaluation Kits or Deploy Volume Fleets'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                {content.ctaDesc || 'Contact our solutions engineering team for developer SDKs, ROS2 / Isaac Sim models, academic research grants, and dedicated SLA volume manufacturing schedules.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={content.ctaPrimaryBtnLink || '/contact'}
                className="bg-[#0062c5] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full transition-all shadow-md shadow-blue-500/20"
              >
                {content.ctaPrimaryBtnText || 'Inquire Enterprise Fleet'}
              </Link>
              <Link
                href={content.ctaSecondaryBtnLink || '/about'}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full transition-colors"
              >
                {content.ctaSecondaryBtnText || 'Our R&D Mission'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Admin Edit Button (Only visible when logged in as admin) */}
      {isAdmin && (
        <div className="fixed bottom-6 right-6 z-40">
          <Link
            href="/admin?tab=products_page"
            className="flex items-center space-x-2.5 bg-[#0f121a] hover:bg-[#161c28] text-white px-5 py-3 rounded-full border border-cyan-500/50 shadow-2xl transition-all hover:scale-105 active:scale-95 group cursor-pointer"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <Edit3 className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-bold tracking-wide">Edit Page (Admin)</span>
          </Link>
        </div>
      )}
    </div>
  );
}
