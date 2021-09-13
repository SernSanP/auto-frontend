import React from "react";

export const UploadedTransactions = () => {
  return (
    <div className="border bg-white shadow-sm rounded-md text-gray-500">
      <form action="">
        <div className="text-black font-bold">Uploaded 08/09/21 08:56</div>
        <div>Waiting for tranfer</div>
        <div className="flex justify-between">
          <div>Complete 0/2</div>
          <div>Total: B0</div>
        </div>
        <div className="text-center"><hr/></div>
        <div className="">
          <div className="flex justify-between">
            <div>สมชาย สายสมร</div>
            <div>B12,000</div>
            <div>o</div>
            <div>
              <input type="checkbox" />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div>2 row selected</div>
          <div>Total: B37,000</div>
        </div>
        <div>
          <label htmlFor="Choose payer account">Choose payer account</label>
          <div className="border border-gray-500 rounded-md w-52 text-center">
            <select name="payer-accounts">
              <option value="none">------- select -------</option>
              <option value="xxxx">xxxx - ชูใจ ไปดี</option>
            </select>
          </div>
        </div>
        <button type="submit" className="border rounded-full bg-blue-600 text-white p-2">
          Confirm Transfer
        </button>
      </form>
    </div>
  );
};
