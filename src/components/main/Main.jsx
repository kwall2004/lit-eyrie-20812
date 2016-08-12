import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import styles from './main.css';

const Main = React.createClass({
    render() {
        return (
            <div>
                <header>
                    <Navbar inverse>
                        <Navbar.Header>
                            <Navbar.Brand>
                                Webpack Demo
                            </Navbar.Brand>
                        </Navbar.Header>
                        <Nav pullRight>
                            <LinkContainer to="/home">
                                <NavItem>
                                    Home
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to="/one">
                                <NavItem>
                                    Component 1
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to="/two">
                                <NavItem>
                                    Component 2
                                </NavItem>
                            </LinkContainer>
                            <NavDropdown title="Component 3" id="component-3">
                                <MenuItem>3a</MenuItem>
                                <MenuItem>3b</MenuItem>
                                <MenuItem>3c</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar>
                </header>
                <section>
                    {React.cloneElement(this.props.children, {
                        counters: this.props.counters,
                        increment: this.props.increment
                    }) }
                </section>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        counters: state.counters
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

module.exports = Container;
