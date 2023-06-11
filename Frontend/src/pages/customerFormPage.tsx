import CustomerForm from '../components/customerForm/customerForm';
import { useEffect } from 'react';
import checkAuthentication from '../middleware/useAuth';

function CustomerFormPage() {
  useEffect(() => {
    checkAuthentication();
  }, []);
  return (
    <>
      <CustomerForm />
    </>
  );
}

export default CustomerFormPage;
