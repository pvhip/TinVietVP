import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu } from '../../Actions/ProductActions';
import http from '../../Utils/Http';
import AdminConfig from '../../Config/Admin';
import './Products.css';

export default function Products() {
    const dispatch = useDispatch();
    const productState = useSelector((state) => state.product);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const productsPerPage = 10;

    useEffect(() => {
        dispatch(fetchMenu());
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
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await http.delete(`${AdminConfig.APIs.API_DATA.products}/${id}`);
                dispatch(fetchMenu());
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Có lỗi xảy ra khi xóa sản phẩm');
            }
        }
    };

    return (
        <div className="admin-products">
            <div className="page-header">
                <h2>Quản lý sản phẩm</h2>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
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
        </div>
    );
}

