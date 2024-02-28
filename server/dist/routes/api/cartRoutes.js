import { addCartItem, deleteCartItem, getUserCart, } from "../../controllers/cartController.js";
import { Router } from "express";
const router = Router();
router.get("/cart", getUserCart);
// adding item to cart
router.post("/cart", addCartItem);
router.post("/cart/delete-item", deleteCartItem);
// module.exports = router;
export default router;
