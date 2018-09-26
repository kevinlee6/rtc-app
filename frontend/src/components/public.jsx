import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { NewConversationForm } from './NewConversationForm.jsx';
import { MessagesArea } from './MessagesArea.jsx';
import { Cable } from './Cable.jsx';
import { HEADERS } from "../modules/constants";

export class Public extends Component {
    state = {
        active: false,
        text: 'All',
        conversations: [],
        activeConversation: null
    };

    componentDidMount() {
        fetch('/conversations', {
            method: 'GET',
            headers: HEADERS
        })
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
        if (!conversation.privacy) {
            this.setState({
                conversations: [...this.state.conversations, conversation]
            });
        }
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

    handleToggleActive = () => {
        if (this.state.active) {
            fetch('/conversations', {
                method: 'GET',
                headers: HEADERS
            })
                .then(res => res.json())
                .then(conversations => this.setState({
                    conversations,
                    active: false,
                    text: 'All'
                }));
        } else {
            fetch('/subscribed', {
                method: 'GET',
                headers: HEADERS
            })
                .then(res => res.json())
                .then(conversations => this.setState({
                    conversations,
                    active: true,
                    text: 'Subscribed'
                }));
        }
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
                    <h2 className='headers'>Conversations</h2>
                    <button className='btn btn-secondary toggle' onClick={this.handleToggleActive}>
                        {this.state.text}
                    </button>
                    <ul className='list-group-flush conversations-container'>
                        {mapConversations(conversations, this.handleClick)}
                    </ul>
                    <NewConversationForm privacy={false} />
                </div>
                {activeConversation ?
                    (
                    <MessagesArea
                        conversation={findActiveConversation(
                            conversations,
                            activeConversation
                        )}
                    />
                    ) :
                    <div>
                        <h3>Select a conversation on the left to start chatting!</h3>
                        <h3>Or create your own.</h3>
                    </div>
                }
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