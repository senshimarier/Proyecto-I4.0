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
>>>>>>> 9635b2c (Primer commit)
