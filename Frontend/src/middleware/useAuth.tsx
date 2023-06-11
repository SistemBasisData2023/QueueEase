import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from '../config/config';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/users/verifyUser`, {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'), // Retrieve the token from local storage
          },
        });

        if (!response.data.authenticated) {
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuthentication();
  }, []);

  return { isAuthenticated, isLoading };
};

export default useAuth;
