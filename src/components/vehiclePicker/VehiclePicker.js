import React from 'react';
import kuicombobox from 'kendo-ui-core/js/kendo.combobox.js';
import $ from 'jquery';

const VehiclePicker = React.createClass({
    componentWillMount() {
        if (!this.props.vehicles.get('stored')) this.props.getVehicles();
    },

    componentDidMount() {
        var self = this;

        this.vehiclePicker = new kuicombobox.ui.ComboBox(
            this.refs.vehiclePicker,
            {
                dataTextField: 'name',
                dataValueField: 'vehicleId',
                filter: 'contains',
                dataSource: {
                    data: this.props.vehicles.get('list').toJS()
                },
                template: '<span class="k-state-default"><h4>#: data.name #</h4><p>#: data.userName # (#: data.userId #)</p></span>',
                open: this.openVehicleSelect
            }
        );

        $(this.vehiclePicker.wrapper).find('.k-select').on('click', function(e) {
            self.vehiclePicker.dataSource.filter([]);
        });
    },

    componentWillReceiveProps(nextProps) {
        if (this.vehiclePicker.setDataSource) {
            if (nextProps.vehicles) {
                this.vehiclePicker.setDataSource({
                    data: nextProps.vehicles.get('list').toJS()
                });
            }
        }
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
                            <div>
                                <div className="vehicle-picker-right-column">
                                    <span className="input-label">
                                        Select Vehicle
                                    </span>
                                    <input ref="vehiclePicker" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    },

    openVehicleSelect() {
        $('.k-list-container').css('font-size', '14px');
    }
});

module.exports = VehiclePicker;
