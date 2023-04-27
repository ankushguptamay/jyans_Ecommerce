const db = require('../../Model');
const { Op } = require("sequelize");
const Address = db.address;

exports.addAddress = async (req, res) => {
    try {
        const { sector, city, type, state, pinCode } = req.body;
        const address = await Address.create({
            sector:sector,
            pinCode:pinCode,
            city:city,
            state:state,
            type: type,
            customerId: req.customer.id
        });
        res.status(200).send({ message: `Customer's Address added successfully! Id : ${address.id}` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.findAllMyAddress = async (req, res) => {
    try {
        const address = await Address.findAll({ where: { customerId: req.customer.id } });
        res.status(200).send(address);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.updateAddress = async (req, res) => {
    try {
        const id = req.customer.id;
        const addressId = req.params.id;
        const { sector, city, type, state, pinCode } = req.body;
        const address = await Address.findOne({ where: { [Op.and]: [{ id: addressId }, { customerId: id }] } });
        if (!address) { return res.send({ message: "Address is not present!" }) }
        await address.update({
            sector:sector,
            pinCode:pinCode,
            city:city,
            state:state,
            type: type,
            customerId: req.customer.id
        })
        res.status(200).send({ message: `Address modified successfully! ID: ${addressId}` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteAddress = async (req, res) => {
    try {
        const id = req.customer.id;
        const addressId = req.params.id;
        const address = await Address.findOne({ where: { [Op.and]: [{ id: addressId }, { customerId: id }] } });
        if (!address) { return res.send({ message: "Address is not present!" }) }
        await address.delete();
        res.status(200).send({ message: `Address deleted successfully! ID: ${addressId}` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}