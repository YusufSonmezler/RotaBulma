import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import ClickableMap from './ClickableMap';
import LocationMarker from './LocationMarker';
import { useEffect, useState } from 'react';
import L from 'leaflet';

const MapComponent = ({ locations, clickedLocation, routeLocations, onMapClick }) => {
  const [userCoordinates, setUserCoordinates] = useState({ lat: 41.0082, lng: 28.9784 });
  const [mapCenter, setMapCenter] = useState(userCoordinates);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newCoordinates = { lat: latitude, lng: longitude };
        setUserCoordinates(newCoordinates);
        setMapCenter(newCoordinates);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <ClickableMap onClick={onMapClick} />
      {locations.map((location, index) => (
        <LocationMarker
          key={index}
          location={location}
          index={index}
          selectForRoute={() => {}}
        />
      ))}
      {clickedLocation && (
        <Marker
          position={clickedLocation}
          icon={L.divIcon({ className: 'custom-marker', html: `<div style="background-color: blue; width: 20px; height: 20px; border-radius: 50%;"></div>` })}
        />
      )}
      {routeLocations.length === 2 && (
        <Polyline
          positions={[
            [routeLocations[0].coordinates.lat, routeLocations[0].coordinates.lng],
            [routeLocations[1].coordinates.lat, routeLocations[1].coordinates.lng],
          ]}
          color="blue"
        />
      )}
      <Marker
        position={userCoordinates}
        icon={L.divIcon({ className: 'custom-marker', html: `<div style="background-color: green; width: 20px; height: 20px; border-radius: 50%;"></div>` })}
      />
    </MapContainer>
  );
};

export default MapComponent;
