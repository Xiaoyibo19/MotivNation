import { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-gradient-card border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground font-body">
              © 2025 MotivNation • Fun community wellness
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;