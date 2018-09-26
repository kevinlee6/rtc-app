import React, { Component } from 'react';
// import { ProtectedRoute } from "./components/ProtectedRoute";
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './modules/constants';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Auth } from './modules/Auth'
import { Navbar } from './components/navbar.jsx';
import { Profile } from './components/profile.jsx';
// import { Home } from './components/home.jsx';
import { Public } from './components/public.jsx';
import { Private } from './components/private.jsx';
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { LoginRegister } from "./components/LoginRegister";
import './App.css';

export class App extends Component {
    constructor() {
        super();
        this.state = ({
            auth: Auth.isUserAuthenticated()
        });

        this.handleLogout = this.handleLogout.bind(this);
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
            localStorage.removeItem('username');
            this.setState({
                auth: Auth.isUserAuthenticated()
            });
        }).catch(err => console.log(err));
    }

  render() {
    return (
        <div className='outermost-wrapper'>
            {this.state.auth ? (
                <ActionCableProvider url={API_WS_ROOT}>
                    <BrowserRouter>
                        <div className='after-login-wrapper'>
                            <Navbar handleLogout={this.handleLogout} />
                            <div className='main-content'>
                                <Switch>
                                    <Route path='/profile' component={Profile} />
                                    <Route exact path='/' component={ Public } />
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
                <LoginRegister handleLoginSubmit={this.handleLoginSubmit} />
            )}
        </div>
    );
  }
}
