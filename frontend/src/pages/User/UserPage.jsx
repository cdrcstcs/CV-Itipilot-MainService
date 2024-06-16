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
    <div>
      <h1>User Details</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>User Type: {user.userType}</p>
    </div>
  );
};

export default UserPage;
