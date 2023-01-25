const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./server/db/db");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

// Set CORS Policy
app.use(cors());

// DB Connection Function Call(); 
connectDB();

// Use Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Router
app.use("/api/auth", require("./server/router/auth"));
app.use("/api/products", require("./server/router/products"));
app.use("/api/order", require("./server/router/order"));

// Permission upload Folder
app.use("../src/upload/", express.static(path.join(__dirname, "../src/upload/")))

// SERVER LISTEN
app.listen(port, () =>
  console.log("> SERVER IS LISTENING http://localhost:" + port)
);