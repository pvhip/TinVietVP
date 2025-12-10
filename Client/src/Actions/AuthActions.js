export const FETCH_AUTH_REQUEST = 'FETCH_AUTH_REQUEST';
export const FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS';
export const FETCH_AUTH_FAILURE = 'FETCH_AUTH_FAILURE';
export const SHOW_SUCCESS_ALERT = 'SHOW_SUCCESS_ALERT';
export const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT';
export const CHECK_AUTH_STATUS = 'CHECK_AUTH_STATUS';

import { API_DATA, API_ENDPOINT } from "../Config/Client/APIs";
import http from "../Utils/Http";
import { mockCheckEmailExists, mockRegister, mockLogin, isMockMode, setMockMode } from "../Utils/MockAuth";

export const fetchAuthRequest = () => ({
    type: FETCH_AUTH_REQUEST
});

export const fetchAuthSuccess = auth => ({
    type: FETCH_AUTH_SUCCESS,
    payload: auth
});

export const fetchAuthFailure = error => ({
    type: FETCH_AUTH_FAILURE,
    payload: error
});


export const showSuccessAlert = (message) => ({
    type: SHOW_SUCCESS_ALERT,
    payload: message,
});

export const showErrorAlert = (message) => ({
    type: SHOW_ERROR_ALERT,
    payload: message,
});

const getErrorMessage = (error) => {
    if (!error) {
        return "Đã xảy ra lỗi. Vui lòng thử lại!";
    }
    
    // Xử lý lỗi connection
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || error.message?.includes('CONNECTION_REFUSED')) {
        return "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng hoặc liên hệ quản trị viên.";
    }
    
    // Xử lý lỗi từ response
    if (error.response) {
        return error.response.data?.message || error.response.data?.error || `Lỗi: ${error.response.status} - ${error.response.statusText}`;
    }
    
    // Xử lý lỗi khác
    return error.message || "Đã xảy ra lỗi. Vui lòng thử lại!";
};



// Hàm để kiểm tra người dùng trong cơ sở dữ liệu
export const checkEmailExists = async (email) => {
    // Nếu đang dùng mock mode hoặc server không kết nối được, dùng mock
    if (isMockMode()) {
        return mockCheckEmailExists(email);
    }
    
    try {
        const response = await http.get(`${API_ENDPOINT}/auth/check-email`, { params: { email } });
        return response.data.exists ? response.data.user : null;
    } catch (error) {
        console.error('Error checking user existence:', error);
        
        // Nếu là lỗi connection, tự động chuyển sang mock mode
        if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || error.message?.includes('CONNECTION_REFUSED')) {
            console.warn('Server connection error, switching to mock mode');
            setMockMode(true);
            return mockCheckEmailExists(email);
        }
        
        // Nếu là lỗi khác, throw để xử lý ở component
        throw error;
    }
};



export const fetchGoogleAuth = (userData) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        try {
            const response = await http.post(`${API_ENDPOINT}${API_DATA.authOGoogle}`, userData);
            const data = response.data;
            dispatch(fetchAuthSuccess(data));
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('accessToken', data.accessToken);
            dispatch(showSuccessAlert('Đăng nhập Google thành công!'));
        } catch (error) {
            const errorMsg = getErrorMessage(error.response.data);
            dispatch(fetchAuthFailure(errorMsg));
            dispatch(showErrorAlert(errorMsg));
        }
    };
};


export const fetchFacebookAuth = (userData) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        try {
            const response = await http.post(`${API_ENDPOINT}${API_DATA.authOFacebook}`, userData);
            const data = response.data;
            dispatch(fetchAuthSuccess(data));
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('accessToken', data.accessToken);
            dispatch(showSuccessAlert('Đăng nhập Facebook thành công!'));
        } catch (error) {
            const errorMsg = getErrorMessage(error.response.data);
            dispatch(fetchAuthFailure(errorMsg));
            dispatch(showErrorAlert(errorMsg));
        }
    };
};




export const fetchLogin = (email, password) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        
        // Nếu đang dùng mock mode, dùng mock login
        if (isMockMode()) {
            try {
                const data = mockLogin(email, password);
                dispatch(fetchAuthSuccess(data));
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('accessToken', data.accessToken);
                dispatch(showSuccessAlert(data.message));
            } catch (error) {
                const errorMsg = error.message || 'Đăng nhập thất bại';
                dispatch(fetchAuthFailure(errorMsg));
                dispatch(showErrorAlert(errorMsg));
            }
            return;
        }
        
        try {
            const response = await http.post(`${API_ENDPOINT}${API_DATA.login}`, { email, password });
            const data = response.data;
            dispatch(fetchAuthSuccess(data));
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('accessToken', data.accessToken);
            dispatch(showSuccessAlert('Đăng nhập thành công!'));
        } catch (error) {
            // Nếu là lỗi connection, tự động chuyển sang mock mode
            if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || error.message?.includes('CONNECTION_REFUSED')) {
                console.warn('Server connection error, switching to mock mode');
                setMockMode(true);
                try {
                    const data = mockLogin(email, password);
                    dispatch(fetchAuthSuccess(data));
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('accessToken', data.accessToken);
                    dispatch(showSuccessAlert(data.message));
                } catch (mockError) {
                    const errorMsg = mockError.message || 'Đăng nhập thất bại';
                    dispatch(fetchAuthFailure(errorMsg));
                    dispatch(showErrorAlert(errorMsg));
                }
            } else {
                const errorMsg = getErrorMessage(error);
                console.log("Check errorMsg:: ", errorMsg);
                dispatch(fetchAuthFailure(errorMsg));
                dispatch(showErrorAlert(errorMsg));
            }
        }
    };
};


export const checkAuthStatus = () => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('accessToken');

        if (user && token) {
            dispatch({ type: CHECK_AUTH_STATUS, payload: { isAuthenticated: true, user } });
        } else {
            dispatch({ type: CHECK_AUTH_STATUS, payload: { isAuthenticated: false, user: null } });
        }
    };
};

export const addNewCustomer = (customerData) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        
        // Nếu đang dùng mock mode, dùng mock register
        if (isMockMode()) {
            try {
                const data = mockRegister(customerData);
                dispatch(fetchAuthSuccess(data));
                dispatch(showSuccessAlert(data.message));
            } catch (error) {
                const errorMsg = error.message || 'Đăng ký thất bại';
                dispatch(fetchAuthFailure(errorMsg));
                dispatch(showErrorAlert(errorMsg));
                throw error;
            }
            return;
        }
        
        try {
            const response = await http.post(`${API_ENDPOINT}${API_DATA.register}`, customerData);
            const data = response.data;
            dispatch(fetchAuthSuccess(data));
            dispatch(showSuccessAlert('Đăng ký tài khoản thành công!'));
        } catch (error) {
            // Nếu là lỗi connection, tự động chuyển sang mock mode
            if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || error.message?.includes('CONNECTION_REFUSED')) {
                console.warn('Server connection error, switching to mock mode');
                setMockMode(true);
                try {
                    const data = mockRegister(customerData);
                    dispatch(fetchAuthSuccess(data));
                    dispatch(showSuccessAlert(data.message));
                } catch (mockError) {
                    const errorMsg = mockError.message || 'Đăng ký thất bại';
                    dispatch(fetchAuthFailure(errorMsg));
                    dispatch(showErrorAlert(errorMsg));
                    throw mockError;
                }
            } else {
                const errorMsg = getErrorMessage(error);
                dispatch(fetchAuthFailure(errorMsg));
                dispatch(showErrorAlert(errorMsg));
                throw error;
            }
        }
    };
};


export const forgotPassword = (email) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        try {
            const response = await http.post(`${API_ENDPOINT}${API_DATA.forgotPassword}`, { email });
            dispatch(fetchAuthSuccess(response.data));
            dispatch(showSuccessAlert('Email đặt lại mật khẩu đã được gửi thành công!'));
        } catch (error) {
            const errorMsg = getErrorMessage(error.response.data);
            dispatch(fetchAuthFailure(errorMsg));
            dispatch(showErrorAlert(errorMsg));
        }
    };
};

export const changePassword = (token, newPassword) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        try {
            const response = await http.post(`${API_ENDPOINT}${API_DATA.changePassword}`, { token, newPassword });
            dispatch(fetchAuthSuccess(response.data));
            dispatch(showSuccessAlert('Đổi mật khẩu thành công!'));
        } catch (error) {
            const errorMsg = getErrorMessage(error.response.data);
            dispatch(fetchAuthFailure(errorMsg));
            dispatch(showErrorAlert(errorMsg));
        }
    };
};
