import React, { useState } from 'react';

function TransactionForm() {
  const [transTypeId, setTransTypeId] = useState('');
  const [transDate, setTransDate] = useState('');
  const [transDesc, setTransDesc] = useState('');
  const [transAmount, setTransAmount] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform form submission or validation logic here
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Transaction Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="transTypeId">Transaction Type ID</label>
          <input
            id="transTypeId"
            type="number"
            className="input input-bordered w-full"
            value={transTypeId}
            onChange={(e) => setTransTypeId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="transDate">Transaction Date</label>
          <input
            id="transDate"
            type="text"
            className="input input-bordered w-full"
            value={transDate}
            onChange={(e) => setTransDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="transDesc">Transaction Description</label>
          <textarea
            id="transDesc"
            className="textarea textarea-bordered w-full"
            rows={4}
            value={transDesc}
            onChange={(e) => setTransDesc(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="transAmount">Transaction Amount</label>
          <input
            id="transAmount"
            type="number"
            className="input input-bordered w-full"
            value={transAmount}
            onChange={(e) => setTransAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default TransactionForm;
