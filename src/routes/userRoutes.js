const express = require('express');
const bcrypt = require('bcryptjs');
const { validateUser } = require('../middleware');
const { addUserToDb } = require('../model/userModel');

const userRoute = express.Router();

userRoute.post('/register', validateUser, async (req, res) => {
  // gauti vartotojo email ir password ir irasyti i users
  try {
    const { email, password } = req.body;
    const plainTextPassword = password;

    const hashedPassword = bcrypt.hashSync(plainTextPassword, 10);
    console.log('hashedPassword ===', hashedPassword);

    const newUser = {
      email,
      password: hashedPassword,
    };
    // kviesti modelio funkcija kuri sukuria varototoja
    const insertResult = await addUserToDb(newUser.email, newUser.password);
    console.log('insertResult ===', insertResult);

    if (insertResult === false) {
      res.status(500).json('something wrong');
      return;
    }

    res.status(201).json('vartotojas sukurtas');
  } catch (error) {
    console.log(error);
    res.status(500).json('nepavyko sukurti vartotojo');
  }
});

module.exports = userRoute;
