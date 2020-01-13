import React, { Component } from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';

class MessagesHeader extends Component {
	render() {
		const {
			channelName,
			numUniqueUsers,
			handleSearchChange,
			searchLoading,
			isPrivateChannel
		} = this.props;

		return (
			<Segment clearing>
				{/* Channel Title */}
				<Header fluid='true' as='h2' floated='left' style={{ maginBottom: 0 }}>
					<span>
						{channelName}{' '}
						{!isPrivateChannel && <Icon name={'tv'} color='black' />}
					</span>
					<Header.Subheader>{numUniqueUsers}</Header.Subheader>
				</Header>

				{/* Channel Search Input */}
				<Header floated='right'>
					<Input
						loading={searchLoading}
						size='mini'
						onChange={handleSearchChange}
						icon='search'
						name='searchTerm'
						placeholder='Search Messages'
					/>
				</Header>
			</Segment>
		);
	}
}

export default MessagesHeader;
