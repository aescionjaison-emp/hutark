'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Tag, ArrowRight, ChevronRight } from 'lucide-react';
import { NEWS_ARTICLES } from '../../data/news';

const CATEGORIES = ['All', 'Events', 'Corporate', 'Achievements'];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles =
    selectedCategory === 'All'
      ? NEWS_ARTICLES
      : NEWS_ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <div className="bg-white text-[#333333] pt-20 min-h-screen">
      {/* =========================================================================
          HERO BANNER
          ========================================================================= */}
      <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-white border-b border-gray-100">
        <div className="site-container max-w-4xl text-center space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-brand-blue border border-blue-100">
            Newsroom & Events
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
            Latest News & Announcements
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Stay up to date with product launches, manufacturing milestones, academic research papers, and corporate achievements.
          </p>
        </div>
      </section>

      {/* =========================================================================
          CATEGORY FILTER TABS
          ========================================================================= */}
      <section className="sticky top-20 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
        <div className="site-container flex items-center justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-blue text-white shadow-md shadow-blue-500/20'
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* =========================================================================
          NEWS GRID (WHITE & LIGHT CARDS)
          ========================================================================= */}
      <section className="py-20 bg-[#fbfbfb]">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-60 w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={article.img}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-white/90 text-gray-900 px-3 py-1 rounded-full shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-blue transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-light line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-brand-blue group-hover:translate-x-1 transition-transform">
                    <span>Read Full Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

