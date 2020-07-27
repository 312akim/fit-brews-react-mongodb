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
				<Button onClick={toggleModal} className="w-100" color="secondary">Register</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={toggleModal}>
					<ModalHeader toggle={toggleModal}>Register</ModalHeader>
					<ModalBody>
						<LocalForm
							onSubmit={(values) => this.submitComment(values)}
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
											minLength: minLength(6),
											maxLength: maxLength(15),
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

export default RegisterModal
