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
                <VehiclePicker
                    {...this.props}
                    iconClassName="sprite sprite-icon-main-vehicle"
                    number={this.props.vehicles.get('loading') ? 'loading...' : this.props.vehicles.get('list').size}
                    description={this.props.vehicles.get('list').size === 1 ? 'Vehicle' : 'Vehicles'}
                    showInfo={true}
                />
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
