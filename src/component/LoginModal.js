import React, { Component } from 'react'
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Label,
	Row,
	Col,
} from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form'

const required = (val) => val && val.length
const maxLength = (len) => (val) => !val || val.length <= len
const minLength = (len) => (val) => val && val.length >= len

class LoginModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isModalOpen: false,
		}
	}

	handleSubmit = (values) => {

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values)
		};

		console.log(values);
		// alert('Current state is: ' + JSON.stringify(values))
		fetch('http://localhost:5000/login', requestOptions)
			.then(async response => {

				// const data = await response.json();
				const data = await response;
	
				// check for error response
				if (!response.ok) {
					console.log("Failed to login");
					// get error message from body or default to response status
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				}
	
				console.log("Success hit. Logged in!");
			})
			.catch(error => {
				this.setState({ errorMessage: error.toString() });
				console.error('There was an error!', error);
			});

	}

	render() {
		const toggleModal = () => {
			this.setState({
				isModalOpen: !this.state.isModalOpen,
			})
		}

		return (
			<>
				<Button onClick={toggleModal} className="w-100" color="secondary">Login</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={toggleModal}>
					<ModalHeader toggle={toggleModal}>Login</ModalHeader>
					<ModalBody>
						<LocalForm
							onSubmit={(values) => this.handleSubmit(values)}
						>
							<Row class="form-group">
								<Col>
									<Label htmlFor="username">
										Your Username
									</Label>
									<Control.text
										model=".username"
										name="username"
										id="username"
										className="form-control"
										placeholder="Username"
										validators={{
											required,
											minLength: minLength(0),
											maxLength: maxLength(100),
										}}
									/>
									<Errors
										className="text-danger"
										model=".username"
										show="touched"
										components="div"
										messages={{
											required: 'Required',
											minLength:
												'Must be at least 2 characters',
											maxLength:
												'Must be 15 characters or less',
										}}
									/>
								</Col>
							</Row>
							<Row class="form-group">
								<Col>
									<Label htmlFor="password">
										Your Password
									</Label>
									<Control.text
										model=".password"
										name="password"
										id="password"
										className="form-control"
										placeholder="Password"
										validators={{
											required,
											minLength: minLength(1),
											maxLength: maxLength(100),
										}}
									/>
									<Errors
										className="text-danger"
										model=".password"
										show="touched"
										components="div"
										messages={{
											required: 'Required',
											minLength:
												'Must be at least 6 characters',
											maxLength:
												'Must be 15 characters or less',
										}}
									/>
								</Col>
							</Row>
							<Button type="submit" color="primary" className="mt-2">
								Login
							</Button>
						</LocalForm>
					</ModalBody>
				</Modal>
			</>
		)
	}
}

export default LoginModal
