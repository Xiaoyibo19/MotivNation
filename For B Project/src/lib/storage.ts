import { Member, HabitLog } from "@/types";

const STORAGE_KEYS = {
  MEMBERS: 'motivnation_members',
  LOGS: 'motivnation_logs',
  CURRENT_MEMBER: 'motivnation_current_member',
} as const;

// Members
export const getMembers = (): Member[] => {
  const data = localStorage.getItem(STORAGE_KEYS.MEMBERS);
  return data ? JSON.parse(data) : [];
};

export const saveMember = (member: Member): void => {
  const members = getMembers();
  const existingIndex = members.findIndex(m => m.id === member.id);
  
  if (existingIndex >= 0) {
    members[existingIndex] = member;
  } else {
    members.push(member);
  }
  
  localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
};

export const getMemberById = (id: string): Member | undefined => {
  return getMembers().find(m => m.id === id);
};

// Logs
export const getLogs = (): HabitLog[] => {
  const data = localStorage.getItem(STORAGE_KEYS.LOGS);
  return data ? JSON.parse(data) : [];
};

export const saveLog = (log: HabitLog): void => {
  const logs = getLogs();
  logs.push(log);
  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
};

export const getLogsByMember = (memberId: string): HabitLog[] => {
  return getLogs().filter(log => log.memberId === memberId);
};

export const getMemberLogForDate = (memberId: string, date: string): HabitLog[] => {
  return getLogs().filter(log => 
    log.memberId === memberId && 
    log.date === date
  );
};

// Current member
export const getCurrentMember = (): Member | null => {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_MEMBER);
  return data ? JSON.parse(data) : null;
};

export const setCurrentMember = (member: Member | null): void => {
  if (member) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_MEMBER, JSON.stringify(member));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_MEMBER);
  }
};

// Demo data seeding
export const seedDemoData = (): void => {
  const demoMembers: Member[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      xp: 350,
      currentStreak: 12,
      bestStreak: 15,
      lastCheckIn: new Date().toISOString().split('T')[0],
      achievements: ['streak-7', 'xp-300'],
      joinDate: '2024-12-01',
    },
    {
      id: '2',
      name: 'Sam Chen',
      xp: 280,
      currentStreak: 8,
      bestStreak: 12,
      lastCheckIn: new Date().toISOString().split('T')[0],
      achievements: ['streak-7'],
      joinDate: '2024-12-05',
    },
    {
      id: '3',
      name: 'Jordan Taylor',
      xp: 150,
      currentStreak: 5,
      bestStreak: 8,
      lastCheckIn: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
      achievements: [],
      joinDate: '2024-12-10',
    },
  ];

  const demoLogs: HabitLog[] = [
    {
      id: '1',
      memberId: '1',
      date: new Date().toISOString().split('T')[0],
      habit: 'hydration',
      quantity: 8,
      xpEarned: 40,
    },
    {
      id: '2',
      memberId: '2',
      date: new Date().toISOString().split('T')[0],
      habit: 'workout',
      quantity: 1,
      xpEarned: 20,
    },
  ];

  localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(demoMembers));
  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(demoLogs));
};