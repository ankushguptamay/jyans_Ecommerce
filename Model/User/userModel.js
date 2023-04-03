module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
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
    return User;
}