import {
    FETCH_PRODUCT_CATEGORY_REQUEST,
    FETCH_PRODUCT_CATEGORY_SUCCESS,
    FETCH_PRODUCT_CATEGORY_FAILURE
} from '../Actions/ProductCategoryActions';

// Lấy categories từ cache nếu có
const getCachedCategories = () => {
    try {
        const cached = localStorage.getItem('cached_categories');
        return cached ? JSON.parse(cached) : [];
    } catch (error) {
        console.warn('Error loading cached categories:', error);
        return [];
    }
};

const initialState = {
    loading: false,
    product_category: getCachedCategories(), // Load từ cache khi khởi tạo
    error: ''
};

const productCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case FETCH_PRODUCT_CATEGORY_SUCCESS:
            // Nếu payload là null, giữ nguyên state hiện tại
            if (action.payload === null) {
                return {
                    ...state,
                    loading: false,
                    error: ''
                };
            }
            // Nếu payload là array, update categories
            if (Array.isArray(action.payload)) {
                // Nếu payload là empty array và state đã có categories, giữ nguyên categories hiện tại
                if (action.payload.length === 0 && state.product_category.length > 0) {
                    return {
                        ...state,
                        loading: false,
                        error: ''
                    };
                }
                // Update với payload mới
                return {
                    loading: false,
                    product_category: action.payload,
                    error: ''
                };
            }
            // Nếu payload không phải array, giữ nguyên state
            return {
                ...state,
                loading: false,
                error: ''
            };
        case FETCH_PRODUCT_CATEGORY_FAILURE:
            return {
                loading: false,
                product_category: state.product_category || [], // Giữ nguyên categories hiện tại khi có lỗi
                error: action.payload
            };
        default:
            return state;
    }
};

export default productCategoryReducer;

