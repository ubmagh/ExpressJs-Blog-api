const usersRepo = require('../../repositories/users');
const [ usernameReg, emailReg ] = [ /^[A-Za-z0-9_.]{3,255}$/g , /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/];


module.exports = {

    async validateNewUser(user){
        let errors = { hasErr: false, username : false, email: false, role: false, password: false };
        // valider l' username 
        if( !user.username )
            errors.username = " Saisissez le pseudo-nom ";
        else{
            if(  (user.username).length<3 || (user.username).length>100 )
                errors.username = " longueure du pseudo-nom est invalide !";
            else{
                if( !(usernameReg.test(user.username)) )
                    errors.username = " le pseudo-nom contient des caractères invalides";
                else{
                    await usersRepo.getUserByUsername(user.username).then( user=>{
                    if(user)
                        errors.username = " Ce pseudo-nom est pri par autre utilisateur ";
                    }) 
                } 
            }
        }
        

        // valider l'email
        if( !user.email )
            errors.email = " Saisissez l'adresse email ";
        else
            if(  !emailReg.test(user.email) )
                errors.email = " l'adresse email est invalide !";
            else{
                await usersRepo.getUserByEmail(user.email).then( user=>{
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

    async validateUserUpdate( user ){
        let errors = { hasErr: false, id: false, username : false, email: false, role: false, password: false };
        
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
                    await usersRepo.getUserByUsername(user.username).then( fuser=>{
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
                await usersRepo.getUserByEmail(user.email).then( fuser=>{
                if( fuser && parseInt(fuser.id)!=parseInt(user.id))
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
        
        errors.hasErr = (Boolean) ( errors.id || errors.username || errors.email || errors.password || errors.role );

        return errors;

    },
    async validateUserCreds( creds ){
        let errors = { hasErr: false, usernameOrEmail : false, password: false };

        // valider l' usernameOrEmail
        if( !creds.usernameOrEmail )
            errors.usernameOrEmail = " Saisissez l'adresse email ou le pseudo-nom";
        else
            if(creds.usernameOrEmail.split('@').length>1){ // email
                if(  !emailReg.test(creds.usernameOrEmail) )
                    errors.usernameOrEmail = " l'adresse email est invalide !";
            }else{ //username
                if(  (creds.usernameOrEmail).length<3 || (creds.usernameOrEmail).length>100 )
                    errors.usernameOrEmail = " longueure du pseudo-nom est invalide !";
                else{
                    if( !( usernameReg.test(creds.usernameOrEmail) ) )
                        errors.usernameOrEmail = " le pseudo-nom contient des caractères invalides";
                }
            }

        // valider le mdp
        if( !creds.password )
            errors.password = " saisissez le mot de passe ! ";
        else
            if( creds.password.length<8 )
                errors.password = " le mot de passe est invalide ";
        
        errors.hasErr = (Boolean) ( errors.id || errors.usernameOrEmail || errors.password );

        return errors;
    },
    async validateRegisterData( user ){
        let errors = { hasErr: false, username : false, email: false, password: false };

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
                    await usersRepo.getUserByUsername(user.username).then( fuser=>{
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
                await usersRepo.getUserByEmail(user.email).then( fuser=>{
                if( fuser && parseInt(fuser)!=parseInt(user.id))
                    errors.email = "Cet adresse email déjà pri par un autre utilisateur ";
                }) 
            }

        // valider le mdp
        if( !user.password )
            errors.password = " saisissez le mot de passe ! ";
        else
            if( user.password.length<8 )
                errors.password = " le mot de passe doit etre de 8 caractères au min ";
        
        errors.hasErr = (Boolean) ( errors.id || errors.username || errors.email || errors.password );

        return errors;
    }

}
