import { Navigate } from "react-router-dom";
import { useCookies } from "../../Cookies";
import axios from '../../axiosSetUp';
import { useState, useEffect } from "react";
import { SingleImage } from "../Image/ImagePage";
export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '', 
    userType: '', 
  });
  const [user, setUser] = useState(null);
  const cookie = useCookies();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = cookie.get('usertoken');
        console.log(token);
        const resp = await axios.post(`http://localhost:4000/userdata`, {token});
        const userId = resp.data.userId;
        const userResp = await axios.get(`http://localhost:4000/users/${userId}`,{
          headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        setUser(userResp.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setRedirect('/login');
      }
    }
    if (!user) {
      fetchUserData();
    }
  }, [user]);

  async function logout() {
    cookie.set('usertoken','');
    setRedirect('/itineraries');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = cookie.get('usertoken');
      await axios.put(`http://localhost:4000/users`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (!user && !redirect) {
    return <p>Loading...</p>;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  console.log(user);
  return (
    <div className="bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Profile</h2>
            <SingleImage imageId={user.imageId} />
            <p className="mt-4 text-gray-700">Logged in as {user.name} ({user.email})</p>
            <button
              onClick={logout}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Logout
            </button>
          </div>
  
          <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium text-gray-700 mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || user.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || user.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block font-medium text-gray-700 mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="userType" className="block font-medium text-gray-700 mb-2">
                User Type:
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType || user.userType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
