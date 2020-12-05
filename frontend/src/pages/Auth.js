import React, {Component} from 'react';

import './Auth.css';
import AuthContext from  '../context/auth-context';

class AuthPage extends Component{
    state = {
        isLogin: true
    };

    static contextType = AuthContext;

    constructor(props){
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.isDoctorEl = React.createRef();
    }

    switchModeHandler = () =>{
        this.setState(prevState => {
            return {isLogin: !prevState.isLogin};
        })
    }

    switchModeDoctorHandler = ()=>{
        this.setState(prevState => {
            return {isDoctor: !prevState.isDoctor};
        })
    }

    submitHandler = submit => {
        submit.preventDefault();
        const email = this.emailEl.current.value;
        const password =  this.passwordEl.current.value;
        if(email.trim().length === 0 || password.trim().length === 0){
            return;
        }

        let requestBody = {
            query: `
                query{
                    login(email: "${email}", password: "${password}"){
                        userId
                        isDoctor
                        token
                        tokenExpiration
                    }
                }
            `
        };

        if(!this.state.isLogin){
            const isDoctor = this.isDoctorEl.current.checked;
            requestBody = {
                query: `
                    mutation{
                        createUser(userInput: {email: "${email}", password: "${password}", isDoctor: ${isDoctor}}){
                            _id
                            email
                            password
                            isDoctor
                            token
                        }
                    }
                `
            };
            console.log(JSON.stringify(requestBody));
        }


        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res =>{
            if(res.status !== 200 && res.status !== 201){
                throw new Error('Graphql query Failed!');
            }
            return res.json();
        })
        .then(resData =>{
            if (this.state.isLogin) {
                if(resData.data.login.token){
                    this.context.login(
                        resData.data.login.userId,
                        resData.data.login.isDoctor, 
                        resData.data.login.token, 
                        resData.data.login.tokenExpiration
                    );
                }
            } else {
                if(resData.data.createUser.token){
                    this.context.login(
                        resData.data.createUser.userId,
                        resData.data.createUser.isDoctor, 
                        resData.data.createUser.token, 
                        resData.data.createUser.tokenExpiration
                    );
                }
            }
        })
        .catch(err =>{
            console.log(err);
        });

    };

    render(){
        return (
            <form className="auth-form" onSubmit = {this.submitHandler}>
                <div className= "form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" id = "email" ref = {this.emailEl} />
                </div>
                <div className= "form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id = "password" ref = {this.passwordEl}/>
                </div>
                { this.state.isLogin ?
                null
                : <div className= "form-actions">
                    
                <label htmlFor="isDoctor">Are you a doctor?</label>
                <input type="checkbox" id = "checkbox" ref = {this.isDoctorEl} onClick = {this.switchModeDoctorHandler}/>
            </div>}
                <div className="form-actions">
                    <button type="submit">Submit</button>
                    <button type="button" onClick = {this.switchModeHandler}>
                        {this.state.isLogin ? 'No account yet?' : 'Already have an account?'} Click here to {this.state.isLogin ? 'Signup!' : 'Login!'}
                    </button>
                </div>
            </form>
        );
    }
}

export default AuthPage;