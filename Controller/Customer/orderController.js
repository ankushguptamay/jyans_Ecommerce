const db = require('../../Model');
const Razorpay = require('razorpay');
const { Op } = require("sequelize");
const Order = db.order;
const Product = db.products;
const OrderedProduct = db.orderedProduct;
const ShopingBag = db.shopingBag;
const Address = db.address;
const Payment = db.payment;
const Customer = db.customer;

const razorpayInstance = new Razorpay({
    // Replace with your key_id
    key_id: process.env.RAZORPAY_KEY_ID,

    // Replace with your key_secret
    key_secret: process.env.RAZORPAY_SECRET_ID
});

// step 1
exports.creatOrder = async (req, res) => {
    try {
        const { amount, currency, receipt, notes } = req.body;
        await Order.create({
            totalAmount: amount,
            customerId: req.customer.id
        });

        razorpayInstance.orders.create({ amount, currency, receipt, notes },
            (err, order) => {
                if (!err)
                    res.json(order)
                else
                    res.send(err);
            })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

// add address
exports.addAddressInOrder = async (req, res) => {
    try {
        const customerId = req.customer.id;
        const orderId = req.params.id;
        const { id } = req.body; // address id
        const order = await Order.findOne({
            where: { [Op.and]: [{ id: orderId }, { customerId: customerId }] },
        });
        if (!order) {
            return res.status(400).send({ message: "Order is not present!" });
        }
        await order.update({
            ...order,
            addressId: id
        });
        es.status(200).send({ message: "Address added!" })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

// step 3
exports.verifyOrder = async (req, res) => {
    try {
        const customerId = req.customer.id;
        const orderId = req.params.id;
        const { amount, order_id, payment_id } = req.body;
        const razorpay_signature = req.headers['x-razorpay-signature'];
        let hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_ID);
        hmac.update(order_id + "|" + payment_id);
        const generated_signature = hmac.digest('hex');
        if (razorpay_signature === generated_signature) {
            await Payment.create({
                paymentId: payment_id,
                razorpayOrderId: order_id,
                amount: amount,
                paymentStatus: "Captured",
                orderId: orderId
            });
            const shopingBag = await ShopingBag.findAll({
                where: { customerId: customerId },
                include: {
                    model: Product,
                    attributes: ['id', 'name', 'perProductPrice', 'title', 'videoLink', 'details', 'images', 'userId']
                }
            });
            const shopBagId = shopingBag.map((bag) => { return bag.id });
            const order = await findOne({ where: { id: orderId } });
            await order.update({
                ...order,
                orderStatus: "paid"
            });
            for (let i = 0; i < shopingBag.length; i++) {
                await OrderedProduct.create({
                    quantity: shopingBag[i].quantity,
                    productId: shopingBag[i].productId,
                    perProductPrice: shopingBag[i].product.perProductPrice,
                    orderId: orderId
                });
            }
            await ShopingBag.destroy({ where: { id: shopBagId } });
            res.json({ success: true, message: "Payment has been verified" })
        } else {
            res.send({ success: false, message: "Payment verification failed! create new order!" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

// for customer
exports.findAllCustomerOrder = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { customerId: req.customer.id, orderStatus: "paid" },
            include: {
                model: OrderedProduct,
                attributes: ['perProductPrice', 'quantity'],
                include: {
                    model: Product,
                    attributes: ['id', 'name', 'perProductPrice', 'title', 'videoLink', 'details', 'images', 'userId']
                }
            },
            include: {
                model: Address
            }
        });
        res.status(200).send(orders);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

// for user 
exports.findAllUserOrderedProduct = async (req, res) => {
    try {
        const userId = req.user.id;
        const myProducts = await Product.findAll({
            where: { userId: userId },
            attributes: ['id']
        });
        // myProducts = [
        //     {
        //         "id": 2
        //     },
        //     {
        //         "id": 5
        //     }
        // ]
        const productIds = myProducts.map((product) => { return product.id });
        const orderedProducts = await OrderedProduct.findAll({
            where: { productId: productIds },
            include: {
                model: Product,
                attributes: ['id', 'name', 'perProductPrice', 'title', 'videoLink', 'details', 'images', 'userId']
            },
            include: {
                model: Order,
                attributes: [],
                include: {
                    model: Address,
                    attributes: ['sector', 'city', 'state', 'pinCode', 'type']
                },
                include: {
                    model: Customer,
                    attributes: ['name', 'email', 'contactNumber']
                }
            }
        });
        res.status(200).send(orderedProducts);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
