import React, { Component } from 'react';
// import gif1 from '../media/gif-1.gif';
// import gif2 from '../media/gif-2.gif';

export class Login extends Component {
    constructor() {
        super();
        this.state = ({
            username: '',
            password: '',
        });

        this.handleChange = this.handleChange.bind(this);
    }

    // Experiment with dynamic gif backgrounds.
    // Makes my eyes hurt after a while.
    // componentDidMount() {
    //     setInterval(function () {
    //         const target = document.querySelector('.before-login-wrapper');
    //
    //         if (target.style.backgroundImage === `url("${gif2}")`) {
    //             target.style.backgroundImage = `url('${gif1}')`;
    //         } else {
    //             target.style.backgroundImage = `url('${gif2}')`;
    //         }
    //     }, 6000);
    // }

    handleChange(e) {
        const name = e.target.name;
        const val = e.target.value;
        this.setState({
            [name]: val
        });
    }

    render() {
        return (
            <form onSubmit={e => this.props.handleLoginSubmit(e, this.state)}>
                <h3>Login to get started</h3>
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
                <input
                    className='btn btn-primary login-btn'
                    type='submit'
                    value='Log In'
                />
            </form>
        )
    }
}