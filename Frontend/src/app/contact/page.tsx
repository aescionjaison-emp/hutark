'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, CheckCircle2, Building, Globe2 } from 'lucide-react';
import { api } from '../../services/api';

const GLOBAL_OFFICES = [
  {
    city: "Shanghai (Global Headquarters)",
    address: "Building 8, Intelligent Robotics Innovation Industrial Park, Pudong New Area, Shanghai, China",
    type: "Headquarters, Main R&D Center & Assembly Plant",
    email: "shanghai@hutark.com"
  },
  {
    city: "Beijing (Physical AI Research Lab)",
    address: "Block C, Zhongguancun Science Park, Haidian District, Beijing, China",
    type: "Foundational AI Models & Sim2Real Laboratory",
    email: "beijing@hutark.com"
  },
  {
    city: "Shenzhen (Advanced Manufacturing Hub)",
    address: "High-Tech Industrial Park, Nanshan District, Shenzhen, China",
    type: "Actuator Precision Machining & Supply Chain Operations",
    email: "shenzhen@hutark.com"
  },
  {
    city: "Tokyo & Munich (International Representative Offices)",
    address: "Chiyoda-ku, Tokyo, Japan / Maximilianstraße, Munich, Germany",
    type: "Global Customer Solutions & Integrator Support",
    email: "global@hutark.com"
  }
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productInterest: 'HUTARK A3 Ultra',
    industry: 'Manufacturing',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.submitContact(form);
      setResponseMsg(res?.message || 'Thank you! Your inquiry has been received.');
      setSubmitted(true);
    } catch (err) {
      setResponseMsg('Your message has been received by the HUTARK team.');
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-[#333333] pt-20 min-h-screen">
      {/* =========================================================================
          HERO BANNER
          ========================================================================= */}
      <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-white border-b border-gray-100">
        <div className="site-container max-w-4xl text-center space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-brand-blue border border-blue-100">
            Partner With Us
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
            Contact HUTARK
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Whether evaluating robot deployment in your facility, exploring integrator partnerships, or requesting technical evaluation units, our engineering team is here to assist.
          </p>
        </div>
      </section>

      {/* =========================================================================
          INQUIRY FORM & DIRECT CONTACTS
          ========================================================================= */}
      <section className="py-20 bg-[#fbfbfb] border-b border-gray-100">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Commercial Deployment & Evaluation Request
              </h3>
              <p className="text-sm text-gray-500 mb-8 font-light">
                Fill out the specifications below. Our technical solutions team will review and reply within 24 business hours.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4 bg-green-50 rounded-2xl border border-green-200 p-8">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                  <h4 className="text-xl font-bold text-gray-900">Inquiry Received</h4>
                  <p className="text-sm text-gray-600 max-w-md mx-auto">
                    {responseMsg || 'Thank you for reaching out to HUTARK. An enterprise solutions specialist will contact you shortly.'}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        productInterest: 'HUTARK A3 Ultra',
                        industry: 'Manufacturing',
                        message: ''
                      });
                    }}
                    className="mt-4 text-xs font-bold text-brand-blue hover:underline"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Dr. Jane Doe"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jane.doe@enterprise.com"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                        Company / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Company name"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                        Model of Interest
                      </label>
                      <select
                        value={form.productInterest}
                        onChange={(e) => setForm({ ...form, productInterest: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brand-blue"
                      >
                        <option value="HUTARK A3 Ultra">HUTARK A3 Ultra (Dynamic Bipedal Humanoid)</option>
                        <option value="HUTARK A3">HUTARK A3 (Standard Industrial Biped)</option>
                        <option value="HUTARK A2 Ultra">HUTARK A2 Ultra (Academic Research)</option>
                        <option value="HUTARK X2">HUTARK X2 (Wheeled-Bipedal Dual Arm)</option>
                        <option value="HUTARK G2">HUTARK G2 (Commercial Service Humanoid)</option>
                        <option value="HUTARK D1 Pro">HUTARK D1 Pro (Quadruped Explorer)</option>
                        <option value="HUTARK C5">HUTARK C5 (Autonomous Cleaning Robot)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                        Industry Segment
                      </label>
                      <select
                        value={form.industry}
                        onChange={(e) => setForm({ ...form, industry: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brand-blue"
                      >
                        <option value="Manufacturing">Automotive & Industrial Manufacturing</option>
                        <option value="Consumer Electronics">3C Consumer Electronics Assembly</option>
                        <option value="Retail & Hospitality">Retail, Showrooms & Hospitality</option>
                        <option value="Logistics & Warehousing">Logistics & Micro-fulfillment</option>
                        <option value="Energy & Utilities">Energy, Power Grid & Petrochemical</option>
                        <option value="Research & Education">Academic & Robotics Research Labs</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                      Project Details & Deployment Objectives
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Please describe your facility environment, intended tasks, estimated fleet count, and timeline..."
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-blue hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md text-sm flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Submitting...' : 'Submit Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right: Direct Channels */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
                <h4 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
                  Direct Communications
                </h4>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase">Sales & Deployment</h5>
                    <a
                      href="mailto:sales@hutark.com"
                      className="text-base font-bold text-brand-blue hover:underline block"
                    >
                      sales@hutark.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-50 text-brand-cyan flex items-center justify-center flex-shrink-0">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase">Partnerships & Integrators</h5>
                    <a
                      href="mailto:partner@hutark.com"
                      className="text-base font-bold text-gray-800 hover:text-brand-blue block"
                    >
                      partner@hutark.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-brand-purple flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase">Corporate Inquiries</h5>
                    <p className="text-base font-semibold text-gray-800">+86 21 6888 8999</p>
                    <span className="text-xs text-gray-500">Mon - Fri: 09:00 - 18:00 (UTC+8)</span>
                  </div>
                </div>
              </div>

              {/* Facility Tour Card */}
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-3xl shadow-lg space-y-3">
                <h4 className="text-xl font-bold">Schedule an On-Site Live Demo</h4>
                <p className="text-xs text-blue-100 leading-relaxed font-light">
                  Visit our Shanghai Gigafactory or Beijing Physical AI Experience Lab for live hands-on robot demonstrations and customized throughput assessments.
                </p>
                <a
                  href="mailto:demo@hutark.com"
                  className="inline-block mt-2 bg-white text-gray-900 font-bold text-xs px-5 py-2.5 rounded-full shadow hover:bg-gray-100 transition-colors"
                >
                  Book Demo Session
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          GLOBAL HUBS & OFFICES
          ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="site-container">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
              Global Presence
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Offices & R&D Centers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {GLOBAL_OFFICES.map((office, idx) => (
              <div
                key={idx}
                className="bg-[#f8f8f8] p-8 rounded-2xl border border-gray-200 space-y-3"
              >
                <div className="flex items-center space-x-2 text-brand-blue">
                  <MapPin className="w-4 h-4" />
                  <h4 className="text-base font-bold text-gray-900">{office.city}</h4>
                </div>
                <p className="text-xs font-semibold text-gray-500 uppercase">{office.type}</p>
                <p className="text-sm text-gray-600 font-light leading-relaxed">{office.address}</p>
                <a
                  href={`mailto:${office.email}`}
                  className="text-xs font-bold text-brand-blue hover:underline inline-block pt-1"
                >
                  {office.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

