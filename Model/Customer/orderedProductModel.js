module.exports = (sequelize, Sequelize) => {
    const OrderedProduct = sequelize.define("orderedProduct", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        perProductPrice: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.INTEGER
        }
    })
    return OrderedProduct;
}