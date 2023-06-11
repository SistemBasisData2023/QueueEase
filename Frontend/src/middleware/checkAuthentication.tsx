import axios from 'axios';

import { API_ENDPOINT } from '../config/config';

const checkAuthentication = async () => {
  try {
    console.log('Checking authentication...');
    console.log(sessionStorage.getItem('token'));
    const token = sessionStorage.getItem('token');

    const response = await axios.post(`${API_ENDPOINT}/users/verifyUser`, {
      token: token,
    });
    console.log(response.data);
    if (!response.data.authenticated) {
      window.location.href = '/login';
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    window.location.href = '/login';
  }
};

export default checkAuthentication;
