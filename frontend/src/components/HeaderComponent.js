import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem } from 'reactstrap';

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false
        };
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Navbar dark variant="dark" expand="lg">
                    <div className="container">
                        <NavbarBrand>Support Dest</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav className="me-auto w-100 justify-content-end" navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/admin" target="_blank">
                                        Admin
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
              </Navbar>
            </div>
        );
    }
}

export default Header