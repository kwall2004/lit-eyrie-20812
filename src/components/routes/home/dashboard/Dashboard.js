import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import VehiclePicker from '../../../vehiclePicker';
import RecentAlerts from '../../../recentAlerts';
import VehicleStatus from '../../../vehicleStatus';
import DeviceEvents from '../../../deviceEvents';
import DrivingBehavior from '../../../drivingBehavior';

const Dashboard = React.createClass({
    render() {
        return (
            <section>
                <VehiclePicker {...this.props} />
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
