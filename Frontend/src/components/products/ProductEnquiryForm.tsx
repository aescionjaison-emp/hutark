'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
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
    message: `Inquiring about deployment specifications and availability for ${product.name}.`,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      setError('Please complete your name, email, and company.');
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
      setError('Failed to submit inquiry. Please try again or email sales@hutark.com.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="product-enquiry-section"
      className="py-24 bg-white text-[#333333] border-t border-[#eaeaea]"
    >
      <div className="max-w-[900px] w-[90%] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[28px] sm:text-[36px] font-normal text-[#1a1a1a]">
            Contact Us
          </h2>
          <p className="text-sm text-[#666666] mt-2">
            Connect with HUTARK engineering for {product.name} evaluation, pricing, and integration.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12 border border-[#e5e5e5] bg-[#fafafa] p-8">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
            <h3 className="text-xl font-medium text-[#1a1a1a]">Inquiry Submitted</h3>
            <p className="text-sm text-[#666666] max-w-md mx-auto mt-2">
              Thank you for your interest in {product.name}. Our team will respond within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-6 px-8 py-2.5 rounded-full text-sm text-white bg-[#1a1a1a] hover:bg-black transition-colors cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-[#555555] block mb-1.5">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-[#fafafa] border border-[#e0e0e0] focus:border-[#1a1a1a] text-sm outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#555555] block mb-1.5">Corporate Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 bg-[#fafafa] border border-[#e0e0e0] focus:border-[#1a1a1a] text-sm outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#555555] block mb-1.5">Company / Organization *</label>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Organization name"
                  className="w-full px-4 py-3 bg-[#fafafa] border border-[#e0e0e0] focus:border-[#1a1a1a] text-sm outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#555555] block mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 bg-[#fafafa] border border-[#e0e0e0] focus:border-[#1a1a1a] text-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-[#555555] block mb-1.5">Inquiry Details</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#fafafa] border border-[#e0e0e0] focus:border-[#1a1a1a] text-sm outline-none transition-colors resize-none"
              />
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-12 py-3 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90 cursor-pointer disabled:opacity-50"
                style={{
                  background: 'linear-gradient(90deg, #6859b6 0%, #1677d2 100%)',
                }}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
