import React, { Component } from 'react';

export class Register extends Component {
    constructor() {
        super();
        this.state = ({
           username: '',
           password: '',
           email: ''
        });

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const val = e.target.value;
        this.setState({
            [name]: val
        });
    }

    render() {
        return (
            <form
                onSubmit={e => this.props.handleRegisterSubmit(e, this.state)}
            >
                <h3>Register today to start messaging!</h3>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </div>
                <input
                    className='btn btn-primary login-btn'
                    type='submit'
                    value='Register'
                />
            </form>
        )
    }
}