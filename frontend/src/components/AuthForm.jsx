import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await axios.post(`${process.env.BACKEND_URL}${endpoint}`, payload);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error(isLogin ? "Login failed" : "Registration failed", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto  dark:bg-gray-900 text-black dark:text-white bg-gray-500 rounded-md mt-24">
      <h1 className="text-2xl font-bold mb-4 text-white">{isLogin ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-800"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-800"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full cursor-pointer">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p className="mt-4 text-center text-white">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className=" underline cursor-pointer text-blue-400"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;