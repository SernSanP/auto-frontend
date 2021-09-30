import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router';

const Users = () => {
    const [users, setUsers] = useState([])
    const router = useRouter();

    useEffect(() => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        };
        const getUsers = async () => {
            const { data } = await axios.get('http://localhost:5000/users', config);
            console.log('data', data)
            setUsers(data)
        };
        getUsers();
    }, []);

    const edit = (id) => {
        router.push({ pathname: '/editUser', query: { id: id } })
    }

    const create = () => {
        router.push({ pathname: '/createUser' })
    }

    const usercard = (user: any) => {
        return (
            <div className="grid grid-cols-5 py-2 gap-4 h-auto">
                <div className="col-span-2 bg-white text-center border-gray-300 appearance-none border rounded w-full text-md py-2">{user.first_name} {user.last_name}</div>
                <div className="col-span-2 bg-white text-center border-gray-300 appearance-none border rounded w-full text-md py-2">{user.email}</div>
                <button onClick={() => edit(user.id)} className="border-gray-300 bg-blue-400 appearance-none border rounded w-full">Edit</button>
            </div>
        )
    }
    return (
        <div>
            <nav>
                <ul className="list-none">
                    <li className="inline-block">Home {'>'}&nbsp;</li>
                    <li className="inline-block">Transactions {'>'}&nbsp;</li>
                    <li className="inline-block">User</li>
                </ul>
            </nav>
            <h1 className="text-blue-500">Users</h1>
            <div className="flex justify-between items-center grid grid-cols-1 gap-4 max-w-md">
                {users.map((user) => usercard(user))}
                <div className="grid grid-cols-5 py-2 gap-4 h-auto">
                    <button onClick={() => create()} className="col-start-5 border-gray-300 bg-blue-400 appearance-none border rounded w-full h-10">Create</button>
                </div>
            </div>
        </div>
    )
}

export default Users
