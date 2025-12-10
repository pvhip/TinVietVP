import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListProductCategory,
  fetchProductCategoryHoatDong,
} from "../../Actions/ProductCategoryActions";
import {
  fetchMenu,
  fetchProductHoatDong,
} from "../../Actions/ProductActions";
import unidecode from "unidecode";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../Components/Client/Spinner";
import Pagination from '@mui/material/Pagination';
import { TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel, Box, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { getProductImage } from "../../Components/Client/ImageGallery";
import mayPhotocopyBanner from "../../Assets/Client/Images/may_photocopy_banner.jpg";
import mayin01 from "../../Assets/Client/Images/mayin_01.jpg";
// Import tất cả ảnh từ Assets/Client/Images
import bgHero from "../../Assets/Client/Images/bg-hero.jpg";
import defaultAvatar from "../../Assets/Client/Images/default-avatar.png";
import facebook from "../../Assets/Client/Images/facebook.png";
import google from "../../Assets/Client/Images/google.png";
import logo from "../../Assets/Client/Images/logo.png";
import mayhuygiay04 from "../../Assets/Client/Images/mayhuygiay_04.jpg";
import mayin02 from "../../Assets/Client/Images/mayin_02.jpg";
import mayin03 from "../../Assets/Client/Images/mayin_03.jpg";
import mayin04 from "../../Assets/Client/Images/mayin_04.jpg";
import mayphoto01 from "../../Assets/Client/Images/mayphoto_01.jpg";
import mayphotocopy03 from "../../Assets/Client/Images/mayphotocopy_03.png";
import mayphotocopy04 from "../../Assets/Client/Images/mayphotocopy_04.png";
import mayscan01 from "../../Assets/Client/Images/mayscan_01.jpg";
import maytinh03 from "../../Assets/Client/Images/maytinh_03.jpg";
import ssd01 from "../../Assets/Client/Images/SSD_01.jpg";
import ssd from "../../Assets/Client/Images/SSD.jpg";
import threeDot from "../../Assets/Client/Images/three-dot.gif";
import './Products.css';

export default function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productCategoryState = useSelector((state) => state.product_category);
  const productState = useSelector((state) => state.product);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const productsPerPage = 12;

  useEffect(() => {
    console.log('🔄 Fetching product categories and menu...');
    dispatch(fetchListProductCategory());
    dispatch(fetchMenu());
  }, [dispatch]);

  // Debug: Log state changes
  useEffect(() => {
    console.log('📊 Product State:', {
      loading: productState.loading,
      productCount: productState.product?.length || 0,
      error: productState.error,
      products: productState.product
    });
  }, [productState]);

  useEffect(() => {
    console.log('📂 Category State:', {
      loading: productCategoryState.loading,
      categoryCount: productCategoryState.product_category?.length || 0,
      categories: productCategoryState.product_category
    });
  }, [productCategoryState]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
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

  // Hàm tạo slug từ tên sản phẩm
  const createSlug = (name) => {
    return unidecode(name) // Chuyển đổi ký tự tiếng Việt thành ký tự không dấu
      .toLowerCase() // Chuyển thành chữ thường
      .replace(/[^a-z0-9]/g, "-") // Thay thế ký tự không phải chữ cái hoặc số bằng dấu -
      .replace(/-+/g, "-") // Thay thế nhiều dấu - bằng 1 dấu -
      .replace(/^-+/, "") // Xóa dấu - ở đầu chuỗi
      .replace(/-+$/, ""); // Xóa dấu - ở cuối chuỗi
  };


  const handleProductClick = useCallback((name) => {
    const slug = createSlug(name);
    navigate(`/product-detail/${slug}.html`);
  }, [navigate]);

  const handleCategoryClick = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  }, []);

  // Filter và sort products - Memoized
  const filteredProducts = useMemo(() => {
    let filtered = selectedCategory
      ? productState.product.filter((product) => product.categories_id === selectedCategory)
      : productState.product;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return (a.price || a.monthly_price || 0) - (b.price || b.monthly_price || 0);
        case "price-high":
          return (b.price || b.monthly_price || 0) - (a.price || a.monthly_price || 0);
        default:
          return 0;
      }
    });

    // Loại bỏ sản phẩm "lươn" nếu có
    filtered = filtered.filter((product) => {
      const name = (product.name || '').toLowerCase();
      return !name.includes('lươn') && !name.includes('luon');
    });

    return filtered;
  }, [selectedCategory, searchTerm, sortBy, productState.product]);

  // Memoize pagination calculations
  const { currentProducts, totalPages } = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const current = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const total = Math.ceil(filteredProducts.length / productsPerPage);
    return { currentProducts: current, totalPages: total };
  }, [filteredProducts, currentPage, productsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div>
      {/* Tiêu đề */}
      <div 
        className="py-5 bg-dark hero-header mb-3"
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
            Sản phẩm
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item">
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="breadcrumb-item text-white active" aria-current="page">
                Sản phẩm
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-fluid py-4 products-container">
        <div className="row">
          {/* Sidebar - Categories */}
          <div className="col-lg-3 col-md-4 mb-4">
            <div className="category-sidebar">
              <h4 className="mb-4" style={{ 
                fontWeight: 'bold', 
                color: '#FEA100',
                fontSize: '1.5rem',
                borderBottom: '2px solid #FEA100',
                paddingBottom: '12px'
              }}>
                <i className="fas fa-th-large me-2"></i>
                Danh mục
              </h4>
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <div
                  onClick={() => handleCategoryClick(null)}
                  className={`category-item ${selectedCategory === null ? 'active' : ''}`}
                  style={{
                    backgroundColor: selectedCategory === null ? '#FEA100' : '#f8f9fa',
                    color: selectedCategory === null ? '#fff' : '#333',
                    fontWeight: selectedCategory === null ? '600' : '500',
                  }}
                >
                  <i className="fas fa-list me-2"></i>
                  <span>Tất cả sản phẩm</span>
                  {selectedCategory === null && (
                    <Chip 
                      label={productState.product.length} 
                      size="small" 
                      style={{ 
                        marginLeft: 'auto', 
                        backgroundColor: '#fff', 
                        color: '#FEA100',
                        fontWeight: 'bold'
                      }} 
                    />
                  )}
                </div>
                {productCategoryState.product_category.map((item) => {
                  const count = productState.product.filter(p => p.categories_id === item.id).length;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleCategoryClick(item.id)}
                      className={`category-item ${selectedCategory === item.id ? 'active' : ''}`}
                      style={{
                        backgroundColor: selectedCategory === item.id ? '#FEA100' : '#f8f9fa',
                        color: selectedCategory === item.id ? '#fff' : '#333',
                        fontWeight: selectedCategory === item.id ? '600' : '500',
                      }}
                    >
                      <i className="fas fa-folder me-2"></i>
                      <span>{item.name}</span>
                      {selectedCategory === item.id && (
                        <Chip 
                          label={count} 
                          size="small" 
                          style={{ 
                            marginLeft: 'auto', 
                            backgroundColor: '#fff', 
                            color: '#FEA100',
                            fontWeight: 'bold'
                          }} 
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9 col-md-8">
            {/* Search and Filter Bar */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div className="row g-3 align-items-center">
                <div className="col-md-6">
                  <TextField
                    fullWidth
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon style={{ color: '#FEA100' }} />
                        </InputAdornment>
                      ),
                    }}
                    style={{ backgroundColor: '#f8f9fa' }}
                  />
                </div>
                <div className="col-md-3">
                  <FormControl fullWidth>
                    <InputLabel>Sắp xếp</InputLabel>
                    <Select
                      value={sortBy}
                      label="Sắp xếp"
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <MenuItem value="name">Tên A-Z</MenuItem>
                      <MenuItem value="price-low">Giá: Thấp → Cao</MenuItem>
                      <MenuItem value="price-high">Giá: Cao → Thấp</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-3 d-flex gap-2">
                  <Box sx={{ flex: 1, display: 'flex', gap: 1 }}>
                    <button
                      onClick={() => setViewMode('grid')}
                      style={{
                        flex: 1,
                        padding: '10px',
                        border: viewMode === 'grid' ? '2px solid #FEA100' : '1px solid #ddd',
                        backgroundColor: viewMode === 'grid' ? '#FEA100' : '#fff',
                        color: viewMode === 'grid' ? '#fff' : '#333',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      <GridViewIcon />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      style={{
                        flex: 1,
                        padding: '10px',
                        border: viewMode === 'list' ? '2px solid #FEA100' : '1px solid #ddd',
                        backgroundColor: viewMode === 'list' ? '#FEA100' : '#fff',
                        color: viewMode === 'list' ? '#fff' : '#333',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      <ViewListIcon />
                    </button>
                  </Box>
                </div>
              </div>
              {searchTerm && (
                <div className="mt-3">
                  <Chip
                    label={`Tìm thấy ${filteredProducts.length} sản phẩm cho "${searchTerm}"`}
                    onDelete={() => setSearchTerm("")}
                    style={{ backgroundColor: '#FEA100', color: '#fff' }}
                  />
                </div>
              )}
            </div>

            {/* Loading */}
            {(productState.loading || productCategoryState.loading) && (
              <div className="text-center py-5">
                <Spinner />
              </div>
            )}

            {/* Error */}
            {(productState.error || productCategoryState.error) && (
              <div className="alert alert-danger" role="alert">
                <i className="fas fa-exclamation-circle me-2"></i>
                Lỗi: {productState.error || productCategoryState.error}
              </div>
            )}

            {/* Products Display */}
            {!productState.loading && !productCategoryState.loading && (
              <>
                {currentProducts.length === 0 ? (
                  <div className="text-center py-5" style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '60px 20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <i className="fas fa-box-open" style={{ fontSize: '4rem', color: '#ddd', marginBottom: '20px' }}></i>
                    <h4 style={{ color: '#666', marginBottom: '10px' }}>Không tìm thấy sản phẩm</h4>
                    <p style={{ color: '#999' }}>Vui lòng thử lại với từ khóa khác hoặc chọn danh mục khác</p>
                  </div>
                ) : (
                  <>
                    {/* Category Title */}
                    {selectedCategory && (
                      <div className="mb-4">
                        <h2 style={{ 
                          color: '#333', 
                          fontWeight: 'bold',
                          borderLeft: '4px solid #FEA100',
                          paddingLeft: '16px'
                        }}>
                          {productCategoryState.product_category.find(cat => cat.id === selectedCategory)?.name}
                        </h2>
                        <p style={{ color: '#666', marginTop: '8px' }}>
                          Hiển thị {currentProducts.length} / {filteredProducts.length} sản phẩm
                        </p>
                      </div>
                    )}

                    {/* Grid View */}
                    {viewMode === 'grid' ? (
                      <div className="row g-4">
                        {currentProducts.map((product) => {
                          const price = product.price || product.monthly_price || 0;
                          const salePrice = product.sale_price || 0;
                          const finalPrice = salePrice > 0 ? price - salePrice : price;
                          
                          return (
                            <div className="col-lg-4 col-md-6" key={product.id}>
                              <div
                                onClick={() => handleProductClick(product.name)}
                                className="product-card"
                              >
                                <div className="product-image-container">
                                  <img
                                    src={getProductImageById(product.id) || getProductImage(product, productCategoryState.product_category)}
                                    alt={product.name}
                                    loading="lazy"
                                    className={`product-image product-image-${product.id}`}
                                    data-product-id={product.id}
                                    style={{
                                      // Có thể thêm style động dựa trên product.id nếu cần
                                      objectFit: 'cover',
                                      width: '100%',
                                      height: '100%'
                                    }}
                                    onError={(e) => {
                                      // Nếu ảnh lỗi, dùng ảnh mặc định
                                      if (e.target.src !== mayin01) {
                                        e.target.src = mayin01;
                                      }
                                    }}
                                  />
                                  {salePrice > 0 && (
                                    <div style={{
                                      position: 'absolute',
                                      top: '12px',
                                      right: '12px',
                                      backgroundColor: '#ff4444',
                                      color: '#fff',
                                      padding: '6px 12px',
                                      borderRadius: '20px',
                                      fontSize: '0.85rem',
                                      fontWeight: 'bold'
                                    }}>
                                      -{Math.round((salePrice / price) * 100)}%
                                    </div>
                                  )}
                                </div>
                                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                  <h5 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '12px',
                                    minHeight: '50px',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                  }}>
                                    {product.name}
                                  </h5>
                                  {product.description && (
                                    <p style={{
                                      fontSize: '0.9rem',
                                      color: '#666',
                                      marginBottom: '16px',
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden',
                                      flex: 1
                                    }}>
                                      {product.description}
                                    </p>
                                  )}
                                  <div style={{ marginTop: 'auto' }}>
                                    {salePrice > 0 ? (
                                      <div>
                                        <div style={{
                                          fontSize: '1.3rem',
                                          fontWeight: 'bold',
                                          color: '#FEA100',
                                          marginBottom: '4px'
                                        }}>
                                          {formatPrice(finalPrice)}
                                        </div>
                                        <div style={{
                                          fontSize: '0.9rem',
                                          color: '#999',
                                          textDecoration: 'line-through'
                                        }}>
                                          {formatPrice(price)}
                                        </div>
                                      </div>
                                    ) : (
                                      <div style={{
                                        fontSize: '1.3rem',
                                        fontWeight: 'bold',
                                        color: '#FEA100'
                                      }}>
                                        {formatPrice(price)}
                                      </div>
                                    )}
                                  </div>
                                  <button
                                    className="product-button"
                                  >
                                    Xem chi tiết
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      /* List View */
                      <div className="row g-3">
                        {currentProducts.map((product) => {
                          const price = product.price || product.monthly_price || 0;
                          const salePrice = product.sale_price || 0;
                          const finalPrice = salePrice > 0 ? price - salePrice : price;
                          
                          return (
                            <div className="col-12" key={product.id}>
                              <div
                                onClick={() => handleProductClick(product.name)}
                                className="product-card-list"
                              >
                                <img
                                  src={getProductImageById(product.id) || getProductImage(product, productCategoryState.product_category)}
                                  alt={product.name}
                                  loading="lazy"
                                  className={`product-image-list product-image-list-${product.id}`}
                                  data-product-id={product.id}
                                  style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%'
                                  }}
                                  onError={(e) => {
                                    // Nếu ảnh lỗi, dùng ảnh mặc định
                                    if (e.target.src !== mayin01) {
                                      e.target.src = mayin01;
                                    }
                                  }}
                                />
                                <div style={{ flex: 1 }}>
                                  <h5 style={{
                                    fontSize: '1.2rem',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '8px'
                                  }}>
                                    {product.name}
                                  </h5>
                                  {product.description && (
                                    <p style={{
                                      fontSize: '0.95rem',
                                      color: '#666',
                                      marginBottom: '12px',
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden'
                                    }}>
                                      {product.description}
                                    </p>
                                  )}
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                      {salePrice > 0 ? (
                                        <div>
                                          <span style={{
                                            fontSize: '1.4rem',
                                            fontWeight: 'bold',
                                            color: '#FEA100',
                                            marginRight: '12px'
                                          }}>
                                            {formatPrice(finalPrice)}
                                          </span>
                                          <span style={{
                                            fontSize: '1rem',
                                            color: '#999',
                                            textDecoration: 'line-through'
                                          }}>
                                            {formatPrice(price)}
                                          </span>
                                        </div>
                                      ) : (
                                        <span style={{
                                          fontSize: '1.4rem',
                                          fontWeight: 'bold',
                                          color: '#FEA100'
                                        }}>
                                          {formatPrice(price)}
                                        </span>
                                      )}
                                    </div>
                                    <button
                                      className="product-button"
                                      style={{
                                        width: 'auto',
                                        padding: '10px 24px',
                                        marginTop: 0
                                      }}
                                    >
                                      Xem chi tiết
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {/* Pagination */}
            {!productState.loading && totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center mt-5 mb-4">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, value) => {
                    setCurrentPage(value);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontSize: '1rem',
                      '&.Mui-selected': {
                        backgroundColor: '#FEA100',
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: '#ffb300',
                        }
                      }
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
