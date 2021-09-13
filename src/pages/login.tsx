import axios from 'axios';
import { Router } from 'next/dist/client/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import cookie from 'js-cookie';

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    const credentials = {
      email: username,
      password,
    };
    e.preventDefault();
    axios
      .post('http://localhost:5000/auth/signin', credentials)
      .then((res) => localStorage.set('token',res.data.token))
      .catch((error) => {
        setLoginError(error.message);
      });
    
  };

  return (
    <div className="w-full max-w-xs">
      <form className="" onSubmit={login}>
        <div>Please Login</div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            name="username"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="border border-blue bg-blue-600 text-white py-2 px-4 rounded-full"
            type="submit"
          >
            Login
          </button>
        </div>
        {loginError && <p className="text-red-400">{loginError}</p>}
      </form>
    </div>
  );
};

export default Login;
