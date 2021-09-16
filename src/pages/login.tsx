import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const login = async (e: { preventDefault: () => void }) => {
    localStorage.clear()
    e.preventDefault();
    const credentials = {
      email,
      password,
    };
    await axios
      .post('http://localhost:5000/auth/signin', credentials)
      .then((res) => localStorage.setItem('token', res.data.accessToken))
      .then(() => router.push('/chooseSS'));
  };

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={login}>
        <div>Please Login</div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
