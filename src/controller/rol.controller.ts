import { Request, Response } from 'express';
import { Rol } from '../models/Rol';

// Crear un nuevo Rol
export const createRol = async (req: Request, res: Response) => {
    try {
        const newRol = new Rol(req.body);
        await newRol.save();
        res.status(201).json(newRol);
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'El nombre del rol ya existe.' });
        }
        res.status(500).json({ message: 'Error al crear el rol' });
    }
};

// Obtener todos los Roles
export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await Rol.find({ status: true });
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los roles' });
    }
};

// Actualizar un Rol
export const updateRol = async (req: Request, res: Response) => {
    try {
        const updatedRol = await Rol.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRol) return res.status(404).json({ message: 'Rol no encontrado' });
        res.status(200).json(updatedRol);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el rol' });
    }
};

// Eliminar un Rol (Físico)
export const deleteRol = async (req: Request, res: Response) => {
    try {
        const deletedRol = await Rol.findByIdAndDelete(req.params.id);
        if (!deletedRol) return res.status(404).json({ message: 'Rol no encontrado' });
        res.status(200).json({ message: 'Rol eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el rol' });
    }
};