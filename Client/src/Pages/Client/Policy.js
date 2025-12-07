import React from 'react'
import { Link } from 'react-router-dom'

function Policy() {
    return (
        <>
            <div className="container-fluid py-5 bg-dark hero-header mb-2">
            </div>
            <div className="container py-1">
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <div className="text-center">
                            <h1 className="mb-4 text-uppercase fw-normal section-title" style={{ fontWeight: 'bold', color: '#FEA100' }}>Chính sách hoạt động chung</h1>
                        </div>                        <div className="mb-4">
                            <h3>Giờ hoạt động</h3>
                            <h5>Từ thứ hai - thứ sáu:</h5>
                            <p>8:00 - 22:00</p>
                            <h5>Từ thứ bảy - chủ nhật:</h5>
                            <p>10:00 - 23:00</p>

                        </div>
                        <div className="mb-4">
                            <h3>*Hướng dẫn đặt hàng ăn*</h3>
                            <h3>1. Điền thông tin</h3>
                            <p>Khách hàng chọn vào nút đặt hàng trên giao diện chính.</p>
                            <p>Điền đầy đủ các thông tin cơ bản để tiện trong quá trình đặt hàng như họ tên, số điện thoại, ngày đặt hàng, số người ăn,... Khi điền đầy đủ thông tin thì ấn vào nút "Tiếp theo" đển chuyển đến trang chọn sản phẩm khi có nhu cầu</p>
                            <p>Khi bạn chỉ muốn điền thông tin để đặt chỗ thì ấn vào nút "Hoàn thành đặt chỗ" để hoàn thành việc lưu thông tin</p>
                        </div>
                        <div className="mb-4">
                            <h3>2. Chọn sản phẩm</h3>
                            <p>Khách hàng chọn sản phẩm từ danh sách Sản phẩm của công ty, bao gồm các sản phẩmchính, sản phẩmphụ, đồ uống và tráng miệng.</p>
                            <p>Các sản phẩm được chọn sẽ được ghi nhận trong mục "sản phẩm đã chọn", trong đó hiển thị chi tiết tên món, số lượng, giá từng sản phẩmvà tổng giá của đơn đặt hàng. Khách hàng có thể thay đổi sản phẩm (thêm, bớt món) tại giai đoạn này.</p>
                        </div>
                        <div className="mb-4">
                            <h3>3. Thanh toán đơn đặt hàng (nếu có)</h3>
                            <p>Nếu công ty yêu cầu thanh toán trước, khách hàng sẽ được chuyển đến trang thanh toán. Tại đây, khách hàng có thể chọn phương thức thanh toán bao gồm thanh toán qua thẻ, ví điện tử, hoặc các phương thức khác được công ty hỗ trợ.</p>
                            <p>Sau khi chọn phương thức thanh toán, khách hàng điền các thông tin cần thiết và chọn "Xác nhận thanh toán".</p>
                        </div>
                        <div className="mb-4">
                            <h3>4. Xác nhận đặt hàng</h3>
                            <p>Tại trang "Xác nhận đặt hàng", khách hàng kiểm tra lại thông tin đặt hàng và nhấn nút "Đồng ý đặt hàng" để hoàn tất quá trình.</p>
                            <p>Hệ thống sẽ gửi tin nhắn hoặc email xác nhận đặt hàng trong vòng 10 phút kể từ khi khách hàng chọn "Đồng ý đặt hàng".</p>
                        </div>
                        <div className="mb-4">
                            <h3>*Lưu ý </h3>
                            <p>Khi đặt hàng trên website của công ty, khách hàng hiểu và chấp nhận các điều kiện/lưu ý sau:</p>
                            <ul>
                                <li>công ty chỉ tiếp nhận đơn đặt hàng trực tuyến từ 09:00 sáng đến trước 21:00 tối.</li>
                                <li>công ty yêu cầu đặt hàng trước ít nhất 2 tiếng so với thời gian dự kiến đến.</li>
                                <li>Nếu khách hàng đã thanh toán trước, việc hủy hàng hoặc thay đổi thời gian cần liên hệ với công ty ít nhất 1 tiếng trước giờ đặt.</li>
                            </ul>
                        </div>

                        <Link to="/" className="btn btn-primary">
                            <i className="fa-solid fa-arrow-left ms-2"></i> Về trang chủ
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Policy
