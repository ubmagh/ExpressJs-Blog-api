const { validateNewUser, validateUserUpdate } = require('./validation/user')
const usersRepo = require('../repositories/users');

module.exports = {

    createUser( req, res){
        const user = req.body.user;
        let errors  =  validateNewUser(user);
        if( errors.hasErr ){
            res.set('Content-Type', 'application/json');
            res.status(400);
            res.send({"errors" :errors});
        }else
        usersRepo.addUser( user ) .then( user=>{   res.send( user );});
    },

    updateUser( req, res){
        const user = req.body.user;
        const errors = validateUserUpdate(user);
        if ( errors.hasErr ){
            res.set('Content-Type', 'application/json');
            res.status(400);
            res.send({"errors" :errors});
        }else
        usersRepo.updateUser( user ).then( user=>{   res.send( user );});
    },

    destroyUser( req, res){
        const userid = parseInt( req.params.id );
        if( !userid || !Number.isInteger(userid) ){
            res.set('Content-Type', 'application/json');
            res.status(400);
            res.send({"errors" :{hasErr:true}});
        }else
            usersRepo.getUser( userid ).then( user=>{   usersRepo.deleteUser( userid ); res.send( user );});
    }

}