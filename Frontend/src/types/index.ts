export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  img?: string;
}

export interface ProductData {
  id: string;
  slug?: string;
  name: string;
  series: string;
  tagline: string;
  heroSubtitle: string;
  heroImg: string;
  overview: string;
  specs: ProductSpec[];
  features: ProductFeature[];
  applications: { title: string; desc: string; img?: string }[];
  gallery: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  img: string;
  content: {
    sectionHeading: string;
    body: string[];
  }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company: string;
  productInterest?: string;
  industry?: string;
  message: string;
}

export interface EventRegistrationData {
  eventSlug: string;
  name: string;
  email: string;
  company: string;
  title: string;
  attendMode: string;
}

export interface NavProductItem {
  title: string;
  href: string;
  img?: string;
  tag?: string;
}

export interface NavColumn {
  heading: string;
  items: NavProductItem[];
}

