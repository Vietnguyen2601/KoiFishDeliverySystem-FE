import { useState, useEffect } from 'react';

// Define interfaces
interface Shipper {
  id: string;
  name: string;
  phone: string;
  rating: number;
  status: 'available' | 'busy';
  avatar: string;
}

interface OrderItem {
  fishType: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  items: OrderItem[];
  totalPrice: number;
  pickupLocation: string;
  deliveryLocation: string;
  status: 'pending' | 'processing' | 'assigned' | 'in-transit' | 'delivered' | 'cancelled';
  trackingNumber: string;
  assignedShipper?: string;
  shipperId?: string;
}

const OrderManagement = () => {
  // State for orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState<boolean>(false);
  const [availableShippers, setAvailableShippers] = useState<Shipper[]>([]);
  const [selectedShipper, setSelectedShipper] = useState<string>('');
  
  // Fetch mock orders data
  useEffect(() => {
    // In a real app, this would be an API call
    const mockOrders: Order[] = [
      {
        id: 'ORD-001',
        customerName: 'Nguyễn Văn A',
        customerPhone: '0901234567',
        date: '2023-08-15',
        items: [
          { fishType: 'Kohaku', quantity: 2, price: 500000 },
          { fishType: 'Sanke', quantity: 1, price: 750000 },
        ],
        totalPrice: 1750000,
        pickupLocation: '123 Đường Lê Lợi, Quận 1, TP.HCM',
        deliveryLocation: '456 Đường Nguyễn Huệ, Quận 1, TP.HCM',
        status: 'pending',
        trackingNumber: 'TRK-001-2023',
      },
      {
        id: 'ORD-002',
        customerName: 'Trần Thị B',
        customerPhone: '0909876543',
        date: '2023-08-16',
        items: [
          { fishType: 'Showa', quantity: 3, price: 600000 },
        ],
        totalPrice: 1800000,
        pickupLocation: '789 Đường Lê Duẩn, Quận 3, TP.HCM',
        deliveryLocation: '101 Đường Nam Kỳ Khởi Nghĩa, Quận 3, TP.HCM',
        status: 'processing',
        trackingNumber: 'TRK-002-2023',
      },
      {
        id: 'ORD-003',
        customerName: 'Lê Văn C',
        customerPhone: '0918765432',
        date: '2023-08-17',
        items: [
          { fishType: 'Bekko', quantity: 1, price: 450000 },
          { fishType: 'Uchiha', quantity: 2, price: 800000 },
        ],
        totalPrice: 2050000,
        pickupLocation: '202 Đường Hai Bà Trưng, Quận 1, TP.HCM',
        deliveryLocation: '303 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM',
        status: 'assigned',
        trackingNumber: 'TRK-003-2023',
        assignedShipper: 'Phạm Văn D',
        shipperId: 'SHP-004',
      },
      {
        id: 'ORD-004',
        customerName: 'Hoàng Thị E',
        customerPhone: '0927654321',
        date: '2023-08-18',
        items: [
          { fishType: 'Akastuki', quantity: 2, price: 900000 },
        ],
        totalPrice: 1800000,
        pickupLocation: '404 Đường Nguyễn Thị Minh Khai, Quận 3, TP.HCM',
        deliveryLocation: '505 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM',
        status: 'in-transit',
        trackingNumber: 'TRK-004-2023',
        assignedShipper: 'Ngô Văn F',
        shipperId: 'SHP-002',
      },
      {
        id: 'ORD-005',
        customerName: 'Đặng Văn G',
        customerPhone: '0936543210',
        date: '2023-08-14',
        items: [
          { fishType: 'Shisui', quantity: 1, price: 1200000 },
          { fishType: 'Tanchiro', quantity: 1, price: 850000 },
        ],
        totalPrice: 2050000,
        pickupLocation: '606 Đường 3/2, Quận 10, TP.HCM',
        deliveryLocation: '707 Đường Lý Thường Kiệt, Quận 11, TP.HCM',
        status: 'delivered',
        trackingNumber: 'TRK-005-2023',
        assignedShipper: 'Trần Văn H',
        shipperId: 'SHP-001',
      },
    ];
    
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
    
    // Mock shippers data
    const mockShippers: Shipper[] = [
      {
        id: 'SHP-001',
        name: 'Trần Văn H',
        phone: '0901122334',
        rating: 4.8,
        status: 'busy',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      {
        id: 'SHP-002',
        name: 'Ngô Văn F',
        phone: '0902233445',
        rating: 4.5,
        status: 'busy',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      },
      {
        id: 'SHP-003',
        name: 'Lê Thị M',
        phone: '0903344556',
        rating: 4.9,
        status: 'available',
        avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
      },
      {
        id: 'SHP-004',
        name: 'Phạm Văn D',
        phone: '0904455667',
        rating: 4.7,
        status: 'busy',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      },
      {
        id: 'SHP-005',
        name: 'Hoàng Thị N',
        phone: '0905566778',
        rating: 4.6,
        status: 'available',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      },
    ];
    
    setAvailableShippers(mockShippers.filter(shipper => shipper.status === 'available'));
  }, []);
  
  // Filter orders based on status and search term
  useEffect(() => {
    let filtered = orders;
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(term) ||
        order.customerName.toLowerCase().includes(term) ||
        order.customerPhone.includes(term) ||
        order.trackingNumber.toLowerCase().includes(term)
      );
    }
    
    setFilteredOrders(filtered);
  }, [statusFilter, searchTerm, orders]);
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price);
  };
  
  // Get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'processing': return 'Đang xử lý';
      case 'assigned': return 'Đã phân công';
      case 'in-transit': return 'Đang vận chuyển';
      case 'delivered': return 'Đã giao hàng';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };
  
  // Handle order status update
  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders.filter(order => 
      statusFilter === 'all' || order.status === statusFilter
    ));
    
    // Close modal if open
    if (isOrderModalOpen) {
      setIsOrderModalOpen(false);
      setSelectedOrder(null);
    }
  };
  
  // Open order detail modal
  const openOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };
  
  // Open assign shipper modal
  const openAssignModal = (order: Order) => {
    setSelectedOrder(order);
    setIsAssignModalOpen(true);
    setSelectedShipper('');
  };
  
  // Handle shipper assignment
  const handleAssignShipper = () => {
    // if (!selectedOrder || !selectedShipper) return;
    
    // const shipper = availableShippers.find(s => s.id === selectedShipper);
    // if (!shipper) return;
    
    // const updatedOrders = orders.map(order => {
    //   if (order.id === selectedOrder.id) {
    //     return { 
    //       ...order, 
    //       status: 'assigned', 
    //       assignedShipper: shipper.name,
    //       shipperId: shipper.id
    //     };
    //   }
    //   return order;
    // });
    
    // setOrders(updatedOrders);
    // setFilteredOrders(updatedOrders.filter(order => 
    //   statusFilter === 'all' || order.status === statusFilter
    // ));
    
    // Update available shippers
    setAvailableShippers(availableShippers.filter(s => s.id !== selectedShipper));
    
    // Close modal
    setIsAssignModalOpen(false);
    setSelectedOrder(null);
    setSelectedShipper('');
  };
  
  return (
    <div className="order-management">
      <div className="page-header">
        <h1>Quản lý đơn hàng</h1>
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng..."
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
              <option value="pending">Chờ xử lý</option>
              <option value="processing">Đang xử lý</option>
              <option value="assigned">Đã phân công</option>
              <option value="in-transit">Đang vận chuyển</option>
              <option value="delivered">Đã giao hàng</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>
      </div>
      
      {filteredOrders.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-box-open"></i>
          <h3>Không có đơn hàng nào</h3>
          <p>Không tìm thấy đơn hàng phù hợp với bộ lọc hiện tại.</p>
        </div>
      ) : (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Shipper</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    <div>{order.customerName}</div>
                    <div className="secondary-text">{order.customerPhone}</div>
                  </td>
                  <td>{formatDate(order.date)}</td>
                  <td>{formatPrice(order.totalPrice)}</td>
                  <td>
                    <span className={`status-badge ${order.status}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td>{order.assignedShipper || '—'}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="view-btn"
                        onClick={() => openOrderModal(order)}
                        title="Xem chi tiết"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      
                      {order.status === 'pending' && (
                        <button 
                          className="process-btn"
                          onClick={() => handleStatusUpdate(order.id, 'processing')}
                          title="Xử lý đơn hàng"
                        >
                          Xử lý
                        </button>
                      )}
                      
                      {order.status === 'processing' && (
                        <button 
                          className="assign-btn"
                          onClick={() => openAssignModal(order)}
                          title="Phân công shipper"
                          disabled={availableShippers.length === 0}
                        >
                          Phân công
                        </button>
                      )}
                      
                      {order.status === 'assigned' && (
                        <button 
                          className="transit-btn"
                          onClick={() => handleStatusUpdate(order.id, 'in-transit')}
                          title="Bắt đầu vận chuyển"
                        >
                          Vận chuyển
                        </button>
                      )}
                      
                      {order.status === 'in-transit' && (
                        <button 
                          className="deliver-btn"
                          onClick={() => handleStatusUpdate(order.id, 'delivered')}
                          title="Xác nhận đã giao hàng"
                        >
                          Đã giao
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Order Detail Modal */}
      {isOrderModalOpen && selectedOrder && (
        <div className="modal-overlay">
          <div className="order-modal">
            <div className="modal-header">
              <h2>Chi tiết đơn hàng #{selectedOrder.id}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setIsOrderModalOpen(false);
                  setSelectedOrder(null);
                }}
              >
                &times;
              </button>
            </div>
            
            <div className="modal-content">
              <div className="order-details">
                <div className="detail-section">
                  <h3>Thông tin khách hàng</h3>
                  <p><strong>Tên:</strong> {selectedOrder.customerName}</p>
                  <p><strong>Số điện thoại:</strong> {selectedOrder.customerPhone}</p>
                </div>
                
                <div className="detail-section">
                  <h3>Thông tin vận chuyển</h3>
                  <p><strong>Địa điểm lấy hàng:</strong> {selectedOrder.pickupLocation}</p>
                  <p><strong>Địa điểm giao hàng:</strong> {selectedOrder.deliveryLocation}</p>
                  <p><strong>Mã vận đơn:</strong> {selectedOrder.trackingNumber}</p>
                  {selectedOrder.assignedShipper && (
                    <p><strong>Shipper:</strong> {selectedOrder.assignedShipper}</p>
                  )}
                </div>
                
                <div className="detail-section">
                  <h3>Sản phẩm</h3>
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Loại cá</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.fishType}</td>
                          <td>{item.quantity}</td>
                          <td>{formatPrice(item.price)}</td>
                          <td>{formatPrice(item.price * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={3}><strong>Tổng cộng</strong></td>
                        <td><strong>{formatPrice(selectedOrder.totalPrice)}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div className="status-update-section">
                <h3>Cập nhật trạng thái</h3>
                <div className="status-options">
                  <button 
                    className={`status-btn ${selectedOrder.status === 'pending' ? 'active' : ''}`}
                    onClick={() => handleStatusUpdate(selectedOrder.id, 'pending')}
                    disabled={selectedOrder.status === 'delivered' || selectedOrder.status === 'cancelled'}
                  >
                    Chờ xử lý
                  </button>
                  <button 
                    className={`status-btn ${selectedOrder.status === 'processing' ? 'active' : ''}`}
                    onClick={() => handleStatusUpdate(selectedOrder.id, 'processing')}
                    disabled={selectedOrder.status === 'delivered' || selectedOrder.status === 'cancelled'}
                  >
                    Đang xử lý
                  </button>
                  <button 
                    className={`status-btn ${selectedOrder.status === 'assigned' ? 'active' : ''}`}
                    onClick={() => handleStatusUpdate(selectedOrder.id, 'assigned')}
                    disabled={!selectedOrder.assignedShipper || selectedOrder.status === 'delivered' || selectedOrder.status === 'cancelled'}
                  >
                    Đã phân công
                  </button>
                  <button 
                    className={`status-btn ${selectedOrder.status === 'in-transit' ? 'active' : ''}`}
                    onClick={() => handleStatusUpdate(selectedOrder.id, 'in-transit')}
                    disabled={!selectedOrder.assignedShipper || selectedOrder.status === 'delivered' || selectedOrder.status === 'cancelled'}
                  >
                    Đang vận chuyển
                  </button>
                  <button 
                    className={`status-btn ${selectedOrder.status === 'delivered' ? 'active' : ''}`}
                    onClick={() => handleStatusUpdate(selectedOrder.id, 'delivered')}
                    disabled={!selectedOrder.assignedShipper}
                  >
                    Đã giao hàng
                  </button>
                  <button 
                    className={`status-btn ${selectedOrder.status === 'cancelled' ? 'active' : ''}`}
                    onClick={() => handleStatusUpdate(selectedOrder.id, 'cancelled')}
                    disabled={selectedOrder.status === 'delivered'}
                  >
                    Hủy đơn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Assign Shipper Modal */}
      {isAssignModalOpen && selectedOrder && (
        <div className="modal-overlay">
          <div className="assignment-modal">
            <div className="modal-header">
              <h2>Phân công shipper cho đơn hàng #{selectedOrder.id}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setIsAssignModalOpen(false);
                  setSelectedOrder(null);
                  setSelectedShipper('');
                }}
              >
                &times;
              </button>
            </div>
            
            <div className="modal-content">
              {availableShippers.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-user-slash"></i>
                  <h3>Không có shipper khả dụng</h3>
                  <p>Hiện tại không có shipper nào đang rảnh để nhận đơn hàng mới.</p>
                </div>
              ) : (
                <div className="shipper-selection">
                  <h3>Chọn shipper</h3>
                  <div className="shipper-list">
                    {availableShippers.map(shipper => (
                      <div 
                        key={shipper.id} 
                        className={`shipper-card ${selectedShipper === shipper.id ? 'selected' : ''}`}
                        onClick={() => setSelectedShipper(shipper.id)}
                      >
                        <div className="shipper-avatar">
                          <img src={shipper.avatar} alt={shipper.name} />
                        </div>
                        <div className="shipper-info">
                          <h4>{shipper.name}</h4>
                          <p>{shipper.phone}</p>
                          <div className="shipper-rating">
                            <i className="fas fa-star"></i>
                            <span>{shipper.rating}</span>
                          </div>
                        </div>
                        <div className="shipper-select">
                          <input 
                            type="radio" 
                            name="shipper" 
                            value={shipper.id} 
                            checked={selectedShipper === shipper.id}
                            onChange={() => setSelectedShipper(shipper.id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => {
                  setIsAssignModalOpen(false);
                  setSelectedOrder(null);
                  setSelectedShipper('');
                }}
              >
                Hủy
              </button>
              <button 
                className="confirm-btn"
                onClick={handleAssignShipper}
                disabled={!selectedShipper}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;