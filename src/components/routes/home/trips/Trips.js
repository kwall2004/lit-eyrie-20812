import React from 'react';
import VehiclePicker from '../../../widgets/vehiclePicker';

const Trips = React.createClass({
    render() {
        return (
            <VehiclePicker {...this.props}></VehiclePicker>
        )
    }
});

module.exports = Trips;
