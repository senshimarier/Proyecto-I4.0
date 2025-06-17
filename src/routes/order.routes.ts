import { Router } from 'express';
import { 
    createOrder, 
    getAllOrders, 
    getOrdersByUser,
    markOrderAsPaid, // Asegúrate que esta función está importada
    cancelOrder      // Asegúrate que esta función está importada
} from '../controller/order.controller';

const router = Router();

// --- Rutas existentes ---
router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/user/:userId', getOrdersByUser);

// --- Rutas para actualizar estado ---
// Esta ruta coincide con: PATCH http://localhost:3000/api/orders/ID_DE_ORDEN/pay
router.patch('/:id/pay', markOrderAsPaid);

// Esta ruta coincide con: PATCH http://localhost:3000/api/orders/ID_DE_ORDEN/cancel
router.patch('/:id/cancel', cancelOrder);

export default router;