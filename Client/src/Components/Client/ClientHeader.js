import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';
import normalAvatar from '../../Assets/Client/Images/default-avatar.png';
import './ClientHeader.css';

export default function ClientHeader() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownOpen && !event.target.closest('.user-dropdown')) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [userDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    navigate('/');
    setUser(null);
    setUserDropdownOpen(false);
  };

  const truncateName = (name, maxLength) => {
    if (!name) return '';
    return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="client-header">
      <div className="header-container">
        <NavLink to="/" className="header-logo">
          <img src={require('../../Assets/Client/Images/logo.png')} alt="Logo" />
          <h3>Tin Việt</h3>
        </NavLink>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <i className="fas fa-bars"></i>
        </button>

        <nav className={`header-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <NavLink 
            to="/" 
            className={`nav-link-item ${isActive('/') ? 'active' : ''}`}
          >
            Trang chủ
          </NavLink>
          <NavLink 
            to="/menu" 
            className={`nav-link-item ${isActive('/menu') ? 'active' : ''}`}
          >
            Sản phẩm
          </NavLink>
          <NavLink 
            to="/service" 
            className={`nav-link-item ${isActive('/service') ? 'active' : ''}`}
          >
            Dịch vụ
          </NavLink>
          <NavLink 
            to="/blog" 
            className={`nav-link-item ${isActive('/blog') ? 'active' : ''}`}
          >
            Tin tức & Mẹo hay
          </NavLink>
          <div className="nav-dropdown">
            <button className="nav-dropdown-toggle">
              Khác
            </button>
            <div className="nav-dropdown-menu">
              <NavLink 
                to="/about" 
                className={`dropdown-item-link ${isActive('/about') ? 'active' : ''}`}
              >
                Về chúng tôi
              </NavLink>
              <NavLink 
                to="/contact" 
                className={`dropdown-item-link ${isActive('/contact') ? 'active' : ''}`}
              >
                Liên hệ
              </NavLink>
            </div>
          </div>
        </nav>

        <div className="header-actions">
          <NavLink to="/booking" className="btn-order">
            Đặt hàng
          </NavLink>
          {user ? (
            <div 
              className={`user-dropdown ${userDropdownOpen ? 'show' : ''}`}
              onMouseEnter={() => setUserDropdownOpen(true)}
              onMouseLeave={() => setUserDropdownOpen(false)}
            >
              <button
                className="user-avatar-btn"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setUserDropdownOpen(!userDropdownOpen);
                }}
                onMouseEnter={() => setUserDropdownOpen(true)}
                aria-label="User menu"
                aria-expanded={userDropdownOpen}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    onError={(e) => {
                      e.target.src = normalAvatar;
                      e.target.onerror = null;
                    }}
                  />
                ) : (
                  <div className="avatar-placeholder">
                    <i className="fas fa-user"></i>
                  </div>
                )}
              </button>
              <div 
                className="user-dropdown-menu"
                onMouseEnter={() => setUserDropdownOpen(true)}
                onMouseLeave={() => setUserDropdownOpen(false)}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="user-dropdown-header">
                  {truncateName(user.full_name || user.fullname || 'User', 20)}
                </div>
                <NavLink 
                  to="/account" 
                  className={`user-dropdown-item ${isActive('/account') ? 'active' : ''}`}
                  onClick={() => setUserDropdownOpen(false)}
                >
                  Thông tin tài khoản
                </NavLink>
                <NavLink 
                  to="/my-bookings" 
                  className={`user-dropdown-item ${isActive('/my-bookings') ? 'active' : ''}`}
                  onClick={() => setUserDropdownOpen(false)}
                >
                  Đơn đặt hàng của tôi
                </NavLink>
                <button 
                  className="user-dropdown-item" 
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <NavLink to="/login" className="btn-login">
              <i className="fa-solid fa-user"></i>
              Đăng nhập
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}
