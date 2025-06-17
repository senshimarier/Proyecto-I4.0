import { Document, Types, Schema, model } from "mongoose";

export interface IProduct extends Document {
    id: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    status: boolean;
    desc: string;
    createDate: Date;
    deleteDate?: Date;
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    status: {
        type: Boolean,
        default: true,
    },
    desc: {
        type: String,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    deleteDate: {
        type: Date,
    },
});

export const Product = model<IProduct>('Product', productSchema, 'product');