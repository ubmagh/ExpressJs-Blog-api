var router = require('express').Router();
const commentsRepo = require('../repositories/comments');
const { createComment, updateComment, destroyComment } = require('../controllers/commentController');

router.get('/', async function(req, res, next) {
  res.send(await commentsRepo.getAllComments() )
});
 
router.post('/',async function(req, res, next) {
  await createComment(req, res);
});

router.put('/',async function(req, res, next) {
  await updateComment(req, res);
});

router.get('/:id',async function(req, res, next) {
  res.send( await commentsRepo.getComment( req.params.id) );
});

router.get('/:id/user',async function(req, res, next) {
    res.send( await commentsRepo.getCommentUser( req.params.id) );
});

router.get('/:id/article',async function(req, res, next) {
    res.send( await commentsRepo.getCommentArticle( req.params.id) );
});

router.delete('/:id',async function(req, res, next) {
  await destroyComment( req, res);
});


module.exports = router;