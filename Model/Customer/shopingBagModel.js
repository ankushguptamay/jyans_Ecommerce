module.exports = (sequelize, Sequelize) => {
    const ShopingBag = sequelize.define("shopingBag", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: {
            type: Sequelize.INTEGER
        }
    })
    return ShopingBag;
}