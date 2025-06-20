import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    BarChartOutlined
} from '@ant-design/icons';

// Mapeo de strings a componentes de íconos
const Icons = {
    DashboardOutlined,
    UserOutlined,
    BarChartOutlined
};

// Datos de ejemplo para el menú
const fakeMenuData = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: "DashboardOutlined",
        roles: ["684312c1a93e8e0aa3428fd1"]
    },
    {
        title: "Usuarios",
        path: "/users",
        icon: "UserOutlined",
    }
];

function MenuDynamic() {
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const navigate = useNavigate();
    const location = useLocation(); // Hook para obtener la ruta actual

    // Simula la carga de datos del menú
    useEffect(() => {
        const timer = setTimeout(() => {
            setMenuItems(fakeMenuData);
        }, 500);
        return () => clearTimeout(timer); // Limpieza del timer
    }, []);

    // Función que renderiza los items del menú con sus íconos
    const renderMenu = () => {
        return menuItems.map((item) => {
            // Obtiene el componente del ícono dinámicamente
            const IconComponent = Icons[item.icon as keyof typeof Icons];
            return {
                key: item.path,
                icon: IconComponent ? <IconComponent /> : null,
                label: item.title,
            };
        });
    };

    return (
        <Menu
            theme="dark"
            mode="inline"
            // Selecciona el item del menú que coincide con la ruta actual
            selectedKeys={[location.pathname]}
            // Navega a la ruta del item al hacer clic
            onClick={({ key }) => navigate(key)}
            // Genera los items del menú
            items={renderMenu()}
            style={{ height: '100%', borderRight: 0 }}
        />
    );
}

export default MenuDynamic;