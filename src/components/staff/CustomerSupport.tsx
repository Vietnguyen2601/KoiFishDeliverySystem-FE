import { useState, useEffect } from 'react';

// Define interfaces
interface SupportTicket {
  id: string;
  customerId: string;
  customerName: string;
  subject: string;
  message: string;
  date: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  orderId?: string;
  responses: {
    id: string;
    sender: 'customer' | 'staff';
    senderName: string;
    message: string;
    date: string;
  }[];
}

const CustomerSupport = () => {
  // State for support tickets
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<SupportTicket[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>('');
  
  // Fetch mock tickets data
  useEffect(() => {
    // In a real app, this would be an API call
    const mockTickets: SupportTicket[] = [
      {
        id: 'TKT-001',
        customerId: 'CUS-001',
        customerName: 'Nguyễn Văn A',
        subject: 'Đơn hàng chưa được giao',
        message: 'Tôi đã đặt đơn hàng ORD-010 từ 3 ngày trước nhưng vẫn chưa nhận được hàng. Trạng thái đơn hàng vẫn là "Đang vận chuyển". Vui lòng kiểm tra giúp tôi.',
        date: '2023-08-17T10:30:00',
        status: 'open',
        priority: 'high',
        orderId: 'ORD-010',
        responses: [],
      },
      {
        id: 'TKT-002',
        customerId: 'CUS-005',
        customerName: 'Trần Thị B',
        subject: 'Cá bị chết khi giao hàng',
        message: 'Tôi đã nhận được đơn hàng ORD-008 nhưng có 1 con cá đã chết khi tôi mở túi. Tôi muốn được đổi con cá khác hoặc hoàn tiền cho con cá đó.',
        date: '2023-08-16T14:45:00',
        status: 'in-progress',
        priority: 'high',
        orderId: 'ORD-008',
        responses: [
          {
            id: 'RES-001',
            sender: 'staff',
            senderName: 'Trần Văn B',
            message: 'Chào chị Trần Thị B, chúng tôi rất tiếc về sự cố này. Vui lòng gửi hình ảnh con cá để chúng tôi xác nhận và xử lý yêu cầu hoàn tiền hoặc đổi cá mới.',
            date: '2023-08-16T15:20:00',
          },
          {
            id: 'RES-002',
            sender: 'customer',
            senderName: 'Trần Thị B',
            message: 'Tôi đã gửi hình ảnh qua email của cửa hàng. Vui lòng kiểm tra và phản hồi sớm.',
            date: '2023-08-16T16:05:00',
          },
        ],
      },
      {
        id: 'TKT-003',
        customerId: 'CUS-010',
        customerName: 'Lê Văn C',
        subject: 'Câu hỏi về cách chăm sóc cá Koi',
        message: 'Tôi vừa mua cá Koi từ cửa hàng của bạn và muốn biết thêm về cách chăm sóc cá đúng cách. Nhiệt độ nước phù hợp là bao nhiêu và nên cho cá ăn gì?',
        date: '2023-08-15T09:15:00',
        status: 'resolved',
        priority: 'medium',
        responses: [
          {
            id: 'RES-003',
            sender: 'staff',
            senderName: 'Trần Văn B',
            message: 'Chào anh Lê Văn C, cảm ơn anh đã mua cá Koi từ cửa hàng chúng tôi. Nhiệt độ nước lý tưởng cho cá Koi là từ 18-25 độ C. Về thức ăn, anh nên cho cá ăn thức ăn chuyên dụng cho cá Koi, cho ăn 2-3 lần mỗi ngày và chỉ cho ăn lượng cá có thể ăn hết trong 5 phút.',
            date: '2023-08-15T10:00:00',
          },
          {
            id: 'RES-004',
            sender: 'customer',
            senderName: 'Lê Văn C',
            message: 'Cảm ơn bạn rất nhiều về thông tin hữu ích. Tôi còn một câu hỏi nữa: Nên thay nước bao lâu một lần?',
            date: '2023-08-15T10:30:00',
          },
          {
            id: 'RES-005',
            sender: 'staff',
            senderName: 'Trần Văn B',
            message: 'Anh nên thay khoảng 10-15% nước mỗi tuần. Điều này giúp duy trì chất lượng nước mà không gây sốc cho cá. Đồng thời, anh nên sử dụng bộ lọc nước chất lượng tốt và kiểm tra các chỉ số nước thường xuyên.',
            date: '2023-08-15T11:15:00',
          },
          {
            id: 'RES-006',
            sender: 'customer',
            senderName: 'Lê Văn C',
            message: 'Tuyệt vời, cảm ơn bạn rất nhiều về những lời khuyên. Tôi sẽ làm theo hướng dẫn.',
            date: '2023-08-15T11:45:00',
          },
        ],
      },
      {
        id: 'TKT-004',
        customerId: 'CUS-015',
        customerName: 'Hoàng Thị D',
        subject: 'Yêu cầu hủy đơn hàng',
        message: 'Tôi muốn hủy đơn hàng ORD-015 vì đã đặt nhầm loại cá. Đơn hàng vẫn đang ở trạng thái "Chờ xử lý". Vui lòng hủy giúp tôi.',
        date: '2023-08-18T08:20:00',
        status: 'open',
        priority: 'medium',
        orderId: 'ORD-015',
        responses: [],
      },
      {
        id: 'TKT-005',
        customerId: 'CUS-020',
        customerName: 'Phạm Văn E',
        subject: 'Thắc mắc về phí vận chuyển',
        message: 'Tôi thấy phí vận chuyển cho đơn hàng của tôi hơi cao. Làm thế nào để được miễn phí vận chuyển?',
        date: '2023-08-14T16:30:00',
        status: 'resolved',
        priority: 'low',
        responses: [
          {
            id: 'RES-007',
            sender: 'staff',
            senderName: 'Trần Văn B',
            message: 'Chào anh Phạm Văn E, phí vận chuyển được tính dựa trên khoảng cách và số lượng cá. Để được miễn phí vận chuyển, anh cần đặt đơn hàng có giá trị từ 2.000.000 VNĐ trở lên hoặc đăng ký thành viên VIP của cửa hàng.',
            date: '2023-08-14T17:00:00',
          },
          {
            id: 'RES-008',
            sender: 'customer',
            senderName: 'Phạm Văn E',
            message: 'Cảm ơn về thông tin. Tôi sẽ cân nhắc đặt thêm để được miễn phí vận chuyển.',
            date: '2023-08-14T17:30:00',
          },
        ],
      },
    ];
    
    setTickets(mockTickets);
    setFilteredTickets(mockTickets);
  }, []);
  
  // Filter tickets based on status, priority and search term
  useEffect(() => {
    let filtered = tickets;
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }
    
    // Filter by priority
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(ticket => 
        ticket.id.toLowerCase().includes(term) ||
        ticket.customerName.toLowerCase().includes(term) ||
        ticket.subject.toLowerCase().includes(term) ||
        (ticket.orderId && ticket.orderId.toLowerCase().includes(term))
      );
    }
    
    setFilteredTickets(filtered);
  }, [statusFilter, priorityFilter, searchTerm, tickets]);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Get status label
  // Get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return 'Mới mở';
      case 'in-progress': return 'Đang xử lý';
      case 'resolved': return 'Đã giải quyết';
      default: return status;
    }
  };
  
  // Get priority label
  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low': return 'Thấp';
      case 'medium': return 'Trung bình';
      case 'high': return 'Cao';
      default: return priority;
    }
  };
  
  // Handle ticket selection
  const selectTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
  };
  
  // Handle response submission
  const handleSubmitResponse = () => {
    if (!selectedTicket || !responseMessage.trim()) return;
    
    const newResponse = {
      id: `RES-${Date.now()}`,
      sender: 'staff' as const,
      senderName: 'Trần Văn B', // In a real app, this would be the logged-in staff member
      message: responseMessage,
      date: new Date().toISOString(),
    };
    
    // Update the selected ticket with the new response
    const updatedTicket = {
      ...selectedTicket,
      responses: [...selectedTicket.responses, newResponse],
      status: 'in-progress' as const, // Update status if it was 'open'
    };
    
    // Update tickets state
    const updatedTickets = tickets.map(ticket => 
      ticket.id === selectedTicket.id ? updatedTicket : ticket
    );
    
    setTickets(updatedTickets);
    setFilteredTickets(updatedTickets.filter(ticket => 
      (statusFilter === 'all' || ticket.status === statusFilter) &&
      (priorityFilter === 'all' || ticket.priority === priorityFilter)
    ));
    
    setSelectedTicket(updatedTicket);
    setResponseMessage('');
  };
  
  // Mark ticket as resolved
  const markAsResolved = (ticketId: string) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return { ...ticket, status: 'resolved' as const };
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
    setFilteredTickets(updatedTickets.filter(ticket => 
      (statusFilter === 'all' || ticket.status === statusFilter) &&
      (priorityFilter === 'all' || ticket.priority === priorityFilter)
    ));
    
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: 'resolved' });
    }
  };
  
  return (
    <div className="customer-support">
      <div className="page-header">
        <h1>Hỗ trợ khách hàng</h1>
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm yêu cầu hỗ trợ..."
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
              <option value="open">Mới mở</option>
              <option value="in-progress">Đang xử lý</option>
              <option value="resolved">Đã giải quyết</option>
            </select>
          </div>
          
          <div className="filter-dropdown">
            <select 
              value={priorityFilter} 
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">Tất cả mức độ</option>
              <option value="high">Cao</option>
              <option value="medium">Trung bình</option>
              <option value="low">Thấp</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="support-container">
        {/* Tickets List */}
        <div className="tickets-list">
          <h2>Danh sách yêu cầu hỗ trợ</h2>
          
          {filteredTickets.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-ticket-alt"></i>
              <h3>Không có yêu cầu hỗ trợ</h3>
              <p>Không tìm thấy yêu cầu hỗ trợ phù hợp với bộ lọc hiện tại.</p>
            </div>
          ) : (
            <div className="tickets-container">
              {filteredTickets.map(ticket => (
                <div 
                  key={ticket.id} 
                  className={`ticket-item ${selectedTicket?.id === ticket.id ? 'selected' : ''} ${ticket.status}`}
                  onClick={() => selectTicket(ticket)}
                >
                  <div className="ticket-header">
                    <div className="ticket-id">{ticket.id}</div>
                    <div className={`priority-badge ${ticket.priority}`}>
                      {getPriorityLabel(ticket.priority)}
                    </div>
                  </div>
                  
                  <div className="ticket-subject">{ticket.subject}</div>
                  
                  <div className="ticket-info">
                    <div className="customer-name">{ticket.customerName}</div>
                    <div className="ticket-date">{formatDate(ticket.date)}</div>
                  </div>
                  
                  <div className="ticket-footer">
                    <div className={`status-badge ${ticket.status}`}>
                      {getStatusLabel(ticket.status)}
                    </div>
                    {ticket.orderId && (
                      <div className="order-id">Đơn hàng: {ticket.orderId}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Ticket Detail */}
        <div className="ticket-detail">
          {selectedTicket ? (
            <>
              <div className="ticket-detail-header">
                <div className="ticket-title">
                  <h2>{selectedTicket.subject}</h2>
                  <div className={`status-badge ${selectedTicket.status}`}>
                    {getStatusLabel(selectedTicket.status)}
                  </div>
                </div>
                
                <div className="ticket-actions">
                  {selectedTicket.status !== 'resolved' && (
                    <button 
                      className="resolve-btn"
                      onClick={() => markAsResolved(selectedTicket.id)}
                    >
                      <i className="fas fa-check-circle"></i>
                      Đánh dấu đã giải quyết
                    </button>
                  )}
                </div>
              </div>
              
              <div className="ticket-meta">
                <div className="meta-item">
                  <span className="meta-label">Mã yêu cầu:</span>
                  <span className="meta-value">{selectedTicket.id}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Khách hàng:</span>
                  <span className="meta-value">{selectedTicket.customerName}</span>
                </div>
                {selectedTicket.orderId && (
                  <div className="meta-item">
                    <span className="meta-label">Đơn hàng:</span>
                    <span className="meta-value">{selectedTicket.orderId}</span>
                  </div>
                )}
                <div className="meta-item">
                  <span className="meta-label">Ngày tạo:</span>
                  <span className="meta-value">{formatDate(selectedTicket.date)}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Mức độ ưu tiên:</span>
                  <span className={`priority-badge ${selectedTicket.priority}`}>
                    {getPriorityLabel(selectedTicket.priority)}
                  </span>
                </div>
              </div>
              
              <div className="conversation">
                <div className="initial-message">
                  <div className="message-sender">
                    <div className="sender-avatar">
                      <img src={`https://ui-avatars.com/api/?name=${selectedTicket.customerName.replace(' ', '+')}&background=random`} alt={selectedTicket.customerName} />
                    </div>
                    <div className="sender-info">
                      <div className="sender-name">{selectedTicket.customerName}</div>
                      <div className="message-time">{formatDate(selectedTicket.date)}</div>
                    </div>
                  </div>
                  <div className="message-content">
                    {selectedTicket.message}
                  </div>
                </div>
                
                {selectedTicket.responses.map(response => (
                  <div 
                    key={response.id} 
                    className={`message ${response.sender === 'staff' ? 'staff-message' : 'customer-message'}`}
                  >
                    <div className="message-sender">
                      <div className="sender-avatar">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${response.senderName.replace(' ', '+')}&background=${response.sender === 'staff' ? '0066cc' : 'random'}`} 
                          alt={response.senderName} 
                        />
                      </div>
                      <div className="sender-info">
                        <div className="sender-name">{response.senderName}</div>
                        <div className="message-time">{formatDate(response.date)}</div>
                      </div>
                    </div>
                    <div className="message-content">
                      {response.message}
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedTicket.status !== 'resolved' && (
                <div className="response-form">
                  <h3>Phản hồi</h3>
                  <textarea
                    placeholder="Nhập phản hồi của bạn..."
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    // disabled={selectedTicket.status === 'resolved'}
                  ></textarea>
                  <button 
                    className="send-btn"
                    onClick={handleSubmitResponse}
                    // disabled={!responseMessage.trim() || selectedTicket.status === 'resolved'}
                  >
                    <i className="fas fa-paper-plane"></i>
                    Gửi phản hồi
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-detail">
              <div className="empty-state">
                <i className="fas fa-comments"></i>
                <h3>Chọn một yêu cầu hỗ trợ</h3>
                <p>Vui lòng chọn một yêu cầu hỗ trợ từ danh sách để xem chi tiết và phản hồi.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;