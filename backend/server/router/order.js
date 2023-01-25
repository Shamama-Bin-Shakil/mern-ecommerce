const router = require("express").Router();
const Order = require("../model/Order");
const userData = require("../middleware/userData");

router.post("/create", async (req, res) => {
  const { user_id, street, city, zipcode, order, payment_type } = req.body;
  const data = new Order({
    user_id,
    street,
    city,
    zipcode,
    order,
    payment_type,
  });
  const result = await data.save();
  res.json({ result, status: "success" });
});

router.get("/get", userData, async (req, res) => {
  const data = await Order.find({ user_id: req.user });
  res.json({ result: data, status: "success" });
});

router.get("/getsingle/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Order.findById(id);
  res.json({ result: data, status: "success" });
});

module.exports = router;
