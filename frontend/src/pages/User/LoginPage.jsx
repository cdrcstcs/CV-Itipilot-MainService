import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from '../../axiosSetUp';
import { useCookies } from "../../Cookies";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const cookie = useCookies();

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      await cookie.set('usertoken',response.data.token,{ path: '/' });
      alert("Login successful");
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/search"} />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6">Login</h1>
        <form className="space-y-4" onSubmit={handleLoginSubmit}>
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
          <div className="text-center text-gray-700">
            Don't have an account yet?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}