import { useState, useEffect } from 'react';
import '../styles/booking.css';

interface KoiFish {
  id: number;
  quantity: number;
  weight: number;
  length: number; // Added length field
  type: string;
  origin: string; // Added origin field
  description: string; // Added description field
}

interface BookingFormData {
  fishes: KoiFish[];
  shipping: {
    pickupLocation: string;
    deliveryLocation: string;
    senderName: string; // Added sender name
    phoneNumber: string; // Added phone number
    serviceType: string;
  };
  additionalServices: {
    fishCare: boolean; // Changed from healthCheck
    certification: boolean;
    environmentSetup: boolean; // Added environment setup
    healthCheck: boolean;
  };
  payment: string; // Added payment method
}

const BookingPage = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    fishes: [{ 
      id: 1, 
      quantity: 1, 
      weight: 1, 
      length: 10, 
      type: 'Kohaku', 
      origin: 'Nhật Bản (Japan)',
      description: ''
    }],
    shipping: {
      pickupLocation: '',
      deliveryLocation: '',
      senderName: '',
      phoneNumber: '',
      serviceType: 'local',
    },
    additionalServices: {
      fishCare: false,
      certification: false,
      environmentSetup: false,
      healthCheck: false,
    },
    payment: 'cash',
  });

  // ... existing code ...

  const [step, setStep] = useState(1);
  const [isConfirming, setIsConfirming] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Updated fish types according to requirements
  const fishTypes = [
    'Kohaku', 'Sanke (Taisho Sanke)', 'Showa (Showa Sanshoku)', 
    'Uchiha', 'Bekko', 'Akastuki', 'Shisui', 'Tanchiro', 'Gomensai'
  ];

  // Added fish origins
  const fishOrigins = [
    'Nhật Bản (Japan)', 'Trung Quốc (China)', 'Thái Lan (Thailand)', 
    'Việt Nam (Vietnam)', 'Indonesia', 'Malaysia'
  ];

  // Calculate price whenever form data changes
  useEffect(() => {
    calculateTotalPrice();
  }, [formData]);

  const calculateTotalPrice = () => {
    // Base price calculation for fish
    let fishPrice = 0;
    formData.fishes.forEach(fish => {
      // Example pricing: 100,000 VND per kg, adjusted by origin
      let pricePerKg = 100000;
      
      // Premium for Japanese Koi
      if (fish.origin === 'Nhật Bản (Japan)') {
        pricePerKg = 200000;
      } else if (fish.origin === 'Trung Quốc (China)') {
        pricePerKg = 150000;
      }
      
      fishPrice += fish.quantity * fish.weight * pricePerKg;
    });

    // Additional services pricing
    let servicesPrice = 0;
    if (formData.additionalServices.fishCare) servicesPrice += 200000;
    if (formData.additionalServices.certification) servicesPrice += 150000;
    if (formData.additionalServices.environmentSetup) servicesPrice += 500000;
    if (formData.additionalServices.healthCheck) servicesPrice += 250000;

    // Shipping price based on service type
    let shippingPrice = 0;
    switch (formData.shipping.serviceType) {
      case 'local':
        shippingPrice = 300000; // Local shipping fee
        break;
      case 'suburban':
        shippingPrice = 500000; // Suburban shipping fee
        break;
      case 'export':
        shippingPrice = 2000000; // Export shipping fee
        break;
      default:
        shippingPrice = 300000; // Default shipping fee
    }
    
    // Calculate total
    const total = fishPrice + servicesPrice + shippingPrice;
    setTotalPrice(total);
  };

  const handleFishChange = (id: number, field: keyof KoiFish, value: string | number) => {
    const updatedFishes = formData.fishes.map(fish => {
      if (fish.id === id) {
        return { ...fish, [field]: value };
      }
      return fish;
    });

    setFormData({
      ...formData,
      fishes: updatedFishes,
    });
  };

  // ... existing code for addFish and removeFish ...
  const addFish = () => {
    const newId = Math.max(...formData.fishes.map(fish => fish.id), 0) + 1;
    setFormData({
      ...formData,
      fishes: [...formData.fishes, { 
        id: newId, 
        quantity: 1, 
        weight: 1, 
        length: 10, 
        type: 'Kohaku', 
        origin: 'Nhật Bản (Japan)',
        description: ''
      }],
    });
  };

  const removeFish = (id: number) => {
    if (formData.fishes.length > 1) {
      setFormData({
        ...formData,
        fishes: formData.fishes.filter(fish => fish.id !== id),
      });
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirming(true);
  };

  const confirmOrder = () => {
    // Here you would typically send the order to your backend
    console.log('Order confirmed:', formData);
    // Redirect to confirmation page or show success message
    alert('Đơn hàng của bạn đã được xác nhận!');
    setIsConfirming(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleShippingChange = (field: keyof typeof formData.shipping, value: string) => {
    setFormData({
      ...formData,
      shipping: {
        ...formData.shipping,
        [field]: value,
      },
    });
  };

  const handleAdditionalServiceChange = (service: keyof typeof formData.additionalServices) => {
    setFormData({
      ...formData,
      additionalServices: {
        ...formData.additionalServices,
        [service]: !formData.additionalServices[service],
      },
    });
  };

  const handlePaymentChange = (method: string) => {
    setFormData({
      ...formData,
      payment: method,
    });
  };

  // ... existing code for nextStep, prevStep, handleSubmit, confirmOrder, formatPrice ...

  return (
    <div className="booking-container">
      <h1 className="booking-title">Đặt đơn vận chuyển cá Koi</h1>
      
      {!isConfirming ? (
        <div className="booking-form-container">
          <div className="booking-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Dịch vụ vận chuyển</div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Thông tin cá Koi</div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Thông tin vận chuyển</div>
            <div className={`step ${step >= 4 ? 'active' : ''}`}>4. Dịch vụ bổ sung</div>
            <div className={`step ${step >= 5 ? 'active' : ''}`}>5. Thanh toán</div>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="form-section">
                <h2>Dịch vụ vận chuyển</h2>
                
                <div className="shipping-service-options">
                  <div className="shipping-service-option">
                    <input
                      type="radio"
                      id="local"
                      name="shippingService"
                      value="local"
                      checked={formData.shipping.serviceType === 'local'}
                      onChange={(e) => handleShippingChange('serviceType', e.target.value)}
                    />
                    <div className="service-details">
                      <label htmlFor="local">Vận chuyển nội thành</label>
                      <p>Dịch vụ vận chuyển trong phạm vi thành phố, thời gian giao hàng nhanh chóng</p>
                      <span className="service-price">300,000₫</span>
                    </div>
                  </div>
                  
                  <div className="shipping-service-option">
                    <input
                      type="radio"
                      id="suburban"
                      name="shippingService"
                      value="suburban"
                      checked={formData.shipping.serviceType === 'suburban'}
                      onChange={(e) => handleShippingChange('serviceType', e.target.value)}
                    />
                    <div className="service-details">
                      <label htmlFor="suburban">Vận chuyển ngoại thành</label>
                      <p>Dịch vụ vận chuyển đến các khu vực ngoại thành, tỉnh lân cận</p>
                      <span className="service-price">500,000₫</span>
                    </div>
                  </div>
                  
                  <div className="shipping-service-option">
                    <input
                      type="radio"
                      id="export"
                      name="shippingService"
                      value="export"
                      checked={formData.shipping.serviceType === 'export'}
                      onChange={(e) => handleShippingChange('serviceType', e.target.value)}
                    />
                    <div className="service-details">
                      <label htmlFor="export">Vận chuyển xuất khẩu</label>
                      <p>Dịch vụ vận chuyển quốc tế, đảm bảo an toàn cho cá Koi khi di chuyển đường dài</p>
                      <span className="service-price">2,000,000₫</span>
                    </div>
                  </div>
                </div>
                
                <div className="form-navigation">
                  <button type="button" className="prev-btn" onClick={prevStep}>
                    Quay lại
                  </button>
                  <button type="button" className="next-btn" onClick={nextStep}>
                    Tiếp theo
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-section">
                <h2>Thông tin cá Koi</h2>
                
                {formData.fishes.map((fish) => (
                  <div key={fish.id} className="fish-item">
                    <div className="fish-header">
                      <h3>Cá Koi #{fish.id}</h3>
                      {formData.fishes.length > 1 && (
                        <button 
                        type="button" 
                        className="remove-fish-btn"
                        onClick={() => removeFish(fish.id)}
                      >
                        Xóa
                      </button>
                      )}
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor={`type-${fish.id}`}>Loại cá</label>
                        <select
                          id={`type-${fish.id}`}
                          value={fish.type}
                          onChange={(e) => handleFishChange(fish.id, 'type', e.target.value)}
                        >
                          {fishTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor={`origin-${fish.id}`}>Nguồn gốc</label>
                        <select
                          id={`origin-${fish.id}`}
                          value={fish.origin}
                          onChange={(e) => handleFishChange(fish.id, 'origin', e.target.value)}
                        >
                          {fishOrigins.map((origin) => (
                            <option key={origin} value={origin}>{origin}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor={`quantity-${fish.id}`}>Số lượng</label>
                        <input
                          type="number"
                          id={`quantity-${fish.id}`}
                          min="0"
                          value={fish.quantity}
                          onChange={(e) => handleFishChange(fish.id, 'quantity', parseInt(e.target.value) || 1)}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor={`weight-${fish.id}`}>Cân nặng trung bình (kg)</label>
                        <input
                          type="number"
                          id={`weight-${fish.id}`}
                          min="0"
                          step="1"
                          value={fish.weight}
                          onChange={(e) => handleFishChange(fish.id, 'weight', parseFloat(e.target.value) || 0.1)}
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor={`length-${fish.id}`}>Chiều dài trung bình (cm)</label>
                        <input
                          type="number"
                          id={`length-${fish.id}`}
                          min="1"
                          step="1"
                          value={fish.length}
                          onChange={(e) => handleFishChange(fish.id, 'length', parseInt(e.target.value) || 1)}
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor={`description-${fish.id}`}>Mô tả</label>
                      <textarea
                        id={`description-${fish.id}`}
                        value={fish.description}
                        onChange={(e) => handleFishChange(fish.id, 'description', e.target.value)}
                        rows={3}
                        placeholder="Mô tả thêm về cá (màu sắc, đặc điểm, v.v.)"
                      />
                    </div>
                  </div>
                ))}
                
                <button type="button" className="add-fish-btn" onClick={addFish}>
                  + Thêm cá Koi
                </button>
                
                <div className="form-navigation">
                  <button type="button" className="next-btn" onClick={nextStep}>
                    Tiếp theo
                  </button>
                </div>


              </div>
            )}
            
            {step === 3 && (
              <div className="form-section">
                <h2>Thông tin vận chuyển</h2>
                
                <div className="form-group">
                  <label htmlFor="senderName">Tên người gửi</label>
                  <input
                    type="text"
                    id="senderName"
                    value={formData.shipping.senderName}
                    onChange={(e) => handleShippingChange('senderName', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phoneNumber">Số điện thoại</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={formData.shipping.phoneNumber}
                    onChange={(e) => handleShippingChange('phoneNumber', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="pickupLocation">Địa điểm nhận hàng</label>
                  <input
                    type="text"
                    id="pickupLocation"
                    value={formData.shipping.pickupLocation}
                    onChange={(e) => handleShippingChange('pickupLocation', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="deliveryLocation">Địa điểm giao hàng</label>
                  <input
                    type="text"
                    id="deliveryLocation"
                    value={formData.shipping.deliveryLocation}
                    onChange={(e) => handleShippingChange('deliveryLocation', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-navigation">
                  <button type="button" className="prev-btn" onClick={prevStep}>
                    Quay lại
                  </button>
                  <button type="button" className="next-btn" onClick={nextStep}>
                    Tiếp theo
                  </button>
                </div>
              </div>
            )}
            
            {step === 4 && (
              <div className="form-section">
                <h2>Dịch vụ bổ sung</h2>
                
                <div className="service-options">
                  <div className="service-option">
                    <input
                      type="checkbox"
                      id="fishCare"
                      checked={formData.additionalServices.fishCare}
                      onChange={() => handleAdditionalServiceChange('fishCare')}
                    />
                    <div className="service-details">
                      <label htmlFor="fishCare">Chăm sóc cá khi vận chuyển</label>
                      <p>Dịch vụ chăm sóc đặc biệt cho cá Koi trong suốt quá trình vận chuyển</p>
                      <span className="service-price">200,000₫</span>
                    </div>
                  </div>
                  
                  <div className="service-option">
                    <input
                      type="checkbox"
                      id="certification"
                      checked={formData.additionalServices.certification}
                      onChange={() => handleAdditionalServiceChange('certification')}
                    />
                    <div className="service-details">
                      <label htmlFor="certification">Tạo giấy tờ, chứng chỉ, chứng nhận</label>
                      <p>Cung cấp giấy chứng nhận nguồn gốc và sức khỏe cho cá Koi</p>
                      <span className="service-price">150,000₫</span>
                    </div>
                  </div>
                  
                  <div className="service-option">
                    <input
                      type="checkbox"
                      id="environmentSetup"
                      checked={formData.additionalServices.environmentSetup}
                      onChange={() => handleAdditionalServiceChange('environmentSetup')}
                    />
                    <div className="service-details">
                      <label htmlFor="environmentSetup">Xây dựng môi trường sống cho cá ở chỗ mới</label>
                      <p>Dịch vụ thiết lập môi trường sống phù hợp cho cá Koi tại địa điểm mới</p>
                      <span className="service-price">500,000₫</span>
                    </div>
                  </div>
                  
                  <div className="service-option">
                    <input
                      type="checkbox"
                      id="healthCheck"
                      checked={formData.additionalServices.healthCheck}
                      onChange={() => handleAdditionalServiceChange('healthCheck')}
                    />
                    <div className="service-details">
                      <label htmlFor="healthCheck">Kiểm tra sức khỏe cho cá</label>
                      <p>Dịch vụ kiểm tra sức khỏe toàn diện cho cá Koi trước khi vận chuyển</p>
                      <span className="service-price">250,000₫</span>
                    </div>
                  </div>
                </div>
                
                <div className="form-navigation">
                  <button type="button" className="prev-btn" onClick={prevStep}>
                    Quay lại
                  </button>
                  <button type="button" className="next-btn" onClick={nextStep}>
                    Tiếp theo
                  </button>
                </div>
              </div>
            )}   

            {step === 5 && (
              <div className="form-section">
                <h2>Thanh toán</h2>
                
                <div className="price-summary">
                  <h3>Tổng chi phí</h3>
                  <div className="price-amount">{formatPrice(totalPrice)}</div>
                </div>
                
                <div className="payment-options">
                  <h3>Phương thức thanh toán</h3>
                  
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="cash"
                      name="payment"
                      value="cash"
                      checked={formData.payment === 'cash'}
                      onChange={() => handlePaymentChange('cash')}
                    />
                    <label htmlFor="cash">Thanh toán tiền mặt khi nhận hàng</label>
                  </div>
                  
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="bank"
                      name="payment"
                      value="bank"
                      checked={formData.payment === 'bank'}
                      onChange={() => handlePaymentChange('bank')}
                    />
                    <label htmlFor="bank">Chuyển khoản ngân hàng</label>
                  </div>
                  
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="momo"
                      name="payment"
                      value="momo"
                      checked={formData.payment === 'momo'}
                      onChange={() => handlePaymentChange('momo')}
                    />
                    <label htmlFor="momo">Ví điện tử MoMo</label>
                  </div>
                  
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="zalopay"
                      name="payment"
                      value="zalopay"
                      checked={formData.payment === 'zalopay'}
                      onChange={() => handlePaymentChange('zalopay')}
                    />
                    <label htmlFor="zalopay">ZaloPay</label>
                  </div>
                </div>
                
                <div className="form-navigation">
                  <button type="button" className="prev-btn" onClick={prevStep}>
                    Quay lại
                  </button>
                  <button type="submit" className="submit-btn">
                    Xác nhận đơn hàng
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className="order-confirmation">
          <h2>Xác nhận đơn hàng</h2>
          
          <div className="confirmation-section">
            <h3>Thông tin cá Koi</h3>
            {formData.fishes.map((fish) => (
              <div key={fish.id} className="confirmation-item">
                <p><strong>Loại cá:</strong> {fish.type}</p>
                <p><strong>Nguồn gốc:</strong> {fish.origin}</p>
                <p><strong>Số lượng:</strong> {fish.quantity}</p>
                <p><strong>Cân nặng trung bình:</strong> {fish.weight} kg</p>
                <p><strong>Chiều dài trung bình:</strong> {fish.length} cm</p>
                {fish.description && <p><strong>Mô tả:</strong> {fish.description}</p>}
              </div>
            ))}
          </div>
          
          <div className="confirmation-section">
            <h3>Thông tin vận chuyển</h3>
            <p><strong>Tên người gửi:</strong> {formData.shipping.senderName}</p>
            <p><strong>Số điện thoại:</strong> {formData.shipping.phoneNumber}</p>
            <p><strong>Địa điểm nhận hàng:</strong> {formData.shipping.pickupLocation}</p>
            <p><strong>Địa điểm giao hàng:</strong> {formData.shipping.deliveryLocation}</p>
            <p><strong>Dịch vụ vận chuyển:</strong> {
              formData.shipping.serviceType === 'local' ? 'Vận chuyển nội thành' :
              formData.shipping.serviceType === 'suburban' ? 'Vận chuyển ngoại thành' :
              formData.shipping.serviceType === 'export' ? 'Vận chuyển xuất khẩu' : ''
            }</p>
          </div>
          
          <div className="confirmation-section">
            <h3>Dịch vụ bổ sung</h3>
            <ul className="service-list">
              {formData.additionalServices.fishCare && (
                <li>Chăm sóc cá khi vận chuyển</li>
              )}
              {formData.additionalServices.certification && (
                <li>Tạo giấy tờ, chứng chỉ, chứng nhận</li>
              )}
              {formData.additionalServices.environmentSetup && (
                <li>Xây dựng môi trường sống cho cá ở chỗ mới</li>
              )}
              {formData.additionalServices.healthCheck && (
                <li>Kiểm tra sức khỏe cho cá</li>
              )}
              {!formData.additionalServices.fishCare && 
                !formData.additionalServices.certification && 
                !formData.additionalServices.environmentSetup &&
                !formData.additionalServices.healthCheck && (
                <li>Không có dịch vụ bổ sung</li>
              )}
            </ul>
          </div>
          
          <div className="confirmation-section">
            <h3>Phương thức thanh toán</h3>
            <p>
              {formData.payment === 'cash' && 'Thanh toán tiền mặt khi nhận hàng'}
              {formData.payment === 'bank' && 'Chuyển khoản ngân hàng'}
              {formData.payment === 'momo' && 'Ví điện tử MoMo'}
              {formData.payment === 'zalopay' && 'ZaloPay'}
            </p>
          </div>
          
          <div className="confirmation-section total-section">
            <h3>Tổng chi phí</h3>
            <div className="total-price">{formatPrice(totalPrice)}</div>
          </div>
          
          <div className="confirmation-actions">
            <button className="cancel-btn" onClick={() => setIsConfirming(false)}>
              Chỉnh sửa
            </button>
            <button className="confirm-btn" onClick={confirmOrder}>
              Xác nhận giao hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;