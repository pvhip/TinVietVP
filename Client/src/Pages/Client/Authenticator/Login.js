import React, { useState } from 'react'
import '../../../Assets/Client/Styles/AuthenStyle/authen.css'
import '../../../Assets/Client/Styles/AuthenStyle/util.css'
import { Link, useNavigate } from 'react-router-dom'
import GoogleAuth from '../../../Services/GoogleAuth/GoogleAuth';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../Components/Client/Spinner';
import { fetchLogin } from '../../../Actions/AuthActions';
import FacebookAuth from '../../../Services/FaceboolAuth/FacebookAuth';
import logoImage from '../../../Assets/Client/Images/logo.png';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginState = useSelector(state => state.auth);
    const { error } = loginState;

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError('');

        try {
            await dispatch(fetchLogin(data.email, data.password));
            
            // Đợi một chút để đảm bảo state được cập nhật
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const user = localStorage.getItem('user');
            const accessToken = localStorage.getItem('accessToken');
            if (user && accessToken) {
                // Reload trang để đảm bảo tất cả data được fetch lại
                window.location.href = '/';
            } else {
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            setServerError(err.message || 'Đăng nhập thất bại');
        }
    };

    return (
        <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container-fluid py-5 bg-dark hero-header mb-0">
            </div>
            <div className="container my-5">
                <div className="row justify-content-center ">
                    <div className="col-12 col-lg-6">
                        {/* Logo */}
                        <div className="text-center mb-4">
                            <img
                                src={logoImage}
                                alt="Logo Tin Việt"
                                className="img-fluid"
                                style={{ maxWidth: '150px' }}
                            />
                            <h3 className="mt-3 mb-0">Đăng nhập</h3>
                        </div>

                        {/* Social Login Options */}
                        <div className="text-center mb-4">
                            <h5 className="mb-3">Đăng nhập với</h5>
                            <div className="d-flex justify-content-center gap-3">
                                <GoogleAuth />
                                <FacebookAuth />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="d-flex align-items-center my-4">
                            <hr className="flex-grow-1" />
                            <span className="mx-3 text-muted">hoặc</span>
                            <hr className="flex-grow-1" />
                        </div>

                        {/* Login Form */}
                        <div className="p-4 shadow-sm rounded">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white">
                                            <i className="fa fa-envelope" aria-hidden="true"></i>
                                        </span>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            placeholder="Nhập email của bạn"
                                            {...register('email', {
                                                required: 'Email là bắt buộc',
                                                pattern: {
                                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                    message: 'Email không hợp lệ'
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-danger small mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Mật khẩu</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white">
                                            <i className="fa fa-lock" aria-hidden="true"></i>
                                        </span>
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            placeholder="Nhập mật khẩu"
                                            {...register('password', {
                                                required: 'Mật khẩu là bắt buộc'
                                            })}
                                        />
                                        <span
                                            className="input-group-text bg-white"
                                            onClick={togglePasswordVisibility}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <i
                                                className={passwordVisible ? "fa fa-eye-slash" : "fa fa-eye"}
                                                aria-hidden="true"
                                            ></i>
                                        </span>
                                    </div>
                                    {errors.password && (
                                        <p className="text-danger small mt-1">{errors.password.message}</p>
                                    )}
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="rememberMe"
                                        />
                                        <label className="form-check-label" htmlFor="rememberMe">
                                            Ghi nhớ đăng nhập
                                        </label>
                                    </div>
                                    <a href="/forgot-password" className="text-decoration-none text-primary">
                                        Quên mật khẩu?
                                    </a>
                                </div>

                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        <i className="fa fa-exclamation-circle me-2"></i>
                                        {error}
                                    </div>
                                )}

                                {serverError && (
                                    <div className="alert alert-danger" role="alert">
                                        <i className="fa fa-exclamation-circle me-2"></i>
                                        {serverError}
                                    </div>
                                )}

                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100 py-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Đang đăng nhập...
                                        </>
                                    ) : (
                                        'Đăng nhập'
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Register Option */}
                        <div className="text-center mt-4">
                            <p className="mb-2">
                                Bạn chưa có tài khoản?{' '}
                                <Link to="/register" className="text-primary text-decoration-none fw-bold">
                                    Đăng ký ngay
                                </Link>
                            </p>
                            <Link to="/policy" className="text-secondary text-decoration-underline small">
                                Xem chính sách của công ty
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}