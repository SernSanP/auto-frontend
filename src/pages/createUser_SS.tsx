import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';


const createUser_SS = () => {
    const { register, handleSubmit } = useForm();
    const [sourceSystem, setSourceSystem] = useState([])
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

    useEffect(() => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        };
        const getSS = async () => {
            const { data } = await axios.get('http://localhost:5000/source-system', config);
            console.log('data', data)
            setSourceSystem(data)
        };
        getSS();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>Create User Source System</div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Select Source System
                    </label>
                    <select {...register("source_system_name")}
                        className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {sourceSystem.map((sourceSystem) => (
                            <option value={sourceSystem.source_system_name}>{sourceSystem.source_system_name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Select Role
                    </label>
                    <select {...register("role")}
                        className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="user">User</option>
                        <option value="SourceSystem Admin">SourceSystem Admin</option>
                        <option value="Admin">Admin</option>
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

export default createUser_SS
