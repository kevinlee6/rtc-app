import React, { Component } from 'react';
import { API_ROOT, HEADERS } from '../modules/constants.jsx';

export class NewMessageForm extends Component {
    state = {
        text: '',
        conversation_id: this.props.conversation_id,
        user_id: 1
    };

    componentWillReceiveProps = nextProps => {
        this.setState({
            conversation_id: nextProps.conversation_id
        });
    };

    handleChange = e => {
        this.setState({ text: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        fetch(`${API_ROOT}/messages`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(this.state)
        });
        this.setState({ text: '' });
    };

    render = () => {
        return (
            <div className="newMessageForm">
                <form onSubmit={this.handleSubmit}>
                    <label>New Message:</label>
                    <br />
                    <input
                        type="text"
                        value={this.state.text}
                        onChange={this.handleChange}
                    />
                    <input type="submit" />
                </form>
            </div>
        );
    };
}