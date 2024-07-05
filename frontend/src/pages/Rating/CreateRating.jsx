import React, { useState } from 'react';
import axios from '../../axiosSetUp';
import { useCookies } from '../../Cookies';

const CreateRating = ({ onRatingCreated }) => {
  const [formData, setFormData] = useState({
    score: 0
  });
  const cookie = useCookies();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value, 10) }); // Convert value to integer
  };

  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
        const token = cookie.get('usertoken');
      console.log(formData);
      const response = await axios.post('http://localhost:4000/ratings', formData,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      console.log('Rating created:', response.data);
      onRatingCreated(response.data);
    } catch (error) {
      console.error('Error creating rating:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Rating</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="score" className="block font-medium mb-1">
            Score:
          </label>
          <input
            type="number"
            id="score"
            name="score"
            value={formData.score}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="button"
          onClick={(e) => handleSubmit(e)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateRating;
