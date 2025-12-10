import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu } from '../../Actions/ProductActions';
import { fetchListProductCategory } from '../../Actions/ProductCategoryActions';
import http from '../../Utils/Http';
import AdminConfig from '../../Config/Admin';
import './Products.css';

export default function Products() {
    const dispatch = useDispatch();
    const productState = useSelector((state) => state.product);
    const categoryState = useSelector((state) => state.product_category);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        sku: '',
        name: '',
        description: '',
        brand: '',
        monthly_price: '',
        deposit_required: '',
        stock: '',
        status: 1,
        category_id: ''
    });
    const [loading, setLoading] = useState(false);
    const productsPerPage = 10;

    useEffect(() => {
        dispatch(fetchMenu());
        dispatch(fetchListProductCategory());
    }, [dispatch]);

    const filteredProducts = productState.product.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            sku: product.sku || product.product_code || '',
            name: product.name || '',
            description: product.description || '',
            brand: product.brand || '',
            monthly_price: product.monthly_price || product.price || '',
            deposit_required: product.deposit_required || '',
            stock: product.stock || '',
            status: product.status === 1 || product.status === 'active' ? 1 : 0,
            category_id: product.categories_id || ''
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingProduct) {
                // Cập nhật sản phẩm
                await http.put(`${AdminConfig.APIs.API_DATA.products}/${editingProduct.id}`, formData);
            } else {
                // Thêm sản phẩm mới
                await http.post(AdminConfig.APIs.API_DATA.products, formData);
            }
            dispatch(fetchMenu());
            setShowModal(false);
            setEditingProduct(null);
            setFormData({
                sku: '',
                name: '',
                description: '',
                brand: '',
                monthly_price: '',
                deposit_required: '',
                stock: '',
                status: 1,
                category_id: ''
            });
            alert(editingProduct ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!');
        } catch (error) {
            console.error('Error saving product:', error);
            const errorMessage = error.response?.data?.error || error.message || 'Có lỗi xảy ra';
            alert(`Lỗi: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await http.delete(`${AdminConfig.APIs.API_DATA.products}/${id}`);
                dispatch(fetchMenu());
                alert('Xóa sản phẩm thành công!');
            } catch (error) {
                console.error('Error deleting product:', error);
                const errorMessage = error.response?.data?.error || error.message || 'Có lỗi xảy ra';
                alert(`Lỗi khi xóa sản phẩm: ${errorMessage}`);
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        setFormData({
            sku: '',
            name: '',
            description: '',
            brand: '',
            monthly_price: '',
            deposit_required: '',
            stock: '',
            status: 1,
            category_id: ''
        });
    };

    return (
        <div className="admin-products">
            <div className="page-header">
                <h2>Quản lý sản phẩm</h2>
                <button className="btn-primary" onClick={() => {
                    setEditingProduct(null);
                    setFormData({
                        sku: '',
                        name: '',
                        description: '',
                        brand: '',
                        monthly_price: '',
                        deposit_required: '',
                        stock: '',
                        status: 1,
                        category_id: ''
                    });
                    setShowModal(true);
                }}>
                    <i className="fas fa-plus"></i> Thêm sản phẩm
                </button>
            </div>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Thương hiệu</th>
                            <th>Giá</th>
                            <th>Tồn kho</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>
                                    <img 
                                        src={product.image || '/assets/default-product.jpg'} 
                                        alt={product.name}
                                        className="product-thumb"
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.brand || '-'}</td>
                                <td>{formatPrice(product.price || product.monthly_price || 0)}</td>
                                <td>{product.stock || 0}</td>
                                <td>
                                    <span className={`status-badge ${product.status === 1 ? 'active' : 'inactive'}`}>
                                        {product.status === 1 ? 'Hoạt động' : 'Ngừng'}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            className="btn-edit"
                                            onClick={() => handleEdit(product)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button 
                                            className="btn-delete"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Trước
                    </button>
                    <span>Trang {currentPage} / {totalPages}</span>
                    <button 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Sau
                    </button>
                </div>
            )}

            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>{editingProduct ? 'Chỉnh sửa' : 'Thêm mới'} sản phẩm</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>SKU *</label>
                                <input
                                    type="text"
                                    value={formData.sku}
                                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                    required
                                    placeholder="Mã sản phẩm"
                                />
                            </div>
                            <div className="form-group">
                                <label>Tên sản phẩm *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    placeholder="Nhập tên sản phẩm"
                                />
                            </div>
                            <div className="form-group">
                                <label>Mô tả</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows="3"
                                    placeholder="Nhập mô tả sản phẩm"
                                />
                            </div>
                            <div className="form-group">
                                <label>Thương hiệu</label>
                                <input
                                    type="text"
                                    value={formData.brand}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                    placeholder="Nhập thương hiệu"
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Giá thuê/tháng (VND) *</label>
                                    <input
                                        type="number"
                                        value={formData.monthly_price}
                                        onChange={(e) => setFormData({ ...formData, monthly_price: e.target.value })}
                                        required
                                        min="0"
                                        step="1000"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tiền đặt cọc (VND)</label>
                                    <input
                                        type="number"
                                        value={formData.deposit_required}
                                        onChange={(e) => setFormData({ ...formData, deposit_required: e.target.value })}
                                        min="0"
                                        step="1000"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Tồn kho *</label>
                                    <input
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        required
                                        min="0"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Trạng thái *</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: parseInt(e.target.value) })}
                                        required
                                    >
                                        <option value={1}>Hoạt động</option>
                                        <option value={0}>Ngừng</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Danh mục *</label>
                                <select
                                    value={formData.category_id}
                                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                    required
                                >
                                    <option value="">Chọn danh mục</option>
                                    {categoryState.product_category.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-actions">
                                <button 
                                    type="button" 
                                    className="btn-cancel" 
                                    onClick={handleCloseModal}
                                    disabled={loading}
                                >
                                    Hủy
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? 'Đang xử lý...' : (editingProduct ? 'Cập nhật' : 'Thêm mới')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

