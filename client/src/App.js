import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import NewPasswordPage from './pages/NewPasswordPage';
import KeysPage from './pages/KeysPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/register" element={ <SignupPage /> } />
        <Route path="/forget-password" element={ <ForgetPasswordPage /> } />
        <Route path="/new-password/:token" element={ <NewPasswordPage /> } />
        <Route path="/keys" element={ <KeysPage /> } />
        <Route path="/dashboard" element={ <DashboardPage /> } />
      </Routes>
    </Router>
    </>
  );
}

export default App;
