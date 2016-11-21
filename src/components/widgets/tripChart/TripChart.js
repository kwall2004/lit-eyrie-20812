import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SpeedChart from './speedChart';
import Spinner from 'spin.js';
import diff from 'deep-diff';

const TripChart = React.createClass({
  componentWillReceiveProps(nextProps) {
    var element = ReactDOM.findDOMNode(this.refs.tripChart);

    if (nextProps.trips.get('loadingJson') !== this.props.trips.get('loadingJson')) {
      if (nextProps.trips.get('loadingJson')) {
        if (this.chart) {
          this.chart.remove();
        }

        this.spinner = new Spinner({
          scale: 1.5
        }).spin(element);
      }
      else {
        if (this.spinner) {
          this.spinner.stop();
        }
      }
    }

    var data = nextProps.trips.get('json');
    if (data) {
      if (diff(data, this.props.trips.get('json'))) {
        this.chart = SpeedChart(element, data.Events, 'America/Detroit');

        $(window).on('resize', this.chart.resize);
      }
    }
    else {
      if (this.chart) {
        this.chart.remove();
      }
    }
  },

  //don't run render again, create widget once, then leave it alone
  shouldComponentUpdate() {
    return false;
  },

  componentWillUnmount() {
    if (this.chart) {
      this.chart.remove();
    }
  },

  render() {
    return (
      <section>
        <div className="dashboard-widget-title">
          <span>Speed & RPM Chart</span>
        </div>
        <div
          ref="tripChart"
          className="trip-chart"
          />
      </section>
    )
  },
});

module.exports = TripChart;
