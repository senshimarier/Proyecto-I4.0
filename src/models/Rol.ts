import { Document, Types, Schema, model } from "mongoose";

export interface IRol extends Document {
    id: Types.ObjectId;
    name: string;
    type: string;
    status: boolean;
}

const rolSchema = new Schema<IRol>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
});


export const Rol = model<IRol>('Rol', rolSchema, 'rol');