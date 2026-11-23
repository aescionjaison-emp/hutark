import React from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '../../../data/products';
import ProductDetailView from '../../../components/products/ProductDetailView';

export function generateStaticParams() {
  const paramSet = new Set<string>();
  Object.keys(PRODUCTS).forEach((id) => {
    paramSet.add(id);
    paramSet.add(id.toLowerCase());
    paramSet.add(id.replace(/_/g, '-').toLowerCase());
  });
  return Array.from(paramSet).map((id) => ({
    id: id,
  }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const productKey = Object.keys(PRODUCTS).find(
    (k) => k.toLowerCase() === params.id.toLowerCase()
  ) || params.id;
  const product = PRODUCTS[productKey];

  if (!product) return { title: 'Product Not Found - HUTARK' };
  return {
    title: `${product.name} — ${product.series} | HUTARK`,
    description: product.overview,
  };
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productKey = Object.keys(PRODUCTS).find(
    (k) => k.toLowerCase() === params.id.toLowerCase()
  ) || params.id;
  const product = PRODUCTS[productKey];

  if (!product) {
    notFound();
  }

  const allProductKeys = Object.keys(PRODUCTS);
  const relatedProducts = allProductKeys
    .filter((k) => k !== product.id)
    .slice(0, 3)
    .map((k) => PRODUCTS[k]);

  return (
    <React.Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProductDetailView product={product} relatedProducts={relatedProducts} />
    </React.Suspense>
  );
}
