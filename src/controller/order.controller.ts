import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { User } from '../models/User';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { idUser, products } = req.body;
        const user = await User.findById(idUser);
        if (!user || !user.status) {
            return res.status(404).json({ message: 'Usuario no encontrado o inactivo.' });
        }
        let totalAmount = 0;
        const updatedProductOperations = [];
        const productsForDB = []; // <-- ARRAY NUEVO para guardar los productos con precio

        for (const item of products) {
            const productDB = await Product.findById(item.productId);
            if (!productDB || !productDB.status) {
                return res.status(404).json({ message: `Producto con ID ${item.productId} no encontrado o inactivo.` });
            }
            if (productDB.quantity < item.quantity) {
                return res.status(400).json({ message: `Stock insuficiente para ${productDB.name}.` });
            }
            const newQuantity = productDB.quantity - item.quantity;
            totalAmount += item.quantity * productDB.price;
            updatedProductOperations.push(
                Product.updateOne({ _id: item.productId }, { quantity: newQuantity })
            );
            
            // ========================================================================
            // LÍNEA CLAVE AÑADIDA: Llenamos el nuevo array con el precio de la BD
            // ========================================================================
            productsForDB.push({ 
                productId: item.productId, 
                quantity: item.quantity, 
                price: productDB.price // <-- Aquí añadimos el precio
            });
        }

        await Promise.all(updatedProductOperations);

        const newOrder = new Order({
            idUser,
            products: productsForDB, // <-- Usamos el nuevo array con los precios
            status: 'pending',
            totalAmount
        });
        await newOrder.save();
        
        res.status(201).json(newOrder);

    } catch (error: any) {
        // La validación de Mongoose puede lanzar errores, los capturamos aquí
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Error de validación", error: error.message });
        }
        res.status(500).json({ message: 'Error al crear la orden', error: error.message });
    }
};

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find()
            .populate('idUser', 'username email')
            .populate('products.productId', 'name');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las órdenes' });
    }
};

export const getOrdersByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ idUser: userId })
            .populate('products.productId', 'name price');
        
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No se encontraron órdenes para este usuario.'});
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las órdenes del usuario' });
    }
};

// Importa Product al inicio del archivo si no lo tienes ya
import { Product } from '../models/Product';


// ... (aquí van tus funciones existentes: createOrder, getAllOrders, etc.) ...


// ========================================================================
// NUEVA FUNCIÓN: Cambia el estado de una orden a "pagado"
// ========================================================================
export const markOrderAsPaid = async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada." });
        }

        // Solo se puede pagar una orden que está pendiente
        if (order.status !== 'pending') {
            return res.status(400).json({ message: `No se puede pagar una orden con estado '${order.status}'.` });
        }

        order.status = 'pagado';
        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);

    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar la orden', error: error.message });
    }
};

// ========================================================================
// NUEVA FUNCIÓN: Cambia el estado a "cancelado" y devuelve el stock
// ========================================================================
export const cancelOrder = async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada." });
        }

        // No se puede cancelar una orden ya enviada o entregada
        if (order.status === 'shipped' || order.status === 'delivered') {
            return res.status(400).json({ message: `No se puede cancelar una orden con estado '${order.status}'.` });
        }

        // Si la orden ya está cancelada, no hacer nada
        if (order.status === 'cancelled') {
            return res.status(200).json(order);
        }

        // Devolver el stock de los productos al inventario
        for (const item of order.products) {
            await Product.updateOne(
                { _id: item.productId },
                { $inc: { quantity: item.quantity } } // $inc incrementa el campo quantity
            );
        }

        order.status = 'cancelled';
        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);

    } catch (error: any) {
        res.status(500).json({ message: 'Error al cancelar la orden', error: error.message });
    }
};