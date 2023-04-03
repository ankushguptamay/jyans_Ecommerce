const express = require('express');
const { registerSendOtp, reSendOtp, verifyOtp } = require('../Controller/Customer/customerController');
const { addAddress, findAllAddress, findAllMyAddress } = require('../Controller/Customer/addressController');
const { order,  findAllMyAllOrder} = require('../Controller/Customer/orderController');
const { addProductInShopingBag, findAllMyProductInShopingBag, findAllProductInShopingBag } = require('../Controller/Customer/shopingBagController');

const customer = express.Router();

// middleware
const { authCustomerToken } = require('../Middleware/authToken');
const { isCustomerPresent } = require('../Middleware/isPresent');

customer.post("/registerCustomer", registerSendOtp);
customer.post("/verifyOtp", verifyOtp);
customer.post("/reSendOtp", reSendOtp);

customer.post("/addAddress", authCustomerToken, isCustomerPresent, addAddress);
customer.get("/myAddress", authCustomerToken, isCustomerPresent, findAllMyAddress);
// customer.get("/address", findAllAddress);

customer.post("/addProductInShopingBag", authCustomerToken, isCustomerPresent, addProductInShopingBag);
customer.get("/myShopingBag", authCustomerToken, isCustomerPresent, findAllMyProductInShopingBag);
// customer.get("/shopingBag", findAllProductInShopingBag);

customer.post("/order", authCustomerToken, isCustomerPresent, order);
customer.get("/myOrder", authCustomerToken, isCustomerPresent, findAllMyAllOrder);

module.exports = customer;