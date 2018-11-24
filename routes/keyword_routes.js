var express = require('express');
var router = express.Router();

var keyword_controller = require('../controllers/keyword_controller');

router.post('/add_keyword', [keyword_controller.saveKeyword]);

module.exports = router;
