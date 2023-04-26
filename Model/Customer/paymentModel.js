module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        paymentId: {
            type: Sequelize.STRING
        },
        razorpayOrderId: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        },
        paymentStatus: {
            type: Sequelize.STRING
        }
    })
    return Payment;
}