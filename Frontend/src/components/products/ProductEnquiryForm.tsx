'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Building2, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { ProductData } from '../../types';
import { inquiryStore } from '../../services/inquiryStore';

interface ProductEnquiryFormProps {
  product: ProductData;
}

export default function ProductEnquiryForm({ product }: ProductEnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: 'Automotive & Manufacturing',
    tier: 'Evaluation Unit (1-2 units)',
    message: `Inquiring about enterprise pilot deployment specifications, lead time, and pricing for ${product.name}.`
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      setError('Please fill in your name, email, and company details.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await inquiryStore.saveInquiry({
        type: 'product_inquiry',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        industry: formData.industry,
        productName: product.name,
        productId: product.id,
        deploymentTier: formData.tier,
        message: formData.message,
        status: 'new',
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error('Inquiry submission error:', err);
      setError('Failed to submit inquiry. Please try again or email sales@hutark.com directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="product-enquiry-section" className="py-24 bg-white text-[#1a1a1a] border-b border-gray-200">
      <div className="site-container max-w-4xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8f7435]">
            ENTERPRISE DEPLOYMENT & EVALUATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Request {product.name} Inquiries
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-light leading-relaxed">
            Connect with our robotics applications engineering team for volume pricing, evaluation units, factory integration timelines, and custom end-effector configurations.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#fafbfc] rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Inquiry Received Successfully
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Thank you for your interest in {product.name}. A HUTARK enterprise solution architect will review your technical requirements and contact you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-gray-900 text-white rounded-full text-xs font-semibold hover:bg-black transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Alexander Vance"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm outline-none transition-all"
                  />
                </div>

                {/* Corporate Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alexander@enterprise.com"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm outline-none transition-all"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Continental Robotics Gmbh"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm outline-none transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                    Phone / Contact Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1 (555) 019-2834"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm outline-none transition-all"
                  />
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                    Target Application Industry
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm outline-none transition-all"
                  >
                    <option value="Automotive & Manufacturing">Automotive & Manufacturing</option>
                    <option value="Electronics & Semiconductor">Electronics & Semiconductor</option>
                    <option value="Logistics & Warehousing">Logistics & Warehousing</option>
                    <option value="Energy & Inspection Patrol">Energy & Infrastructure Patrol</option>
                    <option value="Academic & AI R&D">Academic & AI Research</option>
                    <option value="Healthcare & Cleanroom">Healthcare & Cleanroom</option>
                    <option value="Commercial & Retail Service">Commercial & Hospitality</option>
                  </select>
                </div>

                {/* Deployment Tier */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                    Procurement Scope
                  </label>
                  <select
                    name="tier"
                    value={formData.tier}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm outline-none transition-all"
                  >
                    <option value="Evaluation Unit (1-2 units)">Evaluation Kit (1-2 Units)</option>
                    <option value="Pilot Deployment (3-10 units)">Pilot Workcell (3-10 Units)</option>
                    <option value="Volume Fleet (10+ units)">Commercial Fleet (10+ Units)</option>
                    <option value="Academic Grant / R&D">Academic Grant / Research Partnership</option>
                  </select>
                </div>
              </div>

              {/* Technical Message */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                  Project Scope & Technical Inquiries
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-10 py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-full text-sm transition-all shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center space-x-2.5 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting Inquiry...' : 'Submit Technical Inquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
