import React, { useState } from 'react';
import axios from 'axios';
import TagListPage from '../Tag/TagsPage';
import TagPage from '../Tag/TagPage';
import { useCookies } from '../../Cookies';
import { ImageUploader } from '../Image/ImageUploader';

const CreateAttractionPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    x: '',
    y: '',
    city: ''
  });
  const [imageId, setImageId] = useState(null); // State to store the image ID

  const cookie = useCookies();

  const [selectedTags, setSelectedTags] = useState([]);
  const handleSelectTags = (tags) => {
    setSelectedTags(tags);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageUpload = (imageId) => {
    setImageId(imageId); // Set the imageId state with the received image ID
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update formData to include both imageId and tagIds
      const updatedFormData = {
        ...formData,
        imageId: imageId,
        tagIds: selectedTags.map(tag => tag._id)
      };
  
      const token = cookie.get('Token');
  
      const response = await axios.post('http://localhost:4000/attractions', updatedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Attraction created:', response.data);
    } catch (error) {
      console.error('Error creating attraction:', error);
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
        <ImageUploader onImageUpload={handleImageUpload} />
        <TagListPage onTagsSelect={handleSelectTags} />
        {selectedTags && selectedTags.map((tag) => (
          <TagPage key={tag._id} tagId={tag._id} />
        ))}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateAttractionPage;
