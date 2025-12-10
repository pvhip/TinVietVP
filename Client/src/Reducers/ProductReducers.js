import {
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS
} from '../Actions/ProductActions';


// Lấy products từ cache nếu có
const getCachedProducts = () => {
    try {
        const cached = localStorage.getItem('cached_products');
        return cached ? JSON.parse(cached) : [];
    } catch (error) {
        console.warn('Error loading cached products:', error);
        return [];
    }
};

const initialState = {
    loading: false,
    product: getCachedProducts(), // Load từ cache khi khởi tạo
    error: ''
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case FETCH_PRODUCT_SUCCESS:
            // Nếu payload là null, giữ nguyên state hiện tại
            if (action.payload === null) {
                return {
                    ...state,
                    loading: false,
                    error: ''
                };
            }
            // Nếu payload là array, update products
            if (Array.isArray(action.payload)) {
                // Nếu payload là empty array và state đã có products, giữ nguyên products hiện tại
                if (action.payload.length === 0 && state.product.length > 0) {
                    return {
                        ...state,
                        loading: false,
                        error: ''
                    };
                }
                // Update với payload mới
                return {
                    loading: false,
                    product: action.payload,
                    error: ''
                };
            }
            // Nếu payload không phải array, giữ nguyên state
            return {
                ...state,
                loading: false,
                error: ''
            };
        case FETCH_PRODUCT_FAILURE:
            return {
                loading: false,
                product: state.product || [], // Giữ nguyên products hiện tại khi có lỗi
                error: action.payload
            };
        default:
            return state;
    }
};

export default productReducer;

