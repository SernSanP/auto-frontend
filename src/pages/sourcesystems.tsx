import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router';

const Source_Systems = () => {
    const [sourceSystems, setSourceSystems] = useState([])
    const router = useRouter();

    useEffect(() => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        };
        const SourceSystems = async () => {
            const { data } = await axios.get('http://localhost:5000/source-system', config);
            console.log('data', data)
            setSourceSystems(data)
        };
        SourceSystems();
    }, []);

    const edit = (id) => {
        router.push({ pathname: '/editSS', query: { id: id } })
    }

    const create = () => {
        router.push({ pathname: '/createSS' })
    }

    const SourceSystemcard = (ss: any) => {
        return (
            <div className="grid grid-cols-4 py-2 gap-4 h-auto">
                <div className="col-span-2 bg-white text-center border-gray-300 appearance-none border rounded w-full text-md py-2">{ss.source_system_name}</div>
                <button onClick={() => edit(ss.id)} className="border-gray-300 bg-blue-400 appearance-none border rounded w-full">Edit</button>
            </div>
        )
    }
    return (
        <div>
            <nav>
                <ul className="list-none">
                    <li className="inline-block">Home {'>'}&nbsp;</li>
                    <li className="inline-block">Transactions {'>'}&nbsp;</li>
                    <li className="inline-block">Source Systems</li>
                </ul>
            </nav>
            <h1 className="text-blue-500">Source Systems</h1>
            <div className="flex justify-between items-center grid grid-cols-1 gap-4 max-w-md">
                {sourceSystems.map((sourceSystem) => SourceSystemcard(sourceSystem))}
                <div className="grid grid-cols-5 py-2 gap-4 h-auto">
                    <button onClick={() => create()} className="col-start-5 border-gray-300 bg-blue-400 appearance-none border rounded w-full h-10">Create</button>
                </div>
            </div>
        </div>
    )
}

export default Source_Systems
