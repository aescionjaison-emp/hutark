'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle2, 
  Mail, 
  Phone, 
  Building2, 
  User, 
  PackageCheck,
  Sparkles
} from 'lucide-react';
import { ProductData } from '../../types';

interface ProductRobotPurchaseSectionProps {
  product: ProductData;
  onCustomPurchase?: () => void;
}

export default function ProductRobotPurchaseSection({
  product,
  onCustomPurchase,
}: ProductRobotPurchaseSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [deploymentType, setDeploymentType] = useState<'pilot' | 'fleet' | 'research'>('pilot');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: '',
  });

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleButtonClick = () => {
    if (onCustomPurchase) {
      onCustomPurchase();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setTimeout(() => {
        setIsModalOpen(false);
        setFormSubmitted(false);
        setFormData({ name: '', company: '', email: '', phone: '', notes: '' });
      }, 2500);
    }, 500);
  };

  const scrollToContact = () => {
    setIsModalOpen(false);
    const target = document.getElementById('contact-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const customButtonText = product.buyButtonText && product.buyButtonText.trim() !== '' && product.buyButtonText.trim().toUpperCase() !== 'BUY ME'
    ? product.buyButtonText.trim()
    : null;

  return (
    <>
      {/* =========================================================================
          FULL-SCREEN CINEMATIC ROBOT BUY ME SECTION
          True 100vw x 100vh edge-to-edge showroom environment with ZERO margins
          ========================================================================= */}
      <section
        id="robot-buy-section"
        aria-label={`Purchase ${product.name}`}
        className="product-robot-section relative w-full w-screen h-screen min-h-screen min-h-[100vh] min-h-[100svh] overflow-hidden m-0 p-0 select-none bg-[#e8e8ea]"
        style={{
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #ffffff 0%, #e9e9eb 55%, #c9c9ce 100%)',
        }}
      >
        {/* Soft cinematic studio illumination & radial ambient lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1400px] h-[90vh] max-h-[1000px] bg-gradient-to-tr from-white/90 via-white/40 to-transparent rounded-full blur-[130px] pointer-events-none" />

        {/* Ambient floor shadow blend */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#c5c6ca]/50 via-transparent to-transparent pointer-events-none" />

        {/* Subtle Luxury Model Watermark */}
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12 z-10 pointer-events-none">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600/60 animate-ping" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-gray-500 font-bold">
              {product.name} • {product.series}
            </span>
          </div>
          <p className="text-xs text-gray-400 font-light mt-0.5 tracking-wider hidden sm:block">
            Next-Gen Autonomous Embodied Intelligence Showroom
          </p>
        </div>

        {/* =========================================================================
            TRUE 16:9 EDGE-TO-EDGE FULLSCREEN STAGE WRAPPER
            Uses CSS max(100vw, 100vh * 16/9) to fill 100% of the screen without borders,
            while keeping the 1920x1080 coordinate system locked with 0.00px deviation.
            ========================================================================= */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: 'max(100vw, calc(100vh * (16 / 9)))',
            height: 'max(100vh, calc(100vw * (9 / 16)))',
          }}
        >
          {/* Edge-to-Edge 1920x1080 Showroom Asset */}
          <div className="relative w-full h-full">
            <Image
              src={product.buySectionImage || "/images/products/robot_buy_me_1920x1080.jpg"}
              alt={`${product.name} - Buy Me`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center pointer-events-none select-none"
            />

            {/* =====================================================================
                REAL INTERACTIVE "BUY ME" BUTTON HOTSPOT
                Positioned with mathematical precision directly on the 3D capsule:
                Center: X = 39.84%, Y = 75.09%
                Width = 14.7%, Height = 8.0%
                ===================================================================== */}
            <div
              className="absolute pointer-events-auto z-20"
              style={{
                left: '39.84%',
                top: '75.09%',
                width: '14.7%',
                height: '8.0%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Interactive Capsule Trigger */}
              <button
                type="button"
                onClick={handleButtonClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocus={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
                aria-label={`Buy ${product.name} Now`}
                className="group relative w-full h-full rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-95 focus:outline-none"
                style={{
                  boxShadow: isHovered
                    ? '0 0 35px rgba(255, 230, 180, 0.85), 0 0 70px rgba(255, 255, 255, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.25)'
                    : '0 0 18px rgba(255, 220, 170, 0.35)',
                }}
              >
                {/* When custom text is provided by admin: render solid capsule overlay */}
                {customButtonText ? (
                  <div className="absolute inset-0 rounded-full bg-[#0c0d12] border-2 border-[#dfc39a] flex items-center justify-center shadow-xl">
                    <span className="text-white font-black text-xs sm:text-sm md:text-base tracking-[0.16em] uppercase">
                      {customButtonText}
                    </span>
                  </div>
                ) : (
                  /* Standard Mode: Seamlessly enhances the 3D button in the reference image */
                  <>
                    {/* Golden Holographic Beveled Rim that lights up on hover */}
                    <div 
                      className={`absolute inset-0 rounded-full border-2 transition-all duration-300 pointer-events-none ${
                        isHovered 
                          ? 'border-[#ffe4bd] opacity-100 scale-[1.02]' 
                          : 'border-transparent opacity-0'
                      }`}
                    />

                    {/* Animated Golden Sheen Sweep on hover */}
                    <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                      <div className="w-full h-full -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                    </div>

                    {/* Subtle Pulsing Warm Halo beneath capsule */}
                    <div 
                      className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-[85%] h-3 rounded-[100%] bg-gradient-to-r from-transparent via-[#fff0da] to-transparent blur-[3px] pointer-events-none transition-all duration-300 ${
                        isHovered ? 'opacity-100 scale-110' : 'opacity-60 animate-pulse'
                      }`}
                    />
                  </>
                )}

                {/* Floating Interactive Badge Prompt on Hover */}
                <div 
                  className={`absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/90 text-white text-[11px] font-mono tracking-wider shadow-2xl border border-white/20 whitespace-nowrap pointer-events-none transition-all duration-200 flex items-center space-x-1.5 ${
                    isHovered ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-2'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
                  <span>Click to Configure &amp; Acquire {product.name}</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5 opacity-50 hover:opacity-100 transition-opacity pointer-events-none z-10">
          <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">
            Scroll for Specifications &amp; Commercial Details
          </span>
          <div className="w-1 h-3 rounded-full bg-gray-400 animate-bounce" />
        </div>
      </section>

      {/* =========================================================================
          CINEMATIC PURCHASE & PROCUREMENT CONFIGURATION MODAL
          Direct purchase workflow for the currently viewed robot
          ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-2xl bg-[#0f1219] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 text-white z-10 overflow-hidden my-auto"
            >
              {/* Glow Accent */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/15 rounded-full blur-[80px] pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {formSubmitted ? (
                /* Success State */
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Procurement Request Received
                  </h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                    Thank you for ordering <strong className="text-white">{product.name}</strong>. An enterprise solutions specialist will contact you within 24 hours with allocation details, delivery timelines, and official purchase documentation.
                  </p>
                  <div className="pt-4">
                    <span className="text-xs text-emerald-400 font-mono">
                      Order Reference: HTK-{product.id}-{Date.now().toString().slice(-6)}
                    </span>
                  </div>
                </div>
              ) : (
                /* Purchase Form Content */
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
                      <span>Enterprise Direct Acquisition</span>
                      <span>•</span>
                      <span>{product.series}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                      Purchase {product.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Select your deployment tier and provide commercial details for instant purchase processing and logistics allocation.
                    </p>
                  </div>

                  {/* Deployment Configuration Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: 'pilot',
                        title: 'Evaluation Unit',
                        badge: 'Fast Dispatch',
                        desc: 'Single unit evaluation kit with full SDK & 14-day delivery.',
                      },
                      {
                        id: 'fleet',
                        title: 'Commercial Fleet',
                        badge: 'Production Tier',
                        desc: 'Volume production (5-50 units) with SLA & enterprise support.',
                      },
                      {
                        id: 'research',
                        title: 'R&D / Academic',
                        badge: 'Research Grant',
                        desc: 'Specialized configuration for AI laboratories & universities.',
                      },
                    ].map((tier) => {
                      const isSelected = deploymentType === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => setDeploymentType(tier.id as any)}
                          className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-600/20 border-cyan-400 text-white shadow-lg shadow-blue-500/10'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{tier.title}</span>
                            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded">
                              {tier.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 mt-1 leading-snug">
                            {tier.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Inquiry Form */}
                  <form onSubmit={handleSubmitInquiry} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Dr. Alex Mercer"
                            className="w-full bg-[#181c28] border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                          Organization / Company *
                        </label>
                        <div className="relative">
                          <Building2 className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="e.g. Apex Robotics Inc."
                            className="w-full bg-[#181c28] border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                          Business Email *
                        </label>
                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="work@company.com"
                            className="w-full bg-[#181c28] border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                          Direct Contact Phone *
                        </label>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 019-2834"
                            className="w-full bg-[#181c28] border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                        Application Scenario & Customization Requirements (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder={`Tell us about your intended operational use case for ${product.name}...`}
                        className="w-full bg-[#181c28] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={scrollToContact}
                        className="text-xs text-gray-400 hover:text-white transition-colors underline cursor-pointer"
                      >
                        Or complete full form on page ↓
                      </button>

                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-3 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
                      >
                        <PackageCheck className="w-4 h-4" />
                        <span>Confirm & Submit Purchase Inquiry</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
