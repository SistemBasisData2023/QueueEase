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
  const [notification, setNotification] = useState('');
  const [transactionDesc, setTransactionDesc] = useState<string>('');
  const [transactionAmount, setTransactionAmount] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isTransactionAmountValid, setTransactionAmountValid] = useState<boolean>(true);

  useEffect(() => {
    // Fetch customer data from the API
    const fetchCustomerData = async () => {
      const queueId = sessionStorage.getItem('queue_id');
      console.log(`${API_ENDPOINT}/customers/getByQueue/${queueId}`);
      try {
        setLoading(true);
        const response = await axios.get<Customer>(
          `${API_ENDPOINT}/customers/getByQueue/${queueId}`
        );

        setCustomer(response.data);
      } catch (error) {
        console.error(error);
        setNotification('Account Successfully Registered!');
      } finally {
        setLoading(false);
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
    const regexPattern = /^\d+(\.\d{1,2})?$/;
    const value = event.target.value;
    const isValid = regexPattern.test(value) || value === '';

    setTransactionAmount(value);
    setTransactionAmountValid(isValid);
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
      setLoading(true);
      const response = await axios.post(
        `${API_ENDPOINT}/transaction/create`,
        transactionData
      );
      console.log(response.data);
      // Route back to teller
      window.location.href = '/teller';
      // Perform any additional actions or show success message
    } catch (error) {
      console.error(error);
      // Handle error response
    } finally {
      setLoading(false);
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
          style={{ borderRadius: '40px', width: '55rem', backgroundColor: '#2C2520', borderColor: '#CECECE' }}
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
                  required
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
                  required
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
                  required
                  style={{ backgroundColor: '#2C2520', borderColor: '#CECECE' }}
                  value={transactionAmount}
                  onChange={handleTransactionAmountChange}
                />
                {!isTransactionAmountValid && (
                  <p className="text-sm text-red-500 mt-1">
                    Please enter a valid transaction amount.
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ float: 'right', backgroundColor: '#FA9021' }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-5.291A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
              {notification && (
                <div className="mt-4 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-auto"
                    fill="#2F855A"
                    viewBox="0 0 24 24"
                    stroke="#FFF"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-green-900">{notification}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
