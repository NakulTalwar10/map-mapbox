import React, { useState, useEffect } from 'react';
import ReactMapGL, { Source, Layer, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({ countries, selectedCountry }) => {
    const [viewport, setViewport] = useState({
        latitude: 28.6448,
        longitude: 0,
        zoom: 1,
    });

    useEffect(() => {
        if (selectedCountry) {
            const [longitude, latitude] = selectedCountry.latlng; // Extract latitude and longitude
            setViewport(prevViewport => ({
                ...prevViewport,
                latitude,
                longitude,
                zoom: 1,
            }));
        }
    }, [selectedCountry]);

    const mapStyle = selectedCountry
        ? "mapbox://styles/bikehi858/cll5h7ct700kg01pme2fp8jw5" 
        : "mapbox://styles/bikehi858/cll5h7ct700kg01pme2fp8jw5"; 

    const fillPaint = selectedCountry
        ? [
            'case',
            ['==', ['get', 'name'], selectedCountry.name],
            'blue', // Highlight color
            'blue', // Default color
        ]
        : 'blue'; // Default color without highlight

    const TOKEN = "pk.eyJ1IjoiYmlrZWhpODU4IiwiYSI6ImNsbDVnaHMyZDBmd24zanM3cHY2ZDR1NjUifQ.KENxmGcDOZLXtNvN1r1FEg";

    return (
        <div style={{ height: "80vh", width: "100%" }}>
            <ReactMapGL
                {...viewport}
                onViewportChange={setViewport}
                mapboxAccessToken={TOKEN}
                width="100%"
                height="100%"
                mapStyle={mapStyle}
            >
                <Source type="geojson" data={{ type: 'FeatureCollection', features: countries }}>
                    <Layer
                        id="countries"
                        type="fill"
                        paint={{
                            'fill-color': fillPaint,
                            'fill-opacity': 0.6,
                        }}
                    />
                </Source>
                {selectedCountry && (
                    <Marker
                        latitude={selectedCountry.latlng[0]}
                        longitude={selectedCountry.latlng[1]}
                    >
                        {/* You can customize the marker as needed */}
                    </Marker>
                )}
            </ReactMapGL>
        </div>
    );
};

export default Map;
