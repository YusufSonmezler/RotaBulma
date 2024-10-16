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
      const newLocation: Location = {
        name: locationName,
        color: markerColor,
        coordinates: coordinates,
      };
      setLocations([...locations, newLocation]);
      setLocationName('');
      setMarkerColor('#ff0000');
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
      const updatedLocation: Location = {
        name: locationName,
        color: markerColor,
        coordinates: coordinates,
      };
      const updatedLocations = [...locations];
      updatedLocations[currentEditingIndex] = updatedLocation;
      setLocations(updatedLocations);
      setEditModalOpen(false);
      setCurrentEditingIndex(null);
      setLocationName('');
      setMarkerColor('#ff0000');
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
    <div className="container mx-auto">
      <h1 className="text-center">Konum Ekle</h1>
      <MapComponent
        locations={locations}
        clickedLocation={clickedLocation}
        routeLocations={routeLocations}
        onMapClick={handleLocationSelect}
      />
      <div className="flex flex-col items-center space-y-4">
        <input 
          onChange={(e) => setLocationName(e.target.value)} 
          type="text" 
          id="location-name" 
          value={locationName} 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/2 p-2.5" 
          placeholder="Konum Ekle" 
          required 
        />
        <div className="flex items-center space-x-2">
          <label className="relative inline-block">
            <input 
              type="color" 
              value={markerColor} 
              onChange={(e) => setMarkerColor(e.target.value)} 
              className="appearance-none w-10 h-10 border rounded-lg border-gray-300 focus:outline-none cursor-pointer" 
              style={{ backgroundColor: markerColor }} 
            />
            <span className="absolute top-0 left-0 w-full h-full rounded-lg border border-gray-300" style={{ backgroundColor: 'transparent' }} />
          </label>
          <button 
            onClick={handleSubmit} 
            type="button" 
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Kaydet
          </button>
        </div>
      </div>

      <h2 className="text-center">Kaydedilmiş Konumlar</h2>
      <LocationList
        locations={locations}
        openEditModal={openEditModal}
        selectForRoute={selectForRoute}
      />

      <button onClick={handleCreateRoute} disabled={routeLocations.length !== 2}>
        Kuş Uçuşu Mesafe Ölç
      </button>
      <Modal isOpen={editModalOpen} onClose={closeEditModal}>
        <h2>Konum Düzenle</h2>
        <input 
          onChange={(e) => setLocationName(e.target.value)} 
          type="text" 
          id="location-name" 
          value={locationName} 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/2 p-2.5" 
          placeholder="Konum Düzenle" 
          required 
        />
        <input 
              type="color" 
              value={markerColor} 
              onChange={(e) => setMarkerColor(e.target.value)} 
              className="appearance-none w-10 h-10 border rounded-lg border-gray-300 focus:outline-none cursor-pointer" 
              style={{ backgroundColor: markerColor }} 
            />
        <MapComponent
          locations={[]}
          clickedLocation={clickedLocation}
          routeLocations={[]}
          onMapClick={handleLocationSelect}
        />
        <button 
            onClick={handleUpdate} 
            type="button" 
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Güncelle
          </button>
      </Modal>
    </div>
  );
};

export default LocationApp;
