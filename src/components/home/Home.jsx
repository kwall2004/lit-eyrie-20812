import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Home = React.createClass({
    render() {
        return (
            <section>
                <Navbar className="subnavbar">
                    <Navbar.Header>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullLeft>
                            <LinkContainer to="/home/dashboard">
                                <NavItem>
                                    <span>
                                        Dashboard
                                    </span>
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to="/home/trips">
                                <NavItem>
                                    <span>
                                        Trips
                                    </span>
                                </NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <section>
                    {this.props.children && React.cloneElement(this.props.children, {
                        counters: this.props.counters,
                        increment: this.props.increment
                    }) }
                </section>
            </section>
        )
    }
});

module.exports = Home;