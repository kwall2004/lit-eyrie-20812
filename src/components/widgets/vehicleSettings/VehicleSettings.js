import React from 'react';
import { Row, Col, Radio, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const VehicleSettings = React.createClass({
  render() {
    return (
      <div className="vehicle-settings">
        <div className="dashboard-widget-title">
          <span>Units</span>
        </div>
        <div className="time-zone-controls">
          <h4>Distance</h4>
          <Col smOffset={3} sm={9} className="settings-options">
            <Radio>
              Miles
            </Radio>
            <Radio>
              Kilometers
            </Radio>
          </Col>
          <hr />
          <h4>Date and Time</h4>
          <Form horizontal>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Date Format
              </Col>
              <Col sm={9}>
                <FormControl type="text" placeholder="YYYY-MM-DD" />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Time Format
              </Col>
              <Col sm={9}>
                <FormControl type="text" placeholder="HH:mm:ss" />
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    )
  }
});

module.exports = VehicleSettings;
