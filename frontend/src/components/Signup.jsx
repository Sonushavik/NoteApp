import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        email,
        password,
      });
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed.");
    }
  };

  return (
    <div className="flex justify-center  mt-20 items-center">
      <form onSubmit={handleSignup} className="bg-[#f0f0f0] p-5 rounded-md shadow-2xl shadow-blue-300 ">
        <h2 className="text-center text-blue-900 font-bold mb-2">Signup</h2>
        <div className="mb-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-1 rounded-md text-gray-500"
        />
        </div>
        <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-1 rounded-md text-gray-500"
        />
        </div>
        <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-1 rounded-md text-gray-500"
        />
        </div>
        <button type="submit" className="bg-blue-950 w-full rounded-md text-white font-bold hover:scale-105 active:scale-95 py-1">Signup</button>

        <p className="text-gray-700 font-mono">
          Already have an account? <a href="/login" className="text-purple-600 hover:text-blue-800">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
