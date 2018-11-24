var express = require('express');
var router = express.Router();
const config = require('../config.js');
let middleware = require('../middleware');

var keyword_controller = require('../controllers/keyword_controller');

// router.use(function(req, res, next) {
//
//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//   // decode token
//   if (token) {
//
//     // verifies secret and checks exp
//     jwt.verify(token, config.secret, function(err, decoded) {       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//
//   } else {
//
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//         success: false,
//         message: 'No token provided.'
//     });
//
//   }
// });

router.post('/add_keyword', [middleware.checkToken,keyword_controller.saveKeyword]);

module.exports = router;
