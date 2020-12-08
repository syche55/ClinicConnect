import React, { Component } from "react";

import "./Auth.css";
import AuthContext from "../context/auth-context";

class AuthPage extends Component {
  state = {
    isLogin: true,
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.firstNameEl = React.createRef();
    this.lastNameEl = React.createRef();
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
    this.isDoctorEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState((prevState) => {
      return { isLogin: !prevState.isLogin };
    });
  };

  switchModeDoctorHandler = () => {
    this.setState((prevState) => {
      return { isDoctor: !prevState.isDoctor };
    });
  };

  submitHandler = (submit) => {
    submit.preventDefault();

    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    if (email.trim().length === 0 || password.trim().length === 0) {
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
                        firstName
                        lastName
                    }
                }
            `,
    };

    if (!this.state.isLogin) {
      const firstName = this.firstNameEl.current.value;
      const lastName = this.lastNameEl.current.value;
      const isDoctor = this.isDoctorEl.current.checked;
      requestBody = {
        query: `
                    mutation{
                        createUser(userInput: {email: "${email}", password: "${password}", isDoctor: ${isDoctor}, firstName:"${firstName}", lastName:"${lastName}"}){
                            _id
                            email
                            password
                            isDoctor
                            firstName
                            lastName
                            token
                        }
                    }
                `,
      };
    }

    console.log(JSON.stringify(requestBody));

    fetch("/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Graphql query Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        if (this.state.isLogin) {
          if (resData.data.login.token) {
            this.context.login(
              resData.data.login.userId,
              resData.data.login.isDoctor,
              resData.data.login.token,
              resData.data.login.tokenExpiration,
              resData.data.login.firstName,
              resData.data.login.lastNmae
            );
          }
        } else {
          console.log(resData.data.createUser);
          if (resData.data.createUser.token) {
            this.context.login(
              resData.data.createUser._id,
              resData.data.createUser.isDoctor,
              resData.data.createUser.token,
              resData.data.createUser.tokenExpiration,
              resData.data.createUser.firstName,
              resData.data.createUser.lastNmae
            );
          }
        }
      })
      .catch((err) => {
        window.alert("Bad Authentication!");
        console.log(err);
      });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          {this.state.isLogin ? <h1>Login</h1> : <h1>Sign Up</h1>}
          <form className="auth-form" onSubmit={this.submitHandler}>
            {this.state.isLogin ? null : (
              <div className="firstName">
                <label htmlFor="firstName">First Name</label>
                <input
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  id="firstname"
                  ref={this.firstNameEl}
                />
              </div>
            )}

            {this.state.isLogin ? null : (
              <div className="lastName">
                <label htmlFor="lastName">Last Name</label>
                <input
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  id="lastName"
                  ref={this.lastNameEl}
                />
              </div>
            )}

            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                id="email"
                ref={this.emailEl}
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                ref={this.passwordEl}
              />
            </div>
            {this.state.isLogin ? null : (
              <div className="isDoctor">
                <label htmlFor="isDoctor">Are you a doctor?</label>
                <input
                  type="checkbox"
                  id="checkbox"
                  ref={this.isDoctorEl}
                  onClick={this.switchModeDoctorHandler}
                />
              </div>
            )}

            <div className="createAccount">
              <button type="submit">Submit</button>
              <button type="button" onClick={this.switchModeHandler}>
                {this.state.isLogin ? "No account yet?" : "Already a member?"}{" "}
                Click here to {this.state.isLogin ? "Signup!" : "Login!"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AuthPage;
