const usersModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");

// ! ||--------------------------------------------------------------------------------||
// ! ||                                  LOGIN METHOD                                  ||
// ! ||--------------------------------------------------------------------------------||
exports.login = async (req, res) => {
  try {
    const user = await usersModel.findOne({ email: req.body.email });
    console.log(user);
    if (user == null) {
      res.status(401).json({
        msg: "User not exist",
      });
      return false;
    }
    const validation = await bcrypt.compare(req.body.password, user.password);
    if (!validation) {
      res.status(401).json({
        status: "Email or Password is invalid",
      });
      return false;
    } else {
      user2 = await usersModel.findOne(
        { _id: user._id },
        { password: 0, e_wallet: 0, emploies: 0, followers: 0, orders: 0 }
      );

      res.status(200).json({
        status: "success",
        data: {
          tokken: jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Something went wrong",
    });
  }
};
exports.createUser = async (req, res) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    console.warn(hash);
    req.body.password = hash;
    const newUser = await usersModel.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      let errors = [];

      Object.keys(error.errors).forEach((key, i) => {
        errors.push(error.errors[key].message);
      });
      return res.status(400).json({
        status: errors,
      });
    }
    console.log(error);
    res.status(500).send(error);
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const user = await usersModel.findOne({ email: req.body.email });
    if (user.length === 0) {
      res.status(400).send("Email not found");
      return false;
    }
    let password = req.body.password;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    const passUpdate = await usersModel.findOneAndUpdate(
      { email: req.body.email },
      { password: hash },
      { new: true }
    );
    if (passUpdate) {
      res.status(200).json({
        status: "success",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.forgotPassword = async (req, res) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alirizvi139@gmail.com",
        pass: "P@$$w0rdALIRIZVI",
      },
    });

    var mailOptions = {
      from: "alirizvi139@gmail.com",
      to: "alirizvi139@gmail.com",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(200).json({
          status: "error",
          data: error,
        });
      } else {
        return res.status(200).json({
          status: "success",
          msg: "Email sended successfully!",
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.passwordUser = async (req, res) => {
  const token = req.header("Authorization");
  var varified = jwt.verify(token, process.env.TOKEN_SECRET);
  var _id = varified._id;
  var user = await usersModel.findOne({ _id });
  console.log(444);
  console.log(req.body);
  validation = await bcrypt.compare(req.body.old_password, user.password);
  if (!validation) {
    res
      .status(401)
      .json({ status: false, message: "Error! Password do not match" });
  } else {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.new_password, salt);
    var user = await usersModel.findOneAndUpdate(
      { _id },
      { password: hash },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Password Updated",
    });
  }
};
exports.updateUserById = async (req, res) => {
  try {
    const token = req.header("Authorization");
    const varified = jwt.verify(token, process.env.TOKEN_SECRET);
    const _id = varified._id;
    console.log(_id);
    const user = await usersModel.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Cant update something went wrong!",
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    console.warn(req.params);
    var role = { $ne: "admin" };
    if (req.params.role != undefined) {
      role = { $eq: req.params.role };
    }
    const token = req.header("Authorization");
    const varified = jwt.verify(token, process.env.TOKEN_SECRET);
    const _id = varified._id;
    const user = await usersModel.find({ role: role });
    console.log("get all users:", user);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Cant update something went wrong!",
    });
  }
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.varificarion = (req, res) => {
  const token = req.header("Authorization");
  const varified = jwt.verify(token, process.env.TOKEN_SECRET);
  res.status(200).json({
    status: "success",
    data: varified,
  });
};
exports.totalUser = async (req, res) => {
  try {
    const token = req.header("Authorization");
    const varified = jwt.verify(token, process.env.TOKEN_SECRET);
    var user = null;
    console.warn(req.body);
    if (req.body.permission == "myuser") {
      console.log(234);
      user = { parent: varified._id };
    }
    var user = await usersModel
      .find({ reseller: { $ne: "admin" }, user })
      .populate({
        path: "credits",
        match: {
          status: "active",
          expiry_date: { $gte: new Date().valueOf() / 1000 },
        },
      });
    res.status(200).json({
      status: "success",
      NoOfUser: user.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

exports.totalReseller = async (req, res) => {
  try {
    const token = req.header("Authorization");
    const varified = jwt.verify(token, process.env.TOKEN_SECRET);
    var user = null;
    if (req.body.permission == "myuser") {
      user = { parent: varified._id };
    }
    var user = await usersModel.find({ reseller: "1" });
    res.status(200).json({
      status: "success",
      NoOfUser: user.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};
