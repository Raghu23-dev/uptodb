const express = require('express');
const { Product } = require('../config');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', { products });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.get('/add', (req, res) => {
    res.render('addProduct');
});

router.post('/add', async (req, res) => {
    const { name, price, description, category } = req.body;

    try {
        const newProduct = new Product({
            name,
            price,
            description,
            category
        });

        await newProduct.save();
        res.redirect('/products');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('editProduct', { product });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.post('/edit/:id', async (req, res) => {
    const { name, price, description, category } = req.body;

    try {
        await Product.findByIdAndUpdate(req.params.id, {
            name,
            price,
            description,
            category
        });

        res.redirect('/products');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
