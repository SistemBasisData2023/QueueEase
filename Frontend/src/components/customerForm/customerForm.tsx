import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from '../../config/config';
import Navbar from '../Global/Navbar';

function CustomerFormPage() {
  const [customerId, setCustomerId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [bankAccountId, setBankAccountId] = useState('');
  const [notification, setNotification] = useState('');
  const [isPhoneNumberValid, setPhoneNumberValid] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const handlephoneNumber = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const regexPattern = /^\d+(\.\d{1,2})?$/;
      const value = event.target.value;
      const isValid = regexPattern.test(value) || value === '';
  
      setPhoneNumber(value);
      setPhoneNumberValid(isValid);
    };

    try {
      setLoading(true); // Start the loading state

      // Prepare the form data
      const formData = {
        full_name: fullName,
        email,
        phone_number: phoneNumber,
        address,
        city,
        postal_code: postalCode,
        bank_account_id: bankAccountId,
      };

      console.log(formData);

      // Send the POST request to the backend
      await axios.post(`${API_ENDPOINT}/customers/add`, formData);

      // Clear the form inputs
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setAddress('');
      setCity('');
      setPostalCode('');
      setBankAccountId('');

      // Display a success notification
      setNotification('Account Successfully Registered!');

      // Stop the loading state after 3 seconds
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Display an error notification
      setNotification('An error occurred. Please try again later.');
      setLoading(false); // Stop the loading state
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="p-20 flex items-center justify-center"
        style={{
          backgroundImage: "url('./src/assets/Background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh', // Ensures the container covers the full viewport height
        }}
      >
        <div className="mb-1">
          <h2 className="text-4xl font-semibold mb-8 text-center">
            Customer Form
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-1">
              <label className="block lg-2 font-bold" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className="input input-bordered w-full"
                style={{ backgroundColor: '#2C2520', borderColor: '#CECECE' }}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label className="block mb-2 font-bold" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input input-bordered w-full"
                style={{ backgroundColor: '#2C2520', borderColor: '#CECECE' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label className="block mb-2 font-bold" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="tel"
                className="input input-bordered w-full"
                style={{ backgroundColor: '#2C2520', borderColor: '#CECECE' }}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {!isPhoneNumberValid && (
                <p className="text-sm text-red-500 mt-1">
                  Please enter a valid phone number.
                </p>
              )}
            </div>
            <div className="mb-1">
              <label className="block mb-2 font-bold" htmlFor="address">
                Address
              </label>
              <input
                id="address"
                type="text"
                className="input input-bordered w-full"
                style={{ backgroundColor: '#2C2520', borderColor: '#CECECE' }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-1 flex">
              <div className="w-1/2 pr-2">
                <label className="block mb-2 font-bold" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  className="input input-bordered w-full"
                  style={{ backgroundColor: '#2C2520', borderColor: '#CECECE' }}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block mb-2 font-bold" htmlFor="postalCode">
                  Postal Code
                </label>
                <input
                  id="postalCode"
                  type="text"
                  className="input input-bordered w-full"
                  style={{ backgroundColor: '#2C2520', borderColor: '#CECECE' }}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="bankAccountId">
                Bank Account ID
              </label>
              <input
                id="bankAccountId"
                type="text"
                className="input input-bordered w-full"
                style={{ backgroundColor: '#2C2520', borderColor: '#CECECE' }}
                value={bankAccountId}
                onChange={(e) => setBankAccountId(e.target.value)}
              />
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-900">{notification}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerFormPage;
