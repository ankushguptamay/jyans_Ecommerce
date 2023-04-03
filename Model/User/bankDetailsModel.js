module.exports = (sequelize, Sequelize) => {
    const AccountDetail = sequelize.define("accountDetail", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        bankName: {
            type: Sequelize.STRING 
        },
        nameInAccount: {
            type: Sequelize.STRING 
        },
        IFSCCode: {
            type: Sequelize.STRING 
        },
        accountNumber: {
            type: Sequelize.STRING
        }
    })
    return AccountDetail;
}