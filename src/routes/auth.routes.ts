<<<<<<< HEAD
<<<<<<< HEAD
import { Router } from "express";
import {
  loginMethod,
  getTimeToken,
  updateToken,
  getAllUsers,
  saveUser,
  updateUser,
  deleteUser,
} from "../controller/auth.controller";

const router = Router();

// Tus rutas existentes...
router.post("/login", loginMethod);
router.get("/token-time/:userId", getTimeToken);
router.put("/update-token/:userId", updateToken);
router.get("/users", getAllUsers);
router.post("/save", saveUser);

// 🔧 Asegúrate de tener estas dos rutas también:
router.put("/update/:userId", updateUser);   // <-- Esta es la de actualizar
router.delete("/delete/:userId", deleteUser); // <-- Esta es la de eliminar lógica

export default router;
=======
import { Router } from "express";
=======
import { Router } from 'express';
>>>>>>> b9757a5b (Clase 17-06-25)
import {
    loginMethod,
    saveUser,
    getAllUsers,
    getUserByUsername,
    updateUser,
    deleteUser,
    getTimeToken,
    updateToken
} from '../controller/auth.controller';

const router = Router();

// Ruta para iniciar sesión y obtener un token
router.post('/login', loginMethod);

// --- Rutas para la gestión de usuarios (CRUD) ---

<<<<<<< HEAD
export default router;
>>>>>>> 9635b2c (Primer commit)
=======
// Crear un nuevo usuario
router.post('/users', saveUser);

// Obtener la lista de usuarios. También permite buscar por username con /users?username=...
router.get('/users', getAllUsers);

// Obtener un usuario específico por su 'username'
router.get('/users/:username', getUserByUsername);

// Actualizar un usuario por su ID
router.put('/users/:userId', updateUser);

// Eliminar (lógicamente) un usuario por su ID
router.delete('/users/:userId', deleteUser);


// --- Rutas para la gestión del Token ---

// Verificar el tiempo de vida de un token
router.get('/token/:userId', getTimeToken);

// Actualizar/renovar el tiempo de vida de un token
router.patch('/token/:userId', updateToken);


export default router;
>>>>>>> b9757a5b (Clase 17-06-25)
