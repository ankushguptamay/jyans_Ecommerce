const express = require('express');
const { registerSendOtp, reSendOtp, verifyOtp, findUser, updateUser } = require('../Controller/User/userController');
const { addBankDetails, findBankDetails } = require('../Controller/User/bankDetailsCont');
const { addProduct, findAllMyProducts, updateProduct, deleteProduct } = require('../Controller/User/productsController');
const { findAllUserOrderedProduct } = require('../Controller/Customer/orderController');

const user = express.Router();

// middleware
const uploadProductImages = require('../Middleware/uploadProductImages');
const { authUserToken } = require('../Middleware/authToken');
const { isUserPresent } = require('../Middleware/isPresent');

user.post("/registerUser", registerSendOtp);
user.post("/verifyOtp", verifyOtp);
user.post("/reSendOtp", reSendOtp);
user.get("/user", authUserToken, findUser);
user.put("/updateUser", authUserToken, updateUser);

user.post("/addProduct", authUserToken, isUserPresent, uploadProductImages.array("productImages", 20), addProduct);
user.get("/products", authUserToken, isUserPresent, findAllMyProducts);
user.put("/updateProduct/:id", authUserToken, isUserPresent, uploadProductImages.array("productImages", 20), updateProduct);
user.delete("/deleteProduct/:id", authUserToken, isUserPresent, deleteProduct);

user.post("/addBankDetails", authUserToken, isUserPresent, addBankDetails);
user.get("/allBankDetails", authUserToken, isUserPresent, findBankDetails);

user.get("/myOrderedProducts", authUserToken, isUserPresent, findAllUserOrderedProduct);

module.exports = user;