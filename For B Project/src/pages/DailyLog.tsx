import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Member, HabitLog, HABIT_XP_RULES } from "@/types";
import { getCurrentMember, getMembers, saveLog, getMemberLogForDate, saveMember } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Clock, Trophy, CheckCircle, Camera } from "lucide-react";

const DailyLog = () => {
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [habit, setHabit] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [timeUntilMidnight, setTimeUntilMidnight] = useState<string>("");
  const { toast } = useToast();

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const member = getCurrentMember();
    setCurrentMember(member);
    setMembers(getMembers());
    
    if (member) {
      setSelectedMember(member.id);
      checkIfLoggedToday(member.id);
    }

    // Update countdown timer
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setDate(midnight.getDate() + 1);
      midnight.setHours(0, 0, 0, 0);
      
      const diff = midnight.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeUntilMidnight(`${hours}h ${minutes}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  const checkIfLoggedToday = (memberId: string) => {
    const logs = getMemberLogForDate(memberId, today);
    setHasLoggedToday(logs.length > 0);
  };

  const handleSubmit = () => {
    if (!selectedMember || !habit || !quantity) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const member = members.find(m => m.id === selectedMember);
    if (!member) return;

    const quantityNum = parseFloat(quantity);
    let xpEarned = 0;

    switch (habit) {
      case 'hydration':
        xpEarned = quantityNum * HABIT_XP_RULES.hydration;
        break;
      case 'steps':
        xpEarned = Math.floor(quantityNum / 1000) * HABIT_XP_RULES.steps;
        break;
      case 'workout':
        xpEarned = quantityNum * HABIT_XP_RULES.workout;
        break;
      case 'sleep':
        xpEarned = quantityNum >= 7 ? HABIT_XP_RULES.sleep : 0;
        break;
    }

    const newLog: HabitLog = {
      id: Date.now().toString(),
      memberId: selectedMember,
      date: today,
      habit: habit as any,
      quantity: quantityNum,
      xpEarned,
      photo: photo ? URL.createObjectURL(photo) : undefined,
    };

    saveLog(newLog);

    // Update member stats
    const updatedMember = { ...member };
    updatedMember.xp += xpEarned;
    updatedMember.lastCheckIn = today;
    
    // Update streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (member.lastCheckIn === yesterdayStr) {
      updatedMember.currentStreak += 1;
    } else if (member.lastCheckIn === today) {
      // Already logged today, don't update streak
    } else {
      updatedMember.currentStreak = 1;
    }
    
    if (updatedMember.currentStreak > updatedMember.bestStreak) {
      updatedMember.bestStreak = updatedMember.currentStreak;
    }

    saveMember(updatedMember);
    setMembers(getMembers());
    setHasLoggedToday(true);

    toast({
      title: "Habit logged! 🎉",
      description: `+${xpEarned} XP earned! Keep building that streak!`,
    });

    // Reset form
    setHabit("");
    setQuantity("");
    setPhoto(null);
  };

  const getHabitEmoji = (habitType: string) => {
    switch (habitType) {
      case 'hydration': return '💧';
      case 'steps': return '🚶';
      case 'workout': return '🏋️';
      case 'sleep': return '😴';
      default: return '⭐';
    }
  };

  const getHabitUnit = (habitType: string) => {
    switch (habitType) {
      case 'hydration': return 'glasses';
      case 'steps': return 'steps';
      case 'workout': return 'sessions';
      case 'sleep': return 'hours';
      default: return '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-heading font-bold mb-4 text-foreground">
          Daily Log 📝
        </h1>
        <p className="text-lg text-muted-foreground">
          Track your healthy habits and earn XP!
        </p>
      </div>

      {/* Status Banner */}
      <Card className={`mb-8 border-2 animate-slide-in ${
        hasLoggedToday 
          ? 'bg-gradient-success border-success' 
          : 'bg-gradient-warning border-warning'
      }`}>
        <CardContent className="p-6 text-center text-white">
          {hasLoggedToday ? (
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="w-8 h-8" />
              <div>
                <h3 className="font-heading font-bold text-xl">You logged today! ✅</h3>
                <p className="text-lg opacity-90">Great job keeping up your streak!</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-8 h-8" />
              <div>
                <h3 className="font-heading font-bold text-xl">Don't lose your streak! ⏰</h3>
                <p className="text-lg opacity-90">{timeUntilMidnight} left to log today</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Logging Form */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card border-2 shadow-lg animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="font-heading">Log Today's Habits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Member</label>
                <Select value={selectedMember} onValueChange={setSelectedMember}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Choose member" />
                  </SelectTrigger>
                  <SelectContent>
                    {members.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name} ({member.xp} XP)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Habit Type</label>
                <Select value={habit} onValueChange={setHabit}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Choose habit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hydration">💧 Hydration</SelectItem>
                    <SelectItem value="steps">🚶 Steps</SelectItem>
                    <SelectItem value="workout">🏋️ Workout</SelectItem>
                    <SelectItem value="sleep">😴 Sleep</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Quantity {habit && `(${getHabitUnit(habit)})`}
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Proof Photo (Optional)</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                    className="rounded-xl"
                  />
                  <Camera className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <Button 
                onClick={handleSubmit}
                variant="hero"
                size="lg"
                className="w-full"
                disabled={!selectedMember || !habit || !quantity}
              >
                Log Habit & Earn XP! 🎯
              </Button>

              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link to="/leaderboard">
                  <Trophy className="w-4 h-4 mr-2" />
                  View Leaderboard
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* XP Rules */}
        <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <Card className="bg-gradient-primary border-2 shadow-xl sticky top-24">
            <CardHeader>
              <CardTitle className="text-white font-heading">⚡ XP Rules</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    💧 Hydration
                  </span>
                  <span className="font-bold">5 XP / glass</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    🚶 Steps
                  </span>
                  <span className="font-bold">5 XP / 1K steps</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    🏋️ Workout
                  </span>
                  <span className="font-bold">20 XP / session</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    😴 Sleep
                  </span>
                  <span className="font-bold">10 XP / night</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/20">
                <p className="text-sm opacity-90">
                  💡 Sleep XP requires ≥7 hours for full points!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DailyLog;