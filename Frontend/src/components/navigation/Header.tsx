'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Globe, ChevronDown, ChevronRight, ArrowRight, Menu, X } from 'lucide-react';
import { TECHNOLOGY_MENU, PRODUCTS_MENU, ABOUT_MENU } from '../../data/navigation';

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
          ? 'bg-white text-gray-900 border-b border-gray-200/80 shadow-sm'
          : 'bg-black text-white border-b border-white/10'
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
              isLightHeader ? 'text-gray-900 group-hover:text-brand-blue' : 'text-white group-hover:text-blue-400'
            }`}
          >
            HUTARK
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
          {/* Products Mega Menu Trigger & Direct Link */}
          <div
            className="relative py-6 select-none"
            onMouseEnter={() => setActiveMenu('products')}
          >
            <Link
              href="/products"
              onClick={() => setActiveMenu(null)}
              className={`flex items-center space-x-1 transition-colors ${
                isLightHeader ? 'text-gray-800 hover:text-brand-blue' : 'text-white hover:text-blue-400'
              } ${activeMenu === 'products' ? (isLightHeader ? 'text-brand-blue font-semibold' : 'text-blue-400 font-semibold') : ''}`}
            >
              <span>Products</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMenu === 'products' ? 'rotate-180' : ''
                }`}
              />
            </Link>
          </div>

          {/* R & D Link */}
          <Link
            href="/rd"
            className={`transition-colors py-6 ${
              isLightHeader ? 'text-gray-800 hover:text-brand-blue' : 'text-white hover:text-blue-400'
            }`}
            onMouseEnter={() => setActiveMenu(null)}
          >
            R & D
          </Link>

          {/* About Us Link & Hover Dropdown Trigger */}
          <Link
            href="/about"
            onClick={() => setActiveMenu(null)}
            onMouseEnter={() => setActiveMenu('about')}
            className="relative py-6 cursor-pointer select-none"
          >
            <span
              className={`flex items-center space-x-1 transition-colors ${
                isLightHeader ? 'text-gray-800 hover:text-brand-blue' : 'text-white hover:text-blue-400'
              } ${activeMenu === 'about' || pathname === '/about' ? (isLightHeader ? 'text-brand-blue font-semibold' : 'text-blue-400 font-semibold') : ''}`}
            >
              <span>About Us</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMenu === 'about' ? 'rotate-180' : ''
                }`}
              />
            </span>
          </Link>

          {/* News Link */}
          <Link
            href="/news"
            className={`transition-colors py-6 ${
              isLightHeader ? 'text-gray-800 hover:text-brand-blue' : 'text-white hover:text-blue-400'
            }`}
            onMouseEnter={() => setActiveMenu(null)}
          >
            News & Events
          </Link>

          {/* Contact Link */}
          <Link
            href="/contact"
            className={`transition-colors py-6 ${
              isLightHeader ? 'text-gray-800 hover:text-brand-blue' : 'text-white hover:text-blue-400'
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
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>EN</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 text-xs font-medium text-gray-700">
                <button
                  className="w-full text-left px-4 py-2 bg-gray-50 text-gray-900 font-bold flex items-center justify-between"
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
                : 'bg-brand-blue text-white hover:bg-blue-600 shadow-blue-500/30'
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
          PRODUCTS MEGA MENU (SHOWS ALL PRODUCTS ON HOVER / CLICK TO VISIT)
          ========================================================================= */}
      {activeMenu === 'products' && (
        <div
          className="absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-2xl py-8 animate-fadeIn text-gray-900"
          onMouseEnter={() => setActiveMenu('products')}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="site-container">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900 tracking-tight">HUTARK Robotics Fleet</h3>
                <p className="text-xs text-gray-500">Autonomous bipedal humanoids, wheeled-bipedal systems, quadruped robots, and physical AI platforms</p>
              </div>
              <Link
                href="/products"
                onClick={() => setActiveMenu(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-full transition-all hover:bg-blue-100 shadow-sm"
              >
                <span>View Full Product Fleet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

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
                          onClick={() => setActiveMenu(null)}
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
                              <span className="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-medium">
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
            {/* Mobile Products Accordion */}
            <div>
              <div className="w-full flex items-center justify-between py-3 border-b border-gray-100">
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-bold hover:text-brand-blue transition-colors flex-1"
                >
                  Products
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    setMobileActiveSubmenu(mobileActiveSubmenu === 'products' ? null : 'products')
                  }
                  className="p-1 text-gray-500 hover:text-gray-900 cursor-pointer"
                  aria-label="Toggle Products Submenu"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileActiveSubmenu === 'products' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {mobileActiveSubmenu === 'products' && (
                <div className="pl-4 py-3 space-y-4 bg-gray-50 rounded-xl my-2">
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-xs font-bold text-brand-blue py-1.5 border-b border-gray-200 mb-2"
                  >
                    <span>View All Products Fleet Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  {TECHNOLOGY_MENU.map((col, i) => (
                    <div key={i} className="space-y-1.5">
                      <h5 className="text-xs font-bold text-gray-900">{col.heading}</h5>
                      <ul className="space-y-1 pl-2">
                        {col.items.map((it, j) => (
                          <li key={j}>
                            <Link
                              href={it.href}
                              onClick={() => setMobileMenuOpen(false)}
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
              href="/rd"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-base font-bold border-b border-gray-100 hover:text-brand-blue transition-colors"
            >
              R & D
            </Link>

            <div>
              <div className="w-full flex items-center justify-between py-3 text-base font-bold border-b border-gray-100">
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 hover:text-brand-blue transition-colors"
                >
                  About Us
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    setMobileActiveSubmenu(mobileActiveSubmenu === 'about' ? null : 'about')
                  }
                  aria-label="Toggle About Us submenu"
                  className="p-1.5"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileActiveSubmenu === 'about' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

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

