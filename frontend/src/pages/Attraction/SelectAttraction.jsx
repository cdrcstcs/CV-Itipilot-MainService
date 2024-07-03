import React, { useState, useEffect } from 'react';
import axios from '../../axiosSetUp';
import { useCookies } from '../../Cookies';
import { SingleImage } from '../Image/ImagePage';
const AttractionListPage = ({ onSelectAttraction }) => {
  const [attractions, setAttractions] = useState([]);
  const cookie = useCookies();

  useEffect(() => {
    fetchAttractions();
  }, []);

  const fetchAttractions = async () => {
    try {
      const token = cookie.get('usertoken');

      const response = await axios.get('http://localhost:4000/attractions',{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      setAttractions(response.data);
    } catch (error) {
      console.error('Error fetching attractions:', error);
    }
  };

  const handleSelectAttraction = (attractionId) => {
    const selectedAttraction = attractions.find(attraction => attraction._id === attractionId);
    onSelectAttraction(selectedAttraction);
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4">All Attractions</h1>
      <h2 className="text-lg font-medium mb-4">Select Attractions</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {attractions.map(attraction => (
          <li key={attraction._id} className="bg-gray-100 rounded-lg overflow-hidden">
            <div className="p-4 space-y-2">
              <SingleImage imageId={attraction.imageId} className="w-full h-48 object-cover rounded-t-lg" />
              <h3 className="text-lg font-medium">{attraction.name}</h3>
              <p className="text-gray-600">{attraction.address}</p>
              <p className="text-gray-600">{attraction.city}</p>
              <button onClick={() => handleSelectAttraction(attraction._id)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Select</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttractionListPage;
