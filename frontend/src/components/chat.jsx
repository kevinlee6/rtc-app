import React, { Component } from 'react';
import { HEADERS } from '../modules/constants.jsx';
import { ActionCable } from 'react-actioncable-provider';
import {Auth} from "../modules/Auth";

export class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            conversations: [],
            activeConversation: null
        });
    }

    componentDidMount() {
        fetch('/conversations', {
            method: 'GET',
            headers: HEADERS
        })
            .then(res => res.json())
            .then(conversations => this.setState({ conversations }));
    };

    handleClick = id => {
        this.setState({ activeConversation: id });
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
            <div className="conversationsList">
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
                <h2>Conversations</h2>
                <ul>{mapConversations(conversations, this.handleClick)}</ul>
                <NewConversationForm />
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


// createSocket() {
    //     const cable = Cable.createConsumer('ws://localhost:3001/cable');
    //     this.chats = cable.subscriptions.create({
    //         channel: `ConversationsChannel`
    //     }, {
    //         connected: () => {},
    //         received: data => {
    //             const messageLogs = this.state.messageLogs;
    //             messageLogs.push(data);
    //             this.setState({ messageLogs });
    //         },
    //         create: function(text) {
    //             this.perform('create', {
    //                 text
    //             });
    //         }
    //     });
    // }
    //
    // handleSendEvent(event) {
    //     event.preventDefault();
    //     this.chats.create(this.state.currentMessage);
    //     this.setState({
    //         currentMessage: ''
    //     });
    // }
    //
    // renderChatLog() {
    //     return this.state.messageLogs.map((el) => {
    //         return (
    //             <li key={`chat_${el.id}`}>
    //                 <span className='message'>{ el.text }</span>
    //                 <span className='message-created-at'>{ el.created_at }</span>
    //             </li>
    //         );
    //     });
    // }
    //
    // updateCurrentMessage(event) {
    //     this.setState({
    //         currentMessage: event.target.value
    //     });
    // }
    //
    // componentWillMount() {
    //     this.createSocket();
    // }

    // render() {
    //     return (
            {/*<div className='stage'>*/}
                {/*<h1>Chat</h1>*/}
                {/*<div className='chat-logs'>*/}
                {/*</div>*/}
                {/*<form>*/}
                    {/*<input*/}
                        {/*value={ this.state.currentMessage }*/}
                        {/*onChange={ (e) => this.updateCurrentMessage(e) }*/}
                        {/*type='text'*/}
                        {/*placeholder='Enter your message...'*/}
                        {/*className='chat-input' />*/}
                    {/*<input*/}
                        {/*type="submit"*/}
                        {/*value={'send'}*/}
                        {/*onClick={ (e) => this.handleSendEvent(e) }*/}
                        {/*className='btn btn-primary send' />*/}
                {/*</form>*/}
                {/*<ul className='chat-logs'>*/}
                    {/*{ this.renderChatLog() }*/}
                {/*</ul>*/}
            {/*</div>*/}
//         );
//     }
// }