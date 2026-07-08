import { useState } from 'react';
import { ArrowRight, Eye, Sparkles, X, ChevronRight, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { APARTMENT_LAYOUTS } from '../data';
import { ApartmentLayout } from '../types';

interface LayoutsSectionProps {
  onSelectLayoutForBooking: (layoutId: string) => void;
}

export default function LayoutsSection({ onSelectLayoutForBooking }: LayoutsSectionProps) {
  const [selectedLayout, setSelectedLayout] = useState<ApartmentLayout | null>(null);
  const [filter, setFilter] = useState<'all' | 'classic' | 'presidential'>('all');

  // Filter logic: Classic (143, 180) and Presidential (220, 320)
  const filteredLayouts = APARTMENT_LAYOUTS.filter((layout) => {
    if (filter === 'all') return true;
    if (filter === 'classic') return layout.area <= 180;
    if (filter === 'presidential') return layout.area >= 220;
    return true;
  });

  return (
    <section id="layouts" className="py-24 bg-[#f8f9fa] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-gold-600 font-bold font-sans">
              Luxurious Residences
            </p>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-slate-900 tracking-widest font-serif-china">
              传世大宅 <span className="text-gold-500 font-normal">礼献时代人物</span>
            </h3>
            <div className="h-[2px] w-16 bg-gold-400"></div>
          </div>

          {/* Elegant Layout Filters instead of just text */}
          <div className="flex items-center space-x-3 text-xs md:text-sm">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 border rounded-full tracking-wider transition-all duration-300 cursor-pointer ${
                filter === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-gold-400 hover:text-gold-500'
              }`}
            >
              全部户型
            </button>
            <button
              onClick={() => setFilter('classic')}
              className={`px-4 py-2 border rounded-full tracking-wider transition-all duration-300 cursor-pointer ${
                filter === 'classic'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-gold-400 hover:text-gold-500'
              }`}
            >
              精奢大宅 (143-180m²)
            </button>
            <button
              onClick={() => setFilter('presidential')}
              className={`px-4 py-2 border rounded-full tracking-wider transition-all duration-300 cursor-pointer ${
                filter === 'presidential'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-gold-400 hover:text-gold-500'
              }`}
            >
              领袖天幕 (220-320m²)
            </button>
          </div>
        </div>

        {/* Layout Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredLayouts.map((layout) => (
              <motion.div
                layout
                key={layout.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedLayout(layout)}
                className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gold-400/50 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer relative"
                id={`layout-card-${layout.id}`}
              >
                {/* Card Top: Image with overlay */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
                  <img
                    src={layout.image}
                    alt={`${layout.area}m² ${layout.title}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  {/* Subtle hover icon */}
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-slate-900 text-xs px-4 py-2 rounded shadow-md tracking-wider flex items-center space-x-1.5 transition-all duration-300 scale-95 group-hover:scale-100 font-medium">
                      <Eye className="w-3.5 h-3.5 text-gold-600" />
                      <span>品鉴详情</span>
                    </span>
                  </div>

                  {/* Area Floating Tag */}
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-gold-300 border border-gold-500/20 px-3 py-1 text-xs rounded tracking-widest font-mono">
                    HOT MODEL
                  </div>
                </div>

                {/* Card Bottom: Metatags */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Size and title */}
                    <div className="flex items-baseline space-x-2">
                      <h4 className="font-serif text-2xl font-bold text-slate-800 tracking-wide font-mono">
                        {layout.area}<span className="text-sm font-normal text-slate-500 ml-0.5">m²</span>
                      </h4>
                      <span className="text-gray-300 text-sm">|</span>
                      <p className="font-serif-china text-sm font-medium text-slate-700 tracking-widest">
                        {layout.title}
                      </p>
                    </div>

                    {/* Separated tags */}
                    <p className="text-xs text-slate-400 tracking-wider leading-relaxed font-serif-china">
                      {layout.tags.join(' | ')}
                    </p>
                  </div>

                  {/* Exquisite small arrow action */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gold-600 font-semibold uppercase tracking-widest group-hover:text-gold-500 transition-colors duration-300">
                      View details
                    </span>
                    <div className="w-8 h-8 rounded-full border border-gray-200 group-hover:border-gold-500 group-hover:bg-gold-500/5 flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-gold-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Immersive Immersive Layout Detail Modal */}
      <AnimatePresence>
        {selectedLayout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="bg-white max-w-5xl w-full rounded-xl shadow-2xl overflow-hidden relative border border-white/10"
              id="layout-details-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedLayout(null)}
                className="absolute top-4 right-4 z-10 text-slate-400 hover:text-slate-900 transition-colors p-2 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Side Column - Big Image (7cols) */}
                <div className="lg:col-span-7 bg-slate-950 relative min-h-[300px] lg:min-h-[500px]">
                  <img
                    src={selectedLayout.image}
                    alt={selectedLayout.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white space-y-1">
                    <div className="flex items-baseline space-x-2">
                      <span className="font-serif text-3xl md:text-4xl font-bold text-gold-300 font-mono">
                        {selectedLayout.area}
                      </span>
                      <span className="text-base text-gold-300">m²</span>
                      <span className="text-white/40">/</span>
                      <span className="text-lg font-serif-china tracking-widest">{selectedLayout.title}</span>
                    </div>
                    <p className="text-xs text-white/60 tracking-wider">
                      云境东方 · 极致名门户型代表
                    </p>
                  </div>
                </div>

                {/* Right Side Column - Info Details (5cols) */}
                <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between space-y-8 overflow-y-auto max-h-[90vh] lg:max-h-[600px]">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1.5 text-gold-600">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-widest font-semibold">House Tour Details</span>
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-slate-800 tracking-widest font-serif-china">
                        {selectedLayout.area}m² {selectedLayout.title}
                      </h3>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-1.5">
                        {selectedLayout.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gold-500/5 text-gold-600 border border-gold-500/20 text-[10px] px-2.5 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Paragraph description */}
                    <p className="text-sm text-slate-600 leading-relaxed font-light font-serif-china">
                      {selectedLayout.description}
                    </p>

                    {/* Room list layout */}
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                        空间规划与建议
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {selectedLayout.rooms.map((room) => (
                          <div
                            key={room.name}
                            className="flex flex-col bg-gray-50 border border-gray-100 p-2.5 rounded hover:border-gold-300/30 transition-all"
                          >
                            <span className="text-slate-600 font-medium font-serif-china">{room.name}</span>
                            <span className="text-slate-400 font-mono mt-0.5">{room.size}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Highlights bullet points */}
                    <div className="space-y-2">
                      <h4 className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                        户型奢华亮点
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 font-serif-china">
                        {selectedLayout.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-gold-500 mt-0.5">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions Booking Connection */}
                  <div className="pt-4 border-t border-gray-100">
                    <button
                      onClick={() => {
                        onSelectLayoutForBooking(selectedLayout.title);
                        setSelectedLayout(null);
                      }}
                      className="w-full bg-gold-500 hover:bg-gold-600 text-white font-serif-china text-center tracking-widest py-3 px-6 rounded font-medium shadow-md transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer hover:shadow-lg"
                      id={`book-model-${selectedLayout.id}`}
                    >
                      <span>预约品鉴此户型</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
