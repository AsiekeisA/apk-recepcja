const express = require('express');
const { homepage } = require('../actions/api/test');
const router = express.Router();
const testAction = require('../actions/api/test')

router.get('/', testAction.homepage);

module.exports=router;