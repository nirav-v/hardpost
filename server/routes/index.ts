import { Router } from 'express';
import shopRoutes from './api/shop-routes.js';
import itemRoutes from './api/userItemRoutes.js';
import orderRoutes from './api/orderRoutes.js';
import cartRoutes from './api/cartRoutes.js';
import userRoutes from './api/userRoutes.js';
const router = Router();

router.use(shopRoutes);
router.use(itemRoutes);
router.use(orderRoutes);
router.use(cartRoutes);
router.use('/user', userRoutes);

export default router;
