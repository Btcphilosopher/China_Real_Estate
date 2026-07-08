import { ApartmentLayout, HighlightFeature, MapLocation } from './types';

export const APARTMENT_LAYOUTS: ApartmentLayout[] = [
  {
    id: "143m",
    area: 143,
    title: "四室两厅两卫",
    tags: ["南向宽厅", "瞰景阳台", "动静分区"],
    image: "/src/assets/images/apartment_143m_1783503245722.jpg",
    description: "南向极境宽厅，拥揽每日充沛阳光。配备超大宽幕景观阳台，直面中庭四季东方园林。动静合理分区，主卧私密套房设计，全明采光，尊享质感生活。",
    rooms: [
      { name: "南向豪华主卧套房 (含主卫)", size: "约24 m²" },
      { name: "宽幕采光客厅 (客餐厅一体)", size: "约36 m²" },
      { name: "观景次卧/创意多功能书房", size: "约15 m²" },
      { name: "U型大面宽厨房", size: "约12 m²" }
    ],
    benefits: [
      "约11.8米超大南向三面宽面宽，实现采光无死角",
      "配备约6.8米阔画境巨幕阳台，东方山水园林尽收眼底",
      "主卧独立步入式衣帽间及双卫设计，起居动线互不干扰"
    ]
  },
  {
    id: "180m",
    area: 180,
    title: "四室两厅三卫",
    tags: ["双套房设计", "阔境横厅", "独立家政间"],
    image: "/src/assets/images/apartment_180m_1783503262034.jpg",
    description: "双豪华套房设计，兼顾两代人的高品质生活。约7.2米阔境横厅，无界延伸视觉，承载世家名门的待客之礼。设有独立家政空间，琐碎日常井然有序，尽显从容。",
    rooms: [
      { name: "至臻行政级主卧套房 (配衣帽间及双台盆浴缸)", size: "约32 m²" },
      { name: "独立私享长辈套房 (南向自带卫浴)", size: "约20 m²" },
      { name: "全景尊尚横厅 (超宽巨幕会客空间)", size: "约45 m²" },
      { name: "独立高净家政洗护中心", size: "约8 m²" }
    ],
    benefits: [
      "约7.2米中西双厨餐客厅一体化空间，圈层待客风范",
      "南向双星级奢华套房，体贴长辈起居安全与私密",
      "独立洗护家政阳台，做到日常生活家政动线科学不交叉"
    ]
  },
  {
    id: "220m",
    area: 220,
    title: "四室两厅三卫",
    tags: ["专属电梯厅", "L型巨幕阳台", "多功能书房"],
    image: "/src/assets/images/apartment_220m_1783503280008.jpg",
    description: "专梯专户极佳私密入户，尊崇皇家迎宾归家礼仪。270° L型环幕折角阳台，无死角俯瞰无界一线江景与城市中轴公园。多功能人文书房，品茶阅卷之间，彰显时代人物风范。",
    rooms: [
      { name: "总统套房级主卧 (270°环幕全景飘窗)", size: "约38 m²" },
      { name: "270° L型全息折角无界会客厅", size: "约55 m²" },
      { name: "静雅书香人文研习室", size: "约16 m²" },
      { name: "尊享私家独立电梯前厅", size: "约10 m²" }
    ],
    benefits: [
      "270° L型巨幕折角阳台，打造极致瞰江与瞰园视界观",
      "独门独户专属电梯厅尊享前廊，彰显大家族尊贵仪仗",
      "主卧配备私享大浴缸、男女独立步入式衣帽区，五星级酒店体验"
    ]
  },
  {
    id: "320m",
    area: 320,
    title: "五室两厅四卫",
    tags: ["总统套房设计", "270°观景", "私人会所级体验"],
    image: "/src/assets/images/apartment_320m_1783503297449.jpg",
    description: "极致奢阔的云端大平层，专为全球领袖定制。总统级奢华套卧，270°环形天际线观景。客厅空间宽阔，可作私人艺术收藏画廊或私人会所沙龙，于时代巅峰处尽享黄浦滨江繁华。",
    rooms: [
      { name: "元首级全功能主卧套房 (包含水疗SPA中心)", size: "约48 m²" },
      { name: "私人高端社交圈层沙龙会客大厅", size: "约80 m²" },
      { name: "星级中西岛台双功能宴会级餐厅", size: "约25 m²" },
      { name: "环形云端艺术画廊 / 私人健身房", size: "约20 m²" }
    ],
    benefits: [
      "270°环视无界璀璨天际线，黄浦江头排无遮挡景观",
      "超80㎡会所级极境家庭会客社交空间，家庭宴会私家沙龙完美承载",
      "全套房设计，独立双通道保姆起居间，真正做到主人与家政分道"
    ]
  }
];

export const HIGHLIGHT_FEATURES: HighlightFeature[] = [
  {
    id: "density",
    iconName: "Home",
    title: "低密奢境",
    subtitle: "低密规划，私享宁静",
    description: "精心设计容积率，将土地还给自然。宽楼间距排布，让建筑在繁华市中心也能自由呼吸，为业主定制纯粹的私密静谧世界。"
  },
  {
    id: "master",
    iconName: "PenTool",
    title: "大师匠造",
    subtitle: "国际团队，精工品质",
    description: "联袂多位国际知名建筑、室内与景观设计大师共同执笔，公建化质感铝板美学立面，以雕塑级工艺，树立流传世纪的艺术地标。"
  },
  {
    id: "view",
    iconName: "Eye",
    title: "一线瞰景",
    subtitle: "极目江景，视野无界",
    description: "得天独厚的排首江景地块。超宽落地大窗，高层视野一览无遮挡，俯瞰江水奔腾、对望陆家嘴城市天际线，视界阔达无界。"
  },
  {
    id: "amenities",
    iconName: "Compass",
    title: "尊享配套",
    subtitle: "会所、商业、教育一应俱全",
    description: "配备豪华下沉式私家会所，包含恒温星空泳池、高端私宴厅。周边高档顶奢商业环抱、顶级优质教育链，满足生活的一切渴望。"
  },
  {
    id: "smart",
    iconName: "Cpu",
    title: "智慧社区",
    subtitle: "智能安防，科技生活",
    description: "搭载智慧物业人脸无感归家、AI全景红外监控安防、微气候除霾新风环控、智控全屋家居等科技，为现代世家门阀提供全方位护航。"
  }
];

export const MAP_LOCATIONS: MapLocation[] = [
  {
    id: "project",
    name: "本案位置 (云境东方)",
    x: 52,
    y: 54,
    type: "project",
    description: "云境东方，雄踞城市金腰带，中轴正统首排，亲江而筑，尽享绝版城央资源。",
    distance: "本案核心原点"
  },
  {
    id: "park",
    name: "城市中央公园",
    x: 35,
    y: 28,
    type: "park",
    description: "近万平米天然城市绿肺，环绕绿色缓跑径，绿茵葱郁，为您挡下城市喧嚣。",
    distance: "下楼漫步约3分钟"
  },
  {
    id: "river",
    name: "滨江景观绿带",
    x: 42,
    y: 72,
    type: "river",
    description: "漫步亲水步道，享受落日微风。这里有精心维护的雕塑公园与滨江骑行路线。",
    distance: "出门步行约2分钟"
  },
  {
    id: "cbd",
    name: "陆家嘴中央商务区",
    x: 25,
    y: 42,
    type: "cbd",
    description: "全球金融之巅，摩天楼群交相辉映，上海最繁华的顶级商务及金融精英汇聚地。",
    distance: "日常驱车约8分钟"
  },
  {
    id: "school",
    name: "名校教育圈",
    x: 65,
    y: 25,
    type: "school",
    description: "省级示范双语幼儿园、省市重点中小学林立，卓越人文环境，为孩子铺就菁英前程。",
    distance: "步行约6分钟可达"
  },
  {
    id: "commercial",
    name: "高端商业地标",
    x: 75,
    y: 65,
    type: "commercial",
    description: "汇聚国金中心、恒隆广场等顶级顶奢商业，包含黑珍珠与米其林奢品餐厅，同步全球时尚。",
    distance: "车行约5分钟即达"
  }
];
