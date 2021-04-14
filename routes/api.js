const express = require('express');
const { homepage } = require('../actions/api/keysActions');
const router = express.Router();

const keysAction = require('../actions/api/keysActions')

router.get('/keys', keysAction.getAllKeys);//wyswietl
router.get('/keys/:id', keysAction.getKey);//wyswietl wybrane
router.post('/keys', keysAction.saveKey);//zapisz
router.put('/keys/:id', keysAction.editKey);//edytuj
router.delete('/keys/:id', keysAction.deleteKey);//usun

module.exports=router;