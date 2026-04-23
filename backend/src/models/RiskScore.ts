import mongoose, { Schema, Document } from 'mongoose';
import { IRiskScore, RiskLevel } from '../../shared/types/index';

interface RiskScoreDocument extends IRiskScore, Document {}

const riskScoreSchema = new Schema<RiskScoreDocument>(
  {
    invoiceId: {
      type: Schema.Types.ObjectId,
      ref: 'Invoice',
      required: true,
      unique: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    level: {
      type: String,
      enum: Object.values(RiskLevel),
      required: true,
    },
    factors: {
      daysOverdue: {
        type: Number,
        default: 0,
      },
      clientPaymentHistory: {
        type: Number,
        default: 0,
      },
      invoiceAge: {
        type: Number,
        default: 0,
      },
      outstandingAmount: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
riskScoreSchema.index({ invoiceId: 1 });
riskScoreSchema.index({ level: 1 });
riskScoreSchema.index({ score: -1 });

export const RiskScore = mongoose.model<RiskScoreDocument>('RiskScore', riskScoreSchema);
export default RiskScore;
