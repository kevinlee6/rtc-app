import React, { Component } from 'react';

export class Profile extends Component {
    render() {
        return (
            <form className='login-form'>
                <div className='form-group'>
                    <label htmlFor="username">Username</label>
                    <input className='form-control' type="text" name='username' disabled/>
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input className='form-control' type="password" name='password'/>
                </div>
                <div className='form-group'>
                    <label htmlFor="password-confirm">Password confirmation</label>
                    <input className='form-control' type="password" name='password-confirm' />
                </div>
                <input
                    className='btn btn-primary login-btn'
                    type='submit'
                    value='Change password'
                />
            </form>
        )
    }

}
