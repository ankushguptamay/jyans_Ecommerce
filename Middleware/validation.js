const joi = require('joi');

exports.validateUser = (data) => {
    const schema = joi.object().keys({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().email().required().label('Email'),
        contactNumber: joi.string().required()
    }).options({ allowUnknown: true });
    return schema.validate(data);
}

exports.validateCustomer = (data) => {
    const schema = joi.object().keys({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().email().required().label('Email'),
        contactNumber: joi.string().required()
    }).options({ allowUnknown: true });
    return schema.validate(data);
}