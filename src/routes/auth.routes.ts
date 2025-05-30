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
>>>>>>> 9635b2c (Primer commit)
