import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from '../../Cookies';

export const ImageUploader = ({ onImageUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState('');
    const cookie = useCookies();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewURL(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const token = cookie.get('token');

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://localhost:4000/upload', {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          }, formData);

            if (response.data && response.data._id) {
                onImageUpload(response.data._id);
            }
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {previewURL && <img src={previewURL} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />}
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};
