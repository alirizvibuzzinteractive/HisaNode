const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "amount field is required"],
  },
  type: {
    type: String,
    enum: {
      values: ["donate", "invest","earning"],
    },
    required: [true, "type field is required"],
  },
  transaction_type: {
    type: String,
    enum: {
      values: ["credit", "debit"],
    },
    required: [true, "transaction_type field is required"],
  },
  account_id: {
    type: String,
  },
  mocrofranchise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "microfranchise",
  },
  created_by: {
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

const TransactionModel = mongoose.model("Transaction", TransactionSchema);

module.exports = TransactionModel;
