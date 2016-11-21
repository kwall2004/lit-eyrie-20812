import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import TripList from '../../../widgets/tripList';
import TripDetails from '../../../widgets/tripDetails';
import TripMap from '../../../widgets/tripMap';
import TripChart from '../../../widgets/tripChart';
import { connect } from 'react-redux';
import * as tripsActions from '../../../../store/actions/trips';

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
              <div className="trips-rpm">
                <TripChart {...this.props} />
              </div>
            </Col>
          </Row>
        </Grid>
        <div style={{ height: 35 }} />
      </section>
    )
  }
});

const Container = connect(
  (state) => {
    return {
      trips: state.trips,
    };
  },
  Object.assign({},
    tripsActions)
)(Trips);

module.exports = Container;
