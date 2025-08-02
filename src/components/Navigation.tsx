import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Scissors className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold">Bespoke Tailors</span>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-accent transition-colors">
              Home
            </a>
            <a href="#services" className="text-foreground hover:text-accent transition-colors">
              Services
            </a>
            <a href="#order" className="text-foreground hover:text-accent transition-colors">
              Order
            </a>
            <a href="/admin" className="text-foreground hover:text-accent transition-colors">
              Admin
            </a>
          </div>
          
          {/* CTA Button */}
          <Button variant="premium" className="hidden md:inline-flex">
            Place Order
          </Button>
        </div>
      </div>
    </nav>
  );
};