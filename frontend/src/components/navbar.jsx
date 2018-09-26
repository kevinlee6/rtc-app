import React from 'react';
import { NavLink } from 'react-router-dom';
// import {Public} from "./public";

export const Navbar = ({handleLogout}) => (
	<nav className='navbar-left'>
        <h3>{localStorage.getItem('username')}</h3>
		<NavLink to='/profile' activeClassName='active'>Profile</NavLink>
		{/*<NavLink exact to='/' activeClassName='active'>Home</NavLink>*/}
		<NavLink exact to='/' activeClassName='active'>Public chats</NavLink>
		<NavLink to='/private' activeClassName='active'>Private chats</NavLink>
        <a onClick={handleLogout} href='/logout'>Logout</a>
    </nav>
);