import { useState, useEffect } from 'react';
import '../styles/profile.css';

// Define interfaces for our data types
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  memberSince: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'cancelled';
  items: {
    fishType: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  shippingAddress: string;
  trackingNumber: string;
}

interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const ProfilePage = () => {
  // State for customer data
  const [customer] = useState<Customer>({
    id: 'cust-001',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
    address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    memberSince: '2023-01-15',
  });

  // State for orders
  const [orders, setOrders] = useState<Order[]>([]);
  
  // State for notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('profile');

  // Fetch mock data (in a real app, this would be an API call)
  useEffect(() => {
    // Mock orders data
    const mockOrders: Order[] = [
      {
        id: 'order-001',
        date: '2023-06-15',
        status: 'delivered',
        items: [
          { fishType: 'Kohaku', quantity: 2, price: 500000 },
          { fishType: 'Sanke', quantity: 1, price: 750000 },
        ],
        totalPrice: 1750000,
        shippingAddress: '123 Đường Lê Lợi, Quận 1, TP.HCM',
        trackingNumber: 'TRK123456789',
      },
      {
        id: 'order-002',
        date: '2023-07-20',
        status: 'in-transit',
        items: [
          { fishType: 'Showa', quantity: 3, price: 600000 },
        ],
        totalPrice: 1800000,
        shippingAddress: '123 Đường Lê Lợi, Quận 1, TP.HCM',
        trackingNumber: 'TRK987654321',
      },
      {
        id: 'order-003',
        date: '2023-08-05',
        status: 'pending',
        items: [
          { fishType: 'Bekko', quantity: 1, price: 450000 },
          { fishType: 'Uchiha', quantity: 2, price: 800000 },
        ],
        totalPrice: 2050000,
        shippingAddress: '123 Đường Lê Lợi, Quận 1, TP.HCM',
        trackingNumber: 'TRK456789123',
      },
    ];

    // Mock notifications
    const mockNotifications: Notification[] = [
      {
        id: 'notif-001',
        message: 'Đơn hàng #order-002 đang được vận chuyển',
        date: '2023-07-21',
        read: false,
        type: 'info',
      },
      {
        id: 'notif-002',
        message: 'Đơn hàng #order-001 đã được giao thành công',
        date: '2023-06-16',
        read: true,
        type: 'success',
      },
      {
        id: 'notif-003',
        message: 'Khuyến mãi đặc biệt: Giảm 10% cho đơn hàng tiếp theo',
        date: '2023-08-01',
        read: false,
        type: 'info',
      },
    ];

    setOrders(mockOrders);
    setNotifications(mockNotifications);
  }, []);

  // Format date to local format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  // Format price to VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price);
  };

  // Handle marking a notification as read
  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Get current orders (in-transit or pending)
  const currentOrders = orders.filter(order => 
    order.status === 'in-transit' || order.status === 'pending'
  );

  // Get order history (delivered or cancelled)
  const orderHistory = orders.filter(order => 
    order.status === 'delivered' || order.status === 'cancelled'
  );

  // Get unread notifications count
  const unreadNotificationsCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-avatar">
          <img src={customer.avatar} alt={customer.name} />
          <h2>{customer.name}</h2>
          <p>Thành viên từ {formatDate(customer.memberSince)}</p>
        </div>
        
        <div className="profile-navigation">
          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Thông tin cá nhân
          </button>
          <button 
            className={`nav-item ${activeTab === 'current-orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('current-orders')}
          >
            Đơn hàng đang giao
            {currentOrders.length > 0 && <span className="badge">{currentOrders.length}</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'order-history' ? 'active' : ''}`}
            onClick={() => setActiveTab('order-history')}
          >
            Lịch sử đơn hàng
          </button>
          <button 
            className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Thông báo
            {unreadNotificationsCount > 0 && <span className="badge">{unreadNotificationsCount}</span>}
          </button>
        </div>
      </div>
      
      <div className="profile-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>Thông tin cá nhân</h2>
            <div className="profile-info">
              <div className="info-group">
                <label>Họ và tên</label>
                <div className="info-value">{customer.name}</div>
              </div>
              <div className="info-group">
                <label>Email</label>
                <div className="info-value">{customer.email}</div>
              </div>
              <div className="info-group">
                <label>Số điện thoại</label>
                <div className="info-value">{customer.phone}</div>
              </div>
              <div className="info-group">
                <label>Địa chỉ</label>
                <div className="info-value">{customer.address}</div>
              </div>
            </div>
            <button className="edit-profile-btn">Chỉnh sửa thông tin</button>
          </div>
        )}
        
        {activeTab === 'current-orders' && (
          <div className="profile-section">
            <h2>Đơn hàng đang giao</h2>
            {currentOrders.length === 0 ? (
              <div className="empty-state">
                <p>Bạn không có đơn hàng nào đang giao.</p>
              </div>
            ) : (
              <div className="orders-list">
                {currentOrders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div>
                        <h3>Đơn hàng #{order.id}</h3>
                        <p className="order-date">Ngày đặt: {formatDate(order.date)}</p>
                      </div>
                      <div className={`order-status ${order.status}`}>
                        {order.status === 'pending' ? 'Đang xử lý' : 'Đang vận chuyển'}
                      </div>
                    </div>
                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          <span className="item-name">{item.fishType}</span>
                          <span className="item-quantity">x{item.quantity}</span>
                          <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-footer">
                      <div className="order-total">
                        <span>Tổng cộng:</span>
                        <span className="total-price">{formatPrice(order.totalPrice)}</span>
                      </div>
                      <div className="order-tracking">
                        <span>Mã vận đơn: {order.trackingNumber}</span>
                      </div>
                    </div>
                    <button className="track-order-btn">Theo dõi đơn hàng</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'order-history' && (
          <div className="profile-section">
            <h2>Lịch sử đơn hàng</h2>
            {orderHistory.length === 0 ? (
              <div className="empty-state">
                <p>Bạn chưa có lịch sử đơn hàng nào.</p>
              </div>
            ) : (
              <div className="orders-list">
                {orderHistory.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div>
                        <h3>Đơn hàng #{order.id}</h3>
                        <p className="order-date">Ngày đặt: {formatDate(order.date)}</p>
                      </div>
                      <div className={`order-status ${order.status}`}>
                        {order.status === 'delivered' ? 'Đã giao hàng' : 'Đã hủy'}
                      </div>
                    </div>
                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          <span className="item-name">{item.fishType}</span>
                          <span className="item-quantity">x{item.quantity}</span>
                          <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-footer">
                      <div className="order-total">
                        <span>Tổng cộng:</span>
                        <span className="total-price">{formatPrice(order.totalPrice)}</span>
                      </div>
                    </div>
                    <button className="reorder-btn">Đặt lại</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'notifications' && (
          <div className="profile-section">
            <h2>Thông báo</h2>
            {notifications.length === 0 ? (
              <div className="empty-state">
                <p>Bạn không có thông báo nào.</p>
              </div>
            ) : (
              <div className="notifications-list">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`notification-card ${notification.read ? 'read' : 'unread'} ${notification.type}`}
                    onClick={() => !notification.read && markNotificationAsRead(notification.id)}
                  >
                    <div className="notification-content">
                      <p className="notification-message">{notification.message}</p>
                      <p className="notification-date">{formatDate(notification.date)}</p>
                    </div>
                    {!notification.read && (
                      <div className="notification-badge">Mới</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;