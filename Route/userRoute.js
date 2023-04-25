const express = require('express');
const { registerSendOtp, reSendOtp, verifyOtp } = require('../Controller/User/userController');
const { addBankDetails, findBankDetails } = require('../Controller/User/bankDetailsCont');
const { addProduct, findAllMyProducts } = require('../Controller/User/productsController');

const user = express.Router();

// middleware
const uploadProductImages = require('../Middleware/uploadProductImages');
const { authUserToken } = require('../Middleware/authToken');
const { isUserPresent } = require('../Middleware/isPresent');

user.post("/registerUser", registerSendOtp);
user.post("/verifyOtp", verifyOtp);
user.post("/reSendOtp", reSendOtp);

user.post("/addProduct", authUserToken, isUserPresent, uploadProductImages.array("productImages", 20), addProduct);
user.get("/products", authUserToken, isUserPresent, findAllMyProducts);

user.post("/addBankDetails", authUserToken, isUserPresent, addBankDetails);
user.get("/allBankDetails", authUserToken, isUserPresent, findBankDetails);

module.exports = user;