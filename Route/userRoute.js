const express = require('express');
const { registerSendOtp, reSendOtp, verifyOtp } = require('../Controller/User/userController');
const { addBankDetails, findAllBankDetails, findBankDetails } = require('../Controller/User/bankDetailsCont');
const { addProduct, findAllMyProducts, findAllProducts } = require('../Controller/User/productsController');

const user = express.Router();

// middleware
// const uploadImage = require('../Middleware/upload.image');
// const { verifyToken } = require('../Middleware/verifyPartnerJWTToken');
// const { isPartnerPreasent } = require('../Middleware/isPartnerPresent');

user.post("/registerPartner", registerSendOtp);
user.post("/verifyOtp", verifyOtp);
user.post("/reSendOtp", reSendOtp);

user.post("/addProduct", addProduct);
user.get("/products", findAllMyProducts);
user.get("/allProducts", findAllProducts);

user.post("/addBankDetails", addBankDetails);
user.get("/allBankDetails", findAllBankDetails);
user.get("/bankDetails", findBankDetails);

module.exports = user;