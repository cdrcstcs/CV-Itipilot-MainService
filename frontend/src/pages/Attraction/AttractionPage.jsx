import React, { useState, useEffect } from 'react';
import axios from '../../axiosSetUp';
import TagPage from '../Tag/TagPage';
import { useCookies } from '../../Cookies';
import { SingleImage } from '../Image/ImagePage';
import { ImageUploader } from '../Image/ImageUploader';

const AttractionPage = ({ attractionId }) => {
  const [attraction, setAttraction] = useState(null);
  const [editedAttraction, setEditedAttraction] = useState(null);
  const [editing, setEditing] = useState(false);
  const [imageId, setImageId] = useState(null); // State to store the image ID
  const cookie = useCookies();

  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        const token = cookie.get('usertoken');

        const response = await axios.get(`http://localhost:4000/attractions/${attractionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAttraction(response.data);
        // Initialize editedAttraction with the fetched attraction data
        setEditedAttraction(response.data);
      } catch (error) {
        console.error('Error fetching attraction:', error);
      }
    };

    fetchAttraction();
  }, [attractionId]);

  const handleDeleteAttraction = async () => {
    try {
      const token = cookie.get('usertoken');

      await axios.delete(`http://localhost:4000/attractions/${attractionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error deleting attraction:', error);
    }
  };

  const handleEditAttraction = async () => {
    try {
      const token = cookie.get('usertoken');

      // Update the editedAttraction object with the imageId
      const updatedAttraction = { ...editedAttraction, imageId };

      await axios.put(`http://localhost:4000/attractions/${attractionId}`, updatedAttraction, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Exit editing mode after successfully editing attraction
      setEditing(false);
    } catch (error) {
      console.error('Error editing attraction:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAttraction(prevAttraction => ({
      ...prevAttraction,
      [name]: value
    }));
  };

  // Callback function to handle image upload
  const handleImageUpload = (imageId) => {
    // Set the imageId received from ImageUploader to the state
    setImageId(imageId);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
      {attraction ? (
        <div>
          <SingleImage imageId={attraction.imageId} className="w-full h-64 object-cover rounded-t-lg" />
          <div className="px-4 py-6">
            <h1 className="text-2xl font-bold mb-2">{attraction.name}</h1>
            <div className="space-y-2">
              <p className="text-gray-600">Address: {attraction.address}</p>
              <p className="text-gray-600">City: {attraction.city}</p>
              <p className="text-gray-600">X: {attraction.x}</p>
              <p className="text-gray-600">Y: {attraction.y}</p>
            </div>
            <div className="mt-4 space-x-2">
              {attraction.tagIds.map((tagId) => (
                <TagPage key={tagId} tagId={tagId} className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm" />
              ))}
            </div>
            {editing ? (
              <div className="mt-4 space-y-2">
                <input type="text" name="name" placeholder="New Name" value={editedAttraction.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                <input type="text" name="address" placeholder="New Address" value={editedAttraction.address} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                <input type="text" name="city" placeholder="New City" value={editedAttraction.city} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                <input type="text" name="x" placeholder="New X Coordinate" value={editedAttraction.x} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                <input type="text" name="y" placeholder="New Y Coordinate" value={editedAttraction.y} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                <ImageUploader onImageUpload={handleImageUpload} />
                <button onClick={handleEditAttraction} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
              </div>
            ) : (
              <div className="mt-4 space-x-2">
                <button onClick={() => setEditing(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Edit Attraction</button>
                <button onClick={handleDeleteAttraction} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Delete Attraction</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default AttractionPage;
