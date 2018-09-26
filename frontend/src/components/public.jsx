import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../modules/constants.jsx';
import { NewConversationForm } from './NewConversationForm.jsx';
import { MessagesArea } from './MessagesArea.jsx';
import { Cable } from './Cable.jsx';

export class Public extends Component {
    state = {
        conversations: [],
        activeConversation: null
    };

    componentDidMount() {
        fetch(`${API_ROOT}/conversations`)
            .then(res => res.json())
            .then(conversations => this.setState({ conversations }));
    };

    handleClick = (e, id) => {
        this.setState({ activeConversation: id });
        if (!e.target.classList.contains('.active_conversation')) {
            const el = document.querySelector('.active-conversation');
            if (el) {
                el.classList.remove('active-conversation');

            }
            e.target.classList.add('active-conversation');
        }
    };

    handleReceivedConversation = response => {
        const { conversation } = response;
        this.setState({
            conversations: [...this.state.conversations, conversation]
        });
    };

    handleReceivedMessage = response => {
        const { message } = response;
        const conversations = [...this.state.conversations];
        const conversation = conversations.find(
            conversation => conversation.id === message.conversation_id
        );
        conversation.messages = [...conversation.messages, message];
        this.setState({ conversations });
    };

    render = () => {
        const { conversations, activeConversation } = this.state;
        return (
            <div className="public-chat">
                <ActionCable
                    channel={{ channel: 'ConversationsChannel' }}
                    onReceived={this.handleReceivedConversation}
                />
                {this.state.conversations.length ? (
                    <Cable
                        conversations={conversations}
                        handleReceivedMessage={this.handleReceivedMessage}
                    />
                ) : null}
                <div className="conversations-wrapper">
                    <h2>Conversations</h2>
                    <ul className='list-group-flush conversations-container'>
                        {mapConversations(conversations, this.handleClick)}
                    </ul>
                    <NewConversationForm />
                </div>
                {activeConversation ? (
                    <MessagesArea
                        conversation={findActiveConversation(
                            conversations,
                            activeConversation
                        )}
                    />
                ) : null}
            </div>
        );
    };
}

// helpers

const findActiveConversation = (conversations, activeConversation) => {
    return conversations.find(
        conversation => conversation.id === activeConversation
    );
};

const mapConversations = (conversations, handleClick) => {
    return conversations.map(conversation => {
        return (
            <li key={conversation.id}
                onClick={(e) => handleClick(e, conversation.id)}
                className='conversations list-group-item'
            >
                {conversation.title}
            </li>
        );
    });
};