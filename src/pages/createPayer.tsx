import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';


const createPayer = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => axios.post(
        'http://localhost:5000/payers',
        {
          created_user_id: data.id,
          source_system_name:"ssn_test",
          payer_bank_abbr:data.payer_bank_abbr,
          payer_bank_account:data.payer_bank_account,
          payer_msisdn:data.payer_msisdn,
        }
      );
    // const onSubmit =(data)=> console.log(data)
    const [users, setUsers] = useState([])
    useEffect(() => {
        const config = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        };
        const getUsers = async () => {
          const { data } = await axios.get('http://localhost:5000/users', config);
          console.log('data',data)
          setUsers(data)
        };
        getUsers();
      }, []);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>Create Payer</div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Select Payer
                    </label>
                    <select {...register("Payer")}
                        className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {users.map((user) => (
                            <option value={user.id}>{user.email}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Bank abbr
                    </label>
                    <input {...register("payer_bank_abbr")} 
                        className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Bank Account
                    </label>
                    <input {...register("payer_bank_account")}
                        className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        msisdn
                    </label>
                    <input {...register("payer_msisdn")} 
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

export default createPayer
