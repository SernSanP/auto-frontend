import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';


const createUser = () => {
    const { register, handleSubmit } = useForm();
    // const onSubmit = data => axios.post(
    //     'http://localhost:5000/payers',
    //     {
    //         created_user_id: data.id,
    //         source_system_name: "ssn_test",
    //         payer_bank_abbr: data.payer_bank_abbr,
    //         payer_bank_account: data.payer_bank_account,
    //         payer_msisdn: data.payer_msisdn,
    //     }
    // );
    const onSubmit = (data) => console.log(data)

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>Create User</div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input {...register("email")}
                        className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input {...register("password")}
                        className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        First name
                    </label>
                    <input {...register("first_name")}
                        className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Last name
                    </label>
                    <input {...register("last_name")}
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

export default createUser
