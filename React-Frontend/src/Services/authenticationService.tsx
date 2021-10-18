import axios from 'axios';
import { Provider, Subscribe, Container } from "unstated";
import userType from '../Models/userType.interface';


type UserState = {
    user : userType|null,
    logged: boolean,
    token ?: string
}



class AuthenticationContainer extends Container<UserState> {
    
    constructor(props:any) {
        super();
        let token = localStorage.getItem('token')!=null ? localStorage.getItem('token'):undefined;
        this.state = {
            user:null,
            logged: false,
            token: token!
        }
        this.checkToken();
    }

    private login_saveToken(token:string, user: userType){
        this.setState({ logged:true, user: user, token: token});
        localStorage.setItem( 'token', token)
        localStorage.setItem( 'user', JSON.stringify(user));
    }

    /**
     * Checks the current token & updates user object on application re-openning
     */
    async checkToken(){
        if( ! this.state.token ){
            this.logout()
            return
        } 
        await axios.get('auth/user', 
        { 
            headers: { 
                Authorization: "Bearer "+this.state.token
            } 
        }).then( (res:any)=>{
            this.setState({logged:true, user: res.user})
        }).catch(err=>{
            this.logout();
        })
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({ user:null, logged:false, token: undefined});
    }

    login( login :string, password :string) :Promise<string>{
        return axios.post('/auth/login', { creds: { usernameOrEmail: login, password: password } }, { headers: { 'Access-Control-Allow-Origin': '*', } } ).then(( res:any )=>{
            this.login_saveToken(res.data.token, res.data.user);
            return "success";
        }).catch( err=>{
            if(err.status)
                return err.status;
            return "unknown";
        })
    }

    getuser = ()=> this.state.user;
    islogged = () => this.state.logged;
    getToken = ()=> this.state.token;

}

const authContainer= new AuthenticationContainer(null);

// Then we will wrap the provider and subscriber inside of functional
// React components. This simplifies the resuse of the module as we
// will be able to import this module as a depenency without having
// to import Unstated and/or create React Contexts  manually in the
// places that we want to Provide/Subscribe to the API Service.
export const AuthProvider = (props:any) => {
    // We leave the injector flexible, so you can inject a new dependency
    // at any time, eg: snapshot testing
    return <Provider inject={props.inject || [authContainer]}>{props.children}</Provider>;
};


export const AuthSubscribe = (props:any) => {
    // We also leave the subscribe "to" flexible, so you can have full
    // control over your subscripton from outside of the module
    return <Subscribe to={props.to || [authContainer]}>{props.children}</Subscribe>;
};

export default AuthenticationContainer;