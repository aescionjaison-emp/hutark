import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Tag, ArrowLeft, ChevronRight } from 'lucide-react';
import { NEWS_ARTICLES } from '../../../data/news';

export function generateStaticParams() {
  return NEWS_ARTICLES.map((a) => ({
    id: a.id,
  }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const article = NEWS_ARTICLES.find((a) => a.id === params.id);
  if (!article) return { title: 'Article Not Found — HUTARK' };
  return {
    title: `${article.title} — HUTARK Newsroom`,
    description: article.summary,
  };
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const article = NEWS_ARTICLES.find((a) => a.id === params.id);

  if (!article) {
    notFound();
  }

  const related = NEWS_ARTICLES.filter((a) => a.id !== article.id);

  return (
    <div className="bg-white text-[#333333] pt-20 min-h-screen">
      {/* =========================================================================
          ARTICLE HEADER
          ========================================================================= */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="site-container max-w-4xl space-y-5">
          <Link
            href="/news"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-gray-500 hover:text-brand-blue transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to News Center</span>
          </Link>

          <div className="flex items-center space-x-3 text-xs text-gray-500 pt-2">
            <span className="font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
              {article.category}
            </span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {article.title}
          </h1>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            {article.summary}
          </p>
        </div>
      </section>

      {/* =========================================================================
          FEATURED IMAGE & CONTENT
          ========================================================================= */}
      <section className="py-16">
        <div className="site-container max-w-4xl space-y-12">
          {/* Main Cover Image */}
          <div className="relative h-[400px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-lg bg-gray-100">
            <Image
              src={article.img}
              alt={article.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="space-y-10 leading-relaxed text-gray-700 text-base sm:text-lg">
            {article.content.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {sec.sectionHeading}
                </h2>
                {sec.body.map((p, pIdx) => (
                  <p key={pIdx} className="font-light leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Share / Back Bar */}
          <div className="pt-10 border-t border-gray-100 flex items-center justify-between">
            <Link
              href="/news"
              className="text-xs font-bold text-brand-blue hover:text-blue-700 uppercase tracking-wider flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to All News</span>
            </Link>
            <span className="text-xs text-gray-400">Published by HUTARK Corporate Communications</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          RELATED NEWS
          ========================================================================= */}
      {related.length > 0 && (
        <section className="py-20 bg-[#f8f8f8]">
          <div className="site-container max-w-5xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.slice(0, 2).map((rel) => (
                <Link
                  key={rel.id}
                  href={`/news/${rel.id}`}
                  className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-brand-blue">{rel.category}</span>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-brand-blue transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-gray-500 font-light line-clamp-2">{rel.summary}</p>
                  </div>
                  <div className="pt-4 flex items-center text-xs font-semibold text-brand-blue">
                    <span>Read Story</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

