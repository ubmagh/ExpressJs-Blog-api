var router = require('express').Router();
const tagsRepo = require('../repositories/tags');
const { createTag, updateTag, destroyTag } = require('../controllers/tagController');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.send(await tagsRepo.getAllTags() )
});
 
router.post('/',async function(req, res, next) {
  await createTag(req, res);
});

router.put('/',async function(req, res, next) {
  await updateTag(req, res);
});

router.get('/:id',async function(req, res, next) {
  res.send( await tagsRepo.getTag( req.params.id) );
});


router.get('/:id/articles',async function(req, res, next) {
    res.send( await tagsRepo.getTagArticles( req.params.id) );
});

router.delete('/:id',async function(req, res, next) {
  await destroyTag( req, res);
});


module.exports = router;