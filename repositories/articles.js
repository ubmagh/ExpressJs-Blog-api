const { Article } = require('../models')
const { getUser } = require('./users')
const { getCommentsByArticleId } = require('./comments')
const { getArticleTags } = require('./tags')


module.exports = {
    getArticles(offset = 0, limit = 10) { 
        return Article.findAll({  offset: parseInt(offset), limit: parseInt(limit)});
    },
    getAllArticles(){
        return Article.findAll();
    },
    getArticle(id) { 
        return Article.findOne({ where: { id: id } });
    },
    addArticle(article) {
        return Article.create({
            title: article.title,
            content: article.content,
            UserId: article.userid,
        });
    },
    updateArticle( article ) { 
        let articleObj = {...article};
        delete articleObj.id;
        articleObj.updatedAt = new Date();
        return Article.update( articleObj, { where: { id: article.id} });
    },
    deleteArticle(id) { 
        return Article.destroy( { where: { id: id}});
    },
    getArticleUser(id){
        return this.getArticle(id).then( article=> getUser(article.UserId) ) ;
    },
    getArticleComments(id){
        return getCommentsByArticleId(id);
    },
    getArticlesByUserId( userID){
        return Article.findAll({ where:{ UserId:userID } });
    },
    getArticleTags(id){
        return this.getArticle(id).then( article=>getArticleTags(article) )
    }

}
    