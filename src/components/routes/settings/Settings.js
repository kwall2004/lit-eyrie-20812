import React from 'react';
import $ from 'jquery';
import { Grid, Row, Col, ButtonToolbar, Button, Modal } from 'react-bootstrap';
import VehicleList from '../../widgets/vehicleList';
import TimeZoneMap from '../../widgets/timeZoneMap';
import VehicleSettings from '../../widgets/vehicleSettings';
import { connect } from 'react-redux';
import * as devicesActions from '../../../store/actions/devices';
import * as settingsActions from '../../../store/actions/settings';

const Settings = React.createClass({
  componentDidMount() {
    if (this.props.devices.get('list').size == 0) {
      this.props.getDevices();
    }
    else {
      $('.settings-time-zones-vehicle-list').css({
        'max-height': ($('.vehicle-settings').offset().top + $('.vehicle-settings').height()) - $('.settings-time-zones-vehicle-list').offset().top
      });
    }
  },

  componentDidUpdate(prevProps) {
    if (this.props.devices.get('list').size > 0 && prevProps.devices.get('list').size == 0) {
      $('.settings-time-zones-vehicle-list').css({
        'max-height': ($('.vehicle-settings').offset().top + $('.vehicle-settings').height()) - $('.settings-time-zones-vehicle-list').offset().top
      });
    }
  },

  render() {
    var vehicleSettings = this.props.settings.get('list').filter(s => {
      return s.get('vehicleId');
    });

    var dirtyVehicleSettings = vehicleSettings.filter(s => {
      return s.get('state');
    });

    return (
      <section>
        <div className="admin-header">
          <Grid>
            <div className="admin-header-left-column">
              <img src={'../../../public/images/admin-icons/Icon_Title_DeviceAction.png'} />
              <div className="admin-header-title">
                <div className="admin-header-title-relative">
                  <div className="accent-description">
                    Settings
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-header-right-column">
              <ButtonToolbar>
                <Button
                  bsStyle="danger"
                  onClick={() => { this.props.showSettingsModal(true) } }
                  disabled={vehicleSettings.size == 0 || dirtyVehicleSettings.size > 0}>
                  Clear Settings
                </Button>
                <Button
                  bsStyle="danger"
                  onClick={() => this.props.cancelSettings()}
                  disabled={dirtyVehicleSettings.size == 0}>
                  Cancel
                </Button>
                <Button
                  bsStyle="success"
                  onClick={() => this.props.saveSettings()}
                  disabled={dirtyVehicleSettings.size == 0}>
                  Save
                </Button>
              </ButtonToolbar>
            </div>
          </Grid>
        </div>

        <Grid>
          <div className="settings-content">
            <Row>
              <Col md={5}>
                <div className="settings-time-zones">
                  <Row>
                    <Col md={3} className="dashboard-widget-img">
                      <i className="sprite sprite-icon-main-trips"></i>
                    </Col>
                    <Col md={9}>
                      <VehicleList {...this.props} />
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={7}>
                <Row>
                  <Col md={12}>
                    <span>
                      <TimeZoneMap {...this.props} />
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <span>
                      <VehicleSettings />
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Grid>

        <Modal show={this.props.settings.get('showModal')}>
          <Modal.Header>
            <Modal.Title>
              Clear Settings
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to clear settings for all vehicles?
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsStyle="primary"
              onClick={() => this.props.deleteSettings()}>
              Yes
            </Button>
            <Button onClick={() => this.props.showSettingsModal(false)}>No</Button>
          </Modal.Footer>
        </Modal>
      </section>
    )
  },
});

const Container = connect(
  (state) => {
    return {
      devices: state.devices,
      settings: state.settings
    };
  },
  Object.assign({},
    devicesActions,
    settingsActions)
)(Settings);

module.exports = Container;
