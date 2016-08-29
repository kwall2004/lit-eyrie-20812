import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import VehiclePicker from '../../../widgets/vehiclePicker';
import TripList from '../../../widgets/TripList';

const Trips = React.createClass({
    render() {
        return (
            <section>
                <VehiclePicker {...this.props} />
                <Grid className="trips-layout">
                    <Row className="trips-layout-root">
                        <Col md={3} className="trips-layout-left">
                            <TripList trips={this.props.trips}></TripList>
                        </Col>
                        <Col xs={12} md={9} className="trips-layout-right">

                        </Col>
                    </Row>
                </Grid>
            </section>
        )
    }
});

module.exports = Trips;
