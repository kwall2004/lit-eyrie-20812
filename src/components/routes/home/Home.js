import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import VehiclePicker from '../../widgets/vehiclePicker';
import { connect } from 'react-redux';
import * as devicesActions from '../../../store/actions/devices';
import * as tripsActions from '../../../store/actions/trips';

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
        <VehiclePicker {...this.props} />
        <section>
          {this.props.children}
        </section>
      </section>
    )
  }
});

const Container = connect(
  (state) => {
    return {
      devices: state.devices,
      trips: state.trips,
    };
  },
  Object.assign({},
    devicesActions,
    tripsActions)
)(Home);

module.exports = Container;
