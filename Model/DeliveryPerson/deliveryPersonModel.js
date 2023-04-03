module.exports = (sequelize, Sequelize) => {
    const DeliveryPerson = sequelize.define("deliveryPerson", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        contactNumber: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        }
    })
    return DeliveryPerson;
}