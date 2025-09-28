import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import logo from "@/assets/logo.png";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-3 text-2xl font-bold hover:opacity-80 transition-opacity cursor-pointer">
              <img src={logo} alt="Moni-Fest Logo" className="w-8 h-8" />
              <span className="text-primary">Moni-Fest</span>
            </a>
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
            <Button variant="ghost">Sign In</Button>
            <Button variant="coral" size="sm" onClick={() => window.location.href = '/get-started'}>Get Started</Button>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="flex flex-col h-full">
                  <div className="py-4 border-b">
                    <a href="/" className="flex items-center gap-3 text-2xl font-bold">
                      <img src={logo} alt="Moni-Fest Logo" className="w-8 h-8" />
                      <span className="text-primary">Moni-Fest</span>
                    </a>
                  </div>
                  
                  <div className="flex-1 py-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground px-2">Navigation</h3>
                      <a href="#about" className="block px-2 py-2 text-muted-foreground hover:text-primary transition-colors">
                        About Us
                      </a>
                      <a href="#features" className="block px-2 py-2 text-muted-foreground hover:text-primary transition-colors">
                        Features
                      </a>
                      <a href="/find-creators" className="block px-2 py-2 text-muted-foreground hover:text-primary transition-colors">
                        Find Creators
                      </a>
                      <a href="/find-brands" className="block px-2 py-2 text-muted-foreground hover:text-primary transition-colors">
                        Brands
                      </a>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground px-2">Dashboards</h3>
                      <a href="/creator-dashboard" className="block px-2 py-2 text-muted-foreground hover:text-primary transition-colors">
                        Creator Dashboard
                      </a>
                      <a href="/brand-dashboard" className="block px-2 py-2 text-muted-foreground hover:text-primary transition-colors">
                        Brand Dashboard
                      </a>
                      <a href="/manager-dashboard" className="block px-2 py-2 text-muted-foreground hover:text-primary transition-colors">
                        Manager Dashboard
                      </a>
                    </div>
                  </div>
                  
                  <div className="py-4 space-y-2 border-t">
                    <Button variant="ghost" className="w-full justify-start">
                      Sign In
                    </Button>
                    <Button variant="coral" className="w-full" onClick={() => window.location.href = '/get-started'}>
                      Get Started
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}