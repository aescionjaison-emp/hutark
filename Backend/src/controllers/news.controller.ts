import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const whereClause = category && category !== 'All' ? { category: String(category) } : {};

    const articles = await prisma.newsArticle.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    const formatted = articles.map((a) => ({
      ...a,
      content: JSON.parse(a.content || '[]'),
    }));

    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error retrieving news articles.' });
  }
};

export const getNewsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const article = await prisma.newsArticle.findUnique({
      where: { id },
    });

    if (!article) {
      res.status(404).json({ success: false, message: 'Article not found.' });
      return;
    }

    res.json({
      success: true,
      data: {
        ...article,
        content: JSON.parse(article.content || '[]'),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error retrieving article.' });
  }
};

