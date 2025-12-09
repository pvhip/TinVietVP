import Dashboard from '../../Pages/Admin/Dashboard';
import Products from '../../Pages/Admin/Products';
import Categories from '../../Pages/Admin/Categories';
import Orders from '../../Pages/Admin/Orders';
import Users from '../../Pages/Admin/Users';
import Login from '../../Pages/Admin/Login';

// Admin routes
const adminRoutes = [
    { path: '/admin', component: Dashboard, exact: true },
    { path: '/admin/products', component: Products },
    { path: '/admin/categories', component: Categories },
    { path: '/admin/orders', component: Orders },
    { path: '/admin/users', component: Users },
    { path: '/admin/login', component: Login },
];

export default adminRoutes;

