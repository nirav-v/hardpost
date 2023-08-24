const router = require("express").Router();
const { Item, User } = require("../../models/");

const { uploadFile } = require("../../util/S3");

const multer = require("multer");
// configure multer file storage options, store in images folder under unique name of date + filename
// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + "+" + file.originalname);
//   },
// });
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
const upload = multer({ storage: multer.memoryStorage() });

router.get("/get-items", async (req, res) => {
  // find all items that have a userId matching req.session.userId
  const userItems = await Item.findAll({
    where: { userId: req.session.userId },
  });
  res.status(200).send(userItems);
});

// use multer middleware for parsing and storing files
router.post("/add-item", upload.single("image"), async (req, res, next) => {
  console.log("req.file", req.file);
  if (!req.session.userId)
    return res
      .status(401)
      .send({ error: "you must be logged in to create a new item" });

  // upload file using the util function from s3 sdk
  const uploadedFile = await uploadFile(req.file);

  console.log(uploadedFile);

  const { name, category, price, description } = req.body;
  const userId = req.session.userId; // add the id of the  logged in user as the items userId foreign key
  const item = await Item.create({
    name,
    category,
    price,
    description,
    imagePath: `https://public-hardpost-bucket.s3.amazonaws.com/${uploadedFile.filename}`, // store path to the image in the database
    userId,
  });
  res.json({ createdItem: item });
});

router.post("/edit-item", async (req, res, next) => {
  // construct a new item object from the arguments passed through the req.body
  // - should receive id, name, category, price, description, image
  const { id, name, category, price, description, image } = req.body;
  // return row from database as an Item object and re-assign its properties to our updated data
  const updatedItem = await Item.findByPk(id);
  updatedItem.userId = req.session.userId;
  updatedItem.id = id;
  updatedItem.name = name;
  updatedItem.category = category;
  updatedItem.price = price;
  updatedItem.description = description;
  updatedItem.image = image;
  // call the save method on the created item which will know to replace the existing item with the same id
  updatedItem.save();
  res.json(updatedItem);
});

router.post("/delete-item", async (req, res, next) => {
  const itemId = req.body.itemId;
  const user = await User.findByPk(req.session.userId);
  // get all items of the logged in user and find one where the id is in the req.body
  const userItems = await user.getItems();
  for (item of userItems) {
    if (item.id === itemId) {
      const deletedItem = await item.destroy();
      return res.status(201).json(deletedItem);
    }
  }
  res.send("cannot find item with that id");
});

module.exports = router;
