import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HabitLog } from "@/types";
import { getLogs, getMembers } from "@/lib/storage";
import { Camera, Heart } from "lucide-react";

const Community = () => {
  const [logsWithPhotos, setLogsWithPhotos] = useState<(HabitLog & { memberName: string })[]>([]);

  useEffect(() => {
    const logs = getLogs();
    const members = getMembers();
    
    const photosLogs = logs
      .filter(log => log.photo)
      .map(log => ({
        ...log,
        memberName: members.find(m => m.id === log.memberId)?.name || 'Unknown'
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setLogsWithPhotos(photosLogs);
  }, []);

  const getHabitEmoji = (habit: string) => {
    switch (habit) {
      case 'hydration': return '💧';
      case 'steps': return '🚶';
      case 'workout': return '🏋️';
      case 'sleep': return '😴';
      default: return '⭐';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-heading font-bold mb-4 text-foreground">
          📸 Community Gallery
        </h1>
        <p className="text-lg text-muted-foreground">
          See proof photos and celebrate each other's progress!
        </p>
      </div>

      {logsWithPhotos.length === 0 ? (
        <Card className="bg-gradient-card border-2 text-center p-12 animate-bounce-in">
          <CardContent>
            <div className="text-8xl mb-6">📷</div>
            <h3 className="text-2xl font-heading font-bold mb-4">No photos yet!</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Share your first proof photo in the Daily Log to get started.
            </p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Camera className="w-5 h-5" />
              <span>Add photos to inspire the community</span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logsWithPhotos.map((log, index) => (
            <Card 
              key={log.id} 
              className="bg-gradient-card border-2 shadow-lg hover:shadow-xl smooth-hover animate-slide-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={log.photo} 
                  alt={`${log.memberName}'s ${log.habit} progress`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
                    {getHabitEmoji(log.habit)} {log.habit}
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="bg-gradient-success rounded-full px-3 py-1 text-white text-sm font-bold">
                    +{log.xpEarned} XP
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-bold text-lg">{log.memberName}</h3>
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    {getHabitEmoji(log.habit)} {log.quantity} 
                    {log.habit === 'hydration' ? ' glasses' :
                     log.habit === 'steps' ? ' steps' :
                     log.habit === 'workout' ? ' sessions' :
                     log.habit === 'sleep' ? ' hours' : ''}
                  </span>
                  <span>{formatDate(log.date)}</span>
                </div>
                
                {log.notes && (
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    "{log.notes}"
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Encouragement section */}
      <div className="mt-12 text-center">
        <Card className="bg-gradient-success border-2 shadow-xl animate-bounce-in">
          <CardContent className="p-8 text-white">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="font-heading font-bold text-2xl mb-2">Keep Sharing!</h3>
            <p className="text-lg opacity-90">
              Your progress photos inspire others to stay motivated. Every habit counts! 💪
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Community;