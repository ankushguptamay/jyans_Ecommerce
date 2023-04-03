const db = require("../Model");
const User = db.user;
const Customer = db.customer;
const DeliveryPerson = db.deliveryPerson;

exports.isUserPresent = async (req, res, next) => {
    const id = req.user.id;
    await User.findOne({ where: { id: id } }).then(user => {
        if (!user) {
            return res.status(400).send({
                message: 'Sorry! User is not present!'
            });
        }
        next();
    }).catch(error => {
        console.log("error: ", error);
    })
};

exports.isCustomerPresent = async (req, res, next) => {
    const id = req.customer.id;
    await Customer.findOne({ where: { id: id } }).then(customer => {
        if (!customer) {
            return res.status(400).send({
                message: 'Sorry! Customer is not present!'
            });
        }
        next();
    }).catch(error => {
        console.log("error: ", error);
    })
};

exports.isDeliveryPersonPresent = async (req, res, next) => {
    const id = req.deliveryPerson.id;
    await DeliveryPerson.findOne({ where: { id: id } }).then(person => {
        if (!person) {
            return res.status(400).send({
                message: 'Sorry! Person is not present!'
            });
        }
        next();
    }).catch(error => {
        console.log("error: ", error);
    })
};