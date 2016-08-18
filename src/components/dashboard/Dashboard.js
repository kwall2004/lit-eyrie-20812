import React from 'react';
import VehiclePicker from '../vehiclePicker';

const Dashboard = React.createClass({
    render() {
        return (
            <VehiclePicker {...this.props}>
            </VehiclePicker>
        )
    }
});

module.exports = Dashboard;
