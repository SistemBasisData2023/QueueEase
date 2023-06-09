
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import TellerPage from './pages/TellerPage';
import DeskChoosePage from './pages/DeskChoosePage';
import DashboardPage from './pages/Dashboard';
import TransactionFormPage from './pages/TransactionFormPage';
import customerFormPage from './pages/customerFormPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/DeskChoose" element={<DeskChoosePage />} />
        <Route path="/DeskChoose" element={<DeskChoosePage />} />
        <Route path="/customer" element={<customerFormPage />} />
        <Route path="/Teller" element={<TellerPage />} />
        <Route path="/transaction" element={<TransactionFormPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
