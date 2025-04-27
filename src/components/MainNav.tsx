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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
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
            <Link to="/about" className="text-sm font-medium hover:text-brand-pink transition-colors">
              {t('mainNav.about')}
            </Link>
            <Link to="/features" className="text-sm font-medium hover:text-brand-pink transition-colors">
              {t('mainNav.features')}
            </Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-brand-pink transition-colors">
              {t('mainNav.pricing')}
            </Link>
            <Link to="/docs" className="text-sm font-medium hover:text-brand-pink transition-colors">
              {t('mainNav.docs')}
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-brand-pink transition-colors">
              {t('mainNav.contact')}
            </Link>
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
                    <Link to="/dashboard">{t('mainNav.dashboard')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile">{t('mainNav.profile')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings">{t('mainNav.settings')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    {t('mainNav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> : <>
                <Link to="/login" className="text-sm font-medium hover:text-brand-pink transition-colors">
                  {t('mainNav.login')}
                </Link>
                <Link to="/signup" className="rounded-full bg-brand-pink px-6 py-2 text-sm font-medium text-white hover:bg-brand-pink/90 transition-colors">
                  {t('mainNav.signup')}
                </Link>
              </>}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-white">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-black text-white border-l border-gray-800">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link to="/about" className="text-lg font-medium hover:text-brand-pink transition-colors" onClick={handleMobileNavClick}>
                  {t('mainNav.about')}
                </Link>
                <Link to="/features" className="text-lg font-medium hover:text-brand-pink transition-colors" onClick={handleMobileNavClick}>
                  {t('mainNav.features')}
                </Link>
                <Link to="/pricing" className="text-lg font-medium hover:text-brand-pink transition-colors" onClick={handleMobileNavClick}>
                  {t('mainNav.pricing')}
                </Link>
                <Link to="/docs" className="text-lg font-medium hover:text-brand-pink transition-colors" onClick={handleMobileNavClick}>
                  {t('mainNav.docs')}
                </Link>
                <Link to="/contact" className="text-lg font-medium hover:text-brand-pink transition-colors" onClick={handleMobileNavClick}>
                  {t('mainNav.contact')}
                </Link>
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
                          <p className="text-sm text-muted-foreground">{user?.email}</p>
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
