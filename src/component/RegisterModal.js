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

class RegisterModal extends Component {
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
			body: JSON.stringify({ title: 'React POST Request Example' })
		};
		fetch('http://localhost:5000/register', requestOptions)
			.then(async response => {
				const data = await response.json();
	
				// check for error response
				if (!response.ok) {
					// get error message from body or default to response status
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				}
	
				console.log("Success hit");
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
				<Button onClick={toggleModal} className="w-100" color="secondary">Register</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={toggleModal}>
					<ModalHeader toggle={toggleModal}>Register</ModalHeader>
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
											minLength: minLength(2),
											maxLength: maxLength(15),
										}}
									/>
								</Col>
							</Row>
                            <Row class="form-group">
								<Col>
									<Label htmlFor="email">
										Your Email address
									</Label>
									<Control.text
										model=".email"
										name="email"
										id="email"
										className="form-control"
										placeholder="email address"
										validators={{
											required,
											minLength: minLength(2),
											maxLength: maxLength(15),
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
											minLength: minLength(2),
											maxLength: maxLength(15),
										}}
									/>
								</Col>
							</Row>
							<Button type="submit" color="primary" className="mt-2">
								Register
							</Button>
						</LocalForm>
					</ModalBody>
				</Modal>
			</>
		)
	}
}

export default RegisterModal
