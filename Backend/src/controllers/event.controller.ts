import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const registerEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventSlug, name, email, company, title, attendMode } = req.body;

    if (!name || !email || !company) {
      res.status(400).json({ success: false, message: 'Name, email, and company are required.' });
      return;
    }

    const reg = await prisma.eventRegistration.create({
      data: {
        eventSlug: eventSlug || 'APC2026',
        name,
        email,
        company,
        title: title || '',
        attendMode: attendMode || 'In-Person',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Registration confirmed. Check your email for badge passes and venue schedule.',
      data: reg,
    });
  } catch (error: any) {
    console.error('Error registering event:', error);
    res.status(500).json({ success: false, message: 'Server error registering event.' });
  }
};

