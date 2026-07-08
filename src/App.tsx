import { useState, useEffect } from 'react';
import { Sparkles, Check, Info, Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import LayoutsSection from './components/LayoutsSection';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import BookingListModal from './components/BookingListModal';

export default function App() {
  const [preselectedLayout, setPreselectedLayout] = useState('');
  const [bookingCount, setBookingCount] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    updateBookingCount();
    
    // Proactively show a brief, elegant welcome notification
    setTimeout(() => {
      setAlertMessage('欢迎品鉴云境东方官方门户。您可以点击户型卡片品鉴3D户型，并在区位图中查看城市塔尖配套。');
    }, 1500);
  }, []);

  const updateBookingCount = () => {
    try {
      const stored = localStorage.getItem('yunjing_oriental_bookings');
      if (stored) {
        const parsed = JSON.parse(stored);
        setBookingCount(parsed.length);
      } else {
        setBookingCount(0);
      }
    } catch (err) {
      setBookingCount(0);
    }
  };

  // Safe navigation scrolling
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Pre-select a layout and scroll to booking form
  const handleSelectLayoutForBooking = (layoutName: string) => {
    setPreselectedLayout(layoutName);
    handleNavClick('location');
  };

  // Interactive link callback for other footer/content assets
  const handleInteractiveLink = (title: string) => {
    setAlertMessage(`您已触发关于「${title}」的尊属品鉴详情。本案精奢样板间正火热开放，诚邀阁下致电 400-888-8888 或提交右下角预约表格，开启尊贵品鉴。`);
  };

  return (
    <div className="relative min-h-screen bg-[#fafafa] selection:bg-gold-500 selection:text-slate-950 text-slate-800 antialiased font-sans flex flex-col justify-between">
      {/* Dynamic Navigation Header */}
      <Header
        onNavClick={handleNavClick}
        onAppointmentsClick={() => setBookingModalOpen(true)}
        bookingCount={bookingCount}
      />

      {/* Main Single-View Sections */}
      <main className="flex-grow">
        {/* Section 1: Hero Visuals & Dynamic Advantage list */}
        <Hero onLearnMoreClick={() => handleNavClick('layouts')} />

        {/* Section 2: Exquisite Interactive Layout Cards & Detail Popups */}
        <LayoutsSection onSelectLayoutForBooking={handleSelectLayoutForBooking} />

        {/* Section 3: Centered Interactive Map & Right Booking Terminal */}
        <LocationSection
          preselectedLayout={preselectedLayout}
          onBookingAdded={() => {
            updateBookingCount();
            // Clear preselected so it can trigger again on next selection
            setPreselectedLayout('');
          }}
        />
      </main>

      {/* Footer Details */}
      <Footer
        onNavClick={handleNavClick}
        onLinkClick={handleInteractiveLink}
      />

      {/* Stored Reservations List Drawer/Modal */}
      <BookingListModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onBookingRemoved={updateBookingCount}
      />

      {/* Top Floating Elegant Branded Announcement Alerts */}
      <AnimatePresence>
        {alertMessage && (
          <div className="fixed bottom-6 left-6 z-50 max-w-sm w-full">
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-slate-950/95 backdrop-blur-md text-white border border-gold-500/30 p-5 rounded-lg shadow-2xl relative overflow-hidden"
              id="app-announcement-card"
            >
              <div className="absolute top-0 left-0 w-[4px] h-full bg-gold-400"></div>
              
              <button
                onClick={() => setAlertMessage(null)}
                className="absolute top-3 right-3 text-white/50 hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer"
                id="close-announcement-btn"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start space-x-3 pr-4">
                <Bell className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5 animate-pulse" />
                <div className="space-y-1.5">
                  <h5 className="font-serif text-sm font-bold text-gold-300 tracking-wider font-serif-china">
                    云境东方 · 品鉴公告
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed font-light font-serif-china">
                    {alertMessage}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
