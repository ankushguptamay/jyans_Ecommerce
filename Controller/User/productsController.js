const db = require('../../Model');
const Product = db.products;

exports.addProduct = async (req, res) => {
    try {
        if (req.files.length <= 0) {
            return res.send(`You must select at least 1 file.`);
        }
        const filePath = (req.files).map((file => { return file.path }))
        const { name, perProductPrice, title, videoLink, details } = req.body;
        const products = await Product.create({
            name: name,
            perProductPrice: perProductPrice,
            title: title,
            details: details,
            videoLink: videoLink,
            userId: req.user.id,
            images: filePath
        });
        res.status(200).send({ message: `Partner's bank details added successfully! Id : ${products.id}` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.findAllMyProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ where: { userId: req.user.id } });
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