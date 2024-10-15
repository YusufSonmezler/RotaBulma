import { MapContainer, TileLayer } from 'react-leaflet';
import ClickableMap from './ClickableMap';
import LocationMarker from './LocationMarker';

const LocationModal = ({ isOpen, onClose, locationName, setLocationName, markerColor, setMarkerColor, coordinates, handleLocationSelect, clickedLocation, handleUpdate }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Konum Düzenle</h2>
        <input type="text" value={locationName} onChange={(e) => setLocationName(e.target.value)} />
        <input type="color" value={markerColor} onChange={(e) => setMarkerColor(e.target.value)} />
        <MapContainer center={coordinates || { lat: 39.925533, lng: 32.866287 }} zoom={13} style={{ height: '300px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <ClickableMap onClick={handleLocationSelect} />
          {clickedLocation && (
            <LocationMarker location={{ coordinates: clickedLocation, color: 'blue' }} />
          )}
        </MapContainer>
        <button onClick={handleUpdate}>Güncelle</button>
      </div>
    </div>
  );
};

export default LocationModal;
