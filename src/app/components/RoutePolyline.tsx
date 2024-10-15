import { Polyline } from 'react-leaflet';

const RoutePolyline = ({ routeLocations }) => (
  <Polyline 
    positions={[
      [routeLocations[0].coordinates.lat, routeLocations[0].coordinates.lng],
      [routeLocations[1].coordinates.lat, routeLocations[1].coordinates.lng],
    ]}
    color="blue"
  />
);

export default RoutePolyline;
