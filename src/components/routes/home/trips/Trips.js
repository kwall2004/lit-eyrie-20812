import React from 'react';
import VehiclePicker from '../../../widgets/vehiclePicker';

const Trips = React.createClass({
    render() {
        return (
            <section>
                <VehiclePicker
                    {...this.props}
                    iconClassName="sprite sprite-icon-main-trips"
                    number={0}
                    description="Trips"
                    showDatePicker={true}
                />
            </section>
        )
    }
});

module.exports = Trips;
