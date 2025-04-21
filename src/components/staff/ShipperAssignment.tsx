import { useState, useEffect } from 'react';

// Define interfaces
interface Shipper {
  id: string;
  name: string;
  phone: string;
  email: string;
  rating: number;
  status: 'available' | 'busy' | 'offline';
  avatar: string;
  activeOrders: number;
  completedOrders: number;
  joinDate: string;
}

interface Order {
  id: string;
  customerName: string;
  date: string;
  pickupLocation: string;
  deliveryLocation: string;
  status: 'pending' | 'processing' | 'assigned' | 'in-transit' | 'delivered' | 'cancelled';
  assignedShipper?: string;
}

const ShipperAssignment = () => {
  // State for shippers and orders
  const [shippers, setShippers] = useState<Shipper[]>([]);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredShippers, setFilteredShippers] = useState<Shipper[]>([]);
  const [selectedShipper, setSelectedShipper] = useState<Shipper | null>(null);
  const [isShipperModalOpen, setIsShipperModalOpen] = useState<boolean>(false);
  
  // Fetch mock data
  useEffect(() => {
    // Mock shippers data
    const mockShippers: Shipper[] = [
      {
        id: 'SHP-001',
        name: 'Trần Văn H',
        phone: '0901122334',
        email: 'tranvanh@example.com',
        rating: 4.8,
        status: 'busy',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        activeOrders: 2,
        completedOrders: 156,
        joinDate: '2022-05-15',
      },
      {
        id: 'SHP-002',
        name: 'Ngô Văn F',
        phone: '0902233445',
        email: 'ngovanf@example.com',
        rating: 4.5,
        status: 'busy',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
        activeOrders: 1,
        completedOrders: 98,
        joinDate: '2022-07-22',
      },
      {
        id: 'SHP-003',
        name: 'Lê Thị M',
        phone: '0903344556',
        email: 'lethim@example.com',
        rating: 4.9,
        status: 'available',
        avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
        activeOrders: 0,
        completedOrders: 124,
        joinDate: '2022-06-10',
      },
      {
        id: 'SHP-004',
        name: 'Phạm Văn D',
        phone: '0904455667',
        email: 'phamvand@example.com',
        rating: 4.7,
        status: 'busy',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        activeOrders: 1,
        completedOrders: 112,
        joinDate: '2022-08-05',
      },
      {
        id: 'SHP-005',
        name: 'Hoàng Thị N',
        phone: '0905566778',
        email: 'hoangn@example.com',
        rating: 4.6,
        status: 'available',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        activeOrders: 0,
        completedOrders: 87,
        joinDate: '2022-09-18',
      },
      {
        id: 'SHP-006',
        name: 'Đỗ Minh P',
        phone: '0906677889',
        email: 'dominhp@example.com',
        rating: 4.4,
        status: 'offline',
        avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
        activeOrders: 0,
        completedOrders: 65,
        joinDate: '2023-01-12',
      },
    ];
    
    setShippers(mockShippers);
    setFilteredShippers(mockShippers);
    
    // Mock pending orders
    const mockOrders: Order[] = [
      {
        id: 'ORD-006',
        customerName: 'Vũ Thị H',
        date: '2023-08-19',
        pickupLocation: '123 Đường Lê Lợi, Quận 1, TP.HCM',
        deliveryLocation: '456 Đường Nguyễn Huệ, Quận 1, TP.HCM',
        status: 'processing',
      },
      {
        id: 'ORD-007',
        customerName: 'Nguyễn Văn I',
        date: '2023-08-19',
        pickupLocation: '789 Đường Lê Duẩn, Quận 3, TP.HCM',
        deliveryLocation: '101 Đường Nam Kỳ Khởi Nghĩa, Quận 3, TP.HCM',
        status: 'processing',
      },
      {
        id: 'ORD-008',
        customerName: 'Trần Thị J',
        date: '2023-08-20',
        pickupLocation: '202 Đường Hai Bà Trưng, Quận 1, TP.HCM',
        deliveryLocation: '303 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM',
        status: 'processing',
      },
    ];
    
    setPendingOrders(mockOrders);
  }, []);
  
  // Filter shippers based on status and search term
  useEffect(() => {
    let filtered = shippers;
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(shipper => shipper.status === statusFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(shipper => 
        shipper.name.toLowerCase().includes(term) ||
        shipper.id.toLowerCase().includes(term) ||
        shipper.phone.includes(term) ||
        shipper.email.toLowerCase().includes(term)
      );
    }
    
    setFilteredShippers(filtered);
  }, [statusFilter, searchTerm, shippers]);
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };
  
  // Get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'Sẵn sàng';
      case 'busy': return 'Đang bận';
      case 'offline': return 'Ngoại tuyến';
      default: return status;
    }
  };
  
  // Open shipper detail modal
  const openShipperModal = (shipper: Shipper) => {
    setSelectedShipper(shipper);
    setIsShipperModalOpen(true);
  };
  
  // Assign order to shipper
  const assignOrderToShipper = (orderId: string, shipperId: string) => {
    // Update orders
    const updatedOrders = pendingOrders.filter(order => order.id !== orderId);
    setPendingOrders(updatedOrders);
    
    // Update shipper status
    const updatedShippers = shippers.map(shipper => {
      if (shipper.id === shipperId) {
        return {
          ...shipper,
          status: 'busy' as const,
          activeOrders: shipper.activeOrders + 1
        };
      }
      return shipper;
    });
    
    setShippers(updatedShippers);
    setFilteredShippers(updatedShippers.filter(shipper => 
      statusFilter === 'all' || shipper.status === statusFilter
    ));
    
    // Close modal if open
    if (isShipperModalOpen) {
      setIsShipperModalOpen(false);
      setSelectedShipper(null);
    }
  };
  
  return (
    <div className="shipper-assignment">
      <div className="page-header">
        <h1>Phân công shipper</h1>
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm shipper..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
          
          <div className="filter-dropdown">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="available">Sẵn sàng</option>
              <option value="busy">Đang bận</option>
              <option value="offline">Ngoại tuyến</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        {/* Shippers List */}
        <div className="shippers-container">
          <h2>Danh sách shipper</h2>
          
          {filteredShippers.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-user-slash"></i>
              <h3>Không tìm thấy shipper</h3>
              <p>Không có shipper nào phù hợp với bộ lọc hiện tại.</p>
            </div>
          ) : (
            <div className="shippers-grid">
              {filteredShippers.map(shipper => (
                <div key={shipper.id} className={`shipper-card status-${shipper.status}`}>
                  <div className="shipper-header">
                    <div className="shipper-avatar">
                      <img src={shipper.avatar} alt={shipper.name} />
                      <span className={`status-indicator ${shipper.status}`}></span>
                    </div>
                    <div className="shipper-info">
                      <h3>{shipper.name}</h3>
                      <p className="shipper-id">{shipper.id}</p>
                      <div className="shipper-rating">
                        <i className="fas fa-star"></i>
                        <span>{shipper.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="shipper-stats">
                    <div className="stat">
                      <span className="stat-label">Đơn đang giao:</span>
                      <span className="stat-value">{shipper.activeOrders}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Đã hoàn thành:</span>
                      <span className="stat-value">{shipper.completedOrders}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Trạng thái:</span>
                      <span className={`status-badge ${shipper.status}`}>
                        {getStatusLabel(shipper.status)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="shipper-actions">
                    <button 
                      className="view-btn"
                      onClick={() => openShipperModal(shipper)}
                    >
                      Chi tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Pending Orders */}
        <div className="pending-orders-container">
          <h2>Đơn hàng chờ phân công</h2>
          
          {pendingOrders.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-check-circle"></i>
              <h3>Không có đơn hàng chờ</h3>
              <p>Tất cả đơn hàng đã được phân công.</p>
            </div>
          ) : (
            <div className="pending-orders-list">
              {pendingOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>{order.id}</h3>
                    <span className="order-date">{formatDate(order.date)}</span>
                  </div>
                  
                  <div className="order-details">
                    <p><strong>Khách hàng:</strong> {order.customerName}</p>
                    <p><strong>Lấy hàng:</strong> {order.pickupLocation}</p>
                    <p><strong>Giao hàng:</strong> {order.deliveryLocation}</p>
                  </div>
                  
                  <div className="order-assignment">
                    <h4>Phân công cho:</h4>
                    <div className="shipper-dropdown">
                      <select 
                        onChange={(e) => assignOrderToShipper(order.id, e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled>Chọn shipper</option>
                        {shippers
                          .filter(shipper => shipper.status === 'available')
                          .map(shipper => (
                            <option key={shipper.id} value={shipper.id}>
                              {shipper.name} ({shipper.id})
                            </option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Shipper Detail Modal */}
      {isShipperModalOpen && selectedShipper && (
        <div className="modal-overlay">
          <div className="shipper-modal">
            <div className="modal-header">
              <h2>Thông tin shipper</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setIsShipperModalOpen(false);
                  setSelectedShipper(null);
                }}
              >
                &times;
              </button>
            </div>
            
            <div className="modal-content">
              <div className="shipper-profile">
                <div className="shipper-avatar-large">
                  <img src={selectedShipper.avatar} alt={selectedShipper.name} />
                  <span className={`status-indicator ${selectedShipper.status}`}></span>
                </div>
                
                <div className="shipper-details">
                  <h3>{selectedShipper.name}</h3>
                  <p className="shipper-id">{selectedShipper.id}</p>
                  
                  <div className="shipper-contact">
                    <p><i className="fas fa-phone"></i> {selectedShipper.phone}</p>
                    <p><i className="fas fa-envelope"></i> {selectedShipper.email}</p>
                  </div>
                  
                  <div className="shipper-rating-large">
                    <span className="rating-value">{selectedShipper.rating}</span>
                    <div className="rating-stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <i 
                          key={star} 
                          className={`fas fa-star ${star <= Math.round(selectedShipper.rating) ? 'filled' : ''}`}
                        ></i>
                      ))}
                    </div>
                  </div>
                  
                  <div className="shipper-stats-detailed">
                    <div className="stat-item">
                      <h4>Đơn đang giao</h4>
                      <div className="stat-value">{selectedShipper.activeOrders}</div>
                    </div>
                    <div className="stat-item">
                      <h4>Đã hoàn thành</h4>
                      <div className="stat-value">{selectedShipper.completedOrders}</div>
                    </div>
                    <div className="stat-item">
                      <h4>Ngày tham gia</h4>
                      <div className="stat-value">{formatDate(selectedShipper.joinDate)}</div>
                    </div>
                    <div className="stat-item">
                      <h4>Trạng thái</h4>
                      <div className={`status-badge ${selectedShipper.status}`}>
                        {getStatusLabel(selectedShipper.status)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="shipper-performance">
                <h3>Hiệu suất làm việc</h3>
                <div className="performance-metrics">
                  <div className="metric">
                    <h4>Tỷ lệ giao hàng đúng hẹn</h4>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar"
                        style={{ width: '92%' }}
                      ></div>
                      <span className="progress-value">92%</span>
                    </div>
                  </div>
                  
                  <div className="metric">
                    <h4>Tỷ lệ đơn hàng thành công</h4>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar"
                        style={{ width: '98%' }}
                      ></div>
                      <span className="progress-value">98%</span>
                    </div>
                  </div>
                  
                  <div className="metric">
                    <h4>Đánh giá từ khách hàng</h4>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar"
                        style={{ width: `${(selectedShipper.rating / 5) * 100}%` }}
                      ></div>
                      <span className="progress-value">{selectedShipper.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipperAssignment;