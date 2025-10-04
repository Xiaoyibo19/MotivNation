import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Member, ACHIEVEMENTS, getRankFromXP } from "@/types";
import { getMembers, getLogs } from "@/lib/storage";
import { Trophy, Medal, Flame, Star } from "lucide-react";

const Leaderboard = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const allMembers = getMembers();
    const logs = getLogs();
    const today = new Date().toISOString().split('T')[0];

    // Calculate current streaks and update achievements
    const updatedMembers = allMembers.map(member => {
      const memberLogs = logs.filter(log => log.memberId === member.id);
      
      // Check if logged today for current streak
      const loggedToday = memberLogs.some(log => log.date === today);
      let currentStreak = member.currentStreak;
      
      if (!loggedToday && member.lastCheckIn !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (member.lastCheckIn !== yesterdayStr) {
          currentStreak = 0; // Streak broken
        }
      }

      // Calculate achievements
      const achievements = [...member.achievements];
      ACHIEVEMENTS.forEach(achievement => {
        if (!achievements.includes(achievement.id)) {
          let qualifies = false;
          
          switch (achievement.type) {
            case 'streak':
              qualifies = member.bestStreak >= achievement.requirement;
              break;
            case 'xp':
              qualifies = member.xp >= achievement.requirement;
              break;
          }
          
          if (qualifies) {
            achievements.push(achievement.id);
          }
        }
      });

      return {
        ...member,
        currentStreak,
        achievements,
      };
    });

    // Sort by XP descending
    const sortedMembers = updatedMembers.sort((a, b) => b.xp - a.xp);
    setMembers(sortedMembers);
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-warning border-yellow-400 shadow-lg';
      case 2: return 'bg-gray-100 border-gray-300 shadow-md';
      case 3: return 'bg-orange-100 border-orange-300 shadow-md';
      default: return 'bg-gradient-card border-border';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-600" />;
      case 2: return <Medal className="w-6 h-6 text-gray-600" />;
      case 3: return <Medal className="w-6 h-6 text-orange-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground">{rank}</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-heading font-bold mb-4 text-foreground">
          🏆 Leaderboard
        </h1>
        <p className="text-lg text-muted-foreground">
          See who's leading the charge in building healthy habits!
        </p>
      </div>

      {members.length === 0 ? (
        <Card className="bg-gradient-card border-2 text-center p-8">
          <CardContent>
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-xl font-heading font-bold mb-2">No members yet!</h3>
            <p className="text-muted-foreground">Be the first to join and start building habits.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <Card className="bg-gradient-card border-2 shadow-lg animate-slide-in">
              <CardHeader>
                <CardTitle className="font-heading">Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-heading">#</th>
                        <th className="text-left py-2 font-heading">Member</th>
                        <th className="text-left py-2 font-heading">XP</th>
                        <th className="text-left py-2 font-heading">Rank</th>
                        <th className="text-left py-2 font-heading">🔥 Current</th>
                        <th className="text-left py-2 font-heading">🏅 Best</th>
                        <th className="text-left py-2 font-heading">Achievements</th>
                        <th className="text-left py-2 font-heading">Last Check-in</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member, index) => {
                        const rank = index + 1;
                        const { rank: tierName, badge } = getRankFromXP(member.xp);
                        
                        return (
                          <tr 
                            key={member.id} 
                            className={`border-b hover:bg-accent/50 transition-colors animate-slide-in`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <td className="py-4">
                              <div className="flex items-center gap-2">
                                {getRankIcon(rank)}
                              </div>
                            </td>
                            <td className="py-4">
                              <div className="font-bold text-lg">{member.name}</div>
                            </td>
                            <td className="py-4">
                              <span className="font-bold text-primary">{member.xp}</span>
                            </td>
                            <td className="py-4">
                              <Badge className={`badge-${tierName.toLowerCase()}`}>
                                {badge} {tierName}
                              </Badge>
                            </td>
                            <td className="py-4">
                              <span className="flex items-center gap-1">
                                <Flame className="w-4 h-4 text-orange-500" />
                                {member.currentStreak}
                              </span>
                            </td>
                            <td className="py-4">
                              <span className="flex items-center gap-1">
                                <Medal className="w-4 h-4 text-gold" />
                                {member.bestStreak}
                              </span>
                            </td>
                            <td className="py-4">
                              <div className="flex flex-wrap gap-1">
                                {member.achievements.map(achievementId => {
                                  const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
                                  return achievement ? (
                                    <span key={achievementId} title={achievement.description} className="text-xl">
                                      {achievement.icon}
                                    </span>
                                  ) : null;
                                })}
                              </div>
                            </td>
                            <td className="py-4 text-muted-foreground">
                              {formatDate(member.lastCheckIn)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {members.map((member, index) => {
              const rank = index + 1;
              const { rank: tierName, badge } = getRankFromXP(member.xp);
              
              return (
                <Card 
                  key={member.id} 
                  className={`${getRankStyle(rank)} border-2 animate-slide-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getRankIcon(rank)}
                        <div>
                          <h3 className="font-heading font-bold text-lg">{member.name}</h3>
                          <Badge className={`badge-${tierName.toLowerCase()}`}>
                            {badge} {tierName}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary text-xl">{member.xp} XP</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span>Current: {member.currentStreak}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Medal className="w-4 h-4 text-gold" />
                        <span>Best: {member.bestStreak}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex gap-1">
                        {member.achievements.map(achievementId => {
                          const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
                          return achievement ? (
                            <span key={achievementId} title={achievement.description} className="text-lg">
                              {achievement.icon}
                            </span>
                          ) : null;
                        })}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Last: {formatDate(member.lastCheckIn)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;