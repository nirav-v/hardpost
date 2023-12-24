import { loginUser, signUpUser } from "../../controllers/userController.js";
import { Router } from "express";
const router = Router();

// SIGNUP
router.post("/signup", signUpUser);

// LOGIN
router.post("/login", loginUser);

// module.exports = router;
export default router;
