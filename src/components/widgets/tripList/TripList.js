import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import Loader from '../loader';
import moment from 'moment';

const TripList = React.createClass({
  render() {
    return (
      <section>
        <div className="trip-list">
          <div className="trip-list-header">
            <div className="trip-list-header-title">
              Trips
            </div>
            <span className="trip-list-subheader">
              <Glyphicon glyph="chevron-left" />&nbsp;on&nbsp;{new moment(this.props.trips.get('selectedTripDate')).format('MM/DD/YYYY')}&nbsp;<Glyphicon glyph="chevron-right" />
            </span>
          </div>
          <Loader
            loading={this.props.trips.get('loading')}
            config={{ color: '#8F9399' }}
            >
            <div className="trip-list-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Trip Start</th>
                    <th>Trip End</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    if (this.props.trips.get('list').size > 0) {
                      return this.props.trips.get('list').map(trip => {
                        return (
                          <tr
                            key={trip.get('rowNumber')}
                            className={'trip-list-row' + (trip.get('tripId') === this.props.trips.getIn(['selectedTrip', 'tripId']) ? ' trip-list-row-selected' : '')}
                            onClick={() => this.props.storeSelectedTrip(trip)}>
                            <td className="trip-list-column-number">
                              <div className="trip-list-row-number">
                                {trip.get('rowNumber')}
                              </div>
                            </td>
                            <td>
                              {new moment(trip.get('startTime')).format('hh:mm A')}
                            </td>
                            <td>
                              {new moment(trip.get('endTime')).format('hh:mm A')}
                            </td>
                          </tr>
                        );
                      });
                    }
                    else {
                      return (
                        <tr className="trip-list-row-no-trips">
                          <td className="trip-list-no-trips" colSpan={3}>
                            (trip list is empty)
                          </td>
                        </tr>
                      );
                    }
                  })()}
                </tbody>
              </table>
            </div>
          </Loader>
        </div>
      </section>
    );
  }
});

module.exports = TripList;
