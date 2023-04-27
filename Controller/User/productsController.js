const db = require('../../Model');
const deleteFile = require('../../Util/deleteFile')
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
        res.status(200).send({ message: `Product added successfully! Id : ${products.id}` });
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

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.user.id;
        const productId = req.params.id;
        const product = await Product.findOne({ where: { id: productId, userId: id } });
        if (!product) {
            return res.status(400).send({ message: "Product is not present!" });
        };
        deleteFile.deleteMultiFile(product.images);
        await product.destroy();
        res.status(200).send({
            message: `Product deleted successfully! Id: ${productId}`
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// by this all existing images will replace by coming images
exports.updateProduct = async (req, res) => {
    try {
        let Files = [];
        const id = req.user.id;
        const productId = req.params.id;
        const { name, perProductPrice, title, videoLink, details } = req.body;
        const product = await Product.findOne({ where: { id: productId, userId: id } });
        if (!product) {
            return res.status(400).send({ message: "Product is not present!" });
        };
        if (req.files) {
            deleteFile.deleteMultiFile(product.images);
            Files = (req.files).map((file => { return file.path }));
        }
        await product.update({
            name: name,
            perProductPrice: perProductPrice,
            title: title,
            details: details,
            videoLink: videoLink,
            userId: id,
            images: filePath
        });
        res.status(200).send({ message: `Product modified successfully! ID: ${productId}` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}