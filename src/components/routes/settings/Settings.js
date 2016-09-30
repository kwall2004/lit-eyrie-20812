import React from 'react';
import { Grid, Row, Col, ButtonToolbar, Button, Alert } from 'react-bootstrap';
import TimeZoneMap from '../../widgets/timeZoneMap';
import VehicleSettings from '../../widgets/vehicleSettings';

const Settings = React.createClass({
  render() {
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
                <Button bsStyle="danger">Clear Settings</Button>
                <Button bsStyle="danger">Cancel</Button>
                <Button bsStyle="success">Save</Button>
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
                      <div className="dashboard-widget-title">
                        <span>Vehicle Settings</span>
                      </div>
                      <Alert bsStyle="success">
                        This page configures vehicle specific settings. Changing these settings will not impact other users' settings.
                      </Alert>
                      <div className="settings-time-zones-vehicle-list">
                        {this.props.vehicles.get('list').map(vehicle => {
                          return (
                            <div key={vehicle.get('vehicleId')} className="vehicle-row">
                              <div>
                                <h4><span>{vehicle.get('name')}</span><br /><small>{vehicle.get('year') + ' ' + vehicle.get('make') + ' ' + vehicle.get('model')}</small></h4>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      {(() => {
                        if (this.props.vehicles.get('list').size === 0) {
                          return (
                            <Alert bsStyle="danger">There are no vehicles in this list.</Alert>
                          )
                        }
                      })()}
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={7}>
                <Row>
                  <Col md={12}>
                    <span>
                      <TimeZoneMap></TimeZoneMap>
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <span>
                      <VehicleSettings></VehicleSettings>
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Grid>
      </section>
    )
  }
});

module.exports = Settings;
