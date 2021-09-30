import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router';

const Payers = () => {
    const [payers, setPayers] = useState([])
    const router = useRouter();

    useEffect(() => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        };
        const getPayers = async () => {
            const { data } = await axios.get('http://localhost:5000/payers', config);
            console.log('data', data)
            setPayers(data)
        };
        getPayers();
    }, []);

    const edit = (id) => {
        router.push({ pathname: '/editPayer', query: { id: id } })
    }

    const create = () => {
        router.push({ pathname: '/createPayer' })
    }

    const payercard = (payer: any) => {
        return (
            <div className="grid grid-cols-4 py-2 gap-4 h-auto">
                <div className="col-span-3 bg-white text-center border-gray-300 appearance-none border rounded w-full text-xl py-2">{payer.payer_name}</div>
                <button onClick={() => edit(payer.id)} className="border-gray-300 bg-blue-400 appearance-none border rounded w-full">Edit</button>
            </div>
        )
    }
    return (
        <div>
            <nav>
                <ul className="list-none">
                    <li className="inline-block">Home {'>'}&nbsp;</li>
                    <li className="inline-block">Transactions {'>'}&nbsp;</li>
                    <li className="inline-block">Payer</li>
                </ul>
            </nav>
            <h1 className="text-blue-500">Payers</h1>
            <div className="flex justify-between items-center grid grid-cols-1 gap-4 max-w-md">
                {payers.map((payer) => payercard(payer))}
                <div className="grid grid-cols-4 py-2 gap-4 h-auto">
                    <button onClick={() => create()} className="col-start-4 border-gray-300 bg-blue-400 appearance-none border rounded w-full h-10">Create</button>
                </div>
            </div>
        </div>
    )
}

export default Payers
