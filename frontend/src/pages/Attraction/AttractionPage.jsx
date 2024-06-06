import React, { useState, useEffect } from 'react';
import axios from "../../AxiosSetup";
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
        const token = cookie.get('token');

        const response = await axios.get(`http://localhost:4000/attractions/${attractionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAttraction(response.data);
        setEditedAttraction(response.data);
      } catch (error) {
        console.error('Error fetching attraction:', error);
      }
    };

    fetchAttraction();
  }, [attractionId]);

  const handleDeleteAttraction = async (e) => {
    e.preventDefault();
    try {
      const token = cookie.get('token');

      await axios.delete(`http://localhost:4000/attractions/${attractionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error deleting attraction:', error);
    }
  };

  const handleEditAttraction = async (e) => {
    try {
      e.preventDefault();

      const token = cookie.get('token');

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

  return (
    <div>
      {attraction ? (
        <div>
          <SingleImage imageId={attraction.imageId}></SingleImage>
          <h1>Attraction Details</h1>
          <p>Name: {attraction.name}</p>
          <p>Address: {attraction.address}</p>
          <p>City: {attraction.city}</p>
          <p>X: {attraction.x}</p>
          <p>Y: {attraction.y}</p>
          {attraction.tagIds.map((tagId) => (
            <TagPage key={tagId} tagId={tagId} />
          ))}
          {editing ? (
            <div>
              <input type="text" name="name" placeholder="New Name" value={editedAttraction.name} onChange={handleChange} />
              <input type="text" name="address" placeholder="New Address" value={editedAttraction.address} onChange={handleChange} />
              <input type="text" name="city" placeholder="New City" value={editedAttraction.city} onChange={handleChange} />
              <input type="text" name="x" placeholder="New X Coordinate" value={editedAttraction.x} onChange={handleChange} />
              <input type="text" name="y" placeholder="New Y Coordinate" value={editedAttraction.y} onChange={handleChange} />
              <ImageUploader onImageUpload={setImageId} />
              <button onClick={handleEditAttraction}>Save</button>
            </div>
          ) : (
            <div>
              <button onClick={() => setEditing(true)}>Edit Attraction</button>
              <button onClick={handleDeleteAttraction}>Delete Attraction</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AttractionPage;
