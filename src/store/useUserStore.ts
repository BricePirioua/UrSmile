// src/store/useUserStore.ts
import { create } from 'zustand';

type UserStore = {
  mood: string | null;
  dailyAffirmation: string | null;
  setMood: (mood: string) => void;
  setDailyAffirmation: (affirmation: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  mood: null,
  dailyAffirmation: null,
  setMood: (mood) => set({ mood }),
  setDailyAffirmation: (affirmation) => set({ dailyAffirmation }),
}));