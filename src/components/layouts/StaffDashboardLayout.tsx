import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/staffDashboard.css';

interface StaffDashboardLayoutProps {
  children: React.ReactNode;
}

const StaffDashboardLayout = ({ children }: StaffDashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('orders');
  
  // Mock staff data
  const [staffInfo] = useState({
    id: 'staff-001',
    name: 'Trần Văn B',
    role: 'Customer Support Specialist',
    avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
  });
  
  // Set active tab based on current path
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    // If we're at /staff or /staff/, set active tab to 'orders'
    const path = pathParts.length > 2 ? pathParts[2] : 'orders';
    setActiveTab(path);
  }, [location]);
  
  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Navigate to /staff for orders, /staff/[tab] for others
    navigate(tab === 'orders' ? '/staff' : `/staff/${tab}`);
  };
  
  // Get notification counts (mock data)
  const [notifications] = useState({
    newOrders: 5,
    pendingAssignments: 3,
    customerQuestions: 8,
  });

  return (
    <div className="staff-dashboard">
      <div className="dashboard-sidebar">
        <div className="staff-profile">
          <img src={staffInfo.avatar} alt={staffInfo.name} className="staff-avatar" />
          <div className="staff-info">
            <h3>{staffInfo.name}</h3>
            <p>{staffInfo.role}</p>
          </div>
        </div>
        
        <nav className="dashboard-nav">
          <button 
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => handleTabChange('orders')}
          >
            <i className="fas fa-box"></i>
            <span>Quản lý đơn hàng</span>
            {notifications.newOrders > 0 && (
              <span className="notification-badge">{notifications.newOrders}</span>
            )}
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'shippers' ? 'active' : ''}`}
            onClick={() => handleTabChange('shippers')}
          >
            <i className="fas fa-truck"></i>
            <span>Phân công shipper</span>
            {notifications.pendingAssignments > 0 && (
              <span className="notification-badge">{notifications.pendingAssignments}</span>
            )}
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'support' ? 'active' : ''}`}
            onClick={() => handleTabChange('support')}
          >
            <i className="fas fa-headset"></i>
            <span>Hỗ trợ khách hàng</span>
            {notifications.customerQuestions > 0 && (
              <span className="notification-badge">{notifications.customerQuestions}</span>
            )}
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => handleTabChange('analytics')}
          >
            <i className="fas fa-chart-bar"></i>
            <span>Thống kê & Báo cáo</span>
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <Link to="/login" className="logout-button">
            <i className="fas fa-sign-out-alt"></i>
            <span>Đăng xuất</span>
          </Link>
        </div>
      </div>
      
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
};

export default StaffDashboardLayout;