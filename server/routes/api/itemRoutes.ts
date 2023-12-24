import { Router } from "express";
import {
  uploadItem,
  editItem,
  deleteItem,
  getUserItems,
} from "../../controllers/itemController.js";

import multer from "multer";
const router = Router();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: multer.memoryStorage(), fileFilter });

router.get("/get-items", getUserItems);

// use multer middleware for parsing and storing files
router.post("/add-item", upload.single("image"), uploadItem);

router.post("/edit-item", editItem);

router.post("/delete-item", deleteItem);

// module.exports = router;
export default router;
