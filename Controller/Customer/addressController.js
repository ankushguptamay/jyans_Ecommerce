const db = require('../../Model');
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

exports.findAllAddress = async (req, res) => {
    try {
        const address = await Address.findAll();
        res.status(200).send(address);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}