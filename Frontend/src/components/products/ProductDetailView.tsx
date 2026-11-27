'use client';

import React, { useState, useEffect } from 'react';
import { ProductData } from '../../types';
import { getProductData } from '../../services/productStore';

import ProductCinematicHero from './ProductCinematicHero';
import ProductIntroSection from './ProductIntroSection';
import ProductVideoExperience from './ProductVideoExperience';
import ProductRobotPurchaseSection from './ProductRobotPurchaseSection'; // PROTECTED BUY ME COMPONENT
import ProductFeatureSlider from './ProductFeatureSlider';
import ProductScenariosCarousel from './ProductScenariosCarousel';
import ProductSpecsMatrix from './ProductSpecsMatrix';
import ProductDocumentation from './ProductDocumentation';
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

  const primaryColor = currentProduct.customStyles?.primaryColor || '#0062c5';

  return (
    <div className="bg-white text-[#333333] min-h-screen">
      {/* SECTION 01: CINEMATIC HERO (.A3Ultra_One) */}
      <ProductCinematicHero
        product={currentProduct}
        onSpecsClick={() => scrollToSection('specifications-section')}
      />

      {/* SECTION 02: FULL-BLEED AMBIENT INTRO (.A3Ultra_Two) */}
      <ProductIntroSection product={currentProduct} />

      {/* SECTION 03: PRODUCT YOUTUBE VIDEO EXPERIENCE */}
      <ProductVideoExperience
        productName={currentProduct.name}
        videos={currentProduct.youtubeVideos}
        primaryColor={primaryColor}
      />

      {/* SECTION 04: PROTECTED BUY ME SECTION (STRICTLY UNCHANGED, IMMEDIATELY AFTER VIDEO) */}
      <ProductRobotPurchaseSection product={currentProduct} />

      {/* SECTION 05: CENTERED PEEKING FEATURE CAROUSEL (.A3Ultra_Three) */}
      <ProductFeatureSlider product={currentProduct} />

      {/* SECTION 06: CENTERED PEEKING APPLICATION SCENARIOS (.A3Ultra_Four) */}
      <ProductScenariosCarousel product={currentProduct} />

      {/* SECTION 07: PRODUCT SPECIFICATIONS (.A3Ultra_Five) */}
      <ProductSpecsMatrix product={currentProduct} />

      {/* SECTION 08: PRODUCT DOCUMENTATION */}
      <ProductDocumentation product={currentProduct} />

      {/* SECTION 09: CONTACT US & PRODUCT ENQUIRY */}
      <ProductEnquiryForm product={currentProduct} />
    </div>
  );
}
