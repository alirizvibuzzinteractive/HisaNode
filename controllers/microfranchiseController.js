const usersModel = require("../models/UserModel");
const MicroFranchiseModel = require("../models/MicroFranchiseModel");
const AssignMicroFranchiseModel = require("../models/AssignMicroFranchiseModel");
const TransactionModel = require("../models/TransactionModel");

const jwt = require("jsonwebtoken");

exports.createMicrofranchise = async (req, res) => {
  try {
    const token = req.header("Authorization");
    const varified = jwt.verify(token, process.env.TOKEN_SECRET);
    const _id = varified._id;
    req.body.created_by = _id;
    const MicroFranchise = await MicroFranchiseModel.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        MicroFranchise,
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

exports.updateMicrofranchise = async (req, res) => {
  try {
    const token = req.header("Authorization");
    var id = req.params.id;
    const MicroFranchise = await MicroFranchiseModel.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        MicroFranchise,
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

exports.deleteMicrofranchise = async (req, res) => {
  try {
    const token = req.header("Authorization");
    var id = req.params.id;

    const MicroFranchise = await MicroFranchiseModel.findOneAndRemove({
      _id: id,
    });
    res.status(200).json({
      status: "success",
      msg: MicroFranchise
        ? "Microfranchise deleted successfully"
        : "Microfranchise not found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.allMicrofranchise = async (req, res) => {
  const MicroFranchise = await MicroFranchiseModel.find();
  res.status(200).json({
    status: "success",
    data: {
      MicroFranchise,
    },
  });
};

exports.allInvestedMicrofranchise = async (req, res) => {
  const MicroFranchise = await TransactionModel.find()
    .select({ amount: 0, transaction_type: 0, created_by: 0, type: 0 })
    .populate({
      path: "mocrofranchise",
    });
  res.status(200).json({
    status: "success",
    data: MicroFranchise,
  });
};

exports.assignMicrofranchise = async (req, res) => {
  try {
    const token = req.header("Authorization");
    const varified = jwt.verify(token, process.env.TOKEN_SECRET);
    const _id = varified._id;
    req.body.assigned_by = _id;
    req.body.investor_equity_share = 33.33;
    req.body.operator_equity_share = 33.33;
    req.body.ngo_equity_share = 33.33;
    const AssignMicroFranchise = await AssignMicroFranchiseModel.create(
      req.body
    );
    res.status(200).json({
      status: "success",
      data: {
        AssignMicroFranchise,
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

exports.allAssignMicrofranchise = async (req, res) => {
  const MicroFranchise = await AssignMicroFranchiseModel.find().populate({
    path: "operator",
    select: [
      "_id",
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
    path: "transaction",
    populate : {
      path : 'created_by'
    }
  });
  res.status(200).json({
    status: "success",
    data: MicroFranchise,
  });
};
