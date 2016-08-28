import React from 'react';
import VehiclePicker from '../../../widgets/vehiclePicker';

const Trips = React.createClass({
    render() {
        return (
            <section>
                <VehiclePicker {...this.props} />
            </section>
        )
    }
});

module.exports = Trips;
