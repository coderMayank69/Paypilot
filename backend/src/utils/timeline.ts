import { TimelineEvent } from '../models/index';
import { EventType } from '../../shared/types/index';
import { Types } from 'mongoose';

export const createTimelineEvent = async (
  userId: string | Types.ObjectId,
  type: EventType,
  description: string,
  invoiceId?: string | Types.ObjectId,
  clientId?: string | Types.ObjectId,
  metadata?: any
) => {
  const event = new TimelineEvent({
    userId,
    type,
    description,
    invoiceId: invoiceId || null,
    clientId: clientId || null,
    metadata: metadata || {},
  });

  await event.save();
  return event;
};

export const getTimelineEvents = async (
  userId: string | Types.ObjectId,
  limit: number = 50,
  skip: number = 0
) => {
  const events = await TimelineEvent.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .populate('invoiceId', 'invoiceNumber amount status')
    .populate('clientId', 'name email');

  return events;
};

export const getEventCount = async (userId: string | Types.ObjectId) => {
  return TimelineEvent.countDocuments({ userId });
};
