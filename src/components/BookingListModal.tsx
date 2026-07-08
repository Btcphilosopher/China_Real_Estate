import { useState, useEffect } from 'react';
import { X, Calendar, User, Phone, Sparkles, Trash2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Booking } from '../types';

interface BookingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingRemoved: () => void;
}

export default function BookingListModal({ isOpen, onClose, onBookingRemoved }: BookingListModalProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadBookings();
    }
  }, [isOpen]);

  const loadBookings = () => {
    try {
      const stored = localStorage.getItem('yunjing_oriental_bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      } else {
        setBookings([]);
      }
    } catch (err) {
      setBookings([]);
    }
  };

  const handleCancelBooking = (id: string) => {
    try {
      const stored = localStorage.getItem('yunjing_oriental_bookings');
      if (stored) {
        const parsed: Booking[] = JSON.parse(stored);
        const filtered = parsed.filter((b) => b.id !== id);
        localStorage.setItem('yunjing_oriental_bookings', JSON.stringify(filtered));
        setBookings(filtered);
        onBookingRemoved();
      }
    } catch (err) {
      console.error('Failed to cancel booking');
    }
  };

  const formatDate = (isoStr: string) => {
    const d = new Date(isoStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white max-w-lg w-full rounded-lg shadow-2xl overflow-hidden relative border border-gray-100"
        id="bookings-manager-modal"
      >
        {/* Header */}
        <div className="bg-slate-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-gold-400" />
            <h3 className="font-serif text-lg font-bold text-gold-300 tracking-wider font-serif-china">
              我的品鉴预约清单
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-serif-china">
            您的品鉴及一站式置业预约已安全存储在您当前的浏览器中
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[400px] overflow-y-auto space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-sm text-slate-500 font-serif-china">
                您当前尚未登记任何品鉴预约信息
              </p>
              <p className="text-xs text-slate-400 font-serif-china">
                可在下方的“预约品鉴”专区中登记，专属顾问将在第一时间为您排期。
              </p>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="border border-gray-100 hover:border-gold-300 rounded-lg p-4 bg-gray-50 hover:bg-white transition-all duration-300 flex items-center justify-between"
                id={`booking-item-${b.id}`}
              >
                <div className="space-y-2">
                  {/* Name and phone info */}
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="font-semibold text-slate-800 font-serif-china flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 text-gold-500 mr-1" />
                      {b.name}
                    </span>
                    <span className="text-slate-400 font-mono text-xs flex items-center">
                      <Phone className="w-3.5 h-3.5 text-slate-400 mr-1" />
                      {b.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
                    </span>
                  </div>

                  {/* Layout selected */}
                  <div className="flex items-center space-x-1.5 text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                    <span className="text-slate-600 font-serif-china">意向: {b.layoutName}</span>
                  </div>

                  {/* Submission date */}
                  <div className="text-[10px] text-slate-400 font-mono">
                    登记时间: {formatDate(b.createdAt)}
                  </div>
                </div>

                {/* Cancel Button */}
                <button
                  onClick={() => handleCancelBooking(b.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 rounded hover:bg-rose-50 transition-colors cursor-pointer"
                  title="取消预约"
                  id={`cancel-booking-btn-${b.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs px-6 py-2.5 rounded font-serif-china font-medium tracking-wider cursor-pointer"
          >
            完成并关闭
          </button>
        </div>
      </motion.div>
    </div>
  );
}
