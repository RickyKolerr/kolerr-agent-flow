
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle
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
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  <li>
                    <Link to="/features" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Features</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Discover our platform's capabilities
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Pricing</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Choose the right plan for your needs
                      </p>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  <li>
                    <Link to="/docs" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Documentation</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Detailed guides and tutorials
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/api" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">API</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Integration documentation
                      </p>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/partners" className={navigationMenuTriggerStyle()}>
                Partners
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
