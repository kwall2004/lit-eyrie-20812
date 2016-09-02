import reversegeocode from './reversegeocode';
import 'leaflet-textpath';

var TripGeoJsonLayer = function (map, geoJsonData, vehicleId) {
    var self = this;
    self.gprfValid = true;
    self.vehicleId = vehicleId;

    var EventIcon = L.Icon.extend({
        options: {
            iconSize: [21, 40],
            iconAnchor: [11, 40],
            popupAnchor: [0, -40]
        }
    });

    var startIcon = new EventIcon({ iconUrl: '../../../../images/image_slices/marker-icon-start2.png' }),
    endIcon = new EventIcon({ iconUrl: '../../../../images/image_slices/marker-icon-stop2.png' }),
    haIcon = new EventIcon({ iconUrl: '../../../../images/image_slices/marker-icon-ha.png' }),
    eaIcon = new EventIcon({ iconUrl: '../../../../images/image_slices/marker-icon-ea.png' }),
    hbIcon = new EventIcon({ iconUrl: '../../../../images/image_slices/marker-icon-hb.png' }),
    ebIcon = new EventIcon({ iconUrl: '../../../../images/image_slices/marker-icon-eb.png' });

    self.featureLayer = createGeoJsonLayer(geoJsonData);

    if (map) {
        self.map = map;
        self.featureLayer.addTo(map);
    }

    self.updateData = function (geoJsonData, vehicleId) {
        self.vehicleId = vehicleId;

        if (self.map) {
            self.map.removeLayer(self.featureLayer);
        }

        if (geoJsonData) {
            self.featureLayer = createGeoJsonLayer(geoJsonData);

            var pathLayer = self.featureLayer.getLayers()[0];
            if (pathLayer.feature.properties.properties.length > 0) {
                self.gprfValid = pathLayer.feature.properties.properties[0].GPRF === 1;
            } else {
                self.gprfValid = false;
            }

            if (pathLayer && !self.gprfValid) {
                pathLayer.setStyle({ color: "transparent", dashArray: "5, 10", opacity: 1, fillOpacity: 1 });
                pathLayer.setText('\u279C', {
                    repeat: true,
                    offset: 7,
                    attributes: {
                        fill: '#007DEF',
                        'font-size': '20'
                    }
                });
            }
            else {
                pathLayer.setText(null);
                pathLayer.setStyle({ color: "#39f", dashArray: null, opacity: 1, fillOpacity: 1 });
            }

            if (self.map) {
                self.featureLayer.addTo(map);
                self.map.fitBounds(self.featureLayer.getBounds());
            }
        }
    };

    self.reverseGeocoder = reversegeocode;

    function reverseGeoCodeEvent(e) {
        if (!e.target.getPopup()) {
            e.originalEvent.preventDefault();
            self.reverseGeocoder.getAddressParts(
                e.target.feature.geometry.coordinates[1],
                e.target.feature.geometry.coordinates[0]).then(function (addressParts) {
                    var feature = e.target.feature;
                    var content = '<div class="TripEventPopup"><table>'

                    + '<tr class="TripEventPopupType"><td>Event Type</td><td>'
                    + feature.properties.eventType
                    + '</td></tr>'

                    + '<tr class="TripEventPopupTime"><td>Local Time</td><td>'
                    //+ usersettings.convertDateTimeFormatBySetting(self.vehicleId, feature.properties.properties.TimeStamp, null, false, true) // new moment(feature.properties.properties.TimeStamp).tz(self.timeZone).format('M/D/YYYY hh:mm A')
                    + '</td></tr>'

                    + '<tr class="TripEventPopupAddress"><td>Address</td><td>'
                    + addressParts.road + '<br />' + addressParts.city + ', ' + addressParts.state + ' ' + addressParts.postcode
                    + '</td></tr>';

                    content += '</table></div>';

                    e.target.bindPopup(content).openPopup();
                }
            );
        }
    }

    function createGeoJsonLayer(geoJsonData) {
        return L.geoJson(geoJsonData, {
            style: function (feature) {
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
            pointToLayer: function (feature, latlng) {
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
            onEachFeature: function (feature, layer) {
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
        });
    }

    function bindEventSpeedPopup(marker, feature) {
        if (feature.properties.properties.length > 0) {
            var content = '<div class="TripEventPopup"><table>'
            + '<tr class="TripEventPopupType"><td>Event Type</td><td>'
            + feature.properties.eventType
            + '</td></tr>'
            + '<tr class="TripEventPopupTime"><td>Local Time</td><td>'
            //+ usersettings.convertDateTimeFormatBySetting(self.vehicleId, feature.properties.properties[0].TimeStamp, null, false, true) //new moment(feature.properties.properties[0].TimeStamp).tz(self.timeZone).format('M/D/YYYY hh:mm A')
            + '</td></tr>';

            if (feature.properties.properties[0].Speed) {
                // var speed = usersettings.convertDistanceBySetting(self.vehicleId, 'miles', feature.properties.properties[0].Speed);
                // content += '<tr class="TripEventPopupSpeed"><td>Speed</td><td>'
                //     + speed.value
                //     + '&nbsp;'
                //     + (speed.unit === 'mi' ? 'mph' : 'kph')
                //     + '</td></tr>';
            }

            content += '</table></div>';

            return marker.bindPopup(content);
        }
    }

    function bindEventPopup(marker, feature) {
        var content = '<div class="TripEventPopup"><table>'
        + '<tr class="TripEventPopupType"><td>Event Type</td><td>'
        + feature.properties.eventType
        + '</td></tr>'
        + '<tr class="TripEventPopupTime"><td>Local Time</td><td>'
        //+ usersettings.convertDateTimeFormatBySetting(self.vehicleId, feature.properties.properties.TimeStamp, null, false, true) //new moment(feature.properties.properties.TimeStamp).tz(self.timeZone).format('M/D/YYYY hh:mm A')
        + '</td></tr>';

        if (feature.properties.properties.Speed) {
            // var speed = usersettings.convertDistanceBySetting(self.vehicleId, 'miles', feature.properties.properties.Speed);
            // content += '<tr class="TripEventPopupSpeed"><td>Speed</td><td>'
            //     + speed.value
            //     + '&nbsp;'
            //     + (speed.unit === 'mi' ? 'mph' : 'kph')
            //     + '</td></tr>';
        }

        if (feature.properties.properties.StartSpeed) {
            // var speed = usersettings.convertDistanceBySetting(self.vehicleId, 'miles', feature.properties.properties.StartSpeed);
            // content += '<tr class="TripEventPopupStartSpeed"><td>Start Speed</td><td>'
            //     + speed.value
            //     + '&nbsp;'
            //     + (speed.unit === 'mi' ? 'mph' : 'kph')
            //     + '</td></tr>';
        }

        if (feature.properties.properties.EndSpeed) {
            // var speed = usersettings.convertDistanceBySetting(self.vehicleId, 'miles', feature.properties.properties.EndSpeed);
            // content += '<tr class="TripEventPopupEndSpeed"><td>End Speed</td><td>'
            //     + speed.value
            //     + '&nbsp;'
            //     + (speed.unit === 'mi' ? 'mph' : 'kph')
            //     + '</td></tr>';
        }

        if (feature.properties.properties.StartSpeed && feature.properties.properties.EndSpeed) {
            // var speed = usersettings.convertDistanceBySetting(self.vehicleId, 'miles', feature.properties.properties.EndSpeed - feature.properties.properties.StartSpeed);
            // content += '<tr class="TripEventPopupSpeedDiff"><td>Speed Diff</td><td>'
            //     + speed.value
            //     + '&nbsp'
            //     + (speed.unit === 'mi' ? 'mph' : 'kph')
            //     + '</td></tr>';
        }

        content += '</table></div>';

        return marker.bindPopup(content);
    }
}

export default TripGeoJsonLayer;
