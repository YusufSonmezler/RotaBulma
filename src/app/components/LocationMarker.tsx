import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const LocationMarker = ({ location, index, selectForRoute }) => {
  if (!location || !location.coordinates) {
    return null; 
  }

  return (
    <Marker 
      position={location.coordinates} 
      icon={L.divIcon({ className: 'custom-marker', html: `<div style="background-color: ${location.color}; width: 20px; height: 20px; border-radius: 50%;"></div>` })}
    >
      <Popup>
        {`${location.name} - Enlem: ${location.coordinates.lat.toFixed(5)}, Boylam: ${location.coordinates.lng.toFixed(5)}`}
        <br />
        <button onClick={() => selectForRoute(index)}>Rota Oluştur</button>
      </Popup>
    </Marker>
  );
};

export default LocationMarker;
