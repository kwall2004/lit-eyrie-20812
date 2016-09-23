import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import TripList from '../../../widgets/tripList';
import TripDetails from '../../../widgets/tripDetails';
import TripMap from '../../../widgets/tripMap';

const Trips = React.createClass({
  render() {
    return (
      <section>
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
