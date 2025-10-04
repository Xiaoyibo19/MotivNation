import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Award, Gift } from "lucide-react";

const Rewards = () => {
  const rewardCategories = [
    {
      icon: <Star className="w-8 h-8" />,
      title: "⭐ Weekly Shoutouts",
      description: "Top streaks & improvements",
      content: [
        "Get featured in weekly community highlights",
        "Special recognition for consistency",
        "Motivation boost from peer recognition",
        "Share your success story with others"
      ],
      gradient: "bg-gradient-warning",
      textColor: "text-white"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "🏅 Badges & Certificates",
      description: "Virtual & printable rewards",
      content: [
        "Digital achievement badges",
        "Printable certificates for milestones",
        "Social media worthy accomplishments",
        "Build your personal trophy case"
      ],
      gradient: "bg-gradient-success",
      textColor: "text-white"
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "🍎 Snack Tokens",
      description: "Small treats for 30-day streaks",
      content: [
        "Earn tokens for sustained habits",
        "Redeem for healthy snacks",
        "Small rewards for big achievements",
        "Celebrate your dedication"
      ],
      gradient: "bg-gradient-primary",
      textColor: "text-white"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-heading font-bold mb-4 text-foreground">
          🎁 Rewards & Recognition
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Building healthy habits deserves celebration! Here's how we recognize your dedication and progress.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {rewardCategories.map((category, index) => (
          <Card 
            key={index}
            className={`${category.gradient} border-2 shadow-xl hover:shadow-2xl smooth-hover animate-slide-in`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-white/20 rounded-full">
                  {category.icon}
                </div>
              </div>
              <CardTitle className={`font-heading text-xl ${category.textColor}`}>
                {category.title}
              </CardTitle>
              <p className={`${category.textColor} opacity-90`}>
                {category.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {category.content.map((item, itemIndex) => (
                <div key={itemIndex} className={`flex items-start gap-3 ${category.textColor}`}>
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0 opacity-80"></div>
                  <span className="opacity-90">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievement Milestones */}
      <Card className="bg-gradient-card border-2 shadow-lg animate-bounce-in">
        <CardHeader className="text-center">
          <CardTitle className="font-heading text-2xl">🏆 Achievement Milestones</CardTitle>
          <p className="text-muted-foreground">
            Here's what you can earn as you build your habits
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-xl bg-accent/50">
              <div className="text-3xl mb-2">⭐</div>
              <h4 className="font-heading font-bold">7-Day Warrior</h4>
              <p className="text-sm text-muted-foreground">First week strong!</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-accent/50">
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="font-heading font-bold">30-Day Champion</h4>
              <p className="text-sm text-muted-foreground">Habit forming level!</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-accent/50">
              <div className="text-3xl mb-2">💯</div>
              <h4 className="font-heading font-bold">50-Day Legend</h4>
              <p className="text-sm text-muted-foreground">Consistency master!</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-accent/50">
              <div className="text-3xl mb-2">💪</div>
              <h4 className="font-heading font-bold">XP Master</h4>
              <p className="text-sm text-muted-foreground">300+ total XP!</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <Card className="bg-gradient-hero border-2 shadow-xl">
          <CardContent className="p-8 text-white">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="font-heading font-bold text-2xl mb-4">Ready to Earn Your First Reward?</h3>
            <p className="text-lg opacity-90 mb-6">
              Start logging your habits today and watch your achievements grow!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="font-bold">
                Start Daily Log
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                View Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rewards;