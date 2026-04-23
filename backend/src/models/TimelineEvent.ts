import mongoose, { Schema, Document } from 'mongoose';
import { ITimelineEvent, EventType } from '../../shared/types/index';

interface TimelineEventDocument extends ITimelineEvent, Document {}

const timelineEventSchema = new Schema<TimelineEventDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    invoiceId: {
      type: Schema.Types.ObjectId,
      ref: 'Invoice',
      default: null,
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      default: null,
    },
    type: {
      type: String,
      enum: Object.values(EventType),
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
timelineEventSchema.index({ userId: 1, createdAt: -1 });
timelineEventSchema.index({ invoiceId: 1 });
timelineEventSchema.index({ clientId: 1 });
timelineEventSchema.index({ type: 1 });

export const TimelineEvent = mongoose.model<TimelineEventDocument>(
  'TimelineEvent',
  timelineEventSchema
);
export default TimelineEvent;
