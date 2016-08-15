import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import styles from './main.less';

const Main = React.createClass({
    render() {
        return (
            <div>
                <header>
                    <Navbar inverse className="rootnavbar">
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/">
                                    <i className="sprite sprite-logo-vts6"></i>
                                </Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav pullRight className="navbar-router">
                                <LinkContainer to="/home">
                                    <NavItem>
                                        <i className="icon-home"></i>
                                        <span>
                                            Home
                                        </span>
                                    </NavItem>
                                </LinkContainer>
                                <NavDropdown
                                    noCaret
                                    className="Admin"
                                    title={
                                        <div className="dropdown-label">
                                            <i className="icon-UserSetup"></i>
                                            <span>
                                                Admin
                                            </span>
                                            <span className="caret"></span>
                                        </div>
                                    }
                                    id="admin-menu">
                                    <LinkContainer to="/clientSetup">
                                        <MenuItem>Client Setup</MenuItem>
                                    </LinkContainer>
                                    <MenuItem>User Setup</MenuItem>
                                    <MenuItem>Vehicle Setup</MenuItem>
                                    <MenuItem>Device Setup</MenuItem>
                                    <MenuItem>User-Vehicle-Device Mapping</MenuItem>
                                    <MenuItem>FOTA Setup</MenuItem>
                                    <MenuItem>Geo-Fence</MenuItem>
                                    <MenuItem>Time-Fence</MenuItem>
                                    <MenuItem>User Access Priveleges</MenuItem>
                                    <MenuItem>Bulk Upload</MenuItem>
                                    <MenuItem>Trip Data Parser</MenuItem>
                                    <MenuItem>Device Action Settings</MenuItem>
                                    <MenuItem>File Download</MenuItem>
                                    <MenuItem>Config File Upload</MenuItem>
                                </NavDropdown>
                                <NavDropdown
                                    noCaret
                                    className="Reports"
                                    title={
                                        <div className="dropdown-label">
                                            <i className="icon-bar-chart"></i>
                                            <span>
                                                Reports
                                            </span>
                                            <span className="caret"></span>
                                        </div>
                                    }
                                    id="reports-menu">
                                    <MenuItem>Device Allocations</MenuItem>
                                    <MenuItem>Mapping</MenuItem>
                                </NavDropdown>
                                <LinkContainer to="/settings">
                                    <NavItem>
                                        <i className="icon-cog"></i>
                                        <span>
                                            Settings
                                        </span>
                                    </NavItem>
                                </LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
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
