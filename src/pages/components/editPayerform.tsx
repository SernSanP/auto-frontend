import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { getBankFromAbbr } from 'src/bank';

const editPayer = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selected, setSelected] = useState({})
    const [isSelected, setIsSelected] = useState(false)
    const onSubmit = data => {
        axios.post(
            'http://localhost:5000/payers/$',
            {
                created_user_id: data.id,
                source_system_name: "ssn_test",
                payer_bank_abbr: data.payer_bank_abbr,
                payer_bank_account: data.payer_bank_account,
                payer_msisdn: data.payer_msisdn,
            }
        ).catch(err => console.log(err));;
    }

    const onSubmit = (data) => console.log(data)
    const [payers, setPayers] = useState([])
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

    const onselect = () => {
        // setSelected({
        //     "id": "08ac3187-e0fe-4ab8-94ca-2c8cdf6f731f",
        //     "created_user_id": "1b8b4ee5-0fac-4a61-acf3-bd237cba0b71",
        //     "payer_name": "sern",
        //     "source_system_name": "asd",
        //     "payer_bank_abbr": "KBNK",
        //     "payer_bank_account": "asd",
        //     "payer_msisdn": "asd",
        //     "is_disabled": false
        // })
        setIsSelected(true)
    }


    return (
        <div>
            <div>Edit Payer</div>
            {isSelected ? "" :
                <div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Select Payer
                        </label>
                        <select
                            className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => setSelected(e.target.value)}
                        >
                            {payers.map((payer) => (
                                <option value={payer}>{payer.payer_name}</option>
                            ))}
                        </select>
                        <button
                            className="border border-blue bg-blue-600 text-white py-2 px-4 rounded-full"
                            onClick={() => onselect()}
                        >
                            Select
                        </button>
                    </div>
                </div>}
            {isSelected ?
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Bank abbr
                        </label>
                        <input {...register("payer_bank_abbr", {
                            validate: value => getBankFromAbbr(value) || "Nice try!"
                        })}
                            className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            defaultValue={selected.payer_bank_abbr}
                            placeholder={selected.payer_bank_abbr}
                        />
                        {errors.payer_bank_abbr?.type === 'validate' && (<div className="text-red-600">Bank Not Found</div>)}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Bank Account
                        </label>
                        <input {...register("payer_bank_account")}
                            className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            defaultValue={selected.payer_bank_account}
                            placeholder={selected.payer_bank_account}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            msisdn
                        </label>
                        <input {...register("payer_msisdn")}
                            className="border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            defaultValue={selected.payer_msisdn}
                            placeholder={selected.payer_msisdn}
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
                </form> : ""}
        </div>
    )
}

export default editPayer
