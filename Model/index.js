const dbConfig = require('../Config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// User or Shopkeeper
db.user = require('./User/userModel')(sequelize, Sequelize);
db.bankDetails = require('./User/bankDetailsModel')(sequelize, Sequelize);
db.products = require('./User/productsModel')(sequelize, Sequelize);

// Association of User
db.user.hasOne(db.bankDetails, { foreignKey: 'userId' });
db.bankDetails.belongsTo(db.user, {foreignKey: 'userId'});

db.user.hasMany(db.products, { foreignKey: 'userId' });
db.products.belongsTo(db.user, {foreignKey: 'userId'});

module.exports = db;