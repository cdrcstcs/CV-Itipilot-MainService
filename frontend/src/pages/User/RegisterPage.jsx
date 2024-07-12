import {Link} from "react-router-dom";
import {useState} from "react";
import axios from '../../axiosSetUp';
import { ImageUploader } from "../Image/ImageUploader";
import { useNavigate } from "react-router-dom";
export default function RegisterPage() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [phone, setPhone] = useState('');
  const [imageId, setImageId] = useState('');
  const navigate = useNavigate();
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('http://localhost:4000/register', {
        imageId,
        name,
        email,
        password,
        userType,
        phone,
      });
      alert('Registration successful. Now you can log in');
      navigate("/login");
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  }
  const onImage = (imgId) =>{
    setImageId(imgId);
  }
  return (
    <div className="mt-4 grow flex items-center justify-around" style={{ flexDirection: 'column' }}>
      <div className="mb-64 w-full max-w-md mx-auto">
        <h1 className="text-4xl text-center mb-4 text-gray-800">Register</h1>
        <ImageUploader onImageUpload={onImage}></ImageUploader>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={registerUser}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="userType">
              User Type
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="userType"
              type="text"
              placeholder="ADMIN or USER"
              value={userType}
              onChange={(ev) => setUserType(ev.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="phone number"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Register
            </button>
            <div className="text-center text-gray-500">
              Already a member?{' '}
              <Link style={{ textDecoration: 'none', color: 'orangered' }} to={'/login'}>
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}