import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex justify-center  mt-20 items-center">
      <form onSubmit={handleLogin} className="bg-[#f0f0f0] p-5 rounded-md shadow-2xl shadow-blue-300 ">
        <h2 className="text-center text-blue-900 font-bold">Welcome Back!</h2>
        <p className="text-purple-600 mb-2 text-center ">Please login to your account</p>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          className="w-full p-1 rounded-md text-gray-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-1 rounded-md text-gray-500"
          />
        </div>
        <button type="submit" className="bg-blue-950 w-full rounded-md text-white font-bold hover:scale-105 active:scale-95 py-1">Login</button>
        <p className="text-gray-700 font-mono">
          Don’t have an account? <a href="/signup" className="text-purple-600 hover:text-blue-800">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
