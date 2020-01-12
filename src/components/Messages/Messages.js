import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";

import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";

class Messages extends Component {
	render() {
		return (
			<>
				<MessagesHeader />
				<Segment>
					<Comment.Group className='messages'>{/* Messages */}</Comment.Group>
				</Segment>

				<MessageForm />
			</>
		);
	}
}

export default Messages;
