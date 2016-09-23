import React from 'react';
import { Row, Col } from 'react-bootstrap';

const VehicleStatus = React.createClass({
  render() {
    return (
      <section>
        <div className="vehicle-status">
          <Row>
            <Col md={3} className="dashboard-widget-img">
              <i className="sprite sprite-icon-dash-vehicle-status"></i>
            </Col>
            <Col md={9}>
              <div className="dashboard-widget-title">
                <span>
                  Vehicle Status
                </span>
                <span className="dashboard-widget-view-all-small">
                  <a href="#">
                    <i className="sprite sprite-icon-popout"></i>
                    &nbsp;View More
                  </a>
                </span>
                <span className="stretch"></span>
              </div>
              <table>
                <tbody>
                  <tr>
                    <td colSpan="100%">
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </div>
      </section>
    )
  }
});

module.exports = VehicleStatus;
