import { useMapEvent } from 'react-leaflet';

const ClickableMap = ({ onClick }) => {
  useMapEvent('click', (event) => {
    onClick(event.latlng);
  });

  return null;
};

export default ClickableMap;
