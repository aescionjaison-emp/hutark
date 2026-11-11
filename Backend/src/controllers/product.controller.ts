import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await prisma.product.findMany();
    const formatted = products.map((p) => ({
      ...p,
      specs: JSON.parse(p.specs || '[]'),
      features: JSON.parse(p.features || '[]'),
    }));
    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error retrieving products.' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found.' });
      return;
    }

    res.json({
      success: true,
      data: {
        ...product,
        specs: JSON.parse(product.specs || '[]'),
        features: JSON.parse(product.features || '[]'),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error retrieving product.' });
  }
};

