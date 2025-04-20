import { Link } from 'react-router-dom';
import '../styles/homepage.css';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* You can replace this with your logo */}
            <h1 className="text-2xl font-bold text-primary">Koi Delivery System</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#about" className="hover:text-primary">Giới thiệu</a>
            <a href="#services" className="hover:text-primary">Dịch vụ</a>
            <a href="#pricing" className="hover:text-primary">Bảng giá</a>
            <a href="#blog" className="hover:text-primary">Blog</a>
            <a href="#faq" className="hover:text-primary">FAQ</a>
          </nav>
          
          <div className="flex space-x-4">
            <Link to="/login" className="btn btn-primary">Đăng nhập</Link>
            <Link to="/register" className="btn btn-outline">Đăng ký</Link>
          </div>
        </div>
      </header>

      {/* Banner */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl font-bold mb-4">Vận chuyển cá Koi chuyên nghiệp</h2>
              <p className="text-lg mb-6">Dịch vụ vận chuyển cá Koi an toàn, nhanh chóng và chuyên nghiệp. Chúng tôi đảm bảo cá của bạn được vận chuyển trong điều kiện tốt nhất.</p>
              <Link to="/register" className="btn btn-primary">Đăng ký ngay</Link>
            </div>
            <div className="md:w-1/2">
              {/* Image placeholder - replace with your actual image */}
              <div className="bg-gray-300 h-80 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Hình ảnh vận chuyển cá Koi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Giới thiệu về chúng tôi</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-4">Công ty vận chuyển cá Koi hàng đầu</h3>
              <p className="mb-4">
                Koi Delivery System là đơn vị chuyên nghiệp trong lĩnh vực vận chuyển cá Koi với hơn 10 năm kinh nghiệm. 
                Chúng tôi hiểu rằng cá Koi không chỉ là thú cưng mà còn là tài sản quý giá của bạn.
              </p>
              <p>
                Với đội ngũ nhân viên được đào tạo chuyên sâu và trang thiết bị hiện đại, 
                chúng tôi cam kết mang đến dịch vụ vận chuyển an toàn nhất cho cá Koi của bạn.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Tại sao chọn chúng tôi?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Đội ngũ chuyên nghiệp, am hiểu về cá Koi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Phương tiện vận chuyển chuyên dụng, đảm bảo nhiệt độ và oxy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Theo dõi đơn hàng trực tuyến 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Bảo hiểm cho mọi chuyến hàng</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Dịch vụ khách hàng hỗ trợ 24/7</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Dịch vụ của chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Vận chuyển nội địa</h3>
              <p className="mb-4">Dịch vụ vận chuyển cá Koi trong nước với thời gian nhanh chóng và an toàn tuyệt đối.</p>
              <a href="#" className="text-primary hover:underline">Tìm hiểu thêm →</a>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Vận chuyển quốc tế</h3>
              <p className="mb-4">Dịch vụ vận chuyển cá Koi quốc tế với đầy đủ giấy tờ, thủ tục hải quan và đảm bảo an toàn.</p>
              <a href="#" className="text-primary hover:underline">Tìm hiểu thêm →</a>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Dịch vụ đặc biệt</h3>
              <p className="mb-4">Dịch vụ vận chuyển cao cấp với kiểm soát nhiệt độ, oxy và các yêu cầu đặc biệt khác.</p>
              <a href="#" className="text-primary hover:underline">Tìm hiểu thêm →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Bảng giá vận chuyển</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="border p-3 text-left">Loại dịch vụ</th>
                  <th className="border p-3 text-left">Khoảng cách</th>
                  <th className="border p-3 text-left">Giá cơ bản</th>
                  <th className="border p-3 text-left">Thời gian</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border p-3">Nội thành</td>
                  <td className="border p-3">&lt; 30km</td>
                  <td className="border p-3">500.000đ</td>
                  <td className="border p-3">Trong ngày</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3">Liên tỉnh</td>
                  <td className="border p-3">30-200km</td>
                  <td className="border p-3">1.500.000đ</td>
                  <td className="border p-3">1-2 ngày</td>
                </tr>
                <tr className="bg-white">
                  <td className="border p-3">Liên vùng</td>
                  <td className="border p-3">200-500km</td>
                  <td className="border p-3">3.000.000đ</td>
                  <td className="border p-3">2-3 ngày</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3">Quốc tế</td>
                  <td className="border p-3">&gt; 500km</td>
                  <td className="border p-3">Liên hệ</td>
                  <td className="border p-3">3-7 ngày</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-600">* Giá trên chưa bao gồm VAT và có thể thay đổi tùy theo số lượng, kích thước và yêu cầu đặc biệt.</p>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Blog & Tin tức</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <div className="bg-gray-200 h-48 mb-4 rounded"></div>
              <h3 className="text-xl font-semibold mb-2">Cách chuẩn bị cá Koi trước khi vận chuyển</h3>
              <p className="text-gray-600 mb-2">15/04/2024</p>
              <p className="mb-4">Những bước chuẩn bị quan trọng giúp cá Koi của bạn sẵn sàng cho quá trình vận chuyển an toàn.</p>
              <a href="#" className="text-primary hover:underline">Đọc tiếp →</a>
            </div>
            <div className="card">
              <div className="bg-gray-200 h-48 mb-4 rounded"></div>
              <h3 className="text-xl font-semibold mb-2">5 yếu tố ảnh hưởng đến sức khỏe cá Koi khi vận chuyển</h3>
              <p className="text-gray-600 mb-2">10/04/2024</p>
              <p className="mb-4">Tìm hiểu các yếu tố quan trọng ảnh hưởng đến sức khỏe của cá Koi trong quá trình vận chuyển.</p>
              <a href="#" className="text-primary hover:underline">Đọc tiếp →</a>
            </div>
            <div className="card">
              <div className="bg-gray-200 h-48 mb-4 rounded"></div>
              <h3 className="text-xl font-semibold mb-2">Chăm sóc cá Koi sau khi vận chuyển</h3>
              <p className="text-gray-600 mb-2">05/04/2024</p>
              <p className="mb-4">Hướng dẫn chi tiết cách chăm sóc và giúp cá Koi thích nghi nhanh chóng sau quá trình vận chuyển.</p>
              <a href="#" className="text-primary hover:underline">Đọc tiếp →</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Câu hỏi thường gặp</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="card">
              <h3 className="text-xl font-semibold mb-2">Thời gian vận chuyển cá Koi tối đa là bao lâu?</h3>
              <p>Thời gian vận chuyển tối đa phụ thuộc vào kích thước, số lượng cá và khoảng cách. Thông thường, chúng tôi khuyến nghị không quá 24 giờ cho vận chuyển nội địa và 48 giờ cho vận chuyển quốc tế.</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-2">Làm thế nào để đảm bảo cá Koi an toàn trong quá trình vận chuyển?</h3>
              <p>Chúng tôi sử dụng các thiết bị chuyên dụng kiểm soát nhiệt độ, oxy và pH. Cá được đặt trong túi đặc biệt với nước sạch và oxy bổ sung, sau đó được đặt trong thùng cách nhiệt.</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-2">Có cần chuẩn bị gì trước khi vận chuyển cá Koi không?</h3>
              <p>Nên nhịn ăn cá 24-48 giờ trước khi vận chuyển để giảm chất thải. Đảm bảo cá khỏe mạnh và không có dấu hiệu bệnh tật trước khi vận chuyển.</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-2">Có bảo hiểm cho cá Koi trong quá trình vận chuyển không?</h3>
              <p>Có, chúng tôi cung cấp các gói bảo hiểm khác nhau tùy thuộc vào giá trị của cá. Vui lòng liên hệ với nhân viên tư vấn để biết thêm chi tiết.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Koi Delivery System</h3>
              <p className="mb-4">Dịch vụ vận chuyển cá Koi chuyên nghiệp, an toàn và đáng tin cậy.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-primary">Facebook</a>
                <a href="#" className="hover:text-primary">Instagram</a>
                <a href="#" className="hover:text-primary">YouTube</a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
              <p className="mb-2">Địa chỉ: 123 Đường ABC, Quận XYZ, TP. HCM</p>
              <p className="mb-2">Email: info@koidesystem.com</p>
              <p className="mb-2">Hotline: 1900 1234 567</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Dịch vụ</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary">Vận chuyển nội địa</a></li>
                <li><a href="#" className="hover:text-primary">Vận chuyển quốc tế</a></li>
                <li><a href="#" className="hover:text-primary">Dịch vụ đặc biệt</a></li>
                <li><a href="#" className="hover:text-primary">Tư vấn vận chuyển</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary">FAQ</a></li>
                <li><a href="#" className="hover:text-primary">Chính sách bảo mật</a></li>
                <li><a href="#" className="hover:text-primary">Điều khoản dịch vụ</a></li>
                <li><a href="#" className="hover:text-primary">Chính sách hoàn tiền</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2024 Koi Delivery System. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;