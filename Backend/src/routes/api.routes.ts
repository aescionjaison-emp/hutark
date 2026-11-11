import { Router } from 'express';
import { submitContact, getContacts } from '../controllers/contact.controller';
import { getProducts, getProductById } from '../controllers/product.controller';
import { getNews, getNewsById } from '../controllers/news.controller';
import { registerEvent } from '../controllers/event.controller';

const router = Router();

// Health Check
router.get('/health', (_req, res) => {
  res.json({ status: 'healthy', service: 'HUTARK REST API', version: '1.0.0', timestamp: new Date() });
});

// Contact Enquiries
router.post('/contact', submitContact);
router.get('/contact', getContacts);

// Products
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

// News
router.get('/news', getNews);
router.get('/news/:id', getNewsById);

// Events
router.post('/events/register', registerEvent);

export default router;

