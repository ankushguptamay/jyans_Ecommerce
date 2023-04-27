const db = require('../../Model');
const User = db.user;
const { validateUser } = require("../../Middleware/validation");
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID, JWT_SECRET_KEY } = process.env;
const twilio = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
});
const jwt = require('jsonwebtoken');

exports.registerSendOtp = async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const { name, email, contactNumber, address } = req.body;
        const countryCode = "+91";
        const isNumber = await User.findOne({ where: { contactNumber: contactNumber } });
        const isEmail = await User.findOne({ where: { email: email } });
        if (isNumber || isEmail) { return res.send({ message: "This mobile number or Email is already present!" }) }
        await User.create({
            name: name,
            email: email,
            contactNumber: contactNumber,
            address: address
        });
        await twilio.verify.v2
            .services(TWILIO_SERVICE_SID)
            .verifications
            .create({
                to: `${countryCode}${contactNumber}`,
                channel: 'sms'
            })
        res.status(200).send({ message: `OTP sent to user's contact number!` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.reSendOtp = async (req, res) => {
    try {
        const { contactNumber } = req.body;
        const countryCode = "+91";
        const isNumber = await User.findOne({ where: { contactNumber: contactNumber } });
        if (!isNumber) { return res.send({ message: "First register your self!" }) }
        await twilio.verify.v2
            .services(TWILIO_SERVICE_SID)
            .verifications
            .create({
                to: `${countryCode}${contactNumber}`,
                channel: 'sms'
            })
        res.status(200).send({ message: `OTP resent to User's Contact number!` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        const { contactNumber, otp } = req.body;
        const countryCode = "+91";
        const user = await User.findOne({ where: { contactNumber: contactNumber } });
        if (!user) { return res.send({ message: "First register your self!" }) };
        await twilio.verify.v2
            .services(TWILIO_SERVICE_SID)
            .verificationChecks
            .create({
                to: `${countryCode}${contactNumber}`,
                code: otp
            });
        const data = {
            id: user.id
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

exports.findUser = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findOne({ where: { id: id } });
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.user.id;
        const { name, address } = req.body;
        const user = await User.findOne({ where: { id: id } });
        if (!user) { return res.send({ message: "User is not present!" }) }
        await user.update({
            ...user,
            name: name,
            address: address
        })
        res.status(200).send({ message: `User modified successfully! ID: ${id}` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}