import React from 'react';
import { Row, Col } from 'react-bootstrap';

const DeviceEvents = React.createClass({
  render() {
    return (
      <section>
        <div className="vehicle-status">
          <Row>
            <Col md={3} className="dashboard-widget-img">
              <i className="sprite sprite-icon-dash-device"></i>
            </Col>
            <Col md={9}>
              <div className="dashboard-widget-title">
                <span>
                  Device Events
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
                      No Device Events Available
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

module.exports = DeviceEvents;
