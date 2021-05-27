var router = require('express').Router();
const usersRepo = require('../repositories/users');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.send(await usersRepo.getUsers( req.query.offset, req.query.limit))
});
 
router.post('/',async function(req, res, next) {
  res.send( await usersRepo.addUser( req.body.user ) );
});

router.put('/',async function(req, res, next) {
  res.send( await usersRepo.updateUser( req.body.user ) );
});

router.get('/admins',async function(req, res, next) {
  res.send( await usersRepo.getAdmins() );
});

router.get('/authors',async function(req, res, next) {
  res.send( await usersRepo.getAuthors() );
});

router.get('/guests',async function(req, res, next) {
  res.send( await usersRepo.getGuests() );
});

router.get('/:id',async function(req, res, next) {
  res.send( await usersRepo.getUser( req.params.id) );
});

router.delete('/:id',async function(req, res, next) {
  res.send( await usersRepo.deleteUser( req.bo ) );
});


module.exports = router;