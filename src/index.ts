<<<<<<< HEAD
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import connectDB from "./config/db";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.use("/api/auth", authRoutes);

// Conexión a la base de datos y levantamiento del servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("El servidor está en el puerto:", PORT);
  });
});
=======
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db";

// --- IMPORTACIÓN DE RUTAS ---
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes"; // <-- AÑADIDO
import rolRoutes from "./routes/rol.routes";         // <-- AÑADIDO
import orderRoutes from "./routes/order.routes";     // <-- AÑADIDO

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES ---
app.use(express.json()); // Para entender JSON
app.use(morgan("dev"));    // Para ver logs de peticiones en consola

// --- RUTAS ---
app.use("/api/auth", authRoutes);                  // Tus rutas existentes
app.use("/api/products", productRoutes);           // <-- AÑADIDO
app.use("/api/roles", rolRoutes);                  // <-- AÑADIDO
app.use("/api/orders", orderRoutes);               // <-- AÑADIDO

// Conexión a la base de datos y levantamiento del servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("El servidor está en el puerto:", PORT);
  });
<<<<<<< HEAD
});
>>>>>>> 9635b2c (Primer commit)
=======
});
>>>>>>> b9757a5b (Clase 17-06-25)
