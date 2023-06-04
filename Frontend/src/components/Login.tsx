import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    const data = { username, password };

    axios.post('http://localhost:5000/users/login', data)
      .then(response => {
        console.log(response.data);
        const token = response.data.token;
        const typeId = response.data.type_id;
        const account_id = response.data.account_id;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('type_id', typeId);
          localStorage.setItem('account_id', account_id);
          window.location.href = '/';
        }
        if (typeId === 1) {
          window.location.href = '/admin';
        }
        else if (typeId === 2) {
          window.location.href = '/DeskChoose';
        }
        else if (typeId === 3){
          window.location.href = '/driver';
        }
        else {
          setErrorMessage('Invalid Type Id');
        }
      })
      .catch(error => {
          console.error('Error:', error.message);
      });
  };

  return (
    <>
      <div>
        <div className="card w-80 bg-base-100 shadow-xl image-full mx-auto">
          <figure>
            <img src="..\src\assets\karsten-winegeart-4bC1Ef88OYI-unsplash 1.png" alt="Shoes" />
          </figure>
          <div className="card-body">
            {errorMessage && (
              <div className="text-red-500 mb-4">{errorMessage}</div>
            )}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered w-full max-w-xs"
                value={username}
                onChange={event => setUsername(event.target.value)}
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
                onChange={event => setPassword(event.target.value)}
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
