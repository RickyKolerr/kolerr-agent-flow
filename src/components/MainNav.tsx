
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Menu, User, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export const MainNav = () => {
  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();

  const { t, language, setLanguage } = useLanguage();

  // Add state for controlling sheet visibility
  const [isOpen, setIsOpen] = useState(false);

  const getInitials = (name: string) => {
    return name.split(" ").map(part => part[0]).join("").toUpperCase();
  };

  // Handler for mobile nav items
  const handleMobileNavClick = () => {
    setIsOpen(false);
  };

  // Modified routes array to hide specific tabs
  const routes = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Features", path: "/features" },
    { title: "Pricing", path: "/pricing" },
    // Hidden tabs (removed from navigation but still accessible via routes)
    // { title: "Chat", path: "/chat" },
    // { title: "Docs", path: "/docs" },
    // { title: "Blog", path: "/blog" },
    // { title: "API", path: "/api" },
    // { title: "Help", path: "/help" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/08e97b33-14d7-4575-be5f-4d924dd01d7c.png" 
              alt="Kolerr Logo" 
              className="h-16 w-auto" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {routes.map(route => (
              <Link key={route.path} to={route.path} className="text-sm font-medium text-white hover:text-brand-pink transition-colors">
                {t(`mainNav.${route.title.toLowerCase()}`)}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons and Language Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            {isAuthenticated ? <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-zinc-900 border-white/10" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">{user?.name}</p>
                      <p className="text-xs leading-none text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem asChild className="text-white focus:bg-white/10 focus:text-white">
                    <Link to="/dashboard">{t('mainNav.dashboard')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-white focus:bg-white/10 focus:text-white">
                    <Link to="/dashboard/profile">{t('mainNav.profile')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-white focus:bg-white/10 focus:text-white">
                    <Link to="/dashboard/settings">{t('mainNav.settings')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={logout} className="text-white focus:bg-white/10 focus:text-white">
                    {t('mainNav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> : <>
                <Link to="/login" className="text-sm font-medium text-white hover:text-brand-pink transition-colors">
                  {t('mainNav.login')}
                </Link>
                <Link to="/signup" className="rounded-full bg-brand-pink px-6 py-2 text-sm font-medium text-white hover:bg-brand-pink/90 transition-colors">
                  {t('mainNav.signup')}
                </Link>
              </>}
          </div>

          {/* Mobile Navigation - also update here to match the desktop nav tabs */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-white">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-zinc-900 text-white border-l border-gray-800">
              <nav className="flex flex-col space-y-4 mt-8">
                {/* Use the same filtered routes for mobile */}
                {routes.map(route => (
                  <Link key={route.path} to={route.path} className="text-lg font-medium hover:text-brand-pink transition-colors" onClick={handleMobileNavClick}>
                    {t(`mainNav.${route.title.toLowerCase()}`)}
                  </Link>
                ))}
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-lg font-medium hover:text-brand-pink transition-colors"
                    onClick={() => {
                      setLanguage(language === 'en' ? 'vi' : 'en');
                      handleMobileNavClick();
                    }}
                  >
                    <Languages className="h-5 w-5 mr-2" />
                    {language === 'en' ? 'Tiếng Việt' : 'English'}
                  </Button>
                </div>
                <div className="flex flex-col space-y-4 pt-6 border-t border-gray-800">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-sm text-gray-400">{user?.email}</p>
                        </div>
                      </div>
                      <Link to="/dashboard" className="text-lg font-medium hover:text-brand-pink transition-colors" onClick={handleMobileNavClick}>
                        {t('mainNav.dashboard')}
                      </Link>
                      <Link to="/dashboard/profile" className="text-lg font-medium hover:text-brand-pink transition-colors" onClick={handleMobileNavClick}>
                        {t('mainNav.profile')}
                      </Link>
                      <Link to="/dashboard/settings" className="text-lg font-medium hover:text-brand-pink transition-colors" onClick={handleMobileNavClick}>
                        {t('mainNav.settings')}
                      </Link>
                      <button onClick={() => { logout(); handleMobileNavClick(); }} className="text-lg font-medium hover:text-brand-pink transition-colors text-left">
                        {t('mainNav.logout')}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="text-lg font-medium hover:text-brand-pink transition-colors" onClick={handleMobileNavClick}>
                        {t('mainNav.login')}
                      </Link>
                      <Link to="/signup" className="rounded-full bg-brand-pink px-6 py-2 text-lg font-medium text-white hover:bg-brand-pink/90 transition-colors text-center" onClick={handleMobileNavClick}>
                        {t('mainNav.signup')}
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
