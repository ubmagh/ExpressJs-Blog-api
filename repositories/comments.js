const { Comment, sequelize } = require('../models')
const { getUser } = require('./users');
const { getArticle } = require('./articles');
const { QueryTypes } = require('sequelize');


module.exports = {
    getAllComments() {
        return sequelize.query(" SELECT articles.*, count(comments.ArticleId) as nbrComments from articles, comments where articles.id = comments.ArticleId GROUP BY comments.ArticleId", { mapToModel: true,type: QueryTypes.SELECT  });
    },
    getComment(id) { 
        return Comment.findOne({ where: { id: id } });
    },
    addComment(comment) {
        const date = new Date();
        return Comment.create({
            content: comment.content,
            ArticleId: comment.articleId,
            UserId: comment.userId,
            createdAt: date,
            updatedAt : date
        });
    },
    updateComment( comment ) { 
        let cmntObject = {...comment};
        delete cmntObject.id;
        cmntObject.updatedAt = new Date();
        return Comment.update( cmntObject, { where: { id: comment.id} });// l'option returning marche seulement avec postgres mais pas avec mysql :(
    },
    deleteComment(id) { 
        return Comment.destroy( { where: { id: id}});
    },
    getCommentUser(id){
        return this.getComment(id).then( comment=> getUser(comment.UserId) );
    },
    getCommentArticle(id){
        return this.getComment(id).then( comment=> getArticle(comment.UserId) );
    },
    getCommentsByUserId(userID){
        return Comment.findAll({ where:{ UserId:userID } });
    },
    getCommentsByArticleId( articleid){
        return Comment.findAll({ where: { ArticleId: articleid} });
    }

}
    