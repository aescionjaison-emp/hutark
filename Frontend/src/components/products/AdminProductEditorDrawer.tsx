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
              {/* Header card with toggle */}
              <div className="bg-[#151922] p-5 rounded-2xl border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                      <ShoppingBag className="w-4 h-4 text-amber-400" />
                      <span>Full-Screen Cinematic &quot;BUY ME&quot; Section</span>
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Customize the edge-to-edge showroom stage, floating capsule button, positions, size, and background per product.
                    </p>
                  </div>

                  {/* Section Enable Toggle */}
                  <label className="flex items-center space-x-3 cursor-pointer select-none bg-black/40 px-3.5 py-2 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                    <span className="text-xs font-semibold text-gray-300">
                      {formData.buySectionEnabled !== false ? 'Section Enabled' : 'Section Disabled'}
                    </span>
                    <input
                      type="checkbox"
                      checked={formData.buySectionEnabled !== false}
                      onChange={(e) => setFormData({ ...formData, buySectionEnabled: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                  </label>
                </div>

                {/* Interactive Live Preview Box */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-medium flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Real-Time Visual Positioning Preview (16:9)</span>
                    </span>
                    <span className="font-mono text-[11px] text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40">
                      X: {(formData.buyButtonPosX ?? 40.0).toFixed(1)}% | Y: {(formData.buyButtonPosY ?? 80.2).toFixed(1)}% | Scale: {(formData.buyButtonScale ?? 1.0).toFixed(2)}x
                    </span>
                  </div>

                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-2 border-white/20 bg-[#e8e8ea] shadow-inner select-none">
                    {/* Background image in preview */}
                    <div 
                      className="absolute inset-0 w-full h-full overflow-hidden"
                      style={{
                        transform: `scale(${formData.buySectionBgZoom ?? 1.0})`,
                        transformOrigin: `50% ${formData.buySectionBgPosY ?? 50}%`,
                        transition: 'transform 0.15s ease',
                      }}
                    >
                      <Image
                        src={formData.buySectionImage || '/images/products/robot_buy_me_palm_rings_1920x1080.jpg'}
                        alt="Robot Preview"
                        fill
                        className="object-cover object-center pointer-events-none"
                        style={{ objectPosition: `50% ${formData.buySectionBgPosY ?? 50}%` }}
                      />
                    </div>

                    {/* Preview Floating Button */}
                    {formData.buyButtonVisible !== false && (
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          left: `${formData.buyButtonPosX ?? 40.0}%`,
                          top: `${formData.buyButtonPosY ?? 80.2}%`,
                          transform: `translate(-50%, -50%) scale(${formData.buyButtonScale ?? 1.0})`,
                          width: '14.5%',
                          minWidth: '70px',
                          maxWidth: '180px',
                          transition: 'left 0.1s ease, top 0.1s ease, transform 0.1s ease',
                        }}
                      >
                        <div className="w-full aspect-[3.25/1] rounded-full border border-[#dfc39a] bg-gradient-to-b from-[#1b1d26] via-[#0d0e14] to-[#06070a] shadow-lg flex items-center justify-center px-2">
                          <span className="text-[8px] sm:text-[10px] md:text-xs font-black text-white tracking-widest uppercase truncate drop-shadow">
                            {formData.buyButtonText || 'BUY ME'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Crosshair guidelines on hover/view */}
                    <div className="absolute inset-0 border border-white/10 pointer-events-none flex items-center justify-center">
                      <div className="absolute top-2 left-2 text-[9px] font-mono text-gray-400 bg-black/60 px-2 py-0.5 rounded">
                        1920 x 1080 Coords
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 1: FLOATING "BUY ME" BUTTON CUSTOMIZATION */}
              <div className="bg-[#151922] p-5 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Sliders className="w-4 h-4 text-cyan-400" />
                    <span>Floating Button Positions &amp; Geometry</span>
                  </h4>
                  <label className="flex items-center space-x-2 cursor-pointer text-xs text-gray-300">
                    <input
                      type="checkbox"
                      checked={formData.buyButtonVisible !== false}
                      onChange={(e) => setFormData({ ...formData, buyButtonVisible: e.target.checked })}
                      className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span>Show Button</span>
                  </label>
                </div>

                {/* Button Label Text */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Button Label Text (Uppercase)
                  </label>
                  <input
                    type="text"
                    value={formData.buyButtonText || ''}
                    onChange={(e) => setFormData({ ...formData, buyButtonText: e.target.value })}
                    placeholder="BUY ME (Default)"
                    className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-4 py-2 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Horizontal Position X Slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-300 flex items-center space-x-1.5">
                      <Move className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Horizontal Position X (Left-to-Right %)</span>
                    </span>
                    <span className="font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40 font-bold">
                      {(formData.buyButtonPosX ?? 40.0).toFixed(1)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15.0"
                    max="85.0"
                    step="0.1"
                    value={formData.buyButtonPosX ?? 40.0}
                    onChange={(e) => setFormData({ ...formData, buyButtonPosX: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                    <span>15% (Left Edge)</span>
                    <span className="text-cyan-400/80 font-bold">40.0% (Palm Center)</span>
                    <span>85% (Right Edge)</span>
                  </div>
                </div>

                {/* Vertical Position Y Slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-300 flex items-center space-x-1.5">
                      <Move className="w-3.5 h-3.5 text-cyan-400 rotate-90" />
                      <span>Vertical Position Y (Top-to-Bottom %)</span>
                    </span>
                    <span className="font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40 font-bold">
                      {(formData.buyButtonPosY ?? 80.2).toFixed(1)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50.0"
                    max="95.0"
                    step="0.1"
                    value={formData.buyButtonPosY ?? 80.2}
                    onChange={(e) => setFormData({ ...formData, buyButtonPosY: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                    <span>50% (Upper Screen)</span>
                    <span className="text-cyan-400/80 font-bold">80.2% (Directly on Palm)</span>
                    <span>95% (Bottom)</span>
                  </div>
                </div>

                {/* Button Scale / Size Slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-300 flex items-center space-x-1.5">
                      <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Button Scale / Size Multiplier</span>
                    </span>
                    <span className="font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40 font-bold">
                      {(formData.buyButtonScale ?? 1.0).toFixed(2)}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.60"
                    max="1.60"
                    step="0.05"
                    value={formData.buyButtonScale ?? 1.0}
                    onChange={(e) => setFormData({ ...formData, buyButtonScale: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                    <span>0.60x (Compact)</span>
                    <span className="text-cyan-400/80 font-bold">1.00x (Standard)</span>
                    <span>1.60x (Large)</span>
                  </div>
                </div>

                {/* Position Presets */}
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <span className="text-[11px] font-semibold text-gray-400 block">Quick Alignment Presets:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, buyButtonPosX: 40.0, buyButtonPosY: 80.2, buyButtonScale: 1.0 })}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-cyan-300 border border-white/10 hover:border-cyan-400/50 transition-all text-left cursor-pointer"
                    >
                      <div className="font-bold text-white">On Open Palm</div>
                      <div className="text-[10px] text-gray-400 font-mono">X: 40.0% | Y: 80.2%</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, buyButtonPosX: 40.0, buyButtonPosY: 75.0, buyButtonScale: 1.0 })}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-cyan-300 border border-white/10 hover:border-cyan-400/50 transition-all text-left cursor-pointer"
                    >
                      <div className="font-bold text-white">Hovering Higher</div>
                      <div className="text-[10px] text-gray-400 font-mono">X: 40.0% | Y: 75.0%</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, buyButtonPosX: 50.0, buyButtonPosY: 78.0, buyButtonScale: 1.1 })}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-cyan-300 border border-white/10 hover:border-cyan-400/50 transition-all text-left cursor-pointer"
                    >
                      <div className="font-bold text-white">Centered Showcase</div>
                      <div className="text-[10px] text-gray-400 font-mono">X: 50.0% | Y: 78.0%</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* CARD 2: BACKGROUND IMAGE & FRAMING */}
              <div className="bg-[#151922] p-5 rounded-2xl border border-white/10 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <span>Robot Showroom Background Asset &amp; Framing</span>
                </h4>

                <MediaUploadZone
                  label="Background Image (Drag & Drop or Browse)"
                  description="Upload any custom 16:9 full-screen robot or showroom visual"
                  value={formData.buySectionImage || '/images/products/robot_buy_me_palm_rings_1920x1080.jpg'}
                  onChange={(url) => setFormData({ ...formData, buySectionImage: url })}
                  mediaType="image"
                />

                {/* Preset Background Images */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-300">Preset Studio Assets:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      {
                        name: 'Clean Rings (1080p)',
                        url: '/images/products/robot_buy_me_palm_rings_1920x1080.jpg',
                        desc: 'Concentric holographic palm rings',
                      },
                      {
                        name: 'Studio Showroom',
                        url: '/images/products/robot_buy_me_1920x1080.jpg',
                        desc: 'High-key minimalist white studio',
                      },
                      {
                        name: 'Cinematic High-Contrast',
                        url: '/images/products/robot_buy_me_cinematic.jpg',
                        desc: 'Rich studio lighting balance',
                      },
                    ].map((p, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormData({ ...formData, buySectionImage: p.url })}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.buySectionImage === p.url
                            ? 'bg-blue-950/80 border-cyan-400 text-cyan-300'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="font-bold text-xs truncate">{p.name}</div>
                        <div className="text-[10px] text-gray-400 truncate">{p.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Background Zoom Scale */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-300">Background Image Zoom Factor</span>
                    <span className="font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40 font-bold">
                      {(formData.buySectionBgZoom ?? 1.0).toFixed(2)}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1.00"
                    max="1.50"
                    step="0.02"
                    value={formData.buySectionBgZoom ?? 1.0}
                    onChange={(e) => setFormData({ ...formData, buySectionBgZoom: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Background Vertical Position */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-300">Background Vertical Alignment</span>
                    <span className="font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40 font-bold">
                      {formData.buySectionBgPosY ?? 50}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={formData.buySectionBgPosY ?? 50}
                    onChange={(e) => setFormData({ ...formData, buySectionBgPosY: parseInt(e.target.value, 10) })}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Reset to Factory Defaults */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        buySectionEnabled: true,
                        buyButtonVisible: true,
                        buyButtonText: 'BUY ME',
                        buyButtonPosX: 40.0,
                        buyButtonPosY: 80.2,
                        buyButtonScale: 1.0,
                        buySectionImage: '/images/products/robot_buy_me_palm_rings_1920x1080.jpg',
                        buySectionBgZoom: 1.0,
                        buySectionBgPosY: 50,
                      });
                    }}
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-400 hover:text-white rounded-xl border border-white/10 transition-all flex items-center space-x-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Buy Section to Factory Defaults</span>
                  </button>
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

                {/* 7. Full-Screen Cinematic BUY ME Robot Section */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                    7. Full-Screen Cinematic Robot &quot;BUY ME&quot; Section
                  </span>
                  <MediaUploadZone
                    label="Buy Me Robot Image (buySectionImage)"
                    description="Cinematic full-screen robot with extended palm (defaults to official reference)"
                    value={formData.buySectionImage || ''}
                    onChange={(url) => setFormData({ ...formData, buySectionImage: url })}
                    mediaType="image"
                  />
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Floating Capsule Button Label (buyButtonText)
                    </label>
                    <input
                      type="text"
                      value={formData.buyButtonText || ''}
                      onChange={(e) => setFormData({ ...formData, buyButtonText: e.target.value })}
                      placeholder="BUY ME (default)"
                      className="w-full bg-[#1b202c] border border-white/15 rounded-xl px-4 py-2 text-xs text-cyan-300 font-bold focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
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
              {/* PRIMARY PROMINENT URL COPY-PASTE METHOD BOX */}
              <div className="bg-gradient-to-br from-red-950/50 via-[#181a24] to-[#12151e] border-2 border-red-500/50 p-6 rounded-2xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5 text-white font-bold text-sm">
                    <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">YouTube Video URL (Copy & Paste Method)</h4>
                      <p className="text-[11px] text-gray-400 font-light">Paste any YouTube video link to add it immediately as a video slide</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-500/30 px-2.5 py-1 rounded-full uppercase">
                    Auto-Embed
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={newVideoUrl}
                      onChange={(e) => setNewVideoUrl(e.target.value)}
                      placeholder="Paste YouTube video link (e.g. https://www.youtube.com/watch?v=7zI3u19q_e0 or youtu.be)..."
                      className="w-full bg-black/70 border border-white/20 rounded-xl px-4 py-3 text-xs text-cyan-300 placeholder-gray-500 focus:outline-none focus:border-red-500 font-mono"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handlePasteAndAddVideo}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-red-500/25 active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Video Slide</span>
                  </button>
                </div>
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
                    const isDirectVideo = vid.id?.endsWith('.mp4') || vid.id?.endsWith('.webm') || vid.id?.includes('/uploads/');

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

                        {/* YouTube URL Copy-Paste Input Field */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-gray-300">
                            YouTube Video URL or Video File Path (Copy & Paste)
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={vid.id.startsWith('http') || vid.id.startsWith('/') ? vid.id : `https://www.youtube.com/watch?v=${vid.id}`}
                              onChange={(e) => handleUpdateVideo(idx, 'id', extractYouTubeId(e.target.value) || e.target.value)}
                              placeholder="Paste YouTube link: https://www.youtube.com/watch?v=..."
                              className="flex-1 bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-cyan-300 font-mono focus:border-red-500 focus:outline-none"
                            />
                            {!isDirectVideo && (
                              <a
                                href={vid.id.startsWith('http') ? vid.id : `https://www.youtube.com/watch?v=${videoId}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2.5 bg-white/5 hover:bg-white/15 rounded-xl text-gray-300 hover:text-white transition-colors"
                                title="Open on YouTube"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Live YouTube Embed Preview */}
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10">
                          {isDirectVideo ? (
                            <video src={vid.id} controls className="w-full h-full object-contain" />
                          ) : (
                            <iframe
                              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
                              title={vid.title}
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          )}
                        </div>

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
