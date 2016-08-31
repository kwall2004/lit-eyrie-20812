import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import VehiclePicker from '../../../widgets/vehiclePicker';
import TripList from '../../../widgets/tripList';
import TripDetails from '../../../widgets/tripDetails';

const Trips = React.createClass({
    render() {
        return (
            <section>
                <VehiclePicker {...this.props} />
                <Grid className="trips-layout">
                    <Row className="trips-layout-root">
                        <Col md={3} className="trips-layout-left">
                            <TripList {...this.props} />
                        </Col>
                        <Col xs={12} md={9} className="trips-layout-right">
                            <TripDetails {...this.props} />
                        </Col>
                    </Row>
                </Grid>
            </section>
        )
    }
});

module.exports = Trips;
