// src/models/User.ts
import mongoose from 'mongoose';

export interface IUser {
  firstName: string;
  birthDate: Date;
  lastMood?: {
    mood: string;
    timestamp: Date;
  };
  memories: {
    date: Date;
    title: string;
    description: string;
    imageUrl?: string;
  }[];
  activities: {
    type: string;
    completed: boolean;
    date: Date;
  }[];
  createdAt: Date;
  lastLogin: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  lastMood: {
    mood: String,
    timestamp: Date,
  },
  memories: [{
    date: Date,
    title: String,
    description: String,
    imageUrl: String,
  }],
  activities: [{
    type: String,
    completed: Boolean,
    date: Date,
  }],
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>('User', userSchema);