module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        orderProductId: {
            type: Sequelize.STRING, // many association with product
        },
        paymentId: {
            type: Sequelize.STRING, // one association with payment
        },
        userId: {
            type: Sequelize.STRING, // many association with user
        }
    })
    return Order;
}