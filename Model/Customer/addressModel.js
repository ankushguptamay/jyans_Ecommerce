module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("address", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sector: {
            type: Sequelize.STRING,
        },
        city: {
            type: Sequelize.STRING,
        },
        state: {
            type: Sequelize.STRING,
        },
        pinCode: {
            type: Sequelize.STRING,
        },
        type: {
            type: Sequelize.STRING // home , office
        }
    })
    return Address;
}