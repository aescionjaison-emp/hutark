'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sliders, 
  Settings, 
  ExternalLink, 
  Edit, 
  RotateCcw, 
  Download, 
  Upload, 
  Check, 
  Search, 
  ShieldCheck, 
  Cpu, 
  Video, 
  Mail,
  Palette,
  Eye
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductData } from '../../types';
import { 
  getProductData, 
  isProductCustomized, 
  resetProductData, 
  exportAllCustomizations, 
  importCustomizations 
} from '../../services/productStore';

export default function AdminDashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [customizedList, setCustomizedList] = useState<Record<string, boolean>>({});
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [importNotice, setImportNotice] = useState<string | null>(null);

  const productList = Object.values(PRODUCTS);

  useEffect(() => {
    const statusMap: Record<string, boolean> = {};
    productList.forEach((p) => {
      statusMap[p.id] = isProductCustomized(p.id);
    });
    setCustomizedList(statusMap);
  }, []);

  const filteredProducts = productList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeries =
      selectedSeries === 'all' || p.series.toLowerCase().includes(selectedSeries.toLowerCase());
    return matchesSearch && matchesSeries;
  });

  const handleExport = () => {
    const jsonStr = exportAllCustomizations();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hutark-products-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = importCustomizations(content);
        if (ok) {
          setImportNotice('Successfully imported customizations! Reloading...');
          setTimeout(() => window.location.reload(), 1500);
        } else {
          setImportNotice('Failed to parse JSON file.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#0b0d14] text-gray-100 pt-24 pb-20">
      <div className="site-container">
        
        {/* DASHBOARD HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-white/10 mb-10">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/70 px-3.5 py-1.5 rounded-full border border-cyan-700/40 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HUTARK CMS & THEME STUDIO</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Product Pages Administration
            </h1>
            <p className="text-sm sm:text-base text-gray-400 font-light mt-2 max-w-2xl">
              Customize typography, font families, background images, technical specifications, and YouTube video slides across every robot detail page in real-time.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleExport}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white border border-white/15 flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>{copiedNotification ? 'Exported!' : 'Export JSON'}</span>
            </button>

            <label className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white border border-white/15 flex items-center space-x-2 transition-all cursor-pointer">
              <Upload className="w-4 h-4 text-blue-400" />
              <span>Import Backup</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
        </div>

        {importNotice && (
          <div className="mb-6 p-4 rounded-xl bg-blue-950/80 border border-cyan-500/50 text-cyan-200 text-xs font-semibold">
            {importNotice}
          </div>
        )}

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search robot model name, series, or ID..."
              className="w-full bg-[#131722] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar text-xs font-semibold">
            {[
              { id: 'all', label: 'All Series' },
              { id: 'A Series', label: 'A Series' },
              { id: 'X Series', label: 'X Series' },
              { id: 'G Series', label: 'G Series' },
              { id: 'D Series', label: 'D Series' },
              { id: 'C Series', label: 'C Series' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSeries(s.id)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  selectedSeries === s.id
                    ? 'bg-[#0062c5] text-white shadow-sm font-bold'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => {
            const isCustom = customizedList[prod.id];
            return (
              <div
                key={prod.id}
                className="bg-[#121620] rounded-3xl border border-white/10 p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300 group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-800/40">
                      {prod.series}
                    </span>
                    {isCustom ? (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
                        Customized
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-gray-400">
                        Reference Default
                      </span>
                    )}
                  </div>

                  <div className="relative h-44 w-full bg-[#181d2a] rounded-2xl overflow-hidden flex items-center justify-center p-4 mb-4 border border-white/5">
                    <Image
                      src={prod.heroImg}
                      alt={prod.name}
                      fill
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">{prod.tagline}</p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-6">
                  <Link
                    href={`/products/${prod.id}`}
                    target="_blank"
                    className="inline-flex items-center space-x-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Live</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </Link>

                  <Link
                    href={`/products/${prod.id}?admin=true`}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#0062c5] hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Page</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
