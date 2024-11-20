// src/store/useUserStore.ts
import { create } from 'zustand';

interface UserState {
  mood: string | null;
  dailyAffirmation: string | null;
  setMood: (mood: string) => void;
  setDailyAffirmation: (dailyAffirmation: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  mood: null,
  dailyAffirmation: null,
  setMood: (mood) => set({ mood }),
  setDailyAffirmation: (dailyAffirmation) => set({ dailyAffirmation })
}));

export default useUserStore;