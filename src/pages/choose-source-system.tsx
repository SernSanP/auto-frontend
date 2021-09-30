import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { config } from 'process';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const ChooseSS = () => {
  const router = useRouter();
  const [sourceSystems, setSourceSystems] = useState([]);

  useEffect(() => {
    localStorage.removeItem('source_system_name');
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    const getSourcesystem = async () => {
      await axios
        .get('http://localhost:5000/users-source-systems', config)
        .then((res) => setSourceSystems(res.data));
    };
    getSourcesystem();
  }, []);

  const logout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const selectSourceSystem = (e: { target: { value: any } }) => {
    const { value } = e.target;
    localStorage.setItem('source_system_name', value);
  };

  const handleSubmit = () => {
    const source_system = localStorage.getItem('source_system_name');
    if (source_system !== 'undefined' && source_system !== null) {
      router.push('/transactions');
    }
    else{
      alert("Please Select Source System First")
    }
  };

  return (
    <div className="items-center justify-center bg-gray-200 px-8 pt-8 pb-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Choose Source System
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="source-systems"
            onChange={selectSourceSystem}
          >
            <option value="">------- select -------</option>
            {sourceSystems.map((sourceSystem: any, index) => (
              <option key={index} value={sourceSystem.source_system_name}>
                {sourceSystem.source_system_name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="border border-blue bg-blue-600 rounded-full hover:bg-blue-700 text-white font-bold py-2 px-4"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
        <div className="flex items-center justify-center pt-2">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseSS;
