import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TagPage() {
  const [tags, setTags] = useState([]);
  const [newTagValue, setNewTagValue] = useState('');
  const [editingTagId, setEditingTagId] = useState(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get('/api/tags'); // Replace '/api/tags' with your actual API endpoint
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const addTag = async () => {
    try {
      const response = await axios.post('/api/tags', { value: newTagValue }); // Replace '/api/tags' with your actual API endpoint
      setTags([...tags, response.data]);
      setNewTagValue('');
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const deleteTag = async (id) => {
    try {
      await axios.delete(`/api/tags/${id}`); // Replace '/api/tags' with your actual API endpoint
      setTags(tags.filter(tag => tag._id !== id));
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  const updateTag = async (id, updatedValue) => {
    try {
      await axios.put(`/api/tags/${id}`, { value: updatedValue }); // Replace '/api/tags' with your actual API endpoint
      setTags(tags.map(tag => {
        if (tag._id === id) {
          return { ...tag, value: updatedValue };
        }
        return tag;
      }));
      setEditingTagId(null);
    } catch (error) {
      console.error('Error updating tag:', error);
    }
  };

  return (
    <div>
      <h1>Tags</h1>
      <ul>
        {tags.map(tag => (
          <li key={tag._id}>
            {editingTagId === tag._id ? (
              <div>
                <input
                  type="text"
                  value={tag.value}
                  onChange={(e) => updateTag(tag._id, e.target.value)}
                />
              </div>
            ) : (
              <div>
                {tag.value}
                <button onClick={() => setEditingTagId(tag._id)}>Edit</button>
                <button onClick={() => deleteTag(tag._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTagValue}
          onChange={(e) => setNewTagValue(e.target.value)}
        />
        <button onClick={addTag}>Add Tag</button>
      </div>
    </div>
  );
}

export default TagPage;
