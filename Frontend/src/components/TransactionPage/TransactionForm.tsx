import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Global/Loading';

interface Customer {
  queue_id: number;
  customer_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  postal_code: string;
  bank_account_id: string;
}

const TransactionForm: React.FC = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [transactionType, setTransactionType] = useState<string>('');
  const [transactionDesc, setTransactionDesc] = useState<string>('');
  const [transactionAmount, setTransactionAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch customer data from the API
    const fetchCustomerData = async () => {
      const queueId = sessionStorage.getItem('queue_id');
      console.log(`http://localhost:5000/customers/getByQueue/${queueId}`)
      try {
        const response = await axios.get<Customer>(`http://localhost:5000/customers/getByQueue/${queueId}`);
        
        setCustomer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  const handleTransactionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTransactionType(event.target.value);
  };

  const handleTransactionDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionDesc(event.target.value);
  };

  const handleTransactionAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionAmount(event.target.value);
  };

  const handleTransactionSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const transactionData = {
      customer_id: customer!.customer_id,
      teller_id: sessionStorage.getItem('account_id'),
      trans_type_id: transactionType,
      trans_desc: transactionDesc,
      trans_amount: transactionAmount,
    };

    try {
      const response = await axios.post('http://localhost:5000/transaction/create', transactionData);
      console.log(response.data);
      // Perform any additional actions or show success message
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };

  return (
    <div className="container">
      {isLoading ? (
        <Loading/>
      ) : (
        <>
          {customer ? (
            <div>
              <h2>Customer Details</h2>
              <p>Full Name: {customer.full_name}</p>
              <p>Email: {customer.email}</p>
              <p>Phone Number: {customer.phone_number}</p>
              <p>Address: {customer.address}</p>
              <p>City: {customer.city}</p>
              <p>Postal Code: {customer.postal_code}</p>
              <p>Bank Account ID: {customer.bank_account_id}</p>
              <p>Queue Number: {customer.queue_id}</p>
            </div>
          ) : (
            <p>No customer found.</p>
          )}

          <h2>Transaction Form</h2>
          <form onSubmit={handleTransactionSubmit}>
            <div>
              <label htmlFor="transactionType">Transaction Type:</label>
              <select id="transactionType" value={transactionType} onChange={handleTransactionTypeChange}>
                <option value="">Select Type</option>
                <option value="1">Deposit</option>
                <option value="2">Withdraw</option>
              </select>
            </div>
            <div>
              <label htmlFor="transactionDesc">Transaction Description:</label>
              <input
                type="text"
                id="transactionDesc"
                value={transactionDesc}
                onChange={handleTransactionDescChange}
              />
            </div>
            <div>
              <label htmlFor="transactionAmount">Transaction Amount:</label>
              <input
                type="text"
                id="transactionAmount"
                value={transactionAmount}
                onChange={handleTransactionAmountChange}
              />
            </div>
            <button className='btn btn-primary' type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default TransactionForm;