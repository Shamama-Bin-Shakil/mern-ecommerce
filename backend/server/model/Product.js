const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema({
  title: { type: String, require: true },
  price: { type: Number, require: true },
  mrp: { type: Number, require: true },
  quantity: { type: Number, require: true },
  date: { type: String, require: true },
  description: { type: String, require: true },
  image: { type: String, require: true },
});
const Product = mongoose.model("products", schema);
module.exports = Product;
