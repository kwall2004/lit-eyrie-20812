import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import VehiclePicker from '../../../vehiclePicker';
import TripList from '../../../tripList';
import TripDetails from '../../../tripDetails';
import TripMap from '../../../tripMap';

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
                            <div className="trips-details">
                                <TripDetails {...this.props} />
                            </div>
                            <div className="trips-map">
                                <TripMap {...this.props} />
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </section>
        )
    }
});

module.exports = Trips;
