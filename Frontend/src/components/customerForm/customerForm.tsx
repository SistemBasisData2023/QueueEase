import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from '../../config/config';
import Navbar from '../Global/Navbar';

function CustomerFormPage() {
  const [customerId, setCustomerId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [bankAccountId, setBankAccountId] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
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
      setNotification('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Display an error notification
      setNotification('An error occurred. Please try again later.');
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
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerFormPage;
