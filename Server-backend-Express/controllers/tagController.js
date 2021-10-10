const tagsRepo = require('../repositories/tags');
const { validateNewTag,validateTagUpdate } = require('./validation/tag')

module.exports = {

    async createTag( req, res){
        const tag = req.body.tag;
        let errors  = await validateNewTag(tag);
        if( errors.hasErr ){
            res.set('Content-Type', 'application/json');
            res.status(400);
            res.send({"errors" :errors});
        }else
        await tagsRepo.addTag( tag ) .then( cmt=>{   res.send( cmt );});
    },

    async updateTag( req, res){
        const tag = req.body.tag;
        const errors = await validateTagUpdate(tag);
        if ( errors.hasErr ){
            res.set('Content-Type', 'application/json');
            res.status(400);
            res.send({"errors" :errors});
        }else
        await tagsRepo.updateTag( tag ).then( tg=>{   res.send( tg );});
    },

    async destroyTag( req, res){
        const tagid = parseInt( req.params.id );
        if( !tagid || !Number.isInteger(tagid) ){
            res.set('Content-Type', 'application/json');
            res.status(400);
            res.send({"errors" :{hasErr:true}});
        }else
        await tagsRepo.getTag( tagid ).then( tg=>{   if(tg){ tagsRepo.deleteTag( tg.id ); res.send( tg );} else{res.send(null)} });
    }

}