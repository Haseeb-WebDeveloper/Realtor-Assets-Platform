import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
    user: mongoose.Types.ObjectId;
    title: string;
    message: string;
    type: 'subscription' | 'download' | 'system' | 'payment';
    status: 'unread' | 'read';
    link?: string;
  }
  
  const NotificationSchema = new Schema<INotification>({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['subscription', 'download', 'system', 'payment'],
      required: true,
    },
    status: {
      type: String,
      enum: ['unread', 'read'],
      default: 'unread',
    },
    link: String,
  }, {
    timestamps: true,
  });
  
  export const Notification = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);