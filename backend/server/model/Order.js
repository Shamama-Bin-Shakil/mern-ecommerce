const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema({
  user_id: { type: String, require: true },
  street: { type: String, require: true },
  city: { type: String, require: true },
  zipcode: { type: String, require: true },
  order: { type: Array, require: true },
  payment_type: { type: String, require: true },
});
const Order = mongoose.model("order", schema);
module.exports = Order;
