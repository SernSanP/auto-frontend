import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const UploadedTransactions = ({ data }) => {
  const [transactions, setTransactions] = useState<any>([]);
  const [payerList, setPayerList] = useState<any>([]);
  const [payer_id, setPayerId] = useState<any>('')
  
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  }; 

  useEffect(() => {
    const getTransactions = async () => {
      await axios
        .get(
          `http://localhost:5000/transactions?transaction_group_id=${data.transaction_group_id}`,
          config,
        )
        .then((res) => setTransactions(res.data));
    };
    const getPayerList = async () => {
      await axios
        .get('http://localhost:5000/payers', config)
        .then((res) => setPayerList(res.data));
    };
    getTransactions();
    getPayerList();
  }, []);

  const transaction_id_list = transactions.map((data:any) => data.id)
  console.log('transactions',transactions)
  console.log('payer',payerList)
  const confirmTransfer = () => {
    const data = {
      payer_id,
      transactionlist:transaction_id_list
    }
    axios.post('http://localhost:5000/transfer/start')
  }

  const selectPayer = (e:any) => {
    const {value} = e.target;
    setPayerId(value);
  }

  return (
    <div className="border bg-white shadow-sm rounded-md text-gray-500">
      <form action="">
        <div className="text-black font-bold">Uploaded 08/09/21 08:56</div>
        <div>Waiting for tranfer</div>
        <div className="flex justify-between">
          <div>Complete 0/1</div>
          <div>Total: B0</div>
        </div>
        <div className="text-center">
          <hr />
        </div>
        {transactions.map((transaction: any) => (
          <div>
            <div className="flex justify-between">
              <div>{transaction.payee_name}</div>
              <div>{transaction.amount}</div>
              <div>O</div>
              <div>
                <input type="checkbox" />
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <div>2 row selected</div>
          <div>Total: B37,000</div>
        </div>
        <div>
          <label htmlFor="Choose payer account">Choose payer account</label>
          <div className="border border-gray-500 rounded-md w-52 text-center">
            <select name="payer-accounts" onChange={selectPayer}>
              <option value="">------- select -------</option>
              {payerList.map((payer: any, index: any) => (
                <option key={index} value={payer.id}>
                  {payer.id}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="border rounded-full bg-blue-600 text-white p-2"
        >
          Confirm Transfer
        </button>
      </form>
    </div>
  );
};
