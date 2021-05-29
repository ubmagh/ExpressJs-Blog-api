const { User } = require('../models')


module.exports = {
    getAllUsers() {
        return User.findAll();
    },
    
    // méthodes à implémenter
    getUsers(offset = 0, limit = 10) { 
        return User.findAll({  offset: parseInt(offset), limit: parseInt(limit)});
    },
    getAdmins() { 
        return User.findAll({ where:{ role:"admin" } });
    },
    getAuthors() {
        return User.findAll({ where:{ role:"author" } });
    },  
    getGuests(){ 
        return User.findAll({ where:{ role:"guest" } });
    },
    getUser(id) { 
        return User.findOne({ where: { id: id } });
    },
    getUserByEmail(email) { 
        return User.findOne({ where: { email: email } });
    },
    addUser(user) {
        return User.create({
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role
        });
    },
    updateUser( user ) { 
        const userObject = {...user};
        delete userObject.id;
        User.update( userObject, { where: { id: user.id} });// l'option returning marche seulement avec postgres mais pas avec mysql :(
        return user;
    },
    deleteUser(id) { 
        return User.destroy( { where: { id: id}});
    },

    // D'autres méthodes jugées utiles
    numberOfUsers(){ // Pour faire la pagination
        return   User.count({}) ;
    },
    getUserByUsername(username){
        return User.findOne({ where: { username: username } });
    }
}
    