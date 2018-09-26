import React, { Component } from 'react';
import { HEADERS } from '../modules/constants.jsx';
import {Auth} from "../modules/Auth";

export class NewConversationForm extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            title: '',
            privacy: this.props.privacy,
            username: '',
            token: Auth.getToken()
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

    handleSubmit = e => {
        e.preventDefault()
        fetch('/conversations', {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(this.state)
        });
        this.setState({
            title: '',
            username: ''
        });
    };

    render = () => {
        return (
            <div className="newConversationForm">
                <form onSubmit={this.handleSubmit}>
                    <label>New Conversation:</label>
                    <br />
                    <div className='form-group'>
                        <input
                            type="text"
                            name='title'
                            value={this.state.title}
                            onChange={this.handleChange}
                            placeholder='Chat Room Title'
                        />
                    </div>
                    { this.state.privacy ?
                        <div className='form-group'>
                            <label htmlFor="privacy">Find user:</label>
                            <input
                                type="text"
                                name='username'
                                onChange={this.handleChange}
                                placeholder='Username'
                                value={this.state.username}
                            />
                        </div> : null
                    }
                    <input type="submit" className='btn btn-secondary' />
                </form>
            </div>
        );
    };
}
