import { Phone, MapPin, Clock, ArrowUpCircle } from 'lucide-react';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
  onLinkClick: (title: string) => void;
}

export default function Footer({ onNavClick, onLinkClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: '项目概览',
      items: ['项目简介', '规划设计', '建筑设计', '园林景观']
    },
    {
      title: '户型鉴赏',
      items: ['143m²户型', '180m²户型', '220m²户型', '320m²户型']
    },
    {
      title: '生活美学',
      items: ['会所体验', '精装体系', '物业服务', '社区文化']
    },
    {
      title: '资讯中心',
      items: ['项目动态', '媒体报道', '行业资讯']
    }
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-slate-950 text-white/90 border-t border-gold-500/10 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -right-40 -bottom-40 w-96 h-96 bg-gold-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/5">
          {/* Brand Left Column (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 border border-gold-400 rounded flex items-center justify-center p-1">
                <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L9.5 7h5L12 2zm-5.5 8L4 15h16l-2.5-5H6.5zm-3.5 8L1 21h22l-2-3H3z" />
                  <rect x="11" y="8" width="2" height="11" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-gold-300 tracking-[0.2em] leading-tight">
                  云境东方
                </h4>
                <p className="text-[8px] font-sans text-gold-400/60 tracking-[0.25em] uppercase leading-none mt-0.5">
                  Yunjing Oriental
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light font-serif-china">
              云境天成，大境东方。本案由跨国建筑翘楚与东方山水大师联合筑就，秉承人文奢华之志，敬献时代前列塔尖人物。
            </p>

            <button
              onClick={handleScrollToTop}
              className="flex items-center space-x-2 text-xs text-gold-400 hover:text-gold-300 transition-colors cursor-pointer pt-2 group"
              id="footer-scroll-top"
            >
              <ArrowUpCircle className="w-4 h-4 text-gold-400 group-hover:animate-bounce" />
              <span className="tracking-widest font-serif-china">回至网页顶部</span>
            </button>
          </div>

          {/* Links Middle Columns (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerLinks.map((col) => (
              <div key={col.title} className="space-y-4">
                <h5 className="text-sm font-semibold text-gold-300 tracking-wider font-serif-china pb-1 border-b border-white/5">
                  {col.title}
                </h5>
                <ul className="space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => onLinkClick(item)}
                        className="text-xs text-slate-400 hover:text-white transition-colors duration-200 text-left cursor-pointer font-serif-china font-light hover:underline"
                        id={`footer-link-${item}`}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Right Column (3 cols) */}
          <div className="lg:col-span-3 space-y-6 flex flex-col items-center lg:items-end text-center lg:text-right">
            <div className="space-y-2 w-full">
              <h5 className="text-xs text-slate-400 uppercase tracking-widest font-medium font-sans">
                VIP Exclusive Hotline
              </h5>
              <a
                href="tel:400-888-8888"
                className="block text-2xl md:text-3xl font-bold font-serif text-gold-300 tracking-wide hover:text-gold-200 transition-colors leading-none"
              >
                400-888-8888
              </a>
            </div>

            <div className="space-y-1.5 text-xs text-slate-400 font-serif-china font-light w-full">
              <div className="flex items-center justify-center lg:justify-end space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                <span>中国·上海·浦东新区世纪大道8号</span>
              </div>
              <div className="flex items-center justify-center lg:justify-end space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                <span>服务时间: 每天 9:00 - 18:00</span>
              </div>
            </div>

            {/* WeChat QR Code */}
            <div className="flex flex-col items-center space-y-2 bg-slate-900 border border-gold-500/10 p-3.5 rounded-lg w-fit">
              <img
                src="/src/assets/images/qr_code_1783503313974.jpg"
                alt="云境东方公众号"
                referrerPolicy="no-referrer"
                className="w-20 h-20 object-contain rounded"
              />
              <span className="text-[10px] text-slate-400 tracking-widest font-serif-china">
                关注官方微信公众号
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-slate-500 space-y-4 md:space-y-0 tracking-wide font-serif-china font-light">
          <p>© {currentYear} 云境东方 版权所有. 保留所有尊属权力。</p>
          <div className="flex items-center space-x-4">
            <span>沪ICP备12345678号</span>
            <span className="text-white/5">|</span>
            <button onClick={() => onLinkClick('隐私政策')} className="hover:text-white transition-colors cursor-pointer">隐私政策</button>
            <span className="text-white/5">|</span>
            <button onClick={() => onLinkClick('网站地图')} className="hover:text-white transition-colors cursor-pointer">网站地图</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
