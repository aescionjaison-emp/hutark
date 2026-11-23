'use client';

export type InquiryType = 'buy_me_order' | 'product_inquiry' | 'contact_form' | 'career_application';
export type InquiryStatus = 'new' | 'in_review' | 'contacted' | 'completed';

export interface InquiryItem {
  id: string;
  type: InquiryType;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  industry?: string;
  productName?: string;
  productId?: string;
  deploymentTier?: string; // e.g., 'Pilot / Evaluation Kit', 'Commercial Fleet (5-50 Units)', 'R&D / Academic'
  message?: string;
  status: InquiryStatus;
  adminNotes?: string;
}

const STORAGE_KEY = 'hutark_inquiries_store';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

const INITIAL_INQUIRIES: InquiryItem[] = [
  {
    id: 'APP-202611-1042',
    type: 'career_application',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    name: 'Julian Thorne',
    email: 'j.thorne@alumni.stanford.edu',
    phone: '+1 (650) 498-1120',
    company: 'Stanford AI & Robotics Lab',
    industry: 'Physical AI & Deep Learning',
    productName: 'Senior Embodied AI Policy Researcher (Sim2Real)',
    deploymentTier: 'Full-Time Engineering',
    message: 'Candidate application for Senior Embodied AI Policy Researcher. 6 years experience in Sim2Real reinforcement learning and diffusion manipulation policies. Published at RSS 2025 and ICRA 2026.',
    status: 'new',
    adminNotes: 'High priority candidate. Schedule technical phone screen with Dr. Lin Chen.'
  },
  {
    id: 'ORD-202611-9812',
    type: 'buy_me_order',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    name: 'Dr. Marcus Vance',
    email: 'm.vance@siemens-health.de',
    phone: '+49 89 636 00',
    company: 'Siemens Healthineers AG',
    industry: 'Medical & Healthcare Robotics',
    productName: 'HUTARK G2',
    productId: 'G2',
    deploymentTier: 'Commercial Fleet (5-50 Units)',
    message: 'Urgent inquiry for 8 evaluation units with dual dexterous optical-tactile hands for sterile medical instrument packaging testbed.',
    status: 'new',
  },
  {
    id: 'ORD-202611-9745',
    type: 'buy_me_order',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    name: 'Elena Rostova',
    email: 'elena.rostova@apexaero.io',
    phone: '+1 (415) 890-2134',
    company: 'Apex Aerospace Solutions',
    industry: 'Aerospace & Defense',
    productName: 'HUTARK A3 Ultra',
    productId: 'A3Ultra',
    deploymentTier: 'Pilot / Evaluation Kit',
    message: 'Requesting pilot test kit with ROS2 SDK and high-precision torque feedback for aircraft wire harness routing.',
    status: 'in_review',
    adminNotes: 'Assigned to Enterprise Sales Director. Follow-up scheduled for Tuesday.',
  },
  {
    id: 'INQ-202611-9680',
    type: 'product_inquiry',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hours ago
    name: 'David Chen',
    email: 'd.chen@foxconn-ai.tw',
    phone: '+886 2 2268 3466',
    company: 'Foxconn Industrial AI Hub',
    industry: 'Precision Electronics Assembly',
    productName: 'HUTARK X2',
    productId: 'X2',
    message: 'Seeking custom integration specs for 3C electronics SMD visual inspection and automated tray reloading.',
    status: 'contacted',
    adminNotes: 'Introductory NDA and CAD envelope dimensions sent.',
  },
  {
    id: 'INQ-202611-9521',
    type: 'contact_form',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    name: 'Sarah Jenkins',
    email: 's.jenkins@bostonbiorobotics.org',
    phone: '+1 (617) 555-0199',
    company: 'Boston BioRobotics Consortium',
    industry: 'Research & Academia',
    productName: 'General Portfolio Inquiry',
    productId: 'all',
    message: 'Seeking academic grant partnership for autonomous bimanual teleoperation in bio-containment laboratories.',
    status: 'completed',
    adminNotes: 'Partnership MoU in final legal review.',
  },
];

export const inquiryStore = {
  getInquiries(): InquiryItem[] {
    if (typeof window === 'undefined') return INITIAL_INQUIRIES;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_INQUIRIES));
        return INITIAL_INQUIRIES;
      }
      return JSON.parse(stored);
    } catch (err) {
      console.error('Failed reading inquiries from storage:', err);
      return INITIAL_INQUIRIES;
    }
  },

  async saveInquiry(
    inquiryData: Omit<InquiryItem, 'id' | 'createdAt' | 'status'> & Partial<Pick<InquiryItem, 'status'>>
  ): Promise<InquiryItem> {
    const list = this.getInquiries();

    // Generate human-friendly ID
    const prefix = inquiryData.type === 'buy_me_order' ? 'ORD' : 'INQ';
    const dateStr = new Date().toISOString().slice(0, 7).replace('-', '');
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `${prefix}-${dateStr}-${randNum}`;

    const newInquiry: InquiryItem = {
      id: newId,
      type: inquiryData.type,
      createdAt: new Date().toISOString(),
      name: inquiryData.name,
      email: inquiryData.email,
      phone: inquiryData.phone || '',
      company: inquiryData.company,
      industry: inquiryData.industry || 'Advanced Robotics & Automation',
      productName: inquiryData.productName || 'HUTARK Robot',
      productId: inquiryData.productId || '',
      deploymentTier: inquiryData.deploymentTier || '',
      message: inquiryData.message || '',
      status: inquiryData.status || 'new',
      adminNotes: inquiryData.adminNotes || '',
    };

    const updated = [newInquiry, ...list];

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('hutark_inquiries_updated', { detail: { inquiry: newInquiry } }));
    }

    // Also sync to Backend REST API (Prisma SQLite) if available
    try {
      fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newInquiry.name,
          email: newInquiry.email,
          phone: newInquiry.phone,
          company: newInquiry.company,
          productInterest: `${newInquiry.productName}${newInquiry.deploymentTier ? ' (' + newInquiry.deploymentTier + ')' : ''}`,
          industry: newInquiry.industry,
          message: `[${newInquiry.type.toUpperCase()}] ${newInquiry.message}`,
        }),
      }).catch(() => {
        // Silent fallback
      });
    } catch {
      // Backend optional
    }

    return newInquiry;
  },

  updateInquiryStatus(id: string, status: InquiryStatus): boolean {
    const list = this.getInquiries();
    const idx = list.findIndex(i => i.id === id);
    if (idx === -1) return false;

    list[idx].status = status;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('hutark_inquiries_updated', { detail: { id, status } }));
    }
    return true;
  },

  updateInquiryNotes(id: string, adminNotes: string): boolean {
    const list = this.getInquiries();
    const idx = list.findIndex(i => i.id === id);
    if (idx === -1) return false;

    list[idx].adminNotes = adminNotes;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('hutark_inquiries_updated', { detail: { id, adminNotes } }));
    }
    return true;
  },

  deleteInquiry(id: string): boolean {
    const list = this.getInquiries();
    const updated = list.filter(i => i.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('hutark_inquiries_updated', { detail: { deletedId: id } }));
    }
    return true;
  },

  clearAllInquiries(): boolean {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      window.dispatchEvent(new CustomEvent('hutark_inquiries_updated'));
    }
    return true;
  },

  getUnreadCount(): number {
    const list = this.getInquiries();
    return list.filter(i => i.status === 'new').length;
  },

  exportToCSV(): void {
    if (typeof window === 'undefined') return;
    const list = this.getInquiries();
    if (list.length === 0) {
      alert('No inquiries or orders to export.');
      return;
    }

    const headers = ['Order/Inquiry ID', 'Date & Time', 'Type', 'Status', 'Customer Name', 'Email', 'Phone', 'Company', 'Industry', 'Target Product', 'Deployment Tier', 'Requirements / Message', 'Admin Notes'];

    const rows = list.map(item => [
      `"${item.id}"`,
      `"${new Date(item.createdAt).toLocaleString()}"`,
      `"${item.type}"`,
      `"${item.status}"`,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.email.replace(/"/g, '""')}"`,
      `"${(item.phone || '').replace(/"/g, '""')}"`,
      `"${item.company.replace(/"/g, '""')}"`,
      `"${(item.industry || '').replace(/"/g, '""')}"`,
      `"${(item.productName || '').replace(/"/g, '""')}"`,
      `"${(item.deploymentTier || '').replace(/"/g, '""')}"`,
      `"${(item.message || '').replace(/"/g, '""')}"`,
      `"${(item.adminNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `HUTARK_Orders_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  async addInquiry(
    inquiryData: Omit<InquiryItem, 'id' | 'createdAt' | 'status'> & Partial<Pick<InquiryItem, 'status'>>
  ): Promise<InquiryItem> {
    return this.saveInquiry(inquiryData);
  }
};
