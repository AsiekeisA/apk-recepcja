const express = require('express');
const { homepage } = require('../actions/api/klucze');
const router = express.Router();

const kluczAction = require('../actions/api/klucze')

router.get('/', kluczAction.zapiszKlucz);

module.exports=router;