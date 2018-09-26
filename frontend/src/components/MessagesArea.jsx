import React, { Component } from 'react';
import { NewMessageForm } from './NewMessageForm.jsx';

export class MessagesArea extends Component {
    constructor(props){
        super(props);
        this.state = ({
            messages: this.props.conversation.messages,
            id: this.props.conversation.id,
            title: this.props.conversation.title
        })
    }

    componentDidMount() {
        const el = document.getElementById('scrollToBottom');
        el.scrollTop = el.scrollHeight;
    }

    componentDidUpdate() {
        const el = document.getElementById('scrollToBottom');
        el.scrollTop = el.scrollHeight;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            messages: nextProps.conversation.messages,
            id: nextProps.conversation.id,
            title: nextProps.conversation.title
        });
    };

    render() {
        return (
            <div className="messagesArea">
                <h2 className='headers conversation-title'>{this.state.title}</h2>
                <ul id='scrollToBottom' className='messages-container'>
                    {orderedMessages(this.state.messages)}
                </ul>
                <NewMessageForm
                    conversation_id={this.state.id}
                />
            </div>
        );
    }
}

// helpers

const orderedMessages = messages => {
    const sortedMessages = messages.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    return sortedMessages.map((message, idx, messages) => {
        let lastMessage;
        const date = new Date(message.created_at);
        const time = date.toLocaleTimeString('en-US');
        const formattedTime = time.slice(0, -6) + time.slice(-2);

        if (idx > 0) {
            lastMessage = messages[idx-1];
        } else {
            return (
                <li key={message.id}>
                    <span className="center-text">{date.toDateString()}</span>
                    <div className='username-timestamp'>
                        <span className="font-weight-bold">{message.username}</span>
                        <span>{formattedTime}</span>
                    </div>
                    <p className='message-to-tab'>{message.text}</p>
                </li>
            )
        }

        const lastMessageDay = new Date(lastMessage.created_at);
        let dateOrNot;

        if (date.toDateString() !== lastMessageDay.toDateString()) {
            dateOrNot =
                <span className="center-text">{date.toDateString()}</span>
        }

        if (lastMessage.created_at.slice(14,16) === message.created_at.slice(14,16) &&
            lastMessage.username === message.username) {
            return (
                <li key={message.id}>
                    <p className='message-to-tab'>{message.text}</p>
                </li>
            )
        } else {
            return (
                <li key={message.id}>
                    {dateOrNot}
                    <div className='username-timestamp'>
                        <span className="font-weight-bold">{message.username}</span>
                        <span>{formattedTime}</span>
                    </div>
                    <p className='message-to-tab'>{message.text}</p>
                </li>
            )
        }
    });
};