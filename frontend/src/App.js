import React, { Component } from 'react';
// import { ProtectedRoute } from "./components/ProtectedRoute";
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './modules/constants';
import { BrowserRouter, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { Auth } from './modules/Auth'
// import { Navbar } from './components/navbar.jsx';
import Profile from './components/profile.jsx';
import Home from './components/home.jsx';
import { Public } from './components/public.jsx';
import Private from './components/private.jsx';
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import './App.css';

export class App extends Component {
    constructor() {
        super();
        this.state = {
            auth: Auth.isUserAuthenticated()
        }

        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
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
                } else {
                    // Do something here later
                }
            })
            .catch(err => console.log(err));
    }

    handleLogout(e) {
        e.preventDefault();
        fetch('/logout', {
            method: 'DELETE',
            headers: {
                token: Auth.getToken(),
                'Authorization': `Token ${Auth.getToken()}`
            }
        }).then(res => {
            Auth.deauthenticateUser();
            this.setState({
                auth: Auth.isUserAuthenticated()
            });
        }).catch(err => console.log(err));
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
                Auth.authenticateUser(res.token);
                this.setState({
                    auth: Auth.isUserAuthenticated()
                });
            })
            .catch(err => console.log(err));
    }

  render() {
    return (
        <div className='outermost-wrapper'>
            {this.state.auth ? (
                <ActionCableProvider url={API_WS_ROOT}>
                    <BrowserRouter>
                        <div className='after-login-wrapper'>
                            <nav className='navbar-left'>
                                <NavLink to='/profile' activeClassName='active'>Profile</NavLink>
                                <NavLink exact to='/' activeClassName='active'>Home</NavLink>
                                <NavLink to='/public' activeClassName='active'>Public chats</NavLink>
                                <NavLink to='/private' activeClassName='active'>Private chats</NavLink>
                                <a onClick={this.handleLogout} href='/logout'>Logout</a>
                            </nav>
                            <div className='main-content'>
                                <Switch>
                                    <Route path='/profile' component={Profile} />
                                    <Route exact path='/' component={Home} />
                                    <Route path='/public' component={Public} />
                                    <Route path='/private' component={Private} />
                                    <Route
                                        exact path='/register'
                                        render={
                                            () => (this.state.auth) ?
                                            <Redirect to='/' /> :
                                            <Register
                                                handleRegisterSubmit={this.handleRegisterSubmit}
                                            />
                                        }
                                    />
                                    <Route
                                        exact path='/login'
                                        render={
                                            () => (this.state.auth) ?
                                            <Redirect to='/' /> :
                                            <Login
                                                handleLoginSubmit={this.handleLoginSubmit}
                                            />
                                        }
                                    />
                                </Switch>
                            </div>
                        </div>
                    </BrowserRouter>
                </ActionCableProvider>
            ) : (
                <Login handleLoginSubmit={this.handleLoginSubmit} />
            )}
        </div>
    );
  }
}
