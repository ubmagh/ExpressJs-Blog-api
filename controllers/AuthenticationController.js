const usersRepo = require('../repositories/users');
const { validateUserCreds, validateRegisterData } = require('./validation/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const token_Key = "process.env.TOKEN_KEY/HeHe/";


module.exports = {

    async login( req, res){
        const creds = req.body.creds;
        if(!creds)
            return res.status(400).json({status: "credsDataRequired" })
        let errors  =  await validateUserCreds(creds);
        if(errors.hasErr)
            return res.status(400).json( {status: "invalideData", errors: errors} )

        const usernameOrEmail = creds.usernameOrEmail, password = creds.password ;
        
        let user = null;
        if( usernameOrEmail.search('@')>-1 )
            user = await usersRepo.getUserByEmail(usernameOrEmail)
        else
            user = await usersRepo.getUserByUsername(usernameOrEmail)
        if (user && (bcrypt.compare( password, user.password))){
            user.token = jwt.sign(
                { user_id: user.id, email: user.email },
                token_Key,
                {
                    expiresIn: "2h",
                }
            );
            user.save().then( async (updatedUser)=>{
                updatedUser.password=undefined;
                return res.status(201).json(updatedUser);
            })
        }else
        return res.status(400).json({ status: "invalidCredentiels"});
    },

    async register( req, res){
        const data = req.body.user;
        if(!data)
            return res.status(400).json({status: "userDataRequired" })
        let errors = await validateRegisterData(data);
        if(errors.hasErr)
            return res.status(400).json( {status: "invalideData", errors: errors} )
        let user = {
            username: data.username,
            email: data.email.toLowerCase(),
            password: await bcrypt.hash(data.password, 7),
            role: 'guest'
        }
        usersRepo.addUser(user).then( async(createdUser)=>{
            createdUser.token = jwt.sign(
                { user_id: user.id, email: user.email },
                token_Key,
                {
                    expiresIn: "2h",
                }
            )
            createdUser.save().then( async (updatedUser)=>{
                updatedUser.password=undefined;
                return res.status(201).json(updatedUser);
            })
        });
    },  

    async getUser( req, res){
        const token = (req.get('Authorization')+'' ).split(' ').pop()
        if( !token || token.length==0)
            return res.status(402).json({ "err": "Invalide Credentiels"});
        const claims = jwt.verify(token,token_Key);
        if( !claims)
            return res.status(402).json({ "err": "Invalide Credentiels"});
        const user = await usersRepo.getUser(claims.id)
        return res.json({ "user": JSON.stringify(user) });
    } 

    

}