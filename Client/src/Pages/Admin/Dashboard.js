import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminConfig from '../../Config/Admin';
import http from '../../Utils/Http';
import './Dashboard.css';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalCategories: 0,
        totalOrders: 0,
        totalUsers: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Fetch statistics from API
            // You can add actual API calls here
            setStats({
                totalProducts: 0,
                totalCategories: 0,
                totalOrders: 0,
                totalUsers: 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Tổng sản phẩm',
            value: stats.totalProducts,
            icon: 'fas fa-box',
            color: '#3b82f6',
            link: AdminConfig.routes.products
        },
        {
            title: 'Danh mục',
            value: stats.totalCategories,
            icon: 'fas fa-folder',
            color: '#10b981',
            link: AdminConfig.routes.categories
        },
        {
            title: 'Đơn hàng',
            value: stats.totalOrders,
            icon: 'fas fa-shopping-cart',
            color: '#f59e0b',
            link: AdminConfig.routes.orders
        },
        {
            title: 'Người dùng',
            value: stats.totalUsers,
            icon: 'fas fa-users',
            color: '#ef4444',
            link: AdminConfig.routes.users
        }
    ];

    if (loading) {
        return <div className="loading">Đang tải...</div>;
    }

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h2>Dashboard</h2>
                <p>Chào mừng trở lại, quản trị viên!</p>
            </div>

            <div className="stats-grid">
                {statCards.map((card, index) => (
                    <Link key={index} to={card.link} className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: `${card.color}20`, color: card.color }}>
                            <i className={card.icon}></i>
                        </div>
                        <div className="stat-content">
                            <h3>{card.value}</h3>
                            <p>{card.title}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="dashboard-content">
                <div className="content-card">
                    <h3>Hoạt động gần đây</h3>
                    <div className="activity-list">
                        <p className="empty-state">Chưa có hoạt động nào</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

