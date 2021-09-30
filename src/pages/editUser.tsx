import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { getBankFromAbbr } from 'src/bank';
import { Router, useRouter } from 'next/dist/client/router';

const editUser = () => {
    const router = useRouter();
    const id = router.query.id

    const { register: register, handleSubmit: handleSubmit, formState: { errors: errors }, setValue } = useForm();

    const setform = (data) => {
        setValue("email", data.email)
        setValue("first_name", data.first_name)
        setValue("last_name", data.last_name)
        setValue("is_admin", data.is_admin)
        setValue("is_blocked", data.is_blocked)
    }

    useEffect(() => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        };
        const getPayer = async () => {
            if (id) {
                const { data } = await axios.get('http://localhost:5000/users/' + id, config);
                console.log(data)
                setform(data)
            }
        };
        getPayer();
    }, [id]);



    const onSubmit = data => {
        // const url = 'http://localhost:5000/payers/' + id
        // axios.patch(
        //     url,
        //     {
        //         payer_name: data.payer_name,
        //         payer_bank_abbr: data.payer_bank_abbr,
        //         payer_bank_account: data.payer_bank_account,
        //         payer_msisdn: data.payer_msisdn,
        //         is_disabled: data.is_disabled == 'true' ? true : false
        //     }
        // ).catch(err => console.log(err));;
        // router.push('/payerList')
        console.log(data)
    }

    return (
        <div className="flex justify-between items-center grid grid-cols-1 gap-4 max-w-md">
            <nav>
                <ul className="list-none">
                    <li className="inline-block">Home {'>'}&nbsp;</li>
                    <li className="inline-block">Transactions {'>'}&nbsp;</li>
                    <li className="inline-block">Users {'>'}&nbsp;</li>
                    <li className="inline-block">Edit User</li>
                </ul>
            </nav>
            <h1 className="text-blue-500">Edit User</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        First_name
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
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Admin
                    </label>
                    <select {...register("is_admin")}
                        className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Status
                    </label>
                    <select {...register("is_blocked")}
                        className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value={true}>Blocked</option>
                        <option value={false}>Not Blocked</option>
                    </select>
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

export default editUser
