// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  isEmailVerified: boolean;
  
  // Subscription related fields
  subscription: {
    plan: 'free' | 'basic' | 'premium';
    status: 'active' | 'inactive' | 'canceled';
    startDate: Date;
    endDate: Date;
    autoRenew: boolean;
    paymentHistory: Array<{
      amount: number;
      date: Date;
      status: 'success' | 'failed';
      transactionId: string;
    }>;
  };
  
  // Resource access tracking
  resourceAccess: {
    freeResourcesAccessed: Array<{
      resourceId: mongoose.Types.ObjectId;
      accessDate: Date;
      resourceType: 'template' | 'image' | 'document';
    }>;
    downloadCount: {
      monthly: number;
      lastResetDate: Date;
    };
    favorites: mongoose.Types.ObjectId[];
  };
  
  // User preferences and profile
  profile: {
    company?: string;
    phone?: string;
    avatar?: string;
    location?: string;
    realEstateSpecialty?: string[];
  };
  
  // Notification preferences
  notifications: {
    email: boolean;
    subscriptionAlerts: boolean;
    newResourceAlerts: boolean;
  };
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'canceled'],
      default: 'active'
    },
    startDate: Date,
    endDate: Date,
    autoRenew: {
      type: Boolean,
      default: true
    },
    paymentHistory: [{
      amount: Number,
      date: Date,
      status: {
        type: String,
        enum: ['success', 'failed']
      },
      transactionId: String
    }]
  },
  
  resourceAccess: {
    freeResourcesAccessed: [{
      resourceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
      },
      accessDate: {
        type: Date,
        default: Date.now
      },
      resourceType: {
        type: String,
        enum: ['template', 'image', 'document']
      }
    }],
    downloadCount: {
      monthly: {
        type: Number,
        default: 0
      },
      lastResetDate: {
        type: Date,
        default: Date.now
      }
    },
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource'
    }]
  },
  
  profile: {
    company: String,
    phone: String,
    avatar: String,
    location: String,
    realEstateSpecialty: [String]
  },
  
  notifications: {
    email: {
      type: Boolean,
      default: true
    },
    subscriptionAlerts: {
      type: Boolean,
      default: true
    },
    newResourceAlerts: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Remove the individual index declarations and combine them
UserSchema.index(
  { 
    email: 1,
    'subscription.status': 1,
    'subscription.endDate': 1 
  }
);

// Helper method to check if user has active subscription
UserSchema.methods.hasActiveSubscription = function(): boolean {
  return this.subscription.status === 'active' && 
         (!this.subscription.endDate || new Date(this.subscription.endDate) > new Date());
};

// Helper method to check if user can access more free resources
UserSchema.methods.canAccessFreeResource = function(): boolean {
  const MONTHLY_FREE_LIMIT = 5;
  
  // Reset monthly count if it's a new month
  const lastReset = new Date(this.resourceAccess.downloadCount.lastResetDate);
  const now = new Date();
  if (lastReset.getMonth() !== now.getMonth() || lastReset.getFullYear() !== now.getFullYear()) {
    this.resourceAccess.downloadCount.monthly = 0;
    this.resourceAccess.downloadCount.lastResetDate = now;
  }
  
  return this.resourceAccess.downloadCount.monthly < MONTHLY_FREE_LIMIT;
};

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);