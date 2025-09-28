import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold">
              <span className="text-primary">Moni</span>
              <span className="gradient-text">-Fest</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              About Us
            </a>
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="/find-creators" className="text-muted-foreground hover:text-primary transition-colors">
              Find Creators
            </a>
            <a href="/find-brands" className="text-muted-foreground hover:text-primary transition-colors">
              Brands
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <a href="/creator-dashboard" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Creator
              </a>
              <span className="text-muted-foreground">|</span>
              <a href="/brand-dashboard" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Brand
              </a>
              <span className="text-muted-foreground">|</span>
              <a href="/manager-dashboard" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Manager
              </a>
            </div>
            <Button variant="ghost">Sign In</Button>
            <Button variant="coral" size="sm" onClick={() => window.location.href = '/get-started'}>Get Started</Button>
          </div>

          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}