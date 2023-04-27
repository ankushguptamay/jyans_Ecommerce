const db = require('../../Model');
const { Op } = require("sequelize");
const WishList = db.wishList;
const Product = db.products;
const ShopingBag = db.shopingBag;

// This controller for home page
exports.addProductInWishListByHomePage = async (req, res) => {
    try {
        const customerId = req.customer.id;
        const productId = req.params.id;
        const isWishList = await WishList.findOne({ where: { [Op.and]: [{ productId: productId }, { customerId: customerId }] } });
        if (isWishList) {
            return res.status(400).send({ message: "Thanks to love it! Allready added!" });
        }
        const wishList = await WishList.create({
            productId: productId,
            customerId: customerId
        });
        res.status(200).send({ message: `Product added in wish list successfully! Id : ${wishList.id}` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

// This controller for shoping bag. When a product moves to wish list from shoping bag then that product will delete from shoping bag and add to wish list.
exports.moveProductToWishListFromShopingBag = async (req, res) => {
    try {
        const customerId = req.customer.id;
        const shopingBagId = req.params.id;
        const shopingBag = await ShopingBag.findOne({ where: { [Op.and]: [{ id: shopingBagId }, { customerId: customerId }] } });
        if (shopingBag) {
            const wishList = await WishList.findOne({
                where: { [Op.and]: [{ productId: shopingBag.productId }, { customerId: customerId }] }
            });
            if (wishList) {
                return res.status(400).send({ message: "Thanks to love it! Allready present!" });
            } else {
                const wishList = await WishList.create({
                    productId: shopingBag.productId,
                    customerId: customerId
                });
                await ShopingBag.destroy({ where: { productId: shopingBag.productId } }); // delete product from shoping bag
                res.status(200).send({ message: `Product added in wish list successfully! Id : ${wishList.id}` });
            }
        } else {
            res.status(400).send({ message: `Shoping Bag is not present!` });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.findAllMyProductInWishList = async (req, res) => {
    try {
        const wishList = await WishList.findAll({
            where: { customerId: req.customer.id },
            include: {
                model: Product,
                attributes: ['id', 'name', 'perProductPrice', 'title', 'videoLink', 'details', 'images', 'userId']
            }
        });
        res.status(200).send(wishList);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.destroyProductInWishList = async (req, res) => {
    try {
        const wishListId = req.params.id;
        const wishList = await WishList.findOne({
            where: {
                [Op.and]: [{ id: wishListId }, { customerId: req.customer.id }]
            }
        });
        if (!wishList) {
            return res.status(400).send({ message: "This wish list product is not present!" });
        }
        await wishList.destroy();
        res.status(200).send({
            message: `Product deleted successfully from wish list! Id: ${wishListId}`
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
// Move Product to shopingBag from wishList 
exports.moveProductToShopingBagFromWishList = async (req, res) => {
    try {
        const customerId = req.customer.id;
        const wishListId = req.params.id;
        const wishList = await WishList.findOne({
            where: { [Op.and]: [{ id: wishListId }, { customerId: customerId }] },
            attributes: ['productId']
        });
        if (wishList.productId) {
            const shopingBag = await ShopingBag.findOne({
                where: { [Op.and]: [{ productId: wishList.productId }, { customerId: customerId }] }
            });
            if (shopingBag) {
                return res.status(400).send({ message: "Thanks to love it! Allready present!" });
            } else {
                const shopingBag = await ShopingBag.create({
                    productId: wishList.productId,
                    customerId: customerId
                });
                await wishList.destroy();
                res.status(200).send({ message: `Product added in shoping bag successfully! Id : ${shopingBag.id}` });
            }
        } else {
            res.status(400).send({ message: `Wish list is not present!` });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}