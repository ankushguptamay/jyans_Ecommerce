const db = require('../../Model');
const Order = db.order;
const Product = db.products;
const OrderedProduct = db.orderedProduct;
const ShopingBag = db.shopingBag;

exports.order = async (req, res) => {
    try {
        const shopingBag =
        [
            {
                "id": 1,
                "quantity": 2,
                "createdAt": "2023-04-03T13:07:27.000Z",
                "updatedAt": "2023-04-03T13:07:27.000Z",
                "customerId": 1,
                "productId": 1,
                "product": {
                    "name": "soap",
                    "perProductPrice": "50",
                    "title": null,
                    "videoLink": null,
                    "details": null,
                    "userId": 1
                }
            },
            {
                "id": 2,
                "quantity": 1,
                "createdAt": "2023-04-03T13:08:16.000Z",
                "updatedAt": "2023-04-03T13:08:16.000Z",
                "customerId": 1,
                "productId": 2,
                "product": {
                    "name": "tea",
                    "perProductPrice": "500",
                    "title": null,
                    "videoLink": null,
                    "details": null,
                    "userId": 1
                }
            },
            {
                "id": 3,
                "quantity": 3,
                "createdAt": "2023-04-03T13:08:25.000Z",
                "updatedAt": "2023-04-03T13:08:25.000Z",
                "customerId": 1,
                "productId": 3,
                "product": {
                    "name": "mug",
                    "perProductPrice": "150",
                    "title": null,
                    "videoLink": null,
                    "details": null,
                    "userId": 1
                }
            }
        ]
            // req.body.shopingBag
        const amount = "1050"; // req.body.ammount;
        const shopBagId = shopingBag.map((bag) => { return bag.id });
        const order = await Order.create({
            totalAmount: amount,
            customerId: req.customer.id
        });
        const orderId = order.id;
        for (let i = 0; i < shopingBag.length; i++) {
            await OrderedProduct.create({
                quantity: shopingBag[i].quantity,
                productId: shopingBag[i].productId,
                perProductPrice: shopingBag[i].product.perProductPrice,
                orderId: orderId
            });
        }
        await ShopingBag.destroy({ where: { id: shopBagId } });
        res.status(200).send({ message: `Order placed successfully!` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.findAllMyAllOrder = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { customerId: req.customer.id },
            include: {
                model: OrderedProduct,
                attributes: ['perProductPrice', 'quantity'],
                include: {
                    model: Product,
                    attributes: ['name', 'perProductPrice', 'title', 'videoLink', 'details', 'images', 'userId']
                }
            }
        });
        res.status(200).send(orders);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}