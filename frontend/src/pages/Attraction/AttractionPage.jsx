import React, { useState, useEffect } from 'react';
import axios from '../../axiosSetUp';
import TagPage from '../Tag/TagPage';
import { useCookies } from '../../Cookies';
import { SingleImage } from '../Image/ImagePage';
import { ImageUploader } from '../Image/ImageUploader';
import { Card, Button, Input, Label } from '@shadcn/ui';
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
    <div className="container mx-auto p-4">
      {attraction ? (
        <div className="space-y-4">
          <SingleImage imageId={attraction.imageId} />
          <Card className="bg-white p-4 shadow-md">
            <Card.Header>
              <Card.Title className="text-3xl font-bold">Attraction Details</Card.Title>
            </Card.Header>
            <Card.Content className="mb-4">
              <div className="space-y-2">
                <div>
                  <Label>Name:</Label>
                  <p>{attraction.name}</p>
                </div>
                <div>
                  <Label>Address:</Label>
                  <p>{attraction.address}</p>
                </div>
                <div>
                  <Label>City:</Label>
                  <p>{attraction.city}</p>
                </div>
                <div>
                  <Label>X:</Label>
                  <p>{attraction.x}</p>
                </div>
                <div>
                  <Label>Y:</Label>
                  <p>{attraction.y}</p>
                </div>
              </div>
            </Card.Content>
            <Card.Footer className="flex space-x-2">
              {attraction.tagIds.map((tagId) => (
                <TagPage key={tagId} tagId={tagId} />
              ))}
            </Card.Footer>
            {editing ? (
              <div className="mt-4 space-y-4">
                <Input type="text" name="name" placeholder="New Name" value={editedAttraction.name} onChange={handleChange} />
                <Input type="text" name="address" placeholder="New Address" value={editedAttraction.address} onChange={handleChange} />
                <Input type="text" name="city" placeholder="New City" value={editedAttraction.city} onChange={handleChange} />
                <Input type="text" name="x" placeholder="New X Coordinate" value={editedAttraction.x} onChange={handleChange} />
                <Input type="text" name="y" placeholder="New Y Coordinate" value={editedAttraction.y} onChange={handleChange} />
                <ImageUploader onImageUpload={handleImageUpload} />
                <Button onClick={handleEditAttraction}>Save</Button>
              </div>
            ) : (
              <div className="mt-4 flex space-x-2">
                <Button onClick={() => setEditing(true)}>Edit Attraction</Button>
                <Button variant="destructive" onClick={handleDeleteAttraction}>
                  Delete Attraction
                </Button>
              </div>
            )}
          </Card>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AttractionPage;
