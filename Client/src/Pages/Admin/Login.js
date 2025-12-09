import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../../Utils/Http';
import AdminConfig from '../../Config/Admin';
import './Login.css';

export default function AdminLogin() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await http.post(AdminConfig.APIs.API_DATA.auth + '/login', formData);
            
            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                // Check if user is admin
                if (response.data.user.role === 'admin') {
                    navigate(AdminConfig.routes.dashboard);
                } else {
                    setError('Bạn không có quyền truy cập trang admin');
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');
                }
            }
        } catch (error) {
            setError(error.response?.data?.error || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login">
            <div className="login-container">
                <div className="login-header">
                    <h1>Tin Việt Admin</h1>
                    <p>Đăng nhập vào hệ thống quản trị</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="error-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            placeholder="admin@tinvietvp.vn"
                        />
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            placeholder="Nhập mật khẩu"
                        />
                    </div>

                    <button type="submit" className="btn-login" disabled={loading}>
                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>

                <div className="login-footer">
                    <a href="/">← Về trang chủ</a>
                </div>
            </div>
        </div>
    );
}

