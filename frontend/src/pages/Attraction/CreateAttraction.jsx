// AttractionPage.js

import React, { useState } from 'react';
import axios from 'axios';
import TagListPage from '../Tag/TagsPage';
import TagPage from '../Tag/TagPage';
import { useCookies } from '../../Cookies';

const CreateAttractionPage = ({ onAttractionCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    x: '',
    y: '',
    city: ''
  });
  const cookie = useCookies();

  const [selectedTags, setSelectedTags] = useState();
  const handleSelectTags = (tags) => {
    setSelectedTags(tags);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = cookie.get('token');

      const response = await axios.post('http://localhost:4000/attractions',{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      }, formData);
      console.log('Attraction created:', response.data);
      // Pass the newly created attraction object to the callback function
      onAttractionCreated(response.data);
      // Optionally, you can redirect to another page or show a success message
    } catch (error) {
      console.error('Error creating attraction:', error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div>
      <h1>Create Attraction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>X:</label>
          <input type="number" name="x" value={formData.x} onChange={handleChange} required />
        </div>
        <div>
          <label>Y:</label>
          <input type="number" name="y" value={formData.y} onChange={handleChange} required />
        </div>
        <div>
          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <TagListPage onSelectTags={handleSelectTags} />
        {selectedTags && selectedTags.map((tag)=>{
            <TagPage tagId={tag._id}></TagPage>
        })}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateAttractionPage;
