import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UploadedTransactions } from './components/UploadedTransactions';
import { useRouter } from 'next/dist/client/router';

const transactions = () => {
  const router = useRouter();
  const [transactionGroups, setTransactionGroups] = useState<any[]>([]);
  const [sourceSystem, setSourceSystem] = useState('');

  useEffect(() => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    const getTransactionGroups = async () => {
      const source_system_name: any =
        localStorage.getItem('source_system_name');
      setSourceSystem(source_system_name);
      const { data: transactions } = await axios.get(
        `http://localhost:5000/transactions?source_system_name=${source_system_name}`,
        config,
      );
      const transaction_groups_id = transactions.reduce(
        (arr: any, item: any) => {
          const index = arr.findIndex(
            (element: any) => element === item.transaction_group_id,
          );
          if (index === -1) {
            arr.push(item.transaction_group_id);
          }
          return arr;
        },
        [],
      );
      let transaction_groups = [];
      for (let i = 0; i < transaction_groups_id.length; i++) {
        const { data } = await axios.get(
          `http://localhost:5000/transaction-groups/${transaction_groups_id[i]}`,
        );
        transaction_groups.push(data);
      }
      setTransactionGroups(transaction_groups);
    };

    getTransactionGroups();
  }, []);

  const goToUpload = () => {
    router.push('/upload');
  };

  return (
    <div>
      <nav>
        <ul className="list-none">
          <li className="inline-block">
            {sourceSystem} {'>'}&nbsp;
          </li>
          <li className="inline-block">Transactions</li>
        </ul>
      </nav>
      <div className="flex justify-between items-center">
        <h1 className="text-blue-500">Transactions</h1>
        <button
          className="border border-blue bg-blue-600 py-2 px-4 rounded-full"
          onClick={goToUpload}
        >
          <p className="text-white">&nbsp;+ Upload&nbsp;&nbsp;</p>
        </button>
      </div>
      <div className="flex space-x-4">
        <div>{'<'}</div>
        <div>Page 1/2</div>
        <div>{'>'}</div>
      </div>
      <div className="mt-6">
        {transactionGroups.map((group,index) => (
          <UploadedTransactions key={index} transaction_group_data={group} />
        ))}
      </div>
    </div>
  );
};

export default transactions;
