import React from 'react';
import moment from 'moment';
import { Map, LayersControl, TileLayer } from 'react-leaflet'

const TripMap = React.createClass({
    render() {
        var accessToken = 'pk.eyJ1Ijoia2V2aW53IiwiYSI6ImNpc2h2Zmo4aTAwN2Yyb3BpcmplYmRrcHkifQ.eR82_M14vFQEzydtlMdZJA';
        var attribution = '<a href="https://www.mapbox.com/about/maps/" target="_blank">&copy; Mapbox &copy; OpenStreetMap</a> <a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a>';
        var streetsLayer =
            <TileLayer
                url='https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}'
                attribution={attribution}
                accessToken={accessToken}
            />;

        return (
            <section>
                <div className="trip-map">
                    <Map
                        className="trip-map-map"
                        style={{height: "100%"}}
                        center={[20, 0]}
                        zoom={2}
                    >
                        {streetsLayer}
                        <LayersControl>
                            <LayersControl.BaseLayer name="Streets" checked={true}>
                                {streetsLayer}
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="Satellite">
                                <TileLayer
                                    url='https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}'
                                    attribution={attribution}
                                    accessToken={accessToken}
                                />
                            </LayersControl.BaseLayer>
                        </LayersControl>
                    </Map>
                </div>
            </section>
        )
    }
});

module.exports = TripMap;
