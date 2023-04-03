module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING, // many association with product
        },
        email: {
            type: Sequelize.STRING, // one association with payment
        },
        contactNumber: {
            type: Sequelize.STRING, // many association with user
        }
    })
    return Customer;
}