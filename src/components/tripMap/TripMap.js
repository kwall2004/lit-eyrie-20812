import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const TripMap = React.createClass({
    componentDidMount() {
        var self = this;
        var elementNode = ReactDOM.findDOMNode(this.refs.map);
        var accessToken = 'pk.eyJ1Ijoia2V2aW53IiwiYSI6ImNpc2h2Zmo4aTAwN2Yyb3BpcmplYmRrcHkifQ.eR82_M14vFQEzydtlMdZJA';

        this.map = L.map(elementNode, {
            center: [20, 0],
            zoom: 2
        });

        var streetsLayer = L.tileLayer(
            'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}',
            {
                attribution: '&copy; <a href="https://www.mapbox.com/map-feedback/"">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                accessToken: accessToken
            }
        ).addTo(this.map);

        L.control.layers({
            "Streets": streetsLayer,
            "Satellite": L.tileLayer(
                'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}',
                {
                    attribution: '&copy; <a href="https://www.mapbox.com/map-feedback/"">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    accessToken: accessToken
                }
            )
        }).addTo(this.map);
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.tripJsonData.get('data') && !nextProps.tripJsonData.geoJsonLayer) {
            var geoJsonLayer = L.geoJson(
                this.processDataForGps(nextProps.tripJsonData.get('data')),
                {
                    style: function(feature) {
                        switch (feature.properties.eventType) {
                            case 'TripPath':
                                if (feature.properties.properties.length > 0) {
                                    var gprf = feature.properties.properties[0].GPRF;
                                    if (gprf && gprf == 1) {
                                        self.gprfValid = false;
                                        return { color: "#39f", opacity: 1, fillOpacity: 1 };
                                    } else {
                                        return { color: "transparent", dashArray: "5, 10", opacity: 1, fillOpacity: 1 };
                                    }
                                } else {
                                    return { color: "transparent", dashArray: "5, 10", opacity: 1, fillOpacity: 1 };
                                }
                            case 'Trip Start': return { color: "#ff0000" };
                            case 'Trip Stop': return { color: "#0000ff" };
                            case 'Speeding':
                                if (feature.properties.properties.length > 0) {
                                    var gprf = feature.properties.properties[0].GPRF;
                                    if (gprf && gprf == 1) {
                                        return { color: "#db0022", opacity: 1, fillOpacity: 1 };
                                    } else {
                                        return { color: "transparent", fillOpacity: 0 };
                                    }
                                } else {
                                    return { color: "transparent", dashArray: "5, 10", opacity: 1, fillOpacity: 1 };
                                }
                            case 'Hard Acceleration': return {};
                            case 'Extreme Acceleration': return {};
                            case 'Hard Braking': return {};
                            case 'Extreme Braking': return {};
                        }
                    },
                    pointToLayer: function(feature, latlng) {
                        switch (feature.properties.eventType) {
                            case 'Trip Start':
                                return L.marker(latlng, { icon: startIcon });
                            case 'Trip Stop':
                                return L.marker(latlng, { icon: endIcon });
                            case 'Hard Acceleration':
                                return bindEventPopup(L.marker(latlng, { icon: haIcon }), feature);
                            case 'Extreme Acceleration':
                                return bindEventPopup(L.marker(latlng, { icon: eaIcon }), feature);
                            case 'Hard Braking':
                                return bindEventPopup(L.marker(latlng, { icon: hbIcon }), feature);
                            case 'Extreme Braking':
                                return bindEventPopup(L.marker(latlng, { icon: ebIcon }), feature);
                            default:
                                return L.marker(latlng);
                        }
                    },
                    onEachFeature: function(feature, layer) {
                        switch (feature.properties.eventType) {
                            case 'Trip Start':
                            case 'Trip Stop':
                                layer.on({
                                    click: reverseGeoCodeEvent
                                });
                                break;
                            case 'Speeding':
                                bindEventSpeedPopup(layer, feature);
                                break;
                            default:
                                break;
                        }
                    }
                }
            ).addTo(this.map);
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
