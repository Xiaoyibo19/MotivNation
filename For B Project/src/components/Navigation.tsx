import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Users, Calendar, Trophy, Camera, Gift } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/join", label: "Join", icon: Users },
    { path: "/log", label: "Daily Log", icon: Calendar },
    { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { path: "/community", label: "Community", icon: Camera },
    { path: "/rewards", label: "Rewards", icon: Gift },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-card border-b border-border backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-bold text-lg">M</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">MotivNation</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Button
                key={path}
                variant={location.pathname === path ? "default" : "ghost"}
                size="sm"
                asChild
                className="font-medium"
              >
                <Link to={path} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              </Button>
            ))}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-1">
            {navItems.slice(0, 4).map(({ path, icon: Icon }) => (
              <Button
                key={path}
                variant={location.pathname === path ? "default" : "ghost"}
                size="icon"
                asChild
                className="w-8 h-8"
              >
                <Link to={path}>
                  <Icon className="w-4 h-4" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;