import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Profile from './components/profile.jsx';
import Home from './components/home.jsx';
import Public from './components/public.jsx';
import Private from './components/private.jsx';
import './App.css';

class App extends Component {
  render() {
    return (
			<BrowserRouter>
				<div className='wrapper'>
					<Navbar />
					<div className='main-content'>
						<Switch>
							<Route path='/profile' component={Profile}></Route>
							<Route exact path='/' component={Home}></Route>
							<Route path='/public' component={Public}></Route>
							<Route path='/private' component={Private}></Route>
						</Switch>
					</div>
				</div>
			</BrowserRouter>
    );
  }
}

export default App;