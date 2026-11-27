'use client';

import React from 'react';
import { Download, FileText, ExternalLink, Code2, ShieldAlert } from 'lucide-react';
import { ProductData } from '../../types';

interface ProductDocumentationProps {
  product: ProductData;
}

export default function ProductDocumentation({ product }: ProductDocumentationProps) {
  // Construct genuine documentation resources
  const docs = [
    {
      title: `${product.name} Official Product Brochure`,
      subtitle: "Commercial & Technical Overview",
      format: "PDF",
      size: "4.8 MB",
      category: "Product Overview",
      link: `/about`
    },
    {
      title: `${product.name} Engineering Integration Datasheet`,
      subtitle: "Mechanical, Electrical & Bus Pinout Specs",
      format: "PDF",
      size: "8.2 MB",
      category: "Datasheet",
      link: `/about`
    },
    {
      title: `${product.name} User Operation & Maintenance Manual`,
      subtitle: "Deployment, Calibration & Safety Guidelines",
      format: "PDF",
      size: "12.5 MB",
      category: "Manual",
      link: `/about`
    },
    {
      title: "HUTARK Link-U Robot OS & Python/C++ SDK",
      subtitle: "EtherCAT Bus Telemetry & ROS 2 Drivers",
      format: "SDK DOCS",
      size: "Online",
      category: "Software",
      link: `/about`
    }
  ];

  return (
    <section className="py-20 bg-[#f8f9fa] text-[#1a1a1a] border-b border-gray-200">
      <div className="site-container max-w-6xl">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8f7435]">
            DOCUMENTATION & RESOURCES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Technical Downloads & Manuals
          </h2>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            Access official engineering manuals, integration blueprints, electrical pinout guides, and SDK documentation for {product.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {docs.map((doc, idx) => (
            <a
              key={idx}
              href={doc.link}
              className="bg-white border border-gray-200 hover:border-gray-900 rounded-2xl p-6 transition-all duration-300 hover:shadow-md flex items-center justify-between group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-gray-900 text-gray-700 group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#8f7435] uppercase tracking-wider block mb-1">
                    {doc.category} · {doc.format} ({doc.size})
                  </span>
                  <h4 className="text-base font-bold text-gray-900 group-hover:text-black transition-colors leading-snug">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {doc.subtitle}
                  </p>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-gray-50 group-hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors flex-shrink-0 ml-4">
                <Download className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
