import React, { useState, useEffect } from 'react';
import axios from "../../AxiosSetup";
import TagPage from '../Tag/TagPage';
const AttractionPage = ({ attractionId }) => {
  const [attraction, setAttraction] = useState(null);
  const [editedAttraction, setEditedAttraction] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/attractions/${attractionId}`);
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
      await axios.delete(`http://localhost:4000/attractions/${attractionId}`);
    } catch (error) {
      console.error('Error deleting attraction:', error);
    }
  };

  const handleEditAttraction = async () => {
    try {
      await axios.put(`http://localhost:4000/attractions/${attractionId}`, editedAttraction);
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
          <h2>{attraction.name}</h2>
          <p>Address: {attraction.address}</p>
          <p>City: {attraction.city}</p>
          <p>X: {attraction.x}</p>
          <p>Y: {attraction.y}</p>
          <TagPage tagId={attraction.tagId}></TagPage>
          {editing ? (
            <div>
              <input type="text" name="name" placeholder="New Name" value={editedAttraction.name} onChange={handleChange} />
              <input type="text" name="address" placeholder="New Address" value={editedAttraction.address} onChange={handleChange} />
              <input type="text" name="city" placeholder="New City" value={editedAttraction.city} onChange={handleChange} />
              <input type="text" name="x" placeholder="New X Coordinate" value={editedAttraction.x} onChange={handleChange} />
              <input type="text" name="y" placeholder="New Y Coordinate" value={editedAttraction.y} onChange={handleChange} />
              <TagPage tagId={attraction.tagId}></TagPage>
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
