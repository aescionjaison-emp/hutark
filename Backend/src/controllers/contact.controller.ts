import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, company, productInterest, industry, message } = req.body;

    if (!name || !email || !company) {
      res.status(400).json({ success: false, message: 'Name, email, and company are required.' });
      return;
    }

    const enquiry = await prisma.contactEnquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        company,
        productInterest: productInterest || null,
        industry: industry || null,
        message: message || '',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. A representative will contact you shortly.',
      data: enquiry,
    });
  } catch (error: any) {
    console.error('Error submitting contact enquiry:', error);
    res.status(500).json({ success: false, message: 'Server error processing enquiry.' });
  }
};

export const getContacts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const enquiries = await prisma.contactEnquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error retrieving enquiries.' });
  }
};

