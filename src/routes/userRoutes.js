const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { addUserToDb, getAllUsers } = require('../model/userModel');
const { validateUser, validateToken } = require('../middleware');

const userRoute = express.Router();

userRoute.get('/', (req, res) => {
  res.send('Route');
});

userRoute.get('/users', validateToken, async (req, res) => {
  try {
    const allBooksArr = await getAllUsers();
    res.json(allBooksArr);
    console.log('allBooksArr===', allBooksArr);
  } catch (error) {
    res.sendStatus(500);
  }
});

userRoute.post('/register', validateUser, async (req, res) => {
  const { email, password } = req.body;
  const plainTextPassword = password;
  //   const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(plainTextPassword, 10);
  //   console.log('salt===', salt);
  console.log('hashedPassword===', hashedPassword);

  const newUser = {
    email,
    password: hashedPassword,
  };

  // kviesti modelio funkcija kuri sukuria vartotoja
  const insertResult = await addUserToDb(newUser.email, newUser.password);
  console.log('insertResult===', insertResult);

  if (insertResult === false) {
    res.status(500).json('something wrong');
    return;
  }
  res.status(201).json('Vartotojas sukurtas');
});

module.exports = userRoute;
