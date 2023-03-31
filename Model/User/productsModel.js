module.exports = (sequelize, Sequelize) => {
    const ShopKeeper = sequelize.define("shopKeeper", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING // many association with product
        },
        price: {
            type: Sequelize.STRING // one association with payment
        },
        title: {
            type: Sequelize.STRING // many association with user
        },
        details: {
            type: Sequelize.STRING
        },
        images: {
            type: Sequelize.STRING
        },
        videoLink: {
            type: Sequelize.STRING
        }
    })
    return ShopKeeper;
}