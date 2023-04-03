module.exports = (sequelize, Sequelize) => {
    const liveStatus = sequelize.define("liveStatus", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: Sequelize.STRING 
        }
    })
    return liveStatus;
}