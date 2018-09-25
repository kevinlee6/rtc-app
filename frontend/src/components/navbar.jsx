import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => (
	<nav className='navbar-left'>
		<NavLink to='/profile' activeClassName='active'>Profile</NavLink>
		<NavLink exact to='/' activeClassName='active'>Home</NavLink>
		<NavLink to='/public' activeClassName='active'>Public chats</NavLink>
		<NavLink to='/private' activeClassName='active'>Private chats</NavLink>
        <a onClick={this.handleLogout} href='/logout'>Logout</a>
    </nav>
);