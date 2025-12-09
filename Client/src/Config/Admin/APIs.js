const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:6969/api';

const API_DATA = {
    auth: '/auth_admin',
    products: '/product',
    categories: '/category-product',
    orders: '/orders',
    users: '/users',
    blogs: '/blogs',
    statistics: '/statistical',
};

const APIs = {
    API_ENDPOINT,
    API_DATA
};

export default APIs;

