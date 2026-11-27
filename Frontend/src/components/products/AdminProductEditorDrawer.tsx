'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  X, 
  Save, 
  RotateCcw, 
  Type, 
  Image as ImageIcon, 
  FileText, 
  Cpu, 
  Table, 
  Video, 
  Check, 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  Palette,
  ExternalLink,
  Sliders,
  ShoppingBag,
  Move,
  ZoomIn,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';
import { ProductData, YouTubeVideoSlide, SpecRowItem, HardwareModule, ApplicationScenario } from '../../types';
import { saveProductData, resetProductData } from '../../services/productStore';
import MediaUploadZone from '../admin/MediaUploadZone';

interface AdminProductEditorDrawerProps {
  product: ProductData;
  isOpen: boolean;
  onClose: () => void;
  onProductUpdated: (updated: ProductData) => void;
  initialTab?: TabKey;
}

type TabKey = 'styles' | 'buyme' | 'images' | 'videos' | 'content' | 'hardware' | 'specs';

export default function AdminProductEditorDrawer({
  product,
  isOpen,
  onClose,
  onProductUpdated,
  initialTab = 'styles',
}: AdminProductEditorDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);
  const [formData, setFormData] = useState<ProductData>(product);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState('');

  // Sync state whenever product or initialTab prop updates
  useEffect(() => {
    setFormData(product);
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [product, initialTab]);

  if (!isOpen) return null;

  // Preset Image Options for quick selection
  const imagePresets = [
    { label: 'Alpine Ridge Horizon', url: '/uploads/images/products/a3_hero_banner.jpg' },
    { label: 'Desert Highway Horizon', url: '/uploads/images/products/x2_hero_banner.jpg' },
    { label: 'Rocky Mountain Terrain', url: '/uploads/images/products/d1_hero_banner.jpg' },
    { label: 'G2 Reference Landscape', url: '/uploads/images/20261103/015bf1f9da95cc783f5e1e7363b3882c.png' },
    { label: 'A3 Dark Chamber', url: '/uploads/images/products/a3_cinematic_dark.jpg' },
    { label: 'X2 Dark Warehouse', url: '/uploads/images/products/x2_cinematic_dark.jpg' },
    { label: 'D1 Night Refinery', url: '/uploads/images/products/d1_cinematic_dark.jpg' },
    { label: 'G2 Dark Chamber', url: '/uploads/images/20261029/492548ce8722aa332e87aa47ce1019e5.png' },
    { label: 'Macro Hand on Glass', url: '/uploads/images/20261029/33d570751012965d2455b2f1c9a6d43d.jpg' },
    { label: 'Cognitive Head & Eyes', url: '/uploads/images/20261030/3b46c5afb682b2c6798d153344ad4cc3.jpg' },
    { label: 'A3 CAD Blueprint', url: '/uploads/images/products/a3_anatomy_diagram.jpg' },
    { label: 'X2 CAD Blueprint', url: '/uploads/images/products/x2_anatomy_diagram.jpg' },
    { label: 'D1 CAD Blueprint', url: '/uploads/images/products/d1_anatomy_diagram.jpg' },
    { label: 'G2 CAD Blueprint', url: '/uploads/images/20261029/62974a39fa9e903d8e47b2cd2befc16e.png' },
    { label: 'C5 CAD Blueprint', url: '/uploads/images/products/c5_anatomy_diagram.jpg' },
    { label: 'Cinematic Buy Me Hologram (1080p)', url: '/images/products/robot_buy_me_1920x1080.jpg' },
    { label: 'Cinematic Buy Me Hologram (Original)', url: '/images/products/robot_buy_me_cinematic.jpg' },
  ];

  // Font Family Presets
  const fontPresets = [
    { label: 'MiSans (AGIBOT Reference Default)', value: 'MiSans, "PingFang SC", "Microsoft YaHei", sans-serif' },
    { label: 'Inter (Clean Global Sans)', value: 'Inter, system-ui, -apple-system, sans-serif' },
    { label: 'Roboto (Google Standard)', value: 'Roboto, system-ui, sans-serif' },
    { label: 'Montserrat (Bold Industrial)', value: 'Montserrat, sans-serif' },
    { label: 'Space Grotesk (Futuristic Tech)', value: '"Space Grotesk", monospace, sans-serif' },
    { label: 'System UI / Helvetica', value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' },
  ];

  // Color Presets
  const colorPresets = [
    { label: 'AGIBOT Blue', value: '#0062c5' },
    { label: 'Electric Cyan', value: '#00b4d8' },
    { label: 'Deep Indigo', value: '#4338ca' },
    { label: 'Emerald Green', value: '#059669' },
    { label: 'Amber Gold', value: '#d97706' },
    { label: 'Charcoal Black', value: '#111827' },
  ];

  const handleSave = async () => {
    const success = await saveProductData(formData);
    if (success) {
      setSaveSuccess(true);
      onProductUpdated(formData);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleReset = () => {
    if (confirm(`Reset all customizations for ${product.name} back to factory reference defaults?`)) {
      resetProductData(product.id);
      window.location.reload();
    }
  };

  // Spec rows handlers
  const handleAddSpecRow = () => {
    const rows = [...(formData.specRows || [])];
    rows.push({ category: 'General Parameters', item: 'New Parameter', value: 'Value' });
    setFormData({ ...formData, specRows: rows });
  };

  const handleUpdateSpecRow = (index: number, field: keyof SpecRowItem, val: string) => {
    const rows = [...(formData.specRows || [])];
    rows[index] = { ...rows[index], [field]: val };
    setFormData({ ...formData, specRows: rows });
  };

  const handleDeleteSpecRow = (index: number) => {
    const rows = [...(formData.specRows || [])].filter((_, i) => i !== index);
    setFormData({ ...formData, specRows: rows });
  };

  // Video slide handlers
  const extractYouTubeId = (urlOrId: string): string => {
    if (!urlOrId) return '';
    const trimmed = urlOrId.trim();
    if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('?') && !trimmed.includes('=')) {
      return trimmed;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = trimmed.match(regExp);
    return match && match[2].length === 11 ? match[2] : trimmed;
  };

  const handlePasteAndAddVideo = () => {
    if (!newVideoUrl.trim()) return;
    const parsedId = extractYouTubeId(newVideoUrl.trim());
    const currentVideos = [...(formData.youtubeVideos || [])];
    currentVideos.unshift({
      id: parsedId || newVideoUrl.trim(),
      title: `${formData.name} Video Demonstration`,
      subtitle: 'FIELD PERFORMANCE TRIAL',
      description: 'Autonomous demonstration of dynamic stability, obstacle negotiation, and precision manipulation capabilities.',
      categoryTag: 'Demonstration',
    });
    setFormData({ ...formData, youtubeVideos: currentVideos });
    setNewVideoUrl('');
  };

  const handleAddVideoFromMedia = (mediaUrl: string) => {
    if (!mediaUrl.trim()) return;
    const parsedId = extractYouTubeId(mediaUrl.trim());
    const currentVideos = [...(formData.youtubeVideos || [])];
    currentVideos.unshift({
      id: parsedId || mediaUrl.trim(),
      title: `${formData.name} Video Demonstration`,
      subtitle: 'FIELD PERFORMANCE TRIAL',
      description: 'Autonomous demonstration of dynamic stability, obstacle negotiation, and precision manipulation capabilities.',
      categoryTag: 'Demonstration',
    });
    setFormData({ ...formData, youtubeVideos: currentVideos });
  };

  const handleAddVideo = () => {
    const currentVideos = [...(formData.youtubeVideos || [])];
    currentVideos.push({
      id: 'M3_Jb_5zT9I',
      title: 'New Video Demonstration',
      subtitle: 'FIELD TRIAL',
      description: 'Demonstration description of performance parameters and operational capabilities.',
      categoryTag: 'Demo Test',
    });
    setFormData({ ...formData, youtubeVideos: currentVideos });
  };

  const handleUpdateVideo = (index: number, field: keyof YouTubeVideoSlide, val: string) => {
    const currentVideos = [...(formData.youtubeVideos || [])];
    currentVideos[index] = { ...currentVideos[index], [field]: val };
    setFormData({ ...formData, youtubeVideos: currentVideos });
  };

  const handleDeleteVideo = (index: number) => {
    const currentVideos = [...(formData.youtubeVideos || [])].filter((_, i) => i !== index);
    setFormData({ ...formData, youtubeVideos: currentVideos });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn">
      <div className="w-full max-w-3xl bg-[#0f1219] text-gray-100 h-full flex flex-col shadow-2xl border-l border-white/10 animate-slideLeft">
        
        {/* DRAWER TOP BAR */}
        <div className="py-4 px-6 border-b border-white/10 flex items-center justify-between bg-[#161a24]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-blue-600/20 text-cyan-400 border border-blue-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-base text-white">Product Admin Studio</h3>
                <span className="text-[11px] font-mono uppercase tracking-widest text-gray-400">
                  Live Customizer
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Editing: <span className="font-semibold text-white">{product.name}</span> ({product.id})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                saveSuccess
                  ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                  : 'bg-[#0062c5] hover:bg-blue-600 text-white shadow-blue-500/30'
              }`}
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved Live!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5 px-6 py-3 bg-[#12151e] border-b border-white/10 text-xs font-semibold">
          {[
            { id: 'styles', label: 'Font & Theme', icon: Palette },
            { id: 'buyme', label: 'Buy Me Section', icon: ShoppingBag, isHighlight: true },
            { id: 'images', label: 'Backgrounds', icon: ImageIcon },
            { id: 'videos', label: 'YouTube Videos', icon: Video, isSpecial: true },
            { id: 'content', label: 'Core Copy', icon: FileText },
            { id: 'hardware', label: 'Hardware', icon: Cpu },
            { id: 'specs', label: 'Specs Table', icon: Table },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabKey)}
                className={`flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer text-center ${
                  isActive
                    ? tab.isHighlight
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-md font-bold'
                      : 'bg-blue-600/30 text-cyan-300 border border-cyan-400/50 shadow-md font-bold'
                    : tab.isHighlight
                    ? 'bg-amber-950/30 text-amber-300 hover:bg-amber-900/50 border border-amber-500/30'
                    : tab.isSpecial
                    ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-500/30'
                    : 'text-gray-300 hover:text-white bg-white/5 hover:bg-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${tab.isHighlight ? 'text-amber-400' : tab.isSpecial ? 'text-red-400' : 'text-gray-400'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB PANELS CONTAINER */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* =========================================================================
              TAB 1: TYPOGRAPHY, FONT & THEME
              ========================================================================= */}
          {activeTab === 'styles' && (
            <div className="space-y-6">
              <div className="bg-[#151922] p-5 rounded-2xl border border-white/10 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Type className="w-4 h-4 text-cyan-400" />
                  <span>Typography & Font Family</span>
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Select or input the font family for this product page. Will immediately apply to all headings, body text, and tables.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Preset Font Families</label>
                  <select
                    value={formData.customStyles?.fontFamily || 'MiSans, "PingFang SC", "Microsoft YaHei", sans-serif'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customStyles: { ...(formData.customStyles || {}), fontFamily: e.target.value },
                      })
                    }
                    className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    {fontPresets.map((f, i) => (
                      <option key={i} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Custom Font Family String</label>
                  <input
                    type="text"
                    value={formData.customStyles?.fontFamily || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customStyles: { ...(formData.customStyles || {}), fontFamily: e.target.value },
                      })
                    }
                    placeholder="e.g. 'Space Grotesk', sans-serif"
                    className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* BRAND COLOR PALETTE */}
              <div className="bg-[#151922] p-5 rounded-2xl border border-white/10 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-cyan-400" />
                  <span>Primary Brand Accent Color</span>
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Customize the buttons, highlight chips, active tabs, and primary metrics accent color.
                </p>

                <div className="flex items-center space-x-3">
                  {colorPresets.map((c, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          customStyles: { ...(formData.customStyles || {}), primaryColor: c.value },
                        })
                      }
                      style={{ backgroundColor: c.value }}
                      className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                        (formData.customStyles?.primaryColor || '#0062c5') === c.value
                          ? 'border-white scale-110 shadow-lg'
                          : 'border-transparent hover:scale-105'
                      }`}
                      title={c.label}
                    />
                  ))}

                  <input
                    type="color"
                    value={formData.customStyles?.primaryColor || '#0062c5'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customStyles: { ...(formData.customStyles || {}), primaryColor: e.target.value },
                      })
                    }
                    className="w-8 h-8 rounded-full border-0 cursor-pointer p-0 bg-transparent"
                    title="Choose custom hex color"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Hex Color Code</label>
                  <input
                    type="text"
                    value={formData.customStyles?.primaryColor || '#0062c5'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customStyles: { ...(formData.customStyles || {}), primaryColor: e.target.value },
                      })
                    }
                    placeholder="#0062c5"
                    className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              {/* HEADING SCALE */}
              <div className="bg-[#151922] p-5 rounded-2xl border border-white/10 space-y-3">
                <h4 className="text-sm font-bold text-white">Heading Scale</h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'normal', label: 'Standard Reference' },
                    { id: 'large', label: 'Impactful (+15%)' },
                    { id: 'huge', label: 'Cinematic (+30%)' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          customStyles: { ...(formData.customStyles || {}), headingSize: s.id as any },
                        })
                      }
                      className={`p-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                        (formData.customStyles?.headingSize || 'normal') === s.id
                          ? 'bg-blue-950/80 border-cyan-400 text-cyan-300'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: FULL-SCREEN CINEMATIC BUY ME ROBOT & BUTTON CUSTOMIZER
              ========================================================================= */}
          {activeTab === 'buyme' && (
            <div className="space-y-6">
              <div className="bg-[#151922] p-5 rounded-2xl border border-amber-500/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                      <ShoppingBag className="w-4 h-4 text-amber-400" />
                      <span>Protected &quot;BUY ME&quot; Purchase Section</span>
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Visually locked protected component positioned immediately before Contact Us. Robot hand, golden palm energy animation, background, and button styling are protected.
                    </p>
                  </div>

                  {/* Section Enable Toggle */}
                  <label className="flex items-center space-x-3 cursor-pointer select-none bg-black/40 px-3.5 py-2 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                    <span className="text-xs font-semibold text-gray-300">
                      {formData.buySectionEnabled !== false ? 'Purchase Section Enabled' : 'Section Disabled'}
                    </span>
                    <input
                      type="checkbox"
                      checked={formData.buySectionEnabled !== false}
                      onChange={(e) => setFormData({ ...formData, buySectionEnabled: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                  </label>
                </div>

                {/* Business Purchase Label */}
                <div className="pt-3 border-t border-white/10">
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Purchase Action Label (Default: BUY ME)
                  </label>
                  <input
                    type="text"
                    value={formData.buyButtonText || ''}
                    onChange={(e) => setFormData({ ...formData, buyButtonText: e.target.value })}
                    placeholder="BUY ME"
                    className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-4 py-2 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 2: IMAGES & BACKGROUNDS
              ========================================================================= */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              <div className="bg-[#151922] p-5 rounded-2xl border border-white/10 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <span>Section Background Images & Renders</span>
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Enter custom image URLs or choose from the generated 8K CGI renders and official reference assets.
                </p>

                {/* Hero Banner Background */}
                <MediaUploadZone
                  label="1. Hero Section Panoramic Background (heroBannerBg)"
                  description="Drag & drop high-res banner or browse from local file manager"
                  value={formData.heroBannerBg || ''}
                  onChange={(url) => setFormData({ ...formData, heroBannerBg: url })}
                  mediaType="image"
                />

                {/* Hero Robot Render */}
                <MediaUploadZone
                  label="2. Hero Robot Showcase PNG (heroImg)"
                  description="Cutout transparent PNG of robot standing pose"
                  value={formData.heroImg || ''}
                  onChange={(url) => setFormData({ ...formData, heroImg: url })}
                  mediaType="image"
                />

                {/* Cinematic Chamber Image */}
                <MediaUploadZone
                  label="3. Cinematic Dark Chamber Image (cinematicImg)"
                  description="Embodied intelligence dark chamber rendering"
                  value={formData.cinematicImg || ''}
                  onChange={(url) => setFormData({ ...formData, cinematicImg: url })}
                  mediaType="image"
                />

                {/* Macro Manipulation Image */}
                <MediaUploadZone
                  label="4. Macro Dexterous Manipulation Image (manipulationImg)"
                  description="Close-up dual-arm manipulation illustration"
                  value={formData.manipulationImg || ''}
                  onChange={(url) => setFormData({ ...formData, manipulationImg: url })}
                  mediaType="image"
                />

                {/* Cognitive Interaction Image */}
                <MediaUploadZone
                  label="5. Cognitive Dialogue Head Image (interactionImg)"
                  description="AI face / head interaction portrait"
                  value={formData.interactionImg || ''}
                  onChange={(url) => setFormData({ ...formData, interactionImg: url })}
                  mediaType="image"
                />

                {/* Matching List Blueprint Image */}
                <MediaUploadZone
                  label="6. Matching List CAD Blueprint Diagram (matchingListImg)"
                  description="Technical blueprint or callout diagram"
                  value={formData.matchingListImg || ''}
                  onChange={(url) => setFormData({ ...formData, matchingListImg: url })}
                  mediaType="image"
                />

              </div>

              {/* QUICK PRESET SELECTOR CAROUSEL */}
              <div className="bg-[#151922] p-5 rounded-2xl border border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Quick Select from High-Resolution Asset Library
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto no-scrollbar">
                  {imagePresets.map((img, i) => (
                    <div
                      key={i}
                      className="bg-black/40 p-2.5 rounded-xl border border-white/10 hover:border-cyan-400 transition-colors text-left text-[11px]"
                    >
                      <span className="font-semibold text-white block truncate mb-1">{img.label}</span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, heroBannerBg: img.url })}
                        className="text-[10px] text-cyan-400 hover:underline block cursor-pointer"
                      >
                        Set as Hero
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, cinematicImg: img.url })}
                        className="text-[10px] text-blue-400 hover:underline block cursor-pointer"
                      >
                        Set as Chamber
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 3: CORE CONTENT & TEXT
              ========================================================================= */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="bg-[#151922] p-5 rounded-2xl border border-white/10 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Hero Header Information</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Product Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Series Badge</label>
                    <input
                      type="text"
                      value={formData.series}
                      onChange={(e) => setFormData({ ...formData, series: e.target.value })}
                      className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Overview Description</label>
                  <textarea
                    rows={3}
                    value={formData.overview}
                    onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                    className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* CINEMATIC INTELLIGENCE SECTION */}
              <div className="bg-[#151922] p-5 rounded-2xl border border-white/10 space-y-4">
                <h4 className="text-sm font-bold text-white">Section 2: Embodied Intelligence</h4>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Section Title</label>
                  <input
                    type="text"
                    value={formData.cinematicHeading || ''}
                    onChange={(e) => setFormData({ ...formData, cinematicHeading: e.target.value })}
                    className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Section Description</label>
                  <textarea
                    rows={2}
                    value={formData.cinematicDesc || ''}
                    onChange={(e) => setFormData({ ...formData, cinematicDesc: e.target.value })}
                    className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* 3 Metrics */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-300">3 Telemetry Highlight Metrics</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(formData.cinematicMetrics || [
                      { value: '26 DoF', label: 'Active Articulation' },
                      { value: '5.0 kg', label: 'Single Arm Payload' },
                      { value: '1,652 Wh', label: 'Battery Capacity' },
                    ]).map((met, i) => (
                      <div key={i} className="bg-black/40 p-3 rounded-xl border border-white/10 space-y-2">
                        <input
                          type="text"
                          value={met.value}
                          onChange={(e) => {
                            const updated = [...(formData.cinematicMetrics || [])];
                            updated[i] = { ...updated[i], value: e.target.value };
                            setFormData({ ...formData, cinematicMetrics: updated });
                          }}
                          placeholder="Value"
                          className="w-full bg-[#1b202c] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-cyan-300 font-bold"
                        />
                        <input
                          type="text"
                          value={met.label}
                          onChange={(e) => {
                            const updated = [...(formData.cinematicMetrics || [])];
                            updated[i] = { ...updated[i], label: e.target.value };
                            setFormData({ ...formData, cinematicMetrics: updated });
                          }}
                          placeholder="Label"
                          className="w-full bg-[#1b202c] border border-white/10 rounded-lg px-2.5 py-1 text-[11px] text-gray-400"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 4: HARDWARE & SCENARIOS
              ========================================================================= */}
          {activeTab === 'hardware' && (
            <div className="space-y-6">
              <div className="bg-[#151922] p-5 rounded-2xl border border-white/10 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Hardware Architecture (6 Cards)</span>
                </h4>

                <div className="space-y-4 max-h-[500px] overflow-y-auto no-scrollbar">
                  {(formData.hardwareModules || []).map((mod, i) => (
                    <div key={i} className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-3">
                      <div className="flex items-center justify-between text-xs text-cyan-400 font-bold">
                        <span>Card #{i + 1}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={mod.title}
                          onChange={(e) => {
                            const mods = [...(formData.hardwareModules || [])];
                            mods[i] = { ...mods[i], title: e.target.value };
                            setFormData({ ...formData, hardwareModules: mods });
                          }}
                          placeholder="Module Title"
                          className="w-full bg-[#1b202c] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-bold"
                        />
                        <input
                          type="text"
                          value={mod.subtitle}
                          onChange={(e) => {
                            const mods = [...(formData.hardwareModules || [])];
                            mods[i] = { ...mods[i], subtitle: e.target.value };
                            setFormData({ ...formData, hardwareModules: mods });
                          }}
                          placeholder="Subtitle"
                          className="w-full bg-[#1b202c] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-blue-300"
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={mod.desc}
                        onChange={(e) => {
                          const mods = [...(formData.hardwareModules || [])];
                          mods[i] = { ...mods[i], desc: e.target.value };
                          setFormData({ ...formData, hardwareModules: mods });
                        }}
                        placeholder="Description"
                        className="w-full bg-[#1b202c] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300"
                      />
                      <MediaUploadZone
                        label="Module Graphic"
                        description="Drag & drop module render from file manager"
                        value={mod.img}
                        onChange={(url) => {
                          const mods = [...(formData.hardwareModules || [])];
                          mods[i] = { ...mods[i], img: url };
                          setFormData({ ...formData, hardwareModules: mods });
                        }}
                        mediaType="image"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 5: PRODUCT SPECIFICATIONS TABLE
              ========================================================================= */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Table className="w-4 h-4 text-cyan-400" />
                    <span>Specification Parameters Matrix</span>
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Add, edit, or remove technical specifications displayed in the specifications table.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddSpecRow}
                  className="px-3 py-1.5 bg-blue-600/30 hover:bg-blue-600/50 text-cyan-300 border border-blue-500/40 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Row</span>
                </button>
              </div>

              <div className="bg-[#151922] rounded-2xl border border-white/10 overflow-hidden">
                <div className="max-h-[460px] overflow-y-auto divide-y divide-white/5">
                  {(formData.specRows || []).map((row, i) => (
                    <div key={i} className="p-3 grid grid-cols-12 gap-2 items-center hover:bg-white/5">
                      <div className="col-span-3">
                        <input
                          type="text"
                          value={row.category}
                          onChange={(e) => handleUpdateSpecRow(i, 'category', e.target.value)}
                          placeholder="Category"
                          className="w-full bg-[#1b202c] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-gray-400 font-semibold"
                        />
                      </div>
                      <div className="col-span-4">
                        <input
                          type="text"
                          value={row.item}
                          onChange={(e) => handleUpdateSpecRow(i, 'item', e.target.value)}
                          placeholder="Parameter Name"
                          className="w-full bg-[#1b202c] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                      <div className="col-span-4">
                        <input
                          type="text"
                          value={row.value}
                          onChange={(e) => handleUpdateSpecRow(i, 'value', e.target.value)}
                          placeholder="Technical Value"
                          className="w-full bg-[#1b202c] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-cyan-300 font-bold"
                        />
                      </div>
                      <div className="col-span-1 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteSpecRow(i)}
                          className="text-gray-500 hover:text-red-400 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 6: YOUTUBE VIDEO SLIDES (COPY & PASTE METHOD)
              ========================================================================= */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              {/* PRIMARY PROMINENT VIDEO DROP / SELECT FROM FOLDER / URL BOX */}
              <div className="bg-gradient-to-br from-red-950/50 via-[#181a24] to-[#12151e] border-2 border-red-500/50 p-6 rounded-2xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5 text-white font-bold text-sm">
                    <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">Add Product Video Demonstration</h4>
                      <p className="text-[11px] text-gray-400 font-light">Drag & drop video file, select from folder, browse files, or paste YouTube link</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-500/30 px-2.5 py-1 rounded-full uppercase">
                    Auto-Embed &amp; Upload
                  </span>
                </div>

                <MediaUploadZone
                  label="Upload Video File or Link"
                  description="Supports local MP4, WebM, MOV, and YouTube links"
                  placeholder="Drop video here, browse file, select from folder, or paste link"
                  value=""
                  onChange={handleAddVideoFromMedia}
                  mediaType="video"
                  allowUrlToggle={true}
                />
              </div>

              {/* LIST OF VIDEO SLIDES */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Active Video Slides ({formData.youtubeVideos?.length || 0})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddVideo}
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Blank Slide</span>
                  </button>
                </div>

                <div className="space-y-6 max-h-[600px] overflow-y-auto no-scrollbar">
                  {(formData.youtubeVideos && formData.youtubeVideos.length > 0
                    ? formData.youtubeVideos
                    : []
                  ).map((vid, idx) => {
                    const videoId = extractYouTubeId(vid.id);
                    const isDirectVideo = vid.id?.endsWith('.mp4') || vid.id?.endsWith('.webm') || vid.id?.includes('/uploads/') || vid.id?.startsWith('data:video');

                    return (
                      <div key={idx} className="bg-[#151922] p-5 rounded-2xl border border-white/10 space-y-4 shadow-md">
                        <div className="flex items-center justify-between text-xs font-bold border-b border-white/10 pb-3">
                          <span className="text-cyan-400 flex items-center space-x-2">
                            <Video className="w-4 h-4 text-red-500" />
                            <span>SLIDE {String(idx + 1).padStart(2, '0')}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteVideo(idx)}
                            className="text-gray-400 hover:text-red-400 cursor-pointer flex items-center space-x-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete Slide</span>
                          </button>
                        </div>

                        {/* Video Media Upload Zone (Drag & Drop, Select from Folder, Browse, or YouTube) */}
                        <MediaUploadZone
                          label="Video Asset (Drag & Drop, Folder, or YouTube Link)"
                          description="Drop MP4/WebM, select from local folder, browse files, or paste YouTube URL"
                          value={vid.id.startsWith('http') || vid.id.startsWith('/') || vid.id.startsWith('data:') ? vid.id : `https://www.youtube.com/watch?v=${vid.id}`}
                          onChange={(url) => handleUpdateVideo(idx, 'id', extractYouTubeId(url) || url)}
                          mediaType="video"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-1">Slide Title</label>
                            <input
                              type="text"
                              value={vid.title}
                              onChange={(e) => handleUpdateVideo(idx, 'title', e.target.value)}
                              placeholder="Slide Title"
                              className="w-full bg-[#1b202c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-1">Category / Tag</label>
                            <input
                              type="text"
                              value={vid.categoryTag || ''}
                              onChange={(e) => handleUpdateVideo(idx, 'categoryTag', e.target.value)}
                              placeholder="e.g. Demonstration, Locomotion, Assembly"
                              className="w-full bg-[#1b202c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Detailed Description</label>
                          <textarea
                            rows={2}
                            value={vid.description}
                            onChange={(e) => handleUpdateVideo(idx, 'description', e.target.value)}
                            placeholder="Description of the test or capability shown..."
                            className="w-full bg-[#1b202c] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* DRAWER FOOTER */}
        <div className="py-4 px-6 border-t border-white/10 bg-[#161a24] flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Factory Defaults</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-[#0062c5] hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-xl text-xs transition-all shadow-md cursor-pointer"
            >
              Save & Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
