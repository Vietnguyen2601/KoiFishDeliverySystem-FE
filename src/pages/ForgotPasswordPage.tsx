import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    if (!email) {
      setError('Email là bắt buộc');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle password recovery logic here
      console.log('Password recovery requested for:', email);
      setSubmitted(true);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Quên mật khẩu</h2>
        
        {!submitted ? (
          <>
            <p className="auth-description">
              Vui lòng nhập email hoặc số điện thoại của bạn. Chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu.
            </p>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email hoặc Số điện thoại</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={error ? 'input-error' : ''}
                />
                {error && <span className="error-message">{error}</span>}
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">Gửi yêu cầu</button>
              </div>
            </form>
          </>
        ) : (
          <div className="success-message">
            <p>Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn. Vui lòng kiểm tra hộp thư đến.</p>
          </div>
        )}

        <div className="auth-links">
          <Link to="/login">Quay lại đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;