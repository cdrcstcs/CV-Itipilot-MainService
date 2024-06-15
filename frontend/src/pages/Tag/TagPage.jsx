import React, { useState, useEffect } from 'react';
import axios from '../../axiosSetUp';
import { useCookies } from '../../Cookies';

function TagPage({ tagId }) {
  const [tag, setTag] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState('');
  const cookie = useCookies();

  useEffect(() => {
    fetchTagById();
  }, [tagId]);

  const fetchTagById = async () => {
    try {
        const token = cookie.get('usertoken');

      const response = await axios.get(`http://localhost:4000/tags/${tagId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      }); // Replace '/api/tags' with your actual API endpoint
      setTag(response.data);
    } catch (error) {
      console.error('Error fetching tag:', error);
    }
  };

  const handleDelete = async (e) => {
    try {
      e.preventDefault();

        const token = cookie.get('usertoken');

      await axios.delete(`http://localhost:4000/tags/${tagId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      }); // Replace '/api/tags' with your actual API endpoint
      // Optionally, you can navigate the user back to a different page after deletion
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  const handleEdit = async (e) => {
    try {
      e.preventDefault();

        const token = cookie.get('usertoken');

      await axios.put(`http://localhost:4000/tags/${tagId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      }, { value: editedValue }); // Replace '/api/tags' with your actual API endpoint
      setTag({ ...tag, value: editedValue });
      setEditMode(false);
    } catch (error) {
      console.error('Error editing tag:', error);
    }
  };

  return (
    <div>
      <h1>Tag Details</h1>
      {tag ? (
        <div>
          {editMode ? (
            <div>
              <input
                type="text"
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
              />
              <button onClick={handleEdit}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <p>Value: {tag.value}</p>
              <button onClick={() => setEditMode(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TagPage;
