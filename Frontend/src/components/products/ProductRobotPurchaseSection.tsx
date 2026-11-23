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
  PackageCheck
} from 'lucide-react';
import { ProductData } from '../../types';
import { inquiryStore } from '../../services/inquiryStore';

interface ProductRobotPurchaseSectionProps {
  product: ProductData;
  onCustomPurchase?: () => void;
}

export default function ProductRobotPurchaseSection({
  product,
  onCustomPurchase,
}: ProductRobotPurchaseSectionProps) {
  // If admin toggled off the buy section for this robot, do not render
  if (product.buySectionEnabled === false) {
    return null;
  }

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

  // Dynamic admin-customized parameters with robust defaults
  const posX = typeof product.buyButtonPosX === 'number' ? product.buyButtonPosX : 40.0;
  const posY = typeof product.buyButtonPosY === 'number' ? product.buyButtonPosY : 80.2;
  const buttonScale = typeof product.buyButtonScale === 'number' ? product.buyButtonScale : 1.0;
  const isButtonVisible = product.buyButtonVisible !== false;
  const bgImage = product.buySectionImage || "/images/products/robot_buy_me_palm_rings_1920x1080.jpg";
  const bgZoom = typeof product.buySectionBgZoom === 'number' ? product.buySectionBgZoom : 1.0;
  const bgPosY = typeof product.buySectionBgPosY === 'number' ? product.buySectionBgPosY : 50;
  const buttonText = product.buyButtonText && product.buyButtonText.trim() !== '' 
    ? product.buyButtonText.trim() 
    : 'BUY ME';

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

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    try {
      await inquiryStore.saveInquiry({
        type: 'buy_me_order',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        productName: product.name,
        productId: product.id,
        deploymentTier:
          deploymentType === 'pilot'
            ? 'Evaluation Unit (Fast Dispatch)'
            : deploymentType === 'fleet'
            ? 'Commercial Fleet (5-50 units)'
            : 'R&D / Academic Grant',
        message: formData.notes || `Direct enterprise order inquiry for ${product.name}`,
        status: 'new',
      });
    } catch (err) {
      console.error('Failed to save order to inquiry store:', err);
    }

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
          {/* Edge-to-Edge 1920x1080 Showroom Asset with dynamic zoom and alignment */}
          <div 
            className="relative w-full h-full overflow-hidden"
            style={{
              transform: `scale(${bgZoom})`,
              transformOrigin: `50% ${bgPosY}%`,
              transition: 'transform 0.3s ease',
            }}
          >
            <Image
              src={bgImage}
              alt={`${product.name} - Buy Me`}
              fill
              priority
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: `50% ${bgPosY}%`,
              }}
              className="pointer-events-none select-none"
            />

            {/* =====================================================================
                REAL "BUY ME" CAPSULE BUTTON NESTLED ON HAND
                Positioned directly on the robot's open palm & glowing holographic rings
                Center: X = posX %, Y = posY % (Default: 40.00%, 80.20%)
                ===================================================================== */}
            {isButtonVisible && (
              <div
                className="absolute pointer-events-auto z-20"
                style={{
                  left: `${posX}%`,
                  top: `${posY}%`,
                  width: '14.5%',
                  minWidth: '175px',
                  maxWidth: '280px',
                  transform: `translate(-50%, -50%) scale(${buttonScale})`,
                  transformOrigin: 'center center',
                  transition: 'left 0.2s ease, top 0.2s ease, transform 0.2s ease',
                }}
              >
                {/* Floating Animation Wrapper */}
                <motion.div
                  animate={{
                    y: isHovered ? -5 : [0, -2, 0],
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{
                    y: isHovered 
                      ? { duration: 0.2, ease: 'easeOut' }
                      : { repeat: Infinity, duration: 4.0, ease: 'easeInOut' },
                    scale: { duration: 0.2, ease: 'easeOut' }
                  }}
                  className="relative w-full flex items-center justify-center"
                >
                  {/* Holographic Warm-White Illuminated Ring / Halo beneath capsule */}
                  <div 
                    className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-[88%] h-4 rounded-[100%] bg-gradient-to-r from-transparent via-[#fff1dc] to-transparent blur-[3px] pointer-events-none transition-all duration-300 ${
                      isHovered ? 'opacity-100 scale-110' : 'opacity-85 animate-pulse'
                    }`}
                    style={{
                      boxShadow: isHovered 
                        ? '0 0 30px rgba(255, 230, 180, 0.95), 0 0 50px rgba(255, 255, 255, 0.8)' 
                        : '0 0 18px rgba(255, 220, 175, 0.65)'
                    }}
                  />

                  {/* Real High-Gloss Champagne-Gold Rimmed Capsule Button */}
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onFocus={() => setIsHovered(true)}
                    onBlur={() => setIsHovered(false)}
                    aria-label={`Buy ${product.name} Now`}
                    className="group relative w-full aspect-[3.25/1] rounded-full border-2 border-[#dfc39a] hover:border-[#ffe8c5] text-white font-black tracking-[0.18em] uppercase flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer overflow-hidden focus:outline-none focus:ring-4 focus:ring-[#dfc39a]/50"
                    style={{
                      background: 'linear-gradient(180deg, #1b1d26 0%, #0d0e14 55%, #06070a 100%)',
                      boxShadow: isHovered
                        ? '0 16px 38px -6px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 230, 180, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.5)'
                        : '0 10px 28px -5px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 220, 175, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.35)',
                    }}
                  >
                    {/* Top-half Glass Highlight Gradient Reflection */}
                    <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-t-full pointer-events-none" />

                    {/* Inner Metallic Border Glow */}
                    <div className="absolute inset-[1px] rounded-full border border-white/15 pointer-events-none" />

                    {/* Button Typography: White uppercase "BUY ME" or custom name */}
                    <span className="relative z-10 text-xs sm:text-sm md:text-base font-extrabold text-white drop-shadow-md tracking-[0.18em] transition-transform duration-200 group-hover:scale-105 flex items-center justify-center space-x-1.5 px-3">
                      <span>{buttonText}</span>
                    </span>

                    {/* Hover Sheen Sweep Animation */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                  </button>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLEAN, WHITE, PROFESSIONAL ENTERPRISE PURCHASE MODAL
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
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Dialog Card: Clean, White, Simple, Professional */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-2xl bg-white border border-gray-100 rounded-3xl shadow-2xl p-6 sm:p-10 text-gray-900 z-10 overflow-hidden my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {formSubmitted ? (
                /* Success State */
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Procurement Request Received
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    Thank you for ordering <strong className="text-gray-900">{product.name}</strong>. An enterprise solutions specialist will contact you within 24 hours with allocation details, delivery timelines, and official purchase documentation.
                  </p>
                  <div className="pt-3">
                    <span className="text-xs text-gray-500 font-mono bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                      Order Reference: HTK-{product.id}-{Date.now().toString().slice(-6)}
                    </span>
                  </div>
                </div>
              ) : (
                /* Purchase Form Content */
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block">
                      Enterprise Direct Acquisition • {product.series}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
                      Purchase {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Select your deployment tier and provide commercial details for direct purchase processing and logistics allocation.
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
                        desc: 'Volume production (5–50 units) with SLA & enterprise support.',
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
                          className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50/60 border-2 border-brand-blue text-gray-900 shadow-sm'
                              : 'bg-gray-50/70 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-900">{tier.title}</span>
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                              isSelected
                                ? 'bg-blue-100 text-brand-blue font-bold'
                                : 'bg-gray-200/80 text-gray-600'
                            }`}>
                              {tier.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-1.5 leading-snug">
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
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Dr. Alex Mercer"
                            className="w-full bg-gray-50/70 border border-gray-200 focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-blue-100 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition-all outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                          Organization / Company *
                        </label>
                        <div className="relative">
                          <Building2 className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="e.g. Apex Robotics Inc."
                            className="w-full bg-gray-50/70 border border-gray-200 focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-blue-100 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition-all outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                          Business Email *
                        </label>
                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="work@company.com"
                            className="w-full bg-gray-50/70 border border-gray-200 focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-blue-100 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition-all outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                          Direct Contact Phone *
                        </label>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 019-2834"
                            className="w-full bg-gray-50/70 border border-gray-200 focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-blue-100 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition-all outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Application Scenario &amp; Customization Requirements (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder={`Tell us about your intended operational use case for ${product.name}...`}
                        className="w-full bg-gray-50/70 border border-gray-200 focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-blue-100 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition-all outline-none resize-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-end">
                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-brand-blue hover:bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                      >
                        <PackageCheck className="w-4 h-4" />
                        <span>Confirm &amp; Submit Purchase Inquiry</span>
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
