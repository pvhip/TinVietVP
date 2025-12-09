import React, { useEffect, useState } from 'react';
import http from '../../Utils/Http';
import AdminConfig from '../../Config/Admin';
import './Orders.css';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            // Fetch orders from API
            // const response = await http.get(AdminConfig.APIs.API_DATA.orders);
            // setOrders(response.data.results || []);
            setOrders([]);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            'pending': { label: 'Chờ xử lý', color: '#f59e0b' },
            'confirmed': { label: 'Đã xác nhận', color: '#3b82f6' },
            'delivering': { label: 'Đang giao', color: '#8b5cf6' },
            'completed': { label: 'Hoàn thành', color: '#10b981' },
            'cancelled': { label: 'Đã hủy', color: '#ef4444' }
        };
        const statusInfo = statusMap[status] || { label: status, color: '#64748b' };
        return (
            <span className="status-badge" style={{ backgroundColor: `${statusInfo.color}20`, color: statusInfo.color }}>
                {statusInfo.label}
            </span>
        );
    };

    if (loading) {
        return <div className="loading">Đang tải...</div>;
    }

    return (
        <div className="admin-orders">
            <div className="page-header">
                <h2>Quản lý đơn hàng</h2>
            </div>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Tìm kiếm đơn hàng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="pending">Chờ xử lý</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="delivering">Đang giao</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                </select>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Khách hàng</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Ngày tạo</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="empty-state">
                                    Chưa có đơn hàng nào
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id}>
                                    <td>#{order.id}</td>
                                    <td>{order.user?.fullname || '-'}</td>
                                    <td>{formatPrice(order.total || 0)}</td>
                                    <td>{getStatusBadge(order.status)}</td>
                                    <td>{new Date(order.created_at).toLocaleDateString('vi-VN')}</td>
                                    <td>
                                        <button className="btn-view">
                                            <i className="fas fa-eye"></i> Xem
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

