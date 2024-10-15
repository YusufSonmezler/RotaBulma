"use client";

import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import LocationList from './components/LocationList';
import Modal from './components/Modal';
import 'leaflet/dist/leaflet.css';

const LocationApp = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationName, setLocationName] = useState('');
  const [markerColor, setMarkerColor] = useState('#ff0000');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [clickedLocation, setClickedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEditingIndex, setCurrentEditingIndex] = useState<number | null>(null);
  const [routeLocations, setRouteLocations] = useState<Location[]>([]);

  const handleLocationSelect = (latlng: { lat: number; lng: number }) => {
    setCoordinates(latlng);
    setClickedLocation(latlng);
  };

  const handleSubmit = () => {
    if (coordinates && locationName) {
      const newLocation = { name: locationName, color: markerColor, coordinates };
      setLocations([...locations, newLocation]);
      setLocationName('');
      setCoordinates(null);
      setClickedLocation(null);
      localStorage.setItem('locations', JSON.stringify([...locations, newLocation]));
    }
  };

  const openEditModal = (index: number) => {
    const location = locations[index];
    setCurrentEditingIndex(index);
    setLocationName(location.name);
    setMarkerColor(location.color);
    setCoordinates(location.coordinates);
    setClickedLocation(location.coordinates);
    setEditModalOpen(true);
  };

  const handleUpdate = () => {
    if (currentEditingIndex !== null && coordinates && locationName) {
      const updatedLocation = { name: locationName, color: markerColor, coordinates };
      const updatedLocations = [...locations];
      updatedLocations[currentEditingIndex] = updatedLocation;
      setLocations(updatedLocations);
      setEditModalOpen(false);
      setLocationName('');
      setCoordinates(null);
      setClickedLocation(null);
      localStorage.setItem('locations', JSON.stringify(updatedLocations));
    }
  };

  const handleCreateRoute = () => {
    if (routeLocations.length === 2) {
      const distance = L.latLng(routeLocations[0].coordinates).distanceTo(routeLocations[1].coordinates) / 1000;
      alert(`Kuş uçuşu mesafe: ${distance.toFixed(2)} km`);
    }
  };

  const selectForRoute = (index: number) => {
    const selectedLocation = locations[index];
    setRouteLocations((prev) => {
      const updated = [...prev, selectedLocation];
      if (updated.length > 2) updated.shift();
      return updated;
    });
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setLocationName('');
    setCoordinates(null);
    setClickedLocation(null);
  };

  return (
    <div>
      <h1>Konum Ekle</h1>
      <MapComponent
        locations={locations}
        clickedLocation={clickedLocation}
        routeLocations={routeLocations}
        onMapClick={handleLocationSelect}
      />
      <input
        type="text"
        placeholder="Konum Adı"
        value={locationName}
        onChange={(e) => setLocationName(e.target.value)}
      />
      <input type="color" value={markerColor} onChange={(e) => setMarkerColor(e.target.value)} />
      <button onClick={handleSubmit}>Kaydet</button>
      <h2>Kaydedilmiş Konumlar</h2>
      <LocationList
        locations={locations}
        openEditModal={openEditModal}
        selectForRoute={selectForRoute}
      />
      <button onClick={handleCreateRoute} disabled={routeLocations.length !== 2}>
        Rota Oluştur
      </button>
      <Modal isOpen={editModalOpen} onClose={closeEditModal}>
        <h2>Konum Düzenle</h2>
        <input
          type="text"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
        />
        <input type="color" value={markerColor} onChange={(e) => setMarkerColor(e.target.value)} />
        <MapComponent
          locations={[]}
          clickedLocation={clickedLocation}
          routeLocations={[]}
          onMapClick={handleLocationSelect}
        />
        <button onClick={handleUpdate}>Güncelle</button>
      </Modal>
    </div>
  );
};

export default LocationApp;