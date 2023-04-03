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

// Customer
db.customer = require('./Customer/customerModel')(sequelize, Sequelize);
db.address = require('./Customer/addressModel')(sequelize, Sequelize);
db.order = require('./Customer/orderModel')(sequelize, Sequelize);
db.orderedProduct = require('./Customer/orderedProductModel')(sequelize, Sequelize);
db.shopingBag = require('./Customer/shopingBagModel')(sequelize, Sequelize);

// DeliveryPerson
db.deliveryPerson = require('./DeliveryPerson/deliveryPersonModel')(sequelize, Sequelize);
db.orderLiveStatus = require('./DeliveryPerson/orderLiveStatusModel')(sequelize, Sequelize);

// Association of User
db.user.hasOne(db.bankDetails, { foreignKey: 'userId' });
db.bankDetails.belongsTo(db.user, {foreignKey: 'userId'});

db.user.hasMany(db.products, { foreignKey: 'userId' });
db.products.belongsTo(db.user, {foreignKey: 'userId'});

// Association of Customer
db.customer.hasMany(db.address, { foreignKey: 'customerId' });
db.address.belongsTo(db.customer, {foreignKey: 'customerId'});

db.customer.hasMany(db.order, { foreignKey: 'customerId' });
db.order.belongsTo(db.customer, {foreignKey: 'customerId'});

db.customer.hasMany(db.shopingBag, { foreignKey: 'customerId' }); // to fetch data of shopingbag from customer model and add foreignKey 'customerId' in shopingbag
db.shopingBag.belongsTo(db.customer, {foreignKey: 'customerId'}); // to fetch data of customer from shopingbag model and add foreignKey 'customerId' in shopingbag

db.shopingBag.belongsTo(db.products, { foreignKey: 'productId'}); // to fetch data of products from shopingbag model and add foreignKey 'productId' in shopingbag

db.order.hasMany(db.orderedProduct, {foreignKey: 'orderId'});

db.orderedProduct.belongsTo(db.products, {foreignKey: 'productId'})

// Association of DeliveryPerson
db.orderLiveStatus.belongsTo(db.deliveryPerson, {foreignKey: 'deliveryPersonId'});

db.orderLiveStatus.belongsTo(db.user, {foreignKey: 'userId'});

db.order.hasMany(db.orderLiveStatus, {foreignKey: 'orderId'});

module.exports = db;