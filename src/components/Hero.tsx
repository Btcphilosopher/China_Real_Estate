import { useState } from 'react';
import { ChevronRight, Home, PenTool, Eye, Compass, Cpu, X, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HIGHLIGHT_FEATURES } from '../data';
import { HighlightFeature } from '../types';

interface HeroProps {
  onLearnMoreClick: () => void;
}

export default function Hero({ onLearnMoreClick }: HeroProps) {
  const [selectedHighlight, setSelectedHighlight] = useState<HighlightFeature | null>(null);

  // Helper to map icon name to Lucide components
  const getIcon = (name: string, className = "w-6 h-6") => {
    switch (name) {
      case 'Home': return <Home className={className} />;
      case 'PenTool': return <PenTool className={className} />;
      case 'Eye': return <Eye className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      default: return <HelpCircle className={className} />;
    }
  };

  return (
    <section id="hero" className="relative min-h-screen bg-slate-950 flex flex-col justify-between overflow-hidden pt-28">
      {/* Background Image with elegant overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_background_1783503210226.jpg"
          alt="云境东方 Yunjing Oriental"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 motion-safe:animate-[pulse_10s_infinite] opacity-80"
        />
        {/* Multilayer gradient mask for ultra premium contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/80"></div>
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/50 to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-slate-950 to-transparent"></div>
      </div>

      {/* Main Headline Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 flex-grow flex flex-col justify-center py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-6 md:space-y-8 max-w-3xl text-left"
        >
          {/* Main Title Chinese & English */}
          <div className="space-y-2">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7.5xl font-light text-white tracking-[0.2em] leading-tight filter drop-shadow-md">
              云境天成 <span className="text-gold-300 font-normal">大境东方</span>
            </h2>
            <div className="h-[2px] w-24 bg-gradient-to-r from-gold-400 to-transparent"></div>
          </div>

          {/* Subtitles */}
          <div className="space-y-4">
            <p className="font-serif-china text-lg sm:text-xl md:text-2xl font-light text-gold-100 tracking-[0.3em] leading-relaxed">
              城市塔尖人居著作 &nbsp;书写时代生活美学
            </p>
            <p className="text-xs sm:text-sm md:text-base font-light text-white/70 tracking-[0.2em] uppercase font-mono">
              建面约143-320m² 传世大宅 全球臻藏
            </p>
          </div>

          {/* Button CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button
              onClick={onLearnMoreClick}
              className="group border border-gold-400/60 hover:border-gold-300 hover:bg-gold-500/10 text-gold-300 hover:text-white rounded px-8 py-3 text-xs sm:text-sm tracking-[0.3em] uppercase flex items-center space-x-2 transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-sm"
              id="cta-learn-more"
            >
              <span>了解更多</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Five Highlight Highlights Overlay Block at Bottom of Hero */}
      <div id="highlights" className="relative z-10 w-full bg-slate-950/70 backdrop-blur-md border-t border-white/5 py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 lg:gap-8">
            {HIGHLIGHT_FEATURES.map((feature) => (
              <motion.div
                key={feature.id}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedHighlight(feature)}
                className="group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-2 sm:space-y-0 sm:space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300 cursor-pointer border border-transparent hover:border-gold-500/10"
                id={`highlight-btn-${feature.id}`}
              >
                {/* Golden Animated Icon Outer */}
                <div className="text-gold-400 p-2 bg-gold-500/5 rounded border border-gold-500/10 group-hover:bg-gold-400 group-hover:text-slate-950 transition-all duration-500">
                  {getIcon(feature.iconName)}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white tracking-widest font-serif-china">
                    {feature.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-white/50 group-hover:text-gold-300/80 transition-colors duration-300 font-light leading-snug">
                    {feature.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Modal for Details of Highlights */}
      <AnimatePresence>
        {selectedHighlight && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-gold-500/30 max-w-lg w-full rounded-lg shadow-2xl overflow-hidden relative"
              id="highlight-detail-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedHighlight(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="text-gold-400 p-3 bg-gold-400/10 rounded border border-gold-400/20">
                    {getIcon(selectedHighlight.iconName, "w-8 h-8")}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-gold-300 tracking-widest font-serif-china">
                      {selectedHighlight.title}
                    </h3>
                    <p className="text-xs text-white/50 font-mono tracking-wider mt-0.5">
                      {selectedHighlight.subtitle}
                    </p>
                  </div>
                </div>

                <div className="h-[1px] bg-gradient-to-r from-gold-400/30 to-transparent"></div>

                <p className="text-sm text-white/80 leading-relaxed font-light tracking-wide font-serif-china">
                  {selectedHighlight.description}
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedHighlight(null)}
                    className="bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 text-xs px-6 py-2.5 rounded border border-gold-500/40 tracking-wider font-semibold cursor-pointer"
                  >
                    我知道了
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
