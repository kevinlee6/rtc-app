import React from 'react';
import { ActionCable } from 'react-actioncable-provider';

export const Cable = ({ conversations, handleReceivedMessage }) => {
    return (
        <div>
            {conversations.map(conversation => {
                return (
                    <ActionCable
                        key = {conversation.id}
                        channel = {{ channel: 'MessagesChannel', conversation: conversation.id }}
                        onReceived = {handleReceivedMessage}
                    />
                );
            })}
        </div>
    );
};
