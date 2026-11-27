'use client';

import React, { useState, useEffect } from 'react';
import { ProductData } from '../../types';
import { getProductData } from '../../services/productStore';

import ProductCinematicHero from './ProductCinematicHero';
import ProductIntroSection from './ProductIntroSection';
import ProductFeatureSlider from './ProductFeatureSlider';
import ProductScenariosCarousel from './ProductScenariosCarousel';
import ProductSpecsMatrix from './ProductSpecsMatrix';
import ProductRobotPurchaseSection from './ProductRobotPurchaseSection'; // PROTECTED BUY ME COMPONENT
import ProductEnquiryForm from './ProductEnquiryForm';

interface ProductDetailViewProps {
  product: ProductData;
  relatedProducts: ProductData[];
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const [currentProduct, setCurrentProduct] = useState<ProductData>(product);

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

  return (
    <div className="bg-white text-[#333333] min-h-screen">
      {/* SECTION 01: CINEMATIC HERO (.A3Ultra_One — includes Watch Video modal & Specs/Manual trigger) */}
      <ProductCinematicHero
        product={currentProduct}
        onSpecsClick={() => scrollToSection('specifications-section')}
      />

      {/* SECTION 02: FULL-BLEED AMBIENT INTRO (.A3Ultra_Two) */}
      <ProductIntroSection product={currentProduct} />

      {/* SECTION 03: CENTERED PEEKING CAPABILITY CAROUSEL (.A3Ultra_Three) */}
      <ProductFeatureSlider product={currentProduct} />

      {/* SECTION 04: CENTERED PEEKING APPLICATION SCENARIOS (.A3Ultra_Four) */}
      <ProductScenariosCarousel product={currentProduct} />

      {/* SECTION 05: PRODUCT SPECIFICATIONS (.A3Ultra_Five) */}
      <ProductSpecsMatrix product={currentProduct} />

      {/* SECTION 06: PROTECTED BUY ME SECTION (STRICTLY UNCHANGED, IMMEDIATELY BEFORE CONTACT US) */}
      <ProductRobotPurchaseSection product={currentProduct} />

      {/* SECTION 07: CONTACT US & PRODUCT ENQUIRY (IMMEDIATELY AFTER BUY ME) */}
      <ProductEnquiryForm product={currentProduct} />
    </div>
  );
}
