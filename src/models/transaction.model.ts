import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
    user: mongoose.Types.ObjectId;
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    paymentMethod: string;
    stripePaymentId?: string;
    subscriptionPlan: mongoose.Types.ObjectId;
    billingDetails: {
      name: string;
      email: string;
      address?: string;
    };
  }
  
  const TransactionSchema = new Schema<ITransaction>({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: String,
    stripePaymentId: String,
    subscriptionPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubscriptionPlan',
      required: true,
    },
    billingDetails: {
      name: String,
      email: String,
      address: String,
    },
  }, {
    timestamps: true,
  });
  

  export const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);