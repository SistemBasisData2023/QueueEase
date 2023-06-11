import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Global/Loading';
import { API_ENDPOINT } from '../../config/config';

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
      console.log(`${API_ENDPOINT}/customers/getByQueue/${queueId}`);
      try {
        const response = await axios.get<Customer>(
          `${API_ENDPOINT}/customers/getByQueue/${queueId}`
        );

        setCustomer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  const handleTransactionTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTransactionType(event.target.value);
  };

  const handleTransactionDescChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransactionDesc(event.target.value);
  };

  const handleTransactionAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      const response = await axios.post(
        `${API_ENDPOINT}/transaction/create`,
        transactionData
      );
      console.log(response.data);
      //route back to teller
      window.location.href = '/teller';
      // Perform any additional actions or show success message
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };

  return (
    <div
      className="flex items-center justify-start ml-2"
      style={{
        backgroundImage: "url('./src/assets/Background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', // Ensures the container covers the full viewport height
      }}
    >
      <div className="container flex justify-end">
      <div
        className="rounded-lg bg-gray-800 p-8 w-80 ml-60"
        style={{ borderRadius: '40px', width: '55rem' , backgroundColor: '#2C2520', borderColor: '#CECECE'}}
      >
        <div className="flex items-center mb-8">
            <img
              src={'./src/assets/Bill.png'}
              alt="User Profile"
              className="mr-4"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
            <div>
              <h2 className="text-3xl font-bold mb-1">Lurenz</h2>
              <p className="text-lg">lauren@gmail.com</p>
            </div>
          </div>
            <p className="text-xl font-bold pl-6 mb-2">Full Name: {customer?.full_name}</p>
        <p className="text-xl font-bold pl-6 mb-2">Email: {customer?.email}</p>
        <p className="text-xl font-bold pl-6 mb-2">Phone Number: {customer?.phone_number}</p>
        <p className="text-xl font-bold pl-6 mb-2">Address: {customer?.address}</p>
        <p className="text-xl font-bold pl-6 mb-2">City: {customer?.city}</p>
        <p className="text-xl font-bold pl-6 mb-2">Postal Code: {customer?.postal_code}</p>
        <p className="text-xl font-bold pl-6 mb-2">Bank Account ID: {customer?.bank_account_id}</p>
        <p className="text-xl font-bold pl-6 mb-2">Queue Number: {customer?.queue_id}</p>
      </div>
      <div className="w-2/3">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {/* {customer ? (
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
            )} */}
            <div className="mb-1 ml-40">
            <h2 className="text-4xl font-semibold mb-8">
            Transaction Form
            </h2>
            </div>
            <div className="w-4/4">
            <form onSubmit={handleTransactionSubmit}>
              <div className="mt-4 mb-1 ml-40">
                <label className="block text-xl font-regular" htmlFor="transactionType">
                  Transaction Type
                </label>
                <select
                  id="transactionType"
                  className="input input-bordered w-full"
                  style={{ backgroundColor: '#2C2520', borderColor: '#CECECE' }}
                  value={transactionType}
                  onChange={handleTransactionTypeChange}
                >
                  <option value="">Select Type</option>
                  <option value="1">Deposit</option>
                  <option value="2">Withdraw</option>
                </select>
              </div>
              <div className="mt-4 mb-1 ml-40">
                <label className="block text-xl font-regular" htmlFor="transactionDesc">
                  Transaction Description
                </label>
                <input
                  id="transactionDesc"
                  type="text"
                  className="input input-bordered w-full h-40"
                  style={{ backgroundColor: '#2C2520', borderColor: '#CECECE' }}
                  value={transactionDesc}
                  onChange={handleTransactionDescChange}
                />
              </div>
              <div className="mt-4 mb-1 ml-40">
                <label className="block text-xl font-regular" htmlFor="transactionAmount">
                  Transaction Amount
                </label>
                <input
                  id="transactionAmount"
                  type="text"
                  className="input input-bordered w-full"
                  style={{ backgroundColor: '#2C2520', borderColor: '#CECECE' }}
                  value={transactionAmount}
                  onChange={handleTransactionAmountChange}
                />
              </div>
              <div className="mt-6 ml-80">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ float: 'right', backgroundColor: '#FA9021' }}
              >
                Submit
              </button>
              </div>
            </form>
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
  
};

export default TransactionForm;
