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
		alert('Current state is: ' + JSON.stringify(values))
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
									<Label htmlFor="email">
										Your Email Address
									</Label>
									<Control.text
										model=".email"
										name="email"
										id="email"
										className="form-control"
										placeholder="Email Address"
										validators={{
											required,
											minLength: minLength(2),
											maxLength: maxLength(15),
										}}
									/>
									<Errors
										className="text-danger"
										model=".email"
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
											minLength: minLength(6),
											maxLength: maxLength(15),
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
