export interface Member {
  id: string;
  name: string;
  xp: number;
  currentStreak: number;
  bestStreak: number;
  lastCheckIn: string;
  achievements: string[];
  joinDate: string;
}

export interface HabitLog {
  id: string;
  memberId: string;
  date: string;
  habit: 'hydration' | 'steps' | 'workout' | 'sleep';
  quantity: number;
  xpEarned: number;
  photo?: string;
  notes?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'streak' | 'xp' | 'habit';
}

export const HABIT_XP_RULES = {
  hydration: 5, // per glass
  steps: 5, // per 1,000 steps
  workout: 20, // per session
  sleep: 10, // per night (≥7h)
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'streak-7', name: '7-Day Warrior', description: '7 days in a row', icon: '⭐', requirement: 7, type: 'streak' },
  { id: 'streak-30', name: '30-Day Champion', description: '30 days in a row', icon: '🏆', requirement: 30, type: 'streak' },
  { id: 'streak-50', name: '50-Day Legend', description: '50 days in a row', icon: '💯', requirement: 50, type: 'streak' },
  { id: 'xp-300', name: 'XP Master', description: '300+ total XP', icon: '💪', requirement: 300, type: 'xp' },
];

export const getRankFromXP = (xp: number): { rank: string; badge: string } => {
  if (xp >= 500) return { rank: 'Gold', badge: '🥇' };
  if (xp >= 200) return { rank: 'Silver', badge: '🥈' };
  if (xp >= 50) return { rank: 'Bronze', badge: '🥉' };
  return { rank: 'Newbie', badge: '🌱' };
};