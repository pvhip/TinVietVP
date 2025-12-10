import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { API_ENDPOINT } from '../Config/Client/APIs';
import { isMockToken } from './MockAuth';

const createHttpInstance = () => {
    const instance = axios.create({
        baseURL: API_ENDPOINT,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('accessToken');
            const isMock = localStorage.getItem('use_mock_auth') === 'true';
            
            // Nếu đang dùng mock mode, không gửi Authorization header vì server không kết nối được
            if (isMock || (token && isMockToken(token))) {
                // Không gửi Authorization header khi dùng mock mode
                // Vì server không kết nối được, không cần gửi token
                return config;
            }
            
            if (token) {
                // Chỉ decode JWT token thật
                try {
                    const decodedToken = jwtDecode(token);
                    const currentTime = Date.now() / 1000;
                    if (decodedToken.exp < currentTime) {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('user');
                        // Không thể dùng useNavigate trong interceptor, sẽ xử lý ở component
                        return Promise.reject(new Error('Token expired'));
                    }
                    config.headers.Authorization = `Bearer ${token}`;
                } catch (error) {
                    // Nếu không decode được, có thể là mock token hoặc token không hợp lệ
                    console.warn('Token decode error:', error);
                    // Không gửi Authorization header nếu không decode được
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    
    // Thêm response interceptor để xử lý lỗi connection
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            // Nếu là lỗi connection và đang không dùng mock mode, tự động chuyển sang mock mode
            if ((error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || error.message?.includes('CONNECTION_REFUSED')) 
                && localStorage.getItem('use_mock_auth') !== 'true') {
                console.warn('Server connection error detected, switching to mock mode');
                localStorage.setItem('use_mock_auth', 'true');
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

const http = createHttpInstance();

export default http;
