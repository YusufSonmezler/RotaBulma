import { div } from "framer-motion/client";

const LocationList = ({ locations, openEditModal, selectForRoute }) => {
  return (
    <div className="overflow-x-auto">
      <div className="relative shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Yer İsmi</th>
              <th scope="col" className="px-6 py-3">Enlem</th>
              <th scope="col" className="px-6 py-3">Boylam</th>
              <th scope="col" className="px-6 py-3">Düzenle</th>
              <th scope="col" className="px-6 py-3">Rota</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) => (
              <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {location.name}
                </th>
                <td className="px-6 py-4">{location.coordinates.lat.toFixed(5)}</td>
                <td className="px-6 py-4">{location.coordinates.lng.toFixed(5)}</td>
                <td className="px-6 py-4">
                  <button onClick={() => openEditModal(index)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Düzenle</button>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => selectForRoute(index)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Rota için Seç</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationList;
