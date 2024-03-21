import { getProfile, loginUser, signUpUser, } from '../../controllers/userController.js';
import { Router } from 'express';
import { checkToken } from '../../util/serverAuth.js';
const router = Router();
// SIGNUP
router.post('/signup', signUpUser);
// LOGIN
router.post('/login', loginUser);
// Get Users Profile Info
router.get('/profile', checkToken, getProfile);
// module.exports = router;
export default router;
