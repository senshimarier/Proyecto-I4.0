<<<<<<< HEAD
import { promises } from "dns"
import mongoose from "mongoose";

//user/pass
const mongoUri = "mongodb://127.0.0.1:27017/proyecto?authSource=admin";
const mongoUriLocal=  "mongodb://localhost:27017/proyecto";

const connectDB = async ():Promise<void>=>{
    try {
        await mongoose.connect(mongoUri);
        console.log("Conexión a base datos: MongoDB exitosa")

    } catch (error) {
        console.log("Error de conexión: ", error)
    }
}

export default connectDB;
=======
import { promises } from "dns"
import mongoose from "mongoose";

//user/pass
const mongoUri = "mongodb://127.0.0.1:27017/proyecto?authSource=admin";
const mongoUriLocal=  "mongodb://localhost:27017/proyecto";

const connectDB = async ():Promise<void>=>{
    try {
        await mongoose.connect(mongoUri);
        console.log("Conexión a base datos: MongoDB exitosa")

    } catch (error) {
        console.log("Error de conexión: ", error)
    }
}

export default connectDB;
>>>>>>> 9635b2c (Primer commit)
