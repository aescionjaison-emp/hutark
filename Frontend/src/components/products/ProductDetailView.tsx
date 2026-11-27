'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { ProductData } from '../../types';
import { getProductData } from '../../services/productStore';

// Redesigned AGIBOT-Calibrated Product Detail Components
import ProductCinematicHero from './ProductCinematicHero';
import ProductIntroSection from './ProductIntroSection';
import ProductVideoExperience from './ProductVideoExperience';
import ProductRobotPurchaseSection from './ProductRobotPurchaseSection'; // PROTECTED BUY ME COMPONENT
import ProductFeatureSlider from './ProductFeatureSlider';
import ProductTechTelemetry from './ProductTechTelemetry';
import ProductScenariosCarousel from './ProductScenariosCarousel';
import ProductSpecsMatrix from './ProductSpecsMatrix';
import ProductDocumentation from './ProductDocumentation';
import ProductEnquiryForm from './ProductEnquiryForm';

interface ProductDetailViewProps {
  product: ProductData;
  relatedProducts: ProductData[];
}

export default function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const [currentProduct, setCurrentProduct] = useState<ProductData>(product);

  // Sync state with productStore when admin updates any product fields
  useEffect(() => {
    const loaded = getProductData(product.id);
    if (loaded) {
      setCurrentProduct(loaded);
    }

    const handleUpdate = (e: any) => {
      if (e.detail?.id === product.id || e.detail?.all) {
        const refreshed = getProductData(product.id);
        if (refreshed) setCurrentProduct(refreshed);
      }
    };

    window.addEventListener('hutark_product_updated', handleUpdate);
    return () => {
      window.removeEventListener('hutark_product_updated', handleUpdate);
    };
  }, [product.id]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const primaryColor = currentProduct.customStyles?.primaryColor || '#0062c5';

  return (
    <div className="bg-white text-[#1a1a1a] min-h-screen selection:bg-gray-900 selection:text-white">
      {/* =========================================================================
          SECTION 01: CINEMATIC PRODUCT HERO (MASTER REFERENCE: A3Ultra_One)
          ========================================================================= */}
      <ProductCinematicHero
        product={currentProduct}
        onSpecsClick={() => scrollToSection('specifications-section')}
      />

      {/* =========================================================================
          SECTION 02: PRODUCT INTRODUCTION / NARRATIVE AMBIENCE (REFERENCE: A3Ultra_Two)
          ========================================================================= */}
      <ProductIntroSection
        product={currentProduct}
      />

      {/* =========================================================================
          SECTION 03: PRODUCT VIDEO EXPERIENCE (CINEMATIC YOUTUBE PRESENTATION)
          ========================================================================= */}
      <ProductVideoExperience
        productName={currentProduct.name}
        videos={currentProduct.youtubeVideos}
        primaryColor={primaryColor}
      />

      {/* =========================================================================
          SECTION 04: EXISTING BUY ME SECTION (PROTECTED COMPONENT — STRICTLY PRESERVED)
          ========================================================================= */}
      <ProductRobotPurchaseSection
        product={currentProduct}
      />

      {/* =========================================================================
          SECTION 05: DYNAMIC PRODUCT FEATURE SHOWCASE (REFERENCE: A3Ultra_Three)
          ========================================================================= */}
      <ProductFeatureSlider
        product={currentProduct}
      />

      {/* =========================================================================
          SECTION 06: PERFORMANCE & TECHNOLOGY TELEMETRY
          ========================================================================= */}
      <ProductTechTelemetry
        product={currentProduct}
      />

      {/* =========================================================================
          SECTION 07: PRODUCT APPLICATION SCENARIOS (REFERENCE: A3Ultra_Four)
          ========================================================================= */}
      <ProductScenariosCarousel
        product={currentProduct}
      />

      {/* =========================================================================
          SECTION 08: PRODUCT SPECIFICATIONS MATRIX (REFERENCE: A3Ultra_Five)
          ========================================================================= */}
      <ProductSpecsMatrix
        product={currentProduct}
      />

      {/* =========================================================================
          SECTION 09: TECHNICAL DOCUMENTATION & MANUALS
          ========================================================================= */}
      <ProductDocumentation
        product={currentProduct}
      />

      {/* =========================================================================
          SECTION 10: PRODUCT CONTACT & ENQUIRY INTEGRATION
          ========================================================================= */}
      <ProductEnquiryForm
        product={currentProduct}
      />

      {/* =========================================================================
          SECTION 11: REFINED PAGE ENDING & LINEUP EXPLORATION
          ========================================================================= */}
      <section className="py-24 bg-[#fafbfc] border-t border-gray-200">
        <div className="site-container max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#8f7435] uppercase tracking-[0.25em] block mb-1">
                FLEET PORTFOLIO
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Explore Other HUTARK Robots
              </h3>
            </div>
            <NextLink
              href="/products"
              className="text-xs font-bold text-gray-800 hover:text-black uppercase tracking-wider flex items-center space-x-1.5 group"
            >
              <span>View Full Fleet Portfolio</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </NextLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((rel, i) => (
              <NextLink
                key={i}
                href={`/products/${rel.id}`}
                className="bg-white p-7 rounded-3xl border border-gray-200/90 hover:border-gray-900 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="relative h-56 w-full bg-[#f6f7f9] rounded-2xl flex items-center justify-center p-4 mb-6 overflow-hidden">
                  <Image
                    src={rel.heroImg}
                    alt={rel.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#8f7435] uppercase tracking-wider">
                    {rel.series}
                  </span>
                  <h4 className="text-lg font-bold text-gray-950 group-hover:text-black transition-colors">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {rel.tagline || rel.overview}
                  </p>
                </div>
              </NextLink>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
