import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/home.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import BookingPage from './pages/BookingPage'
import ProfilePage from './pages/ProfilePage'

import StaffDashboardPage from './pages/StaffDashboardPage';
// import ShipperDashboardPage from './pages/ShipperDashboardPage';
// import CustomerDashboardPage from './pages/CustomerDashboardPage';
import OrderManagement from './components/staff/OrderManagement';
import ShipperAssignment from './components/staff/ShipperAssignment';
import CustomerSupport from './components/staff/CustomerSupport';
import StaffAnalytics from './pages/StaffAnalytics';

import './App.css';
import './styles/staffDashboard.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <header className="bg-white shadow-sm">
          <nav className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-primary">Koi Delivery System</h1>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* Your routes will go here */}

            <Route path="/staff" element={<StaffDashboardPage />}>
            <Route index element={<OrderManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="shippers" element={<ShipperAssignment />} />
            <Route path="support" element={<CustomerSupport />} />
            <Route path="analytics" element={<StaffAnalytics />} />
          </Route>
          
          {/* Shipper Dashboard Routes
          <Route path="/shipper/*" element={<ShipperDashboardPage />} />
          
          {/* Customer Dashboard Routes */}
          {/* <Route path="/customer/*" element={<CustomerDashboardPage />} /> */}
        
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App