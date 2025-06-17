import { Request, Response } from 'express';
import { Product } from '../models/Product';

// Crear un nuevo producto
export const createProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ message: "Error al crear el producto" });
    }
};

// Obtener todos los productos
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({ status: true });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos" });
    }
};

// Obtener un producto por ID
export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto" });
    }
};

// Actualizar un producto
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Producto no encontrado" });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto" });
    }
};

// Eliminar un producto (Lógica suave)
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });

        product.status = false;
        product.deleteDate = new Date();
        await product.save();
        
        res.status(200).json({ message: "Producto desactivado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto" });
    }
};