import { ProductData } from '../types';
import { PRODUCTS } from '../data/products';

const STORAGE_PREFIX = 'hutark_custom_product_';
const CUSTOM_LIST_KEY = 'hutark_custom_product_ids';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

/**
 * Helper to get a product merged with any local or admin modifications
 */
export function getProductData(id: string): ProductData {
  const defaultProduct = PRODUCTS[id] || Object.values(PRODUCTS).find(p => p.id.toLowerCase() === id.toLowerCase()) || PRODUCTS['G2'];
  
  if (typeof window === 'undefined') {
    return defaultProduct;
  }

  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${defaultProduct.id}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...defaultProduct,
        ...parsed,
        customStyles: {
          ...defaultProduct.customStyles,
          ...(parsed.customStyles || {}),
        },
      };
    }
  } catch (err) {
    console.error('Error reading custom product from storage:', err);
  }

  return defaultProduct;
}

/**
 * Save customized product data
 */
export async function saveProductData(product: ProductData): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    // 1. Save to localStorage for instant local reactivity & offline persistence
    localStorage.setItem(`${STORAGE_PREFIX}${product.id}`, JSON.stringify(product));
    
    // Maintain list of customized IDs
    const idsStr = localStorage.getItem(CUSTOM_LIST_KEY);
    const ids: string[] = idsStr ? JSON.parse(idsStr) : [];
    if (!ids.includes(product.id)) {
      ids.push(product.id);
      localStorage.setItem(CUSTOM_LIST_KEY, JSON.stringify(ids));
    }

    // 2. Dispatch custom browser event for live reactive rerendering without full reload
    window.dispatchEvent(new CustomEvent('hutark_product_updated', { detail: { id: product.id, product } }));

    // 3. Sync to Backend REST API asynchronously if accessible
    try {
      fetch(`${BACKEND_URL}/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      }).catch(() => {
        // Fallback silently if backend offline
      });
    } catch {
      // Backend sync optional
    }

    return true;
  } catch (err) {
    console.error('Error saving product data:', err);
    return false;
  }
}

/**
 * Reset a product to its reference defaults
 */
export function resetProductData(id: string): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const defaultProduct = PRODUCTS[id] || Object.values(PRODUCTS).find(p => p.id.toLowerCase() === id.toLowerCase());
    const targetId = defaultProduct ? defaultProduct.id : id;

    localStorage.removeItem(`${STORAGE_PREFIX}${targetId}`);

    const idsStr = localStorage.getItem(CUSTOM_LIST_KEY);
    if (idsStr) {
      const ids: string[] = JSON.parse(idsStr);
      const updated = ids.filter(i => i !== targetId);
      localStorage.setItem(CUSTOM_LIST_KEY, JSON.stringify(updated));
    }

    window.dispatchEvent(new CustomEvent('hutark_product_updated', { detail: { id: targetId, product: defaultProduct || PRODUCTS['G2'] } }));
    return true;
  } catch (err) {
    console.error('Error resetting product data:', err);
    return false;
  }
}

/**
 * Check if a product has been customized by an admin
 */
export function isProductCustomized(id: string): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(`${STORAGE_PREFIX}${id}`);
}

/**
 * Export all customizations as JSON string
 */
export function exportAllCustomizations(): string {
  if (typeof window === 'undefined') return '{}';
  const customMap: Record<string, any> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(STORAGE_PREFIX)) {
      const id = key.replace(STORAGE_PREFIX, '');
      try {
        customMap[id] = JSON.parse(localStorage.getItem(key) || '{}');
      } catch {}
    }
  }
  return JSON.stringify(customMap, null, 2);
}

/**
 * Import customizations from JSON string
 */
export function importCustomizations(jsonStr: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const data = JSON.parse(jsonStr);
    for (const [id, prod] of Object.entries(data)) {
      localStorage.setItem(`${STORAGE_PREFIX}${id}`, JSON.stringify(prod));
    }
    window.dispatchEvent(new CustomEvent('hutark_product_updated', { detail: { all: true } }));
    return true;
  } catch {
    return false;
  }
}
