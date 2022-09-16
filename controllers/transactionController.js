const usersModel = require("../models/UserModel");
const TransactionModel = require("../models/TransactionModel");
const jwt = require("jsonwebtoken");

exports.makeTransaction = async (req, res) => {
  try {
    const token = req.header("Authorization");
    const varified = jwt.verify(token, process.env.TOKEN_SECRET);
    const _id = varified._id;
    req.body.created_by = _id;
    const Transaction = await TransactionModel.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        Transaction,
      },
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      let errors = [];
      Object.keys(error.errors).forEach((key, i) => {
        errors.push(error.errors[key].message);
      });
      return res.status(200).json({
        message: "Below fields are require",
        data: errors,
        status: false,
      });
    }
    console.log(error);
    res.status(500).send(error);
  }
};

exports.viewTransaction = async (req, res) => {
  const Transaction = await TransactionModel.findOne({
    _id: req.params.id,
  }).populate({
    path: "created_by",
    select: [
      "role",
      "full_name",
      "email",
      "gender",
      "marital_status",
      "home_ownership_status",
      "address_type",
      "education",
      "employment_status",
      "reference_relation",
      "status",
    ],
  }).populate({
    path: "mocrofranchise"
  });
  res.status(200).json({
    status: "success",
    data: Transaction,
  });
};
