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
                                    <div className="pipe"></div>
                                    <span>
                                        Dashboard
                                    </span>
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to="/home/trips">
                                <NavItem>
                                    <div className="pipe"></div>
                                    <span>
                                        Trips
                                    </span>
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to="/home/vehicleDeviceInfo">
                                <NavItem>
                                    <div className="pipe"></div>
                                    <span>
                                        Vehicle & Device Info
                                    </span>
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to="/home/data">
                                <NavItem>
                                    <div className="pipe"></div>
                                    <span>
                                        Data
                                    </span>
                                </NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <section>
                    {this.props.children && React.cloneElement(
                        this.props.children,
                        {
                            vehicles: this.props.vehicles,
                            getVehicles: this.props.getVehicles,
                            selectVehicle: this.props.selectVehicle,
                            trips: this.props.trips,
                            getLastTripDate: this.props.getLastTripDate,
                            selectTripDate: this.props.selectTripDate,
                            getTrips: this.props.getTrips,
                            selectTrip: this.props.selectTrip,
                        }
                    )}
                </section>
            </section>
        )
    }
});

module.exports = Home;
