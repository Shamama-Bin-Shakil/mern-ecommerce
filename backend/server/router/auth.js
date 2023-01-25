const express = require("express");
const route = express.Router();
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
const otp = require("otp-generator");
const Auth = require("../model/Auth");
const jwt = require("jsonwebtoken");
const userData = require("../middleware/userData");
const SECRET_KEY = process.env.SECRET_KEY;
const password = process.env.PASS;
const accEmail = process.env.EMAIL;

//Route -> (1) REGISTER Account
route.post("/register", async (req, res) => {
  try {
    const { name, email, password, gender, birth_date } = req.body;
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    const check = await Auth.findOne({ email });
    if (check) {
      return res.json({ msg: "Email is already exist", status: "error" });
    }

    // Data analyze
    const data = new Auth({
      name,
      email,
      password: hash,
      gender,
      birth_date,
      otp: "",
    });
    // Data Save
    const result = await data.save();
    if (!result) {
      return res.json({ msg: "Something went wrong ", status: "error" });
    }
    return res.json({ msg: "Account Create Successfully", status: "success" });
  } catch (error) {
    res.status(404).send("not ok :(");
  }
});

//Route -> (2) LOGIN Account
route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkExist = await Auth.findOne({ email });
    // Exist Email
    if (!checkExist) {
      return res.json({ msg: "Invalid Credential", status: "error" });
    }
    // Check Password
    const checkPassword = await bcryptjs.compare(password, checkExist.password);
    if (!checkPassword) {
      return res.json({ msg: "Invalid Credential", status: "error" });
    }
    const payload = {
      id: checkExist.id,
    };
    const userData = jwt.sign(payload, SECRET_KEY);

    return res.json({ data: userData, msg: "Logged", status: "success" });
  } catch (error) {
    console.log(error);
  }
});

//Route -> (3) FORGET Account
route.post("/forget", async (req, res) => {
  try {
    const { email } = req.body;
    const otpsend = otp.generate(8, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    const result = await Auth.findOneAndUpdate(email, {
      $set: { otp: otpsend },
    });

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: accEmail, // generated ethereal user
        pass: password, // generated ethereal password
      },
    });

    let mail = {
      from: accEmail, // sender address
      to: email, // list of receivers
      subject: "Verification Code For Password Forget ✔", // Subject line
      text: "Verification Code For Password Forget ✔", // plain text body
      html: `<b>${otpsend}</b>`, // html body
    };

    transporter.sendMail(mail, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
        return res.json({ msg: "Email Send Successfully", status: "success" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//Route -> (4) OTP SEND -> Account
route.post("/otp", async (req, res) => {
  try {
    const { otp } = req.body;
    const checkValidOTP = await Auth.findOne({ otp }).count();
    // Check OTP Valid
    if (checkValidOTP === 0) {
      return res.json({ msg: "OTP is not match", status: "error" });
    }
    res.json({ msg: "Verified", status: "success" });
  } catch (error) {
    console.log(error);
  }
});

//Route -> (5) USER DATA -> Account
route.post("/userfetch", userData, async (req, res) => {
  const id = req.user;
  const data = await Auth.findById(id).select("-password");
  res.json({ data, msg: "Send Admin Data", status: "success" });
});

//Route -> (6) Forget Change Password -> Account
route.post("/forgetchangepassword", async (req, res) => {
  const { email, new_password, conf_password } = req.body;

  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(new_password, salt);
  try {
    const userPass = await Auth.findOneAndUpdate(
      email,
      { $set: { password: hash, otp: "" } },
      { new: true }
    );
    if (!userPass) {
      return res.json({
        msg: "Password has not been Updates",
        status: "error",
      });
    }
    res.json({ msg: "Password has been Updates", status: "success" });
  } catch (error) {
    console.log(error);
  }
});

//Route -> (7) Delete User -> Account
route.delete("/userdelete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Auth.findByIdAndDelete(id);
  if (!data) {
    return res.json({ data: "not found data", status: "error" });
  }
  res.json({ data, status: "success" });
});

//Route -> (7) Update User -> Account
route.put("/userupdate/:id", async (req, res) => {
  const { name, gender, birth_date } = req.body;
  const id = req.params.id;
  const updateData = {
    name: name,
    gender: gender,
    birth_date: birth_date,
  };
  const data = await Auth.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );
  res.json({ data, status: "success" });
});

//Route -> (7) Update User -> Account
route.post("/userpasswordupdate", userData, async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  const check = await Auth.findOne({ _id: req.user });

  if (!check) {
    return res.json({ msg: "Invalid Credential", status: "error" });
  }

  if (newPassword !== confirmPassword) {
    return res.json({ msg: "New Password and Confirm Password  do not match", status: "error" });
  }

  const passwordVerify = await bcryptjs.compare(currentPassword, check.password);
  if (!passwordVerify) {
    return res.json({ msg: "Password do not match", status: "error"});
  }

  const passwordSalt = await bcryptjs.genSalt(10);
  const passwordHash = await bcryptjs.hash(newPassword, passwordSalt);

  const passUpdated = {
    password: passwordHash,
  };

  const passwordUpdate = await Auth.findByIdAndUpdate(
    req.user,
    { $set: passUpdated },
    { new: true }
  );

  res.json({ msg: "Password Updated Successfully", status: "success" });
});

module.exports = route;
