const usersRepo = require('../../repositories/users');
const articlesRepo = require('../../repositories/articles');
const tagsRepo = require('../../repositories/tags');
const ImageUrlReg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

module.exports = {

    async validateNewArticle(article){
        let errors = { hasErr: false, title : false, content : false, image:false, tags:false, userid: false };

        //validate userid 
        if( !Number.isInteger(article.userid) )
            errors.userid = " Utilisateur invalide ! ";
        else
            await usersRepo.getUser(article.userid).then(user=>{ if(!user) errors.userid = "utilisateur introuvable !";  });

        // validate image url
        if(!article.image)
            errors.image = " Saisissez l'url de l'image de l'article ";
        else
            if( !ImageUrlReg.test(article.image) )
                errors.image = " L'url de l'image est invalide ! ";

        // valider le titre 
        if( !article.title )
            errors.title = " Saisissez le titre de l'article ";
        else
            if(  (article.title).length<3 || (article.title).length>200 )
                errors.title = " longueure du titre est invalide !";
            else{
                await articlesRepo.getArticleByTitle(article.title).then( art=>{ if( art&&art.id ) errors.title = " Ce titre est déjà enregistré !"; })
            }
        

        // valider le contenu
        if( !article.content )
            errors.content = " Saisissez le contenu de l'article ";
        else
            if(  article.content.length <5 ) 
                errors.content = " Le contenu de l'article est trop court! ";

        // validate tags
        if( article.tags && Array.isArray( article.tags ) ) {
            await tagsRepo.checkTags(article.tags).then( num =>{ if( num != article.tags.length) errors.tags=  " un ou plusieurs tags sont invalides ! "; });
        }else
            delete article.tags;
        
        errors.hasErr = (Boolean) (errors.title || errors.content || errors.userid || errors.image || errors.tags)  ;


        return errors;
    },
    async validateUpdateArticle(article){
        let errors = { hasErr: false, title : false, content : false, image:false, tags:false, userid: false };

        //validate userid 
        if( !Number.isInteger(article.userid) )
            errors.userid = " Utilisateur invalide ! ";
        else
            await usersRepo.getUser(article.userid).then(user=>{ if(!user) errors.userid = "utilisateur introuvable !";  });

        // validate image url
        if(!article.image)
            errors.image = " Saisissez l'url de l'image de l'article ";
        else
            if( !ImageUrlReg.test(article.image) )
                errors.image = " L'url de l'image est invalide ! ";

        // valider le titre 
        if( !article.title )
            errors.title = " Saisissez le titre de l'article ";
        else
            if(  (article.title).length<3 || (article.title).length>200 )
                errors.title = " longueure du titre est invalide !";
            else{
                await articlesRepo.getArticleByTitle(article.title).then( art=>{ if( art&& art.id!=article.id ) errors.title = " Ce titre est déjà enregistré !"; })
            }
        

        // valider le contenu
        if( !article.content )
            errors.content = " Saisissez le contenu de l'article ";
        else
            if(  article.content.length <5 ) 
                errors.content = " Le contenu de l'article est trop court! ";

        // validate tags
        if( article.tags && Array.isArray( article.tags ) ) {
            await tagsRepo.checkTags(article.tags).then( num =>{ if( num != article.tags.length) errors.tags=  " un ou plusieurs tags sont invalides ! "; });
        }else
            delete article.tags;
        
        errors.hasErr = (Boolean) (errors.title || errors.content || errors.userid || errors.image || errors.tags)  ;


        return errors;
    },
}
