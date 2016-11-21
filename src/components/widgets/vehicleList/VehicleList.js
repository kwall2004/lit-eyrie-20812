import React from 'react';
import $ from 'jquery';
import { Alert } from 'react-bootstrap';
import Loader from '../../widgets/loader';

const VehicleList = React.createClass({
  scrolling: false,

  componentDidMount() {
    if (!this.props.settings.get('selectedVehicleId') && this.props.devices.get('selectedDevice')) {
      this.props.storeSelectedSettingVehicle(this.props.devices.getIn(['selectedDevice', 'vehicleId']));
    }
    else if (this.props.settings.get('selectedVehicleId')) {
      this.scrollToVehicle();
    }
  },

  componentDidUpdate(prevProps) {
    if (!this.props.settings.get('selectedVehicleId') && this.props.devices.get('selectedDevice')) {
      this.props.storeSelectedSettingVehicle(this.props.devices.getIn(['selectedDevice', 'vehicleId']));
    }
    else if (this.props.settings.get('selectedVehicleId') && !prevProps.settings.get('selectedVehicleId')) {
      this.scrollToVehicle();
    }
  },

  // if react updates during the animation, the animation becomes choppy
  shouldComponentUpdate() {
    return !this.scrolling;
  },

  scrollToVehicle() {
    this.scrolling = true;
    $('.settings-time-zones-vehicle-list').animate(
      {
        scrollTop: $('.vehicle-selected').offset().top - $('.settings-time-zones-vehicle-list').offset().top
      },
      1000,
      () => {
        this.scrolling = false;
      }
    );
  },

  getVehicleClassName(device) {
    if (device.get('vehicleId') == this.props.settings.get('selectedVehicleId')) {
      return 'vehicle-row vehicle-selected';
    }
    else if (this.props.settings.get('list').filter(s => {
      return s.get('vehicleId') == device.get('vehicleId') && s.get('state') != undefined;
    }).size > 0) {
      return 'vehicle-row vehicle-changed';
    }
    else {
      return 'vehicle-row';
    }
  },

  render() {
    return (
      <div>
        <div className="dashboard-widget-title">
          <span>Vehicle Settings</span>
        </div>
        <Alert bsStyle="success">
          This page configures vehicle specific settings. Changing these settings will not impact other users' settings.
        </Alert>
        <Loader
          loading={this.props.devices.get('loading')}
          config={{ scale: 1.5 }}
          style={{ height: '250px' }}
          >
          {(() => {
            if (this.props.devices.get('list').size > 0) {
              return (
                <div className="settings-time-zones-vehicle-list">
                  {this.props.devices.get('list')
                    .filter(device => {
                      return !!device.get('vehicleId');
                    })
                    .map(device => {
                      return (
                        <div
                          key={device.get('vehicleId')}
                          onClick={() => this.props.storeSelectedSettingVehicle(device.get('vehicleId'))}
                          className={this.getVehicleClassName(device)}
                          >
                          <div>
                            <h4><span>{device.get('vehicleAlias')}</span><br /><small>{device.get('modelYear') + ' ' + device.get('make') + ' ' + device.get('model')}</small></h4>
                          </div>
                        </div>
                      )
                    })}
                </div>
              )
            }
            else {
              return (
                <Alert bsStyle="danger">There are no vehicles in this list.</Alert>
              )
            }
          })()}
        </Loader>
      </div>
    )
  }
});

module.exports = VehicleList;
