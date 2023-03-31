const db = require('../../Model');
const Product = db.products;

exports.addProduct = async (req, res) => {
    try {
        const { name, price, title, videoLink, details } = req.body;
        const products = await Product.create({
            name: name,
            price: price,
            title:title,
            details:details,
            videoLink:videoLink,
            userId: req.user.id
        });
        res.status(200).send({ message: `Partner's bank details added successfully! Id : ${products.id}` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.findAllMyProducts = async (req, res) => {
    try {
        const products = await Product.findOne({ where: { userId: req.user.id } });
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.findAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}