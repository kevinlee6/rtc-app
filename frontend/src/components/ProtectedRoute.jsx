import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={ props => (
        props.user === props.match.params.user ? (
            <Component {...props} /> ) : (
            <Redirect to='/login' /> )
    )} />
);