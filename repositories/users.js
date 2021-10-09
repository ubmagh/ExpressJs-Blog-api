const { User } = require('../models');

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
    getUserByUsername(username) { 
        return User.findOne({ where: { username: username } });
    },
    getUserByToken(token) { 
        return User.findOne({ where: { token: token } });
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
        const userID = user.id;
        delete user.id;
        user.updatedAt = new Date();
        return User.update( user, { where: { id: userID} }).then(rA=>{ // l'option returning est utilisable seulement avec postgres mais pas avec mysql :(
            if(rA==1)
                return User.findOne({ where: {id: userID} }).then( usr=>Promise.resolve(usr))
            return Promise.resolve(null);
        });
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
    },
    GetUserArticles(id){
        return this.getUser(id).then( user=> user.getArticles() ) ;
    },
    GetUserComments(id){
        return User.findOne({ where:{ id: id } }).then( user => user.getComments() ) ;
    }
}
    