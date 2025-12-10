import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetailBySlug } from "../../Actions/ProductDetailActions";
import { fetchProduct } from "../../Actions/ProductActions";
import { fetchListProductCategory } from "../../Actions/ProductCategoryActions";
import { useParams, useNavigate } from "react-router-dom";
import unidecode from "unidecode";
import Spinner from "../../Components/Client/Spinner";
import { getProductImage } from "../../Components/Client/ImageGallery";
import mayPhotocopyBanner from "../../Assets/Client/Images/may_photocopy_banner.jpg";

const DetailProduct = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productDetailState = useSelector((state) => state.product_detail);
  const productState = useSelector((state) => state.product);
  const productCategoryState = useSelector((state) => state.product_category);
  
  const prevScrollY = useRef(0); // To store the previous scroll position
  
  useEffect(() => {
    dispatch(fetchProductDetailBySlug(slug));
    dispatch(fetchProduct());
    dispatch(fetchListProductCategory());
    prevScrollY.current = window.scrollY; // Save the current scroll position
  }, [dispatch, slug]);

  useEffect(() => {
    window.scrollTo(0, prevScrollY.current); // Restore the previous scroll position
  }, [slug]); // When slug changes, scroll to the previous position

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

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
    navigate(`/product-detail/${slug}.html`, { replace: true });
  };

  const relatedProducts = productState.product.filter(
    (product) =>
      product.categories_id ===
        productDetailState.productDetail?.categories_id &&
      product.id !== productDetailState.productDetail?.id &&
      product.status === 1
  );

  const featuredProducts = productState.product
    .filter((product) => product.status === 1)
    .sort(() => Math.random() - 0.5);

  const randomFeaturedProducts = featuredProducts.slice(0, 4);

  if (productDetailState.loading) {
    return <Spinner />; // Hiển thị spinner nếu đang tải dữ liệu
  }

  // Kiểm tra nếu không có sản phẩm hoặc có lỗi
  if (productDetailState.error || !productDetailState.productDetail) {
    return (
      <>
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
            <h1 className="display-3 text-white mb-3 animated slideInDown">
              Chi Tiết Sản Phẩm
            </h1>
          </div>
        </div>
        <div className="container-fluid py-5 mt-5">
          <div className="container py-5 text-center">
            <h3 className="text-danger">Không tìm thấy sản phẩm</h3>
            <p className="text-muted">{productDetailState.error || 'Sản phẩm không tồn tại'}</p>
            <a href="/menu" className="btn btn-primary mt-3">Quay lại danh sách sản phẩm</a>
          </div>
        </div>
      </>
    );
  }

  const product = productDetailState.productDetail;
  const price = product.price || product.monthly_price || 0;
  const salePrice = product.sale_price || 0;
  const finalPrice = salePrice > 0 ? price - salePrice : price;

  return (
    <>
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
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            Chi Tiết Sản Phẩm
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item">
                <a href="/">Trang chủ</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/menu">Sản phẩm</a>
              </li>
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                {product.name || 'Chi Tiết Sản Phẩm'}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-fluid py-5 mt-5">
        <div className="container py-5">
          <div className="product-detail-box row g-4 mb-5">
            <div className="col-lg-8 col-xl-9">
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="product-image">
                    <img
                      src={getProductImage(product, productCategoryState.product_category || [])}
                      className="img-fluid rounded"
                      alt={product.name}
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="product-info">
                    <h2 className="product-title mb-4" style={{ color: '#333', fontWeight: 'bold' }}>
                      {product.name || 'Tên sản phẩm'}
                    </h2>
                    {product.brand && (
                      <p className="text-muted mb-3">
                        <strong>Thương hiệu:</strong> {product.brand}
                      </p>
                    )}
                    <div className="mb-4">
                      {salePrice > 0 ? (
                        <>
                          <h3 className="text-primary mb-2" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                            {formatPrice(finalPrice)}
                          </h3>
                          <p className="text-danger text-decoration-line-through mb-0" style={{ fontSize: '1.2rem' }}>
                            {formatPrice(price)}
                          </p>
                          <span className="badge bg-danger ms-2">
                            Giảm {Math.round((salePrice / price) * 100)}%
                          </span>
                        </>
                      ) : (
                        <h3 className="text-primary mb-0" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                          {formatPrice(price)}
                        </h3>
                      )}
                    </div>
                    {product.stock !== undefined && (
                      <p className="mb-3">
                        <strong>Tình trạng:</strong>{' '}
                        <span className={product.stock > 0 ? 'text-success' : 'text-danger'}>
                          {product.stock > 0 ? `Còn hàng (${product.stock} sản phẩm)` : 'Hết hàng'}
                        </span>
                      </p>
                    )}
                    <a href="/booking">
                      <button className="btn btn-primary btn-lg px-5 py-3 mt-3">
                        Đặt hàng ngay
                      </button>
</a>
                  </div>
                </div>
                <div className="col-lg-12">
                  <nav>
                    <div className="nav nav-tabs mb-3">
                      <button
                        className="nav-link active border-white border-bottom-0"
                        type="button"
                        role="tab"
                        id="nav-about-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-about"
                        aria-controls="nav-about"
                        aria-selected="true"
                      >
                        Mô tả
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content mb-5">
                    <div
                      className="tab-pane active"
                      id="nav-about"
                      role="tabpanel"
                      aria-labelledby="nav-about-tab"
                    >
                      <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                        {product.description || 'Chưa có mô tả cho sản phẩm này.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xl-3">
              <div className="row g-4">
                <div className="col-lg-12">
                  <h4 className="mb-4">Sản phẩm nổi bật</h4>
                  {randomFeaturedProducts.map((product) => (
                    <div
                      className="d-flex align-items-center justify-content-start mb-4"
                      key={product.id}
                      onClick={() => handleProductClick(product.name)}
                      style={{ cursor: "pointer" }}
                    >
                      <div
                        className="rounded"
                        style={{ width: "100px", height: "100px" }}
                      >
                        <img
                          src={getProductImage(product, productCategoryState.product_category || [])}
                          className="img-fluid rounded"
                          alt={product.name}
                        />
                      </div>
                      <div className="ms-3">
                        <h6 className="mb-2">{product.name}</h6>
                        <div className="d-flex mb-2">
                          <h5 className="fw-bold me-2 text-primary">
                            {formatPrice(
                              (product.price || product.monthly_price || 0) - (product.sale_price || 0)
                            )}
                          </h5>
                          {product.sale_price > 0 && (
                            <span className="text-muted text-decoration-line-through" style={{ fontSize: '0.9rem' }}>
                              {formatPrice(product.price || product.monthly_price || 0)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-center my-4">
                    <a
                      href="/menu"
                      className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100"
                    >
                      Xem thêm
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="fw-bold mb-4">Sản phẩm liên quan</h1>
          <div className="related-products">
            {relatedProducts.map((product) => (
              <div
                className="related-product-item"
                key={product.id}
                onClick={() => handleProductClick(product.name)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={product.image}
                  className="img-fluid rounded-top"
                  alt={product.name}
                />
                <div className="p-3">
                  <h4>{product.name}</h4>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-primary fs-5 fw-bold mb-0">
                        {formatPrice((product.price || product.monthly_price || 0) - (product.sale_price || 0))}
                    </p>
                      {product.sale_price > 0 && (
                        <p className="text-muted text-decoration-line-through mb-0" style={{ fontSize: '0.9rem' }}>
                          {formatPrice(product.price || product.monthly_price || 0)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
