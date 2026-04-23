import mongoose, { Schema, Document } from 'mongoose';
import { IInvoice, InvoiceStatus, PaymentMethod } from '../../shared/types/index';

interface InvoiceDocument extends IInvoice, Document {}

const invoiceItemSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
});

const invoiceSchema = new Schema<InvoiceDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: Object.values(InvoiceStatus),
      default: InvoiceStatus.DRAFT,
    },
    items: [invoiceItemSchema],
    notes: {
      type: String,
      default: null,
    },
    riskScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    lastReminder: {
      type: Date,
      default: null,
    },
    remindersCount: {
      type: Number,
      default: 0,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
invoiceSchema.index({ userId: 1 });
invoiceSchema.index({ clientId: 1 });
invoiceSchema.index({ status: 1 });
invoiceSchema.index({ dueDate: 1 });
invoiceSchema.index({ userId: 1, createdAt: -1 });
invoiceSchema.index({ userId: 1, status: 1 });

export const Invoice = mongoose.model<InvoiceDocument>('Invoice', invoiceSchema);
export default Invoice;
