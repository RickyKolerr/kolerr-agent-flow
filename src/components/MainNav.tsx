
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export const MainNav = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-brand-pink flex items-center justify-center">
            <span className="font-bold text-white">K</span>
          </div>
          <span className="font-bold text-xl">Kolerr</span>
        </Link>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/about" className={navigationMenuTriggerStyle()}>
                About
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/features" className={navigationMenuTriggerStyle()}>
                Features
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/pricing" className={navigationMenuTriggerStyle()}>
                Pricing
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/docs" className={navigationMenuTriggerStyle()}>
                Docs
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/contact" className={navigationMenuTriggerStyle()}>
                Contact
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-sm font-medium hover:text-brand-pink">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="rounded-md bg-brand-pink px-4 py-2 text-sm font-medium text-white hover:bg-brand-pink/90"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};
