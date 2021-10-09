var router = require('express').Router();
const { login, register, getUser } = require('../controllers/AuthenticationController');


router.get('/user', function(req, res, next) {
  getUser(req, res);
});


router.post('/login',function(req, res, next) {
  login(req, res);
});

router.post('/register', async function(req, res, next) {
  register(req, res);
});

module.exports = router;