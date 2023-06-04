
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import TellerPage from './pages/TellerPage';
import DeskChoosePage from './pages/DeskChoosePage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/DeskChoose" element={<DeskChoosePage />} />
        <Route path="/Teller" element={<TellerPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
