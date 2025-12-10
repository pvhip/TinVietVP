import {
    FETCH_BLOG_FAILURE,
    FETCH_BLOG_REQUEST,
    FETCH_BLOG_SUCCESS,
    SET_CURRENT_PAGE
} from '../Actions/BlogActions';


const initialState = {
    currentPage: 1,
    pageSize: 20,
    allBlog: [],
    loading: false,
    blogs: [],
    error: '',
    totalCount: 0,
    totalPages: 0
};

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BLOG_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_BLOG_SUCCESS:
            // Xử lý cả hai trường hợp: có pagination và không có pagination
            if (Array.isArray(action.payload)) {
                // Trường hợp fetchBlogWithoutPagi - payload là mảng trực tiếp
                return {
                    ...state,
                    loading: false,
                    allBlog: action.payload,
                    blogs: action.payload.slice(0, state.pageSize),
                };
            } else {
                // Trường hợp fetchBlog - payload có pagination info
                return {
                    ...state,
                    loading: false,
                    allBlog: action.payload.results || [],
                    totalCount: action.payload.totalCount || 0,
                    totalPages: action.payload.totalPages || 0,
                    currentPage: action.payload.currentPage || 1,
                    blogs: action.payload.results ? action.payload.results.slice(0, state.pageSize) : [],
                };
            }
        case FETCH_BLOG_FAILURE:
            return {
                ...state,
                loading: false,
                blogs: [],
                error: action.payload
            };
        case SET_CURRENT_PAGE:
            const start = (action.payload - 1) * state.pageSize;
            const end = start + state.pageSize;
            return {
                ...state,
                currentPage: action.payload,
                blogs: state.allBlog.slice(start, end)
            };
        default:
            return state;
    }
};




export default blogReducer;

