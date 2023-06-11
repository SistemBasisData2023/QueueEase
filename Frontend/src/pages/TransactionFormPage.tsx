import TransactionForm from '../components/TransactionPage/TransactionForm';
import Navbar from '../components/Global/Navbar';
import checkAuthentication from '../middleware/checkAuthentication';
import { useEffect } from 'react';

function TransactionFormPage() {
  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <>
      <Navbar />
      <TransactionForm />
    </>
  );
}

export default TransactionFormPage;
