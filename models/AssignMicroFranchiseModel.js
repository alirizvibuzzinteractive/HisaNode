const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
  },
  investor_equity_share: {
    type: Number,
    required: [true, "investor_equity_share field is required"],
  },
  operator_equity_share: {
    type: Number,
    required: [true, "operator_equity_share field is required"],
  },
  ngo_equity_share: {
    type: Number,
    required: [true, "ngo_equity_share field is required"],
  },
  tags: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
    enum: {
      values: ["active", "pending", "deactive", "freez", "wip"],
    },
  },
  assigned_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  created_at: {
    type: String,
  },
  udated_at: {
    type: String,
  },
});

const AssignMicroFranchise = mongoose.model("AssignMicroFranchise", UserSchema);

module.exports = AssignMicroFranchise;
