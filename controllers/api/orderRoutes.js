const router = require("express").Router();

router.get("/orders", async (req, res, next) => {
  const orders = await req.user.getOrders({ include: ["items"] }); // tells sequelize to also load all items associated with each order
  res.json(orders);
});

router.post("/create-order", async (req, res, next) => {
  const cart = await req.user.getCart();
  const items = await cart.getItems();
  const order = await req.user.createOrder();
  // pass in the updated array of cart items with an updated orderItem property that specifies the item quantity
  await order.addItems(
    items.map((item) => {
      item.orderItem = { quantity: item.cartItem.quantity };
      return item;
    })
  );
  await cart.setItems(null); //clear user's cart after order is placed
  res.json(cart);
});

module.exports = router;
