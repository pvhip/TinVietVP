// Mock Blog Data - Sử dụng khi server không kết nối được
import service1 from '../Assets/Client/Images/service_1.jpg';
import service2 from '../Assets/Client/Images/service_2.jpg';
import service3 from '../Assets/Client/Images/service_3.jpg';
import service4 from '../Assets/Client/Images/service_4.jpg';
import service5 from '../Assets/Client/Images/service_5.jpg';

export const getMockBlogs = () => {
  return [
    {
      id: 1,
      poster: service1,
      title: 'Tổng quan về các hãng máy photocopy phổ biến tại Việt Nam',
      slug: 'tong-quan-ve-cac-hang-may-photocopy-pho-bien-tai-viet-nam',
      content: `<h2>Giới thiệu</h2>
<p>Máy photocopy là thiết bị không thể thiếu trong mọi văn phòng hiện đại. Với sự phát triển của công nghệ, các hãng sản xuất máy photocopy đã không ngừng cải tiến để mang đến những sản phẩm chất lượng cao, hiệu quả và tiết kiệm chi phí.</p>

<h2>1. Canon - Thương hiệu hàng đầu về chất lượng</h2>
<p><strong>Canon</strong> là một trong những thương hiệu máy photocopy được ưa chuộng nhất tại Việt Nam. Với hơn 80 năm kinh nghiệm trong ngành công nghệ hình ảnh, Canon mang đến những sản phẩm có độ bền cao và chất lượng in ấn tuyệt vời.</p>
<ul>
  <li><strong>Ưu điểm:</strong> Chất lượng in sắc nét, độ bền cao, dễ sử dụng</li>
  <li><strong>Dòng sản phẩm nổi bật:</strong> Canon imageRUNNER ADVANCE, Canon imageCLASS</li>
  <li><strong>Phù hợp với:</strong> Văn phòng lớn, doanh nghiệp cần in ấn số lượng lớn</li>
</ul>

<h2>2. Ricoh - Lựa chọn cho doanh nghiệp</h2>
<p><strong>Ricoh</strong> nổi tiếng với các dòng máy photocopy đa chức năng (MFP) tích hợp nhiều tính năng như in, copy, scan, fax trong một thiết bị duy nhất.</p>
<ul>
  <li><strong>Ưu điểm:</strong> Đa chức năng, tiết kiệm không gian, hiệu quả cao</li>
  <li><strong>Dòng sản phẩm nổi bật:</strong> Ricoh MP series, Ricoh Aficio</li>
  <li><strong>Phù hợp với:</strong> Văn phòng vừa và nhỏ, cần tiết kiệm không gian</li>
</ul>

<h2>3. HP - Công nghệ tiên tiến</h2>
<p><strong>HP (Hewlett-Packard)</strong> là thương hiệu toàn cầu với công nghệ in laser và inkjet tiên tiến. Máy photocopy HP được đánh giá cao về tốc độ in và khả năng kết nối mạng.</p>
<ul>
  <li><strong>Ưu điểm:</strong> Tốc độ in nhanh, kết nối mạng tốt, dễ bảo trì</li>
  <li><strong>Dòng sản phẩm nổi bật:</strong> HP LaserJet Pro, HP OfficeJet Pro</li>
  <li><strong>Phù hợp với:</strong> Môi trường làm việc cần in ấn nhanh chóng</li>
</ul>

<h2>4. Brother - Giá cả hợp lý</h2>
<p><strong>Brother</strong> là lựa chọn phổ biến cho các văn phòng nhỏ và gia đình nhờ giá cả hợp lý và chất lượng ổn định.</p>
<ul>
  <li><strong>Ưu điểm:</strong> Giá cả phải chăng, dễ sử dụng, tiết kiệm mực</li>
  <li><strong>Dòng sản phẩm nổi bật:</strong> Brother MFC series, Brother DCP series</li>
  <li><strong>Phù hợp với:</strong> Văn phòng nhỏ, gia đình, người dùng cá nhân</li>
</ul>

<h2>5. Epson - Công nghệ EcoTank</h2>
<p><strong>Epson</strong> nổi tiếng với công nghệ EcoTank, cho phép người dùng nạp mực trực tiếp vào bình chứa, giúp tiết kiệm chi phí in ấn đáng kể.</p>
<ul>
  <li><strong>Ưu điểm:</strong> Tiết kiệm chi phí mực, in màu chất lượng cao</li>
  <li><strong>Dòng sản phẩm nổi bật:</strong> Epson EcoTank, Epson WorkForce</li>
  <li><strong>Phù hợp với:</strong> Người dùng cần in màu nhiều, muốn tiết kiệm chi phí</li>
</ul>

<h2>Kết luận</h2>
<p>Việc lựa chọn máy photocopy phù hợp phụ thuộc vào nhu cầu sử dụng, ngân sách và quy mô văn phòng của bạn. Hãy cân nhắc kỹ các yếu tố như khối lượng in, tính năng cần thiết và chi phí vận hành trước khi quyết định.</p>
<p>Nếu bạn cần tư vấn thêm về máy photocopy, hãy liên hệ với chúng tôi để được hỗ trợ tốt nhất!</p>`,
      author: 'Tin Việt',
      blog_category_id: 1,
      created_at: '2024-01-15T10:00:00.000Z',
      updated_at: '2024-01-15T10:00:00.000Z'
    },
    {
      id: 2,
      poster: service2,
      title: 'So sánh các hãng máy in phổ biến: Canon, HP, Epson, Brother',
      slug: 'so-sanh-cac-hang-may-in-pho-bien-canon-hp-epson-brother',
      content: `<h2>Giới thiệu</h2>
<p>Máy in là thiết bị quan trọng trong mọi văn phòng và gia đình. Với nhiều thương hiệu và mẫu mã khác nhau trên thị trường, việc lựa chọn máy in phù hợp có thể là một thách thức. Bài viết này sẽ giúp bạn so sánh các hãng máy in phổ biến nhất hiện nay.</p>

<h2>1. Canon - Chất lượng in ảnh hàng đầu</h2>
<p><strong>Điểm mạnh:</strong></p>
<ul>
  <li>Chất lượng in ảnh màu xuất sắc, đặc biệt với công nghệ PIXMA</li>
  <li>Độ bền cao, tuổi thọ lâu dài</li>
  <li>Hệ thống mực in đa dạng, dễ thay thế</li>
  <li>Hỗ trợ in không dây và kết nối đám mây</li>
</ul>
<p><strong>Điểm yếu:</strong></p>
<ul>
  <li>Giá thành tương đối cao</li>
  <li>Chi phí mực in có thể đắt hơn một số hãng khác</li>
</ul>
<p><strong>Phù hợp với:</strong> Nhiếp ảnh gia, văn phòng cần in ảnh chất lượng cao, người dùng chuyên nghiệp</p>

<h2>2. HP - Công nghệ laser tiên tiến</h2>
<p><strong>Điểm mạnh:</strong></p>
<ul>
  <li>Tốc độ in nhanh, đặc biệt với dòng LaserJet</li>
  <li>Chất lượng in văn bản sắc nét</li>
  <li>Kết nối mạng và di động tốt</li>
  <li>Dịch vụ hỗ trợ khách hàng tốt</li>
</ul>
<p><strong>Điểm yếu:</strong></p>
<ul>
  <li>Máy in laser màu có giá thành cao</li>
  <li>Chi phí bảo trì có thể cao hơn</li>
</ul>
<p><strong>Phù hợp với:</strong> Văn phòng cần in tài liệu số lượng lớn, doanh nghiệp vừa và lớn</p>

<h2>3. Epson - Công nghệ EcoTank tiết kiệm</h2>
<p><strong>Điểm mạnh:</strong></p>
<ul>
  <li>Công nghệ EcoTank giúp tiết kiệm chi phí mực đáng kể</li>
  <li>Chất lượng in màu tốt</li>
  <li>Giá thành hợp lý</li>
  <li>Dễ sử dụng và bảo trì</li>
</ul>
<p><strong>Điểm yếu:</strong></p>
<ul>
  <li>Tốc độ in có thể chậm hơn một số hãng khác</li>
  <li>Một số dòng máy có thể tốn nhiều mực khi in đen trắng</li>
</ul>
<p><strong>Phù hợp với:</strong> Gia đình, văn phòng nhỏ, người dùng cần in màu nhiều</p>

<h2>4. Brother - Giá cả hợp lý, đa chức năng</h2>
<p><strong>Điểm mạnh:</strong></p>
<ul>
  <li>Giá thành phải chăng</li>
  <li>Nhiều tính năng đa chức năng (in, scan, copy, fax)</li>
  <li>Tiết kiệm mực với công nghệ Brother</li>
  <li>Dễ sử dụng, phù hợp người mới</li>
</ul>
<p><strong>Điểm yếu:</strong></p>
<ul>
  <li>Chất lượng in ảnh có thể không bằng Canon hoặc Epson</li>
  <li>Tốc độ in trung bình</li>
</ul>
<p><strong>Phù hợp với:</strong> Văn phòng nhỏ, gia đình, người dùng cần máy đa chức năng</p>

<h2>Bảng so sánh nhanh</h2>
<table border="1" cellpadding="10" style="width: 100%; border-collapse: collapse;">
  <tr>
    <th>Hãng</th>
    <th>Chất lượng in</th>
    <th>Tốc độ</th>
    <th>Giá thành</th>
    <th>Tiết kiệm mực</th>
  </tr>
  <tr>
    <td>Canon</td>
    <td>⭐⭐⭐⭐⭐</td>
    <td>⭐⭐⭐⭐</td>
    <td>⭐⭐⭐</td>
    <td>⭐⭐⭐</td>
  </tr>
  <tr>
    <td>HP</td>
    <td>⭐⭐⭐⭐</td>
    <td>⭐⭐⭐⭐⭐</td>
    <td>⭐⭐⭐⭐</td>
    <td>⭐⭐⭐⭐</td>
  </tr>
  <tr>
    <td>Epson</td>
    <td>⭐⭐⭐⭐</td>
    <td>⭐⭐⭐</td>
    <td>⭐⭐⭐⭐</td>
    <td>⭐⭐⭐⭐⭐</td>
  </tr>
  <tr>
    <td>Brother</td>
    <td>⭐⭐⭐</td>
    <td>⭐⭐⭐</td>
    <td>⭐⭐⭐⭐⭐</td>
    <td>⭐⭐⭐⭐</td>
  </tr>
</table>

<h2>Kết luận</h2>
<p>Mỗi hãng máy in đều có những ưu điểm riêng. Việc lựa chọn phụ thuộc vào nhu cầu và ngân sách của bạn:</p>
<ul>
  <li><strong>Canon:</strong> Nếu bạn cần chất lượng in ảnh tốt nhất</li>
  <li><strong>HP:</strong> Nếu bạn cần tốc độ in nhanh và in tài liệu nhiều</li>
  <li><strong>Epson:</strong> Nếu bạn muốn tiết kiệm chi phí mực</li>
  <li><strong>Brother:</strong> Nếu bạn cần máy đa chức năng với giá hợp lý</li>
</ul>
<p>Hãy liên hệ với chúng tôi để được tư vấn chi tiết về sản phẩm phù hợp nhất với nhu cầu của bạn!</p>`,
      author: 'Tin Việt',
      blog_category_id: 1,
      created_at: '2024-01-16T10:00:00.000Z',
      updated_at: '2024-01-16T10:00:00.000Z'
    },
    {
      id: 3,
      poster: service3,
      title: '10 mẹo sử dụng máy in hiệu quả và tiết kiệm chi phí',
      slug: '10-meo-su-dung-may-in-hieu-qua-va-tiet-kiem-chi-phi',
      content: `<h2>Giới thiệu</h2>
<p>Máy in là thiết bị quan trọng trong văn phòng, nhưng chi phí vận hành có thể rất cao nếu không biết sử dụng đúng cách. Dưới đây là 10 mẹo giúp bạn sử dụng máy in hiệu quả và tiết kiệm chi phí.</p>

<h2>1. Chọn chế độ in phù hợp</h2>
<p><strong>Mẹo:</strong> Luôn kiểm tra chế độ in trước khi in. Chế độ "Draft" (Nháp) hoặc "Fast" (Nhanh) sẽ tiết kiệm mực hơn so với chế độ "Best" (Tốt nhất).</p>
<ul>
  <li>Dùng chế độ Draft cho tài liệu nội bộ, bản nháp</li>
  <li>Dùng chế độ Normal cho tài liệu thông thường</li>
  <li>Chỉ dùng chế độ Best khi cần in tài liệu quan trọng, ảnh chất lượng cao</li>
</ul>

<h2>2. In nhiều trang trên một tờ giấy</h2>
<p><strong>Mẹo:</strong> Khi in tài liệu tham khảo hoặc bản nháp, hãy in 2-4 trang trên một tờ giấy. Điều này giúp tiết kiệm giấy và mực đáng kể.</p>
<p><strong>Cách làm:</strong> Trong hộp thoại Print, chọn "Pages per sheet" và chọn 2, 4 hoặc 6 trang.</p>

<h2>3. Sử dụng chế độ in đen trắng khi không cần màu</h2>
<p><strong>Mẹo:</strong> Nếu tài liệu không cần màu, hãy chọn chế độ "Grayscale" (Đen trắng) thay vì in màu. Điều này giúp tiết kiệm mực màu rất nhiều.</p>
<p><strong>Lưu ý:</strong> Mực màu thường đắt hơn mực đen rất nhiều, đặc biệt với máy in phun màu.</p>

<h2>4. Kiểm tra trước khi in (Print Preview)</h2>
<p><strong>Mẹo:</strong> Luôn sử dụng tính năng Print Preview để kiểm tra tài liệu trước khi in. Điều này giúp tránh in nhầm, in sai và lãng phí giấy, mực.</p>
<ul>
  <li>Kiểm tra số trang</li>
  <li>Kiểm tra định dạng, căn lề</li>
  <li>Kiểm tra nội dung có đúng không</li>
</ul>

<h2>5. Tắt máy in đúng cách</h2>
<p><strong>Mẹo:</strong> Không nên tắt máy in bằng cách rút dây nguồn. Hãy tắt máy bằng nút Power để máy có thể tự động làm sạch đầu in và bảo quản mực đúng cách.</p>
<p><strong>Lợi ích:</strong> Giúp kéo dài tuổi thọ máy và tránh tắc mực.</p>

<h2>6. Sử dụng giấy tái chế và giấy phù hợp</h2>
<p><strong>Mẹo:</strong> Sử dụng giấy tái chế cho các tài liệu nội bộ. Đảm bảo sử dụng đúng loại giấy mà máy in yêu cầu để tránh kẹt giấy và hỏng máy.</p>
<ul>
  <li>Giấy thường (80gsm) cho tài liệu văn bản</li>
  <li>Giấy photo (200-300gsm) cho in ảnh</li>
  <li>Giấy nhãn cho in nhãn</li>
</ul>

<h2>7. Bảo trì định kỳ</h2>
<p><strong>Mẹo:</strong> Thực hiện bảo trì định kỳ theo hướng dẫn của nhà sản xuất:</p>
<ul>
  <li>Làm sạch đầu in định kỳ (nếu là máy in phun)</li>
  <li>Kiểm tra và thay thế bộ phận hao mòn</li>
  <li>Vệ sinh bên trong máy</li>
  <li>Cập nhật driver và firmware</li>
</ul>

<h2>8. Sử dụng mực in chính hãng hoặc mực tương thích chất lượng</h2>
<p><strong>Mẹo:</strong> Mặc dù mực in chính hãng đắt hơn, nhưng chúng thường cho chất lượng in tốt hơn và ít gây hỏng máy. Nếu dùng mực tương thích, hãy chọn loại có chất lượng tốt.</p>
<p><strong>Lưu ý:</strong> Mực kém chất lượng có thể làm tắc đầu in và hỏng máy, tốn kém hơn nhiều so với tiết kiệm ban đầu.</p>

<h2>9. In hàng loạt thay vì in từng trang</h2>
<p><strong>Mẹo:</strong> Thay vì in từng tài liệu một, hãy tập hợp các tài liệu cần in và in hàng loạt. Điều này giúp máy in hoạt động hiệu quả hơn và tiết kiệm thời gian.</p>
<p><strong>Lợi ích:</strong> Giảm thời gian khởi động máy, tiết kiệm điện năng.</p>

<h2>10. Sử dụng chế độ tiết kiệm mực (Eco Mode)</h2>
<p><strong>Mẹo:</strong> Nhiều máy in hiện đại có chế độ Eco Mode hoặc Toner Save Mode. Chế độ này giúp giảm lượng mực sử dụng mà vẫn đảm bảo chất lượng in đủ dùng cho tài liệu thông thường.</p>
<p><strong>Cách bật:</strong> Kiểm tra trong cài đặt máy in hoặc driver máy in trên máy tính.</p>

<h2>Kết luận</h2>
<p>Áp dụng những mẹo trên sẽ giúp bạn sử dụng máy in hiệu quả hơn, tiết kiệm chi phí và kéo dài tuổi thọ máy. Hãy bắt đầu áp dụng ngay hôm nay để thấy sự khác biệt!</p>
<p>Nếu bạn cần tư vấn thêm về cách sử dụng máy in hoặc cần hỗ trợ kỹ thuật, hãy liên hệ với chúng tôi!</p>`,
      author: 'Tin Việt',
      blog_category_id: 1,
      created_at: '2024-01-17T10:00:00.000Z',
      updated_at: '2024-01-17T10:00:00.000Z'
    },
    {
      id: 4,
      poster: service4,
      title: 'Hướng dẫn vệ sinh máy in và máy photocopy tại văn phòng đúng cách',
      slug: 'huong-dan-ve-sinh-may-in-va-may-photocopy-tai-van-phong-dung-cach',
      content: `<h2>Giới thiệu</h2>
<p>Vệ sinh máy in và máy photocopy định kỳ là việc làm cần thiết để đảm bảo chất lượng in ấn, kéo dài tuổi thọ thiết bị và tránh các sự cố không mong muốn. Bài viết này sẽ hướng dẫn bạn cách vệ sinh máy in và máy photocopy tại văn phòng một cách an toàn và hiệu quả.</p>

<h2>Chuẩn bị dụng cụ vệ sinh</h2>
<p>Trước khi bắt đầu, hãy chuẩn bị các dụng cụ sau:</p>
<ul>
  <li>Khăn mềm, không xơ (microfiber)</li>
  <li>Bông gòn hoặc tăm bông</li>
  <li>Nước cất hoặc nước tinh khiết</li>
  <li>Dung dịch vệ sinh chuyên dụng (nếu có)</li>
  <li>Máy hút bụi mini (nếu có)</li>
  <li>Găng tay cao su</li>
  <li>Khăn giấy</li>
</ul>
<p><strong>Lưu ý quan trọng:</strong> KHÔNG sử dụng cồn, xăng, dầu hoặc các chất tẩy rửa mạnh vì có thể làm hỏng máy.</p>

<h2>Hướng dẫn vệ sinh máy in phun màu</h2>

<h3>1. Vệ sinh bên ngoài máy</h3>
<p><strong>Bước 1:</strong> Tắt máy và rút dây nguồn</p>
<p><strong>Bước 2:</strong> Dùng khăn mềm ẩm (nhúng nước và vắt khô) lau sạch bề mặt ngoài của máy</p>
<p><strong>Bước 3:</strong> Lau khô bằng khăn khô</p>
<p><strong>Lưu ý:</strong> Tránh để nước chảy vào bên trong máy</p>

<h3>2. Vệ sinh đầu in (Print Head)</h3>
<p><strong>Bước 1:</strong> Mở nắp máy và tìm đầu in</p>
<p><strong>Bước 2:</strong> Dùng bông gòn hoặc tăm bông nhúng nước cất, vắt khô</p>
<p><strong>Bước 3:</strong> Nhẹ nhàng lau đầu in theo một chiều, không chà xát mạnh</p>
<p><strong>Bước 4:</strong> Để đầu in khô hoàn toàn trước khi đóng nắp</p>
<p><strong>Lưu ý:</strong> Nếu máy có chức năng làm sạch đầu in tự động, hãy sử dụng chức năng này trước (thường có trong menu máy in)</p>

<h3>3. Vệ sinh khay giấy và bộ phận nạp giấy</h3>
<p><strong>Bước 1:</strong> Rút khay giấy ra ngoài</p>
<p><strong>Bước 2:</strong> Dùng máy hút bụi hoặc khăn ẩm để làm sạch bụi và mảnh vụn giấy</p>
<p><strong>Bước 3:</strong> Kiểm tra và làm sạch các con lăn nạp giấy bằng khăn ẩm</p>
<p><strong>Bước 4:</strong> Để khô hoàn toàn trước khi lắp lại</p>

<h2>Hướng dẫn vệ sinh máy in laser</h2>

<h3>1. Vệ sinh bên trong máy</h3>
<p><strong>Bước 1:</strong> Tắt máy và rút dây nguồn, đợi máy nguội hoàn toàn</p>
<p><strong>Bước 2:</strong> Mở nắp máy và lấy hộp mực (toner) ra</p>
<p><strong>Bước 3:</strong> Dùng máy hút bụi hoặc khăn khô để làm sạch bụi mực bên trong</p>
<p><strong>Lưu ý:</strong> Cẩn thận với bụi mực, tránh hít phải và không để dính vào quần áo</p>

<h3>2. Vệ sinh bộ phận nạp giấy</h3>
<p><strong>Bước 1:</strong> Rút khay giấy ra</p>
<p><strong>Bước 2:</strong> Dùng khăn ẩm lau sạch các con lăn</p>
<p><strong>Bước 3:</strong> Kiểm tra và loại bỏ mảnh vụn giấy</p>

<h3>3. Vệ sinh bộ phận ra giấy</h3>
<p><strong>Bước 1:</strong> Kiểm tra khay ra giấy</p>
<p><strong>Bước 2:</strong> Làm sạch các con lăn bằng khăn ẩm</p>
<p><strong>Bước 3:</strong> Loại bỏ mảnh vụn giấy và bụi</p>

<h2>Hướng dẫn vệ sinh máy photocopy</h2>

<h3>1. Vệ sinh kính quét (Scanner Glass)</h3>
<p><strong>Bước 1:</strong> Tắt máy và rút dây nguồn</p>
<p><strong>Bước 2:</strong> Mở nắp máy photocopy</p>
<p><strong>Bước 3:</strong> Dùng khăn mềm và nước cất để lau kính quét</p>
<p><strong>Bước 4:</strong> Lau theo một chiều, từ trong ra ngoài</p>
<p><strong>Bước 5:</strong> Dùng khăn khô lau lại để không còn vết nước</p>
<p><strong>Lưu ý:</strong> Kính quét bẩn sẽ làm ảnh hưởng đến chất lượng bản copy</p>

<h3>2. Vệ sinh bộ phận nạp giấy</h3>
<p><strong>Bước 1:</strong> Rút khay giấy ra</p>
<p><strong>Bước 2:</strong> Dùng máy hút bụi làm sạch bụi và mảnh vụn</p>
<p><strong>Bước 3:</strong> Lau sạch các con lăn bằng khăn ẩm</p>
<p><strong>Bước 4:</strong> Kiểm tra và điều chỉnh các bộ phận nếu cần</p>

<h3>3. Vệ sinh bộ phận ra giấy</h3>
<p><strong>Bước 1:</strong> Kiểm tra khay ra giấy</p>
<p><strong>Bước 2:</strong> Làm sạch các con lăn và bộ phận dẫn giấy</p>
<p><strong>Bước 3:</strong> Loại bỏ mảnh vụn giấy</p>

<h3>4. Vệ sinh bộ phận làm nóng (Fuser Unit)</h3>
<p><strong>Lưu ý:</strong> Bộ phận này rất nóng khi máy vừa hoạt động. Chỉ vệ sinh khi máy đã tắt và nguội hoàn toàn.</p>
<p><strong>Bước 1:</strong> Đợi máy nguội hoàn toàn (ít nhất 30 phút sau khi tắt)</p>
<p><strong>Bước 2:</strong> Dùng khăn khô lau nhẹ nhàng bề mặt</p>
<p><strong>Bước 3:</strong> Không sử dụng nước hoặc chất lỏng</p>

<h2>Lịch vệ sinh định kỳ</h2>
<p>Để đảm bảo máy hoạt động tốt, hãy thực hiện vệ sinh theo lịch sau:</p>
<ul>
  <li><strong>Vệ sinh bên ngoài:</strong> Hàng tuần</li>
  <li><strong>Vệ sinh đầu in (máy in phun):</strong> Hàng tháng hoặc khi chất lượng in giảm</li>
  <li><strong>Vệ sinh kính quét (máy photocopy):</strong> Hàng tuần hoặc khi thấy vết bẩn</li>
  <li><strong>Vệ sinh bộ phận nạp/ra giấy:</strong> Hàng tháng</li>
  <li><strong>Vệ sinh toàn bộ máy:</strong> Hàng quý (3 tháng) hoặc khi cần thiết</li>
</ul>

<h2>Những điều cần tránh</h2>
<ul>
  <li>❌ KHÔNG sử dụng cồn, xăng, dầu hoặc chất tẩy rửa mạnh</li>
  <li>❌ KHÔNG vệ sinh khi máy đang hoạt động hoặc còn nóng</li>
  <li>❌ KHÔNG để nước hoặc chất lỏng chảy vào bên trong máy</li>
  <li>❌ KHÔNG chà xát mạnh các bộ phận nhạy cảm</li>
  <li>❌ KHÔNG tháo rời các bộ phận không cần thiết</li>
</ul>

<h2>Khi nào cần gọi thợ chuyên nghiệp</h2>
<p>Hãy liên hệ với dịch vụ bảo trì chuyên nghiệp khi:</p>
<ul>
  <li>Máy có lỗi kỹ thuật phức tạp</li>
  <li>Cần thay thế linh kiện</li>
  <li>Máy không hoạt động sau khi vệ sinh</li>
  <li>Bạn không chắc chắn về cách vệ sinh</li>
</ul>

<h2>Kết luận</h2>
<p>Vệ sinh máy in và máy photocopy định kỳ là việc làm quan trọng để đảm bảo chất lượng in ấn và kéo dài tuổi thọ thiết bị. Hãy tuân thủ các hướng dẫn trên và thực hiện vệ sinh đúng cách để máy luôn hoạt động tốt.</p>
<p>Nếu bạn cần hỗ trợ về dịch vụ bảo trì hoặc vệ sinh máy chuyên nghiệp, hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất!</p>`,
      author: 'Tin Việt',
      blog_category_id: 1,
      created_at: '2024-01-18T10:00:00.000Z',
      updated_at: '2024-01-18T10:00:00.000Z'
    },
    {
      id: 5,
      poster: service5,
      title: 'Top 5 hãng máy photocopy tốt nhất cho văn phòng nhỏ năm 2024',
      slug: 'top-5-hang-may-photocopy-tot-nhat-cho-van-phong-nho-nam-2024',
      content: `<h2>Giới thiệu</h2>
<p>Văn phòng nhỏ thường có nhu cầu in ấn và photocopy vừa phải, nhưng vẫn cần thiết bị chất lượng và đáng tin cậy. Bài viết này sẽ giới thiệu top 5 hãng máy photocopy tốt nhất phù hợp cho văn phòng nhỏ.</p>

<h2>1. Canon imageCLASS - Lựa chọn hàng đầu</h2>
<p><strong>Điểm nổi bật:</strong></p>
<ul>
  <li>Chất lượng in sắc nét, độ phân giải cao</li>
  <li>Thiết kế gọn nhẹ, tiết kiệm không gian</li>
  <li>Dễ sử dụng, phù hợp người mới</li>
  <li>Giá cả hợp lý cho văn phòng nhỏ</li>
</ul>
<p><strong>Dòng sản phẩm đề xuất:</strong> Canon imageCLASS MF445dw, Canon imageCLASS MF264dw</p>
<p><strong>Phù hợp với:</strong> Văn phòng 5-15 người, cần in ấn chất lượng cao</p>

<h2>2. HP LaserJet Pro - Hiệu suất cao</h2>
<p><strong>Điểm nổi bật:</strong></p>
<ul>
  <li>Tốc độ in nhanh (lên đến 40 trang/phút)</li>
  <li>Kết nối không dây tiện lợi</li>
  <li>Chi phí vận hành thấp</li>
  <li>Hỗ trợ in từ điện thoại, máy tính bảng</li>
</ul>
<p><strong>Dòng sản phẩm đề xuất:</strong> HP LaserJet Pro M404dn, HP LaserJet Pro MFP M428fdw</p>
<p><strong>Phù hợp với:</strong> Văn phòng cần in ấn nhanh, nhiều người dùng</p>

<h2>3. Brother MFC - Đa chức năng</h2>
<p><strong>Điểm nổi bật:</strong></p>
<ul>
  <li>Tích hợp in, scan, copy, fax trong một máy</li>
  <li>Giá thành phải chăng</li>
  <li>Tiết kiệm không gian</li>
  <li>Dễ bảo trì</li>
</ul>
<p><strong>Dòng sản phẩm đề xuất:</strong> Brother MFC-L3750CDW, Brother MFC-L2750DW</p>
<p><strong>Phù hợp với:</strong> Văn phòng nhỏ cần nhiều chức năng, ngân sách hạn chế</p>

<h2>4. Ricoh SP - Độ bền cao</h2>
<p><strong>Điểm nổi bật:</strong></p>
<ul>
  <li>Độ bền cao, tuổi thọ lâu dài</li>
  <li>Chất lượng in ổn định</li>
  <li>Dễ sử dụng</li>
  <li>Hỗ trợ kỹ thuật tốt</li>
</ul>
<p><strong>Dòng sản phẩm đề xuất:</strong> Ricoh SP 3600SF, Ricoh SP 3610SF</p>
<p><strong>Phù hợp với:</strong> Văn phòng cần thiết bị bền bỉ, ít hỏng hóc</p>

<h2>5. Epson WorkForce - Tiết kiệm mực</h2>
<p><strong>Điểm nổi bật:</strong></p>
<ul>
  <li>Công nghệ EcoTank tiết kiệm mực</li>
  <li>Chi phí in ấn thấp</li>
  <li>Chất lượng in màu tốt</li>
  <li>Phù hợp in ảnh và tài liệu màu</li>
</ul>
<p><strong>Dòng sản phẩm đề xuất:</strong> Epson WorkForce Pro WF-4820, Epson WorkForce Pro WF-4830</p>
<p><strong>Phù hợp với:</strong> Văn phòng cần in màu nhiều, muốn tiết kiệm chi phí mực</p>

<h2>Bảng so sánh nhanh</h2>
<table border="1" cellpadding="10" style="width: 100%; border-collapse: collapse;">
  <tr>
    <th>Hãng</th>
    <th>Giá thành</th>
    <th>Chất lượng</th>
    <th>Tốc độ</th>
    <th>Tiết kiệm</th>
  </tr>
  <tr>
    <td>Canon</td>
    <td>⭐⭐⭐⭐</td>
    <td>⭐⭐⭐⭐⭐</td>
    <td>⭐⭐⭐⭐</td>
    <td>⭐⭐⭐⭐</td>
  </tr>
  <tr>
    <td>HP</td>
    <td>⭐⭐⭐⭐</td>
    <td>⭐⭐⭐⭐</td>
    <td>⭐⭐⭐⭐⭐</td>
    <td>⭐⭐⭐⭐</td>
  </tr>
  <tr>
    <td>Brother</td>
    <td>⭐⭐⭐⭐⭐</td>
    <td>⭐⭐⭐⭐</td>
    <td>⭐⭐⭐</td>
    <td>⭐⭐⭐⭐</td>
  </tr>
  <tr>
    <td>Ricoh</td>
    <td>⭐⭐⭐⭐</td>
    <td>⭐⭐⭐⭐</td>
    <td>⭐⭐⭐⭐</td>
    <td>⭐⭐⭐⭐</td>
  </tr>
  <tr>
    <td>Epson</td>
    <td>⭐⭐⭐⭐</td>
    <td>⭐⭐⭐⭐</td>
    <td>⭐⭐⭐</td>
    <td>⭐⭐⭐⭐⭐</td>
  </tr>
</table>

<h2>Tiêu chí lựa chọn</h2>
<p>Khi chọn máy photocopy cho văn phòng nhỏ, hãy cân nhắc:</p>
<ul>
  <li><strong>Khối lượng in:</strong> Ước tính số trang in mỗi tháng</li>
  <li><strong>Không gian:</strong> Kích thước máy phù hợp với không gian văn phòng</li>
  <li><strong>Ngân sách:</strong> Cả chi phí mua máy và chi phí vận hành</li>
  <li><strong>Tính năng:</strong> Cần những chức năng gì (in, scan, copy, fax)</li>
  <li><strong>Kết nối:</strong> Cần kết nối mạng, không dây hay chỉ USB</li>
</ul>

<h2>Kết luận</h2>
<p>Mỗi hãng máy photocopy đều có những ưu điểm riêng. Việc lựa chọn phụ thuộc vào nhu cầu cụ thể của văn phòng bạn. Hãy liên hệ với chúng tôi để được tư vấn chi tiết và chọn được sản phẩm phù hợp nhất!</p>
<p>Chúng tôi cung cấp dịch vụ cho thuê máy photocopy với giá cả hợp lý, phù hợp cho văn phòng nhỏ. Liên hệ ngay để được báo giá!</p>`,
      author: 'Tin Việt',
      blog_category_id: 1,
      created_at: '2024-01-19T10:00:00.000Z',
      updated_at: '2024-01-19T10:00:00.000Z'
    }
  ];
};

// Lưu mock blogs vào localStorage để cache
export const saveMockBlogsToCache = () => {
  try {
    const blogs = getMockBlogs();
    localStorage.setItem('cached_blogs', JSON.stringify(blogs));
    console.log('✅ Saved mock blogs to cache');
  } catch (error) {
    console.error('Error saving mock blogs to cache:', error);
  }
};

// Lấy mock blogs từ cache
export const getMockBlogsFromCache = () => {
  try {
    const cached = localStorage.getItem('cached_blogs');
    return cached ? JSON.parse(cached) : [];
  } catch (error) {
    console.error('Error getting mock blogs from cache:', error);
    return [];
  }
};

