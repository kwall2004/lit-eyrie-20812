import 'leaflet/dist/leaflet.css';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Spinner from 'spin.js';
import L from 'mapbox.js';
import tripGeoJsonLayer from './tripGeoJsonLayer';
import diff from 'deep-diff';

const TripMap = React.createClass({
  processDataForGps(data) {
    var featureCollection = {
      'type': 'FeatureCollection',
      'features': [{ // Trip Path
        'type': 'Feature',
        'properties': {
          'eventType': 'TripPath',
          'properties': data.TripProperties
        },
        'geometry': {
          'type': 'LineString',
          'coordinates': data.TripPath
        }
      }]
    };

    featureCollection.features = featureCollection.features.concat(data.SpeedingPath);
    featureCollection.features = featureCollection.features.concat(data.TripPathBehavior);

    ///////////////////////////////
    // Start / Stop
    ///////////////////////////////
    if (data.TripPath.length > 0) {
      featureCollection.features.push({ // Trip Start
        'type': 'Feature',
        'properties': {
          'eventType': 'Trip Start',
          'properties': data.TripProperties[0]
        },
        'geometry': {
          'type': 'Point',
          'coordinates': data.TripPath[0]
        }
      });

      featureCollection.features.push({ // Trip Stop
        'type': 'Feature',
        'properties': {
          'eventType': 'Trip Stop',
          'properties': data.TripProperties[data.TripProperties.length - 1]
        },
        'geometry': {
          'type': 'Point',
          'coordinates': data.TripPath[data.TripPath.length - 1]
        }
      });
    }

    return featureCollection;
  },

  componentDidMount() {
    var element = ReactDOM.findDOMNode(this.refs.map);

    L.mapbox.accessToken = 'pk.eyJ1Ijoia2V2aW53IiwiYSI6ImNpc2h2Zmo4aTAwN2Yyb3BpcmplYmRrcHkifQ.eR82_M14vFQEzydtlMdZJA';
    L.mapbox.config.FORCE_HTTPS = true;

    this.map = L.mapbox.map(element).setView([20, 0], 2);
    var styleLayer = L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v9', { maxZoom: 19 }).addTo(this.map);

    this.map.whenReady(() => {
      this.tripGeoJsonLayer = new tripGeoJsonLayer(this.map, null, null);

      L.control.layers({
        'Streets': styleLayer,
        'Satellite': L.mapbox.styleLayer('mapbox://styles/mapbox/satellite-streets-v9', { maxZoom: 19 })
      }).addTo(this.map);
    });
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.trips.get('loadingJson') !== this.props.trips.get('loadingJson')) {
      var element = ReactDOM.findDOMNode(this.refs.map);

      if (nextProps.trips.get('loadingJson')) {
        if (this.tripGeoJsonLayer) {
          this.tripGeoJsonLayer.remove();
        }

        this.spinner = new Spinner({
          scale: 2,
          top: '48%'
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
        try {
          var processedData = this.processDataForGps(data);
          this.tripGeoJsonLayer.updateData(processedData, null);
        }
        catch (ex) {
          this.map.setView([20, 0], 2);
        }
      }
    }
    else {
      if (this.tripGeoJsonLayer) {
        this.tripGeoJsonLayer.remove();
      }
      this.map.setView([20, 0], 2);
    }
  },

  //don't run render again, create widget once, then leave it alone
  shouldComponentUpdate() {
    return false;
  },

  componentWillUnmount() {
    this.map.remove();
  },

  render() {
    return (
      <section>
        <div className="trip-map">
          <div
            ref="map"
            className="trip-map-map"
            style={{ height: '100%' }}
            />
        </div>
      </section>
    )
  },
});

module.exports = TripMap;
