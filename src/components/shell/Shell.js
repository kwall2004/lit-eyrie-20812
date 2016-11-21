import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import EventIndicator from '../widgets/eventIndicator';
import moment from 'moment';
import { connect } from 'react-redux';
import * as settingsActions from '../../store/actions/settings';

const Shell = React.createClass({
  componentDidMount() {
    this.props.getSettings();
  },

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
                    id="admin-menu"
                    >
                    <LinkContainer to="/admin/clients">
                      <MenuItem>Client Setup</MenuItem>
                    </LinkContainer>
                    <LinkContainer to="/admin/users">
                      <MenuItem>User Setup</MenuItem>
                    </LinkContainer>
                    <LinkContainer to="/admin/vehicles">
                      <MenuItem>Vehicle Setup</MenuItem>
                    </LinkContainer>
                    <LinkContainer to="/admin/devices">
                      <MenuItem>Device Setup</MenuItem>
                    </LinkContainer>
                    <MenuItem>FOTA Setup</MenuItem>
                    <MenuItem>Geo-Fence</MenuItem>
                    <MenuItem>Time-Fence</MenuItem>
                    <MenuItem>User Access Priveleges</MenuItem>
                    <MenuItem>Bulk Upload</MenuItem>
                    <LinkContainer to="/admin/deviceactions">
                      <MenuItem>Device Action Settings</MenuItem>
                    </LinkContainer>
                    <LinkContainer to="/admin/config-files">
                      <MenuItem>Config File Upload</MenuItem>
                    </LinkContainer>
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
                    id="reports-menu"
                    >
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
                  <NavDropdown
                    noCaret
                    className="nav-alerts"
                    title={
                      <div className="dropdown-label">
                        <EventIndicator />
                      </div>
                    }
                    id="event-indicator"
                    >
                    <MenuItem className="no-alerts">
                      <span className="navbar-element">
                        No new alerts
                      </span>
                    </MenuItem>
                  </NavDropdown>
                  <NavDropdown
                    noCaret
                    className="nav-profile"
                    title={
                      <div className="dropdown-label">
                        <img className="profile-pic" src="https://vision.danlawinc.com/Content/images/abstract.png" />
                        &nbsp;&nbsp;
                        <span className="nav-welcome-name">QA FLEET</span>
                      </div>
                    }
                    id="profile"
                    >
                    <LinkContainer to="/profile">
                      <MenuItem className="profile">Profile</MenuItem>
                    </LinkContainer>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </header>
          <section className="shell-routed-content">
            {this.props.children}
          </section>
        </div>
        <footer className="footer">
          <Navbar inverse className="navbar-bottom">
            <p className="navbar-text">
              Copyright &copy; <span>{new moment().format('YYYY')}</span> Danlaw Inc. All Rights Reserved.
            </p>
          </Navbar>
        </footer>
      </div>
    );
  }
});

const Container = connect(
  (state) => {
    return {};
  },
  Object.assign({},
    settingsActions)
)(Shell);

module.exports = Container;
