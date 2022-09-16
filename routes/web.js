const router = require("express").Router();
const userController = require('../controllers/userController');
const microfranchiseController = require('../controllers/microfranchiseController');
const transactionController = require('../controllers/transactionController');
const {validate,validation} = require('../midleware/validation');


// ! ||--------------------------------------------------------------------------------||
// ! ||                                   USER ROUTES                                  ||
// ! ||--------------------------------------------------------------------------------||
router.route("/").post(validate("login"),validation,userController.login);
router.route("/create-user").post(validate("signup"),validation,userController.createUser);
router.route("/login").post(validate("login"),validation,userController.login);
router.route("/reset-password").post(validate("resetpass"),validation,userController.resetPassword);
router.route("/forgot-password").post(validate("forgotpass"),validation,userController.forgotPassword);
router.route("/update-profile").post(userController.updateUserById);
router.route("/get-user/:role?").post(userController.getAllUsers);


// ! ||--------------------------------------------------------------------------------||
// ! ||                             MICRO FRANCHISE ROUTES                             ||
// ! ||--------------------------------------------------------------------------------||
router.route("/microfranchise/create").post(microfranchiseController.createMicrofranchise);
router.route("/microfranchise/update/:id").post(microfranchiseController.updateMicrofranchise);
router.route("/microfranchise/delete/:id").post(microfranchiseController.deleteMicrofranchise);
router.route("/microfranchise/all").get(microfranchiseController.allMicrofranchise);
router.route("/microfranchise/invested/all").get(microfranchiseController.allInvestedMicrofranchise);
router.route("/microfranchise/assign").post(validate("assignMicroFranchise"),validation,microfranchiseController.assignMicrofranchise);
router.route("/microfranchise/assign/view").get(microfranchiseController.allAssignMicrofranchise);



// ! ||--------------------------------------------------------------------------------||
// ! ||                                   TRANSACTION                                  ||
// ! ||--------------------------------------------------------------------------------||
router.route("/transaction/make").post(transactionController.makeTransaction);
router.route("/transaction/:id").get(transactionController.viewTransaction);



// ! ||--------------------------------------------------------------------------------||
// ! ||                                  EXPORT ROUTER                                 ||
// ! ||--------------------------------------------------------------------------------||
module.exports = router;
