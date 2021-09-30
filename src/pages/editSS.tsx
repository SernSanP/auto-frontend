import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Router, useRouter } from 'next/dist/client/router';

const editPayer = () => {
    const router = useRouter();
    const id = router.query.id

    const { register: register, handleSubmit: handleSubmit, formState: { errors: errors }, setValue } = useForm();

    const setform = (data) => {
        setValue("source_system_name", data.source_system_name)
        setValue("token", data.token)
    }

    useEffect(() => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        };
        const getSS = async () => {
            if (id) {
                const { data } = await axios.get('http://localhost:5000/source-system/' + id, config);
                setform(data)
            }
        };
        getSS();
    }, [id]);



    const onSubmit = data => {
        const url = 'http://localhost:5000/source-system/' + id
        axios.patch(
            url,
            {
                source_system_name: data.source_system_name,
                token: data.token,
            }
        ).catch(err => console.log(err));;
        router.push('/sourcesystems')
    }

    return (
        <div className="flex justify-between items-center grid grid-cols-1 gap-4 max-w-md">
            <nav>
                <ul className="list-none">
                    <li className="inline-block">Home {'>'}&nbsp;</li>
                    <li className="inline-block">Transactions {'>'}&nbsp;</li>
                    <li className="inline-block">Source Systems {'>'}&nbsp;</li>
                    <li className="inline-block">Edit Source System</li>
                </ul>
            </nav>
            <h1 className="text-blue-500">Edit Source System</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Source System name
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

export default editPayer
