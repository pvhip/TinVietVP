
export const FETCH_PRODUCT_CATEGORY_REQUEST = 'FETCH_PRODUCT_CATEGORY_REQUEST';
export const FETCH_PRODUCT_CATEGORY_SUCCESS = 'FETCH_PRODUCT_CATEGORY_SUCCESS';
export const FETCH_PRODUCT_CATEGORY_FAILURE = 'FETCH_PRODUCT_CATEGORY_FAILURE';

import { API_ENDPOINT, API_DATA } from "../Config/Client/APIs";
import http from "../Utils/Http";
import { getMockCategories } from "../Utils/MockAuth";

// Helper function để xử lý lỗi connection và load categories từ cache hoặc mock
const handleCategoryConnectionError = (getState, dispatch) => {
    console.warn('Server connection error, keeping existing categories or loading from cache');
    const currentState = getState();
    let currentCategories = currentState.product_category?.product_category || [];
    
    // Nếu không có categories trong state, thử load từ cache
    if (currentCategories.length === 0) {
        try {
            const cached = localStorage.getItem('cached_categories');
            if (cached) {
                currentCategories = JSON.parse(cached);
                console.log('✅ Loaded categories from cache:', currentCategories.length);
            }
        } catch (e) {
            console.warn('Error loading cached categories:', e);
        }
    }
    
    // Nếu vẫn không có, sử dụng mock categories
    if (currentCategories.length === 0) {
        currentCategories = getMockCategories();
        console.log('✅ Using mock categories:', currentCategories.length);
        // Lưu mock categories vào cache
        try {
            localStorage.setItem('cached_categories', JSON.stringify(currentCategories));
        } catch (e) {
            console.warn('Error saving mock categories to cache:', e);
        }
    }
    
    dispatch(fetchProductCategorySuccess(currentCategories));
};

export const fetchProductCategoryRequest = () => ({
    type: FETCH_PRODUCT_CATEGORY_REQUEST
});

export const fetchProductCategorySuccess = product => ({
    type: FETCH_PRODUCT_CATEGORY_SUCCESS,
    payload: product
});

export const fetchProductCategoryFailure = error => ({
    type: FETCH_PRODUCT_CATEGORY_FAILURE,
    payload: error
});

export const fetchProductCategory = () => {
    return (dispatch, getState) => {
        dispatch(fetchProductCategoryRequest());
        http.get(`${API_ENDPOINT}${API_DATA.categoryProduct}`)
            .then(response => {
                const product_category = response.data.results;
                // Lưu vào cache
                if (Array.isArray(product_category) && product_category.length > 0) {
                    try {
                        localStorage.setItem('cached_categories', JSON.stringify(product_category));
                    } catch (error) {
                        console.warn('Error saving categories to cache:', error);
                    }
                }
                dispatch(fetchProductCategorySuccess(product_category));
            })
            .catch(error => {
                // Nếu là lỗi connection, giữ nguyên categories hiện tại hoặc load từ cache hoặc dùng mock data
                if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || error.message?.includes('CONNECTION_REFUSED')) {
                    handleCategoryConnectionError(getState, dispatch);
                } else {
                    const errorMsg = error.message;
                    dispatch(fetchProductCategoryFailure(errorMsg));
                }
            });
    };
};

export const fetchProductCategoryHoatDong = () => {
    return (dispatch, getState) => {
        dispatch(fetchProductCategoryRequest());
        http.get(`${API_ENDPOINT}${API_DATA.categoryProduct}/hoat_dong`)
            .then(response => {
                const product_category = response.data.results;
                // Lưu vào cache
                if (Array.isArray(product_category) && product_category.length > 0) {
                    try {
                        localStorage.setItem('cached_categories', JSON.stringify(product_category));
                    } catch (error) {
                        console.warn('Error saving categories to cache:', error);
                    }
                }
                dispatch(fetchProductCategorySuccess(product_category));
            })
            .catch(error => {
                // Nếu là lỗi connection, giữ nguyên categories hiện tại hoặc load từ cache hoặc dùng mock data
                if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || error.message?.includes('CONNECTION_REFUSED')) {
                    handleCategoryConnectionError(getState, dispatch);
                } else {
                    const errorMsg = error.message;
                    dispatch(fetchProductCategoryFailure(errorMsg));
                }
            });
    };
};

export const fetchListProductCategory = () => {
    return (dispatch, getState) => {
        dispatch(fetchProductCategoryRequest());
        http.get(`${API_ENDPOINT}${API_DATA.categoryProduct}/danh_muc`)
            .then(response => {
                const product_category = response.data.results;
                // Lưu vào cache
                if (Array.isArray(product_category) && product_category.length > 0) {
                    try {
                        localStorage.setItem('cached_categories', JSON.stringify(product_category));
                    } catch (error) {
                        console.warn('Error saving categories to cache:', error);
                    }
                }
                dispatch(fetchProductCategorySuccess(product_category));
            })
            .catch(error => {
                // Nếu là lỗi connection, giữ nguyên categories hiện tại hoặc load từ cache hoặc dùng mock data
                if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || error.message?.includes('CONNECTION_REFUSED')) {
                    handleCategoryConnectionError(getState, dispatch);
                } else {
                    const errorMsg = error.message;
                    dispatch(fetchProductCategoryFailure(errorMsg));
                }
            });
    };
};