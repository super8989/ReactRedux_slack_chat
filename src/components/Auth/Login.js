import React, { Component } from 'react';
import firebase from '../../firebase';

import {
	Grid,
	Form,
	Segment,
	Button,
	Header,
	Message,
	Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: [],
		loading: false
	};

	displayErrors = errors =>
		errors.map((error, i) => <p key={i}>{error.message}</p>);

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		if (this.isFormValid(this.state)) {
			this.setState({ errors: [], loading: true });
			firebase
				.auth()
				.signInWithEmailAndPassword(this.state.email, this.state.password)
				.then(signedInUser => {
					console.log(signedInUser);
				})
				.catch(err => {
					console.error(err);
					this.setState({
						errors: this.state.errors.concat(err),
						loading: false
					});
				});
		}
	};

	isFormValid = ({ email, password }) => email && password;

	handleInputError = (errors, inputName) => {
		return errors.some(error => error.message.toLowerCase().includes(inputName))
			? 'error'
			: '';
	};

	render() {
		const {
			email,
			password,

			errors,
			loading
		} = this.state;

		return (
			<Grid textAlign='center' verticalAlign='middle' className='app'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as='h1' icon color='violet' textAlign='center'>
						<Icon name='sitemap' color='violet' />
						Login to DevChat
					</Header>
					<Form onSubmit={this.handleSubmit} size='large'>
						<Segment stacked>
							<Header as='h5'>
								For demo, you can register or use sam@gmail.com
							</Header>
							<Form.Input
								fluid
								name='email'
								icon='mail'
								iconPosition='left'
								placeholder='sam@gmail.com'
								onChange={this.handleChange}
								value={email}
								className={this.handleInputError(errors, 'email')}
								type='email'
							/>
							<Header as='h4'>Password: hello12</Header>
							<Form.Input
								fluid
								name='password'
								icon='lock'
								iconPosition='left'
								placeholder='hello12'
								onChange={this.handleChange}
								value={password}
								className={this.handleInputError(errors, 'password')}
								type='password'
							/>

							<Button
								disabled={loading}
								className={loading ? 'loading' : ''}
								color='violet'
								fluid
								size='large'
							>
								Submit
							</Button>
							<Message>
								Don't have an account? <Link to='/register'>Register</Link>
							</Message>
						</Segment>
					</Form>
					{errors.length > 0 && (
						<Message error>
							<h3>Error</h3>
							{this.displayErrors(errors)}
						</Message>
					)}
				</Grid.Column>
			</Grid>
		);
	}
}

export default Login;
