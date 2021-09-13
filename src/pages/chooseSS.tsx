import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const ChooseSS = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  async function onSubmit(data: any) {
    console.log(data);
  }
  console.log(watch('example'));
  return (
    <div className="items-center justify-center bg-gray-200 px-8 pt-8 pb-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Choose Source System
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register('SS')}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="border border-blue bg-blue-600 rounded-full hover:bg-blue-700 text-white font-bold py-2 px-4"
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center pt-2">
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseSS;
