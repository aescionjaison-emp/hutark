export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  img?: string;
}

export interface HardwareModule {
  title: string;
  subtitle: string;
  desc: string;
  img: string;
}

export interface ApplicationScenario {
  title: string;
  subtitle: string;
  desc: string;
  img: string;
}

export interface SpecRowItem {
  category: string;
  item: string;
  value: string;
}

export interface YouTubeVideoSlide {
  id: string; // youtube video id (e.g. "7zI3u19q_e0" or full URL)
  title: string;
  subtitle?: string;
  description: string;
  categoryTag?: string;
}

export interface CustomProductStyles {
  fontFamily?: string;
  primaryColor?: string; // e.g. "#0062c5"
  backgroundColor?: string;
  heroTextColor?: string;
  headingSize?: 'normal' | 'large' | 'huge';
}

export interface MatchingComponentItem {
  label: string;
  value: string;
}

export interface ProductData {
  id: string;
  slug?: string;
  name: string;
  series: string;
  tagline: string;
  heroSubtitle: string;
  heroImg: string;
  heroBannerBg?: string;
  cinematicHeading?: string;
  cinematicSubheading?: string;
  cinematicDesc?: string;
  cinematicImg?: string;
  cinematicMetrics?: { value: string; label: string }[];
  manipulationHeading?: string;
  manipulationSubtitle?: string;
  manipulationDesc?: string;
  manipulationImg?: string;
  manipulationFeatures?: string[];
  interactionHeading?: string;
  interactionSubtitle?: string;
  interactionDesc?: string;
  interactionImg?: string;
  interactionBubbles?: { title: string; text: string }[];
  matchingListTitle?: string;
  matchingListDesc?: string;
  matchingListImg?: string;
  matchingListChips?: MatchingComponentItem[];
  hardwareModules?: HardwareModule[];
  applicationScenarios?: ApplicationScenario[];
  specRows?: SpecRowItem[];
  youtubeVideos?: YouTubeVideoSlide[];
  buySectionImage?: string;
  buyButtonText?: string;
  customStyles?: CustomProductStyles;
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
