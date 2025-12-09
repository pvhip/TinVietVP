import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListProductCategory } from '../../Actions/ProductCategoryActions';
import http from '../../Utils/Http';
import AdminConfig from '../../Config/Admin';
import './Categories.css';

export default function Categories() {
    const dispatch = useDispatch();
    const categoryState = useSelector((state) => state.product_category);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({ name: '', slug: '', parent_id: null });

    useEffect(() => {
        dispatch(fetchListProductCategory());
    }, [dispatch]);

    const filteredCategories = categoryState.product_category.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await http.put(`${AdminConfig.APIs.API_DATA.categories}/${editingCategory.id}`, formData);
            } else {
                await http.post(AdminConfig.APIs.API_DATA.categories, formData);
            }
            dispatch(fetchListProductCategory());
            setShowModal(false);
            setFormData({ name: '', slug: '', parent_id: null });
            setEditingCategory(null);
        } catch (error) {
            console.error('Error saving category:', error);
            alert('Có lỗi xảy ra');
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            slug: category.slug || '',
            parent_id: category.parent_id || null
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
            try {
                await http.delete(`${AdminConfig.APIs.API_DATA.categories}/${id}`);
                dispatch(fetchListProductCategory());
            } catch (error) {
                console.error('Error deleting category:', error);
                alert('Có lỗi xảy ra khi xóa danh mục');
            }
        }
    };

    return (
        <div className="admin-categories">
            <div className="page-header">
                <h2>Quản lý danh mục</h2>
                <button className="btn-primary" onClick={() => {
                    setEditingCategory(null);
                    setFormData({ name: '', slug: '', parent_id: null });
                    setShowModal(true);
                }}>
                    <i className="fas fa-plus"></i> Thêm danh mục
                </button>
            </div>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Tìm kiếm danh mục..."
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
                            <th>Tên danh mục</th>
                            <th>Slug</th>
                            <th>Danh mục cha</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.slug || '-'}</td>
                                <td>
                                    {category.parent_id 
                                        ? filteredCategories.find(c => c.id === category.parent_id)?.name || '-'
                                        : '-'
                                    }
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            className="btn-edit"
                                            onClick={() => handleEdit(category)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button 
                                            className="btn-delete"
                                            onClick={() => handleDelete(category.id)}
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

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>{editingCategory ? 'Chỉnh sửa' : 'Thêm mới'} danh mục</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Tên danh mục *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="Tự động tạo nếu để trống"
                                />
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                                    Hủy
                                </button>
                                <button type="submit" className="btn-primary">
                                    {editingCategory ? 'Cập nhật' : 'Thêm mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

