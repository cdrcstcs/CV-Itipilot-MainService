import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TagListPage = ({ onTagsSelect }) => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get('http://localhost:4000/tags');
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleSelectTag = (tagId) => {
    const selectedTag = tags.find(tag => tag._id === tagId);
    setSelectedTags([...selectedTags, selectedTag]);
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags(selectedTags.filter(tag => tag._id !== tagId));
  };

  const handlePropagateTags = () => {
    onTagsSelect(selectedTags);
  };

  return (
    <div>
      <h1>Select Tags</h1>
      <h2>Selected Tags</h2>
      <ul>
        {selectedTags.map(tag => (
          <li key={tag._id}>
            <div>
              <p>Value: {tag.value}</p>
              <button onClick={() => handleRemoveTag(tag._id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handlePropagateTags}>Propagate Tags</button>
      <h2>All Tags</h2>
      <ul>
        {tags.map(tag => (
          <li key={tag._id}>
            <div>
              <p>Value: {tag.value}</p>
              <button onClick={() => handleSelectTag(tag._id)}>Select</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagListPage;
