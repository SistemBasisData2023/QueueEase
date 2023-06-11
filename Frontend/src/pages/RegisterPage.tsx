import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from '../config/config';

interface RegisterFormData {
  username: string;
  full_name: string;
  type_id: number;
  email: string;
  password: string;
}

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: RegisterFormData = {
      username,
      full_name: fullName,
      type_id: parseInt(role),
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${API_ENDPOINT}/users/register`,
        formData
      );

      // Registration successful, redirect to login page
      if (response.status === 200) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-20">
        {/* JSX code for the register page form */}
        <div className="card w-96 bg-base-0 shadow-xl mx-auto image-full">
          {/* ... */}
          <div className="card-body">
            <h2 className="card-title">Create New Account</h2>
            <form onSubmit={handleRegister}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="form-control grid gap-2 grid-cols-2">
                <div>
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={fullName}
                    onChange={handleFullNameChange}
                  />
                </div>
                <div className="dropdown dropdown-bottom">
                  <label className="label">
                    <span className="label-text">Role</span>
                  </label>
                  <select
                    className="select input-bordered w-full max-w-xs join-item"
                    value={role}
                    onChange={handleRoleChange}
                  >
                    <option disabled value="">
                      Select Role
                    </option>
                    <option value="1">Admin</option>
                    <option value="2">Teller</option>
                    <option value="3">Frontdesk</option>
                  </select>
                </div>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="mt-5 card-actions">
                <button type="submit" className="btn btn-block btn-primary">
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
