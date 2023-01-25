const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const userData = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send("Access denied");
  }
  try {
    const data = jwt.verify(token, SECRET_KEY);
    req.user = data.id;
    next();
  } catch (error) {
    res.status(401).send("Access denied");
  }
};

module.exports = userData;
