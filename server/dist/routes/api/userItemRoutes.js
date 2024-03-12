import { Router } from 'express';
import { uploadItem, editItem, deleteItem, getUserItems, } from '../../controllers/userItemController.js';
import multer from 'multer';
import { checkToken } from '../../util/serverAuth.js';
const router = Router();
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = multer({ storage: multer.memoryStorage(), fileFilter });
router.get('/get-items', checkToken, getUserItems);
// use multer middleware for parsing and storing files
router.post('/add-item', checkToken, upload.single('image'), uploadItem);
router.post('/edit-item', checkToken, editItem);
router.post('/delete-item', checkToken, deleteItem);
// module.exports = router;
export default router;
