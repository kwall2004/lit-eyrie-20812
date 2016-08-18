import React from 'react';

const VehiclePicker = React.createClass({
    componentWillMount() {
        if (!this.props.vehicles.get('stored')) this.props.getVehicles();
    },
    render() {
        return (
            <section>
                <div className="vehicle-picker">
                    <div className="container">
                        <div className="vehicle-picker-top-row">
                            <div className="vehicle-picker-left-column">
                                <i className="sprite sprite-icon-main-vehicle"></i>
                                <div className="vehicle-picker-title">
                                    <div className="vehicle-picker-title-relative">
                                        <span className="accent-number">
                                            {this.props.vehicles.get('loading') ? 'loading...' : this.props.vehicles.get('list').size}
                                        </span>
                                        <span className="accent-description">
                                            Vehicle<span>{this.props.vehicles.get('list').size !== 1 ? 's' : ''}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
});

module.exports = VehiclePicker;
