const articlesRepo = require('../repositories/articles');
const { validateNewArticle, validateUpdateArticle } = require('./validation/article')

module.exports = {

    async createArticle( req, res){
        const article = req.body.article;
        let errors  = await validateNewArticle(article);
        if( errors.hasErr ){
            res.set('Content-Type', 'application/json');
            res.status(400);
            res.send({"errors" :errors});
        }else
        await articlesRepo.addArticle( article ).then( Art=>{   res.send( Art );});
    },

    async updateArticle( req, res){
        const article = req.body.article;
        const errors = await validateUpdateArticle(article);
        if ( errors.hasErr ){
            res.set('Content-Type', 'application/json');
            res.status(400);
            res.send({"errors" :errors});
        }else
        await articlesRepo.updateArticle( article ).then( Art=> res.send( Art ) );
    },

    async destroyArticle( req, res){
        const articleid = parseInt( req.params.id );
        if( !articleid || !Number.isInteger(articleid) ){
            res.set('Content-Type', 'application/json');
            res.status(400);
            res.send({"errors" :{hasErr:true}});
        }else
        await articlesRepo.getArticle( articleid ).then( art=>{  if(art){articlesRepo.deleteArticle( art.id ); res.send( art );}else{ res.send(null); } });
    }

}