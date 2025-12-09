import React from 'react'
import logoImage from '../../Assets/Client/Images/logo.png';
import mayPhotocopyBanner from '../../Assets/Client/Images/may_photocopy_banner.jpg';

export default function Service() {
  return (
    <div>
      <div 
        className="container-fluid py-5 bg-dark hero-header mb-5"
        style={{
          backgroundImage: `url(${mayPhotocopyBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1
          }}
        ></div>
        <div className="container text-center my-5 pt-5 pb-4" style={{ position: 'relative', zIndex: 2 }}>
          <div className="mb-4">
            <img 
              src={logoImage} 
              alt="Tin Việt Logo" 
              className="img-fluid"
              style={{ 
                maxHeight: '120px', 
                filter: 'brightness(0) invert(1)',
                opacity: 0.9
              }}
            />
          </div>
          <h1 className="display-3 text-white mb-3 animated slideInDown">Dịch vụ</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
              <li className="breadcrumb-item text-white active" aria-current="page">Dịch vụ</li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Dịch vụ của chúng tôi</h5>
            <h1 className="mb-5">Khám phá các dịch vụ của chúng tôi</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-user-tie text-primary mb-4"></i>
                  <h5>Sản phẩm hàng đầu</h5>
                  <p>Sản phẩm của chúng tôi với hơn 5 năm được lưu hành trên thị trường, sẽ luôn mang đến cho quý khách những thiết bị hoàn hảo và chất lượng..</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-utensils text-primary mb-4"></i>
                  <h5>Thiết bị tốt nhất</h5>
                  <p>Mỗi thiết bị tại công ty đều được nhập khẩu từ những nhãn hàng uy tín và có tiếng, đảm bảo chất lượng..</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-shopping-cart text-primary mb-4"></i>
                  <h5>Đặt hàng trực tuyến</h5>
                  <p>Dễ dàng đặt sản phẩm yêu thích của bạn thông qua hệ thống trực tuyến của chúng tôi, nhanh chóng và tiện lợi.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-headset text-primary mb-4"></i>
                  <h5>Dịch vụ 24/7</h5>
                  <p>Chúng tôi luôn sẵn sàng phục vụ bạn mọi lúc, mọi nơi, với dịch vụ khách hàng 24/7. Hỗ trợ chat trực tuyến với công ty.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-shield-alt text-primary mb-4"></i>
                  <h5>An toàn và bảo mật</h5>
                  <p>Chúng tôi cam kết cung cấp các dịch vụ an toàn và bảo mật, đảm bảo thông tin cá nhân của bạn được bảo vệ tốt nhất.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-truck text-primary mb-4"></i>
                  <h5>Giao hàng nhanh chóng</h5>
                  <p>Dịch vụ giao hàng của chúng tôi đảm bảo rằng bạn nhận được sản phẩm của mình một cách nhanh chóng và đúng thời gian.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-hands-helping text-primary mb-4"></i>
                  <h5>Hỗ trợ tận tình</h5>
                  <p>Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn với bất kỳ câu hỏi hay vấn đề nào bạn gặp phải.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-gem text-primary mb-4"></i>
                  <h5>Dịch vụ cao cấp</h5>
                  <p>Chúng tôi cung cấp các dịch vụ cao cấp với chất lượng vượt trội, mang đến trải nghiệm tốt nhất cho khách hàng.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
