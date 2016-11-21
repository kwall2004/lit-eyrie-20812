import React from 'react';
import { NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Admin = React.createClass({
  getImageName() {
    switch (this.props.location.pathname) {
      case '/admin/clients':
        return 'Icon_Title_ClientSetup.png';
      case '/admin/vehicles':
        return 'Icon_Title_VehicleSetup.png';
      case '/admin/devices':
        return 'Icon_Title_DeviceSetup.png';
      case '/admin/users':
        return 'Icon_Title_UserSetup.png';
      case '/admin/deviceactions':
        return 'Icon_Title_DeviceAction.png';
      case '/admin/config-files':
        return 'Icon_Title_ConfigFileUpload.png';
    }
  },

  getImageTitle() {
    switch (this.props.location.pathname) {
      case '/admin/clients':
        return 'Client Setup';
      case '/admin/vehicles':
        return 'Vehicle Setup';
      case '/admin/devices':
        return 'Device Setup';
      case '/admin/users':
        return 'Users Setup';
      case '/admin/deviceactions':
        return 'Device Action Settings';
      case '/admin/config-files':
        return 'Config File Upload';
    }
  },

  render() {
    return (
      <section>
        <div className="admin-header">
          <div className="admin-header-left-column">
            <img src={'../../../public/images/admin-icons/' + this.getImageName()} />
            <div className="admin-header-title">
              <div className="admin-header-title-relative">
                <div className="accent-description">
                  {this.getImageTitle()}
                </div>
              </div>
            </div>
          </div>
          <div className="admin-header-right-column">
          </div>
        </div>
        <div id="wrapper">
          <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
              <NavItem className="sidebar-brand">
                &nbsp;
              </NavItem>
              <LinkContainer to="/admin/clients">
                <NavItem>
                  <span className="sidebar-icon">
                    <i className="icon-ClientSetup fa-2x"></i>
                  </span>
                  <span className="link-text">
                    Client Setup
                  </span>
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/admin/users">
                <NavItem>
                  <span className="sidebar-icon">
                    <i className="icon-UserSetup fa-2x"></i>
                  </span>
                  <span className="link-text">
                    User Setup
                  </span>
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/admin/vehicles">
                <NavItem>
                  <span className="sidebar-icon">
                    <i className="icon-VehicleSetup fa-2x"></i>
                  </span>
                  <span className="link-text">
                    Vehicle Setup
                  </span>
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/admin/devices">
                <NavItem>
                  <span className="sidebar-icon">
                    <i className="icon-DeviceSetup fa-2x"></i>
                  </span>
                  <span className="link-text">
                    Device Setup
                  </span>
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/admin/deviceactions">
                <NavItem>
                  <span className="sidebar-icon">
                    <i className="icon-DeviceAction fa-2x"></i>
                  </span>
                  <span className="link-text">
                    Device Action Settings
                  </span>
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/admin/config-files">
                <NavItem>
                  <span className="sidebar-icon">
                    <i className="icon-ConfigFileUpload fa-2x"></i>
                  </span>
                  <span className="link-text">
                    Config File Upload
                  </span>
                </NavItem>
              </LinkContainer>
            </ul>>
          </div>
          <div id="page-content-wrapper">
            <section>
              {this.props.children}
            </section>
          </div>
        </div>
      </section>
    )
  }
});

module.exports = Admin;
