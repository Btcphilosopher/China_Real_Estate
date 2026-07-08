import { useState, useEffect } from 'react';
import { Phone, Menu, X, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  onAppointmentsClick: () => void;
  bookingCount: number;
}

export default function Header({ onNavClick, onAppointmentsClick, bookingCount }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '首页', id: 'hero' },
    { name: '项目概览', id: 'highlights' },
    { name: '户型鉴赏', id: 'layouts' },
    { name: '生活美学', id: 'aesthetics' },
    { name: '区位价值', id: 'location' },
    { name: '关于我们', id: 'footer' }
  ];

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-slate-950/90 backdrop-blur-md border-b border-gold-500/10 py-4 shadow-lg'
            : 'bg-gradient-to-b from-black/80 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand Block */}
          <div
            onClick={() => onNavClick('hero')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            {/* Golden Emblem icon representing "东方" (East) */}
            <div className="relative w-10 h-10 border-2 border-gold-400 rounded-lg flex items-center justify-center p-1.5 transition-transform duration-500 group-hover:rotate-45">
              <div className="absolute inset-0 border border-gold-400/30 scale-75 rounded"></div>
              {/* Golden Lotus / Tower Emblem using SVGs to perfectly resemble the exquisite gold logo */}
              <svg className="w-6 h-6 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L9.5 7h5L12 2zm-5.5 8L4 15h16l-2.5-5H6.5zm-3.5 8L1 21h22l-2-3H3z" />
                <rect x="11" y="8" width="2" height="11" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h1 className="font-serif text-lg md:text-xl font-bold text-gold-300 tracking-[0.25em] leading-tight transition-colors duration-300 group-hover:text-gold-200">
                云境东方
              </h1>
              <p className="text-[9px] md:text-[10px] font-sans text-gold-400/70 tracking-[0.3em] uppercase leading-none font-medium">
                Yunjing Oriental
              </p>
            </div>
          </div>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className="text-sm font-light text-white/80 hover:text-gold-300 tracking-widest transition-colors duration-300 font-serif-china hover:font-normal"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Action Block - Hotline & Active Reservations */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Booking History Drawer Button */}
            {bookingCount > 0 && (
              <button
                onClick={onAppointmentsClick}
                className="relative text-xs bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 border border-gold-500/30 rounded-full px-4 py-1.5 transition-all duration-300 flex items-center space-x-1.5 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse"></span>
                <span>我的预约 ({bookingCount})</span>
              </button>
            )}

            <a
              href="tel:400-888-8888"
              className="flex items-center space-x-2 text-white/90 hover:text-gold-300 transition-colors duration-300 group"
            >
              <Phone className="w-4 h-4 text-gold-400 group-hover:animate-bounce" />
              <span className="font-serif text-base tracking-wider font-semibold">400-888-8888</span>
            </a>
          </div>

          {/* Mobile Menu Trigger & Booking State */}
          <div className="flex items-center space-x-3 lg:hidden">
            {bookingCount > 0 && (
              <button
                onClick={onAppointmentsClick}
                className="text-xs bg-gold-500/20 text-gold-300 border border-gold-500/40 rounded-full px-3 py-1 cursor-pointer"
              >
                已约 {bookingCount}
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-gold-300 transition-colors duration-300 p-1"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[73px] z-40 lg:hidden bg-slate-950 border-b border-gold-500/20 shadow-2xl p-6"
            id="mobile-navigation"
          >
            <nav className="flex flex-col space-y-5 mb-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavClick(item.id);
                  }}
                  className="text-left text-base text-white/90 hover:text-gold-300 font-serif-china py-1 border-b border-white/5 tracking-wider"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="flex flex-col space-y-4 pt-4 border-t border-white/10">
              <a
                href="tel:400-888-8888"
                className="flex items-center justify-center space-x-2 bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 py-3 rounded border border-gold-500/30 font-serif tracking-widest text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>咨询热线: 400-888-8888</span>
              </a>

              {bookingCount > 0 && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onAppointmentsClick();
                  }}
                  className="w-full text-center text-xs text-white/50 underline py-1"
                >
                  查看已提交的预约信息 ({bookingCount})
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
