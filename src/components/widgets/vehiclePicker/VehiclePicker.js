import React from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import Loader from '../loader';
import TripDatePicker from '../tripDatePicker';
import VehicleComboBox from '../vehicleComboBox';

const VehiclePicker = React.createClass({
  componentDidMount() {
    if (this.props.devices.get('list').size === 0) {
      this.props.getDevices();
    }
  },

  render() {
    var selectedDevice = this.props.devices.get('selectedDevice');

    return (
      <section>
        <div className="vehicle-picker">
          <Grid>
            <div className="vehicle-picker-top-row">
              {(() => {
                switch (this.props.location.pathname) {
                  case '/home/dashboard':
                    return (
                      <div className="vehicle-picker-left-column">
                        <i className="sprite sprite-icon-main-vehicle"></i>
                        <div className="vehicle-picker-title">
                          <div className="vehicle-picker-title-relative">
                            <Loader
                              loading={this.props.devices.get('loading')}
                              config={{ scale: 1.5 }}
                              style={{ height: '105px' }}
                              >
                              <span className="accent-number">
                                {this.props.devices.get('list').size}
                              </span>
                              <span className="accent-description">
                                {this.props.devices.get('list').size === 1 ? 'Vehicle' : 'Vehicles'}
                              </span>
                            </Loader>
                          </div>
                        </div>
                      </div>
                    );

                  case '/home/trips':
                    return (
                      <div className="vehicle-picker-left-column">
                        <i className="sprite sprite-icon-main-trips"></i>
                        <div className="vehicle-picker-title">
                          <div className="vehicle-picker-title-relative">
                            <Loader
                              loading={this.props.trips.get('loading')}
                              config={{ scale: 1.5 }}
                              >
                              <span className="accent-number">
                                {this.props.trips.get('list').size}
                              </span>
                              <span className="accent-description">
                                {this.props.trips.get('list').size === 1 ? 'Trip' : 'Trips'}
                              </span>
                            </Loader>
                          </div>
                        </div>
                      </div>
                    );
                }
              })()}
              <div>
                <div className="vehicle-picker-right-column">
                  {(() => {
                    if (this.props.location.pathname != '/home/dashboard') {
                      return (
                        <span>
                          <span className="input-label">
                            Select a Date
                          </span>
                          <TripDatePicker
                            {...this.props}
                            options={{
                              optionLabel: 'Select a Date',
                              value: this.props.trips.get('selectedTripDate'),
                              format: 'MM/dd/yyyy',
                              change: (e) => {
                                this.props.storeSelectedTripDate(e.sender.value());
                              }
                            }}
                            />
                        </span>
                      );
                    }
                  })()}
                  <span>
                    <span className="input-label">
                      Select Vehicle
                    </span>
                    <VehicleComboBox
                      {...this.props}
                      options={{
                        dataTextField: 'vehicleAlias',
                        dataValueField: 'id',
                        filter: 'contains',
                        dataSource: {
                          data: this.props.devices.get('list').toJS(),
                          schema: {
                            parse: (data) => {
                              return data.map((d) => {
                                var device = Object.assign({}, d);
                                device.vehicleAlias = d.vehicleAlias || 'Unknown';
                                return device;
                              })
                            }
                          }
                        },
                        template: '<span class="k-state-default"><h4>#: data.vehicleAlias #</h4><p>#: data.imei #</p></span>',
                        value: selectedDevice ? selectedDevice.get('id') : '',
                        text: selectedDevice ? (selectedDevice.get('vehicleAlias') ? selectedDevice.get('vehicleAlias') : 'Unknown') : '',
                        change: (e) => {
                          this.props.storeSelectedDevice(e.sender.value());
                        }
                      }}
                      />
                  </span>
                </div>
              </div>
            </div>
          </Grid>
        </div>
        {(() => {
          if (this.props.location.pathname == '/home/dashboard') {
            return (
              <div className="vehicle-picker-info">
                <Grid>
                  {(() => {
                    if (selectedDevice && selectedDevice.get('vehicleAlias')) {
                      return (
                        <Row>
                          <Col sm={4} md={4} className="vehicle-picker-info-name">
                            {selectedDevice.get('vehicleAlias')}
                          </Col>
                          <Col sm={8} md={8} className="vehicle-picker-info-table-wrapper">
                            <div className="vehicle-picker-info-table">
                              <Table condensed>
                                <thead>
                                  <tr>
                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Year</th>
                                    <th>VIN</th>
                                    <th>Odometer</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <span>
                                        {selectedDevice.get('make')}
                                      </span>
                                    </td>
                                    <td>
                                      <span>
                                        {selectedDevice.get('model')}
                                      </span>
                                    </td>
                                    <td className="vehicle-year">
                                      <span>
                                        {selectedDevice.get('modelYear')}
                                      </span>
                                    </td>
                                    <td className="vehicle-picker-info-vin">
                                      <span>
                                        {selectedDevice.get('vin')}
                                      </span>
                                    </td>
                                    <td className="vehicle-odometer">
                                      <span>
                                        {selectedDevice.get('odometer')}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                          </Col>
                        </Row>
                      );
                    }
                    else {
                      return (
                        <div className="no-vehicle-selected">
                          No Vehicle Selected
                        </div>
                      );
                    }
                  })()}
                </Grid>
              </div>
            );
          }
        })()}
      </section>
    )
  },
});

module.exports = VehiclePicker;
