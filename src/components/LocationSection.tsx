import { useState, useEffect, useRef, FormEvent } from 'react';
import { MapPin, User, Phone, Check, ChevronDown, Sparkles, X, Heart, ShieldAlert, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MAP_LOCATIONS } from '../data';
import { MapLocation, Booking } from '../types';

interface LocationSectionProps {
  preselectedLayout: string;
  onBookingAdded: () => void;
}

export default function LocationSection({ preselectedLayout, onBookingAdded }: LocationSectionProps) {
  // Map interactive states
  const [selectedLocation, setSelectedLocation] = useState<MapLocation>(MAP_LOCATIONS[0]);
  const [showInfrModal, setShowInfrModal] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [intendedLayout, setIntendedLayout] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [lastSubmittedBooking, setLastSubmittedBooking] = useState<Booking | null>(null);

  const bookingFormRef = useRef<HTMLDivElement>(null);

  // Sync preselected layout from parent
  useEffect(() => {
    if (preselectedLayout) {
      setIntendedLayout(preselectedLayout);
      // Smoothly scroll to the booking section
      setTimeout(() => {
        bookingFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [preselectedLayout]);

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    // Validation
    if (!name.trim()) {
      setSubmitError('请输入您的尊姓大名');
      return;
    }
    if (name.trim().length < 2) {
      setSubmitError('请填写正确的姓名 (至少2个字)');
      return;
    }

    // Phone format check: standard Chinese phone number starts with 1 and has 11 digits
    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (!phone.trim()) {
      setSubmitError('请输入您的手机号码');
      return;
    }
    if (cleanPhone.length < 11) {
      setSubmitError('请输入正确的11位移动电话号码');
      return;
    }

    if (!intendedLayout) {
      setSubmitError('请选择您意向品鉴的户型');
      return;
    }

    // Generate booking
    const newBooking: Booking = {
      id: `booking_${Date.now()}`,
      name: name.trim(),
      phone: cleanPhone,
      layoutId: intendedLayout,
      layoutName: intendedLayout,
      createdAt: new Date().toISOString()
    };

    // Save to local storage
    try {
      const existingRaw = localStorage.getItem('yunjing_oriental_bookings');
      const existing: Booking[] = existingRaw ? JSON.parse(existingRaw) : [];
      const updated = [newBooking, ...existing];
      localStorage.setItem('yunjing_oriental_bookings', JSON.stringify(updated));

      // Set states
      setLastSubmittedBooking(newBooking);
      setShowSuccessToast(true);
      setName('');
      setPhone('');
      setIntendedLayout('');

      // Callback
      onBookingAdded();
    } catch (err) {
      setSubmitError('系统繁忙，请稍后再试');
    }
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'project': return 'bg-gold-500 border-white text-slate-950 scale-125';
      case 'park': return 'bg-emerald-500 border-white text-white';
      case 'river': return 'bg-sky-500 border-white text-white';
      case 'cbd': return 'bg-indigo-500 border-white text-white';
      case 'school': return 'bg-amber-500 border-white text-white';
      case 'commercial': return 'bg-rose-500 border-white text-white';
      default: return 'bg-gray-500 border-white text-white';
    }
  };

  return (
    <section id="location" className="py-24 bg-slate-900 border-b border-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Location value introduction (3 columns) */}
          <div className="lg:col-span-3 space-y-6 lg:pt-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-gold-400 font-bold font-sans">
                Location Prestige
              </p>
              <h3 className="font-serif text-3xl md:text-4xl font-light text-white tracking-widest leading-tight font-serif-china">
                择址城市中轴 <br />
                <span className="text-gold-300 font-normal">拥揽世界繁华</span>
              </h3>
              <div className="h-[2px] w-12 bg-gold-400"></div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed font-light font-serif-china">
              项目尊踞核心黄金中轴之上，坐拥一城顶级资源的极致精粹。
              近揽宽阔的一线江景，远眺黄浦江畔、陆家嘴璀璨地标天际线。
              出则拥享万象繁华商业，入则得私享低密自然的静谧。
            </p>

            <button
              onClick={() => setShowInfrModal(true)}
              className="bg-transparent border border-gold-400/40 hover:border-gold-300 hover:bg-gold-500/10 text-gold-300 font-serif-china px-6 py-2.5 rounded text-xs tracking-widest flex items-center space-x-1.5 transition-all cursor-pointer shadow-md"
              id="btn-location-value"
            >
              <span>区位配套价值</span>
              <span>&gt;</span>
            </button>
          </div>

          {/* Middle Column: Interactive map layout (6 columns) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-16/9 md:aspect-4/3 lg:aspect-16/9 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 shadow-2xl">
              {/* Generated Stylized Map */}
              <img
                src="/src/assets/images/location_map_1783503230229.jpg"
                alt="区位图"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />

              {/* Map Interactive Overlays */}
              {MAP_LOCATIONS.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className="absolute group transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-all duration-300"
                    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                    id={`map-marker-${loc.id}`}
                  >
                    {/* Glowing outer aura for map visual */}
                    <span className={`absolute inset-0 rounded-full scale-150 transition-all duration-300 ${
                      isSelected
                        ? 'bg-gold-400/30 scale-[2.2]'
                        : 'bg-white/10 group-hover:bg-gold-400/20 group-hover:scale-175'
                    }`}></span>

                    {/* Inner point with icon */}
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-lg transition-transform duration-300 ${
                      getMarkerColor(loc.type)
                    } ${
                      isSelected ? 'scale-115 rotate-12 map-pulse' : 'group-hover:scale-110'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>

                    {/* Text flag above/below marker */}
                    <div className={`absolute left-1/2 -translate-x-1/2 pointer-events-none mt-1 transition-all duration-300 whitespace-nowrap px-2 py-1 rounded text-[10px] font-medium tracking-wide shadow-md ${
                      isSelected
                        ? 'bg-gold-500 text-slate-950 translate-y-1 scale-105 opacity-100 z-20 font-bold'
                        : 'bg-slate-950/90 text-white/80 translate-y-0 opacity-80 scale-90 group-hover:opacity-100 group-hover:text-gold-300'
                    }`}>
                      {loc.name.replace(' (本案)', '')}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Location Details Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLocation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-950/80 border border-gold-500/10 p-5 rounded-lg flex flex-col sm:flex-row items-center sm:items-start justify-between space-y-3 sm:space-y-0 sm:space-x-4"
                id="map-detail-panel"
              >
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <span className={`w-2 h-2 rounded-full ${
                      selectedLocation.type === 'project' ? 'bg-gold-400' : 'bg-sky-400'
                    }`}></span>
                    <h4 className="font-serif font-bold text-base text-gold-300 tracking-wide font-serif-china">
                      {selectedLocation.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-light font-serif-china">
                    {selectedLocation.description}
                  </p>
                </div>
                <div className="flex-shrink-0 bg-gold-500/10 border border-gold-500/20 text-gold-300 text-xs px-3 py-1.5 rounded-full font-mono font-medium whitespace-nowrap">
                  {selectedLocation.distance}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Premium Booking Form (3 columns) */}
          <div ref={bookingFormRef} className="lg:col-span-3 lg:pt-1">
            <div className="bg-slate-950 border border-gold-500/20 rounded-lg p-6 shadow-2xl relative">
              {/* Highlight borders for VIP design */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 rounded-t-lg"></div>

              <div className="text-center space-y-2 mb-6">
                <h4 className="font-serif text-xl font-bold text-gold-300 tracking-widest font-serif-china">
                  预约品鉴
                </h4>
                <p className="text-xs text-slate-400 font-serif-china tracking-wider">
                  尊享一对一置业顾问私人专场服务
                </p>
              </div>

              {/* Form submit message indicator */}
              {submitError && (
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs p-3 rounded mb-4 flex items-center space-x-2 font-serif-china">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5 relative">
                  <label className="text-xs text-slate-400 tracking-widest font-serif-china block">您的姓名</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="请输入您的尊姓名讳"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-white text-xs pl-9 pr-4 py-3 rounded focus:border-gold-400 transition-all font-serif-china"
                      id="booking-name-input"
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5 relative">
                  <label className="text-xs text-slate-400 tracking-widest font-serif-china block">联络手机</label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="请输入11位移动电话"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-white text-xs pl-9 pr-4 py-3 rounded focus:border-gold-400 transition-all font-mono"
                      id="booking-phone-input"
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  </div>
                </div>

                {/* Layout Dropdown Selection */}
                <div className="space-y-1.5 relative">
                  <label className="text-xs text-slate-400 tracking-widest font-serif-china block">意向户型</label>
                  <div className="relative">
                    <select
                      value={intendedLayout}
                      onChange={(e) => setIntendedLayout(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-white text-xs px-3 py-3 rounded focus:border-gold-400 transition-all appearance-none cursor-pointer font-serif-china"
                      id="booking-layout-select"
                    >
                      <option value="" disabled>请选择意向户型</option>
                      <option value="143m² 四室两厅两卫">143m² 四室两厅两卫</option>
                      <option value="180m² 四室两厅三卫">180m² 四室两厅三卫</option>
                      <option value="220m² 四室两厅三卫">220m² 四室两厅三卫</option>
                      <option value="320m² 五室两厅四卫">320m² 五室两厅四卫</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Terms Disclaimer */}
                <p className="text-[10px] text-slate-500 leading-relaxed font-light font-serif-china pt-1 text-center">
                  * 提交代表您同意接受一对一尊属顾问的联络与品鉴邀请，我们将严格保密您的个人隐私。
                </p>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-gold-500 hover:bg-gold-600 text-slate-950 font-serif-china font-bold tracking-[0.25em] py-3 rounded mt-4 transition-all duration-300 shadow-lg cursor-pointer transform hover:scale-[1.02]"
                  id="booking-submit-btn"
                >
                  立即预约
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Infrastructure details modal popup */}
      <AnimatePresence>
        {showInfrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-gold-500/30 max-w-2xl w-full rounded-lg shadow-2xl overflow-hidden relative text-white"
              id="infrastructure-modal"
            >
              <button
                onClick={() => setShowInfrModal(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 space-y-6">
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6 text-gold-400" />
                  <h3 className="font-serif text-xl font-bold text-gold-300 tracking-widest font-serif-china">
                    云境东方 · 360° 尊奢生活配套
                  </h3>
                </div>

                <div className="h-[1px] bg-gradient-to-r from-gold-400/20 to-transparent"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gold-300 tracking-wide font-serif-china">🚉 顶尖立体交通</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light font-serif-china">
                      毗邻世纪大道特大型换乘中心，无缝换乘地铁2/4/6/9号线。自驾直通世纪大道、浦东大道，越江隧道数分钟即达陆家嘴与浦西核心圈。
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gold-300 tracking-wide font-serif-china">🌳 一线景观生态</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light font-serif-china">
                      下楼即达黄浦滨江黄金景观缓跑绿道。首排对望世纪公园及周边万余平大绿地，都市繁华之中，私藏极其难得的森林氧吧生活。
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gold-300 tracking-wide font-serif-china">🎓 顶流人文教育</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light font-serif-china">
                      周边环抱福山外国语小学、建平中学等顶级百年名校，名校双语幼儿园林立，全链条顶级名师资源，筑梦显赫门阀子弟锦绣前程。
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gold-300 tracking-wide font-serif-china">🏥 顶级健康守护</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light font-serif-china">
                      5-10分钟医疗急救圈。直通东方医院、仁济医院、上海中医药大学附属医院等多家三级甲等综合权威医院，为世家生命健康保驾护航。
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setShowInfrModal(false)}
                    className="bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 text-xs px-6 py-2.5 rounded border border-gold-500/40 tracking-wider font-semibold cursor-pointer"
                  >
                    关闭窗口
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Submit Success Toast */}
      <AnimatePresence>
        {showSuccessToast && lastSubmittedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="bg-slate-950 border border-gold-400 max-w-md w-full rounded-lg shadow-2xl p-6 text-center text-white"
              id="booking-success-toast"
            >
              <div className="w-16 h-16 bg-gold-400/10 text-gold-400 border border-gold-400/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Check className="w-8 h-8" />
              </div>

              <h4 className="font-serif text-xl font-bold text-gold-300 tracking-widest font-serif-china mb-2">
                恭喜，您的预约已受理
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-serif-china mb-6">
                尊贵的 <strong>{lastSubmittedBooking.name}</strong> 先生/女士，您的 <strong>{lastSubmittedBooking.layoutName}</strong> 尊享品鉴预约已录入官方名录。
                我们的一对一资深置业顾问将在1小时内致电 <strong>{lastSubmittedBooking.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</strong> 与您确认专属品鉴时间，请保持电话畅通。
              </p>

              <button
                onClick={() => setShowSuccessToast(false)}
                className="w-full bg-gold-500 hover:bg-gold-600 text-slate-950 font-serif-china font-bold tracking-widest py-3 rounded shadow cursor-pointer transition-colors"
                id="close-success-toast-btn"
              >
                好的，我知道了
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
