import React, { useState } from 'react';
import axios from 'axios';
import { handlePlaySound } from '../utils/audioUtils';
import Navbar from './Global/Navbar';
import { API_ENDPOINT } from '../config/config';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSoundButton = () => {
    handlePlaySound(inputValue, 2);
  };

  const handleLogin = () => {
    setIsLoading(true); // Set loading state to true
    const data = { username, password };
    axios
      .post(`${API_ENDPOINT}/users/login`, data)
      .then((response) => {
        console.log(response.data);
        const token = response.data.token;
        const typeId = response.data.type_id;
        const account_id = response.data.account_id;
        const full_name = response.data.full_name;
        if (token) {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('type_id', typeId);
          sessionStorage.setItem('account_id', account_id);
          sessionStorage.setItem('full_name', full_name);
          window.location.href = '/';
        }
        if (typeId === 1) {
          window.location.href = '/dashboard';
        } else if (typeId === 2) {
          window.location.href = '/DeskChoose';
        } else if (typeId === 3) {
          window.location.href = '/customer';
        } else {
          setErrorMessage('Invalid Type Id');
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false
      });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        {isLoading && (
          <div className="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="text-red-500 mb-4">
            {errorMessage}
            <div className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}
        <div className="card w-80 bg-base-100 shadow-xl image-full mx-auto">
          <figure>
            <img
              src="..\src\assets\karsten-winegeart-4bC1Ef88OYI-unsplash 1.png"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered w-full max-w-xs"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered w-full max-w-xs"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
