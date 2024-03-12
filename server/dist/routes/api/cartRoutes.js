import { addCartItem, deleteCartItem, getUserCart, } from '../../controllers/cartController.js';
import { Router } from 'express';
import { checkToken } from '../../util/serverAuth.js';
const router = Router();
router.get('/cart', checkToken, getUserCart);
// adding item to cart
router.post('/cart', checkToken, addCartItem);
router.post('/cart/delete-item', checkToken, deleteCartItem);
// module.exports = router;
export default router;
