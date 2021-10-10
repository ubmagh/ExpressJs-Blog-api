const commentsRepo = require('../repositories/comments');
const { validateNewComment, validateUpdateComment } = require('./validation/comment')

module.exports = {

    async createComment( req, res){
        const comment = req.body.comment;
        let errors  =  await validateNewComment(comment);
        if( errors.hasErr ){
            res.set('Content-Type', 'application/json');
            res.status(400);
            res.send({"errors" :errors});
        }else
        await commentsRepo.addComment( comment ) .then( cmt=>{   res.send( cmt );});
    },

    async updateComment( req, res){
        const comment = req.body.comment;
        const errors = await validateUpdateComment(comment);
        if ( errors.hasErr ){
            res.set('Content-Type', 'application/json');
            res.status(400);
            res.send({"errors" :errors});
        }else
        await commentsRepo.updateComment( comment ).then( cmt=>{   res.send( cmt );});
    },

    async destroyComment( req, res){
        const commentid = parseInt( req.params.id );
        if( !commentid || !Number.isInteger(commentid) ){
            res.set('Content-Type', 'application/json');
            res.status(400);
            res.send({"errors" :{hasErr:true}});
        }else
        await commentsRepo.getComment( commentid ).then( cmt=>{ if(cmt){ commentsRepo.deleteComment( cmt.id ); res.send( cmt );} else { res.send(null); } });
    }

}