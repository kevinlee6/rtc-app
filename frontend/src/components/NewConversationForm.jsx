import React, { Component } from 'react';
import { HEADERS } from '../modules/constants.jsx';

export class NewConversationForm extends Component {
    state = {
        title: ''
    };

    handleChange = e => {
        this.setState({ title: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault()
        fetch('/conversations', {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(this.state)
        });
        this.setState({ title: '' });
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
                            value={this.state.title}
                            onChange={this.handleChange}
                            placeholder='Chat Room Title'
                        />
                    </div>
                    <input type="submit" className='btn btn-secondary' />
                </form>
            </div>
        );
    };
}
