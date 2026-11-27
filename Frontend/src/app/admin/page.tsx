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
  Play,
  Inbox,
  ShoppingCart,
  PackageCheck,
  PhoneCall,
  MessageSquare,
  Clock,
  Filter,
  Sparkles,
  CheckCheck,
  UserCheck,
  X,
  Edit3,
  Briefcase,
  Users,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductData } from '../../types';
import { adminAuth } from '../../services/adminAuth';
import { inquiryStore, InquiryItem, InquiryType, InquiryStatus } from '../../services/inquiryStore';
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
  LeaderProfile,
  DexterousHandItem
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

type AdminTab = 'products' | 'products_page' | 'inquiries' | 'videos' | 'home' | 'rd' | 'about' | 'global' | 'media' | 'security';

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

  // Product Looping Videos Manager State
  const [selectedVideoRobotId, setSelectedVideoRobotId] = useState<string>('G2');

  // Central Media Manager State
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Security Credentials Update State
  const [newAdminId, setNewAdminId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [credNotice, setCredNotice] = useState<{ success: boolean; msg: string } | null>(null);

  // Inquiries & Orders Dashboard State
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryTypeFilter, setInquiryTypeFilter] = useState<string>('all');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('all');
  const [selectedInquiryModal, setSelectedInquiryModal] = useState<InquiryItem | null>(null);
  const [modalAdminNotes, setModalAdminNotes] = useState('');

  const productList = Object.values(PRODUCTS);

  useEffect(() => {
    // Subscribe to auth state
    const unsub = adminAuth.subscribe((auth) => {
      setIsAuthenticated(auth);
    });

    // Load site content
    setSiteContent(siteContentStore.getSiteContent());

    // Check URL tab query param
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab') as AdminTab;
      if (tabParam && ['products', 'products_page', 'inquiries', 'videos', 'home', 'rd', 'about', 'global', 'media', 'security'].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }

    // Load inquiries
    setInquiries(inquiryStore.getInquiries());

    // Subscribe to inquiry updates across the browser
    const handleInqUpdate = () => {
      setInquiries([...inquiryStore.getInquiries()]);
    };
    window.addEventListener('hutark_inquiries_updated', handleInqUpdate);

    // Load product statuses
    const statusMap: Record<string, boolean> = {};
    productList.forEach((p) => {
      statusMap[p.id] = isProductCustomized(p.id);
    });
    setCustomizedList(statusMap);

    return () => {
      unsub();
      window.removeEventListener('hutark_inquiries_updated', handleInqUpdate);
    };
  }, []);

  // Handlers for Inquiries & Orders
  const handleUpdateInquiryStatus = (id: string, status: InquiryStatus) => {
    inquiryStore.updateInquiryStatus(id, status);
    setInquiries([...inquiryStore.getInquiries()]);
    if (selectedInquiryModal && selectedInquiryModal.id === id) {
      setSelectedInquiryModal({ ...selectedInquiryModal, status });
    }
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm(`Delete inquiry / order #${id}? This action cannot be undone.`)) {
      inquiryStore.deleteInquiry(id);
      setInquiries([...inquiryStore.getInquiries()]);
      if (selectedInquiryModal && selectedInquiryModal.id === id) {
        setSelectedInquiryModal(null);
      }
    }
  };

  const handleOpenInquiryModal = (item: InquiryItem) => {
    setSelectedInquiryModal(item);
    setModalAdminNotes(item.adminNotes || '');
  };

  const handleSaveModalNotes = () => {
    if (!selectedInquiryModal) return;
    inquiryStore.updateInquiryNotes(selectedInquiryModal.id, modalAdminNotes);
    setSelectedInquiryModal({ ...selectedInquiryModal, adminNotes: modalAdminNotes });
    setInquiries([...inquiryStore.getInquiries()]);
    setSaveNotice(`Saved internal notes for #${selectedInquiryModal.id}`);
    setTimeout(() => setSaveNotice(null), 2500);
  };

  const handleMarkAllContacted = () => {
    inquiries.forEach((item) => {
      if (item.status === 'new' || item.status === 'in_review') {
        inquiryStore.updateInquiryStatus(item.id, 'contacted');
      }
    });
    setInquiries([...inquiryStore.getInquiries()]);
    setSaveNotice('Marked all pending inquiries as Contacted.');
    setTimeout(() => setSaveNotice(null), 2500);
  };

  const handleExportInquiries = () => {
    inquiryStore.exportToCSV();
  };

  const unreadInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

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
  // 1. LOCKED ADMIN LOGIN SCREEN (IF NOT AUTHENTICATED) - CLEAN WHITE UI
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900 flex items-center justify-center p-4">
        {/* Soft Decorative Ambient Gradient */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-100/60 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-md w-full bg-white border border-gray-200/90 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="text-center space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5 mx-auto group" title="Return to Website Homepage">
              <div className="relative h-11 w-9 flex-shrink-0">
                <Image
                  src="/images/hutark-mark.png"
                  alt="HUTARK"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-black text-3xl tracking-[0.18em] text-gray-900 group-hover:text-brand-blue transition-colors">
                HUTARK
              </span>
            </Link>
            <div className="pt-1">
              <h2 className="text-lg font-bold tracking-tight text-gray-900">Admin Portal</h2>
              <p className="text-xs text-gray-500 font-light mt-0.5">
                Restricted Access. Please authenticate with Admin ID &amp; Password.
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Admin ID</label>
              <input
                type="text"
                value={adminIdInput}
                onChange={(e) => setAdminIdInput(e.target.value)}
                placeholder="Enter Admin ID (default: admin)"
                autoFocus
                required
                className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter Password (default: admin)"
                  required
                  className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-brand-blue hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md text-sm cursor-pointer"
            >
              Sign In to Admin Studio
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 text-center">
            <Link href="/" className="text-xs text-gray-500 hover:text-brand-blue transition-colors">
              &larr; Return to Public Website
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
  // 2. AUTHENTICATED MASTER ADMIN STUDIO - CLEAN LIGHT ENTERPRISE UI
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#f8f9fc] text-gray-900 pt-16 pb-20">
      {/* Save Notification Toast */}
      {saveNotice && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-bold animate-fadeIn">
          <CheckCircle className="w-4 h-4" />
          <span>{saveNotice}</span>
        </div>
      )}

      {/* HEADER BAR */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="site-container py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center gap-2.5 group" title="Return to Website Homepage">
              <div className="relative h-9 w-7 flex-shrink-0">
                <Image
                  src="/images/hutark-mark.png"
                  alt="HUTARK"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-black text-2xl tracking-[0.18em] text-gray-900 group-hover:text-brand-blue transition-colors">
                HUTARK
              </span>
            </Link>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono px-2 py-0.5 rounded-full uppercase font-bold">
              Authenticated
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSaveSiteContent}
              className="bg-brand-blue hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Website Changes</span>
            </button>

            <button
              onClick={handleExportFullBackup}
              title="Download full JSON backup of website and product customizations"
              className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Backup</span>
            </button>

            <label
              title="Import JSON backup"
              className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restore</span>
              <input type="file" accept=".json" onChange={handleImportFullBackup} className="hidden" />
            </label>

            <Link
              href="/"
              target="_blank"
              className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock / Exit</span>
            </button>
          </div>
        </div>

        {/* CMS NAVIGATION TABS */}
        <div className="site-container overflow-x-auto no-scrollbar">
          <nav className="flex space-x-1.5 py-1.5 border-t border-gray-100 text-xs font-semibold">
            {[
              { id: 'products', label: 'Robot Matrix (14 Models)', icon: Cpu },
              { id: 'products_page', label: 'Products Fleet Page', icon: Layers },
              { 
                id: 'inquiries', 
                label: 'Orders & Inquiries', 
                icon: Inbox, 
                badgeCount: unreadInquiriesCount,
                highlight: true 
              },
              { id: 'videos', label: 'Product Looping Videos', icon: Video },
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
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer text-xs ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-sm font-bold'
                      : tab.highlight
                      ? 'text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {typeof tab.badgeCount === 'number' && tab.badgeCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                      {tab.badgeCount} New
                    </span>
                  )}
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
            {/* Quick banner linking to Products Fleet Page Editor */}
            <div className="bg-blue-50/70 border border-blue-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">Products Fleet Showcase Page (/products)</h3>
                  <p className="text-[11px] text-gray-500 font-light">Customize hero text, 5 KPI metrics, AGILINK dexterous hands, and procurement banner.</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('products_page')}
                  className="bg-brand-blue hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer flex items-center space-x-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Fleet Page</span>
                </button>
                <Link
                  href="/products"
                  target="_blank"
                  className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 text-xs font-semibold px-3 py-2 rounded-xl transition-colors flex items-center space-x-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Public</span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Robot Detail Pages Customizer</h2>
                <p className="text-xs text-gray-500 font-light">
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
                    className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                  />
                </div>

                <div className="flex items-center space-x-1 bg-white border border-gray-200 p-1 rounded-xl text-xs">
                  {['all', 'A Series', 'X Series', 'G Series', 'D Series', 'C Series'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSeries(s)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        selectedSeries === s ? 'bg-brand-blue text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
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
                    className="bg-white border border-gray-200/90 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                          {prod.series}
                        </span>
                        {isCustomized ? (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            Customized
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </div>

                      <div className="relative h-44 w-full bg-[#f8f9fc] rounded-xl flex items-center justify-center p-3 mb-4 border border-gray-100 overflow-hidden">
                        <Image
                          src={currentData.heroImg || prod.heroImg}
                          alt={prod.name}
                          fill
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>

                      <h3 className="text-base font-bold text-gray-900">{currentData.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{currentData.tagline}</p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 mt-4 flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setDrawerInitialTab('styles');
                          setEditingProduct(currentData);
                        }}
                        className="flex-1 bg-brand-blue hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Edit Page</span>
                      </button>

                      <button
                        onClick={() => {
                          setDrawerInitialTab('videos');
                          setEditingProduct(currentData);
                        }}
                        className="bg-blue-50 hover:bg-blue-100 text-brand-blue border border-blue-200 px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                        title="Edit Intro & Capability Looping Videos"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Videos</span>
                      </button>

                      <Link
                        href={`/products/${prod.id}`}
                        target="_blank"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 p-2 rounded-xl text-xs transition-colors"
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
            TAB: PRODUCTS FLEET PAGE SHOWCASE EDITOR (/products)
            ========================================================================= */}
        {activeTab === 'products_page' && (
          <div className="space-y-6 max-w-5xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <span className="p-2 bg-blue-50 text-brand-blue rounded-xl border border-blue-200">
                    <Layers className="w-5 h-5" />
                  </span>
                  <span>Products Fleet Page Editor (/products)</span>
                </h2>
                <p className="text-xs text-gray-500 font-light mt-1">
                  Manage the public All-Products fleet showcase page: Hero headline, 5 key performance metrics, AGILINK dexterous hands portfolio, and bottom enterprise procurement CTA.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Link
                  href="/products"
                  target="_blank"
                  className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Preview /products</span>
                </Link>
                <button
                  onClick={handleSaveSiteContent}
                  className="bg-brand-blue hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

            {/* 1. HERO SECTION */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-sm font-bold text-gray-900">1. Hero Headline &amp; Narrative</h3>
                <span className="text-[11px] text-gray-400 font-medium">Top Showcase Area</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={siteContent.productsPage?.heroTitle || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        productsPage: {
                          ...siteContent.productsPage,
                          heroTitle: e.target.value
                        }
                      })
                    }
                    placeholder="Autonomous Embodied Robots & Dexterous Platforms"
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Hero Subtitle / Description
                  </label>
                  <textarea
                    rows={3}
                    value={siteContent.productsPage?.heroDesc || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        productsPage: {
                          ...siteContent.productsPage,
                          heroDesc: e.target.value
                        }
                      })
                    }
                    placeholder="From flagship dynamic bipedal humanoids..."
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 font-light focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                  />
                </div>
              </div>
            </div>

            {/* 2. KPI METRICS BAR (5 METRICS) */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">2. Key Performance Metrics Bar (5 KPIs)</h3>
                  <p className="text-[11px] text-gray-500 font-light mt-0.5">Displayed prominently right below the hero headline</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const current = siteContent.productsPage?.kpiStats || [];
                    const updated = [...current, { value: 'New Stat', label: 'Metric Description' }];
                    setSiteContent({
                      ...siteContent,
                      productsPage: {
                        ...siteContent.productsPage,
                        kpiStats: updated
                      }
                    });
                  }}
                  className="text-xs text-brand-blue hover:text-blue-700 font-bold flex items-center space-x-1 cursor-pointer"
                >
                  <span>+ Add Metric</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {(siteContent.productsPage?.kpiStats || []).map((stat, sIdx) => (
                  <div key={sIdx} className="bg-[#f8f9fc] border border-gray-200/80 rounded-2xl p-3.5 space-y-2 relative group">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (siteContent.productsPage?.kpiStats || []).filter((_, i) => i !== sIdx);
                        setSiteContent({
                          ...siteContent,
                          productsPage: {
                            ...siteContent.productsPage,
                            kpiStats: updated
                          }
                        });
                      }}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove Metric"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <label className="text-[10px] font-semibold text-gray-400 block mb-1">Value (e.g. 14 Models)</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const updated = [...(siteContent.productsPage?.kpiStats || [])];
                          updated[sIdx] = { ...updated[sIdx], value: e.target.value };
                          setSiteContent({
                            ...siteContent,
                            productsPage: {
                              ...siteContent.productsPage,
                              kpiStats: updated
                            }
                          });
                        }}
                        className="w-full bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-900 font-black font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-gray-400 block mb-1">Label / Description</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...(siteContent.productsPage?.kpiStats || [])];
                          updated[sIdx] = { ...updated[sIdx], label: e.target.value };
                          setSiteContent({
                            ...siteContent,
                            productsPage: {
                              ...siteContent.productsPage,
                              kpiStats: updated
                            }
                          });
                        }}
                        className="w-full bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 text-[11px] text-gray-600 font-medium"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. DEXTEROUS HANDS SHOWCASE */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">3. AGILINK Dexterous Hands Hardware Showcase</h3>
                  <p className="text-[11px] text-gray-500 font-light mt-0.5">Section header and individual dexterous end-effector units</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const current = siteContent.productsPage?.handsList || [];
                    const newHand: DexterousHandItem = {
                      id: `hand-${Date.now()}`,
                      name: 'OmniHand New',
                      series: 'AGILINK Series',
                      dof: '16 Active DoF',
                      payload: '10.0 kg Grip Force',
                      tactile: 'Dynamic Tactile Arrays',
                      img: '/uploads/images/20261029/a8f6153c54f1851135bef57ff7a62e92.png',
                      desc: 'Advanced anthropomorphic robotic hand with dense sensor arrays.',
                      features: ['High-torque actuators', 'Integrated CAN-FD interface']
                    };
                    setSiteContent({
                      ...siteContent,
                      productsPage: {
                        ...siteContent.productsPage,
                        handsList: [...current, newHand]
                      }
                    });
                  }}
                  className="bg-blue-50 text-brand-blue hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition-colors cursor-pointer self-start"
                >
                  <span>+ Add Dexterous Hand</span>
                </button>
              </div>

              {/* Section titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Section Tag / Subheading</label>
                  <input
                    type="text"
                    value={siteContent.productsPage?.handsSubheading || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        productsPage: {
                          ...siteContent.productsPage,
                          handsSubheading: e.target.value
                        }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Section Heading</label>
                  <input
                    type="text"
                    value={siteContent.productsPage?.handsHeading || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        productsPage: {
                          ...siteContent.productsPage,
                          handsHeading: e.target.value
                        }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-bold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Section Description</label>
                  <input
                    type="text"
                    value={siteContent.productsPage?.handsDesc || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        productsPage: {
                          ...siteContent.productsPage,
                          handsDesc: e.target.value
                        }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 font-light"
                  />
                </div>
              </div>

              {/* Hands List Cards */}
              <div className="space-y-4 pt-2">
                {(siteContent.productsPage?.handsList || []).map((hand, hIdx) => (
                  <div key={hand.id || hIdx} className="bg-[#f8f9fc] border border-gray-200/80 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 rounded-full bg-brand-blue text-white text-[11px] font-bold flex items-center justify-center">
                          {hIdx + 1}
                        </span>
                        <span className="font-bold text-sm text-gray-900">{hand.name}</span>
                        <span className="text-[10px] bg-white text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">{hand.series}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (siteContent.productsPage?.handsList || []).filter((_, i) => i !== hIdx);
                          setSiteContent({
                            ...siteContent,
                            productsPage: {
                              ...siteContent.productsPage,
                              handsList: updated
                            }
                          });
                        }}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] font-semibold text-gray-600 block mb-1">Hand Name</label>
                        <input
                          type="text"
                          value={hand.name}
                          onChange={(e) => {
                            const updated = [...(siteContent.productsPage?.handsList || [])];
                            updated[hIdx] = { ...updated[hIdx], name: e.target.value };
                            setSiteContent({
                              ...siteContent,
                              productsPage: { ...siteContent.productsPage, handsList: updated }
                            });
                          }}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-gray-600 block mb-1">Series Tag</label>
                        <input
                          type="text"
                          value={hand.series}
                          onChange={(e) => {
                            const updated = [...(siteContent.productsPage?.handsList || [])];
                            updated[hIdx] = { ...updated[hIdx], series: e.target.value };
                            setSiteContent({
                              ...siteContent,
                              productsPage: { ...siteContent.productsPage, handsList: updated }
                            });
                          }}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-gray-600 block mb-1">Articulation (DoF)</label>
                        <input
                          type="text"
                          value={hand.dof}
                          onChange={(e) => {
                            const updated = [...(siteContent.productsPage?.handsList || [])];
                            updated[hIdx] = { ...updated[hIdx], dof: e.target.value };
                            setSiteContent({
                              ...siteContent,
                              productsPage: { ...siteContent.productsPage, handsList: updated }
                            });
                          }}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-gray-600 block mb-1">Grip Force / Payload</label>
                        <input
                          type="text"
                          value={hand.payload}
                          onChange={(e) => {
                            const updated = [...(siteContent.productsPage?.handsList || [])];
                            updated[hIdx] = { ...updated[hIdx], payload: e.target.value };
                            setSiteContent({
                              ...siteContent,
                              productsPage: { ...siteContent.productsPage, handsList: updated }
                            });
                          }}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-gray-600 block mb-1">Tactile Sensor Spec</label>
                        <input
                          type="text"
                          value={hand.tactile}
                          onChange={(e) => {
                            const updated = [...(siteContent.productsPage?.handsList || [])];
                            updated[hIdx] = { ...updated[hIdx], tactile: e.target.value };
                            setSiteContent({
                              ...siteContent,
                              productsPage: { ...siteContent.productsPage, handsList: updated }
                            });
                          }}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-brand-blue font-semibold"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <MediaUploadZone
                          label="Hand Unit Photograph (Drag & Drop, Select from Folder, or Browse)"
                          description="High-resolution end-effector render or photograph"
                          value={hand.img}
                          onChange={(url) => {
                            const updated = [...(siteContent.productsPage?.handsList || [])];
                            updated[hIdx] = { ...updated[hIdx], img: url };
                            setSiteContent({
                              ...siteContent,
                              productsPage: { ...siteContent.productsPage, handsList: updated }
                            });
                          }}
                          mediaType="image"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label className="text-[11px] font-semibold text-gray-600 block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={hand.desc}
                          onChange={(e) => {
                            const updated = [...(siteContent.productsPage?.handsList || [])];
                            updated[hIdx] = { ...updated[hIdx], desc: e.target.value };
                            setSiteContent({
                              ...siteContent,
                              productsPage: { ...siteContent.productsPage, handsList: updated }
                            });
                          }}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700 font-light"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-semibold text-gray-600">Bullet Features</label>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(siteContent.productsPage?.handsList || [])];
                              const curFeat = updated[hIdx].features || [];
                              updated[hIdx] = { ...updated[hIdx], features: [...curFeat, 'New Feature Spec'] };
                              setSiteContent({
                                ...siteContent,
                                productsPage: { ...siteContent.productsPage, handsList: updated }
                              });
                            }}
                            className="text-[10px] text-brand-blue hover:text-blue-700 font-bold cursor-pointer"
                          >
                            + Add Feature
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {(hand.features || []).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center space-x-1.5 bg-white border border-gray-200 rounded-xl px-2.5 py-1">
                              <input
                                type="text"
                                value={feat}
                                onChange={(e) => {
                                  const updated = [...(siteContent.productsPage?.handsList || [])];
                                  const curFeat = [...(updated[hIdx].features || [])];
                                  curFeat[fIdx] = e.target.value;
                                  updated[hIdx] = { ...updated[hIdx], features: curFeat };
                                  setSiteContent({
                                    ...siteContent,
                                    productsPage: { ...siteContent.productsPage, handsList: updated }
                                  });
                                }}
                                className="flex-1 text-xs text-gray-700 outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...(siteContent.productsPage?.handsList || [])];
                                  const curFeat = (updated[hIdx].features || []).filter((_, i) => i !== fIdx);
                                  updated[hIdx] = { ...updated[hIdx], features: curFeat };
                                  setSiteContent({
                                    ...siteContent,
                                    productsPage: { ...siteContent.productsPage, handsList: updated }
                                  });
                                }}
                                className="text-gray-400 hover:text-red-500 cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. SPEC MATRIX TABLE HEADINGS */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-sm font-bold text-gray-900">4. Comparison Matrix Section Headings</h3>
                <p className="text-[11px] text-gray-500 font-light mt-0.5">The table compares all 14 robot models dynamically; customize the header text below</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tag / Subheading</label>
                  <input
                    type="text"
                    value={siteContent.productsPage?.tableSubheading || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        productsPage: {
                          ...siteContent.productsPage,
                          tableSubheading: e.target.value
                        }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Table Heading</label>
                  <input
                    type="text"
                    value={siteContent.productsPage?.tableHeading || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        productsPage: {
                          ...siteContent.productsPage,
                          tableHeading: e.target.value
                        }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-bold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Table Description</label>
                  <input
                    type="text"
                    value={siteContent.productsPage?.tableDesc || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        productsPage: {
                          ...siteContent.productsPage,
                          tableDesc: e.target.value
                        }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 font-light"
                  />
                </div>
              </div>
            </div>

            {/* 5. BOTTOM ENTERPRISE CTA BANNER */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-sm font-bold text-gray-900">5. Bottom Enterprise Procurement CTA Banner</h3>
                <p className="text-[11px] text-gray-500 font-light mt-0.5">Customizable conversion banner at the bottom of the fleet page</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={siteContent.productsPage?.ctaBadge || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        productsPage: {
                          ...siteContent.productsPage,
                          ctaBadge: e.target.value
                        }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Banner Heading</label>
                  <input
                    type="text"
                    value={siteContent.productsPage?.ctaHeading || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        productsPage: {
                          ...siteContent.productsPage,
                          ctaHeading: e.target.value
                        }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Banner Description</label>
                  <textarea
                    rows={2}
                    value={siteContent.productsPage?.ctaDesc || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        productsPage: {
                          ...siteContent.productsPage,
                          ctaDesc: e.target.value
                        }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 font-light"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Primary Button Text</label>
                  <input
                    type="text"
                    value={siteContent.productsPage?.ctaPrimaryBtnText || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        productsPage: {
                          ...siteContent.productsPage,
                          ctaPrimaryBtnText: e.target.value
                        }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Primary Button Link</label>
                  <input
                    type="text"
                    value={siteContent.productsPage?.ctaPrimaryBtnLink || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        productsPage: {
                          ...siteContent.productsPage,
                          ctaPrimaryBtnLink: e.target.value
                        }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Secondary Button Text</label>
                  <input
                    type="text"
                    value={siteContent.productsPage?.ctaSecondaryBtnText || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        productsPage: {
                          ...siteContent.productsPage,
                          ctaSecondaryBtnText: e.target.value
                        }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Secondary Button Link</label>
                  <input
                    type="text"
                    value={siteContent.productsPage?.ctaSecondaryBtnLink || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        productsPage: {
                          ...siteContent.productsPage,
                          ctaSecondaryBtnLink: e.target.value
                        }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Save Button Bar */}
            <div className="flex items-center justify-end space-x-3 pt-4">
              <Link
                href="/products"
                target="_blank"
                className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Live Page</span>
              </Link>
              <button
                onClick={handleSaveSiteContent}
                className="bg-brand-blue hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save All Fleet Page Changes</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: CUSTOMER INQUIRIES & PRODUCT ORDERS DASHBOARD
            Receives all Buy Me orders, Product inquiries, Contact forms, and Careers
            ========================================================================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            {/* Header & Subtitle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2.5">
                  <span className="p-2 bg-blue-50 text-brand-blue rounded-xl border border-blue-200">
                    <Inbox className="w-5 h-5" />
                  </span>
                  <span>Customer Inquiries &amp; Product Procurement Orders</span>
                </h2>
                <p className="text-xs text-gray-500 font-light mt-1">
                  Centralized inbox receiving all user submissions across the website: &quot;BUY ME&quot; robot orders, product page inquiries, commercial contact requests, and career applications.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportInquiries}
                  className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Export to CSV</span>
                </button>

                <button
                  type="button"
                  onClick={handleMarkAllContacted}
                  className="bg-blue-50 hover:bg-blue-100 text-brand-blue border border-blue-200 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark All Pending as Contacted</span>
                </button>
              </div>
            </div>

            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-1 shadow-sm">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Total Submissions</span>
                <div className="text-2xl font-black text-gray-900">{inquiries.length}</div>
                <div className="text-[10px] text-gray-400">All-time queries &amp; orders</div>
              </div>

              <div className="bg-white border border-amber-300 rounded-2xl p-5 space-y-1 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Action Required</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                </div>
                <div className="text-2xl font-black text-amber-600">{unreadInquiriesCount}</div>
                <div className="text-[10px] text-amber-600/80">Pending review &amp; reply</div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-1 shadow-sm">
                <span className="text-[11px] font-bold text-brand-blue uppercase tracking-wider">BUY ME Orders</span>
                <div className="text-2xl font-black text-brand-blue">
                  {inquiries.filter((i) => i.type === 'buy_me_order').length}
                </div>
                <div className="text-[10px] text-gray-400">Direct robot procurement</div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-1 shadow-sm">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Resolved / Done</span>
                <div className="text-2xl font-black text-emerald-600">
                  {inquiries.filter((i) => i.status === 'completed' || i.status === 'contacted').length}
                </div>
                <div className="text-[10px] text-gray-400">Contacted or completed</div>
              </div>
            </div>

            {/* Search & Filter Toolbar */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 shadow-sm">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Search Box */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    placeholder="Search by customer name, company, email, phone, model or ID..."
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue focus:bg-white transition-all"
                  />
                  {inquirySearch && (
                    <button
                      onClick={() => setInquirySearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Status Dropdown Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={inquiryStatusFilter}
                    onChange={(e) => setInquiryStatusFilter(e.target.value)}
                    className="bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue cursor-pointer"
                  >
                    <option value="all">All Statuses ({inquiries.length})</option>
                    <option value="new">New ({inquiries.filter((i) => i.status === 'new').length})</option>
                    <option value="in_review">In Review ({inquiries.filter((i) => i.status === 'in_review').length})</option>
                    <option value="contacted">Contacted ({inquiries.filter((i) => i.status === 'contacted').length})</option>
                    <option value="completed">Completed ({inquiries.filter((i) => i.status === 'completed').length})</option>
                  </select>
                </div>
              </div>

              {/* Type Category Filter Pills (No Emojis) */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100 text-xs">
                {[
                  { id: 'all', label: 'All Submissions', icon: Inbox, count: inquiries.length },
                  {
                    id: 'buy_me_order',
                    label: 'BUY ME Orders',
                    icon: ShoppingCart,
                    count: inquiries.filter((i) => i.type === 'buy_me_order').length,
                  },
                  {
                    id: 'product_inquiry',
                    label: 'Product Inquiries',
                    icon: Cpu,
                    count: inquiries.filter((i) => i.type === 'product_inquiry').length,
                  },
                  {
                    id: 'contact_form',
                    label: 'Contact Submissions',
                    icon: Mail,
                    count: inquiries.filter((i) => i.type === 'contact_form').length,
                  },
                  {
                    id: 'career_application',
                    label: 'Job Applications',
                    icon: Briefcase,
                    count: inquiries.filter((i) => i.type === 'career_application').length,
                  },
                ].map((f) => {
                  const Icon = f.icon;
                  const isSelected = inquiryTypeFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setInquiryTypeFilter(f.id)}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-brand-blue text-white font-bold shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{f.label}</span>
                      <span className="ml-1 opacity-75 font-mono text-[11px]">({f.count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inquiries List View */}
            <div className="space-y-4">
              {(() => {
                const q = inquirySearch.toLowerCase();
                const filtered = inquiries.filter((item) => {
                  const matchesSearch =
                    !q ||
                    item.name.toLowerCase().includes(q) ||
                    item.company.toLowerCase().includes(q) ||
                    item.email.toLowerCase().includes(q) ||
                    (item.phone && item.phone.toLowerCase().includes(q)) ||
                    (item.productName && item.productName.toLowerCase().includes(q)) ||
                    item.id.toLowerCase().includes(q) ||
                    (item.message && item.message.toLowerCase().includes(q));

                  const matchesType = inquiryTypeFilter === 'all' || item.type === inquiryTypeFilter;
                  const matchesStatus = inquiryStatusFilter === 'all' || item.status === inquiryStatusFilter;

                  return matchesSearch && matchesType && matchesStatus;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-3 shadow-sm">
                      <Inbox className="w-12 h-12 text-gray-400 mx-auto" />
                      <h4 className="text-base font-bold text-gray-700">No Submissions Found</h4>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto font-light">
                        No customer inquiries or robot orders match your active search or filter criteria.
                      </p>
                      <button
                        onClick={() => {
                          setInquirySearch('');
                          setInquiryTypeFilter('all');
                          setInquiryStatusFilter('all');
                        }}
                        className="text-xs text-brand-blue hover:underline font-bold"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  );
                }

                return filtered.map((item) => {
                  const isNew = item.status === 'new';

                  return (
                    <div
                      key={item.id}
                      className={`bg-white rounded-2xl p-5 border transition-all space-y-4 shadow-sm ${
                        isNew
                          ? 'border-amber-300 ring-1 ring-amber-200/50'
                          : 'border-gray-200/90 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      {/* Top Row: ID, Badges, Status Changer, Timestamp */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200">
                            #{item.id}
                          </span>

                          {/* Type Badge */}
                          {item.type === 'buy_me_order' && (
                            <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider">
                              <ShoppingCart className="w-3 h-3 text-amber-600" />
                              <span>BUY ME Order</span>
                            </span>
                          )}
                          {item.type === 'product_inquiry' && (
                            <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-blue-50 text-brand-blue border border-blue-200 uppercase tracking-wider">
                              <Cpu className="w-3 h-3 text-brand-blue" />
                              <span>Product Detail Inquiry</span>
                            </span>
                          )}
                          {item.type === 'contact_form' && (
                            <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                              <Mail className="w-3 h-3 text-emerald-600" />
                              <span>Contact Page Form</span>
                            </span>
                          )}
                          {item.type === 'career_application' && (
                            <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 uppercase tracking-wider">
                              <Briefcase className="w-3 h-3 text-purple-600" />
                              <span>Career Application</span>
                            </span>
                          )}

                          {item.deploymentTier && (
                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono text-purple-700 bg-purple-50 border border-purple-200">
                              Tier: {item.deploymentTier}
                            </span>
                          )}
                        </div>

                        {/* Status Selector & Timestamp */}
                        <div className="flex items-center space-x-3">
                          <span className="text-[11px] text-gray-400 flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                          </span>

                          <select
                            value={item.status}
                            onChange={(e) => handleUpdateInquiryStatus(item.id, e.target.value as InquiryStatus)}
                            className={`text-xs font-bold px-3 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                              item.status === 'new'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : item.status === 'in_review'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : item.status === 'contacted'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}
                          >
                            <option value="new">Status: New</option>
                            <option value="in_review">Status: In Review</option>
                            <option value="contacted">Status: Contacted</option>
                            <option value="completed">Status: Completed</option>
                          </select>
                        </div>
                      </div>

                      {/* Main Data Columns */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* Customer Info */}
                        <div className="md:col-span-4 space-y-1.5">
                          <div className="flex items-center space-x-2">
                            <UserCheck className="w-4 h-4 text-brand-blue" />
                            <span className="text-sm font-bold text-gray-900">{item.name}</span>
                          </div>
                          <div className="text-xs text-gray-600 flex items-center space-x-2 pl-6">
                            <span>{item.company}</span>
                          </div>
                          <div className="text-xs text-gray-600 flex items-center space-x-2 pl-6">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            <a href={`mailto:${item.email}`} className="text-brand-blue hover:underline font-mono">
                              {item.email}
                            </a>
                          </div>
                          {item.phone && (
                            <div className="text-xs text-gray-600 flex items-center space-x-2 pl-6">
                              <PhoneCall className="w-3.5 h-3.5 text-gray-400" />
                              <span className="font-mono">{item.phone}</span>
                            </div>
                          )}
                        </div>

                        {/* Order & Requirements Details */}
                        <div className="md:col-span-8 space-y-2">
                          {item.productName && (
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-semibold text-gray-500">Robot Target:</span>
                              <span className="text-xs font-bold text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded-md border border-gray-200">
                                {item.productName}
                              </span>
                            </div>
                          )}

                          {item.message && (
                            <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-3 text-xs text-gray-700 font-light leading-relaxed">
                              {item.message}
                            </div>
                          )}

                          {item.adminNotes && (
                            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-800 space-y-1">
                              <span className="font-bold text-[10px] uppercase text-amber-700 flex items-center space-x-1">
                                <Edit3 className="w-3 h-3" />
                                <span>Internal Notes:</span>
                              </span>
                              <p className="font-light">{item.adminNotes}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Action Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleOpenInquiryModal(item)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1.5 transition-colors border border-gray-200"
                          >
                            <FileText className="w-3.5 h-3.5 text-brand-blue" />
                            <span>View Full Details &amp; Notes</span>
                          </button>

                          <a
                            href={`mailto:${item.email}?subject=RE: HUTARK Inquiry #${item.id} - ${item.productName || 'Robotics Deployment'}&body=Hello ${item.name},%0D%0A%0D%0AThank you for contacting HUTARK regarding ${item.productName || 'our robots'}.`}
                            className="bg-blue-50 hover:bg-blue-100 text-brand-blue font-bold px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1.5 transition-colors border border-blue-200"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Direct Email Reply</span>
                          </a>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteInquiry(item.id)}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg text-xs transition-colors"
                          title="Delete submission"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: PRODUCT LOOPING VIDEOS MANAGER (SECTION 2 & SECTION 3)
            ========================================================================= */}
        {activeTab === 'videos' && (() => {
          const targetProd = getProductData(selectedVideoRobotId);
          const currentSlides = targetProd.featureSlides || [
            {
              title: targetProd.cinematicHeading || '24/7 Autonomous Operation · Your Reliable Around-the-Clock Partner',
              video: targetProd.cinematicVideo || '/static/index/en/video/index2/index2_One-v1.mp4',
              image: targetProd.cinematicImg || targetProd.heroImg,
              tags: ['360° All-Domain Perception', '700 TOPS Full-Performance Compute'],
            },
            {
              title: targetProd.manipulationHeading || 'Versatile Task Execution · A Capable Autonomous Partner',
              video: '/static/index/en/video/index2/index2_One-v2.mp4',
              image: targetProd.heroImg,
              tags: ['Perception-Control Fusion', 'Sub-Millimeter Dexterous Manipulation'],
            },
            {
              title: targetProd.interactionHeading || 'Comprehensive Safety · A Trusted, Gentle Companion',
              video: '/static/index/en/video/index2/index2_One-v3.mp4',
              image: targetProd.heroImg,
              tags: ['Four-Layer Safety Protection', 'Proprietary Carbon Fiber-Reinforced Composite'],
            },
          ];

          const notifySaved = (msg: string) => {
            setCustomizedList((prev) => ({ ...prev, [selectedVideoRobotId]: true }));
            setSaveNotice(msg);
            setTimeout(() => setSaveNotice(null), 3000);
          };

          const updateTargetSlides = (nextSlides: typeof currentSlides) => {
            saveProductData({ ...targetProd, featureSlides: nextSlides });
            setCustomizedList((prev) => ({ ...prev, [selectedVideoRobotId]: true }));
          };

          return (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Product Looping Videos Manager</h2>
                  <p className="text-xs text-gray-500 font-light">
                    Manage looping MP4/WebM videos for Section 2 (Ambient Intro) and Section 3 (Capability Carousel) via drag &amp; drop or file manager.
                  </p>
                </div>

                {/* Robot Model Selector */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold text-gray-700">Target Robot:</span>
                  <select
                    value={selectedVideoRobotId}
                    onChange={(e) => setSelectedVideoRobotId(e.target.value)}
                    className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  >
                    {productList.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.id})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Robot Switcher Pills */}
              <div className="flex flex-wrap gap-2">
                {productList.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedVideoRobotId(p.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                      selectedVideoRobotId === p.id
                        ? 'bg-brand-blue text-white border-brand-blue shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {p.name.replace('HUTARK ', '')}
                  </button>
                ))}
              </div>

              {/* SECTION 1: HERO WATCH VIDEO MODAL */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                    <Video className="w-4 h-4 text-brand-blue" />
                    <span>Section 1 — Hero &quot;Click to Watch Video&quot; Modal ({targetProd.name})</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Opens when clicking &quot;Click to Watch Video&quot; in the {targetProd.name} hero. Supports MP4/WebM upload or video link.
                  </p>
                </div>

                <MediaUploadZone
                  label={`Hero Showcase Video for ${targetProd.name}`}
                  description="Drag & drop video file, select from file manager, or select from folder"
                  placeholder="Drop hero video here, browse file manager, or select from folder"
                  value={targetProd.heroVideo || ''}
                  onChange={(url) => {
                    saveProductData({ ...targetProd, heroVideo: url });
                    notifySaved(`Updated Section 1 hero video for ${targetProd.name}`);
                  }}
                  mediaType="video"
                  allowUrlToggle={true}
                />
              </div>

              {/* SECTION 2: AMBIENT INTRO LOOPING VIDEO */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                    <Video className="w-4 h-4 text-brand-blue" />
                    <span>Section 2 — Full-Bleed Ambient Intro Looping Video ({targetProd.name})</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Plays automatically in a continuous muted loop behind the centered product introduction heading.
                  </p>
                </div>

                <MediaUploadZone
                  label="Intro Looping Video (MP4 / WebM / MOV)"
                  description="Drag & drop video file, select from file manager, or select from folder"
                  placeholder="Drop looping intro video here, browse file manager, or select from folder"
                  value={targetProd.cinematicVideo || '/static/index/en/video/index2/index2_One-v1.mp4'}
                  onChange={(url) => {
                    saveProductData({ ...targetProd, cinematicVideo: url });
                    notifySaved(`Updated Section 2 looping video for ${targetProd.name}`);
                  }}
                  mediaType="video"
                  allowUrlToggle={true}
                />
              </div>

              {/* SECTION 3: CAPABILITY CAROUSEL LOOPING VIDEO SLIDES */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                    <Plus className="w-4 h-4 text-brand-blue" />
                    <span>Section 3 — Add Capability Carousel Looping Video Slide</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const next = [
                        ...currentSlides,
                        {
                          title: `${targetProd.name} Autonomous Capability`,
                          video: '/static/index/en/video/index2/index2_One-v1.mp4',
                          image: targetProd.cinematicImg || targetProd.heroImg,
                          tags: ['360° All-Domain Perception', 'Continuous Loop Operation'],
                        },
                      ];
                      updateTargetSlides(next);
                      notifySaved(`Added new capability video slide to ${targetProd.name}`);
                    }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-3 py-1.5 rounded-xl text-xs transition-colors border border-gray-200 flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Blank Slide</span>
                  </button>
                </div>

                <MediaUploadZone
                  label="Quick Add Video Slide (Drag & Drop or Select from File Manager)"
                  description="Drop MP4/WebM file, browse file manager, or select from folder to add a new looping slide"
                  placeholder="Drop video here, browse file manager, or select from folder"
                  value=""
                  onChange={(url) => {
                    if (!url) return;
                    const next = [
                      ...currentSlides,
                      {
                        title: `${targetProd.name} Capability ${currentSlides.length + 1}`,
                        video: url,
                        image: targetProd.cinematicImg || targetProd.heroImg,
                        tags: ['Autonomous Operation', 'Real-Time Control'],
                      },
                    ];
                    updateTargetSlides(next);
                    notifySaved(`Added new looping video slide to ${targetProd.name}`);
                  }}
                  mediaType="video"
                  allowUrlToggle={true}
                />
              </div>

              {/* ACTIVE CAPABILITY SLIDES GRID */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Active Capability Looping Slides ({currentSlides.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const next = [
                        ...currentSlides,
                        {
                          title: `${targetProd.name} Autonomous Capability ${currentSlides.length + 1}`,
                          video: '/static/index/en/video/index2/index2_One-v1.mp4',
                          image: targetProd.cinematicImg || targetProd.heroImg,
                          tags: ['360° All-Domain Perception', 'Continuous Loop Operation'],
                        },
                      ];
                      updateTargetSlides(next);
                      notifySaved(`Added Slide #${next.length} to ${targetProd.name}`);
                    }}
                    className="bg-brand-blue hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Slide</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentSlides.map((slide, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all"
                    >
                      <div className="space-y-3">
                        <MediaUploadZone
                          label={`Slide #${idx + 1} Looping Video`}
                          value={slide.video || ''}
                          onChange={(url) => {
                            const next = [...currentSlides];
                            next[idx] = { ...slide, video: url };
                            updateTargetSlides(next);
                            notifySaved(`Updated video on Slide #${idx + 1}`);
                          }}
                          mediaType="video"
                        />

                        <div className="space-y-1">
                          <label className="block text-[11px] font-semibold text-gray-700">Slide Headline</label>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => {
                              const next = [...currentSlides];
                              next[idx] = { ...slide, title: e.target.value };
                              updateTargetSlides(next);
                            }}
                            className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 focus:bg-white focus:ring-1 focus:ring-brand-blue"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[11px] font-semibold text-gray-700">Highlight Tags (comma-separated)</label>
                          <input
                            type="text"
                            value={(slide.tags || []).join(', ')}
                            onChange={(e) => {
                              const next = [...currentSlides];
                              next[idx] = {
                                ...slide,
                                tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                              };
                              updateTargetSlides(next);
                            }}
                            className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700 focus:bg-white focus:ring-1 focus:ring-brand-blue"
                          />
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            const next = currentSlides.filter((_, i) => i !== idx);
                            updateTargetSlides(next);
                            notifySaved(`Removed Slide #${idx + 1}`);
                          }}
                          className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center space-x-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove Slide</span>
                        </button>
                        <span className="text-[10px] text-emerald-600 font-semibold">Auto-Looping</span>
                      </div>
                    </div>
                  ))}

                  {/* ADD NEW SLIDE CARD IN GRID */}
                  <button
                    type="button"
                    onClick={() => {
                      const next = [
                        ...currentSlides,
                        {
                          title: `${targetProd.name} Autonomous Capability ${currentSlides.length + 1}`,
                          video: '/static/index/en/video/index2/index2_One-v1.mp4',
                          image: targetProd.cinematicImg || targetProd.heroImg,
                          tags: ['360° All-Domain Perception', 'Continuous Loop Operation'],
                        },
                      ];
                      updateTargetSlides(next);
                      notifySaved(`Added Slide #${next.length} to ${targetProd.name}`);
                    }}
                    className="min-h-[320px] bg-gray-50 hover:bg-blue-50/40 border-2 border-dashed border-gray-300 hover:border-brand-blue rounded-2xl p-6 flex flex-col items-center justify-center space-y-3 text-gray-500 hover:text-brand-blue transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-200 group-hover:border-brand-blue flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Plus className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold">Add New Looping Slide</span>
                    <span className="text-xs text-gray-400 text-center max-w-[200px]">
                      Click to add a slide, then drag &amp; drop or choose video from file manager
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* =========================================================================
            TAB 4: HOME PAGE CONTENT EDITOR
            ========================================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-6 max-w-5xl">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Home Page Content &amp; Banners</h2>
              <p className="text-xs text-gray-500 font-light">
                Configure the top full-screen hero slideshow, the three embodied intelligence pillars, and latest corporate news.
              </p>
            </div>

            {/* 1. HERO SLIDESHOW */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                <Play className="w-4 h-4 text-brand-blue" />
                <span>Full-Screen Hero Slideshow ({siteContent.home.heroSlides.length} Slides)</span>
              </h3>

              <div className="space-y-6">
                {siteContent.home.heroSlides.map((slide, idx) => (
                  <div key={idx} className="bg-[#f8f9fc] border border-gray-200/80 rounded-2xl p-5 space-y-4">
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Slide 0{idx + 1}</span>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-6 space-y-2">
                        <MediaUploadZone
                          label="Slide Banner Image"
                          description="High-resolution 16:9 banner image"
                          value={slide.img}
                          onChange={(url) => {
                            const newSlides = [...siteContent.home.heroSlides];
                            newSlides[idx] = { ...newSlides[idx], img: url };
                            setSiteContent({
                              ...siteContent,
                              home: { ...siteContent.home, heroSlides: newSlides }
                            });
                          }}
                          mediaType="image"
                        />
                      </div>

                      <div className="lg:col-span-6 space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Headline Title</label>
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
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-bold focus:ring-1 focus:ring-brand-blue"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
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
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-mono focus:ring-1 focus:ring-brand-blue"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Target Link</label>
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
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-brand-blue font-mono focus:ring-1 focus:ring-brand-blue"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. EMBODIED INTELLIGENCE CARDS */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                <Video className="w-4 h-4 text-brand-blue" />
                <span>Embodied Intelligence Cards (3 Pillars)</span>
              </h3>

              <div className="space-y-6">
                {siteContent.home.intelligences.map((intel, idx) => (
                  <div key={idx} className="bg-[#f8f9fc] border border-gray-200/80 rounded-2xl p-5 space-y-4">
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Pillar 0{idx + 1} — {intel.title}</span>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-6 space-y-3">
                        <MediaUploadZone
                          label="Background Video (.mp4 / .webm)"
                          description="Drag & drop background loop video"
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
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Section Title</label>
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
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-bold focus:ring-1 focus:ring-brand-blue"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Subtitle</label>
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
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-brand-blue font-semibold focus:ring-1 focus:ring-brand-blue"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Description Copy</label>
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
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 font-light focus:ring-1 focus:ring-brand-blue"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: R & D / TECHNOLOGY ARCHITECTURE EDITOR
            ========================================================================= */}
        {activeTab === 'rd' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-xl font-bold text-gray-900">R &amp; D Architecture &amp; Innovation</h2>
              <p className="text-xs text-gray-500 font-light">
                Configure the technical pillars of Link-U OS, AHA3 modular actuators, and the GO-3 embodied neural system.
              </p>
            </div>

            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Hero Section Title</label>
                  <input
                    type="text"
                    value={siteContent.rd.heroTitle}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        rd: { ...siteContent.rd, heroTitle: e.target.value }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-bold focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Hero Description</label>
                  <textarea
                    rows={2}
                    value={siteContent.rd.heroDesc}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        rd: { ...siteContent.rd, heroDesc: e.target.value }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 font-light focus:bg-white"
                  />
                </div>
              </div>

              {/* Pillars */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-900">Core Technology Pillars</h3>
                <div className="space-y-4">
                  {siteContent.rd.pillars.map((pillar, idx) => (
                    <div key={idx} className="bg-[#f8f9fc] border border-gray-200/80 rounded-2xl p-5 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-gray-500 mb-1">Pillar Title</label>
                          <input
                            type="text"
                            value={pillar.title}
                            onChange={(e) => {
                              const newPillars = [...siteContent.rd.pillars];
                              newPillars[idx] = { ...newPillars[idx], title: e.target.value };
                              setSiteContent({
                                ...siteContent,
                                rd: { ...siteContent.rd, pillars: newPillars }
                              });
                            }}
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-gray-500 mb-1">Subtitle</label>
                          <input
                            type="text"
                            value={pillar.subtitle}
                            onChange={(e) => {
                              const newPillars = [...siteContent.rd.pillars];
                              newPillars[idx] = { ...newPillars[idx], subtitle: e.target.value };
                              setSiteContent({
                                ...siteContent,
                                rd: { ...siteContent.rd, pillars: newPillars }
                              });
                            }}
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-brand-blue font-semibold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-gray-500 mb-1">Technical Overview</label>
                        <textarea
                          rows={3}
                          value={pillar.desc}
                          onChange={(e) => {
                            const newPillars = [...siteContent.rd.pillars];
                            newPillars[idx] = { ...newPillars[idx], desc: e.target.value };
                            setSiteContent({
                              ...siteContent,
                              rd: { ...siteContent.rd, pillars: newPillars }
                            });
                          }}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 font-light"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: ABOUT PAGE CONTENT, CEO & LEADERSHIP TEAM EDITOR
            ========================================================================= */}
        {activeTab === 'about' && (
          <div className="space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">About Page Content &amp; Timeline Editor</h2>
                <p className="text-xs text-gray-500 font-light">
                  Manage About HUTARK Hero, Who We Are, Mission &amp; Vision, Corporate Values, Milestones, Awards &amp; Honors, Section Visibility, and SEO.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  href="/about"
                  target="_blank"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Preview</span>
                </Link>
                <button
                  type="button"
                  onClick={() => handleSaveSiteContent()}
                  className="bg-brand-blue hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save &amp; Publish</span>
                </button>
              </div>
            </div>

            {/* Section Visibility Controls */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 space-y-3 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900">Section Visibility</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: 'whoWeAre', label: 'Who We Are' },
                  { key: 'missionVision', label: 'Mission & Vision' },
                  { key: 'values', label: 'Our Values' },
                  { key: 'milestones', label: 'Milestones' },
                  { key: 'awards', label: 'Awards & Honors' },
                ].map((sec) => {
                  const vis = siteContent.about.sectionVisibility || {};
                  const checked =
                    sec.key === 'awards'
                      ? vis.awards === true
                      : (vis as Record<string, boolean | undefined>)[sec.key] !== false;
                  return (
                    <label
                      key={sec.key}
                      className="flex items-center space-x-2 bg-[#f8f9fc] border border-gray-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            about: {
                              ...siteContent.about,
                              sectionVisibility: {
                                ...vis,
                                [sec.key]: e.target.checked,
                              },
                            },
                          })
                        }
                        className="w-3.5 h-3.5 rounded text-brand-blue"
                      />
                      <span>{sec.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Hero & Who We Are Editor */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900">Hero &amp; Who We Are</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Hero Display Headline</label>
                  <input
                    type="text"
                    value={siteContent.about.heroTitle}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, heroTitle: e.target.value },
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 font-bold"
                  />
                </div>
                <MediaUploadZone
                  label="Hero Background Image (1920×1080 Recommended)"
                  value={siteContent.about.heroImg || ''}
                  onChange={(url) =>
                    setSiteContent({
                      ...siteContent,
                      about: { ...siteContent.about, heroImg: url },
                    })
                  }
                  mediaType="image"
                />
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Who We Are Heading</label>
                  <input
                    type="text"
                    value={siteContent.about.whoWeAreHeading || 'Who We Are'}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, whoWeAreHeading: e.target.value },
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Who We Are Narrative</label>
                  <textarea
                    rows={4}
                    value={siteContent.about.whoWeAreText || siteContent.about.heroDesc}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, whoWeAreText: e.target.value },
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-700 leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Mission & Vision Editor */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900">Mission &amp; Vision</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#f8f9fc] border border-gray-200 rounded-2xl p-4 space-y-2">
                  <label className="block text-[11px] font-bold text-gray-700">Mission Title</label>
                  <input
                    type="text"
                    value={siteContent.about.missionTitle || 'Our Mission'}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, missionTitle: e.target.value },
                      })
                    }
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 font-bold"
                  />
                  <label className="block text-[11px] font-bold text-gray-700 pt-1">Mission Statement</label>
                  <textarea
                    rows={3}
                    value={siteContent.about.missionStatement || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, missionStatement: e.target.value },
                      })
                    }
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700"
                  />
                </div>
                <div className="bg-[#f8f9fc] border border-gray-200 rounded-2xl p-4 space-y-2">
                  <label className="block text-[11px] font-bold text-gray-700">Vision Title</label>
                  <input
                    type="text"
                    value={siteContent.about.visionTitle || 'Our Vision'}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, visionTitle: e.target.value },
                      })
                    }
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 font-bold"
                  />
                  <label className="block text-[11px] font-bold text-gray-700 pt-1">Vision Statement</label>
                  <textarea
                    rows={3}
                    value={siteContent.about.visionStatement || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, visionStatement: e.target.value },
                      })
                    }
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Core Values CRUD */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">Corporate Values ({siteContent.about.coreValues.length})</h3>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [
                      ...siteContent.about.coreValues,
                      { title: 'New Value', desc: 'Supporting engineering value description.', statements: ['Supporting value point'], visible: true },
                    ];
                    setSiteContent({ ...siteContent, about: { ...siteContent.about, coreValues: updated } });
                  }}
                  className="bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Value</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {siteContent.about.coreValues.map((val, idx) => (
                  <div key={idx} className="bg-[#f8f9fc] border border-gray-200/80 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
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
                        className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 font-bold"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = siteContent.about.coreValues.filter((_, i) => i !== idx);
                          setSiteContent({ ...siteContent, about: { ...siteContent.about, coreValues: updated } });
                        }}
                        className="text-red-500 hover:text-red-700 p-1.5 cursor-pointer"
                        title="Delete Value"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-600 font-light"
                    />
                    <textarea
                      rows={2}
                      placeholder="Supporting bullet statements (one per line)"
                      value={(val.statements || []).join('\n')}
                      onChange={(e) => {
                        const updated = [...siteContent.about.coreValues];
                        updated[idx] = {
                          ...updated[idx],
                          statements: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
                        };
                        setSiteContent({
                          ...siteContent,
                          about: { ...siteContent.about, coreValues: updated }
                        });
                      }}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-[11px] text-gray-600"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones CRUD */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">Company Milestones ({siteContent.about.milestones.length})</h3>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [
                      { year: '2026', month: '01', title: 'New Milestone', desc: 'Verified company milestone details.', visible: true },
                      ...siteContent.about.milestones,
                    ];
                    setSiteContent({ ...siteContent, about: { ...siteContent.about, milestones: updated } });
                  }}
                  className="bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Milestone</span>
                </button>
              </div>
              <div className="space-y-3">
                {siteContent.about.milestones.map((m, idx) => (
                  <div key={idx} className="bg-[#f8f9fc] border border-gray-200/80 rounded-2xl p-4 space-y-2">
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      <input
                        type="text"
                        placeholder="Year"
                        value={m.year}
                        onChange={(e) => {
                          const updated = [...siteContent.about.milestones];
                          updated[idx] = { ...updated[idx], year: e.target.value };
                          setSiteContent({
                            ...siteContent,
                            about: { ...siteContent.about, milestones: updated }
                          });
                        }}
                        className="w-20 bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-brand-blue font-bold font-mono"
                      />
                      <input
                        type="text"
                        placeholder="Mo"
                        value={m.month || ''}
                        onChange={(e) => {
                          const updated = [...siteContent.about.milestones];
                          updated[idx] = { ...updated[idx], month: e.target.value };
                          setSiteContent({
                            ...siteContent,
                            about: { ...siteContent.about, milestones: updated }
                          });
                        }}
                        className="w-16 bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700 font-mono"
                      />
                      <input
                        type="text"
                        placeholder="Milestone Title"
                        value={m.title}
                        onChange={(e) => {
                          const updated = [...siteContent.about.milestones];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setSiteContent({
                            ...siteContent,
                            about: { ...siteContent.about, milestones: updated }
                          });
                        }}
                        className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 font-bold"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = siteContent.about.milestones.filter((_, i) => i !== idx);
                          setSiteContent({ ...siteContent, about: { ...siteContent.about, milestones: updated } });
                        }}
                        className="text-red-500 hover:text-red-700 p-1.5 cursor-pointer"
                        title="Delete Milestone"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Milestone description"
                      value={m.desc}
                      onChange={(e) => {
                        const updated = [...siteContent.about.milestones];
                        updated[idx] = { ...updated[idx], desc: e.target.value };
                        setSiteContent({
                          ...siteContent,
                          about: { ...siteContent.about, milestones: updated }
                        });
                      }}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-600"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Awards & Honors CRUD */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Awards &amp; Honors ({siteContent.about.awards?.length || 0})</h3>
                  <p className="text-[11px] text-gray-500">Hidden publicly unless Awards &amp; Honors visibility is checked above.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [
                      ...(siteContent.about.awards || []),
                      { title: 'Certification / Award Title', issuer: 'Issuing Body', year: '2026', desc: '', img: '', visible: true },
                    ];
                    setSiteContent({ ...siteContent, about: { ...siteContent.about, awards: updated } });
                  }}
                  className="bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Award</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(siteContent.about.awards || []).map((aw, idx) => (
                  <div key={idx} className="bg-[#f8f9fc] border border-gray-200/80 rounded-2xl p-4 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        placeholder="Award Title"
                        value={aw.title}
                        onChange={(e) => {
                          const updated = [...(siteContent.about.awards || [])];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setSiteContent({ ...siteContent, about: { ...siteContent.about, awards: updated } });
                        }}
                        className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 font-bold"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (siteContent.about.awards || []).filter((_, i) => i !== idx);
                          setSiteContent({ ...siteContent, about: { ...siteContent.about, awards: updated } });
                        }}
                        className="text-red-500 hover:text-red-700 p-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Issuer"
                        value={aw.issuer}
                        onChange={(e) => {
                          const updated = [...(siteContent.about.awards || [])];
                          updated[idx] = { ...updated[idx], issuer: e.target.value };
                          setSiteContent({ ...siteContent, about: { ...siteContent.about, awards: updated } });
                        }}
                        className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700"
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        value={aw.year}
                        onChange={(e) => {
                          const updated = [...(siteContent.about.awards || [])];
                          updated[idx] = { ...updated[idx], year: e.target.value };
                          setSiteContent({ ...siteContent, about: { ...siteContent.about, awards: updated } });
                        }}
                        className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700 font-mono"
                      />
                    </div>
                    <MediaUploadZone
                      label="Award / Certificate Image"
                      value={aw.img || ''}
                      onChange={(url) => {
                        const updated = [...(siteContent.about.awards || [])];
                        updated[idx] = { ...updated[idx], img: url };
                        setSiteContent({ ...siteContent, about: { ...siteContent.about, awards: updated } });
                      }}
                      mediaType="image"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 space-y-3 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900">About Page SEO Settings</h3>
              <input
                type="text"
                placeholder="SEO Title"
                value={siteContent.about.seoTitle || ''}
                onChange={(e) =>
                  setSiteContent({ ...siteContent, about: { ...siteContent.about, seoTitle: e.target.value } })
                }
                className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900"
              />
              <textarea
                rows={2}
                placeholder="Meta Description"
                value={siteContent.about.seoDescription || ''}
                onChange={(e) =>
                  setSiteContent({ ...siteContent, about: { ...siteContent.about, seoDescription: e.target.value } })
                }
                className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-700"
              />
            </div>

            {/* CEO Spotlight Editor */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-brand-blue" />
                  <span>CEO Spotlight &amp; Executive Philosophy</span>
                </h3>
                <span className="text-[11px] font-mono text-brand-blue bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  Featured Executive Card
                </span>
              </div>

              {/* CEO Portrait Media Upload Zone */}
              <div className="space-y-2">
                <MediaUploadZone
                  label="CEO Portrait / Keynote Photo (Upload, Drag & Drop, or URL)"
                  description="High-resolution executive portrait or keynote stage photography"
                  value={siteContent.about?.ceo?.img || '/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg'}
                  onChange={(url) => {
                    const currentCeo = siteContent.about?.ceo || {
                      name: 'Deng Taihua',
                      role: 'Chairman of the Board & Chief Executive Officer',
                      quote: '',
                      bio: '',
                      achievements: [],
                      img: '',
                      stats: []
                    };
                    setSiteContent({
                      ...siteContent,
                      about: {
                        ...siteContent.about,
                        ceo: { ...currentCeo, img: url }
                      }
                    });
                  }}
                  mediaType="image"
                />
              </div>

              <div className="bg-[#f8f9fc] border border-gray-200/80 rounded-2xl p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">CEO Full Name</label>
                    <input
                      type="text"
                      value={siteContent.about?.ceo?.name || 'Deng Taihua'}
                      onChange={(e) => {
                        const currentCeo = siteContent.about?.ceo || {
                          name: 'Deng Taihua',
                          role: 'Chairman of the Board & Chief Executive Officer',
                          quote: '',
                          bio: '',
                          achievements: [],
                          img: '/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg',
                          stats: []
                        };
                        setSiteContent({
                          ...siteContent,
                          about: {
                            ...siteContent.about,
                            ceo: { ...currentCeo, name: e.target.value }
                          }
                        });
                      }}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Executive Title</label>
                    <input
                      type="text"
                      value={siteContent.about?.ceo?.role || 'Chairman of the Board & Chief Executive Officer'}
                      onChange={(e) => {
                        const currentCeo = siteContent.about?.ceo || {
                          name: 'Deng Taihua',
                          role: 'Chairman of the Board & Chief Executive Officer',
                          quote: '',
                          bio: '',
                          achievements: [],
                          img: '/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg',
                          stats: []
                        };
                        setSiteContent({
                          ...siteContent,
                          about: {
                            ...siteContent.about,
                            ceo: { ...currentCeo, role: e.target.value }
                          }
                        });
                      }}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-brand-blue font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Executive Vision Quote</label>
                  <textarea
                    rows={3}
                    value={siteContent.about?.ceo?.quote || ''}
                    onChange={(e) => {
                      const currentCeo = siteContent.about?.ceo || {
                        name: 'Deng Taihua',
                        role: 'Chairman of the Board & Chief Executive Officer',
                        quote: '',
                        bio: '',
                        achievements: [],
                        img: '/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg',
                        stats: []
                      };
                      setSiteContent({
                        ...siteContent,
                        about: {
                          ...siteContent.about,
                          ceo: { ...currentCeo, quote: e.target.value }
                        }
                      });
                    }}
                    placeholder="Enter CEO visionary quote..."
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Executive Biography</label>
                  <textarea
                    rows={4}
                    value={siteContent.about?.ceo?.bio || ''}
                    onChange={(e) => {
                      const currentCeo = siteContent.about?.ceo || {
                        name: 'Deng Taihua',
                        role: 'Chairman of the Board & Chief Executive Officer',
                        quote: '',
                        bio: '',
                        achievements: [],
                        img: '/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg',
                        stats: []
                      };
                      setSiteContent({
                        ...siteContent,
                        about: {
                          ...siteContent.about,
                          ceo: { ...currentCeo, bio: e.target.value }
                        }
                      });
                    }}
                    placeholder="Enter CEO career and background narrative..."
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 font-light"
                  />
                </div>

                {/* CEO Key Stats / Metric Badges */}
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-gray-700">
                      CEO Spotlight Metric Badges
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const currentCeo = siteContent.about?.ceo || {
                          name: 'Deng Taihua',
                          role: 'Chairman of the Board & Chief Executive Officer',
                          quote: '',
                          bio: '',
                          achievements: [],
                          img: '/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg',
                          stats: []
                        };
                        const updatedStats = [...(currentCeo.stats || []), { label: 'New Metric', value: '100+' }];
                        setSiteContent({
                          ...siteContent,
                          about: {
                            ...siteContent.about,
                            ceo: { ...currentCeo, stats: updatedStats }
                          }
                        });
                      }}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-blue-50 text-brand-blue border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Metric</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {((siteContent.about?.ceo?.stats) || [
                      { label: "Robots Produced", value: "20,000+" },
                      { label: "Core AI Patents", value: "300+" },
                      { label: "R&D Engineers", value: "80%" }
                    ]).map((stat, sIdx) => (
                      <div key={sIdx} className="bg-white border border-gray-200 rounded-xl p-3 space-y-1.5 relative shadow-sm">
                        <button
                          type="button"
                          onClick={() => {
                            const currentCeo = siteContent.about?.ceo || {
                              name: 'Deng Taihua',
                              role: 'Chairman of the Board & Chief Executive Officer',
                              quote: '',
                              bio: '',
                              achievements: [],
                              img: '',
                              stats: []
                            };
                            const updatedStats = [...(currentCeo.stats || [])];
                            updatedStats.splice(sIdx, 1);
                            setSiteContent({
                              ...siteContent,
                              about: {
                                ...siteContent.about,
                                ceo: { ...currentCeo, stats: updatedStats }
                              }
                            });
                          }}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const currentCeo = siteContent.about?.ceo || {
                              name: 'Deng Taihua',
                              role: 'Chairman of the Board & Chief Executive Officer',
                              quote: '',
                              bio: '',
                              achievements: [],
                              img: '',
                              stats: []
                            };
                            const updatedStats = [...(currentCeo.stats || [])];
                            updatedStats[sIdx] = { ...updatedStats[sIdx], value: e.target.value };
                            setSiteContent({
                              ...siteContent,
                              about: {
                                ...siteContent.about,
                                ceo: { ...currentCeo, stats: updatedStats }
                              }
                            });
                          }}
                          placeholder="e.g. 20,000+"
                          className="w-24 bg-[#f8f9fc] border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-900 font-bold"
                        />
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const currentCeo = siteContent.about?.ceo || {
                              name: 'Deng Taihua',
                              role: 'Chairman of the Board & Chief Executive Officer',
                              quote: '',
                              bio: '',
                              achievements: [],
                              img: '',
                              stats: []
                            };
                            const updatedStats = [...(currentCeo.stats || [])];
                            updatedStats[sIdx] = { ...updatedStats[sIdx], label: e.target.value };
                            setSiteContent({
                              ...siteContent,
                              about: {
                                ...siteContent.about,
                                ceo: { ...currentCeo, stats: updatedStats }
                              }
                            });
                          }}
                          placeholder="Metric Name"
                          className="w-full bg-[#f8f9fc] border border-gray-200 rounded-lg px-2 py-1 text-[11px] text-gray-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* CEO Achievements List */}
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-gray-700">
                      Strategic Milestones Under Leadership
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const currentCeo = siteContent.about?.ceo || {
                          name: 'Deng Taihua',
                          role: 'Chairman of the Board & Chief Executive Officer',
                          quote: '',
                          bio: '',
                          achievements: [],
                          img: '',
                          stats: []
                        };
                        const updatedAch = [...(currentCeo.achievements || []), 'New Strategic Milestone'];
                        setSiteContent({
                          ...siteContent,
                          about: {
                            ...siteContent.about,
                            ceo: { ...currentCeo, achievements: updatedAch }
                          }
                        });
                      }}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-blue-50 text-brand-blue border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Milestone</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {((siteContent.about?.ceo?.achievements) || [
                      "Spearheaded HUTARK's scaling to 20,000+ general-purpose embodied robots produced",
                      "Architected global expansion across Asian, European, and North American industrial hubs",
                      "Pioneered enterprise deployments across Tier-1 automotive and cleanroom electronics sectors"
                    ]).map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={ach}
                          onChange={(e) => {
                            const currentCeo = siteContent.about?.ceo || {
                              name: 'Deng Taihua',
                              role: 'Chairman of the Board & Chief Executive Officer',
                              quote: '',
                              bio: '',
                              achievements: [],
                              img: '',
                              stats: []
                            };
                            const updatedAch = [...(currentCeo.achievements || [])];
                            updatedAch[aIdx] = e.target.value;
                            setSiteContent({
                              ...siteContent,
                              about: {
                                ...siteContent.about,
                                ceo: { ...currentCeo, achievements: updatedAch }
                              }
                            });
                          }}
                          className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const currentCeo = siteContent.about?.ceo || {
                              name: 'Deng Taihua',
                              role: 'Chairman of the Board & Chief Executive Officer',
                              quote: '',
                              bio: '',
                              achievements: [],
                              img: '',
                              stats: []
                            };
                            const updatedAch = [...(currentCeo.achievements || [])];
                            updatedAch.splice(aIdx, 1);
                            setSiteContent({
                              ...siteContent,
                              about: {
                                ...siteContent.about,
                                ceo: { ...currentCeo, achievements: updatedAch }
                              }
                            });
                          }}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Our Leadership & Engineering Team Editor */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                    <Users className="w-4 h-4 text-brand-blue" />
                    <span>Our Leadership &amp; Engineering Team</span>
                  </h3>
                  <p className="text-xs text-gray-500 font-light">
                    Configure portrait images, roles, bios, and credentials for all team leaders.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 font-mono">
                    {(siteContent.about?.leadership || []).length} Members
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const newMember = {
                        name: "New Team Member",
                        role: "Principal Systems Engineer",
                        department: "Robotics R&D",
                        bio: "Pioneering physical artificial intelligence and hardware-software integration for general-purpose humanoids.",
                        img: "/uploads/team/peng_zhihui.svg",
                        tags: ["Robotics", "Systems"],
                        education: "Ph.D. / M.S. in Engineering"
                      };
                      setSiteContent({
                        ...siteContent,
                        about: {
                          ...siteContent.about,
                          leadership: [...(siteContent.about?.leadership || []), newMember]
                        }
                      });
                    }}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-brand-blue hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Team Member</span>
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                {(siteContent.about?.leadership || []).map((lead, idx) => (
                  <div key={idx} className="bg-[#f8f9fc] border border-gray-200/80 rounded-2xl p-5 space-y-4">
                    {/* Member Header Bar */}
                    <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-blue-50 text-brand-blue border border-blue-200">
                          Member 0{idx + 1}
                        </span>
                        <span className="text-xs font-bold text-gray-900 truncate max-w-[200px]">
                          {lead.name}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1">
                        {idx > 0 && (
                          <button
                            type="button"
                            title="Move Up"
                            onClick={() => {
                              const updated = [...(siteContent.about?.leadership || [])];
                              const temp = updated[idx - 1];
                              updated[idx - 1] = updated[idx];
                              updated[idx] = temp;
                              setSiteContent({
                                ...siteContent,
                                about: { ...siteContent.about, leadership: updated }
                              });
                            }}
                            className="p-1 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {idx < (siteContent.about?.leadership || []).length - 1 && (
                          <button
                            type="button"
                            title="Move Down"
                            onClick={() => {
                              const updated = [...(siteContent.about?.leadership || [])];
                              const temp = updated[idx + 1];
                              updated[idx + 1] = updated[idx];
                              updated[idx] = temp;
                              setSiteContent({
                                ...siteContent,
                                about: { ...siteContent.about, leadership: updated }
                              });
                            }}
                            className="p-1 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          title="Delete Member"
                          onClick={() => {
                            const updated = [...(siteContent.about?.leadership || [])];
                            updated.splice(idx, 1);
                            setSiteContent({
                              ...siteContent,
                              about: { ...siteContent.about, leadership: updated }
                            });
                          }}
                          className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Member Image & Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      {/* Left: Image Upload & Preview */}
                      <div className="lg:col-span-5 space-y-3">
                        <MediaUploadZone
                          label="Portrait Photo (Upload or URL)"
                          description="Upload member photo, headshot, or paste SVG/image link"
                          value={lead.img || ''}
                          onChange={(url) => {
                            const updated = [...(siteContent.about?.leadership || [])];
                            updated[idx] = { ...updated[idx], img: url };
                            setSiteContent({
                              ...siteContent,
                              about: { ...siteContent.about, leadership: updated }
                            });
                          }}
                          mediaType="image"
                        />
                      </div>

                      {/* Right: Core Fields */}
                      <div className="lg:col-span-7 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] text-gray-600 mb-1">Full Name</label>
                            <input
                              type="text"
                              value={lead.name}
                              onChange={(e) => {
                                const updated = [...(siteContent.about?.leadership || [])];
                                updated[idx] = { ...updated[idx], name: e.target.value };
                                setSiteContent({
                                  ...siteContent,
                                  about: { ...siteContent.about, leadership: updated }
                                });
                              }}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900 font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-gray-600 mb-1">Title / Executive Role</label>
                            <input
                              type="text"
                              value={lead.role}
                              onChange={(e) => {
                                const updated = [...(siteContent.about?.leadership || [])];
                                updated[idx] = { ...updated[idx], role: e.target.value };
                                setSiteContent({
                                  ...siteContent,
                                  about: { ...siteContent.about, leadership: updated }
                                });
                              }}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-brand-blue font-semibold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] text-gray-600 mb-1">Department</label>
                            <input
                              type="text"
                              value={lead.department || ''}
                              onChange={(e) => {
                                const updated = [...(siteContent.about?.leadership || [])];
                                updated[idx] = { ...updated[idx], department: e.target.value };
                                setSiteContent({
                                  ...siteContent,
                                  about: { ...siteContent.about, leadership: updated }
                                });
                              }}
                              placeholder="e.g. Hardware Dynamics"
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-gray-600 mb-1">Education / Credentials</label>
                            <input
                              type="text"
                              value={lead.education || ''}
                              onChange={(e) => {
                                const updated = [...(siteContent.about?.leadership || [])];
                                updated[idx] = { ...updated[idx], education: e.target.value };
                                setSiteContent({
                                  ...siteContent,
                                  about: { ...siteContent.about, leadership: updated }
                                });
                              }}
                              placeholder="e.g. Ph.D. in Robotics, Stanford"
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] text-gray-600 mb-1">
                            Specialty Tags (Comma-separated)
                          </label>
                          <input
                            type="text"
                            value={(lead.tags || []).join(', ')}
                            onChange={(e) => {
                              const updated = [...(siteContent.about?.leadership || [])];
                              const tagsArray = e.target.value
                                .split(',')
                                .map((t) => t.trim())
                                .filter((t) => t.length > 0);
                              updated[idx] = { ...updated[idx], tags: tagsArray };
                              setSiteContent({
                                ...siteContent,
                                about: { ...siteContent.about, leadership: updated }
                              });
                            }}
                            placeholder="e.g. AHA3 Actuation, Bipedal Control, Embedded HW"
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Member Biography */}
                    <div>
                      <label className="block text-[11px] text-gray-600 mb-1">Biography Narrative</label>
                      <textarea
                        rows={3}
                        value={lead.bio}
                        onChange={(e) => {
                          const updated = [...(siteContent.about?.leadership || [])];
                          updated[idx] = { ...updated[idx], bio: e.target.value };
                          setSiteContent({
                            ...siteContent,
                            about: { ...siteContent.about, leadership: updated }
                          });
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 font-light"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Roles & Careers Editor */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-brand-blue" />
                  <span>Opening Roles (Careers Section)</span>
                </h3>
                <span className="text-xs text-gray-500 font-mono">
                  {(siteContent.about?.openRoles || []).length} Roles Active
                </span>
              </div>

              <div className="space-y-4">
                {(siteContent.about?.openRoles || []).map((role, idx) => (
                  <div key={role.id || idx} className="bg-[#f8f9fc] border border-gray-200/80 rounded-2xl p-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-gray-600 mb-1">Job Title</label>
                        <input
                          type="text"
                          value={role.title}
                          onChange={(e) => {
                            const updated = [...(siteContent.about?.openRoles || [])];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setSiteContent({
                              ...siteContent,
                              about: { ...siteContent.about, openRoles: updated }
                            });
                          }}
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-600 mb-1">Department</label>
                        <input
                          type="text"
                          value={role.department}
                          onChange={(e) => {
                            const updated = [...(siteContent.about?.openRoles || [])];
                            updated[idx] = { ...updated[idx], department: e.target.value };
                            setSiteContent({
                              ...siteContent,
                              about: { ...siteContent.about, openRoles: updated }
                            });
                          }}
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-brand-blue font-semibold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-gray-600 mb-1">Location</label>
                        <input
                          type="text"
                          value={role.location}
                          onChange={(e) => {
                            const updated = [...(siteContent.about?.openRoles || [])];
                            updated[idx] = { ...updated[idx], location: e.target.value };
                            setSiteContent({
                              ...siteContent,
                              about: { ...siteContent.about, openRoles: updated }
                            });
                          }}
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-600 mb-1">Employment Type</label>
                        <input
                          type="text"
                          value={role.type}
                          onChange={(e) => {
                            const updated = [...(siteContent.about?.openRoles || [])];
                            updated[idx] = { ...updated[idx], type: e.target.value };
                            setSiteContent({
                              ...siteContent,
                              about: { ...siteContent.about, openRoles: updated }
                            });
                          }}
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-600 mb-1">Experience</label>
                        <input
                          type="text"
                          value={role.experience}
                          onChange={(e) => {
                            const updated = [...(siteContent.about?.openRoles || [])];
                            updated[idx] = { ...updated[idx], experience: e.target.value };
                            setSiteContent({
                              ...siteContent,
                              about: { ...siteContent.about, openRoles: updated }
                            });
                          }}
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-gray-600 mb-1">Summary Description</label>
                      <textarea
                        rows={2}
                        value={role.summary}
                        onChange={(e) => {
                          const updated = [...(siteContent.about?.openRoles || [])];
                          updated[idx] = { ...updated[idx], summary: e.target.value };
                          setSiteContent({
                            ...siteContent,
                            about: { ...siteContent.about, openRoles: updated }
                          });
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 font-light"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 7: GLOBAL BRANDING & THEME
            ========================================================================= */}
        {activeTab === 'global' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Global Branding &amp; Theme Settings</h2>
              <p className="text-xs text-gray-500 font-light">
                Configure corporate identity, brand logo upload, global typography, accent color, and legal copyright.
              </p>
            </div>

            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
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
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Site Name / Brand Title</label>
                  <input
                    type="text"
                    value={siteContent.global.siteName}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        global: { ...siteContent.global, siteName: e.target.value }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-bold focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Global Font Family</label>
                  <input
                    type="text"
                    value={siteContent.global.fontFamily}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        global: { ...siteContent.global, fontFamily: e.target.value }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-mono focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Primary Accent Color</label>
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
                      className="w-32 bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-mono focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Contact Support Email</label>
                  <input
                    type="email"
                    value={siteContent.global.contactEmail}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        global: { ...siteContent.global, contactEmail: e.target.value }
                      })
                    }
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Footer Copyright Notice</label>
                <input
                  type="text"
                  value={siteContent.global.footerCopyright}
                  onChange={(e) =>
                    setSiteContent({
                      ...siteContent,
                      global: { ...siteContent.global, footerCopyright: e.target.value }
                    })
                  }
                  className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-mono focus:bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetSiteContent}
                  className="text-xs text-red-600 hover:text-red-700 flex items-center space-x-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Site Content to Factory Default</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 8: CENTRAL MEDIA DROPZONE / FILE MANAGER
            ========================================================================= */}
        {activeTab === 'media' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Central Media Upload Dropzone</h2>
              <p className="text-xs text-gray-500 font-light">
                Drag and drop any files (images, diagrams, videos, icons) directly from Windows File Explorer onto this dropzone.
              </p>
            </div>

            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
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
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                    Recently Uploaded In This Session ({uploadedFiles.length})
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {uploadedFiles.map((f, i) => (
                      <div key={i} className="bg-[#f8f9fc] border border-gray-200 rounded-xl p-3 space-y-2">
                        <div className="relative h-28 w-full bg-white rounded-lg overflow-hidden flex items-center justify-center border border-gray-100">
                          {f.includes('.mp4') || f.includes('.webm') ? (
                            <video src={f} controls className="w-full h-full object-contain" />
                          ) : (
                            <Image src={f} alt="Uploaded" fill className="object-contain p-1" unoptimized />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500 font-mono truncate max-w-[140px]">{f}</span>
                          <button
                            onClick={() => handleCopy(f)}
                            className="text-[11px] bg-blue-50 hover:bg-blue-100 text-brand-blue px-2 py-1 rounded-lg transition-colors flex items-center space-x-1 border border-blue-200 font-medium"
                          >
                            {copiedUrl === f ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
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
            TAB 9: ADMIN SECURITY & CREDENTIALS
            ========================================================================= */}
        {activeTab === 'security' && (
          <div className="space-y-6 max-w-xl">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Admin Authentication &amp; Security</h2>
              <p className="text-xs text-gray-500 font-light">
                Change your secret Admin ID and password to protect website editing privileges.
              </p>
            </div>

            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <form onSubmit={handleUpdateCreds} className="space-y-4">
                {credNotice && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${
                      credNotice.success
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                        : 'bg-red-50 border border-red-200 text-red-700'
                    }`}
                  >
                    {credNotice.success ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-500" />}
                    <span>{credNotice.msg}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">New Admin ID / Username</label>
                  <input
                    type="text"
                    value={newAdminId}
                    onChange={(e) => setNewAdminId(e.target.value)}
                    placeholder="Enter new Admin ID"
                    required
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:bg-white focus:ring-1 focus:ring-brand-blue"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min. 4 characters)"
                    required
                    className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:bg-white focus:ring-1 focus:ring-brand-blue"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
                >
                  Update Admin Credentials
                </button>
              </form>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">Current Session:</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Lock &amp; Exit CMS</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          INQUIRY FULL DETAILS & INTERNAL NOTES MODAL - CLEAN WHITE UI
          ========================================================================= */}
      {selectedInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-gray-200 text-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200">
                    #{selectedInquiryModal.id}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(selectedInquiryModal.createdAt).toLocaleString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedInquiryModal.productName ? `${selectedInquiryModal.productName} Inquiry` : 'Enterprise Inquiry'}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInquiryModal(null)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="flex items-center justify-between bg-[#f8f9fc] p-3 rounded-2xl border border-gray-200">
              <span className="text-xs font-semibold text-gray-700">Status Workflow:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'new', label: 'New' },
                  { id: 'in_review', label: 'In Review' },
                  { id: 'contacted', label: 'Contacted' },
                  { id: 'completed', label: 'Completed' },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handleUpdateInquiryStatus(selectedInquiryModal.id, st.id as InquiryStatus)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedInquiryModal.status === st.id
                        ? 'bg-brand-blue text-white shadow-sm'
                        : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="bg-[#f8f9fc] p-3.5 rounded-xl border border-gray-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Customer Full Name</span>
                <div className="font-bold text-gray-900 text-sm">{selectedInquiryModal.name}</div>
              </div>

              <div className="bg-[#f8f9fc] p-3.5 rounded-xl border border-gray-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Company / Organization</span>
                <div className="font-bold text-gray-900 text-sm">{selectedInquiryModal.company}</div>
              </div>

              <div className="bg-[#f8f9fc] p-3.5 rounded-xl border border-gray-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Business Email</span>
                <a href={`mailto:${selectedInquiryModal.email}`} className="font-mono text-brand-blue hover:underline block truncate font-medium">
                  {selectedInquiryModal.email}
                </a>
              </div>

              <div className="bg-[#f8f9fc] p-3.5 rounded-xl border border-gray-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Direct Contact Phone</span>
                <div className="font-mono text-gray-700">
                  {selectedInquiryModal.phone || 'Not provided'}
                </div>
              </div>

              <div className="bg-[#f8f9fc] p-3.5 rounded-xl border border-gray-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Target Robot Model</span>
                <div className="font-bold text-brand-blue">{selectedInquiryModal.productName || 'General Inquiry'}</div>
              </div>

              <div className="bg-[#f8f9fc] p-3.5 rounded-xl border border-gray-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Deployment Tier</span>
                <div className="font-mono text-purple-700">{selectedInquiryModal.deploymentTier || 'Standard Deployment'}</div>
              </div>
            </div>

            {/* Customer Message */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-gray-700">Customer Operational Scope &amp; Requirements</span>
              <div className="bg-[#f8f9fc] p-4 rounded-xl border border-gray-200 text-xs text-gray-800 leading-relaxed font-light max-h-40 overflow-y-auto">
                {selectedInquiryModal.message || 'No additional message provided.'}
              </div>
            </div>

            {/* Admin Internal Working Notes */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 flex items-center space-x-1.5">
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Internal Admin Working Notes (Private)</span>
                </span>
                <button
                  type="button"
                  onClick={handleSaveModalNotes}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1 rounded-lg text-xs transition-colors cursor-pointer shadow-sm"
                >
                  Save Internal Note
                </button>
              </div>
              <textarea
                rows={3}
                value={modalAdminNotes}
                onChange={(e) => setModalAdminNotes(e.target.value)}
                placeholder="Write private notes on sales assignment, NDA status, quoted prices, or next action items..."
                className="w-full bg-[#f8f9fc] border border-gray-200 rounded-xl p-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100">
              <a
                href={`mailto:${selectedInquiryModal.email}?subject=RE: HUTARK Inquiry #${selectedInquiryModal.id} - ${selectedInquiryModal.productName || 'Robotics'}&body=Hello ${selectedInquiryModal.name},%0D%0A%0D%0AThank you for contacting HUTARK regarding ${selectedInquiryModal.productName || 'our robots'}.`}
                className="bg-brand-blue hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Compose Direct Email Reply</span>
              </a>

              <button
                type="button"
                onClick={() => handleDeleteInquiry(selectedInquiryModal.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Delete Inquiry
              </button>
            </div>
          </div>
        </div>
      )}

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
