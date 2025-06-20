import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import MenuDynamic from './MenuDynamic'; // Asegúrate de que la ruta de importación sea correcta

const { Sider, Header, Content, Footer } = Layout;

function Dashboard() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={220}>
                <MenuDynamic />
            </Sider>
            <Layout>
                <Header>
                    {/* Contenido del encabezado, como el perfil de usuario */}
                </Header>
                <Content style={{ margin: '24px 16px 0', padding: 24 }}>
                    {/* Outlet renderizará las rutas hijas (ej: /dashboard/users) */}
                    <Outlet />
                </Content>
                <Footer>
                    {/* Contenido del pie de página */}
                </Footer>
            </Layout>
        </Layout>
    );
}

export default Dashboard;