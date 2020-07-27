import React, { Component } from 'react'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Row,
	Col,
} from 'reactstrap'
import SearchModal from './SearchModalComponent'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import { DRINKS } from '../shared/drinks'

class TopNav extends Component {
	constructor(props) {
		super(props)

		this.toggleNav = this.toggleNav.bind(this)
		this.state = {
			isNavOpen: false,
			activeIndex: 0,
			animating: false,
			drinks: DRINKS,
		}
	}

	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen,
		})
	}

	render() {
		return (
			<Navbar sticky="top" light expand="md">
				<div className="container">
					<NavbarBrand href="/" className="">
						<img
							src={require('../shared/images/logo.png')}
							alt="fit brews logo"
						/>
					</NavbarBrand>
					<NavbarToggler onClick={this.toggleNav} />
					<Collapse
						isOpen={this.state.isNavOpen}
						navbar
						className="text-center"
					>
						<Nav
							className="mr-md-auto mr-0  text-center text-md-left mb-5 mb-md-0 pl-3 "
							navbar
						>
							<NavItem>
								<NavLink href="/">Home</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/categories/">
									Categories
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/store">
									Store
								</NavLink>
							</NavItem>
						</Nav>
						<Row className="w-50 pb-3 mx-auto mx-md-0">
							<Col >
								<SearchModal />
							</Col>
							<Col>
								<LoginModal />
							</Col>
							<Col>
								<RegisterModal />
							</Col>
						</Row>
					</Collapse>
				</div>
			</Navbar>
		)
	}
}

export default TopNav
