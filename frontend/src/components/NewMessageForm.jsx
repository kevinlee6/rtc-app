import React, { Component } from 'react';
import { HEADERS } from '../modules/constants.jsx';
import { Auth } from '../modules/Auth'

export class NewMessageForm extends Component {
    state = {
        text: '',
        conversation_id: this.props.conversation_id,
        token: Auth.getToken()
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            conversation_id: nextProps.conversation_id
        });
    };

    handleChange = e => {
        this.setState({ text: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        fetch('/messages', {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(this.state)
        });
        this.setState({ text: '' });
    };

    render = () => {
        return (
            <form className="newMessageForm" onSubmit={this.handleSubmit}>
                <label>New Message:</label>
                <br />
                <div className='textbox-and-submit'>
                    <textarea
                        value={this.state.text}
                        onChange={this.handleChange}
                    />
                    <input type="submit" className='btn btn-secondary' />
                </div>
            </form>
        );
    };
}
