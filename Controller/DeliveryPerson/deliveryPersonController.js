const db = require('../../Model');
const DeliveryPerson = db.deliveryPerson;
const { validateDeliveryPerson } = require("../../Middleware/validation");
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID, JWT_SECRET_KEY } = process.env;
const twilio = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
});
const jwt = require('jsonwebtoken');

exports.registerSendOtp = async (req, res) => {
    try {
        const { error } = validateDeliveryPerson(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const { name, email, contactNumber, address } = req.body;
        const countryCode = "+91";
        const isNumber = await DeliveryPerson.findOne({ where: { contactNumber: contactNumber } });
        const isEmail = await DeliveryPerson.findOne({ where: { email: email } });
        if (isNumber || isEmail ) { return res.send({ message: "This mobile number or Email is already present!" }) }
        await DeliveryPerson.create({
            name: name,
            email: email,
            contactNumber: contactNumber,
            address:address
        });
        await twilio.verify.v2
            .services(TWILIO_SERVICE_SID)
            .verifications
            .create({
                to: `${countryCode}${contactNumber}`,
                channel: 'sms'
            })
        res.status(200).send({ message: `OTP sent to delivery person's contact number!` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.reSendOtp = async (req, res) => {
    try {
        const { contactNumber } = req.body;
        const countryCode = "+91";
        const isNumber = await DeliveryPerson.findOne({ where: { contactNumber: contactNumber } });
        if (!isNumber) { return res.send({ message: "First register your self!" }) }
        await twilio.verify.v2
            .services(TWILIO_SERVICE_SID)
            .verifications
            .create({
                to: `${countryCode}${contactNumber}`,
                channel: 'sms'
            })
        res.status(200).send({ message: `OTP resent to delivery person's Contact number!` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        const { contactNumber, otp } = req.body;
        const countryCode = "+91";
        const deliveryPerson = await DeliveryPerson.findOne({ where: { contactNumber: contactNumber } });
        if (!deliveryPerson) { return res.send({ message: "First register your self!" }) };
        await twilio.verify.v2
            .services(TWILIO_SERVICE_SID)
            .verificationChecks
            .create({
                to: `${countryCode}${contactNumber}`,
                code: otp
            });
        const data = {
            id: deliveryPerson.id
        }
        const authToken = jwt.sign(data, JWT_SECRET_KEY);
        res.status(200).send({
            message: `OTP verified successfully!`,
            authToken: authToken
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}