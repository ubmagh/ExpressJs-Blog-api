const usersRepo = require('../../repositories/users');

module.exports = {

    async validateNewUser(user){
        let errors = { hasErr: false, username : false, email: false, role: false, password: false };
        const [ usernameReg, emailReg ] = [ /^[A-Za-z0-9_.]{3,255}$/g, /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/];
        // valider l' username 
        if( !user.username )
            errors.username = " Saisissez le pseudo-nom ";
        else
            if(  (user.username).length<3 || (user.username).length>100 )
                errors.username = " longueure du pseudo-nom est invalide !";
            else
                if( !usernameReg.test(user.username) )
                    errors.username = " le pseudo-nom contient des caractères invalides";
                else{
                    usersRepo.getUserByUsername(user.username).then( user=>{
                    if(user)
                        errors.username = " Ce pseudo-nom est pri par autre utilisateur ";
                    }) 
                } 
        

        // valider l'email
        if( !user.email )
            errors.email = " Saisissez l'adresse email ";
        else
            if(  !emailReg.test(user.email) )
                errors.email = " l'adresse email est invalide !";
            else{
                usersRepo.getUserByEmail(user.email).then( user=>{
                if(user)
                    errors.email = "Cet adresse email déjà pri par un autre utilisateur ";
                }) 
            }

        // valider le role : 
        if( !user.role )
            errors.role = " Choisissez le role ";
        else
            if( !( [ 'guest', 'admin', 'author'].find( elem=> elem==user.role ) ) )
                    errors.role = " Choisissez le role parmi la liste ";

        // valider le mdp
        if( !user.password )
            errors.password = " saisissez le mot de passe ! ";
        else
            if( user.password.length<8 )
                errors.password = " le mot de passe doit etre de 8 caractères au min ";
        
        if( errors.username || errors.email || errors.password || errors.role )
            errors.hasErr = true;

        return errors;
    },

    validateUserUpdate( user ){
        let errors = { hasErr: false, id: false, username : false, email: false, role: false, password: false };
        const [ usernameReg, emailReg ] = [ /^[A-Za-z0-9_.]{3,255}$/g, /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/];
        
        // id
        if( !user.id || !Number.isInteger(user.id) )
            errors.id = " Données invalides ! ";
        
        // valider l' username 
        if( !user.username )
            errors.username = " Saisissez le pseudo-nom ";
        else
            if(  (user.username).length<3 || (user.username).length>100 )
                errors.username = " longueure du pseudo-nom est invalide !";
            else
                if( !usernameReg.test(user.username) )
                    errors.username = " le pseudo-nom contient des caractères invalides";
                else{
                    usersRepo.getUserByUsername(user.username).then( fuser=>{
                    if( fuser && parseInt(fuser.id)!=parseInt(user.id) )
                        errors.username = " Ce pseudo-nom est pri par autre utilisateur ";
                    }) 
                } 
        

        // valider l'email
        if( !user.email )
            errors.email = " Saisissez l'adresse email ";
        else
            if(  !emailReg.test(user.email) )
                errors.email = " l'adresse email est invalide !";
            else{
                usersRepo.getUserByEmail(user.email).then( fuser=>{
                if( fuser && parseInt(fuser)!=parseInt(user.id))
                    errors.email = "Cet adresse email déjà pri par un autre utilisateur ";
                }) 
            }

        // valider le role : 
        if( !user.role )
            errors.role = " Choisissez le role ";
        else
            if( !( [ 'guest', 'admin', 'author'].find( elem=> elem==user.role ) ) )
                    errors.role = " Choisissez le role parmi la liste ";

        // valider le mdp
        if( !user.password )
            errors.password = " saisissez le mot de passe ! ";
        else
            if( user.password.length<8 )
                errors.password = " le mot de passe doit etre de 8 caractères au min ";
        
        if( errors.id || errors.username || errors.email || errors.password || errors.role )
            errors.hasErr = true;

        return errors;

    }
}
