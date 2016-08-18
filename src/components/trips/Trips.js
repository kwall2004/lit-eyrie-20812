import React from 'react';
import VehiclePicker from '../vehiclePicker';

const Trips = React.createClass({
    render() {
        return (
            <VehiclePicker {...this.props}>
            </VehiclePicker>
        )
    }
});

module.exports = Trips;
