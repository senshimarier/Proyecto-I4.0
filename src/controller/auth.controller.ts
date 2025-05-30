import { Request, Response } from "express";
import { generateAccessToken, verifyOurToken } from "../utils/token";
import { cache } from "../utils/cache";
import dayjs from "dayjs";
import { User } from "../models/User";
import bcrypt from "bcrypt";

// ========================== LOGIN ==========================
export const loginMethod = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;
    const pwd = String(password);

    try {
        const user = await User.findOne({ username });

        if (!user || user.status === false) {
            return res.status(401).json({ message: "Credenciales incorrectas o usuario inactivo" });
        }

        const isMatch = await bcrypt.compare(pwd, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        const userId = user._id.toString();
        const accessToken = generateAccessToken({
            userId,
            username: user.username,
            role: user.role
        });

        cache.set(userId, accessToken, 60 * 15);
        console.log("LOGIN SUCCESSFUL - User ID stored in cache:", userId);

        return res.json({
            accessToken,
            message: "¡Login exitoso! Generado por Fer."
        });
    } catch (error) {
        console.error("Error en el login:", error);
        return res.status(500).json({ message: "Error interno del servidor durante el login" });
    }
};

// =================== TOKEN - VER Y ACTUALIZAR ===================
export const getTimeToken = (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    const verification = verifyOurToken(token);
    if (!verification.isValid) {
        return res.status(401).json({ message: verification.message });
    }

    const { userId } = req.params;
    const ttl = cache.getTtl(userId);

    if (!ttl) {
        return res.status(404).json({ message: "Token no encontrado en caché" });
    }

    const now = Date.now();
    const timeToLife = Math.floor((ttl - now) / 1000);
    const expTime = dayjs(ttl).format("HH:mm:ss");

    return res.json({
        userId,
        timeToLife,
        expTime,
        message: `Token válido hasta las ${expTime}`,
    });
};

export const updateToken = (req: Request, res: Response) => {
    const { userId } = req.params;
    const ttl = cache.getTtl(userId);

    if (!ttl) {
        return res.status(404).json({ message: "Token no encontrado en caché" });
    }

    const newTimeToken = 60 * 15;
    cache.ttl(userId, newTimeToken);

    res.json({ message: "Tiempo de vida de token actualizado" });
};

// ==================== USUARIOS ====================
export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username } = req.query;

        if (username) {
            const users = await User.find({ username: username }).select('-password -__v');
            return res.json(users);
        }

        const userList = await User.find().select('-password -__v');
        return res.json(userList);

    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getUserByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username }).select('-password -__v');

        if (!user) {
            return res.status(404).json({ message: `Usuario con username '${username}' no encontrado` });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el usuario', error });
    }
};

export const saveUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { firstName, lastName, username, email, password, role } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            role,
            status: true,
            createDate: new Date()
        });

        const user = await newUser.save();
        return res.json({
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName
            },
            message: "Usuario creado exitosamente"
        });

    } catch (error) {
        console.error("Error al guardar usuario:", error);
        if (error.code === 11000) {
            return res.status(409).json({ message: "El usuario o email ya existe." });
        }
        return res.status(500).json({ message: "Error al crear el usuario" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { firstName, lastName, email, password, role } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const userEmail = await User.findOne({ email });
        if (userEmail && userEmail.id !== user.id) {
            return res.status(400).json({ message: "Correo electrónico ya existente" });
        }

        if (password != null) {
            const saltRounds = 10;
            user.password = await bcrypt.hash(password, saltRounds);
        }

        user.email = email;
        user.role = role;
        user.firstName = firstName;
        user.lastName = lastName;

        const updateUser = await user.save();
        return res.json({ updateUser });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.status = false;
    const deleteUser = await user.save();
    return res.json({ deleteUser });
};
