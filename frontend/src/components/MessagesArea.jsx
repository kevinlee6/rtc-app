import React from 'react';
import { NewMessageForm } from './NewMessageForm.jsx';

export const MessagesArea = ({conversation: { id, title, messages }}) => {
    return (
        <div className="messagesArea">
            <h2>{title}</h2>
            <ul>{orderedMessages(messages)}</ul>
            <NewMessageForm conversation_id={id} />
        </div>
    );
};

// helpers

const orderedMessages = messages => {
    const sortedMessages = messages.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    console.log(sortedMessages);
    return sortedMessages.map(message => {
        return <li key={message.id}>{message.username}: {message.text}</li>;
    });
};