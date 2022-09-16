const AWS = require("aws-sdk");
// ! ||--------------------------------------------------------------------------------||
// ! ||                             IMPORTS PACKAGES ABOVE                             ||
// ! ||--------------------------------------------------------------------------------||

exports.hi = async (req, res) => {
  return res.status(200).json({
    status: "status",
    data: "data",
  });
};
exports.uploadImg = async (req, res) => {
  
console.warn(req.files);
  return res.status(200).json({
    status: true,
    data:req.body,
  });
};
