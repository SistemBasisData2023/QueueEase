import customerForm from "../components/customerForm/customerForm"
import { useState } from "react";

function customerFormPage() {
    const [customerId, setCustomerId] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [bankAccountId, setBankAccountId] = useState('');
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Perform form submission or validation logic here
    };
  
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Banking Queue Form</h2>
        
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="customerId">Customer ID</label>
            <input
              id="customerId"
              type="text"
              className="input input-bordered w-full"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              className="input input-bordered w-full"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="tel"
              className="input input-bordered w-full"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              className="input input-bordered w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              className="input input-bordered w-full"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="postalCode">Postal Code</label>
            <input
              id="postalCode"
              type="text"
              className="input input-bordered w-full"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="bankAccountId">Bank Account ID</label>
            <input
              id="bankAccountId"
              type="text"
              className="input input-bordered w-full"
              value={bankAccountId}
              onChange={(e) => setBankAccountId(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
    
      </div>
    );
  }
  
  export default customerFormPage;