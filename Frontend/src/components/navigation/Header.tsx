'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Globe, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { TECHNOLOGY_MENU, ABOUT_MENU } from '../../data/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const pathname = usePathname();

  // Scroll listener matching AGIBOT reference threshold
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
    setLangMenuOpen(false);
  }, [pathname]);

  const isLightHeader = isScrolled || activeMenu !== null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center ${
        isLightHeader
          ? 'bg-white text-gray-800 border-b border-gray-200 shadow-sm'
          : 'bg-[rgba(138,151,161,0.36)] backdrop-blur-md text-white border-b border-white/10'
      }`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="site-container flex items-center justify-between w-full">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative h-9 w-7 flex-shrink-0">
            <Image
              src="/images/hutark-mark.png"
              alt="HUTARK"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span
            className={`font-black text-2xl tracking-[0.18em] transition-colors ${
              isLightHeader ? 'text-gray-900 group-hover:text-brand-blue' : 'text-white'
            }`}
          >
            HUTARK
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
          {/* Products Mega Menu Trigger */}
          <div
            className="relative py-6 cursor-pointer"
            onMouseEnter={() => setActiveMenu('products')}
          >
            <span
              className={`flex items-center space-x-1 transition-colors ${
                isLightHeader ? 'hover:text-brand-blue' : 'hover:text-cyan-300'
              } ${activeMenu === 'products' ? (isLightHeader ? 'text-brand-blue' : 'text-cyan-300') : ''}`}
            >
              <span>Products</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Technology Link */}
          <Link
            href="/technology"
            className={`transition-colors ${
              isLightHeader ? 'hover:text-brand-blue' : 'hover:text-cyan-300'
            }`}
            onMouseEnter={() => setActiveMenu(null)}
          >
            Technology & OS
          </Link>

          {/* About Dropdown Trigger */}
          <div
            className="relative py-6 cursor-pointer"
            onMouseEnter={() => setActiveMenu('about')}
          >
            <span
              className={`flex items-center space-x-1 transition-colors ${
                isLightHeader ? 'hover:text-brand-blue' : 'hover:text-cyan-300'
              } ${activeMenu === 'about' ? (isLightHeader ? 'text-brand-blue' : 'text-cyan-300') : ''}`}
            >
              <span>About Us</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* News Link */}
          <Link
            href="/news"
            className={`transition-colors ${
              isLightHeader ? 'hover:text-brand-blue' : 'hover:text-cyan-300'
            }`}
            onMouseEnter={() => setActiveMenu(null)}
          >
            News & Events
          </Link>

          {/* Contact Link */}
          <Link
            href="/contact"
            className={`transition-colors ${
              isLightHeader ? 'hover:text-brand-blue' : 'hover:text-cyan-300'
            }`}
            onMouseEnter={() => setActiveMenu(null)}
          >
            Contact
          </Link>
        </nav>

        {/* RIGHT ACTIONS: LANGUAGE & INQUIRE BUTTON */}
        <div className="hidden lg:flex items-center space-x-5">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full transition-colors ${
                isLightHeader
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>EN</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 text-xs font-medium text-gray-700">
                <button
                  className="w-full text-left px-4 py-2 bg-blue-50 text-brand-blue font-bold flex items-center justify-between"
                  onClick={() => setLangMenuOpen(false)}
                >
                  <span>English</span>
                  <span>✓</span>
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                  onClick={() => {
                    alert('Switching to Chinese (Reference Locale)...');
                    setLangMenuOpen(false);
                  }}
                >
                  <span>简体中文</span>
                </button>
              </div>
            )}
          </div>

          {/* Inquire CTA Button */}
          <Link
            href="/contact"
            className={`text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-sm ${
              isLightHeader
                ? 'bg-brand-blue text-white hover:bg-blue-600 shadow-blue-500/20'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            Inquire Now
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            isLightHeader ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* =========================================================================
          PRODUCTS MEGA MENU (8 COLUMNS - WHITE BACKGROUND)
          ========================================================================= */}
      {activeMenu === 'products' && (
        <div
          className="absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-2xl py-8 animate-fadeIn"
          onMouseEnter={() => setActiveMenu('products')}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="site-container">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 max-h-[75vh] overflow-y-auto no-scrollbar">
              {TECHNOLOGY_MENU.map((col, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
                    {col.heading}
                  </h4>
                  <ul className="space-y-3">
                    {col.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <Link
                          href={item.href}
                          className="group block text-xs text-gray-600 hover:text-brand-blue transition-colors"
                        >
                          {item.img && (
                            <div className="relative h-20 w-full mb-2 bg-[#f8f8f8] rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center p-2 group-hover:border-blue-200 transition-colors">
                              <Image
                                src={item.img}
                                alt={item.title}
                                fill
                                className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="font-medium group-hover:font-semibold">
                              {item.title}
                            </span>
                            {item.tag && (
                              <span className="text-[10px] bg-blue-50 text-brand-blue px-1.5 py-0.5 rounded font-bold">
                                {item.tag}
                              </span>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ABOUT US DROPDOWN (WHITE BACKGROUND)
          ========================================================================= */}
      {activeMenu === 'about' && (
        <div
          className="absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-2xl py-8 animate-fadeIn"
          onMouseEnter={() => setActiveMenu('about')}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="site-container max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ABOUT_MENU.map((col, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
                    {col.heading}
                  </h4>
                  <ul className="space-y-2.5">
                    {col.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <Link
                          href={item.href}
                          className="flex items-center justify-between text-xs font-medium text-gray-600 hover:text-brand-blue transition-colors py-1 group"
                        >
                          <span>{item.title}</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-brand-blue" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MOBILE DRAWER
          ========================================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-white z-50 overflow-y-auto px-6 py-6 border-t border-gray-100 lg:hidden text-gray-800">
          <div className="space-y-6">
            <div>
              <button
                onClick={() =>
                  setMobileActiveSubmenu(mobileActiveSubmenu === 'products' ? null : 'products')
                }
                className="w-full flex items-center justify-between py-3 text-base font-bold border-b border-gray-100"
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileActiveSubmenu === 'products' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileActiveSubmenu === 'products' && (
                <div className="pl-4 py-3 space-y-4 bg-gray-50 rounded-xl my-2">
                  {TECHNOLOGY_MENU.map((col, i) => (
                    <div key={i} className="space-y-1.5">
                      <h5 className="text-xs font-bold text-gray-900">{col.heading}</h5>
                      <ul className="space-y-1 pl-2">
                        {col.items.map((it, j) => (
                          <li key={j}>
                            <Link
                              href={it.href}
                              className="text-xs text-gray-600 hover:text-brand-blue block py-1"
                            >
                              {it.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/technology"
              className="block py-3 text-base font-bold border-b border-gray-100"
            >
              Technology & OS
            </Link>

            <div>
              <button
                onClick={() =>
                  setMobileActiveSubmenu(mobileActiveSubmenu === 'about' ? null : 'about')
                }
                className="w-full flex items-center justify-between py-3 text-base font-bold border-b border-gray-100"
              >
                <span>About Us</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileActiveSubmenu === 'about' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileActiveSubmenu === 'about' && (
                <div className="pl-4 py-3 space-y-3 bg-gray-50 rounded-xl my-2">
                  {ABOUT_MENU.flatMap((m) => m.items).map((it, idx) => (
                    <Link
                      key={idx}
                      href={it.href}
                      className="block text-xs text-gray-600 hover:text-brand-blue py-1"
                    >
                      {it.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/news" className="block py-3 text-base font-bold border-b border-gray-100">
              News & Events
            </Link>

            <Link href="/contact" className="block py-3 text-base font-bold border-b border-gray-100">
              Contact Us
            </Link>

            <div className="pt-6">
              <Link
                href="/contact"
                className="block w-full text-center py-3 bg-brand-blue text-white font-bold rounded-xl shadow-md text-sm"
              >
                Inquire Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

