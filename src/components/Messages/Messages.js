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
		numUniqueUsers: '',
		searchTerm: '',
		searchLoading: false,
		searchResults: []
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
			this.countUniqueUsers(loadedMessages);
		});
	};

	handleSearchChange = event => {
		this.setState(
			{
				searchTerm: event.target.value,
				searchLoading: true
			},
			() => this.handleSearchMessages()
		);
	};

	handleSearchMessages = () => {
		const channelMessages = [...this.state.messages];
		const regex = new RegExp(this.state.searchTerm, 'gi');
		const searchResults = channelMessages.reduce((acc, message) => {
			if (message.content && message.content.match(regex)) {
				acc.push(message);
			}
			return acc;
		}, []);
		this.setState({ searchResults });
	};

	countUniqueUsers = messages => {
		const uniqueUsers = messages.reduce((acc, message) => {
			if (!acc.includes(message.user.name)) {
				acc.push(message.user.name);
			}
			return acc;
		}, []);
		const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
		const numUniqueUsers = `${uniqueUsers.length} user${plural ? 's' : ''}`;
		this.setState({ numUniqueUsers });
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
		//prettier-ignore
		const { messagesRef, messages, channel, user, numUniqueUsers, searchTerm, searchResults } = this.state;

		return (
			<>
				<MessagesHeader
					channelName={this.displayChannelName(channel)}
					numUniqueUsers={numUniqueUsers}
					handleSearchChange={this.handleSearchChange}
				/>
				<Segment>
					<Comment.Group className='messages'>
						{/* Messages */}
						{searchTerm
							? this.displayMessages(searchResults)
							: this.displayMessages(messages)}
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
