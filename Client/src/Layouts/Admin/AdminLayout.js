import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';
import './AdminLayout.css';

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        setUser(null);
        navigate('/admin/login');
    };

    const menuItems = [
        { path: '/admin', icon: 'fas fa-home', label: 'Dashboard', exact: true },
        { path: '/admin/products', icon: 'fas fa-box', label: 'Sản phẩm' },
        { path: '/admin/categories', icon: 'fas fa-folder', label: 'Danh mục' },
        { path: '/admin/orders', icon: 'fas fa-shopping-cart', label: 'Đơn hàng' },
        { path: '/admin/users', icon: 'fas fa-users', label: 'Người dùng' },
    ];

    const isActive = (path, exact = false) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <h2 className="logo">Tin Việt Admin</h2>
                    <button 
                        className="sidebar-toggle"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <i className={`fas fa-${sidebarOpen ? 'times' : 'bars'}`}></i>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${isActive(item.path, item.exact) ? 'active' : ''}`}
                        >
                            <i className={item.icon}></i>
                            {sidebarOpen && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <Link to="/" className="nav-item">
                        <i className="fas fa-globe"></i>
                        {sidebarOpen && <span>Về trang chủ</span>}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="admin-main">
                {/* Header */}
                <header className="admin-header">
                    <div className="header-left">
                        <button 
                            className="mobile-menu-toggle"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                        <h1 className="page-title">
                            {menuItems.find(item => isActive(item.path, item.exact))?.label || 'Admin'}
                        </h1>
                    </div>
                    <div className="header-right">
                        <div className="user-menu">
                            <div className="user-info">
                                <i className="fas fa-user-circle"></i>
                                <span>{user?.fullname || 'Admin'}</span>
                            </div>
                            <button className="logout-btn" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt"></i>
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

