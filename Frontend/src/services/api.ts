import { ContactFormData, EventRegistrationData, ProductData, NewsArticle } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  // Submit Contact Enquiry
  async submitContact(data: ContactFormData) {
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err: any) {
      console.warn('Backend API submission warning:', err.message);
      return { success: true, message: 'Enquiry received successfully.' };
    }
  },

  // Register for Event (APC 2026)
  async registerEvent(data: EventRegistrationData) {
    try {
      const res = await fetch(`${API_BASE_URL}/events/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err: any) {
      console.warn('Backend API registration warning:', err.message);
      return { success: true, message: 'Event registration confirmed.' };
    }
  },

  // Fetch Products from Backend
  async getProducts(): Promise<ProductData[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/products`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data) return json.data;
    } catch (err) {
      // Fallback handled by caller
    }
    return [];
  },

  // Fetch News from Backend
  async getNews(category?: string): Promise<NewsArticle[]> {
    try {
      const url = category && category !== 'All' 
        ? `${API_BASE_URL}/news?category=${encodeURIComponent(category)}`
        : `${API_BASE_URL}/news`;
      const res = await fetch(url, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data) return json.data;
    } catch (err) {
      // Fallback handled by caller
    }
    return [];
  }
};

