'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  LogOut, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Check, 
  Search, 
  Cpu, 
  Video, 
  Mail, 
  Palette, 
  FileText, 
  Home, 
  FlaskConical, 
  Building2, 
  FolderOpen, 
  Key, 
  Plus, 
  Trash2, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle,
  Copy,
  Layers,
  ArrowRight,
  Sliders,
  Play
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductData, YouTubeVideoSlide } from '../../types';
import { adminAuth } from '../../services/adminAuth';
import { 
  siteContentStore, 
  FullSiteContent, 
  DEFAULT_SITE_CONTENT,
  HeroSlide,
  IntelligenceCard,
  HomeProductItem,
  TechPillar,
  CoreValue,
  Milestone,
  LeaderProfile
} from '../../services/siteContentStore';
import { 
  getProductData, 
  saveProductData,
  isProductCustomized, 
  resetProductData, 
  exportAllCustomizations, 
  importCustomizations 
} from '../../services/productStore';
import MediaUploadZone from '../../components/admin/MediaUploadZone';
import AdminProductEditorDrawer from '../../components/products/AdminProductEditorDrawer';

type AdminTab = 'products' | 'youtube' | 'home' | 'rd' | 'about' | 'global' | 'media' | 'security';

export default function AdminDashboardPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminIdInput, setAdminIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('products');

  // Site Content State
  const [siteContent, setSiteContent] = useState<FullSiteContent>(DEFAULT_SITE_CONTENT);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  // Products State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [customizedList, setCustomizedList] = useState<Record<string, boolean>>({});
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [drawerInitialTab, setDrawerInitialTab] = useState<'styles' | 'images' | 'content' | 'hardware' | 'specs' | 'videos'>('styles');

  // YouTube Video Slides Manager State
  const [selectedVideoRobotId, setSelectedVideoRobotId] = useState<string>('G2');
  const [adminVideoUrlInput, setAdminVideoUrlInput] = useState<string>('');
  const [activeVideoSlides, setActiveVideoSlides] = useState<YouTubeVideoSlide[]>([]);

  const extractYouTubeId = (url: string): string => {
    if (!url) return '';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) return match[1];
    return url.trim();
  };

  // Central Media Manager State
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Security Credentials Update State
  const [newAdminId, setNewAdminId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [credNotice, setCredNotice] = useState<{ success: boolean; msg: string } | null>(null);

  const productList = Object.values(PRODUCTS);

  useEffect(() => {
    // Subscribe to auth state
    const unsub = adminAuth.subscribe((auth) => {
      setIsAuthenticated(auth);
    });

    // Load site content
    setSiteContent(siteContentStore.getSiteContent());

    // Load product statuses
    const statusMap: Record<string, boolean> = {};
    productList.forEach((p) => {
      statusMap[p.id] = isProductCustomized(p.id);
    });
    setCustomizedList(statusMap);

    return () => unsub();
  }, []);

  // Sync active video slides whenever selected robot changes
  useEffect(() => {
    const prod = getProductData(selectedVideoRobotId);
    setActiveVideoSlides(prod.youtubeVideos || []);
  }, [selectedVideoRobotId]);

  // YouTube Video Slides Handlers
  const handleAddVideoUrl = () => {
    const raw = adminVideoUrlInput.trim();
    if (!raw) return;
    const newId = extractYouTubeId(raw);
    const prod = getProductData(selectedVideoRobotId);
    const newSlide: YouTubeVideoSlide = {
      id: newId,
      title: `${prod.name} Field Operational Demonstration`,
      category: 'Live Robot Demonstration',
      description: 'Recorded real-world operational testing of dexterity and autonomous intelligence.'
    };
    const updated = [...activeVideoSlides, newSlide];
    setActiveVideoSlides(updated);
    setAdminVideoUrlInput('');
    saveProductData({ ...prod, youtubeVideos: updated });
    setCustomizedList((prev) => ({ ...prev, [selectedVideoRobotId]: true }));
    setSaveNotice(`Added video slide to ${prod.name}!`);
    setTimeout(() => setSaveNotice(null), 3000);
  };

  const handleSaveAllVideoSlides = () => {
    const prod = getProductData(selectedVideoRobotId);
    saveProductData({ ...prod, youtubeVideos: activeVideoSlides });
    setCustomizedList((prev) => ({ ...prev, [selectedVideoRobotId]: true }));
    setSaveNotice(`Saved video slides for ${prod.name}!`);
    setTimeout(() => setSaveNotice(null), 3000);
  };

  const handleDeleteVideoSlide = (idx: number) => {
    const updated = activeVideoSlides.filter((_, i) => i !== idx);
    setActiveVideoSlides(updated);
    const prod = getProductData(selectedVideoRobotId);
    saveProductData({ ...prod, youtubeVideos: updated });
    setCustomizedList((prev) => ({ ...prev, [selectedVideoRobotId]: true }));
    setSaveNotice(`Removed video slide from ${prod.name}`);
    setTimeout(() => setSaveNotice(null), 3000);
  };

  const handleUpdateSlideField = (idx: number, field: keyof YouTubeVideoSlide, val: string) => {
    const updated = [...activeVideoSlides];
    updated[idx] = { ...updated[idx], [field]: val };
    setActiveVideoSlides(updated);
  };

  const handleAddBlankSlide = () => {
    const prod = getProductData(selectedVideoRobotId);
    const newSlide: YouTubeVideoSlide = {
      id: '7zI3u19q_e0',
      title: `${prod.name} High Performance Demonstration`,
      category: 'Field Testing',
      description: 'Autonomous demonstration testing agility and dexterity.'
    };
    const updated = [...activeVideoSlides, newSlide];
    setActiveVideoSlides(updated);
    saveProductData({ ...prod, youtubeVideos: updated });
    setCustomizedList((prev) => ({ ...prev, [selectedVideoRobotId]: true }));
    setSaveNotice(`Added new video slide to ${prod.name}`);
    setTimeout(() => setSaveNotice(null), 3000);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const res = adminAuth.login(adminIdInput, passwordInput);
    if (res.success) {
      setIsAuthenticated(true);
      setAdminIdInput('');
      setPasswordInput('');
    } else {
      setLoginError(res.message || 'Invalid credentials');
    }
  };

  const handleLogout = () => {
    adminAuth.logout();
    setIsAuthenticated(false);
  };

  // Save Site Content
  const handleSaveSiteContent = () => {
    siteContentStore.saveSiteContent(siteContent);
    setSaveNotice('All website changes saved and applied live across the site!');
    setTimeout(() => setSaveNotice(null), 3000);
  };

  const handleResetSiteContent = () => {
    if (confirm('Reset entire website content back to factory defaults?')) {
      const reset = siteContentStore.resetSiteContent();
      setSiteContent(reset);
      setSaveNotice('Website content reset to factory defaults.');
      setTimeout(() => setSaveNotice(null), 3000);
    }
  };

  // Copy to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // Credentials update
  const handleUpdateCreds = (e: React.FormEvent) => {
    e.preventDefault();
    setCredNotice(null);
    const res = adminAuth.updateCredentials(newAdminId, newPassword);
    if (res.success) {
      setCredNotice({ success: true, msg: 'Admin credentials updated successfully!' });
      setNewAdminId('');
      setNewPassword('');
    } else {
      setCredNotice({ success: false, msg: res.message || 'Failed to update credentials' });
    }
  };

  // Backup Export/Import
  const handleExportFullBackup = () => {
    const backup = {
      siteContent: siteContentStore.getSiteContent(),
      productsCustomizations: JSON.parse(exportAllCustomizations()),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hutark-full-website-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const handleImportFullBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.siteContent) {
          siteContentStore.saveSiteContent(parsed.siteContent);
          setSiteContent(parsed.siteContent);
        }
        if (parsed.productsCustomizations) {
          importCustomizations(JSON.stringify(parsed.productsCustomizations));
        }
        setSaveNotice('Backup restored successfully!');
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        alert('Invalid backup JSON format.');
      }
    };
    reader.readAsText(file);
  };

  // =========================================================================
  // 1. LOCKED ADMIN LOGIN SCREEN (IF NOT AUTHENTICATED)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07090e] text-white flex items-center justify-center p-4">
        {/* Atmospheric Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-md w-full bg-[#10141f] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">HUTARK Master CMS</h2>
            <p className="text-xs text-gray-400 font-light">
              Restricted Access. Please authenticate with Admin ID & Password.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-950/50 border border-red-500/50 rounded-xl text-xs text-red-300 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Admin ID</label>
              <input
                type="text"
                value={adminIdInput}
                onChange={(e) => setAdminIdInput(e.target.value)}
                placeholder="Enter Admin ID (default: admin)"
                autoFocus
                required
                className="w-full bg-[#171d2b] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-[#1c2333] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter Password (default: admin)"
                  required
                  className="w-full bg-[#171d2b] border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-[#1c2333] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 text-sm cursor-pointer"
            >
              Sign In to Admin Studio
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center">
            <Link href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Products for Products Tab
  const filteredProducts = productList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeries =
      selectedSeries === 'all' || p.series.toLowerCase().includes(selectedSeries.toLowerCase());
    return matchesSearch && matchesSeries;
  });

  // =========================================================================
  // 2. AUTHENTICATED MASTER ADMIN STUDIO
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#080a10] text-gray-100 pt-16 pb-20">
      {/* Save Notification Toast */}
      {saveNotice && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 text-xs font-bold animate-fadeIn">
          <CheckCircle className="w-4 h-4" />
          <span>{saveNotice}</span>
        </div>
      )}

      {/* HEADER BAR */}
      <header className="border-b border-white/10 bg-[#0d1018]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="site-container py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-white tracking-tight">HUTARK Master CMS Studio</h1>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-mono px-2 py-0.5 rounded-full uppercase">
                  Authenticated
                </span>
              </div>
              <p className="text-[11px] text-gray-400">Complete Website Content, Media & Robot Management</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSaveSiteContent}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md hover:shadow-blue-500/25 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Website Changes</span>
            </button>

            <button
              onClick={handleExportFullBackup}
              title="Download full JSON backup of website and product customizations"
              className="bg-white/10 hover:bg-white/15 text-gray-200 px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Backup</span>
            </button>

            <label
              title="Import JSON backup"
              className="bg-white/10 hover:bg-white/15 text-gray-200 px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restore</span>
              <input type="file" accept=".json" onChange={handleImportFullBackup} className="hidden" />
            </label>

            <Link
              href="/"
              target="_blank"
              className="bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock / Exit</span>
            </button>
          </div>
        </div>

        {/* CMS NAVIGATION TABS */}
        <div className="site-container overflow-x-auto no-scrollbar">
          <nav className="flex space-x-1 py-1 border-t border-white/5 text-xs font-semibold">
            {[
              { id: 'products', label: 'Robot Matrix (14 Models)', icon: Cpu },
              { id: 'youtube', label: '📹 YouTube Video Slides', icon: Video },
              { id: 'home', label: 'Home Page Editor', icon: Home },
              { id: 'rd', label: 'R & D / Tech Editor', icon: FlaskConical },
              { id: 'about', label: 'About Page Editor', icon: Building2 },
              { id: 'global', label: 'Global Branding & Theme', icon: Palette },
              { id: 'media', label: 'Central Media Dropzone', icon: FolderOpen },
              { id: 'security', label: 'Admin Security', icon: Key },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="site-container py-8">

        {/* =========================================================================
            TAB 1: PRODUCTS MATRIX & ROBOT PAGES
            ========================================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Robot Detail Pages Customizer</h2>
                <p className="text-xs text-gray-400">
                  Select any robot model to edit its typography, CGI images, video slides, hardware modules, and specifications.
                </p>
              </div>

              {/* Search & Filter */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search robot model..."
                    className="w-full bg-[#131722] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex items-center space-x-1 bg-[#131722] border border-white/10 p-1 rounded-xl text-xs">
                  {['all', 'A Series', 'X Series', 'G Series', 'D Series', 'C Series'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSeries(s)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        selectedSeries === s ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {s === 'all' ? 'All' : s.replace(' Series', '')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Robot Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => {
                const currentData = getProductData(prod.id);
                const isCustomized = customizedList[prod.id] || false;

                return (
                  <div
                    key={prod.id}
                    className="bg-[#12151f] border border-white/10 rounded-2xl p-5 hover:border-cyan-500/50 transition-all flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                          {prod.series}
                        </span>
                        {isCustomized ? (
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800/40">
                            Customized
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-gray-400 bg-white/5 px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </div>

                      <div className="relative h-44 w-full bg-[#0a0c12] rounded-xl flex items-center justify-center p-3 mb-4 border border-white/5 overflow-hidden">
                        <Image
                          src={currentData.heroImg || prod.heroImg}
                          alt={prod.name}
                          fill
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>

                      <h3 className="text-base font-bold text-white">{currentData.name}</h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{currentData.tagline}</p>
                    </div>

                    <div className="pt-4 border-t border-white/5 mt-4 flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setDrawerInitialTab('styles');
                          setEditingProduct(currentData);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Edit Page</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedVideoRobotId(prod.id);
                          setActiveTab('youtube');
                        }}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                        title="Edit YouTube Video Slides"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Videos</span>
                      </button>

                      <Link
                        href={`/products/${prod.id}`}
                        target="_blank"
                        className="bg-white/10 hover:bg-white/20 text-gray-300 p-2 rounded-xl text-xs transition-colors"
                        title="View Live Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB: YOUTUBE VIDEO SLIDES (URL COPY & PASTE METHOD)
            ========================================================================= */}
        {activeTab === 'youtube' && (
          <div className="space-y-8 max-w-6xl">
            {/* Header & Subtitle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2.5">
                  <span className="p-2 bg-red-600/20 text-red-500 rounded-xl border border-red-500/30">
                    <Video className="w-5 h-5" />
                  </span>
                  <span>YouTube Video Slides Manager (URL Copy-Paste Method)</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Manage high-definition YouTube video slide carousels across all 14 robot product pages. Paste any YouTube URL for instant auto-embed, live player preview, and slide customization.
                </p>
              </div>

              <button
                onClick={() => {
                  const currentData = getProductData(selectedVideoRobotId);
                  setDrawerInitialTab('videos');
                  setEditingProduct(currentData);
                }}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap"
              >
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Open in Full Robot Customizer</span>
              </button>
            </div>

            {/* ROBOT SELECTOR CHIPS */}
            <div className="bg-[#12151f] border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Select Robot to Edit Video Slides:
                </span>
                <span className="text-xs text-cyan-400 font-mono">
                  Currently Editing: <strong className="text-white">{getProductData(selectedVideoRobotId).name}</strong> ({selectedVideoRobotId})
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {productList.map((prod) => {
                  const isSelected = prod.id === selectedVideoRobotId;
                  const count = (getProductData(prod.id).youtubeVideos || []).length;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => setSelectedVideoRobotId(prod.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-red-600/20 border-red-500 text-white shadow-lg shadow-red-500/10'
                          : 'bg-[#181c28] border-white/5 text-gray-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{prod.id}</div>
                      <div className="text-xs font-bold truncate text-white">{prod.name.replace('HUTARK ', '')}</div>
                      <div className="text-[10px] text-gray-400 mt-1 flex items-center space-x-1">
                        <Video className="w-3 h-3 text-red-400" />
                        <span>{count} slide{count === 1 ? '' : 's'}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PRIMARY URL COPY-PASTE METHOD SECTION */}
            <div className="bg-gradient-to-br from-red-950/60 via-[#181a24] to-[#12151e] border-2 border-red-500/50 p-6 rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-white font-bold text-sm">
                  <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      Paste YouTube Video Link for {getProductData(selectedVideoRobotId).name}
                    </h3>
                    <p className="text-xs text-gray-400 font-light">
                      Supports direct YouTube URLs (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  Instant Auto-Embed
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={adminVideoUrlInput}
                    onChange={(e) => setAdminVideoUrlInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddVideoUrl();
                      }
                    }}
                    placeholder="Paste YouTube video link here: https://www.youtube.com/watch?v=..."
                    className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-xs text-cyan-300 placeholder-gray-500 focus:outline-none focus:border-red-500 font-mono shadow-inner"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddVideoUrl}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-red-500/25 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Video Slide</span>
                </button>
              </div>
            </div>

            {/* ACTIVE VIDEO SLIDES LIST */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <span>Active Video Slides for {getProductData(selectedVideoRobotId).name}</span>
                    <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded text-cyan-300">
                      {activeVideoSlides.length}
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    These slides appear automatically under the product specifications on the live product page.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleAddBlankSlide}
                    className="bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border border-white/10 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Blank Slide</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveAllVideoSlides}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Video Slides</span>
                  </button>
                </div>
              </div>

              {activeVideoSlides.length === 0 ? (
                <div className="p-12 text-center bg-[#12151f] border border-white/10 rounded-2xl space-y-3">
                  <Video className="w-10 h-10 text-gray-600 mx-auto" />
                  <p className="text-sm font-semibold text-gray-300">No Video Slides Added Yet</p>
                  <p className="text-xs text-gray-500 max-w-md mx-auto">
                    Paste a YouTube link in the red box above to add high-definition operational demonstration videos to this product page.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {activeVideoSlides.map((slide, idx) => {
                    const videoId = extractYouTubeId(slide.id);
                    const isDirectVideo = slide.id?.endsWith('.mp4') || slide.id?.endsWith('.webm') || slide.id?.includes('/uploads/');

                    return (
                      <div
                        key={idx}
                        className="bg-[#12151f] border border-white/10 rounded-2xl p-5 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between shadow-lg"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-white/10 pb-3">
                            <span className="text-xs font-bold text-cyan-400 flex items-center space-x-2">
                              <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-400 flex items-center justify-center text-[10px]">
                                {idx + 1}
                              </span>
                              <span>SLIDE {String(idx + 1).padStart(2, '0')}</span>
                            </span>

                            <button
                              type="button"
                              onClick={() => handleDeleteVideoSlide(idx)}
                              className="text-gray-400 hover:text-red-400 text-xs font-semibold flex items-center space-x-1 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>

                          {/* Live 16:9 YouTube Player Preview */}
                          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-inner">
                            {isDirectVideo ? (
                              <video src={slide.id} controls className="w-full h-full object-contain" />
                            ) : videoId ? (
                              <iframe
                                src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
                                title={slide.title}
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 space-y-2">
                                <Video className="w-8 h-8 opacity-40" />
                                <span className="text-xs font-mono">Paste a valid YouTube link below</span>
                              </div>
                            )}
                          </div>

                          {/* YouTube URL Copy-Paste Input Field */}
                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                              YouTube Video URL (Copy & Paste)
                            </label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={slide.id.startsWith('http') || slide.id.startsWith('/') ? slide.id : `https://www.youtube.com/watch?v=${slide.id}`}
                                onChange={(e) => handleUpdateSlideField(idx, 'id', extractYouTubeId(e.target.value) || e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="flex-1 bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-cyan-300 font-mono focus:border-red-500 focus:outline-none"
                              />
                              {!isDirectVideo && videoId && (
                                <a
                                  href={`https://www.youtube.com/watch?v=${videoId}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-2 bg-white/5 hover:bg-white/15 rounded-xl text-gray-300 hover:text-white transition-colors"
                                  title="Test on YouTube"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Slide Title */}
                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                              Slide Title
                            </label>
                            <input
                              type="text"
                              value={slide.title}
                              onChange={(e) => handleUpdateSlideField(idx, 'title', e.target.value)}
                              placeholder="e.g. Field Dexterity Test"
                              className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                            />
                          </div>

                          {/* Category Badge */}
                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                              Category Badge
                            </label>
                            <input
                              type="text"
                              value={slide.category}
                              onChange={(e) => handleUpdateSlideField(idx, 'category', e.target.value)}
                              placeholder="e.g. Real-World Field Demo"
                              className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-cyan-400 focus:border-cyan-400 focus:outline-none"
                            />
                          </div>

                          {/* Description */}
                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                              Description
                            </label>
                            <textarea
                              rows={2}
                              value={slide.description}
                              onChange={(e) => handleUpdateSlideField(idx, 'description', e.target.value)}
                              placeholder="Describe what the robot is performing in this demonstration..."
                              className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-gray-300 focus:border-cyan-400 focus:outline-none resize-none"
                            />
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[10px] text-gray-500 font-mono">
                            Video ID: {videoId || 'N/A'}
                          </span>
                          <button
                            type="button"
                            onClick={handleSaveAllVideoSlides}
                            className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Save Slide</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: HOME PAGE EDITOR
            ========================================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-8 max-w-5xl">
            <div>
              <h2 className="text-xl font-bold text-white">Home Page Content & Media Editor</h2>
              <p className="text-xs text-gray-400">
                Upload images or videos via drag & drop, configure headlines, product showcases, and interactive intelligence cards.
              </p>
            </div>

            {/* 1. HERO SLIDES */}
            <div className="bg-[#12151f] border border-white/10 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Hero Panoramic Banner Slides ({siteContent.home.heroSlides.length})</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Drag and drop panoramic images or video reels for the full-bleed hero carousel.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newSlides = [
                      ...siteContent.home.heroSlides,
                      {
                        title: 'New Innovation Banner',
                        titleFormatted: 'New Innovation <br /> Breakthrough Showcase',
                        img: '/uploads/images/20261103/710faba11315ce158d297edc209d14bf.png',
                        link: '/products'
                      }
                    ];
                    setSiteContent({
                      ...siteContent,
                      home: { ...siteContent.home, heroSlides: newSlides }
                    });
                  }}
                  className="bg-blue-600/30 hover:bg-blue-600/50 text-cyan-300 border border-blue-500/40 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Slide</span>
                </button>
              </div>

              <div className="space-y-6">
                {siteContent.home.heroSlides.map((slide, idx) => (
                  <div key={idx} className="bg-black/40 border border-white/10 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
                      <span>Slide #{idx + 1}</span>
                      {siteContent.home.heroSlides.length > 1 && (
                        <button
                          onClick={() => {
                            const newSlides = siteContent.home.heroSlides.filter((_, i) => i !== idx);
                            setSiteContent({
                              ...siteContent,
                              home: { ...siteContent.home, heroSlides: newSlides }
                            });
                          }}
                          className="text-gray-500 hover:text-red-400 flex items-center space-x-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-6">
                        <MediaUploadZone
                          label={`Slide #${idx + 1} Image / Video Asset`}
                          description="Drag & drop high-res banner image or MP4 video file from File Manager"
                          value={slide.img}
                          onChange={(url) => {
                            const newSlides = [...siteContent.home.heroSlides];
                            newSlides[idx] = { ...newSlides[idx], img: url };
                            setSiteContent({
                              ...siteContent,
                              home: { ...siteContent.home, heroSlides: newSlides }
                            });
                          }}
                          mediaType="any"
                        />
                      </div>

                      <div className="lg:col-span-6 space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Headline Title</label>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => {
                              const newSlides = [...siteContent.home.heroSlides];
                              newSlides[idx] = { ...newSlides[idx], title: e.target.value };
                              setSiteContent({
                                ...siteContent,
                                home: { ...siteContent.home, heroSlides: newSlides }
                              });
                            }}
                            className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">
                            Formatted HTML Title (Allows &lt;br /&gt;)
                          </label>
                          <input
                            type="text"
                            value={slide.titleFormatted}
                            onChange={(e) => {
                              const newSlides = [...siteContent.home.heroSlides];
                              newSlides[idx] = { ...newSlides[idx], titleFormatted: e.target.value };
                              setSiteContent({
                                ...siteContent,
                                home: { ...siteContent.home, heroSlides: newSlides }
                              });
                            }}
                            className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Target Link</label>
                          <input
                            type="text"
                            value={slide.link}
                            onChange={(e) => {
                              const newSlides = [...siteContent.home.heroSlides];
                              newSlides[idx] = { ...newSlides[idx], link: e.target.value };
                              setSiteContent({
                                ...siteContent,
                                home: { ...siteContent.home, heroSlides: newSlides }
                              });
                            }}
                            placeholder="/products/A3Ultra"
                            className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-3 py-2 text-xs text-cyan-300 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. EMBODIED INTELLIGENCE CARDS */}
            <div className="bg-[#12151f] border border-white/10 rounded-2xl p-6 space-y-6">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Video className="w-4 h-4 text-cyan-400" />
                <span>Embodied Intelligence Cards (3 Pillars)</span>
              </h3>

              <div className="space-y-6">
                {siteContent.home.intelligences.map((intel, idx) => (
                  <div key={idx} className="bg-black/40 border border-white/10 rounded-xl p-5 space-y-4">
                    <span className="text-xs font-bold text-cyan-400">Card 0{idx + 1} — {intel.title}</span>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-6 space-y-4">
                        <MediaUploadZone
                          label="Background Video (.mp4 / .webm)"
                          description="Drag & drop background loop video from file manager"
                          value={intel.video}
                          onChange={(url) => {
                            const newIntels = [...siteContent.home.intelligences];
                            newIntels[idx] = { ...newIntels[idx], video: url };
                            setSiteContent({
                              ...siteContent,
                              home: { ...siteContent.home, intelligences: newIntels }
                            });
                          }}
                          mediaType="video"
                        />

                        <MediaUploadZone
                          label="Video Poster Image"
                          description="Fallback cover image for video"
                          value={intel.poster}
                          onChange={(url) => {
                            const newIntels = [...siteContent.home.intelligences];
                            newIntels[idx] = { ...newIntels[idx], poster: url };
                            setSiteContent({
                              ...siteContent,
                              home: { ...siteContent.home, intelligences: newIntels }
                            });
                          }}
                          mediaType="image"
                        />
                      </div>

                      <div className="lg:col-span-6 space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Section Title</label>
                          <input
                            type="text"
                            value={intel.title}
                            onChange={(e) => {
                              const newIntels = [...siteContent.home.intelligences];
                              newIntels[idx] = { ...newIntels[idx], title: e.target.value };
                              setSiteContent({
                                ...siteContent,
                                home: { ...siteContent.home, intelligences: newIntels }
                              });
                            }}
                            className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Subtitle</label>
                          <input
                            type="text"
                            value={intel.subtitle}
                            onChange={(e) => {
                              const newIntels = [...siteContent.home.intelligences];
                              newIntels[idx] = { ...newIntels[idx], subtitle: e.target.value };
                              setSiteContent({
                                ...siteContent,
                                home: { ...siteContent.home, intelligences: newIntels }
                              });
                            }}
                            className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-3 py-2 text-xs text-blue-300"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Description Copy</label>
                          <textarea
                            rows={3}
                            value={intel.desc}
                            onChange={(e) => {
                              const newIntels = [...siteContent.home.intelligences];
                              newIntels[idx] = { ...newIntels[idx], desc: e.target.value };
                              setSiteContent({
                                ...siteContent,
                                home: { ...siteContent.home, intelligences: newIntels }
                              });
                            }}
                            className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-3 py-2 text-xs text-gray-300 leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. FEATURED PRODUCTS GRID */}
            <div className="bg-[#12151f] border border-white/10 rounded-2xl p-6 space-y-6">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Featured Products Showcase (Home Page Grid)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {siteContent.home.productsGrid.map((p, idx) => (
                  <div key={idx} className="bg-black/40 border border-white/10 rounded-xl p-4 space-y-3">
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) => {
                        const newGrid = [...siteContent.home.productsGrid];
                        newGrid[idx] = { ...newGrid[idx], name: e.target.value };
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, productsGrid: newGrid }
                        });
                      }}
                      className="w-full bg-[#1b202c] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                    />

                    <MediaUploadZone
                      label="Card Photo"
                      value={p.img}
                      onChange={(url) => {
                        const newGrid = [...siteContent.home.productsGrid];
                        newGrid[idx] = { ...newGrid[idx], img: url };
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, productsGrid: newGrid }
                        });
                      }}
                      mediaType="image"
                    />

                    <input
                      type="text"
                      value={p.link}
                      onChange={(e) => {
                        const newGrid = [...siteContent.home.productsGrid];
                        newGrid[idx] = { ...newGrid[idx], link: e.target.value };
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, productsGrid: newGrid }
                        });
                      }}
                      className="w-full bg-[#1b202c] border border-white/15 rounded-lg px-2.5 py-1 text-[11px] text-cyan-300 font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: R & D / TECH PAGE EDITOR
            ========================================================================= */}
        {activeTab === 'rd' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-xl font-bold text-white">R & D / Technology Architecture Editor</h2>
              <p className="text-xs text-gray-400">
                Configure research pillars, Link-U OS specifications, and bio-inspired hardware highlights.
              </p>
            </div>

            <div className="bg-[#12151f] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white">Hero Header</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Badge</label>
                  <input
                    type="text"
                    value={siteContent.rd.badge}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        rd: { ...siteContent.rd, badge: e.target.value }
                      })
                    }
                    className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Headline</label>
                  <input
                    type="text"
                    value={siteContent.rd.heroTitle}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        rd: { ...siteContent.rd, heroTitle: e.target.value }
                      })
                    }
                    className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={siteContent.rd.heroDesc}
                  onChange={(e) =>
                    setSiteContent({
                      ...siteContent,
                      rd: { ...siteContent.rd, heroDesc: e.target.value }
                    })
                  }
                  className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-3 py-2 text-xs text-gray-300"
                />
              </div>
            </div>

            {/* 4 Pillars */}
            <div className="bg-[#12151f] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white">Four R & D Pillars</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {siteContent.rd.pillars.map((pil, idx) => (
                  <div key={idx} className="bg-black/40 border border-white/10 rounded-xl p-4 space-y-3">
                    <input
                      type="text"
                      value={pil.title}
                      onChange={(e) => {
                        const newPillars = [...siteContent.rd.pillars];
                        newPillars[idx] = { ...newPillars[idx], title: e.target.value };
                        setSiteContent({
                          ...siteContent,
                          rd: { ...siteContent.rd, pillars: newPillars }
                        });
                      }}
                      className="w-full bg-[#1b202c] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                    />

                    <input
                      type="text"
                      value={pil.subtitle}
                      onChange={(e) => {
                        const newPillars = [...siteContent.rd.pillars];
                        newPillars[idx] = { ...newPillars[idx], subtitle: e.target.value };
                        setSiteContent({
                          ...siteContent,
                          rd: { ...siteContent.rd, pillars: newPillars }
                        });
                      }}
                      className="w-full bg-[#1b202c] border border-white/15 rounded-lg px-2.5 py-1 text-xs text-cyan-300 font-semibold"
                    />

                    <textarea
                      rows={3}
                      value={pil.desc}
                      onChange={(e) => {
                        const newPillars = [...siteContent.rd.pillars];
                        newPillars[idx] = { ...newPillars[idx], desc: e.target.value };
                        setSiteContent({
                          ...siteContent,
                          rd: { ...siteContent.rd, pillars: newPillars }
                        });
                      }}
                      className="w-full bg-[#1b202c] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: ABOUT PAGE EDITOR
            ========================================================================= */}
        {activeTab === 'about' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-xl font-bold text-white">About Page Content & Leadership Editor</h2>
              <p className="text-xs text-gray-400">
                Update company vision, mission values, historical timeline milestones, and executive leadership profiles.
              </p>
            </div>

            {/* Core Values */}
            <div className="bg-[#12151f] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white">Core Values</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {siteContent.about.coreValues.map((val, idx) => (
                  <div key={idx} className="bg-black/40 border border-white/10 rounded-xl p-4 space-y-2">
                    <input
                      type="text"
                      value={val.title}
                      onChange={(e) => {
                        const updated = [...siteContent.about.coreValues];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setSiteContent({
                          ...siteContent,
                          about: { ...siteContent.about, coreValues: updated }
                        });
                      }}
                      className="w-full bg-[#1b202c] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                    />
                    <textarea
                      rows={2}
                      value={val.desc}
                      onChange={(e) => {
                        const updated = [...siteContent.about.coreValues];
                        updated[idx] = { ...updated[idx], desc: e.target.value };
                        setSiteContent({
                          ...siteContent,
                          about: { ...siteContent.about, coreValues: updated }
                        });
                      }}
                      className="w-full bg-[#1b202c] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-[#12151f] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white">Company Milestones</h3>
              <div className="space-y-3">
                {siteContent.about.milestones.map((m, idx) => (
                  <div key={idx} className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <input
                      type="text"
                      value={m.year}
                      onChange={(e) => {
                        const updated = [...siteContent.about.milestones];
                        updated[idx] = { ...updated[idx], year: e.target.value };
                        setSiteContent({
                          ...siteContent,
                          about: { ...siteContent.about, milestones: updated }
                        });
                      }}
                      className="w-24 bg-[#1b202c] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-cyan-400 font-bold font-mono"
                    />
                    <input
                      type="text"
                      value={m.title}
                      onChange={(e) => {
                        const updated = [...siteContent.about.milestones];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setSiteContent({
                          ...siteContent,
                          about: { ...siteContent.about, milestones: updated }
                        });
                      }}
                      className="flex-1 bg-[#1b202c] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white font-bold"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership Profiles */}
            <div className="bg-[#12151f] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white">Executive Leadership Team</h3>
              <div className="space-y-4">
                {siteContent.about.leadership.map((lead, idx) => (
                  <div key={idx} className="bg-black/40 border border-white/10 rounded-xl p-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={lead.name}
                        onChange={(e) => {
                          const updated = [...siteContent.about.leadership];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          setSiteContent({
                            ...siteContent,
                            about: { ...siteContent.about, leadership: updated }
                          });
                        }}
                        placeholder="Executive Name"
                        className="w-full bg-[#1b202c] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white font-bold"
                      />
                      <input
                        type="text"
                        value={lead.role}
                        onChange={(e) => {
                          const updated = [...siteContent.about.leadership];
                          updated[idx] = { ...updated[idx], role: e.target.value };
                          setSiteContent({
                            ...siteContent,
                            about: { ...siteContent.about, leadership: updated }
                          });
                        }}
                        placeholder="Title / Role"
                        className="w-full bg-[#1b202c] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-cyan-300"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={lead.bio}
                      onChange={(e) => {
                        const updated = [...siteContent.about.leadership];
                        updated[idx] = { ...updated[idx], bio: e.target.value };
                        setSiteContent({
                          ...siteContent,
                          about: { ...siteContent.about, leadership: updated }
                        });
                      }}
                      placeholder="Executive Biography"
                      className="w-full bg-[#1b202c] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: GLOBAL BRANDING & THEME
            ========================================================================= */}
        {activeTab === 'global' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="text-xl font-bold text-white">Global Branding & Theme Settings</h2>
              <p className="text-xs text-gray-400">
                Configure corporate identity, brand logo upload, global typography, accent color, and legal copyright.
              </p>
            </div>

            <div className="bg-[#12151f] border border-white/10 rounded-2xl p-6 space-y-6">
              {/* Site Logo Drag & Drop */}
              <MediaUploadZone
                label="Official Site Logo"
                description="Drag & drop PNG/SVG logo with transparent background"
                value={siteContent.global.logoUrl}
                onChange={(url) =>
                  setSiteContent({
                    ...siteContent,
                    global: { ...siteContent.global, logoUrl: url }
                  })
                }
                mediaType="image"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Site Name / Brand Title</label>
                  <input
                    type="text"
                    value={siteContent.global.siteName}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        global: { ...siteContent.global, siteName: e.target.value }
                      })
                    }
                    className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Global Font Family</label>
                  <input
                    type="text"
                    value={siteContent.global.fontFamily}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        global: { ...siteContent.global, fontFamily: e.target.value }
                      })
                    }
                    className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Primary Accent Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={siteContent.global.accentColor}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          global: { ...siteContent.global, accentColor: e.target.value }
                        })
                      }
                      className="w-9 h-9 rounded-xl border-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={siteContent.global.accentColor}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          global: { ...siteContent.global, accentColor: e.target.value }
                        })
                      }
                      className="w-32 bg-[#1b202c] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Contact Support Email</label>
                  <input
                    type="email"
                    value={siteContent.global.contactEmail}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        global: { ...siteContent.global, contactEmail: e.target.value }
                      })
                    }
                    className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Footer Copyright Notice</label>
                <input
                  type="text"
                  value={siteContent.global.footerCopyright}
                  onChange={(e) =>
                    setSiteContent({
                      ...siteContent,
                      global: { ...siteContent.global, footerCopyright: e.target.value }
                    })
                  }
                  className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetSiteContent}
                  className="text-xs text-red-400 hover:text-red-300 flex items-center space-x-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Site Content to Factory Default</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: CENTRAL MEDIA DROPZONE / FILE MANAGER
            ========================================================================= */}
        {activeTab === 'media' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-xl font-bold text-white">Central Media Upload Dropzone</h2>
              <p className="text-xs text-gray-400">
                Drag and drop any files (images, diagrams, videos, icons) directly from Windows File Explorer onto this dropzone. Files are auto-stored into <code className="text-cyan-300">/uploads/user_uploaded/</code>.
              </p>
            </div>

            <div className="bg-[#12151f] border border-white/10 rounded-2xl p-6 space-y-6">
              <MediaUploadZone
                label="Direct Media Dropzone"
                description="Drop any image (PNG, JPG, WebP, SVG) or video (MP4, WebM) here to get instant permanent public URL"
                value=""
                onChange={(newUrl) => {
                  if (newUrl) {
                    setUploadedFiles((prev) => [newUrl, ...prev]);
                  }
                }}
                mediaType="any"
              />

              {/* Uploaded Gallery */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Recently Uploaded In This Session ({uploadedFiles.length})
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {uploadedFiles.map((f, i) => (
                      <div key={i} className="bg-black/50 border border-white/10 rounded-xl p-3 space-y-2">
                        <div className="relative h-28 w-full bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                          {f.includes('.mp4') || f.includes('.webm') ? (
                            <video src={f} controls className="w-full h-full object-contain" />
                          ) : (
                            <Image src={f} alt="Uploaded" fill className="object-contain p-1" unoptimized />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-400 font-mono truncate max-w-[140px]">{f}</span>
                          <button
                            onClick={() => handleCopy(f)}
                            className="text-[11px] bg-blue-600/30 hover:bg-blue-600 text-cyan-300 hover:text-white px-2 py-1 rounded-lg transition-colors flex items-center space-x-1"
                          >
                            {copiedUrl === f ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedUrl === f ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 7: ADMIN SECURITY & CREDENTIALS
            ========================================================================= */}
        {activeTab === 'security' && (
          <div className="space-y-6 max-w-xl">
            <div>
              <h2 className="text-xl font-bold text-white">Admin Authentication & Security</h2>
              <p className="text-xs text-gray-400">
                Change your secret Admin ID and password to protect website editing privileges.
              </p>
            </div>

            <div className="bg-[#12151f] border border-white/10 rounded-2xl p-6 space-y-6">
              <form onSubmit={handleUpdateCreds} className="space-y-4">
                {credNotice && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${
                      credNotice.success
                        ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                        : 'bg-red-950/60 border border-red-500/40 text-red-300'
                    }`}
                  >
                    {credNotice.success ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span>{credNotice.msg}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">New Admin ID / Username</label>
                  <input
                    type="text"
                    value={newAdminId}
                    onChange={(e) => setNewAdminId(e.target.value)}
                    placeholder="Enter new Admin ID"
                    required
                    className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min. 4 characters)"
                    required
                    className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md cursor-pointer"
                >
                  Update Admin Credentials
                </button>
              </form>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">Current Session:</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out & Lock System</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL IN-PAGE ROBOT EDITOR DRAWER */}
      {editingProduct && (
        <AdminProductEditorDrawer
          product={editingProduct}
          isOpen={!!editingProduct}
          initialTab={drawerInitialTab}
          onClose={() => setEditingProduct(null)}
          onProductUpdated={(updated) => {
            setEditingProduct(null);
            setCustomizedList((prev) => ({ ...prev, [updated.id]: true }));
            setSaveNotice(`Saved changes for ${updated.name}!`);
            setTimeout(() => setSaveNotice(null), 3000);
          }}
        />
      )}
    </div>
  );
}
