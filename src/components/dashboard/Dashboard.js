import React from 'react';
import VehiclePicker from '../vehiclePicker';

const Dashboard = React.createClass({
    render() {
        return (
            <div>
                <VehiclePicker {...this.props}>
                </VehiclePicker>
            </div>
        )
    }
});

module.exports = Dashboard;
