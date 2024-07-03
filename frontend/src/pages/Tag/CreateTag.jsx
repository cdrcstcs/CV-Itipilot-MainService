// TagPage.js

import React, { useState } from 'react';
import axios from '../../axiosSetUp';
import { useCookies } from '../../Cookies';

const CreateTagPage = () => {
  const [formData, setFormData] = useState({
    value: ''
  });
  const cookie = useCookies();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = cookie.get('usertoken');

      const response = await axios.post('http://localhost:4000/tags',{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      }, formData);
      console.log('Tag created:', response.data);
      // Pass the newly created tag object to the callback function
      // Optionally, you can redirect to another page or show a success message
    } catch (error) {
      console.error('Error creating tag:', error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Tag</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="value" className="block font-medium mb-1">
            Value:
          </label>
          <input
            type="text"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTagPage;
