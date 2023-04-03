module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        },
        perProductPrice: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        details: {
            type: Sequelize.STRING
        },
        images: {
            type: Sequelize.JSON
        },
        videoLink: {
            type: Sequelize.STRING
        }
    })
    return Product;
}