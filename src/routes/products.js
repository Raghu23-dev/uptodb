const express = require('express');
const { Product } = require('../config');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', { products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('An error occurred while fetching products.');
  }
});

router.get('/add', (req, res) => {
  res.render('addProduct');
});

router.post('/add', async (req, res) => {
  const { name, price, description, image, category } = req.body;

  try {
    const newProduct = new Product({ name, price, description, image, category });
    await newProduct.save();
    res.redirect('/products');
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('An error occurred while adding the product.');
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('editProduct', { product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('An error occurred while fetching the product.');
  }
});

router.post('/edit/:id', async (req, res) => {
  const { name, price, description, image, category } = req.body;

  try {
    await Product.findByIdAndUpdate(req.params.id, { name, price, description, image, category });
    res.redirect('/products');
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('An error occurred while updating the product.');
  }
});

router.get('/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('An error occurred while deleting the product.');
  }
});

module.exports = router;
