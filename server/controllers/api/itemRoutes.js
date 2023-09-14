const router = require("express").Router();
const { Item, User } = require("../../models/");
const Auth = require("../../util/serverAuth");
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
const upload = multer({ storage: multer.memoryStorage(), fileFilter });

router.get("/get-items", async (req, res) => {
  const payload = Auth.verifyToken(req.headers, process.env.JWT_SECRET);
  const loggedInUser = await User.findOne({ where: { email: payload.email } });
  // find all items that have a userId matching req.session.userId
  const userItems = await Item.findAll({
    where: { userId: loggedInUser.id },
  });
  res.status(200).send(userItems);
});

// use multer middleware for parsing and storing files
router.post("/add-item", upload.single("image"), async (req, res, next) => {
  console.log("req.file", req.file);

  try {
    const payload = Auth.verifyToken(req.headers, process.env.JWT_SECRET);
    const loggedInUser = await User.findOne({
      where: { email: payload.email },
    });

    // upload file using the util function from s3 sdk
    const uploadedFile = await uploadFile(req.file);

    console.log(uploadedFile);

    const { name, category, price, description } = req.body;
    const userId = loggedInUser.id; // add the id of the  logged in user as the items userId foreign key
    const item = await Item.create({
      name,
      category,
      price,
      description,
      imagePath: `https://public-hardpost-bucket.s3.amazonaws.com/${uploadedFile.filename}`, // store path to the image in the database
      userId,
    });
    res.json({ createdItem: item });
  } catch (err) {
    console.log(err, "something went wrong");
  }
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
  const payload = Auth.verifyToken(req.headers, process.env.JWT_SECRET);

  const loggedInUser = await User.findOne({ where: { email: payload.email } });
  // get all items of the logged in user and find one where the id is in the req.body
  const userItems = await loggedInUser.getItems();

  const itemId = req.body.itemId;

  for (let item of userItems) {
    if (item.id === itemId) {
      const deletedItem = await item.destroy();
      return res.status(201).json(deletedItem);
    }
  }
  res.send("cannot find item with that id");
});

module.exports = router;
