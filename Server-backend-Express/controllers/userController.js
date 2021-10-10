const { validateNewUser, validateUserUpdate } = require('./validation/user')
const usersRepo = require('../repositories/users');

module.exports = {

    async createUser( req, res){
        const user = req.body.user;
        let errors  = await validateNewUser(user);
        if( errors.hasErr ){
            res.set('Content-Type', 'application/json');
            res.status(400);
            res.send({"errors" :errors});
        }else
        await usersRepo.addUser( user ) .then( user=>{   res.send( user );});
    },

    async updateUser( req, res){
        const user = req.body.user;
        const errors = await validateUserUpdate(user);
        if ( errors.hasErr ){
            res.set('Content-Type', 'application/json');
            res.status(400);
            res.send({"errors" :errors});
        }else
        await usersRepo.updateUser( user ).then( user=>{   res.send( user );});
    },

    async destroyUser( req, res){
        const userid = parseInt( req.params.id );
        if( !userid || !Number.isInteger(userid) ){
            res.set('Content-Type', 'application/json');
            res.status(400);
            res.send({"errors" :{hasErr:true}});
        }else
        await usersRepo.getUser( userid ).then( user=>{  if(user){ usersRepo.deleteUser( userid ); res.send( user );}else{ res.send(null) }});
    }

}