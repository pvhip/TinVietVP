import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductHoatDong, fetchProductWithNewDate } from "../../Actions/ProductActions";
import { fetchListProductCategory } from "../../Actions/ProductCategoryActions";
import { Link, useNavigate } from "react-router-dom";
import { getProductImage } from "../../Components/Client/ImageGallery";
import mayPhotocopyBanner from "../../Assets/Client/Images/may_photocopy_banner.jpg";
import mayin01 from "../../Assets/Client/Images/mayin_01.jpg";
import mayin02 from "../../Assets/Client/Images/mayin_02.jpg";
import mayscan01 from "../../Assets/Client/Images/mayscan_01.jpg";
import mayphoto01 from "../../Assets/Client/Images/mayphoto_01.jpg";
// Import tất cả ảnh từ Assets/Client/Images
import bgHero from "../../Assets/Client/Images/bg-hero.jpg";
import defaultAvatar from "../../Assets/Client/Images/default-avatar.png";
import facebook from "../../Assets/Client/Images/facebook.png";
import google from "../../Assets/Client/Images/google.png";
import logo from "../../Assets/Client/Images/logo.png";
import mayhuygiay04 from "../../Assets/Client/Images/mayhuygiay_04.jpg";
import mayin03 from "../../Assets/Client/Images/mayin_03.jpg";
import mayin04 from "../../Assets/Client/Images/mayin_04.jpg";
import mayphotocopy03 from "../../Assets/Client/Images/mayphotocopy_03.png";
import mayphotocopy04 from "../../Assets/Client/Images/mayphotocopy_04.png";
import maytinh03 from "../../Assets/Client/Images/maytinh_03.jpg";
import ssd01 from "../../Assets/Client/Images/SSD_01.jpg";
import ssd from "../../Assets/Client/Images/SSD.jpg";
import threeDot from "../../Assets/Client/Images/three-dot.gif";
import unidecode from "unidecode";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add useNavigate hook
  const productState = useSelector((state) => state.product);
  const productCategoryState = useSelector((state) => state.product_category);

  useEffect(() => {
    dispatch(fetchProductWithNewDate());
    dispatch(fetchListProductCategory());
  }, [dispatch]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Đảm bảo products là array trước khi slice
  const products = Array.isArray(productState.product) ? productState.product.slice(0, 8) : [];

  // Function to create slug from product name
  const createSlug = (name) => {
    return unidecode(name)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  // Function to handle click and navigate to product detail page
  const handleProductClick = (name) => {
    const slug = createSlug(name);
    navigate(`/product-detail/${slug}.html`);
  };

  // Function để lấy ảnh cụ thể cho từng sản phẩm dựa trên ID
  const getProductImageById = (productId) => {
    // Mapping ảnh cho từng sản phẩm theo ID
    const imageMap = {
      1: mayin01,        // Máy in Epson EcoTank L3250
      2: mayin02,        // Máy in Brother HL-L1210W
      3: mayin03,        // Mực in Epson 003 Đen
      4: mayin04,        // Mực in HP 12A
      5: mayhuygiay04,   // Máy hủy giấy Silicon PS-632C
      6: mayhuygiay04,   // Máy hủy giấy Roco RC-2210
      7: maytinh03,      // Máy tính bàn Gaming VN G1
      8: maytinh03,      // Máy tính bàn HP ProDesk 400 G6
      9: mayphotocopy03, // Máy photocopy Ricoh MP 2014AD
      10: mayphotocopy04, // Máy photocopy Canon IR-ADV 4035
      11: ssd01,         // Ram 16GB DDR4
      12: ssd,           // SSD NVMe 512GB
    };
    
    // Nếu có ảnh trong map, trả về ảnh đó
    if (imageMap[productId]) {
      return imageMap[productId];
    }
    
    // Nếu không có, dùng function getProductImage như cũ
    return null;
  };

  return (
    <div>
      <div 
        className="container-fluid p-0 py-5 bg-dark hero-header mb-5"
        style={{
          backgroundImage: `url(${mayPhotocopyBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'none',
          animation: 'none',
          transition: 'none',
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
        <div className="container my-5 py-5" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="display-6 text-white animated slideInLeft">
                NHỮNG SẢN PHẨM TỐT NHẤT SẴN SÀN PHỤC VỤ BẠN
              </h1>
              <p className="text-white animated slideInLeft mb-4 pb-2">
                Với những trang thiết bị văn phòng hiện đại và đội ngũ tư vấn
                chuyên nghiệp, chúng tôi cam kết mang đến cho bạn trải nghiệm
                mua sắm tuyệt vời nhất.
              </p>
              <Link
                to="/booking"
                className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft"
              >
                Đặt hàng ngay
              </Link>
            </div>
            <div className="col-lg-6 text-center text-lg-end overflow-hidden">
              <img 
                className="img-fluid" 
                src={mayin01} 
                alt="Hero"
                style={{
                  transform: 'none',
                  animation: 'none',
                  transition: 'none'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4">
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp d-flex"
              data-wow-delay="0.1s"
            >
              <div className="service-item rounded pt-3 h-100 w-100">
                <div className="p-4">
                  <i className="fa fa-3x fa-award text-primary mb-4"></i>
                  <h5>Sản phẩm hàng đầu </h5>
                  <p>
                    Sản phẩm của chúng tôi với{" "}
                    <strong>hơn 5 năm được lưu hành trên thị trường</strong>, sẽ luôn mang đến cho
                    quý khách những thiết bị hoàn hảo và chất lượng.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp d-flex"
              data-wow-delay="0.3s"
            >
              <div className="service-item rounded pt-3 h-100 w-100">
                <div className="p-4">
                  <i className="fa fa-3x fa-print text-primary mb-4"></i>
                  <h5>Thiết bị tốt nhất</h5>
                  <p>
                    Mỗi thiết bị tại công ty đều được nhập khẩu từ những{" "}
                    <strong>nhãn hàng uy tín và có tiếng</strong>, đảm bảo chất lượng.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp d-flex"
              data-wow-delay="0.5s"
            >
              <div className="service-item rounded pt-3 h-100 w-100">
                <div className="p-4">
                  <i className="fa fa-3x fa-shopping-cart text-primary mb-4"></i>
                  <h5>Đặt hàng dễ dàng, nhanh chóng</h5>
                  <p>
                    Đặt hàng <strong>dễ dàng chỉ với vài cú click</strong>. Sản phẩm
                     sẽ nhanh chóng được vận chuyển đến tận nơi cho bạn.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp d-flex"
              data-wow-delay="0.7s"
            >
              <div className="service-item rounded pt-3 h-100 w-100">
                <div className="p-4">
                  <i className="fa fa-3x fa-headset text-primary mb-4"></i>
                  <h5>Phục vụ tận tình, xuyên suốt 24/7</h5>
                  <p>
                    Chúng tôi luôn sẵn sàng phục vụ quý khách
                    <strong> 24/7</strong>. Liên hệ ngay để được tư vấn dịch vụ
                    sản phẩm và đặt hàng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-100 wow zoomIn"
                    data-wow-delay="0.1s"
                    src={mayin01}
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.3s"
                    src={mayin02}
                    style={{ marginBottom: "25%" }}
                  />
                </div>
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.5s"
                    src={mayscan01}
                  />
                </div>
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-100 wow zoomIn"
                    data-wow-delay="0.7s"
                    src={mayphoto01}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h5 className="section-title ff-secondary text-start text-primary fw-normal">
                Giới thiệu
              </h5>
              <h1 className="mb-4">CHÀO MỪNG ĐẾN VỚI</h1>
              <h1 className="mb-4">
                <img
                  src={logo}
                  alt="Logo Tin Việt"
                  width={50}
                  style={{ marginBottom: "20px" }}
                />{" "}
                <span className="ff-secondary fw-normal text-start text-primary m-0">
                  Công ty TNHH Tin Việt
                </span>
              </h1>
              <p className="mb-4">
                Công ty Tin Việt - địa chỉ tin cậy cho mọi nhu cầu về thiết bị
              </p>
              <p className="mb-4">
                Với hơn 5 năm kinh nghiệm trong lĩnh vực bán trang thiết bị văn phòng, Tin Việt tự
                hào mang đến cho thực khách những thiết bị chất lượng. Các sản phẩm của chúng tôi luôn được kiểm duyệt. 
                Đảm bảo mang đến sự hài lòng và trải nghiệm tốt nhất cho khách hàng.
              </p>
              <div className="row g-4 mb-4">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                    <h1
                      className="flex-shrink-0 display-5 text-primary mb-0"
                      data-toggle="counter-up"
                    >
                      {">"}5
                    </h1>
                    <div className="ps-4">
                      <p className="mb-0">Năm</p>
                      <h6 className="text-uppercase mb-0">Kinh Nghiệm</h6>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                    <h1
                      className="flex-shrink-0 display-5 text-primary mb-0"
                      data-toggle="counter-up"
                    >
                      1000
                    </h1>
                    <div className="ps-4">
                      <p className="mb-0">Sản phẩm</p>
                      <h6 className="text-uppercase mb-0">
                         Được Bán
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <Link className="btn btn-primary py-3 px-5 mt-2" to="/about">
                Xem thêm tại đây
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Công ty Tin Việt
            </h5>
            <h1 className="mb-5">Sản phẩm mới</h1>
          </div>
          <div
            className="tab-class text-center wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row" style={{ rowGap: "20px" }}>
                  {products.map((product) => (
                    <div className="col-lg-6" key={product.id}>
                      <div
                        className="d-flex align-items-center"
                        onClick={() => handleProductClick(product.name)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          className="flex-shrink-0 img-fluid rounded"
                          src={getProductImageById(product.id) || getProductImage(product, productCategoryState.product_category || [])}
                          alt={product.name}
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                          onError={(e) => {
                            // Nếu ảnh lỗi, dùng ảnh mặc định
                            if (e.target.src !== mayin01) {
                              e.target.src = mayin01;
                            }
                          }}
                        />
                        {(() => {
                          const price = product.price || product.monthly_price || 0;
                          const salePrice = product.sale_price || 0;
                          const finalPrice = salePrice > 0 ? price - salePrice : price;
                          
                          return salePrice > 0 ? (
                          <div className="w-100 d-flex flex-column text-start ps-4">
                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                              <span>{product.name}</span>
                              <span
                                className="text-primary"
                                  style={{ fontSize: "1rem", fontWeight: "bold" }}
                              >
                                  {formatPrice(finalPrice)}
                              </span>
                            </h5>
                            <div className="d-flex justify-content-end">
                              <span
                                className="text-secondary text-decoration-line-through"
                                style={{ fontSize: "0.85rem" }}
                              >
                                  {formatPrice(price)}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-100 d-flex flex-column text-start ps-4">
                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                              <span>{product.name}</span>
                              <span
                                className="text-primary"
                                  style={{ fontSize: "1rem", fontWeight: "bold" }}
                              >
                                  {formatPrice(price)}
                              </span>
                            </h5>
                          </div>
                          );
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
