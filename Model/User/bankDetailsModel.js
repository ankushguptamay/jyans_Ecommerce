module.exports = (sequelize, Sequelize) => {
    const AccountDetail = sequelize.define("accountDetail", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        bankName: {
            type: Sequelize.STRING // many association with product
        },
        nameInAccount: {
            type: Sequelize.STRING // one association with payment
        },
        IFSCCode: {
            type: Sequelize.STRING // many association with user
        },
        accountNumber: {
            type: Sequelize.STRING
        }
    })
    return AccountDetail;
}