import React from "react";
import { UploadedTransactions } from "./components/UploadedTransactions";

const transactions = () => {
  return (
    <div>
      <nav>
        <ul className="list-none">
          <li className="inline-block">Home {">"}&nbsp;</li>
          <li className="inline-block">Transactions</li>
        </ul>
      </nav>
      <div className="flex justify-between">
        <h1 className="text-blue-500">Transactions</h1>
        <button className="border border-blue bg-blue-600 p-2 rounded-full">
          <p className="text-white">&nbsp;+{' '}Upload&nbsp;&nbsp;</p>
        </button>
      </div>
      <div>
        Page 1/2
      </div>
      <div>
        <UploadedTransactions></UploadedTransactions>
      </div>
    </div>
  );
};

export default transactions;
