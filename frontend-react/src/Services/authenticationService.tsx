import axios from 'axios';
import React  from 'react';
import userType from '../Models/userType.interface';


type MyProps ={
}

type UserState = {
    user : userType|null,
    logged: boolean
}



class AuthenticationService extends React.Component<MyProps,UserState> {

    state :UserState = {
        user:null,
        logged: false
    }
    private token :string|null=null;
    
    constructor(props:any) {
        super(props);
        this.token = localStorage.getItem('token');
        this.checkToken();
    }

    login_saveToken(token:string, user: userType){
        this.setState({ logged:true, user: user});
        this.token = token;
        localStorage.setItem( 'token', token)
        localStorage.setItem( 'user', JSON.stringify(user));
    }

    /**
     * Checks the current token & updates user object on application re-openning
     */
    async checkToken(){
        if( ! this.token ){
            this.logout()
            return
        } 
        await axios.get('auth/user', 
        { 
            headers: { 
                Authorization: "Bearer "+this.token
            } 
        }).then( (res:any)=>{
            this.setState({logged:true, user: res.user})
        }).catch(err=>{
            this.logout();
            this.token = null;
        })
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({ user:null, logged:false});
    }

    getuser = ()=>this.state.user;
    islogged = () =>this.state.logged;
    getToken = ()=>this.token;

}

export default AuthenticationService;