
export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

import { API_ENDPOINT, API_DATA } from "../Config/Client/APIs";
import http from "../Utils/Http";

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
    return dispatch => {
        dispatch(fetchProductRequest());
        http.get(`${API_ENDPOINT}${API_DATA.product}`)
            .then(response => {
                const product = response.data.results;
                dispatch(fetchProductSuccess(product));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchProductFailure(errorMsg));
            });
    };
};

export const fetchProductHoatDong = () => {
    return dispatch => {
        dispatch(fetchProductRequest());
        http.get(`${API_ENDPOINT}${API_DATA.product}/hoat_dong`)
            .then(response => {
                const product = response.data.results;
                dispatch(fetchProductSuccess(product));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchProductFailure(errorMsg));
            });
    };
};

export const fetchProductWithNewDate = () => {
    return dispatch => {
        dispatch(fetchProductRequest());
        http.get(`${API_ENDPOINT}${API_DATA.product}/new`)
            .then(response => {
                const product = response.data.results;
                dispatch(fetchProductSuccess(product));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchProductFailure(errorMsg));
            });
    };
}

export const fetchMenu = () => {
    return dispatch => {
        dispatch(fetchProductRequest());
        http.get(`${API_ENDPOINT}${API_DATA.product}/menu`)
            .then(response => {
                console.log('✅ Fetch menu products success:', response.data);
                const product = response.data.results;
                console.log('📦 Products data:', product);
                dispatch(fetchProductSuccess(product));
            })
            .catch(error => {
                console.error('❌ Error fetching menu products:', error);
                const errorMsg = error.response?.data?.error || error.message || 'Không thể tải danh sách sản phẩm';
                dispatch(fetchProductFailure(errorMsg));
            });
    };
};