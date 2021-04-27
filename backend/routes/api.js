const express = require('express');
const { homepage } = require('../actions/api/keysActions');
const router = express.Router();

const usersAction = require('../actions/api/usersActions')
const keysAction = require('../actions/api/keysActions')

router.get('/keys', keysAction.getAllKeys);//wyswietl
router.get('/keys/:id', keysAction.getKey);//wyswietl wybrane
router.post('/keys', keysAction.saveKey);//zapisz
router.put('/keys/:id', keysAction.updateKey);//edytuj
router.delete('/keys/:id', keysAction.deleteKey);//usun

router.get('/users', usersAction.getAllUsers);//wyswietl
router.get('/users/:id', usersAction.getUser);//wyswietl wybrane
router.post('/users', usersAction.saveUser);//zapisz
router.put('/users/:id', usersAction.updateUser);//edytuj
router.delete('/users/:id', usersAction.deleteUser);//usun

module.exports=router;