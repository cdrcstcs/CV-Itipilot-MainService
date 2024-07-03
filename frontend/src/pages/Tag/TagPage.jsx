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
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Tag Details</h1>
      {tag ? (
        <div className="space-y-4">
          {editMode ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">Value: {tag.value}</p>
              <div className="space-x-2">
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
}

export default TagPage;
