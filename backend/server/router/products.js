const router = require("express").Router();
const Product = require("../model/Product");
const multer = require("multer");
let uniquePrefix = "";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../src/upload");
  },
  filename: function (req, file, cb) {
    uniquePrefix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname;
    cb(null, uniquePrefix);
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.any(), async (req, res) => {
  try {
    const { title, price, mrp, quantity, date, description } = req.body;
    const data = new Product({
      title: title,
      price: price,
      mrp: mrp,
      quantity: quantity,
      date: date,
      description: description,
      image: uniquePrefix,
    });
    const result = await data.save();
    res.json({ status: "success", result });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { title, price, quantity, description } = req.body;
    const id = req.params.id;
    const updateObject = {
      title,
      price,
      quantity,
      description,
    };
    const update = await Product.findByIdAndUpdate(
      id,
      { $set: updateObject },
      { new: true }
    );
    res.json({ status: "success", update });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteItem = await Product.findByIdAndDelete(id);
    res.json({ status: "success", deleteItem });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get", async (req, res) => {
  try {
    const count = await Product.find().count();

    const data = await Product.find();
    res.json({ status: "success", count: count, data });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getsingle/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findById(id);
    res.json({ status: "success", data });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
