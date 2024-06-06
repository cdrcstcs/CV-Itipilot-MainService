import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from '../../Cookies';

export const ImageUploader = ({ onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const cookie = useCookies();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const token = cookie.get('token');

    const formData = new FormData();
    formData.append('image', selectedFile);

    axios.post('http://localhost:4000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      if (response.data && response.data.id) {
        onImageUpload(response.data._id);
      }
    })
    .catch((error) => {
      console.error('Error uploading image: ', error);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};
