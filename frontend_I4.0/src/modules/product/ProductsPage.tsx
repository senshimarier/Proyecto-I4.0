import React from 'react';
import { Typography, Button } from 'antd';

const ProductsPage = () => {
  return (
    <div>
      <Typography.Title level={2}>Gestión de Productos</Typography.Title>
      <Button type="primary">Agregar Producto</Button>
    </div>
  );
};

export default ProductsPage;