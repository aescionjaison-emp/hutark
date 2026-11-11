'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowUp, X } from 'lucide-react';

export default function Footer() {
  const [activeQrModal, setActiveQrModal] = useState<string | null>(null);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1e2021] text-white pt-16 pb-8 border-t border-white/5 relative z-10">
      <div className="site-container">
        {/* TOP ROW: BRAND, PRODUCTS DIRECTORY, CONTACT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info & Socials */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="relative h-8 w-6 flex-shrink-0">
                <Image
                  src="/images/hutark-mark.png"
                  alt="HUTARK"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-2xl tracking-[0.16em] text-white">
                HUTARK
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              HUTARK is a global pioneer in general-purpose embodied artificial intelligence and dynamic humanoid robotics, building the future of physical intelligent work.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-2">
              {/* WeChat */}
              <button
                onClick={() => setActiveQrModal('/static/index/en/images/weixin.jpg')}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors group"
                title="WeChat"
              >
                <svg className="w-5 h-5 fill-gray-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                  <path d="M8.5 2C4.36 2 1 4.91 1 8.5c0 2.05 1.07 3.89 2.76 5.13l-.7 2.58 2.96-1.48c.78.21 1.61.32 2.48.32.22 0 .43 0 .65-.02-.19-.64-.29-1.32-.29-2.03 0-3.87 3.8-7 8.5-7 .35 0 .7.02 1.04.05C17.06 4.41 13.1 2 8.5 2zm-2 4.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm5 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm5.5 4.5c-4.14 0-7.5 2.69-7.5 6s3.36 6 7.5 6c.77 0 1.51-.1 2.21-.28l2.64 1.32-.62-2.3c1.51-1.1 2.47-2.74 2.47-4.57 0-3.31-3.36-6-7.5-6zm-2.5 4c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25zm5 0c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25z"/>
                </svg>
              </button>

              {/* Weibo */}
              <button
                onClick={() => setActiveQrModal('/static/index/en/images/weibo.jpg')}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors group"
                title="Weibo"
              >
                <svg className="w-5 h-5 fill-gray-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                  <path d="M10.15 16.7c-2.8 0-5.1-1.55-5.1-3.48 0-1.89 2.2-3.44 4.95-3.47 2.8 0 5.1 1.55 5.1 3.48 0 1.9-2.22 3.47-4.95 3.47zm7.42-3.83c-.31-.08-.52-.16-.36-.57.34-.89.37-1.65.03-2.18-.63-.98-2.35-.93-4.36.03-.4.19-.62.09-.53-.25.32-1.23.25-2.25-.28-2.77-1.15-1.13-4.25.04-6.92 2.62-2.18 2.1-3.32 4.49-3.32 6.55 0 3.91 4.54 6.27 8.97 6.27 5.78 0 9.6-3.44 9.6-6.17 0-1.66-1.37-2.71-2.83-3.53zm3.76-4.9c-.36-.18-.77-.18-1.04.05-.24.2-.28.53-.1.85.83 1.48.51 3.3-.77 4.31-.38.3-.39.75-.05 1.05.34.3.82.26 1.17-.07 1.77-1.4 2.25-3.92 1.15-5.91-.12-.22-.22-.38-.36-.48z"/>
                </svg>
              </button>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/AGIBOT"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors group"
                title="LinkedIn"
              >
                <div className="relative w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity">
                  <Image src="/static/index/en/images/foot-icon3.png" alt="LinkedIn" fill className="object-contain invert" />
                </div>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/AGIBOT"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors group"
                title="Facebook"
              >
                <div className="relative w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity">
                  <Image src="/static/index/en/images/foot-icon4.png" alt="Facebook" fill className="object-contain invert" />
                </div>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors group"
                title="YouTube"
              >
                <div className="relative w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity">
                  <Image src="/static/index/en/images/foot-icon5.png" alt="YouTube" fill className="object-contain invert" />
                </div>
              </a>
            </div>
          </div>

          {/* Product Series Columns */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">HUTARK A & X</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/products/A3Ultra" className="hover:text-white transition-colors">A3 Ultra</Link></li>
              <li><Link href="/products/A3" className="hover:text-white transition-colors">A3</Link></li>
              <li><Link href="/products/A2_Ultra" className="hover:text-white transition-colors">A2 Ultra</Link></li>
              <li><Link href="/products/A2_Pro" className="hover:text-white transition-colors">A2 Lite</Link></li>
              <li className="pt-2 border-t border-white/5"><Link href="/products/X2" className="hover:text-white transition-colors">X2</Link></li>
              <li><Link href="/products/X1" className="hover:text-white transition-colors">X1</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">HUTARK G & C</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/products/G2" className="hover:text-white transition-colors">G2</Link></li>
              <li><Link href="/products/G1_MAX" className="hover:text-white transition-colors">G1 Max</Link></li>
              <li><Link href="/products/G1" className="hover:text-white transition-colors">G1</Link></li>
              <li className="pt-2 border-t border-white/5"><Link href="/products/C5" className="hover:text-white transition-colors">C5 Cleaning Robot</Link></li>
              <li><a href="https://www.maniformer.ai/en" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Data Service</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">HUTARK D Series</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/products/D1_Pro" className="hover:text-white transition-colors">D1 Pro/Edu</Link></li>
              <li><Link href="/products/D1Ultra" className="hover:text-white transition-colors">D1 Ultra</Link></li>
              <li><Link href="/products/D1_Max" className="hover:text-white transition-colors">D1 Max</Link></li>
              <li><Link href="/products/D1_MaxPro" className="hover:text-white transition-colors">D1 MaxPro</Link></li>
              <li className="pt-2 border-t border-white/5"><Link href="/products" className="hover:text-white transition-colors">Product Matrix</Link></li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact & Support</h4>
            <div className="space-y-3">
              <a
                href="mailto:sales@hutark.com"
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-brand-blue" />
                <span>sales@hutark.com</span>
              </a>
              <Link
                href="/contact"
                className="inline-block mt-2 text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors"
              >
                Inquire Now
              </Link>
            </div>

            {/* Back to top */}
            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 text-xs text-gray-400 hover:text-white transition-colors"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: COPYRIGHT & LEGAL */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>
            Copyright © 2023-2026 HUTARK Innovation Technology Co., Ltd. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/about" className="hover:text-gray-300 transition-colors">
              Defined Support Period
            </Link>
            <span>|</span>
            <Link href="/about" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/about" className="hover:text-gray-300 transition-colors">
              Cookie Policy
            </Link>
            <span>|</span>
            <button onClick={() => alert('Cookie preferences updated.')} className="hover:text-gray-300 transition-colors">
              Cookie Settings
            </button>
            <span>|</span>
            <Link href="/about" className="hover:text-gray-300 transition-colors">
              Coordinated Vulnerability Disclosure Policy
            </Link>
          </div>
        </div>
      </div>

      {/* QR Code Popover Modal */}
      {activeQrModal && (
        <div 
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveQrModal(null)}
        >
          <div 
            className="bg-[#161922] border border-white/15 p-6 rounded-2xl max-w-xs w-full text-center relative shadow-2xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveQrModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h5 className="text-sm font-semibold text-white mb-4">Scan QR Code</h5>
            <div className="relative w-48 h-48 mx-auto bg-white p-2 rounded-xl overflow-hidden">
              <Image
                src={activeQrModal}
                alt="QR Code"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-gray-400 mt-4">Follow HUTARK Official Channels</p>
          </div>
        </div>
      )}
    </footer>
  );
}

