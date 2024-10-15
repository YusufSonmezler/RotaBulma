import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import ClickableMap from './ClickableMap';
import LocationMarker from './LocationMarker';

const MapComponent = ({ locations, clickedLocation, routeLocations, onMapClick }) => {
  return (
    <MapContainer center={{ lat: 39.925533, lng: 32.866287 }} zoom={13} style={{ height: '400px', width: '100%' }}>
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
        <Marker position={clickedLocation} icon={L.divIcon({ className: 'custom-marker', html: `<div style="background-color: blue; width: 20px; height: 20px; border-radius: 50%;"></div>` })} />
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
    </MapContainer>
  );
};

export default MapComponent;
