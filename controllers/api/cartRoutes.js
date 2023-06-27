const router = require("express").Router();
const Item = require("../../models/Item");

router.get("/cart", async (req, res, next) => {
  const cart = await req.user.getCart(); //magic method from one to one association between User and Cart
  const cartItems = await cart.getItems(); //magic method from many to many association between Cart and Item
  // console.log(cart);
  res.json(cartItems);
});

// adding item to cart
router.post("/cart", async (req, res, next) => {
  const itemId = req.body.itemId;
  const cart = await req.user.getCart(); // fetch the users cart
  let itemQuantity = 1; // default the quantity to one for cases where item is not in cart
  const existingItems = await cart.getItems({
    where: { id: itemId }, //should return array of of one or zero items in cart with that id
  });
  // for updating quantity of an existing cart item
  if (existingItems.length > 0) {
    const currentQuantity = existingItems[0].cartItem.quantity;
    itemQuantity = currentQuantity + 1;
  }
  // find the item and add it with a the correct quantity
  const itemToAdd = await Item.findByPk(itemId);
  const addedItem = await cart.addItem(itemToAdd, {
    through: { quantity: itemQuantity },
  }); // specify value for extra fields that were created in the cart-item junction table
  // respond with the updated cart items
  res.redirect("/api/cart");
});

router.post("/cart/delete-item", async (req, res, next) => {
  const itemId = req.body.id;
  const cart = await req.user.getCart(); // get the users cart
  const cartItems = await cart.getItems({ where: { id: itemId } }); // get items from user's cart matching the req body id - returns array of matching items
  // delete that item from the cartItems table
  if (cartItems.length > 0) {
    const deletedItem = await cartItems[0].cartItem.destroy();
  }
  res.redirect("/api/cart");
});

module.exports = router;
