import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    <div>
      <h1>All Attractions</h1>
      <h2>Select Attractions</h2>
      <ul>
        {attractions.map(attraction => (
          <li key={attraction._id}>
            <div>
              <SingleImage imageId={attraction.imageId}></SingleImage>
              <p>Name: {attraction.name}</p>
              <p>Address: {attraction.address}</p>
              <p>City: {attraction.city}</p>
              <button onClick={() => handleSelectAttraction(attraction._id)}>Select</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttractionListPage;
