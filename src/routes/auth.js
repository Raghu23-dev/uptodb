const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../config');
const router = express.Router();

router.get('/login', (req, res) => res.render('login'));
router.get('/signup', (req, res) => res.render('signup'));

router.post('/signup', async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.send('User already exists. Please choose a different username or email.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, username, email, password: hashedPassword });

    await newUser.save();
    res.send('User registered successfully!');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('An error occurred while registering.');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ username }, { email: username }] });

    if (!user) {
      return res.send('User not found. Please register.');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.send('Incorrect password. Please try again.');
    }

    res.render('home'); // Assuming home.ejs is your home page
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('An error occurred while logging in.');
  }
});

module.exports = router;
