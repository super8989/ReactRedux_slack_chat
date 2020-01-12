import React, { Component } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebase';

import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import Message from './Message';

class Messages extends Component {
	state = {
		messagesRef: firebase.database().ref('messages'),
		messages: [],
		messagesLoading: true,
		channel: this.props.currentChannel,
		user: this.props.currentUser,
		progressBar: false
	};

	componentDidMount() {
		const { channel, user } = this.state;

		if (channel && user) {
			this.addListeners(channel.id);
		}
	}

	addListeners = channelId => {
		this.addMessageListeners(channelId);
	};

	addMessageListeners = channelId => {
		let loadedMessages = [];
		this.state.messagesRef.child(channelId).on('child_added', snap => {
			loadedMessages.push(snap.val());
			// console.log(loadedMessages);
			this.setState({
				messages: loadedMessages,
				messagesLoading: false
			});
		});
	};

	displayMessages = messages =>
		messages.length > 0 &&
		messages.map(message => (
			<Message
				key={message.timestamp}
				message={message}
				user={this.state.user}
			/>
		));

	displayChannelName = channel => (channel ? `#${channel.name}` : '');

	render() {
		const { messagesRef, messages, channel, user } = this.state;

		return (
			<>
				<MessagesHeader channelName={this.displayChannelName(channel)} />
				<Segment>
					<Comment.Group className='messages'>
						{/* Messages */}
						{this.displayMessages(messages)}
					</Comment.Group>
				</Segment>

				<MessageForm
					messagesRef={messagesRef}
					currentChannel={channel}
					currentUser={user}
				/>
			</>
		);
	}
}

export default Messages;
