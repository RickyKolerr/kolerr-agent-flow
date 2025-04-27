
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export const MainNav = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-brand-pink flex items-center justify-center">
              <span className="font-bold text-white">K</span>
            </div>
            <span className="font-bold text-xl">Kolerr</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/about" className="text-sm font-medium hover:text-brand-pink transition-colors">
              About
            </Link>
            <Link to="/features" className="text-sm font-medium hover:text-brand-pink transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-brand-pink transition-colors">
              Pricing
            </Link>
            <Link to="/docs" className="text-sm font-medium hover:text-brand-pink transition-colors">
              Docs
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-brand-pink transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium hover:text-brand-pink transition-colors">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="rounded-md bg-brand-pink px-4 py-2 text-sm font-medium text-white hover:bg-brand-pink/90 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link to="/about" className="text-lg font-medium hover:text-brand-pink transition-colors">
                  About
                </Link>
                <Link to="/features" className="text-lg font-medium hover:text-brand-pink transition-colors">
                  Features
                </Link>
                <Link to="/pricing" className="text-lg font-medium hover:text-brand-pink transition-colors">
                  Pricing
                </Link>
                <Link to="/docs" className="text-lg font-medium hover:text-brand-pink transition-colors">
                  Docs
                </Link>
                <Link to="/contact" className="text-lg font-medium hover:text-brand-pink transition-colors">
                  Contact
                </Link>
                <div className="flex flex-col space-y-4 pt-6 border-t">
                  <Link to="/login" className="text-lg font-medium hover:text-brand-pink transition-colors">
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-md bg-brand-pink px-4 py-2 text-lg font-medium text-white hover:bg-brand-pink/90 transition-colors text-center"
                  >
                    Get Started
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
