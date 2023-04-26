module.exports = (sequelize, Sequelize) => {
    const ShopingBag = sequelize.define("shopingBag", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // active: {
        //     type: Sequelize.BOOLEAN, 
        //     defaultValue: true
        // },
        quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        }
    })
    return ShopingBag;
}