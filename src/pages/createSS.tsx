import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';


const createSS = () => {
    const { register, handleSubmit } = useForm();
    // const onSubmit = data => axios.post(
    //     'http://localhost:5000/source-system',
    //     {
    //         source_system_name: data.source_system_name,
    //         token: data.token
    //     }
    // );
    const onSubmit = (data) => console.log(data)

    return (
        <div className="flex justify-between items-center grid grid-cols-1 gap-4 max-w-md">
            <nav>
                <ul className="list-none">
                    <li className="inline-block">Home {'>'}&nbsp;</li>
                    <li className="inline-block">Transactions {'>'}&nbsp;</li>
                    <li className="inline-block">Source Systems {'>'}&nbsp;</li>
                    <li className="inline-block">Create Source Systems</li>
                </ul>
            </nav>
            <h1 className="text-blue-500">Create Source Systems</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Source System Name
                    </label>
                    <input {...register("source_system_name")}
                        className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Token
                    </label>
                    <input {...register("token")}
                        className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="border border-blue bg-blue-600 text-white py-2 px-4 rounded-full"
                        type="submit"
                    >
                        submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default createSS
