import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, Cpu, ShieldCheck, Mail, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../../../data/products';

export function generateStaticParams() {
  return Object.keys(PRODUCTS).map((id) => ({
    id: id,
  }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const product = PRODUCTS[params.id];
  if (!product) return { title: 'Product Not Found - HUTARK' };
  return {
    title: `${product.name} — ${product.series} | HUTARK`,
    description: product.overview,
  };
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS[params.id];

  if (!product) {
    notFound();
  }

  const allProductKeys = Object.keys(PRODUCTS);
  const relatedProducts = allProductKeys
    .filter((k) => k !== product.id)
    .slice(0, 3)
    .map((k) => PRODUCTS[k]);

  return (
    <div className="bg-white text-[#333333] pt-20 min-h-screen">
      {/* =========================================================================
          PRODUCT HERO (CLEAN WHITE/LIGHT APPEARANCE)
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 via-white to-white border-b border-gray-100">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                <span>{product.series}</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-xl font-medium text-gray-700">
                {product.tagline}
              </p>
              <p className="text-base text-gray-600 font-light leading-relaxed">
                {product.overview}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-brand-blue hover:bg-blue-600 text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-md text-sm flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Inquire for Deployment</span>
                </Link>
                <Link
                  href="/products"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-8 py-3.5 rounded-full transition-colors text-sm"
                >
                  All Robots
                </Link>
              </div>
            </div>

            {/* Right Product Image */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative h-[420px] sm:h-[500px] w-full bg-[#f8f8f8] rounded-3xl border border-gray-200 flex items-center justify-center p-8 shadow-sm">
                <Image
                  src={product.heroImg}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain p-6"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DETAILED SPECIFICATIONS TABLE (CLEAN WHITE/LIGHT ROWS)
          ========================================================================= */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="site-container max-w-5xl">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
              Technical Parameters
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Specifications
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr
                    key={i}
                    className={`border-b border-gray-100 transition-colors ${
                      i % 2 === 0 ? 'bg-[#fbfbfb]' : 'bg-white'
                    }`}
                  >
                    <td className="py-4 px-6 font-semibold text-gray-600 w-1/3">
                      {spec.label}
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY FEATURES & ARCHITECTURE
          ========================================================================= */}
      {product.features && product.features.length > 0 && (
        <section className="py-20 bg-[#f8f8f8] border-b border-gray-100">
          <div className="site-container max-w-5xl">
            <div className="text-center space-y-3 mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
                Engineering Highlights
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Core Architectural Features
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {product.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{feat.title}</h3>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          INDUSTRIAL APPLICATIONS
          ========================================================================= */}
      {product.applications && product.applications.length > 0 && (
        <section className="py-20 bg-white border-b border-gray-100">
          <div className="site-container max-w-5xl">
            <div className="text-center space-y-3 mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
                Deployment Scenarios
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Enterprise Applications
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {product.applications.map((app, idx) => (
                <div
                  key={idx}
                  className="bg-[#fbfbfb] p-8 rounded-2xl border border-gray-200 space-y-3"
                >
                  <h3 className="text-lg font-bold text-gray-900">{app.title}</h3>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    {app.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          RELATED PRODUCTS
          ========================================================================= */}
      <section className="py-20 bg-[#f8f8f8]">
        <div className="site-container">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-gray-900">Explore Related Models</h3>
            <Link href="/products" className="text-sm font-bold text-brand-blue hover:text-blue-700">
              View All Products →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((rel, i) => (
              <Link
                key={i}
                href={`/products/${rel.id}`}
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="relative h-48 w-full bg-[#f8f8f8] rounded-xl flex items-center justify-center p-4 mb-4">
                  <Image src={rel.heroImg} alt={rel.name} fill className="object-contain p-2" />
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-blue">{rel.series}</span>
                  <h4 className="text-lg font-bold text-gray-900 mt-1">{rel.name}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{rel.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

