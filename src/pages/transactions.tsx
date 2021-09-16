import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UploadedTransactions } from './components/UploadedTransactions';

const transactions = () => {

  const [transactions, setTransactions] = useState([])
  useEffect(() => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    const getSourcesystem = async () => {
      const { data } = await axios.get('http://localhost:5000/transactions', config);
      console.log('data',data)
    };
    getSourcesystem();
  }, []);

  return (
    <div>
      <nav>
        <ul className="list-none">
          <li className="inline-block">Home {'>'}&nbsp;</li>
          <li className="inline-block">Transactions</li>
        </ul>
      </nav>
      <div className="flex justify-between items-center">
        <h1 className="text-blue-500">Transactions</h1>
        <button className="border border-blue bg-blue-600 py-2 px-4 rounded-full">
          <p className="text-white">&nbsp;+ Upload&nbsp;&nbsp;</p>
        </button>
      </div>
      <div className="flex space-x-4">
        <div>{'<'}</div>
        <div>Page 1/2</div>
        <div>{'>'}</div>
      </div>
      <div className="pt-6">
        <UploadedTransactions></UploadedTransactions>
      </div>
    </div>
  );
};

export default transactions;
