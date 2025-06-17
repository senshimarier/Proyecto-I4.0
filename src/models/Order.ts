import { Document, Types, Schema, model, models } from "mongoose";
import { Product } from "./Product";

export interface IOrderProduct extends Document {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    id: Types.ObjectId;
    idUser: Types.ObjectId;
    date: Date;
    status: string;
    products: IOrderProduct[];
    totalAmount: number;
}

const orderProductSchema = new Schema<IOrderProduct>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
    },
}, {_id: false});

const orderSchema = new Schema<IOrder>({
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
        // AÑADIMOS "pagado" A LA LISTA DE VALORES PERMITIDOS
        enum: ["pending", "processing", "shipped", "delivered", "cancelled", "pagado"],
        default: "pending",
    },
    products: [orderProductSchema],
    totalAmount: {
        type: Number,
        required: true,
    },
});

export const Order = model<IOrder>('Order', orderSchema, 'order');
