var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/user_controller');

router.post('/login', [user_controller.sign_in]);
router.get('/get_current_user',[user_controller.loginRequired]);

router.post('/signup', [user_controller.register]);

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

// router.get('/logout/:user_id',[user_controller.logOut])

module.exports = router;
