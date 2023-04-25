const express = require('express');
const { registerSendOtp, reSendOtp, verifyOtp } = require('../Controller/Customer/customerController');
const { addAddress, findAllMyAddress } = require('../Controller/Customer/addressController');
const { order, findAllMyAllOrder } = require('../Controller/Customer/orderController');
const { findAllProducts } = require('../Controller/User/productsController');
const { addProductInShopingBag, findAllMyProductInShopingBag } = require('../Controller/Customer/shopingBagController');
const { addProductInWishListByHomePage, moveProductToShopingBagFromWishList, moveProductToWishListFromShopingBag, destroyProductInWishList, findAllMyProductInWishList } = require('../Controller/Customer/wishListController');

const customer = express.Router();

// middleware
const { authCustomerToken } = require('../Middleware/authToken');
const { isCustomerPresent } = require('../Middleware/isPresent');

customer.post("/registerCustomer", registerSendOtp);
customer.post("/verifyOtp", verifyOtp);
customer.post("/reSendOtp", reSendOtp);

customer.get("/products", findAllProducts);

customer.post("/addAddress", authCustomerToken, isCustomerPresent, addAddress);
customer.get("/myAddress", authCustomerToken, isCustomerPresent, findAllMyAddress);

customer.post("/addProductInShopingBag", authCustomerToken, isCustomerPresent, addProductInShopingBag);
customer.get("/shopingBag", authCustomerToken, isCustomerPresent, findAllMyProductInShopingBag);

customer.post("/order", authCustomerToken, isCustomerPresent, order);
customer.get("/myOrder", authCustomerToken, isCustomerPresent, findAllMyAllOrder);

customer.post("/addProductInWishListByHomePage/:id", authCustomerToken, isCustomerPresent, addProductInWishListByHomePage); // productId
customer.post("/moveProductToWishListFromShopingBag/:id", authCustomerToken, isCustomerPresent, moveProductToWishListFromShopingBag); // shopingBagId
customer.post("/moveProductToShopingBagFromWishList/:id", authCustomerToken, isCustomerPresent, moveProductToShopingBagFromWishList); // wishListId
customer.get("/wishList", authCustomerToken, isCustomerPresent, findAllMyProductInWishList);
customer.delete("/destroyProductInWishList/:id",authCustomerToken,isCustomerPresent,destroyProductInWishList); // wishListId

module.exports = customer;