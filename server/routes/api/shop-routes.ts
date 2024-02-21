import { Router } from 'express';
import {
  getShopItems,
  getItemById,
  getItemBySearchParam,
} from '../../controllers/shopController.js';
const router = Router();

// route for showing all items listed
router.get('/shop', getShopItems);

router.get('/shop/:itemId', getItemById);

// get item by search query param
router.get(':/search', getItemBySearchParam);

export default router;
