import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
		<nav className='navbar-left'>
			<NavLink to='/profile' activeClassName='active'>Profile</NavLink>
			<NavLink exact to='/' activeClassName='active'>Home</NavLink>
			<NavLink to='/public' activeClassName='active'>Public chats</NavLink>
			<NavLink to='/private' activeClassName='active'>Private chats</NavLink>
		</nav>
);

export default Navbar;