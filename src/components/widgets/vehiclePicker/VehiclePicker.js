import React from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import Spinner from 'react-spin';
import TripDatePicker from '../tripDatePicker';
import VehicleComboBox from '../vehicleComboBox';

const VehiclePicker = React.createClass({
  componentDidMount() {
    if (this.props.vehicles.get('list').size === 0) {
      this.props.getVehicles();
    }
  },

  render() {
    var selectedVehicle = this.props.vehicles.get('selectedVehicle');

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
                          {(() => {
                            if (this.props.vehicles.get('loading')) {
                              return (
                                <div className="vehicle-picker-title-relative">
                                  <Spinner config={{
                                    scale: 1.5
                                  }}/>
                                </div>
                              );
                            }
                            else {
                              return (
                                <div className="vehicle-picker-title-relative">
                                  <span className="accent-number">
                                    {this.props.vehicles.get('list').size}
                                  </span>
                                  <span className="accent-description">
                                    {this.props.vehicles.get('list').size === 1 ? 'Vehicle' : 'Vehicles'}
                                  </span>
                                </div>
                              );
                            }
                          })()}
                        </div>
                      </div>
                    );

                  case '/home/trips':
                    return (
                      <div className="vehicle-picker-left-column">
                        <i className="sprite sprite-icon-main-trips"></i>
                        <div className="vehicle-picker-title">
                          {(() => {
                            if (this.props.trips.get('loading')) {
                              return (
                                <div className="vehicle-picker-title-relative">
                                  <Spinner config={{
                                    scale: 1.5
                                  }}/>
                                </div>
                              );
                            }
                            else {
                              return (
                                <div className="vehicle-picker-title-relative">
                                  <span className="accent-number">
                                    {this.props.trips.get('list').size}
                                  </span>
                                  <span className="accent-description">
                                    {this.props.trips.get('list').size === 1 ? 'Trip' : 'Trips'}
                                  </span>
                                </div>
                              );
                            }
                          })()}
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
                                this.props.selectTripDate(e.sender.value());
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
                        dataTextField: 'name',
                        dataValueField: 'vehicleId',
                        filter: 'contains',
                        dataSource: {
                          data: this.props.vehicles.get('list').toJS()
                        },
                        template: '<span class="k-state-default"><h4>#: data.name #</h4><p>#: data.userName # (#: data.userId #)</p></span>',
                        value: selectedVehicle ? selectedVehicle.get('vehicleId') : '',
                        text: selectedVehicle ? selectedVehicle.get('name') : '',
                        change: (e) => {
                          this.props.selectVehicle(e.sender.value());
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
                    if (selectedVehicle && selectedVehicle.get('name')) {
                      return (
                        <Row>
                          <Col sm={4} md={4} className="vehicle-picker-info-name">
                            {selectedVehicle.get('name')}
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
                                        {selectedVehicle.get('make') && selectedVehicle.get('make') !== 'Unknown' ? selectedVehicle.get('make') : '--'}
                                      </span>
                                    </td>
                                    <td>
                                      <span>
                                        {selectedVehicle.get('model') && selectedVehicle.get('make') !== 'Unknown' ? selectedVehicle.get('model') : '--'}
                                      </span>
                                    </td>
                                    <td className="vehicle-year">
                                      <span>
                                        {selectedVehicle.get('year') && selectedVehicle.get('year') > 1900 && selectedVehicle.get('year') < 2100 ? selectedVehicle.get('year') : '--'}
                                      </span>
                                    </td>
                                    <td className="vehicle-picker-info-vin">
                                      <span>
                                        {selectedVehicle.get('vin') && selectedVehicle.get('vin').length == 17 ? selectedVehicle.get('vin') : '--'}
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
