const { body, validationResult } = require("express-validator");
const usersModel = require("../models/UserModel");

function validation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

function validate(method) {
  switch (method) {
    case "login": {
      return [
        body("password", "Passowrd is required").exists(),
        body("email").isEmail(),
      ];
    }
    case "signup": {
      return [
        body("password", "Passowrd is required").exists(),
        body("role", "Role is required").exists(),
        body("full_name", "Full Name is required").exists(),
        body("email").custom((email) => {
          return usersModel.findOne({ email: email }).then((user) => {
            if (user) {
              return Promise.reject("Email already in use");
            }
          });
        }),
      ];
    }
    case "forgotpass": {
      return [
        body("email", "Email is invalid")
          .isEmail()
          .custom((email) => {
            return usersModel.findOne({ email: email }).then((user) => {
              if (!user) {
                return Promise.reject("You are not signed up with this email");
              }
            });
          }),
      ];
    }
    case "resetpass": {
      return [
        body("password", "Password is required").exists(),
        body("email", "Email is invalid")
          .isEmail()
          .custom((email) => {
            return usersModel.findOne({ email: email }).then((user) => {
              if (!user) {
                return Promise.reject("You are not signed up with this email");
              }
            });
          }),
      ];
    }
    case "assignMicroFranchise": {
      return [
        body("operator", "Operator ID is required").exists(),
        body("transaction", "Transaction ID is invalid").exists(),
      ];
    }
  }
}

module.exports = { validation, validate };
