const db = require('../../Model');
const ShopingBag = db.shopingBag;
const Product = db.products;

exports.addProductInShopingBag = async (req, res) => {
    try {
        const { quantity, productId } = req.body;
        const shopingBag = await ShopingBag.create({
            quantity: quantity,
            productId: productId,
            customerId: req.customer.id
        });
        res.status(200).send({ message: `Product added in shoping bag successfully! Id : ${shopingBag.id}` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.findAllMyProductInShopingBag = async (req, res) => {
    try {
        const shopingBag = await ShopingBag.findAll({
            where: { customerId: req.customer.id },
            include: {
                model: Product,
                attributes: ['id', 'name', 'perProductPrice', 'title', 'videoLink', 'details', 'images', 'userId']
            }
        });
        res.status(200).send(shopingBag);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteProductInShopingBag = async (req, res) => {
    try {
        const id = req.customer.id;
        const shopingBagId = req.params.id;
        const shopingBag = await ShopingBag.findOne({ where: { [Op.and]: [{ id: shopingBagId }, { customerId: id }] } });
        if (!shopingBag) { return res.send({ message: "Shoping Bag is not present!" }) }
        await shopingBag.delete();
        res.status(200).send({ message: `Shoping Bag deleted successfully! ID: ${shopingBagId}` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}