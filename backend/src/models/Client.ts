import mongoose, { Schema, Document } from 'mongoose';
import { IClient } from '../../shared/types/index';

interface ClientDocument extends IClient, Document {}

const clientSchema = new Schema<ClientDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    buyerId: {
      type: String,
      default: null,
    },
    paymentTerms: {
      type: Number,
      default: 30,
    },
    totalInvoices: {
      type: Number,
      default: 0,
    },
    totalOutstanding: {
      type: Number,
      default: 0,
    },
    lastInvoiceDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
clientSchema.index({ userId: 1 });
clientSchema.index({ email: 1 });
clientSchema.index({ userId: 1, createdAt: -1 });

export const Client = mongoose.model<ClientDocument>('Client', clientSchema);
export default Client;
