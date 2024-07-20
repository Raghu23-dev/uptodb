const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/Login-tut';

// Connect to MongoDB
mongoose.connect(url)
  .then(() => console.log('Database Connected Successfully'))
  .catch(err => console.error('Database connection error:', err.message));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Added image field
  category: { type: String, required: true } // Added category field
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { User, Product };
