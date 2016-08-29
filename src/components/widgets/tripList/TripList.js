import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import moment from 'moment';

const RecentAlerts = React.createClass({
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
                        </table>
                    </div>
                </div>
            </section>
        )
    }
});

module.exports = RecentAlerts;
