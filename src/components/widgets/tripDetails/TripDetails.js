import React from 'react';
import moment from 'moment';

const TripDetails = React.createClass({
    render() {
        var selectedTrip = this.props.trips.get('selectedTrip');

        return (
            <section>
                <div className="trip-details">
                    <div className="trip-details-table-wrapper">
                        <table>
                            <thead>

                            </thead>
                            <tbody>
                                <tr className="trip-details-table-header">
                                    <td className="trip-details-column-number" rowSpan={2}>
                                        {(() => {
                                            if (selectedTrip) {
                                                return (
                                                    <div className="trip-details-row-number">
                                                        {this.props.trips.getIn(['selectedTrip', 'rowNumber']) + 1}
                                                    </div>
                                                );
                                            }
                                            else {
                                                return (
                                                    <div className="trip-details-row-default">
                                                        Select a trip
                                                    </div>
                                                );
                                            }
                                        })()}
                                    </td>
                                    <td>Trip Start</td>
                                    <td>Trip End</td>
                                    <td>Trip Distance</td>
                                    <td>Trip Events</td>
                                </tr>
                                <tr className="trip-details-table-body">
                                    <td className="trip-details-table-start">
                                        {(() => {
                                            if (selectedTrip) {
                                                return (
                                                    <span>{new moment(selectedTrip.get('localStartTime')).format('hh:mm A')}</span>
                                                )
                                            }
                                            else {
                                                return (
                                                    <span>--</span>
                                                )
                                            }
                                        })()}
                                    </td>
                                    <td className="trip-details-table-end">
                                        {(() => {
                                            if (selectedTrip) {
                                                return (
                                                    <span>{new moment(selectedTrip.get('localEndTime')).format('hh:mm A')}</span>
                                                )
                                            }
                                            else {
                                                return (
                                                    <span>--</span>
                                                )
                                            }
                                        })()}
                                    </td>
                                    <td className="trip-details-table-distance">
                                        {(() => {
                                            if (selectedTrip) {
                                                return (
                                                    <span>{selectedTrip.getIn(['trip', 'tripMileage'])}</span>
                                                )
                                            }
                                            else {
                                                return (
                                                    <span>--</span>
                                                )
                                            }
                                        })()}
                                    </td>
                                    <td className="trip-details-table-events">
                                        <span>--</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        )
    }
});

module.exports = TripDetails;
