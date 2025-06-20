// src/App.tsx

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// 1. Importa el Dashboard y TODAS las páginas que irán dentro de él
import Dashboard from './modules/Dashboard';
import HomePage from './modules/home/HomePage';
import UserForm from './modules/user/User_Form';
import ProductsPage from './modules/product/ProductsPage';
import OrdersPage from './modules/order/OrdersPage';

function App() {
  return (
    <Router>
      <Routes>
        {/*
        rutas de dashboard
        */}
        <Route path="/" element={<Dashboard />}>
          
          {/* rutas anidadas */}
          <Route index element={<HomePage />} />
          {/*rutas padre */}

          <Route path="users" element={<UserForm />} />
          {/*users */}

          <Route path="products" element={<ProductsPage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>

        {/* siguientes rutas */}

      </Routes>
    </Router>
  );
}

export default App;
