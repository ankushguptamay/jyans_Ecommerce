module.exports = (sequelize, Sequelize) => {
    const OrderProduct = sequelize.define("orderProduct", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productId: {
            type: Sequelize.STRING, // many association with product
        },
        paiedAmount: {
            type: Sequelize.STRING, // one association with payment
        },
        userId: {
            type: Sequelize.STRING, // many association with user
        },
        orderId: {
            type: Sequelize.STRING
         }
    })
    return OrderProduct;
}