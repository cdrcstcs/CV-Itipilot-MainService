import { Navigate } from "react-router-dom";
import { useCookies } from "../../Cookies";
import axios from "axios";
import { useState, useEffect } from "react";

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
        const token = cookie.get('Token');
        const resp = await axios.get(`http://localhost:4000/userdata`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userId = resp.data.userId;
        const userResp = await axios.get(`http://localhost:4000/users/${userId}`);
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
    cookie.set('Token','');
    setRedirect('/itineraries');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = cookie.get('Token');
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

  return (
    <div>
      <div className="text-center max-w-lg mx-auto">
        <h2>Profile</h2>
        <p>Logged in as {user.name} ({user.email})</p>
        <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        <h3>Edit Profile</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name || user.name} onChange={handleChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email || user.email} onChange={handleChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password || ''} onChange={handleChange} />
          </div>
          <div>
            <label>User Type:</label>
            <select name="userType" value={formData.userType || user.userType} onChange={handleChange}>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
          </div>
          {/* Add more fields as needed */}
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
