const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: {
      values: ["operator", "investor", "admin", "staff", "donor"],
      default: "staff",
    },
    required: [true, "Role is required"],
  },
  full_name: {
    type: String,
    required: [true, "Full Name is required"],
  },
  age: {
    type: Number,
  },
  cnic: {
    type: Number,
  },
  cnic_attachment_front: {
    type: String,
  },
  cnic_attachment_back: {
    type: String,
  },
  mobile_number: {
    type: Number,
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
  },
  gender: {
    type: String,
    default: "male",
    enum: {
      values: ["male", "female", "other"],
    },
  },
  religion: {
    type: String,
  },
  marital_status: {
    type: String,
    default: "single",
    enum: {
      values: ["single", "married", "divoced", "widow"],
    },
  },
  profile_picture: {
    type: String,
  },
  home_ownership_status: {
    type: String,
    enum: {
      values: ["own", "rent"],
    },
    default: "own",
  },
  rent_amount: {
    type: Number,
  },
  address_duration: {
    type: Number,
  },
  address_type: {
    type: String,
    enum: {
      values: ["current", "mailing", "legal"],
    },
    default: "current",
  },
  education: {
    type: String,
    default: "undermatric",
    enum: {
      values: ["undermatric", "matric", "intermediate", "bachelors", "masters"],
    },
  },
  degree_years: {
    type: Number,
  },
  employment_status: {
    type: String,
    default:"employed",
    enum: {
      values: ["student", "employed", "unemployed", "self_employed"],
    },
  },
  employer_address: {
    type: String,
  },
  company_name: {
    type: String,
  },
  company_phone: {
    type: Number,
  },
  employment_duration: {
    type: Number,
  },
  salary_amount: {
    type: Number,
  },
  job_position: {
    type: String,
  },
  reference_name: {
    type: String,
  },
  reference_cnic: {
    type: Number,
  },
  reference_phone: {
    type: Number,
  },
  reference_address: {
    type: String,
  },
  reference_relation:{
    type:String,
    default:"other",
    enum:{
      values:["friend","coworker","neighbor","other"]
    }
  },
  status:{
    type:String,
    default:"pending",
    enum:{
      values:["active","pending","deactive","freez"]
    }
  },
  created_by: {
    type: String,
  },
  created_at: {
    type: String,
  },
  udated_at: {
    type: String,
  },
});

const user = mongoose.model("user", UserSchema);

module.exports = user;
