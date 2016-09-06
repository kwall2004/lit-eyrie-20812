import 'font-awesome/css/font-awesome.css';
import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

const TripList = React.createClass({
    selectRow(trip) {
        this.props.selectTrip(trip);
    },

    getClassName(trip) {
        return 'trip-list-row' + (trip.getIn(['trip', 'tripId']) === this.props.trips.getIn(['selectedTrip', 'trip', 'tripId']) ? ' trip-list-row-selected' : '');
    },

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
                                    if (this.props.trips.get('loading')) {
                                        return (
                                            <tr className="trip-list-row-no-trips">
                                                <td className="trip-list-no-trips" colSpan={3}>
                                                    <FontAwesome
                                                        name="refresh"
                                                        size="2x"
                                                        spin
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    }

                                    if (this.props.trips.get('list').size > 0) {
                                        return this.props.trips.get('list').map(trip => {
                                            return (
                                                <tr key={trip.get('rowNumber')} className={this.getClassName(trip)} onClick={this.selectRow.bind(this, trip)}>
                                                    <td className="trip-list-column-number">
                                                        <div className="trip-list-row-number">
                                                            {trip.get('rowNumber') + 1}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {new moment(trip.get('localStartTime')).format('hh:mm A')}
                                                    </td>
                                                    <td>
                                                        {new moment(trip.get('localEndTime')).format('hh:mm A')}
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
                </div>
            </section>
        )
    }
});

module.exports = TripList;
