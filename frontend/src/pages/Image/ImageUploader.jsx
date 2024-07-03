import React, { useState } from 'react';
import axios from '../../axiosSetUp';
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
        const token = cookie.get('usertoken');

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:4000/upload', formData);

            if (response.data && response.data.image._id) {
                onImageUpload(response.data.image._id);
            }
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    };
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full">
              <label
                htmlFor="file-input"
                className="block mb-2 font-medium text-gray-700"
              >
                Upload File
              </label>
              <div className="relative">
                <input
                  id="file-input"
                  type="file"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleFileChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {previewURL && (
              <div className="w-full">
                <img
                  src={previewURL}
                  alt="Preview"
                  className="max-w-full max-h-48 rounded-lg shadow-md"
                />
              </div>
            )}
            <button
              onClick={handleUpload}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Upload
            </button>
          </div>
        </div>
      );
};
