var router = require('express').Router();
const { login, register } = require('../controllers/AuthenticationController');

/*
router.get('/', function(req, res, next) {

});
*/

router.post('/login',function(req, res, next) {
  login(req, res);
});

router.post('/register', async function(req, res, next) {
  register(req, res);
});

module.exports = router;