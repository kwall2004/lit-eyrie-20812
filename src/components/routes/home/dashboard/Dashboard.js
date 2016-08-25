import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import VehiclePicker from '../../../widgets/vehiclePicker';
import RecentAlerts from '../../../widgets/recentAlerts';
import VehicleStatus from '../../../widgets/vehicleStatus';
import DeviceEvents from '../../../widgets/deviceEvents';
import DrivingBehavior from '../../../widgets/drivingBehavior';

const Dashboard = React.createClass({
    render() {
        return (
            <section>
                <VehiclePicker {...this.props}></VehiclePicker>
                <Grid>
                    <Row>
                        <Col md={5}>
                            <RecentAlerts></RecentAlerts>
                            <VehicleStatus></VehicleStatus>
                            <DeviceEvents></DeviceEvents>
                            <DrivingBehavior></DrivingBehavior>
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
