const LocationList = ({ locations, openEditModal, selectForRoute }) => {
  return (
    <table className="location-table">
      <thead>
        <tr>
          <th>Yer İsmi</th>
          <th>Enlem</th>
          <th>Boylam</th>
          <th>Düzenle</th>
          <th>Rota</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location, index) => (
          <tr key={index}>
            <td>{location.name}</td>
            <td>{location.coordinates.lat.toFixed(5)}</td>
            <td>{location.coordinates.lng.toFixed(5)}</td>
            <td><button onClick={() => openEditModal(index)}>Düzenle</button></td>
            <td><button onClick={() => selectForRoute(index)}>Rota için Seç</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LocationList;
