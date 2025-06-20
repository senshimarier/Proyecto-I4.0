
import { createBrowserRouter } from 'react-router-dom';

import Dashboard from './modules/Dashboard';

import HomePage from './modules/home/HomePage';
import UserForm from './modules/user/User_Form';
import ProductsPage from './modules/product/ProductsPage';
import OrdersPage from './modules/order/OrdersPage';

// configuración del router
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />, // padre
    children: [
      // ruta hija
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'users', // ruta hija
        element: <UserForm />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
    ],
  },
  // Agregar rutas que no usan el Dashboard, como una página de Login
  // {
  //   path: '/login',
  //   element: <LoginPage />,
  // }
]);