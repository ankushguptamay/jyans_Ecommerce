module.exports = (sequelize, Sequelize) => {
    const WishList = sequelize.define("wishList", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    })
    return WishList;
}