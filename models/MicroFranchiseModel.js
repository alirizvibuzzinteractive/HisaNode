const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name field is required"],
  },
  type: {
    type: String,
    enum: {
      values: ["biryani", "juice"],
      default: "biryani",
    },
    required: [true, "type field is required"],
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
    enum: {
      values: ["active", "pending", "deactive", "freez","wip"],
    },
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

const user = mongoose.model("microfranchise", UserSchema);

module.exports = user;
