var router = require('express').Router();
const articlesRepo = require('../repositories/articles');
const { createArticle, updateArticle, destroyArticle } = require('../controllers/articleController');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.send(await articlesRepo.getArticles( req.query.offset, req.query.limit))
});
 
router.post('/',async function(req, res, next) {
  await createArticle(req, res);
});

router.put('/',async function(req, res, next) {
  await updateArticle(req, res);
});

router.get('/count',async function(req, res, next) {
  res.send( { num: await articlesRepo.numberOfArticles() } );
});

router.get('/:id',async function(req, res, next) {
  res.send( await articlesRepo.getArticle( req.params.id).then( res=> res) );
});

router.get('/:id/user',async function(req, res, next) {
    res.send( await articlesRepo.getArticleUser( req.params.id) );
});

router.get('/:id/comments',async function(req, res, next) {
    res.send( await articlesRepo.getArticleComments( req.params.id) );
});

router.get('/:id/tags',async function(req, res, next) {
    res.send( await articlesRepo.getArticleTags( req.params.id) );
});

router.delete('/:id',async function(req, res, next) {
  await destroyArticle( req, res);
});


module.exports = router;