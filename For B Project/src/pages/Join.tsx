import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Member } from "@/types";
import { getMembers, saveMember, setCurrentMember, seedDemoData } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { Users, Plus, Sparkles } from "lucide-react";

const Join = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setMembers(getMembers());
  }, []);

  const handleCreateMember = () => {
    if (!newMemberName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to join MotivNation!",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const newMember: Member = {
      id: Date.now().toString(),
      name: newMemberName.trim(),
      xp: 0,
      currentStreak: 0,
      bestStreak: 0,
      lastCheckIn: '',
      achievements: [],
      joinDate: new Date().toISOString().split('T')[0],
    };

    saveMember(newMember);
    setCurrentMember(newMember);
    
    toast({
      title: "Welcome to MotivNation! 🎉",
      description: `Hey ${newMember.name}! Ready to build some amazing habits?`,
    });

    setTimeout(() => {
      navigate("/log");
    }, 1000);
  };

  const handleSelectMember = (member: Member) => {
    setCurrentMember(member);
    toast({
      title: `Welcome back, ${member.name}! 👋`,
      description: "Ready to continue your habit journey?",
    });
    navigate("/log");
  };

  const handleSeedDemo = () => {
    seedDemoData();
    setMembers(getMembers());
    toast({
      title: "Demo data loaded! 🌟",
      description: "Check out how MotivNation works with sample members and logs.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-heading font-bold mb-4 text-foreground">
          Join MotivNation 🚀
        </h1>
        <p className="text-lg text-muted-foreground">
          Create your profile or select an existing member to continue
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create New Member */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card border-2 shadow-lg animate-slide-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading">
                <Plus className="w-5 h-5 text-primary" />
                Create New Member
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Enter your name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateMember()}
                  className="text-lg p-4 rounded-xl"
                />
              </div>
              <Button 
                onClick={handleCreateMember}
                disabled={isLoading}
                variant="hero"
                size="lg"
                className="w-full"
              >
                {isLoading ? "Creating..." : "Join the Community 🎉"}
              </Button>
              <Button 
                onClick={handleSeedDemo}
                variant="outline"
                size="lg"
                className="w-full"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Seed Demo Data
              </Button>
            </CardContent>
          </Card>

          {/* Existing Members */}
          {members.length > 0 && (
            <Card className="bg-gradient-card border-2 shadow-lg mt-6 animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Users className="w-5 h-5 text-success" />
                  Existing Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {members.map((member) => (
                    <Button
                      key={member.id}
                      onClick={() => handleSelectMember(member)}
                      variant="badge"
                      size="lg"
                      className="p-4 h-auto flex-col hover:shadow-lg"
                    >
                      <div className="font-semibold">{member.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {member.xp} XP • {member.currentStreak}🔥 streak
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Info Card */}
        <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <Card className="bg-gradient-success border-2 shadow-xl h-fit sticky top-24">
            <CardContent className="p-6 text-center text-white">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="font-heading font-bold text-xl mb-4">
                Track Your Progress
              </h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <span>Earn XP for healthy habits</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  <span>Build unstoppable streaks</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  <span>Compete on leaderboards</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">🎉</span>
                  <span>Cheer each other on</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Join;
