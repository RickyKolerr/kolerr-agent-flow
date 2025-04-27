import { Link } from "react-router-dom";
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
export const MainNav = () => {
  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();
  const getInitials = (name: string) => {
    return name.split(" ").map(part => part[0]).join("").toUpperCase();
  };
  return <header className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            
            
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
            {isAuthenticated ? <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> : <>
                <Link to="/login" className="text-sm font-medium hover:text-brand-pink transition-colors">
                  Log In
                </Link>
                <Link to="/signup" className="rounded-full bg-brand-pink px-6 py-2 text-sm font-medium text-white hover:bg-brand-pink/90 transition-colors">
                  Sign Up
                </Link>
              </>}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-white">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-black text-white border-l border-gray-800">
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
                <div className="flex flex-col space-y-4 pt-6 border-t border-gray-800">
                  {isAuthenticated ? <>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                      </div>
                      <Link to="/dashboard" className="text-lg font-medium hover:text-brand-pink transition-colors">
                        Dashboard
                      </Link>
                      <Link to="/dashboard/profile" className="text-lg font-medium hover:text-brand-pink transition-colors">
                        Profile
                      </Link>
                      <Link to="/dashboard/settings" className="text-lg font-medium hover:text-brand-pink transition-colors">
                        Settings
                      </Link>
                      <button onClick={logout} className="text-lg font-medium hover:text-brand-pink transition-colors text-left">
                        Log out
                      </button>
                    </> : <>
                      <Link to="/login" className="text-lg font-medium hover:text-brand-pink transition-colors">
                        Log In
                      </Link>
                      <Link to="/signup" className="rounded-full bg-brand-pink px-6 py-2 text-lg font-medium text-white hover:bg-brand-pink/90 transition-colors text-center">
                        Sign Up
                      </Link>
                    </>}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>;
};