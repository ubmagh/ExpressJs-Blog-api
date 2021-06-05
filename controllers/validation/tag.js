const tagsRepo = require('../../repositories/tags');

module.exports = {

    async validateNewTag(tag){
        let errors = { hasErr: false, name : false };

        // valider le contenu
        if( !tag.name )
            errors.name = " Saisissez votre le nom du tag d'abord ! ";
        else
            if(  tag.name.length <5 ) 
                errors.name = " Le nom du tag est trop court! ";
            else{
                await tagsRepo.getTagByName(tag.name).then( tg=>{ if( tg ) errors.name = " Ce nom de tag est déjà enregistré !"; })
            }
        
        errors.hasErr = (Boolean) (errors.name)  ;

        return errors;
    },

    async validateTagUpdate( tag ){        
        let errors = { hasErr: false, id: false, name : false };

        if( !Number.isInteger(tag.id) )
            errors.id = " l'id du tag est invalide ! ";

        // valider le contenu
        if( !tag.name )
            errors.name = " Saisissez votre le nom du tag d'abord ! ";
        else
            if(  tag.name.length <5 ) 
                errors.name = " Le nom du tag est trop court! ";
            else{
                await tagsRepo.getTagByName(tag.name).then( tg=>{ 
                    if( tg && tg.id!=tag.id ) 
                        errors.name = " Ce nom de tag est déjà enregistré !"; 
                })
            }
        
        errors.hasErr = (Boolean) (errors.name || errors.id )  ;

        return errors;
    }
}
