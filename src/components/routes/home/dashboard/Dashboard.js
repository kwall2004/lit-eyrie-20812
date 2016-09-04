import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import RecentAlerts from '../../../widgets/recentAlerts';
import VehicleStatus from '../../../widgets/vehicleStatus';
import DeviceEvents from '../../../widgets/deviceEvents';
import DrivingBehavior from '../../../widgets/drivingBehavior';

const Dashboard = React.createClass({
    render() {
        return (
            <section>
                <Grid>
                    <Row>
                        <Col md={5}>
                            <RecentAlerts />
                            <VehicleStatus />
                            <DeviceEvents />
                            <DrivingBehavior />
                        </Col>
                        <Col md={7}>

                        </Col>
                    </Row>
                </Grid>
            </section>
        )
    }
});

module.exports = Dashboard;
