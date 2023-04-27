const express = require('express');
const { registerSendOtp, reSendOtp, verifyOtp, findCustomer, updateCustomer } = require('../Controller/Customer/customerController');
const { addAddress, findAllMyAddress, updateAddress, deleteAddress } = require('../Controller/Customer/addressController');
const { creatOrder, addAddressInOrder, verifyOrder, findAllCustomerOrder } = require('../Controller/Customer/orderController');
const { findAllProducts } = require('../Controller/User/productsController');
const { addProductInShopingBag, findAllMyProductInShopingBag, deleteProductInShopingBag } = require('../Controller/Customer/shopingBagController');
const { addProductInWishListByHomePage, moveProductToShopingBagFromWishList, moveProductToWishListFromShopingBag, destroyProductInWishList, findAllMyProductInWishList } = require('../Controller/Customer/wishListController');

const customer = express.Router();

// middleware
const { authCustomerToken } = require('../Middleware/authToken');
const { isCustomerPresent } = require('../Middleware/isPresent');

customer.post("/registerCustomer", registerSendOtp);
customer.post("/verifyOtp", verifyOtp);
customer.post("/reSendOtp", reSendOtp);
customer.get("/customer", authCustomerToken, findCustomer);
customer.put("/updateCustomer", authCustomerToken, updateCustomer);

customer.get("/products", findAllProducts);

customer.post("/addAddress", authCustomerToken, isCustomerPresent, addAddress);
customer.get("/myAddress", authCustomerToken, isCustomerPresent, findAllMyAddress);
customer.put("/updateAddress/:id", authCustomerToken, isCustomerPresent, updateAddress);
customer.delete("/deleteAddress/:id", authCustomerToken, isCustomerPresent, deleteAddress);

customer.post("/addProductInShopingBag", authCustomerToken, isCustomerPresent, addProductInShopingBag);
customer.get("/shopingBag", authCustomerToken, isCustomerPresent, findAllMyProductInShopingBag);
customer.delete("/deleteProductInShopingBag/:id", authCustomerToken, isCustomerPresent, deleteProductInShopingBag);

customer.post("/creatOrder", authCustomerToken, isCustomerPresent, creatOrder);
customer.put("/addAddressInOrder/:id", authCustomerToken, isCustomerPresent, addAddressInOrder); // orderId
customer.put("/verifyOrder/:id", authCustomerToken, isCustomerPresent, verifyOrder); // orderId
customer.get("/order", authCustomerToken, isCustomerPresent, findAllCustomerOrder);

customer.post("/addProductInWishListByHomePage/:id", authCustomerToken, isCustomerPresent, addProductInWishListByHomePage); // productId
customer.post("/moveProductToWishListFromShopingBag/:id", authCustomerToken, isCustomerPresent, moveProductToWishListFromShopingBag); // shopingBagId
customer.post("/moveProductToShopingBagFromWishList/:id", authCustomerToken, isCustomerPresent, moveProductToShopingBagFromWishList); // wishListId
customer.get("/wishList", authCustomerToken, isCustomerPresent, findAllMyProductInWishList);
customer.delete("/destroyProductInWishList/:id", authCustomerToken, isCustomerPresent, destroyProductInWishList); // wishListId

module.exports = customer;