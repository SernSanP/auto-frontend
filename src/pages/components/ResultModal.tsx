import React from 'react';

const ResultModal = ({ showResultModal, setShowResultModal, transaction }) => {
  const closeResultModal = () => {
    setShowResultModal(false);
  };

  return (
    <div>
      {showResultModal && (
        <div className="fixed flex items-center py-5 justify-center top-0 right-0 bottom-0 left-0 bg-black bg-opacity-70 z-50">
          <div className="relative bg-gray-200 m-5 p-6 pt-4 md:p-8 md:pt-6 rounded-2xl w-96 max-w-full max-h-full overflow-auto">
            <button
              className="inline-block absolute text-lg text-gray-600 top-4 right-4 focus:outline-none"
              onClick={closeResultModal}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
              </svg>
            </button>
            <div>
              <h2 className="text-xl mb-2">Result</h2>
              <div>ผู้รับเงิน: {transaction.payee_name}</div>
              <div>จำนวนเงิน: {transaction.amount}</div>
              <div>สถานะ: {transaction.status_type}</div>
              <div>หมายเหตุ: {transaction.status_message}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultModal;
