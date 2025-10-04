import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Camera, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
          MotivNation
        </h1>
        <h2 className="text-xl md:text-2xl font-heading font-semibold mb-4 text-foreground">
          Build Better Habits Together
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Join your friends in a fun, trust-based challenge to stay healthy, earn rewards, and cheer each other on.
        </p>
        
        <div className="mb-12">
          <img 
            src={heroImage} 
            alt="People engaging in healthy habits - exercising, drinking water, sleeping well"
            className="w-full max-w-4xl mx-auto rounded-3xl shadow-xl animate-bounce-in"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button variant="hero" size="lg" asChild className="text-xl px-8 py-4">
            <Link to="/join">Join Now 🚀</Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="text-xl px-8 py-4">
            <Link to="/log">Log Today 📝</Link>
          </Button>
        </div>
      </div>

      {/* Feature Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card className="bg-gradient-card border-2 hover:shadow-lg smooth-hover animate-slide-in">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-heading font-bold text-lg mb-2">✅ Trust</h3>
            <p className="text-muted-foreground">Build habits through community accountability and support</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-2 hover:shadow-lg smooth-hover animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-heading font-bold text-lg mb-2">📸 Verification</h3>
            <p className="text-muted-foreground">Share progress photos and celebrate achievements together</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-2 hover:shadow-lg smooth-hover animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-warning rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-heading font-bold text-lg mb-2">🎉 Fun XP</h3>
            <p className="text-muted-foreground">Earn XP, build streaks, and unlock amazing achievements</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="text-center bg-gradient-card rounded-3xl p-8 border-2 border-border">
        <h3 className="font-heading font-bold text-2xl mb-6">Ready to Start Your Journey?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-primary">💧</div>
            <div className="text-sm text-muted-foreground">Hydration</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-success">🚶</div>
            <div className="text-sm text-muted-foreground">Steps</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-warning">🏋️</div>
            <div className="text-sm text-muted-foreground">Workout</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-primary-glow">😴</div>
            <div className="text-sm text-muted-foreground">Sleep</div>
          </div>
        </div>
        <Button variant="default" size="lg" asChild>
          <Link to="/join">Get Started Today</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;