import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import L from 'mapbox.js';
import 'leaflet/dist/leaflet.css';
import TripLayer from './helpers/trip_map_layer';
import diff from 'deep-diff';

const TripMap = React.createClass({
    componentDidMount() {
        var self = this;
        var elementNode = ReactDOM.findDOMNode(this.refs.map);

        L.mapbox.accessToken = 'pk.eyJ1Ijoia2V2aW53IiwiYSI6ImNpc2h2Zmo4aTAwN2Yyb3BpcmplYmRrcHkifQ.eR82_M14vFQEzydtlMdZJA';
        L.mapbox.config.FORCE_HTTPS = true;

        this.map = L.mapbox.map(elementNode).setView([20, 0], 2);
        var styleLayer = L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v9', { maxZoom: 19 }).addTo(this.map);

        // var streetsLayer = L.tileLayer(
        //     'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}',
        //     {
        //         attribution: '&copy; <a href="https://www.mapbox.com/map-feedback/"">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        //         accessToken: accessToken
        //     }
        // ).addTo(this.map);
        //
        // this.map.invalidateSize();

        this.map.whenReady(() => {
            this.tripLayer = new TripLayer(this.map, null, null);

            L.control.layers({
                "Streets": styleLayer,
                "Satellite": L.mapbox.styleLayer('mapbox://styles/mapbox/satellite-streets-v9')
            }).addTo(this.map);
        });
    },

    componentWillReceiveProps(nextProps) {
        var data = nextProps.tripJsonData.get('data');
        if (data && diff(data, this.props.tripJsonData.get('data'))) {
            var processedData = this.processDataForGps(data);
            this.tripLayer.updateData(processedData, null);
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
                        style={{height: "100%"}}
                    />
                </div>
            </section>
        )
    },

    processDataForGps(data) {
        var featureCollection = {
            "type": "FeatureCollection",
            "features": [{ // Trip Path
                "type": "Feature",
                "properties": {
                    "eventType": "TripPath",
                    "properties": data.TripProperties
                },
                "geometry": {
                    "type": "LineString",
                    "coordinates": data.TripPath
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
                "type": "Feature",
                "properties": {
                    "eventType": "Trip Start",
                    "properties": data.TripProperties[0]
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": data.TripPath[0]
                }
            });

            featureCollection.features.push({ // Trip Stop
                "type": "Feature",
                "properties": {
                    "eventType": "Trip Stop",
                    "properties": data.TripProperties[data.TripProperties.length - 1]
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": data.TripPath[data.TripPath.length - 1]
                }
            });
        }

        return featureCollection;
    }
});

module.exports = TripMap;
