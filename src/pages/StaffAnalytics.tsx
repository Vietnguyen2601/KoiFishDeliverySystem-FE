import { useState, useEffect } from 'react';

// Define interfaces
interface AnalyticsData {
  orderStats: {
    total: number;
    pending: number;
    processing: number;
    inTransit: number;
    delivered: number;
    cancelled: number;
  };
  revenueData: {
    daily: { date: string; amount: number }[];
    weekly: { week: string; amount: number }[];
    monthly: { month: string; amount: number }[];
  };
  topShippers: {
    id: string;
    name: string;
    deliveries: number;
    rating: number;
    avatar: string;
  }[];
  popularFishTypes: {
    type: string;
    count: number;
    percentage: number;
  }[];
  customerSatisfaction: {
    excellent: number;
    good: number;
    average: number;
    poor: number;
    total: number;
  };
}

const StaffAnalytics = () => {
  // State for analytics data and filters
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('week');
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch mock analytics data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock analytics data
      const mockData: AnalyticsData = {
        orderStats: {
          total: 156,
          pending: 12,
          processing: 24,
          inTransit: 35,
          delivered: 78,
          cancelled: 7,
        },
        revenueData: {
          daily: [
            { date: '2023-08-12', amount: 12500000 },
            { date: '2023-08-13', amount: 15700000 },
            { date: '2023-08-14', amount: 9800000 },
            { date: '2023-08-15', amount: 18200000 },
            { date: '2023-08-16', amount: 14300000 },
            { date: '2023-08-17', amount: 16500000 },
            { date: '2023-08-18', amount: 20100000 },
          ],
          weekly: [
            { week: 'Tuần 1', amount: 87500000 },
            { week: 'Tuần 2', amount: 92300000 },
            { week: 'Tuần 3', amount: 107600000 },
            { week: 'Tuần 4', amount: 95800000 },
          ],
          monthly: [
            { month: 'Tháng 3', amount: 380500000 },
            { month: 'Tháng 4', amount: 425700000 },
            { month: 'Tháng 5', amount: 398200000 },
            { month: 'Tháng 6', amount: 412500000 },
            { month: 'Tháng 7', amount: 450800000 },
            { month: 'Tháng 8', amount: 383200000 },
          ],
        },
        topShippers: [
          {
            id: 'SHP-001',
            name: 'Nguyễn Văn X',
            deliveries: 45,
            rating: 4.8,
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          },
          {
            id: 'SHP-003',
            name: 'Lê Văn Z',
            deliveries: 38,
            rating: 4.9,
            avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
          },
          {
            id: 'SHP-005',
            name: 'Hoàng Văn V',
            deliveries: 32,
            rating: 4.7,
            avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
          },
          {
            id: 'SHP-002',
            name: 'Trần Thị Y',
            deliveries: 28,
            rating: 4.5,
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          },
          {
            id: 'SHP-004',
            name: 'Phạm Thị W',
            deliveries: 13,
            rating: 4.6,
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
          },
        ],
        popularFishTypes: [
          { type: 'Kohaku', count: 45, percentage: 28.8 },
          { type: 'Sanke', count: 32, percentage: 20.5 },
          { type: 'Showa', count: 28, percentage: 17.9 },
          { type: 'Bekko', count: 18, percentage: 11.5 },
          { type: 'Uchiha', count: 15, percentage: 9.6 },
          { type: 'Khác', count: 18, percentage: 11.7 },
        ],
        customerSatisfaction: {
          excellent: 68,
          good: 45,
          average: 12,
          poor: 5,
          total: 130,
        },
      };
      
      setAnalyticsData(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
    });
  };
  
  // Get revenue data based on selected time range
  const getRevenueData = () => {
    if (!analyticsData) return [];
    
    switch (timeRange) {
      case 'day':
        return analyticsData.revenueData.daily;
      case 'week':
        return analyticsData.revenueData.weekly;
      case 'month':
        return analyticsData.revenueData.monthly;
      default:
        return analyticsData.revenueData.weekly;
    }
  };
  
  // Calculate satisfaction percentages
  const calculateSatisfactionPercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1);
  };
  
  return (
    <div className="staff-analytics">
      <div className="page-header">
        <h1>Thống kê & Báo cáo</h1>
        <div className="header-actions">
          <div className="time-range-selector">
            <button 
              className={`range-btn ${timeRange === 'day' ? 'active' : ''}`}
              onClick={() => setTimeRange('day')}
            >
              Ngày
            </button>
            <button 
              className={`range-btn ${timeRange === 'week' ? 'active' : ''}`}
              onClick={() => setTimeRange('week')}
            >
              Tuần
            </button>
            <button 
              className={`range-btn ${timeRange === 'month' ? 'active' : ''}`}
              onClick={() => setTimeRange('month')}
            >
              Tháng
            </button>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : analyticsData ? (
        <div className="analytics-container">
          {/* Order Statistics */}
          <div className="analytics-card order-stats">
            <h2>Thống kê đơn hàng</h2>
            <div className="stats-grid">
              <div className="stat-item total">
                <h3>Tổng đơn hàng</h3>
                <div className="stat-value">{analyticsData.orderStats.total}</div>
              </div>
              <div className="stat-item pending">
                <h3>Chờ xử lý</h3>
                <div className="stat-value">{analyticsData.orderStats.pending}</div>
              </div>
              <div className="stat-item processing">
                <h3>Đang xử lý</h3>
                <div className="stat-value">{analyticsData.orderStats.processing}</div>
              </div>
              <div className="stat-item in-transit">
                <h3>Đang vận chuyển</h3>
                <div className="stat-value">{analyticsData.orderStats.inTransit}</div>
              </div>
              <div className="stat-item delivered">
                <h3>Đã giao hàng</h3>
                <div className="stat-value">{analyticsData.orderStats.delivered}</div>
              </div>
              <div className="stat-item cancelled">
                <h3>Đã hủy</h3>
                <div className="stat-value">{analyticsData.orderStats.cancelled}</div>
              </div>
            </div>
          </div>
          
          {/* Revenue Chart */}
          <div className="analytics-card revenue-chart">
            <h2>Doanh thu</h2>
            <div className="chart-container">
              <div className="chart-bars">
                {getRevenueData().map((item, index) => {
                  const label = 'date' in item ? formatDate(item.date) : 
                               'week' in item ? item.week : 
                               'month' in item ? item.month : '';
                  
                  // Find max amount for scaling
                  const maxAmount = Math.max(...getRevenueData().map(d => d.amount));
                  const barHeight = (item.amount / maxAmount) * 100;
                  
                  return (
                    <div key={index} className="chart-bar-container">
                      <div 
                        className="chart-bar" 
                        style={{ height: `${barHeight}%` }}
                        title={formatPrice(item.amount)}
                      ></div>
                      <div className="chart-label">{label}</div>
                    </div>
                  );
                })}
              </div>
              <div className="chart-info">
                <div className="total-revenue">
                  <h3>Tổng doanh thu</h3>
                  <div className="revenue-value">
                    {formatPrice(getRevenueData().reduce((sum, item) => sum + item.amount, 0))}
                  </div>
                </div>
                <div className="average-revenue">
                  <h3>Trung bình</h3>
                  <div className="revenue-value">
                    {formatPrice(getRevenueData().reduce((sum, item) => sum + item.amount, 0) / getRevenueData().length)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Top Shippers */}
          <div className="analytics-card top-shippers">
            <h2>Shipper xuất sắc</h2>
            <div className="shippers-list">
              {analyticsData.topShippers.map((shipper, index) => (
                <div key={shipper.id} className="shipper-item">
                  <div className="shipper-rank">{index + 1}</div>
                  <div className="shipper-avatar">
                    <img src={shipper.avatar} alt={shipper.name} />
                  </div>
                  <div className="shipper-info">
                    <h3>{shipper.name}</h3>
                    <div className="shipper-stats">
                      <div className="deliveries">
                        <i className="icon-delivery"></i>
                        <span>{shipper.deliveries} đơn</span>
                      </div>
                      <div className="rating">
                        <i className="icon-star"></i>
                        <span>{shipper.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Popular Fish Types */}
          <div className="analytics-card popular-fish">
            <h2>Loại cá phổ biến</h2>
            <div className="fish-chart">
              {analyticsData.popularFishTypes.map(fish => (
                <div key={fish.type} className="fish-item">
                  <div className="fish-info">
                    <h3>{fish.type}</h3>
                    <div className="fish-count">{fish.count} đơn</div>
                  </div>
                  <div className="progress-container">
                    <div 
                      className="progress-bar"
                      style={{ width: `${fish.percentage}%` }}
                    ></div>
                    <span className="percentage">{fish.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Customer Satisfaction */}
          <div className="analytics-card customer-satisfaction">
            <h2>Mức độ hài lòng của khách hàng</h2>
            <div className="satisfaction-chart">
              <div className="satisfaction-bars">
                <div className="satisfaction-bar-container">
                  <div className="satisfaction-label">Xuất sắc</div>
                  <div className="satisfaction-bar-wrapper">
                    <div 
                      className="satisfaction-bar excellent"
                      style={{ width: `${calculateSatisfactionPercentage(analyticsData.customerSatisfaction.excellent, analyticsData.customerSatisfaction.total)}%` }}
                    ></div>
                  </div>
                  <div className="satisfaction-value">
                    {analyticsData.customerSatisfaction.excellent} ({calculateSatisfactionPercentage(analyticsData.customerSatisfaction.excellent, analyticsData.customerSatisfaction.total)}%)
                  </div>
                </div>
                
                <div className="satisfaction-bar-container">
                  <div className="satisfaction-label">Tốt</div>
                  <div className="satisfaction-bar-wrapper">
                    <div 
                      className="satisfaction-bar good"
                      style={{ width: `${calculateSatisfactionPercentage(analyticsData.customerSatisfaction.good, analyticsData.customerSatisfaction.total)}%` }}
                    ></div>
                  </div>
                  <div className="satisfaction-value">
                    {analyticsData.customerSatisfaction.good} ({calculateSatisfactionPercentage(analyticsData.customerSatisfaction.good, analyticsData.customerSatisfaction.total)}%)
                  </div>
                </div>
                
                <div className="satisfaction-bar-container">
                  <div className="satisfaction-label">Trung bình</div>
                  <div className="satisfaction-bar-wrapper">
                    <div 
                      className="satisfaction-bar average"
                      style={{ width: `${calculateSatisfactionPercentage(analyticsData.customerSatisfaction.average, analyticsData.customerSatisfaction.total)}%` }}
                    ></div>
                  </div>
                  <div className="satisfaction-value">
                    {analyticsData.customerSatisfaction.average} ({calculateSatisfactionPercentage(analyticsData.customerSatisfaction.average, analyticsData.customerSatisfaction.total)}%)
                  </div>
                </div>
                
                <div className="satisfaction-bar-container">
                  <div className="satisfaction-label">Kém</div>
                  <div className="satisfaction-bar-wrapper">
                    <div 
                      className="satisfaction-bar poor"
                      style={{ width: `${calculateSatisfactionPercentage(analyticsData.customerSatisfaction.poor, analyticsData.customerSatisfaction.total)}%` }}
                    ></div>
                  </div>
                  <div className="satisfaction-value">
                    {analyticsData.customerSatisfaction.poor} ({calculateSatisfactionPercentage(analyticsData.customerSatisfaction.poor, analyticsData.customerSatisfaction.total)}%)
                  </div>
                </div>
              </div>
              
              <div className="satisfaction-summary">
                <div className="total-responses">
                  <h3>Tổng phản hồi</h3>
                  <div className="response-value">{analyticsData.customerSatisfaction.total}</div>
                </div>
                <div className="satisfaction-rate">
                  <h3>Tỷ lệ hài lòng</h3>
                  <div className="rate-value">
                    {calculateSatisfactionPercentage(
                      analyticsData.customerSatisfaction.excellent + analyticsData.customerSatisfaction.good,
                      analyticsData.customerSatisfaction.total
                    )}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="error-state">
          <p>Không thể tải dữ liệu. Vui lòng thử lại sau.</p>
        </div>
      )}
    </div>
  );
};

export default StaffAnalytics;