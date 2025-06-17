<<<<<<< HEAD
import jwt from "jsonwebtoken";
import { cache } from "./cache"; // Importa la caché compartida

const ACCESS_SECRET = process.env.JWT_SECRET || "secret1234utd";

// ✅ Nueva versión: Generar token con payload completo
export const generateAccessToken = (payload: { userId: string, username: string, role: string }) => {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
};

// ✅ Método para verificar token
export const verifyOurToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, ACCESS_SECRET) as { userId: string, username: string, role: string };

        // Verificar que esté en caché
        const cachedToken = cache.get(decoded.userId);
        if (!cachedToken || cachedToken !== token) {
            throw new Error("Token no generado por esta app");
        }

        return {
            isValid: true,
            userId: decoded.userId,
            username: decoded.username,
            role: decoded.role,
            message: "Token válido y generado por esta Fers"
        };
    } catch (error) {
        return {
            isValid: false,
            message: "Token inválido: " + error.message
        };
    }
};
=======
import jwt from "jsonwebtoken";
import { cache } from "./cache";

const ACCESS_SECRET = process.env.JWT_SECRET || "secret1234utd";

// ✅ CAMBIO: El payload ahora espera un arreglo de strings para 'role'
export const generateAccessToken = (payload: { userId: string, username: string, role: string[] }) => {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
};

// ✅ CAMBIO: La verificación ahora decodifica 'role' como un arreglo de strings
export const verifyOurToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, ACCESS_SECRET) as { userId: string, username: string, role: string[] };

        // Verificar que esté en caché
        const cachedToken = cache.get(decoded.userId);
        if (!cachedToken || cachedToken !== token) {
            throw new Error("Token no generado por esta app");
        }

        return {
            isValid: true,
            userId: decoded.userId,
            username: decoded.username,
            role: decoded.role,
            message: "Token válido y generado por esta Fers"
        };
    } catch (error) {
        return {
            isValid: false,
            message: "Token inválido: " + error.message
        };
    }
<<<<<<< HEAD
};
>>>>>>> 9635b2c (Primer commit)
=======
};
>>>>>>> b9757a5b (Clase 17-06-25)
