'use client';

import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import { ProductData } from '../../types';

interface ProductDocumentationProps {
  product: ProductData;
}

export default function ProductDocumentation({ product }: ProductDocumentationProps) {
  const docs = [
    {
      title: `${product.name} Product User Manual`,
      format: 'PDF · Deployment & Safety',
      link: '/about',
    },
    {
      title: `${product.name} Technical Datasheet`,
      format: 'PDF · Mechanical & Electrical Specs',
      link: '/about',
    },
    {
      title: 'HUTARK Link-U OS & Secondary Development SDK',
      format: 'Documentation · ROS 2 / C++ / Python',
      link: '/about',
    },
  ];

  return (
    <section className="py-16 bg-[#f7f7f7] text-[#333333] border-t border-[#eaeaea]">
      <div className="max-w-[1200px] w-[90%] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-[24px] sm:text-[28px] font-normal text-[#1a1a1a]">
              Product Documentation
            </h3>
            <p className="text-sm text-[#666666] mt-2 leading-relaxed">
              Official manuals, integration datasheets, and developer SDK references for {product.name}.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {docs.map((doc, idx) => (
              <a
                key={idx}
                href={doc.link}
                className="bg-white border border-[#e5e5e5] hover:border-[#333333] p-5 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <FileText className="w-5 h-5 text-[#999999] group-hover:text-[#1a1a1a] transition-colors mb-3" />
                  <h4 className="text-sm font-medium text-[#1a1a1a] leading-snug">{doc.title}</h4>
                  <p className="text-xs text-[#777777] mt-1">{doc.format}</p>
                </div>
                <span className="inline-flex items-center text-xs text-[#333333] mt-4 group-hover:translate-x-0.5 transition-transform">
                  View Resource <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
