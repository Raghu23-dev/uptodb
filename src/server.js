const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => res.render('home')); // Assume home.ejs is your home page

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
