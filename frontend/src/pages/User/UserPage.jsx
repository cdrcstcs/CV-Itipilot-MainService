import React, { useState, useEffect } from 'react';
import axios from '../../axiosSetUp';
import { useCookies } from '../../Cookies';

const UserPage = ({ userId }) => {
  const [user, setUser] = useState(null);
  const cookie = useCookies();
  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  const fetchUser = async (userId) => {
    try {
      const token = cookie.get('usertoken');
      
      const response = await axios.get(`http://localhost:4000/users/${userId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">User Details</h1>
      <div className="space-y-4">
        <div>
          <p className="font-medium text-gray-700">Name:</p>
          <p className="text-gray-600">{user.name}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Email:</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">User Type:</p>
          <p className="text-gray-600">{user.userType}</p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
