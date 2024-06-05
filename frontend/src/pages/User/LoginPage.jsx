import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
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
      cookie.set('token',response.data.token,{ path: '/' });
      // console.log(response.data.token);
      alert("Login successful");
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/itineraries"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-white">
            Don't have an account yet?{" "}
            <Link style={{ textDecoration: 'none' , color:'orangered'}} to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}