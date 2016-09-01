import React from 'react';
import { Row, Col } from 'react-bootstrap';

const RecentAlerts = React.createClass({
    render() {
        return (
            <section>
                <div className="recent-alerts">
                    <Row>
                        <Col md={3} className="dashboard-widget-img">
                            <i className="sprite sprite-icon-dash-alerts"></i>
                        </Col>
                        <Col md={9}>
                            <div className="dashboard-widget-title">
                                <span>
                                    Last 4 Alerts
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
                                    <tr className="recent-alerts-no-info">
                                        <td colSpan="100%">
                                            No Alert Information Available
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

module.exports = RecentAlerts;
