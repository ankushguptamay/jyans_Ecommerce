module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        totalAmount: {
            type: Sequelize.STRING
        },
        orderStaus: {
            type:Sequelize.STRING,
            defaulyValue: "created"
        }
    })
    return Order;
}