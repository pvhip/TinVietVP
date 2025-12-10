
export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

import { API_ENDPOINT, API_DATA } from "../Config/Client/APIs";
import http from "../Utils/Http";
import { getMockProducts } from "../Utils/MockAuth";

// Helper function để xử lý lỗi connection và load products từ cache hoặc mock
const handleConnectionError = (getState, dispatch) => {
    console.warn('Server connection error, keeping existing products or loading from cache');
    const currentState = getState();
    let currentProducts = currentState.product?.product || [];
    
    // Nếu không có products trong state, thử load từ cache
    if (currentProducts.length === 0) {
        try {
            const cached = localStorage.getItem('cached_products');
            if (cached) {
                currentProducts = JSON.parse(cached);
                console.log('✅ Loaded products from cache:', currentProducts.length);
            }
        } catch (e) {
            console.warn('Error loading cached products:', e);
        }
    }
    
    // Nếu vẫn không có, sử dụng mock products
    if (currentProducts.length === 0) {
        currentProducts = getMockProducts();
        console.log('✅ Using mock products:', currentProducts.length);
        // Lưu mock products vào cache
        try {
            localStorage.setItem('cached_products', JSON.stringify(currentProducts));
        } catch (e) {
            console.warn('Error saving mock products to cache:', e);
        }
    }
    
    dispatch(fetchProductSuccess(currentProducts));
};

export const fetchProductRequest = () => ({
    type: FETCH_PRODUCT_REQUEST
});

export const fetchProductSuccess = product => ({
    type: FETCH_PRODUCT_SUCCESS,
    payload: product
});

export const fetchProductFailure = error => ({
    type: FETCH_PRODUCT_FAILURE,
    payload: error
});

export const fetchProduct = () => {
    return (dispatch, getState) => {
        dispatch(fetchProductRequest());
        http.get(`${API_ENDPOINT}${API_DATA.product}`)
            .then(response => {
                const product = response.data.results;
                // Lưu vào cache
                if (Array.isArray(product) && product.length > 0) {
                    try {
                        localStorage.setItem('cached_products', JSON.stringify(product));
                    } catch (error) {
                        console.warn('Error saving products to cache:', error);
                    }
                }
                dispatch(fetchProductSuccess(product));
            })
            .catch(error => {
                // Nếu là lỗi connection, giữ nguyên products hiện tại hoặc load từ cache hoặc dùng mock data
                if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || error.message?.includes('CONNECTION_REFUSED')) {
                    handleConnectionError(getState, dispatch);
                } else {
                    const errorMsg = error.message;
                    dispatch(fetchProductFailure(errorMsg));
                }
            });
    };
};

export const fetchProductHoatDong = () => {
    return (dispatch, getState) => {
        dispatch(fetchProductRequest());
        http.get(`${API_ENDPOINT}${API_DATA.product}/hoat_dong`)
            .then(response => {
                const product = response.data.results;
                // Lưu vào cache
                if (Array.isArray(product) && product.length > 0) {
                    try {
                        localStorage.setItem('cached_products', JSON.stringify(product));
                    } catch (error) {
                        console.warn('Error saving products to cache:', error);
                    }
                }
                dispatch(fetchProductSuccess(product));
            })
            .catch(error => {
                // Nếu là lỗi connection, giữ nguyên products hiện tại hoặc load từ cache hoặc dùng mock data
                if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || error.message?.includes('CONNECTION_REFUSED')) {
                    handleConnectionError(getState, dispatch);
                } else {
                    const errorMsg = error.message;
                    dispatch(fetchProductFailure(errorMsg));
                }
            });
    };
};

export const fetchProductWithNewDate = () => {
    return (dispatch, getState) => {
        dispatch(fetchProductRequest());
        http.get(`${API_ENDPOINT}${API_DATA.product}/new`)
            .then(response => {
                const product = response.data.results;
                // Lưu vào cache
                if (Array.isArray(product) && product.length > 0) {
                    try {
                        localStorage.setItem('cached_products', JSON.stringify(product));
                    } catch (error) {
                        console.warn('Error saving products to cache:', error);
                    }
                }
                dispatch(fetchProductSuccess(product));
            })
            .catch(error => {
                // Nếu là lỗi connection, giữ nguyên products hiện tại hoặc load từ cache hoặc dùng mock data
                if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || error.message?.includes('CONNECTION_REFUSED')) {
                    handleConnectionError(getState, dispatch);
                } else {
                    const errorMsg = error.message;
                    dispatch(fetchProductFailure(errorMsg));
                }
            });
    };
}

export const fetchMenu = () => {
    return (dispatch, getState) => {
        dispatch(fetchProductRequest());
        http.get(`${API_ENDPOINT}${API_DATA.product}/menu`)
            .then(response => {
                console.log('✅ Fetch menu products success:', response.data);
                const product = response.data.results;
                console.log('📦 Products data:', product);
                // Lưu vào cache
                if (Array.isArray(product) && product.length > 0) {
                    try {
                        localStorage.setItem('cached_products', JSON.stringify(product));
                    } catch (error) {
                        console.warn('Error saving products to cache:', error);
                    }
                }
                dispatch(fetchProductSuccess(product));
            })
            .catch(error => {
                console.error('❌ Error fetching menu products:', error);
                
                // Nếu là lỗi connection, giữ nguyên products hiện tại hoặc load từ cache hoặc dùng mock data
                if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || error.message?.includes('CONNECTION_REFUSED')) {
                    handleConnectionError(getState, dispatch);
                } else {
                    const errorMsg = error.response?.data?.error || error.message || 'Không thể tải danh sách sản phẩm';
                    dispatch(fetchProductFailure(errorMsg));
                }
            });
    };
};