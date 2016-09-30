import 'kendo-ui-web/content/kendo.common-bootstrap.min.css';
import 'kendo-ui-web/content/kendo.bootstrap.min.css';
import $ from 'jquery';
import kendo from 'kendo-ui-web/scripts/kendo.combobox.min';
import React from 'react';
import ReactDOM from 'react-dom';
import data from './moment-timezone-meta.json';
import Center from './Center';

const TimeZoneMap = React.createClass({
  componentDidMount() {
    var element = ReactDOM.findDOMNode(this);

    this.$map = $('.map-inset', element);
    this.$labelName = $('.map-label-name', element);
    this.$labelTime = $('.map-label-time', element);
    this.$axisX = $('.map-axis-x', element);
    this.$axisY = $('.map-axis-y', element);
    this.width = this.$map.outerWidth();
    this.height = this.$map.outerHeight();
    this.lastCenter;
    this.centers = [];
    this.names = [];

    $(window).resize(this.resizer);

    this.$map.mousemove(this.mouseMove);
    this.$map.mouseout(this.mouseOut);
    this.$map.click(this.mouseClick);

    for (var i = 0; i < data.length; i++) {
      this.centers.push(new Center(this, data[i]));
      this.names.push(data[i].name);
    }

    // if (self.selectedTimeZone()) {
    //     var center = findCenterByName(self.selectedTimeZone())
    //     if (typeof center !== 'undefined') {
    //         changeCenter(center);
    //     }
    // }

    var element = ReactDOM.findDOMNode(this.refs.selectedTimeZoneComboBox);

    this.comboBox = new kendo.ui.ComboBox(element, {
      dataSource: {
        data: this.names
      },
      filter: "contains",
      // value: self.selectedTimeZone(),
      change: (e) => {
        var name = e.sender.value();
        var center = this.findCenterByName(name);
        if (typeof center !== 'undefined') {
          this.changeCenter(center);
        }

        // self.updatedTimeZone(name);
      }
    });
  },

  //don't run render again, create widget once, then leave it alone
  shouldComponentUpdate() {
    return false;
  },

  componentWillUnmount() {
    $(window).off('resize', this.resizer);

    this.$map.off("mousemove", this.mouseMove);
    this.$map.off("click", this.mouseClick);
    this.$map.off("mouseout", this.mouseOut);
  },

  render() {
    return (
      <div className="map time-zone-map">
        <div className="dashboard-widget-title"><span>Time Zone</span></div>
        <div className="time-zone-controls">
          <div ref="selectedTimeZoneComboBox"></div>
          <div className="map-wrap">
            <div className="map-inset">
              <div className="map-axis-x" style={{left: '90.8796388888889%'}}></div>
              <div className="map-axis-y" style={{top: '54.7222222222222%'}}></div>
              <span style={{left: '50.4213055555556%', top: '26.3888888888889%'}}></span>
              <span style={{left: '65.3611111111111%', top: '35.9444444444444%'}}></span>
              <span style={{left: '69.2222222222222%', top: '30.8240555555556%'}}></span>
              <span style={{left: '33.2777777777778%', top: '40.5277777777778%'}}></span>
              <span style={{left: '32.5185277777778%', top: '39.8888888888889%'}}></span>
              <span style={{left: '55.50925%', top: '27.0370555555556%'}}></span>
              <span style={{left: '62.3611111111111%', top: '27.6759444444444%'}}></span>
              <span style={{left: '53.6759166666667%', top: '54%'}}></span>
              <span style={{left: '96.2777777777778%', top: '92.3148333333333%'}}></span>
              <span style={{left: '31.1481388888889%', top: '86.9073888888889%'}}></span>
              <span style={{left: '32.25%', top: '85.1111111111111%'}}></span>
              <span style={{left: '67.4675833333333%', top: '86.8888888888889%'}}></span>
              <span style={{left: '71.6574166666667%', top: '87.4537222222222%'}}></span>
              <span style={{left: '80.6990833333333%', top: '86.5092777777778%'}}></span>
              <span style={{left: '79.6944444444444%', top: '93.1111111111111%'}}></span>
              <span style={{left: '88.8935277777778%', top: '86.2962777777778%'}}></span>
              <span style={{left: '60.9972222222222%', top: '88.3299444444444%'}}></span>
              <span style={{left: '50.7041666666667%', top: '89.9936666666667%'}}></span>
              <span style={{left: '34.0138888888889%', top: '68.5555555555556%'}}></span>
              <span style={{left: '32.2731388888889%', top: '67%'}}></span>
              <span style={{left: '32.0601944444445%', top: '62.8981666666667%'}}></span>
              <span style={{left: '32.0277777777778%', top: '63.2315%'}}></span>
              <span style={{left: '32.0046388888889%', top: '63.9907222222222%'}}></span>
              <span style={{left: '32.1620277777778%', top: '65.2962777777778%'}}></span>
              <span style={{left: '31.9027777777778%', top: '65.8703888888889%'}}></span>
              <span style={{left: '31.2546388888889%', top: '66.9259444444444%'}}></span>
              <span style={{left: '31.3379722222222%', top: '67.2870555555556%'}}></span>
              <span style={{left: '31.7638888888889%', top: '68.1573888888889%'}}></span>
              <span style={{left: '30.8935277777778%', top: '77.9815%'}}></span>
              <span style={{left: '31.1944444444444%', top: '79.5555555555555%'}}></span>
              <span style={{left: '2.97222222222222%', top: '57.6296111111111%'}}></span>
              <span style={{left: '54.5370277777778%', top: '23.2129444444444%'}}></span>
              <span style={{left: '94.1898055555556%', top: '66.9166666666667%'}}></span>
              <span style={{left: '94.1527777777778%', top: '79.7222222222222%'}}></span>
              <span style={{left: '90.9213055555556%', top: '72.8426111111111%'}}></span>
              <span style={{left: '89.9629722222222%', top: '71.1481666666667%'}}></span>
              <span style={{left: '90.2685277777778%', top: '70.1018333333333%'}}></span>
              <span style={{left: '92.0046388888889%', top: '67.8518333333333%'}}></span>
              <span style={{left: '89.2916666666667%', top: '66.6944444444444%'}}></span>
              <span style={{left: '92.50925%', top: '64.7407222222222%'}}></span>
              <span style={{left: '91.3888888888889%', top: '60.9629444444444%'}}></span>
              <span style={{left: '88.4953611111111%', top: '68.3796111111111%'}}></span>
              <span style={{left: '86.3425833333333%', top: '56.4073888888889%'}}></span>
              <span style={{left: '82.1805555555556%', top: '66.6944444444444%'}}></span>
              <span style={{left: '85.7963055555556%', top: '66.8240555555556%'}}></span>
              <span style={{left: '31.1018611111111%', top: '43.0555555555556%'}}></span>
              <span style={{left: '55.5416666666667%', top: '16.6111111111111%'}}></span>
              <span style={{left: '63.8472222222222%', top: '27.5648333333333%'}}></span>
              <span style={{left: '55.11575%', top: '25.6296111111111%'}}></span>
              <span style={{left: '33.7824166666667%', top: '42.7222222222222%'}}></span>
              <span style={{left: '75.11575%', top: '36.8240555555556%'}}></span>
              <span style={{left: '51.2036944444444%', top: '21.7592777777778%'}}></span>
              <span style={{left: '49.86575%', top: '43.1296111111111%'}}></span>
              <span style={{left: '56.4768611111111%', top: '26.2870555555556%'}}></span>
              <span style={{left: '64.0509166666667%', top: '35.3426111111111%'}}></span>
              <span style={{left: '58.1574166666667%', top: '51.4537222222222%'}}></span>
              <span style={{left: '50.7268611111111%', top: '46.3981666666667%'}}></span>
              <span style={{left: '33.0138888888889%', top: '40.0648333333333%'}}></span>
              <span style={{left: '32.4351944444444%', top: '32.0648333333333%'}}></span>
              <span style={{left: '81.9213055555556%', top: '47.2592777777778%'}}></span>
              <span style={{left: '31.1527777777778%', top: '58.6111111111111%'}}></span>
              <span style={{left: '31.1879722222222%', top: '43.2495555555556%'}}></span>
              <span style={{left: '41.2268611111111%', top: '51.1944444444444%'}}></span>
              <span style={{left: '36.8009166666667%', top: '50.3055555555556%'}}></span>
              <span style={{left: '39.5833333333333%', top: '51.2685%'}}></span>
              <span style={{left: '40.8055555555556%', top: '54.4166666666667%'}}></span>
              <span style={{left: '36.7222222222222%', top: '53.7777777777778%'}}></span>
              <span style={{left: '40.4768611111111%', top: '54.6296111111111%'}}></span>
              <span style={{left: '39.5879722222222%', top: '56.1203888888889%'}}></span>
              <span style={{left: '37.3935277777778%', top: '62.4815%'}}></span>
              <span style={{left: '35.1713055555556%', top: '60.8611111111111%'}}></span>
              <span style={{left: '34.4675833333333%', top: '58.0092777777778%'}}></span>
              <span style={{left: '35.24075%', top: '50.8703888888889%'}}></span>
              <span style={{left: '32.75%', top: '54.0185%'}}></span>
              <span style={{left: '33.5185277777778%', top: '48.4351666666667%'}}></span>
              <span style={{left: '33.3379722222222%', top: '51.5926111111111%'}}></span>
              <span style={{left: '31.0740833333333%', top: '52.9629444444444%'}}></span>
              <span style={{left: '31.6111111111111%', top: '54.4629444444444%'}}></span>
              <span style={{left: '28.7083333333333%', top: '36.0648333333333%'}}></span>
              <span style={{left: '74.9027777777778%', top: '34.7407222222222%'}}></span>
              <span style={{left: '57.1990833333333%', top: '62.9722222222222%'}}></span>
              <span style={{left: '57.6574166666667%', top: '20.0555555555556%'}}></span>
              <span style={{left: '25.6111111111111%', top: '40.2777777777778%'}}></span>
              <span style={{left: '35.7546388888889%', top: '23.5740555555556%'}}></span>
              <span style={{left: '32.6666666666667%', top: '25.1944444444444%'}}></span>
              <span style={{left: '33.875%', top: '24.3333333333333%'}}></span>
              <span style={{left: '32.4398055555556%', top: '24.3888888888889%'}}></span>
              <span style={{left: '33.4490833333333%', top: '20.3703888888889%'}}></span>
              <span style={{left: '34.1990833333333%', top: '21.4351666666667%'}}></span>
              <span style={{left: '28.1620277777778%', top: '25.75%'}}></span>
              <span style={{left: '25.6296388888889%', top: '22.7685%'}}></span>
              <span style={{left: '25.3472222222222%', top: '23.1203888888889%'}}></span>
              <span style={{left: '31.24075%', top: '14.5926111111111%'}}></span>
              <span style={{left: '32.1481388888889%', top: '13.2592777777778%'}}></span>
              <span style={{left: '24.1192222222222%', top: '8.50244444444444%'}}></span>
              <span style={{left: '24.8949166666667%', top: '22.9118888888889%'}}></span>
              <span style={{left: '24.4675277777778%', top: '15.1018333333333%'}}></span>
              <span style={{left: '23.0972222222222%', top: '22.2870555555556%'}}></span>
              <span style={{left: '24.0463055555556%', top: '22.9351666666667%'}}></span>
              <span style={{left: '21.2916666666667%', top: '22%'}}></span>
              <span style={{left: '20.50925%', top: '22.0648333333333%'}}></span>
              <span style={{left: '18.74075%', top: '20.25%'}}></span>
              <span style={{left: '20.848%', top: '11.6033888888889%'}}></span>
              <span style={{left: '18.4305555555556%', top: '15.3055555555556%'}}></span>
              <span style={{left: '13.2546388888889%', top: '12.0279444444444%'}}></span>
              <span style={{left: '17.9213055555556%', top: '22.7222222222222%'}}></span>
              <span style={{left: '16.7314722222222%', top: '16.7962777777778%'}}></span>
              <span style={{left: '15.86575%', top: '22.6296111111111%'}}></span>
              <span style={{left: '12.5138888888889%', top: '16.2685%'}}></span>
              <span style={{left: '11.5046388888889%', top: '14.4073888888889%'}}></span>
              <span style={{left: '76.9213055555556%', top: '56.5740555555555%'}}></span>
              <span style={{left: '54.25%', top: '52.0555555555556%'}}></span>
              <span style={{left: '57.6296388888889%', top: '55.7407222222222%'}}></span>
              <span style={{left: '55.1620277777778%', top: '47.5740555555556%'}}></span>
              <span style={{left: '54.2453611111111%', top: '52.0740555555556%'}}></span>
              <span style={{left: '52.3703611111111%', top: '23.6759444444444%'}}></span>
              <span style={{left: '48.8981388888889%', top: '47.0462777777778%'}}></span>
              <span style={{left: '6.04630555555555%', top: '61.5370555555556%'}}></span>
              <span style={{left: '30.74075%', top: '68.0833333333333%'}}></span>
              <span style={{left: '19.8425833333333%', top: '64.9166666666667%'}}></span>
              <span style={{left: '52.6944444444444%', top: '47.75%'}}></span>
              <span style={{left: '83.74075%', top: '32.6481666666667%'}}></span>
              <span style={{left: '74.3286944444444%', top: '25.6666666666667%'}}></span>
              <span style={{left: '29.4675833333333%', top: '47.4444444444445%'}}></span>
              <span style={{left: '26.6898055555556%', top: '44.4815%'}}></span>
              <span style={{left: '27.3240833333333%', top: '37.1481666666667%'}}></span>
              <span style={{left: '43.7546388888889%', top: '41.7129444444444%'}}></span>
              <span style={{left: '30.8333333333333%', top: '43.2315%'}}></span>
              <span style={{left: '79.36575%', top: '55.3240555555556%'}}></span>
              <span style={{left: '59.2685277777778%', top: '30.4629444444444%'}}></span>
              <span style={{left: '54.00925%', top: '22.1759444444444%'}}></span>
              <span style={{left: '53.7129722222222%', top: '20.8333333333333%'}}></span>
              <span style={{left: '52.4120277777778%', top: '23.5%'}}></span>
              <span style={{left: '61.9861111111111%', top: '43.5555555555556%'}}></span>
              <span style={{left: '53.4953611111111%', top: '19.0740555555556%'}}></span>
              <span style={{left: '33.1666666666667%', top: '41.5%'}}></span>
              <span style={{left: '31.0833333333333%', top: '39.7407222222222%'}}></span>
              <span style={{left: '50.8472222222222%', top: '29.5648333333333%'}}></span>
              <span style={{left: '28.2870277777778%', top: '51.0185%'}}></span>
              <span style={{left: '25.4444444444444%', top: '49.5%'}}></span>
              <span style={{left: '56.875%', top: '16.9907222222222%'}}></span>
              <span style={{left: '58.6805555555556%', top: '33.3055555555556%'}}></span>
              <span style={{left: '46.4444444444444%', top: '34.9166666666667%'}}></span>
              <span style={{left: '60.8009166666667%', top: '41.4815%'}}></span>
              <span style={{left: '49.3564722222222%', top: '27.5555555555556%'}}></span>
              <span style={{left: '48.6990833333333%', top: '30.0648333333333%'}}></span>
              <span style={{left: '45.9444444444444%', top: '34.3888888888889%'}}></span>
              <span style={{left: '60.75%', top: '44.9815%'}}></span>
              <span style={{left: '56.9351944444445%', top: '16.5740555555556%'}}></span>
              <span style={{left: '99.5601944444444%', top: '59.9259444444445%'}}></span>
              <span style={{left: '34.4027777777778%', top: '77.9444444444444%'}}></span>
              <span style={{left: '92.1620277777778%', top: '45.8796111111111%'}}></span>
              <span style={{left: '93.9490833333333%', top: '46.1296111111111%'}}></span>
              <span style={{left: '95.2731388888889%', top: '47.0462777777778%'}}></span>
              <span style={{left: '48.5463055555556%', top: '15.5462777777778%'}}></span>
              <span style={{left: '50.6481388888889%', top: '22.8518333333333%'}}></span>
              <span style={{left: '52.625%', top: '49.7870555555556%'}}></span>
              <span style={{left: '50.0348055555556%', top: '21.3842777777778%'}}></span>
              <span style={{left: '33.2638888888889%', top: '43.3055555555556%'}}></span>
              <span style={{left: '62.4490833333333%', top: '26.8240555555556%'}}></span>
              <span style={{left: '35.6481388888889%', top: '47.2592777777778%'}}></span>
              <span style={{left: '49.5925833333333%', top: '22.5277777777778%'}}></span>
              <span style={{left: '50.0601944444445%', top: '46.9166666666667%'}}></span>
              <span style={{left: '48.7083333333333%', top: '29.9259444444444%'}}></span>
              <span style={{left: '36.0370277777778%', top: '14.3426111111111%'}}></span>
              <span style={{left: '45.1851944444444%', top: '7.35183333333333%'}}></span>
              <span style={{left: '44.4351944444445%', top: '10.8426111111111%'}}></span>
              <span style={{left: '31.3286944444444%', top: '7.46294444444445%'}}></span>
              <span style={{left: '45.7361111111111%', top: '42.5185%'}}></span>
              <span style={{left: '46.5879722222222%', top: '44.7129444444444%'}}></span>
              <span style={{left: '33.2036944444444%', top: '40.9815%'}}></span>
              <span style={{left: '52.4398055555556%', top: '47.9166666666667%'}}></span>
              <span style={{left: '56.5879722222222%', top: '28.9073888888889%'}}></span>
              <span style={{left: '40.1481388888889%', top: '79.8518333333333%'}}></span>
              <span style={{left: '25.1435277777778%', top: '41.8703888888889%'}}></span>
              <span style={{left: '90.2083333333333%', top: '42.5185%'}}></span>
              <span style={{left: '45.9953611111111%', top: '43.4166666666667%'}}></span>
              <span style={{left: '33.9351944444444%', top: '46.2222222222222%'}}></span>
              <span style={{left: '81.7083333333333%', top: '37.6203888888889%'}}></span>
              <span style={{left: '25.8935277777778%', top: '42.1666666666667%'}}></span>
              <span style={{left: '54.4351944444445%', top: '24.5555555555556%'}}></span>
              <span style={{left: '30.0925833333333%', top: '39.7037222222222%'}}></span>
              <span style={{left: '55.3009166666667%', top: '23.6111111111111%'}}></span>
              <span style={{left: '79.6666666666667%', top: '53.2407222222222%'}}></span>
              <span style={{left: '80.3703611111111%', top: '49.9815%'}}></span>
              <span style={{left: '83.1666666666667%', top: '52.7129444444444%'}}></span>
              <span style={{left: '89.0833333333333%', top: '50.8148333333333%'}}></span>
              <span style={{left: '48.4027777777778%', top: '20.3703888888889%'}}></span>
              <span style={{left: '59.7844166666667%', top: '32.3441111111111%'}}></span>
              <span style={{left: '49.0185277777778%', top: '19.9166666666667%'}}></span>
              <span style={{left: '74.5463055555556%', top: '37.4815%'}}></span>
              <span style={{left: '70.11575%', top: '53.7037222222222%'}}></span>
              <span style={{left: '62.3379722222222%', top: '31.4722222222222%'}}></span>
              <span style={{left: '64.2870277777778%', top: '30.1851666666667%'}}></span>
              <span style={{left: '44.4027777777778%', top: '14.3611111111111%'}}></span>
              <span style={{left: '53.4675833333333%', top: '26.7222222222222%'}}></span>
              <span style={{left: '49.4768611111111%', top: '22.6666666666667%'}}></span>
              <span style={{left: '29.10925%', top: '40.0177222222222%'}}></span>
              <span style={{left: '59.9814722222222%', top: '32.25%'}}></span>
              <span style={{left: '88.8179722222222%', top: '30.192%'}}></span>
              <span style={{left: '60.2268611111111%', top: '50.3981666666667%'}}></span>
              <span style={{left: '70.7222222222222%', top: '26.1666666666667%'}}></span>
              <span style={{left: '79.1435277777778%', top: '43.5833333333333%'}}></span>
              <span style={{left: '98.0555555555556%', top: '49.2129444444444%'}}></span>
              <span style={{left: '2.52313888888889%', top: '51.5926111111111%'}}></span>
              <span style={{left: '6.48147222222223%', top: '48.9629444444444%'}}></span>
              <span style={{left: '62.0185277777778%', top: '55.7315%'}}></span>
              <span style={{left: '32.9768611111111%', top: '40.3888888888889%'}}></span>
              <span style={{left: '84.9305555555556%', top: '28.3240555555556%'}}></span>
              <span style={{left: '85.2685277777778%', top: '29.1388888888889%'}}></span>
              <span style={{left: '63.3286944444444%', top: '33.7037222222222%'}}></span>
              <span style={{left: '27.6064722222222%', top: '39.2777777777778%'}}></span>
              <span style={{left: '71.375%', top: '25.9722222222222%'}}></span>
              <span style={{left: '68.1851944444445%', top: '25.1111111111111%'}}></span>
              <span style={{left: '65.8796388888889%', top: '22.0648333333333%'}}></span>
              <span style={{left: '63.9629722222222%', top: '25.2685%'}}></span>
              <span style={{left: '64.2638888888889%', top: '21.5462777777778%'}}></span>
              <span style={{left: '78.5%', top: '40.0185%'}}></span>
              <span style={{left: '59.8611111111111%', top: '31.1759444444444%'}}></span>
              <span style={{left: '33.0555555555556%', top: '42.2129444444444%'}}></span>
              <span style={{left: '52.6435277777778%', top: '23.8055555555556%'}}></span>
              <span style={{left: '72.1805555555556%', top: '46.1481666666667%'}}></span>
              <span style={{left: '47.4398055555556%', top: '46.5%'}}></span>
              <span style={{left: '57.6388888888889%', top: '65.8518333333333%'}}></span>
              <span style={{left: '57.0324166666667%', top: '19.6203888888889%'}}></span>
              <span style={{left: '51.7083333333333%', top: '22.4444444444444%'}}></span>
              <span style={{left: '56.6944444444445%', top: '18.3611111111111%'}}></span>
              <span style={{left: '53.6620277777778%', top: '31.7222222222222%'}}></span>
              <span style={{left: '48.2175833333333%', top: '31.3055555555556%'}}></span>
              <span style={{left: '52.0509166666667%', top: '25.7222222222222%'}}></span>
              <span style={{left: '58.00925%', top: '23.8888888888889%'}}></span>
              <span style={{left: '55.3518611111111%', top: '26.4259444444444%'}}></span>
              <span style={{left: '32.5231388888889%', top: '39.9629444444444%'}}></span>
              <span style={{left: '63.1990833333333%', top: '59.4907222222222%'}}></span>
              <span style={{left: '97.5555555555556%', top: '46.0277777777778%'}}></span>
              <span style={{left: '96.4814722222222%', top: '44.9537222222222%'}}></span>
              <span style={{left: '55.9536944444444%', top: '26.6759444444444%'}}></span>
              <span style={{left: '47.7777777777778%', top: '42.9722222222222%'}}></span>
              <span style={{left: '76.7129722222222%', top: '40.6759444444445%'}}></span>
              <span style={{left: '79.6898055555556%', top: '23.3796111111111%'}}></span>
              <span style={{left: '75.4583333333333%', top: '23.3240555555556%'}}></span>
              <span style={{left: '81.8055555555556%', top: '23.2962777777778%'}}></span>
              <span style={{left: '81.5509166666667%', top: '37.6481666666667%'}}></span>
              <span style={{left: '90.4861111111111%', top: '41.5555555555556%'}}></span>
              <span style={{left: '33.0786944444444%', top: '41.8888888888889%'}}></span>
              <span style={{left: '46.0972222222222%', top: '39.9444444444445%'}}></span>
              <span style={{left: '32.8379722222222%', top: '40.7129444444444%'}}></span>
              <span style={{left: '54.0324166666667%', top: '30.0555555555556%'}}></span>
              <span style={{left: '65.9722222222222%', top: '61.0185%'}}></span>
              <span style={{left: '70.4166666666667%', top: '47.6851666666667%'}}></span>
              <span style={{left: '59.7222222222222%', top: '57.8981666666667%'}}></span>
              <span style={{left: '22.5416666666667%', top: '39.2222222222222%'}}></span>
              <span style={{left: '26.3240833333333%', top: '38.2870555555556%'}}></span>
              <span style={{left: '25.4490833333333%', top: '38.3518333333333%'}}></span>
              <span style={{left: '22.3101944444444%', top: '35.7407222222222%'}}></span>
              <span style={{left: '23.1944444444444%', top: '35.6481666666667%'}}></span>
              <span style={{left: '20.6713055555556%', top: '37.1018333333333%'}}></span>
              <span style={{left: '20.5786944444444%', top: '34.0926111111111%'}}></span>
              <span style={{left: '21.2268611111111%', top: '33.5740555555556%'}}></span>
              <span style={{left: '19.7129722222222%', top: '33.8518333333333%'}}></span>
              <span style={{left: '17.5046388888889%', top: '31.9259444444444%'}}></span>
              <span style={{left: '18.5740833333333%', top: '33.1666666666667%'}}></span>
              <span style={{left: '20.9027777777778%', top: '38.4444444444445%'}}></span>
              <span style={{left: '78.25%', top: '48.2407222222222%'}}></span>
              <span style={{left: '80.6481388888889%', top: '49.1388888888889%'}}></span>
              <span style={{left: '59.0509166666667%', top: '63.3518333333333%'}}></span>
              <span style={{left: '54.75%', top: '61.9073888888889%'}}></span>
              <span style={{left: '96.2361111111111%', top: '62.0740555555556%'}}></span>
              <span style={{left: '50.5879722222222%', top: '42.4907222222222%'}}></span>
              <span style={{left: '96.6574166666667%', top: '66.0833333333333%'}}></span>
              <span style={{left: '50.9444444444445%', top: '46.4166666666667%'}}></span>
              <span style={{left: '26.1898055555556%', top: '43.25%'}}></span>
              <span style={{left: '51.3611111111111%', top: '20.9073888888889%'}}></span>
              <span style={{left: '52.9861111111111%', top: '16.7129444444444%'}}></span>
              <span style={{left: '73.6990833333333%', top: '34.6018333333333%'}}></span>
              <span style={{left: '96.36575%', top: '49.7129444444444%'}}></span>
              <span style={{left: '3.31019444444444%', top: '60.5462777777778%'}}></span>
              <span style={{left: '98.5463055555556%', top: '69.5185%'}}></span>
              <span style={{left: '1.26388888888889%', top: '73.3611111111111%'}}></span>
              <span style={{left: '66.2731388888889%', top: '36.8888888888889%'}}></span>
              <span style={{left: '28.2036944444444%', top: '45.0185%'}}></span>
              <span style={{left: '28.625%', top: '56.6388888888889%'}}></span>
              <span style={{left: '8.76852777777778%', top: '59.1481666666667%'}}></span>
              <span style={{left: '11.5277777777778%', top: '55%'}}></span>
              <span style={{left: '13.0416666666667%', top: '62.7037222222222%'}}></span>
              <span style={{left: '90.8796388888889%', top: '54.7222222222222%'}}></span>
              <span style={{left: '93.2129722222222%', top: '53.2129444444444%'}}></span>
              <span style={{left: '83.6111111111111%', top: '41.8981666666667%'}}></span>
              <span style={{left: '68.625%', top: '36.1851666666667%'}}></span>
              <span style={{left: '55.8333333333333%', top: '20.9722222222222%'}}></span>
              <span style={{left: '34.5370277777778%', top: '23.8611111111111%'}}></span>
              <span style={{left: '13.9120277777778%', top: '63.8518333333333%'}}></span>
              <span style={{left: '31.6961388888889%', top: '39.7398333333333%'}}></span>
              <span style={{left: '59.5740833333333%', top: '32.5%'}}></span>
              <span style={{left: '59.7486111111111%', top: '32.4815%'}}></span>
              <span style={{left: '47.5370277777778%', top: '28.4907222222222%'}}></span>
              <span style={{left: '45.8055555555556%', top: '31.8703888888889%'}}></span>
              <span style={{left: '43.24075%', top: '29.0370555555556%'}}></span>
              <span style={{left: '87.3564722222222%', top: '45.9259444444445%'}}></span>
              <span style={{left: '34.3518611111111%', top: '63.7407222222222%'}}></span>
              <span style={{left: '64.3148055555556%', top: '35.9537222222222%'}}></span>
              <span style={{left: '65.4074166666667%', top: '60.6296111111111%'}}></span>
              <span style={{left: '57.25%', top: '25.3148333333333%'}}></span>
              <span style={{left: '55.6944444444444%', top: '25.0926111111111%'}}></span>
              <span style={{left: '55.6944444444444%', top: '19.6018333333333%'}}></span>
              <span style={{left: '60.4493888888889%', top: '19.0245555555556%'}}></span>
              <span style={{left: '59.4722222222222%', top: '25.0277777777778%'}}></span>
              <span style={{left: '62.3379722222222%', top: '22.9259444444444%'}}></span>
              <span style={{left: '63.9305555555556%', top: '20.4444444444444%'}}></span>
              <span style={{left: '66.8333333333333%', top: '18.4166666666667%'}}></span>
              <span style={{left: '70.3888888888889%', top: '19.4444444444444%'}}></span>
              <span style={{left: '73.0324166666667%', top: '19.4259444444444%'}}></span>
              <span style={{left: '74.1990833333333%', top: '20.1388888888889%'}}></span>
              <span style={{left: '75.7870277777778%', top: '18.8796111111111%'}}></span>
              <span style={{left: '78.9814722222222%', top: '20.9629444444444%'}}></span>
              <span style={{left: '81.5185277777778%', top: '21.0833333333333%'}}></span>
              <span style={{left: '86.0185277777778%', top: '15.5555555555556%'}}></span>
              <span style={{left: '87.6538611111111%', top: '15.1908888888889%'}}></span>
              <span style={{left: '86.6481388888889%', top: '26.0185%'}}></span>
              <span style={{left: '89.6388888888889%', top: '23.9073888888889%'}}></span>
              <span style={{left: '89.7851944444444%', top: '14.1331666666667%'}}></span>
              <span style={{left: '91.8888888888889%', top: '16.9073888888889%'}}></span>
              <span style={{left: '92.6990833333333%', top: '12.5185%'}}></span>
              <span style={{left: '94.0694444444444%', top: '20.5462777777778%'}}></span>
              <span style={{left: '99.3009166666667%', top: '14.0277777777778%'}}></span>
              <span style={{left: '58.3518611111111%', top: '50.0277777777778%'}}></span>
              <span style={{left: '62.9768611111111%', top: '36.3148333333333%'}}></span>
              <span style={{left: '94.5%', top: '54.7037222222222%'}}></span>
              <span style={{left: '65.4074166666667%', top: '51.8518333333333%'}}></span>
              <span style={{left: '59.0370277777778%', top: '41.3333333333333%'}}></span>
              <span style={{left: '55.0138888888889%', top: '17.0370555555556%'}}></span>
              <span style={{left: '78.8472222222222%', top: '49.2870555555556%'}}></span>
              <span style={{left: '48.8055555555556%', top: '57.8240555555556%'}}></span>
              <span style={{left: '54.0324166666667%', top: '24.4166666666667%'}}></span>
              <span style={{left: '54.4444444444444%', top: '6.66666666666667%'}}></span>
              <span style={{left: '54.7546388888889%', top: '23.25%'}}></span>
              <span style={{left: '46.4583333333333%', top: '45.2777777777778%'}}></span>
              <span style={{left: '53.4629722222222%', top: '25.6018333333333%'}}></span>
              <span style={{left: '45.3981388888889%', top: '41.8518333333333%'}}></span>
              <span style={{left: '62.6018611111111%', top: '48.8518333333333%'}}></span>
              <span style={{left: '34.7685277777778%', top: '46.7592777777778%'}}></span>
              <span style={{left: '58.7777777777778%', top: '47.3055555555556%'}}></span>
              <span style={{left: '51.8703611111111%', top: '49.8148333333333%'}}></span>
              <span style={{left: '25.3333333333333%', top: '42.3888888888889%'}}></span>
              <span style={{left: '32.5131111111111%', top: '39.9714444444444%'}}></span>
              <span style={{left: '60.0833333333333%', top: '31.3888888888889%'}}></span>
              <span style={{left: '58.6388888888889%', top: '64.2777777777778%'}}></span>
              <span style={{left: '30.3148055555556%', top: '38.0740555555556%'}}></span>
              <span style={{left: '54.1805555555556%', top: '43.2685%'}}></span>
              <span style={{left: '69.5048611111111%', top: '77.0262222222222%'}}></span>
              <span style={{left: '50.3379722222222%', top: '46.5926111111111%'}}></span>
              <span style={{left: '77.9213055555556%', top: '42.3611111111111%'}}></span>
              <span style={{left: '69.1111111111111%', top: '28.5648333333333%'}}></span>
              <span style={{left: '2.56480555555556%', top: '54.7962777777778%'}}></span>
              <span style={{left: '84.88425%', top: '54.1388888888889%'}}></span>
              <span style={{left: '66.2175833333333%', top: '28.9166666666667%'}}></span>
              <span style={{left: '52.8286944444444%', top: '29.5555555555556%'}}></span>
              <span style={{left: '1.43519444444444%', top: '61.5740555555556%'}}></span>
              <span style={{left: '58.0463055555556%', top: '27.2129444444444%'}}></span>
              <span style={{left: '33.1990833333333%', top: '44.0833333333333%'}}></span>
              <span style={{left: '99.7824166666667%', top: '54.1573888888889%'}}></span>
              <span style={{left: '83.75%', top: '36.0833333333333%'}}></span>
              <span style={{left: '60.9120277777778%', top: '52.8888888888889%'}}></span>
              <span style={{left: '58.4768611111111%', top: '21.9815%'}}></span>
              <span style={{left: '56.1944444444445%', top: '22.9907222222222%'}}></span>
              <span style={{left: '59.7685277777778%', top: '23.4259444444444%'}}></span>
              <span style={{left: '59.0046388888889%', top: '49.8240555555556%'}}></span>
              <span style={{left: '3.19908333333333%', top: '40.6944444444444%'}}></span>
              <span style={{left: '0.935194444444447%', top: '34.3240555555556%'}}></span>
              <span style={{left: '96.2824166666667%', top: '39.2870555555556%'}}></span>
              <span style={{left: '29.4462222222222%', top: '27.381%'}}></span>
              <span style={{left: '26.9571666666667%', top: '26.4825555555556%'}}></span>
              <span style={{left: '26.5998333333333%', top: '28.7476666666667%'}}></span>
              <span style={{left: '26.9025555555556%', top: '29.5390555555556%'}}></span>
              <span style={{left: '26.1550277777778%', top: '27.9065%'}}></span>
              <span style={{left: '25.9801666666667%', top: '28.5126666666667%'}}></span>
              <span style={{left: '26.2786388888889%', top: '27.1936666666667%'}}></span>
              <span style={{left: '26.2068611111111%', top: '28.6802222222222%'}}></span>
              <span style={{left: '25.9107222222222%', top: '28.6156111111111%'}}></span>
              <span style={{left: '26.4075555555556%', top: '28.4734444444444%'}}></span>
              <span style={{left: '26.0138888888889%', top: '26.75%'}}></span>
              <span style={{left: '26.3226111111111%', top: '28.9149444444444%'}}></span>
              <span style={{left: '26.2847222222222%', top: '27.0578888888889%'}}></span>
              <span style={{left: '26.0039444444444%', top: '24.9401111111111%'}}></span>
              <span style={{left: '22.0275555555556%', top: '23.8242222222222%'}}></span>
              <span style={{left: '22.0585555555556%', top: '23.975%'}}></span>
              <span style={{left: '22.1605%', top: '23.7421111111111%'}}></span>
              <span style={{left: '21.3845%', top: '27.9226666666667%'}}></span>
              <span style={{left: '17.8340277777778%', top: '25.7702222222222%'}}></span>
              <span style={{left: '18.90925%', top: '31.4176111111111%'}}></span>
              <span style={{left: '17.2896666666667%', top: '31.0821111111111%'}}></span>
              <span style={{left: '13.7712222222222%', top: '19.3739444444444%'}}></span>
              <span style={{left: '8.86119444444444%', top: '15.9899444444444%'}}></span>
              <span style={{left: '12.8943611111111%', top: '17.6100555555556%'}}></span>
              <span style={{left: '12.5838611111111%', top: '18.2353333333333%'}}></span>
              <span style={{left: '11.5908888888889%', top: '16.9183888888889%'}}></span>
              <span style={{left: '4.27955555555555%', top: '14.1660555555556%'}}></span>
              <span style={{left: '1.29391666666666%', top: '21.1777777777778%'}}></span>
              <span style={{left: '6.62730555555556%', top: '38.1628333333333%'}}></span>
              <span style={{left: '34.4953611111111%', top: '68.3981666666667%'}}></span>
              <span style={{left: '68.5555555555556%', top: '27.9629444444444%'}}></span>
              <span style={{left: '69.25%', top: '27.0370555555556%'}}></span>
              <span style={{left: '53.4591944444445%', top: '26.721%'}}></span>
              <span style={{left: '33.1203611111111%', top: '42.6944444444444%'}}></span>
              <span style={{left: '31.9259166666667%', top: '44.1666666666667%'}}></span>
              <span style={{left: '32.3935277777778%', top: '39.75%'}}></span>
              <span style={{left: '32.4814722222222%', top: '39.8055555555556%'}}></span>
              <span style={{left: '79.6296388888889%', top: '44.0277777777778%'}}></span>
              <span style={{left: '96.7824166666667%', top: '59.0740555555556%'}}></span>
              <span style={{left: '1.15741666666666%', top: '57.0555555555556%'}}></span>
              <span style={{left: '2.70369444444445%', top: '56.7592777777778%'}}></span>
              <span style={{left: '62.5555555555556%', top: '42.9166666666667%'}}></span>
              <span style={{left: '62.5648055555555%', top: '56.2315%'}}></span>
              <span style={{left: '57.7777777777778%', top: '64.3055555555556%'}}></span>
              <span style={{left: '57.8564722222222%', top: '58.1018333333333%'}}></span>
              <span style={{left: '58.625%', top: '58.9815%'}}></span>
            </div>
          </div>
          <h3 className="map-label">
            <span className="map-label-name"></span>
            <span className="map-label-time"></span>
          </h3>
        </div>
      </div>
    )
  },

  findCenterByName(name) {
    return this.centers.find((value, index) => { return value.name === name });
  },

  resizer() {
    this.width = this.$map.outerWidth();
    this.height = this.$map.outerHeight();
  },

  // mouseOut(e) {
  //   var center = this.findCenterByName(self.selectedTimeZone())
  //   if (typeof center !== 'undefined') {
  //     changeCenter(center);
  //   }
  // },

  mouseMove(e) {
    var offset = $(this.$map).offset(),
    x = e.pageX - offset.left,
    y = e.pageY - offset.top,
    px = x / this.width,
    py = y / this.height,
    dist,
    closestDist = 100,
    closestCenter,
    i;

    for (i = 0; i < this.centers.length; i++) {
      dist = this.centers[i].distSqr(px, py);
      if (dist < closestDist) {
        closestCenter = this.centers[i];
        closestDist = dist;
      }
    }

    if (closestCenter) {
      this.changeCenter(closestCenter);
    }
  },

  mouseClick(e) {
    var offset = $(this.$map).offset(),
    x = e.pageX - offset.left,
    y = e.pageY - offset.top,
    px = x / this.width,
    py = y / this.height,
    dist,
    closestDist = 100,
    closestCenter,
    i;

    for (i = 0; i < this.centers.length; i++) {
      dist = this.centers[i].distSqr(px, py);
      if (dist < closestDist) {
        closestCenter = this.centers[i];
        closestDist = dist;
      }
    }

    if (closestCenter) {
      this.changeCenter(closestCenter);
      this.updatedTimeZone(this.lastCenter.name);
      //usersettings.set('TimeZone', self.selectedVehicle().vehicleId, self.lastCenter.name);
      this.comboBox.value(this.lastCenter.name);
    }
  },

  changeCenter(center) {
    if (center === this.lastCenter) {
      return;
    } if (this.lastCenter) {
      this.lastCenter.deactivate();
    }
    center.activate();
    this.lastCenter = center;
  }
});

module.exports = TimeZoneMap;
