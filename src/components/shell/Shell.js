import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import moment from 'moment';

const Shell = React.createClass({
  render() {
    return (
      <div>
        <div className="wrapper">
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
                    <LinkContainer to="/admin/clients">
                      <MenuItem>Client Setup</MenuItem>
                    </LinkContainer>
                    <MenuItem>User Setup</MenuItem>
                    <LinkContainer to="/admin/vehicles">
                      <MenuItem>Vehicle Setup</MenuItem>
                    </LinkContainer>
                    <LinkContainer to="/admin/devices">
                      <MenuItem>Device Setup</MenuItem>
                    </LinkContainer>
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
          <section className="shell-routed-content">
            {this.props.children && React.cloneElement(
              this.props.children,
              {
                vehicles: this.props.vehicles,
                getVehicles: this.props.getVehicles,
                selectVehicle: this.props.selectVehicle,
                trips: this.props.trips,
                selectTripDate: this.props.selectTripDate,
                selectTrip: this.props.selectTrip,
                tripJsonData: this.props.tripJsonData,
                settings: this.props.settings,
                selectTimeZone: this.props.selectTimeZone,
              }
            )}
          </section>
        </div>
        <footer className="footer">
          <Navbar inverse className="navbar-bottom">
            <p className="navbar-text">
              Copyright &copy; <span>{new moment().format('YYYY')}</span> All Rights Reserved.
            </p>
          </Navbar>
        </footer>
      </div>
    );
  }
});

const Container = connect(
  state => {
    return {
      vehicles: state.vehicles,
      trips: state.trips,
      tripJsonData: state.tripJsonData,
      settings: state.settings,
    };
  },
  actionCreators
)(Shell);

module.exports = Container;
