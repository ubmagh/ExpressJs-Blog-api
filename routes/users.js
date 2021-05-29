var router = require('express').Router();
const usersRepo = require('../repositories/users');
const { createUser, updateUser, destroyUser } = require('../controllers/userController');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.send(await usersRepo.getUsers( req.query.offset, req.query.limit))
});
 
router.post('/',async function(req, res, next) {
  await createUser(req, res);
});

router.put('/',async function(req, res, next) {
  await updateUser(req, res);
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

router.get('/count',async function(req, res, next) {
  res.send( { num: await usersRepo.numberOfUsers() } );
});

router.get('/:id',async function(req, res, next) {
  res.send( await usersRepo.getUser( req.params.id) );
});

router.delete('/:id',async function(req, res, next) {
  await destroyUser( req, res);
});


module.exports = router;