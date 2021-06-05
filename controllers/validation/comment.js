const usersRepo = require('../../repositories/users');
const articlesRepo = require('../../repositories/articles');

module.exports = {

    async validateNewComment(comment){
        let errors = { hasErr: false, content : false, userid: false, articleid: false };

        // valider le contenu
        if( !comment.content )
            errors.content = " Saisissez votre commentaire d'abord ! ";
        else
            if(  comment.content.length <5 ) 
                errors.content = " Le Commentaire est trop court! ";

        if( !Number.isInteger(comment.userid) )
            errors.userid = " Utilisateur invalide ! ";
        else
            await usersRepo.getUser(comment.userid).then(user=>{ if(!user) errors.userid = "utilisateur introuvable !";  });
        
        if( !Number.isInteger(comment.articleid) )
            errors.articleid = " numéro d'article invalide ! ";
        else
            await articlesRepo.getArticle(comment.articleid).then(art=>{ if( !art || !art.published ) errors.articleid = "article introuvable !";  });

        errors.hasErr = (Boolean) ( errors.content || errors.userid || errors.articleid ) ;


        return errors;
    },
    
    async validateUpdateComment(comment){
        let errors = { hasErr: false, id:false, content : false, userid: false, articleid: false };

        if( !Number.isInteger(comment.id) )
            errors.id = " l'id du commentaire est invalide !";

        // valider le contenu
        if( !comment.content )
            errors.content = " Saisissez votre commentaire d'abord ! ";
        else
            if(  comment.content.length <5 ) 
                errors.content = " Le Commentaire est trop court! ";

        if( !Number.isInteger(comment.userid) )
            errors.userid = " Utilisateur invalide ! ";
        else
            await usersRepo.getUser(comment.userid).then(user=>{ if(!user) errors.userid = "utilisateur introuvable !";  });
        
        if( !Number.isInteger(comment.articleid) )
            errors.articleid = " numéro d'article invalide ! ";
        else
            await articlesRepo.getArticle(comment.articleid).then(art=>{ if( !art || !art.published ) errors.articleid = "article introuvable !";  });

        errors.hasErr = (Boolean) ( errors.content || errors.userid || errors.articleid ) ;


        return errors;
    },
}
