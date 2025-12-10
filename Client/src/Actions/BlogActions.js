import axios from "axios";
import { getMockBlogs } from "../Utils/MockBlogs";

export const FETCH_BLOG_REQUEST = 'FETCH_BLOG_REQUEST';
export const FETCH_BLOG_SUCCESS = 'FETCH_BLOG_SUCCESS';
export const FETCH_BLOG_FAILURE = 'FETCH_BLOG_FAILURE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

import { API_ENDPOINT, API_DATA } from "../Config/Client/APIs";

export const fetchBlogRequest = () => ({
    type: FETCH_BLOG_REQUEST
});

export const fetchBlogSuccess = (results, totalCount, totalPages, currentPage) => ({
    type: FETCH_BLOG_SUCCESS,
    payload: {
        results,
        totalCount,
        totalPages,
        currentPage
    }
});

export const fetchBlogSuccess_2 = (results) => ({
    type: FETCH_BLOG_SUCCESS,
    payload: results
});

export const fetchBlogFailure = error => ({
    type: FETCH_BLOG_FAILURE,
    payload: error
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page,
});


// Updated fetchBlog to match the API structure
export const fetchBlog = (page = 1, pageSize = 20) => {
    return (dispatch) => {
        dispatch(fetchBlogRequest());

        const url = new URL(`${API_ENDPOINT}${API_DATA.blog}/posts`);

        url.searchParams.append('page', page);
        url.searchParams.append('pageSize', pageSize);

        axios.get(url.toString())
            .then(response => {
                const { results, totalCount, totalPages, currentPage } = response.data;

                dispatch(fetchBlogSuccess(results, totalCount, totalPages, currentPage));
            })
            .catch(error => {
                console.warn('⚠️ API error, using mock data:', error.message);
                // Sử dụng mock data khi API lỗi
                const mockBlogs = getMockBlogs();
                const totalCount = mockBlogs.length;
                const totalPages = Math.ceil(totalCount / pageSize);
                const startIndex = (page - 1) * pageSize;
                const endIndex = startIndex + pageSize;
                const paginatedBlogs = mockBlogs.slice(startIndex, endIndex);

                dispatch(fetchBlogSuccess(paginatedBlogs, totalCount, totalPages, page));
            });
    };
};



export const fetchBlogWithoutPagi = () => {
    return dispatch => {
        dispatch(fetchBlogRequest());
        axios.get(`${API_ENDPOINT}${API_DATA.blog}`)
            .then(response => {

                const results = response.data.results;

                console.log("check data blog:: ", results)
                dispatch(fetchBlogSuccess_2(results));
            })
            .catch(error => {
                console.warn('⚠️ API error, using mock data:', error.message);
                // Sử dụng mock data khi API lỗi
                const mockBlogs = getMockBlogs();
                dispatch(fetchBlogSuccess_2(mockBlogs));
            });
    };
};
