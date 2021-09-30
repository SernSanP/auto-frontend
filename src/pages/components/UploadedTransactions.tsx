import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GrStatusGoodSmall } from 'react-icons/gr';
import ResultModal from './ResultModal';

export const UploadedTransactions = ({ transaction_group_data }) => {
  const [transactions, setTransactions] = useState<any>([]);
  const [payerList, setPayerList] = useState<any>([]);
  const [payer_id, setPayerId] = useState<any>('');
  const [transactionList, setTransactionList] = useState<any>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultModalData, setResultModalData] = useState();

  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  useEffect(() => {
    const getTransactions = async () => {
      await axios
        .get(
          `http://localhost:5000/transactions?transaction_group_id=${transaction_group_data.id}`,
          config,
        )
        .then((res) => setTransactions(res.data));
    };
    const getPayerList = async () => {
      await axios
        .get('http://localhost:5000/payers', config)
        .then((res) => setPayerList(res.data));
    };
    const interval = setInterval(() => getTransactions(), 3000);
    getPayerList();
    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log('list', transactionList);

  const confirmTransfer = (e) => {
    e.preventDefault();
    if (transactionList.length === 0) {
      alert('Please Select Payee');
    }
    if (payer_id === null || payer_id === '' || payer_id === undefined) {
      alert('Please Select Payer Account');
    } else {
      const data = {
        payer_id,
        transactionlist: transactionList,
      };
      axios
        .post('http://localhost:5000/transfer/start', data)
        .then((res) => console.log(res.data));
    }
  };

  const selectAllCheckbox = () => {
    if (transactionList.length === 0) {
      let total = 0;
      const selectedTransactionList = transactions.reduce((prev, curr) => {
        if (curr.status_type !== 'success') {
          total = total + Number(curr.amount);
          prev.push(curr.id);
        }
        return prev;
      }, []);
      setTransactionList(selectedTransactionList);
      setTotalAmount(total);
    } else {
      setTransactionList([]);
      setTotalAmount(0);
    }
  };

  const selectCheckbox = (id: any, amount: any) => {
    const selectedTransactionList = transactionList;
    const findIdx = selectedTransactionList.indexOf(id);
    if (findIdx > -1) {
      selectedTransactionList.splice(findIdx, 1);
      setTotalAmount(totalAmount - Number(amount));
    } else {
      selectedTransactionList.push(id);
      setTotalAmount(totalAmount + Number(amount));
    }
    setTransactionList(selectedTransactionList);
  };

  const selectPayer = (e: any) => {
    const { value } = e.target;
    setPayerId(value);
  };

  const successTransactions = transactions.filter(
    (item: { status_type: string }) => item.status_type === 'success',
  );

  const totalSuccessAmount = successTransactions.reduce(
    (prev: number, curr: { amount: any }) => prev + Number(curr.amount),
    0,
  );

  const uploadedDateTime = () => {
    const date_time = new Date(transaction_group_data.created_at);
    const date = date_time.toLocaleDateString('en-BZ');
    const time = date_time.toLocaleTimeString('th');
    return { date, time };
  };

  const openResultModal = (transaction) => {
    setShowResultModal(true);
    setResultModalData(transaction);
  };

  return (
    <div className="border bg-white shadow-sm rounded-md text-gray-500 px-4 py-2 mt-4">
      <form>
        <div className="text-black font-bold">
          Uploaded {uploadedDateTime().date} {uploadedDateTime().time}
        </div>
        <div>Waiting for tranfer</div>
        <div className="flex justify-between">
          <div>{`Complete ${successTransactions.length}/${transactions.length}`}</div>
          <div>Total: B{totalSuccessAmount.toFixed(2)}</div>
        </div>
        <div className="text-center">
          <hr />
        </div>
        <div>
          <div className="text-right">
            <input
              type="checkbox"
              onChange={selectAllCheckbox}
              checked={
                transactionList.length ===
                transactions.filter(
                  (transaction: { status_type: string }) =>
                    transaction.status_type !== 'success',
                ).length && transactionList.length !== 0
              }
              disabled={successTransactions.length === transactions.length}
            />
          </div>
          {transactions.map(
            (transaction: any, index: React.Key | null | undefined) => (
              <div key={index} className="grid grid-cols-4">
                <div>{transaction.payee_name}</div>
                <div className="text-right">
                  {transaction.amount.toFixed(2)}
                </div>
                <div
                  className="flex items-center justify-end hover:cursor-pointer"
                  onClick={() => openResultModal(transaction)}
                >
                  {transaction.status_type === null ? (
                    <GrStatusGoodSmall color="#338DFF" />
                  ) : transaction.status_type === 'processing' ? (
                    <GrStatusGoodSmall color="#FFC300" />
                  ) : transaction.status_type === 'success' ? (
                    <GrStatusGoodSmall color="#59FF00" />
                  ) : transaction.status_type === 'failure' ? (
                    <GrStatusGoodSmall color="#FF000F" />
                  ) : null}
                </div>
                <div className="text-right">
                  <input
                    type="checkbox"
                    onChange={() =>
                      selectCheckbox(transaction.id, transaction.amount)
                    }
                    checked={transactionList.includes(transaction.id)}
                    disabled={successTransactions.some(
                      (item: { id: string }) => item.id === transaction.id,
                    )}
                  />
                </div>
              </div>
            ),
          )}
          <ResultModal
            showResultModal={showResultModal}
            setShowResultModal={setShowResultModal}
            transaction={resultModalData}
          />
        </div>
        <div className="flex justify-between">
          <div>{transactionList.length} row selected</div>
          <div>{totalAmount.toFixed(2)}</div>
        </div>
        <div>
          <label htmlFor="Choose payer account">Choose payer account</label>
          <div className="border border-gray-500 rounded-md w-52 text-center">
            <select name="payer-accounts" onChange={selectPayer}>
              <option value="">------- select -------</option>
              {payerList.map((payer: any, index: any) => (
                <option key={index} value={payer.id}>
                  {payer.payer_bank_account}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="border rounded-full bg-blue-600 text-white p-2 mt-2"
          onClick={confirmTransfer}
        >
          Confirm Transfer
        </button>
      </form>
    </div>
  );
};
