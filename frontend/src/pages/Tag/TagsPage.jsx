import React, { useState, useEffect } from 'react';
import axios from '../../axiosSetUp';
import { useCookies } from '../../Cookies';

const TagListPage = ({ onTagsSelect }) => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const cookie = useCookies();

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
        const token = cookie.get('usertoken');
      const response = await axios.get('http://localhost:4000/tags',{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
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

  const handlePropagateTags = (e) => {
    e.preventDefault();
    onTagsSelect(selectedTags);
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Select Tags</h1>
      <h2 className="text-lg font-medium mb-4">Selected Tags</h2>
      <ul className="space-y-2">
        {selectedTags.map(tag => (
          <li key={tag._id} className="bg-gray-100 rounded-md p-3 flex justify-between items-center">
            <p className="text-gray-700">Value: {tag.value}</p>
            <button
              onClick={() => handleRemoveTag(tag._id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handlePropagateTags}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4"
      >
        Propagate Tags
      </button>
      <h2 className="text-lg font-medium mt-8 mb-4">All Tags</h2>
      <ul className="space-y-2">
        {tags.map(tag => (
          <li key={tag._id} className="bg-gray-100 rounded-md p-3 flex justify-between items-center">
            <p className="text-gray-700">Value: {tag.value}</p>
            <button
              onClick={() => handleSelectTag(tag._id)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Select
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagListPage;
