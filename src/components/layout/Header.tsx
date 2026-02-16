import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { cn } from '../../utils/cn';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: t.nav.calculator, path: '/' },
    { label: t.nav.compare, path: '/compare' },
    { label: t.nav.risk, path: '/risk' },
    { label: t.nav.reports, path: '/reports' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          {/* Logo / Brand */}
          <Link to="/" className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-primary">
              {t.nav.title}
            </span>
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
              {t.nav.subtitle}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(item.path) ? "text-primary font-bold" : "text-gray-600"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <span 
              className={cn("cursor-pointer hover:text-primary", language === 'en' ? "text-primary font-bold" : "text-gray-400")}
              onClick={() => setLanguage('en')}
            >
              EN
            </span>
            <span className="text-gray-300">|</span>
            <span 
              className={cn("cursor-pointer hover:text-primary", language === 'hi' ? "text-primary font-bold" : "text-gray-400")}
              onClick={() => setLanguage('hi')}
            >
              HI
            </span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white p-4 space-y-4">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium",
                  isActive(item.path) ? "text-primary font-bold" : "text-gray-600"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
             <div className="flex items-center gap-2 text-sm font-medium text-gray-600 pt-2 border-t border-gray-100">
                <span 
                  className={cn("cursor-pointer", language === 'en' ? "text-primary font-bold" : "text-gray-400")}
                  onClick={() => setLanguage('en')}
                >
                  English
                </span>
                <span className="text-gray-300">|</span>
                <span 
                   className={cn("cursor-pointer", language === 'hi' ? "text-primary font-bold" : "text-gray-400")}
                   onClick={() => setLanguage('hi')}
                >
                  हिंदी
                </span>
              </div>
          </nav>
        </div>
      )}
    </header>
  );
}
