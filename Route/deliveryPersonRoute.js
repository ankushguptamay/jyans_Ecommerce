const express = require('express');
const { registerSendOtp, reSendOtp, verifyOtp, findDeliveryPerson, updateDeliveryPerson } = require('../Controller/DeliveryPerson/deliveryPersonController');

const deliveryPerson = express.Router();

// middleware
const { authDeliveryPersonToken } = require('../Middleware/authToken');
const { isDeliveryPersonPresent } = require('../Middleware/isPresent');

deliveryPerson.post("/registerUser", registerSendOtp);
deliveryPerson.post("/verifyOtp", verifyOtp);
deliveryPerson.post("/reSendOtp", reSendOtp);
deliveryPerson.get("/deliveryPerson", authDeliveryPersonToken, findDeliveryPerson);
deliveryPerson.put("/updateDeliveryPerson", authDeliveryPersonToken, updateDeliveryPerson);

module.exports = deliveryPerson;