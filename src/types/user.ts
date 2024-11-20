// src/types/user.ts
export interface UserData {
    id?: string;
    firstName: string;
    birthDate: Date;
    pet?: {
      has: boolean;
      type?: 'dog' | 'cat';
      name?: string;
    };
    lastMood?: {
      mood: string;
      timestamp: Date;
    };
  }