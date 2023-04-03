const db = require("../Model");
const User = db.user;
const Customer = db.customer;

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
    console.log(id);
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
