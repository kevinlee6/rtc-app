import React, { Component } from 'react';
import { Login } from "./Login.jsx";
import { Register } from "./Register.jsx";
import { Auth } from "../modules/Auth";

export class LoginRegister extends Component {
    constructor() {
        super();
        this.state = ({
           login: true,
           text: 'Register'
        });
        this.handleClick = this.handleClick.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    }

    handleClick() {
        if (this.state.login) {
            this.setState({
                login: false,
                text: 'Login'
            })
        } else {
            this.setState({
                login: true,
                text: 'Register'
            })
        }
    }

    handleLoginSubmit(e, data) {
        e.preventDefault();
        fetch('/login', {
            method: 'POST',
            body: JSON.stringify({
                user: data
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
                if (res) {
                    Auth.authenticateUser(res.token);
                    this.setState({
                        auth: Auth.isUserAuthenticated()
                    });
                    localStorage.setItem('username', data['username']);
                    window.location.href = '/'
                } else {
                    // Do something here later
                }
            })
            .catch(err => console.log(err));
    }

    handleRegisterSubmit(e, data) {
        e.preventDefault();
        fetch('/users', {
            method: 'POST',
            body: JSON.stringify({
                user: data
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
                if (res.token) {
                    Auth.authenticateUser(res.token);
                    this.setState({
                        auth: Auth.isUserAuthenticated()
                    });
                    window.location.href = '/'
                } else {
                    // Do something here later
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className='before-login-wrapper'>
                <div className='login-form'>
                    {this.state.login ?
                        <Login handleLoginSubmit={this.handleLoginSubmit}/> :
                        <Register handleRegisterSubmit={this.handleRegisterSubmit}/>
                    }
                    <br/>
                    or
                    <br/>
                    <br/>
                    <button
                        onClick={this.handleClick}
                        className='btn btn-secondary login-btn'
                    >
                        {this.state.text}
                    </button>
                </div>
            </div>
        )
    }
}
