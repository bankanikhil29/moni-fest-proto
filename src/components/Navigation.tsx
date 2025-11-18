import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import monifestLogo from "@/assets/monifest-icon-clean.png";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#FF5DA2]/95 via-[#E68ACB]/95 to-[#9D4EDD]/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-3 text-2xl font-bold hover:opacity-80 transition-opacity cursor-pointer">
              <img src={monifestLogo} alt="Moni-Fest Logo" className="w-10 h-10" />
              <span className="text-white">MONI<span className="text-[0.8em] text-white/70">-</span><span className="text-white">FEST</span></span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/find-creators" className="text-white/90 hover:text-white transition-colors font-medium">
              Find Creators
            </a>
            <a href="/find-brands" className="text-white/90 hover:text-white transition-colors font-medium">
              Brands
            </a>
            <a href="/campaigns" className="text-white/90 hover:text-white transition-colors font-medium">
              Campaigns
            </a>
            <a href="/#about" className="text-white/90 hover:text-white transition-colors font-medium">
              About Us
            </a>
            <a href="/#features" className="text-white/90 hover:text-white transition-colors font-medium">
              Features
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/20">Sign In</Button>
            <Button variant="default" size="sm" className="bg-white text-primary hover:bg-white/90" onClick={() => window.location.href = '/user-type-selection'}>Get Started</Button>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="flex flex-col h-full">
                  <div className="py-4 border-b">
                    <a href="/" className="flex items-center gap-3 text-2xl font-bold">
                      <img src={monifestLogo} alt="Moni-Fest Logo" className="w-10 h-10" />
                      <span className="text-primary">MONI<span className="text-[0.8em] text-muted-foreground">-</span><span className="text-accent">FEST</span></span>
                    </a>
                  </div>
                  
                  <div className="flex-1 py-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground px-2">Navigation</h3>
                      <a href="/find-creators" className="block px-2 py-2 text-muted-foreground hover:text-primary transition-colors">
                        Find Creators
                      </a>
                      <a href="/find-brands" className="block px-2 py-2 text-muted-foreground hover:text-primary transition-colors">
                        Brands
                      </a>
                      <a href="/campaigns" className="block px-2 py-2 text-muted-foreground hover:text-primary transition-colors">
                        Campaigns
                      </a>
                      <a href="/#about" className="block px-2 py-2 text-muted-foreground hover:text-primary transition-colors">
                        About Us
                      </a>
                      <a href="/#features" className="block px-2 py-2 text-muted-foreground hover:text-primary transition-colors">
                        Features
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
                    <Button variant="coral" className="w-full" onClick={() => window.location.href = '/user-type-selection'}>
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