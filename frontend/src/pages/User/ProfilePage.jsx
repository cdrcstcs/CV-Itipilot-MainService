import { useContext, useState } from "react";
import { UserContext } from "./UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../../Navbar.jsx";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '', // Add password field
    userType: '', // Add userType field
  });
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${user._id}`, formData);
      // Optionally, you can update the user context with the updated user data
      setUser({ ...user, ...formData });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
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
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  );
}
