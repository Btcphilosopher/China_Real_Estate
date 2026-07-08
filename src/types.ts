export interface ApartmentLayout {
  id: string;
  area: number; // e.g. 143, 180, 220, 320
  title: string; // e.g. "四室两厅两卫"
  tags: string[]; // e.g. ["南向宽厅", "瞰景阳台", "动静分区"]
  image: string; // generated image URL
  description: string; // detailed paragraph
  rooms: { name: string; size: string }[]; // details of rooms
  benefits: string[]; // custom selling points
}

export interface HighlightFeature {
  id: string;
  iconName: string; // Name of Lucide icon
  title: string; // e.g. "低密奢境"
  subtitle: string; // e.g. "低密规划，私享宁静"
  description: string; // Detailed description for hover or click
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  layoutId: string;
  layoutName: string;
  createdAt: string;
}

export interface MapLocation {
  id: string;
  name: string;
  x: number; // percentage X position
  y: number; // percentage Y position
  type: 'project' | 'park' | 'river' | 'cbd' | 'school' | 'commercial';
  description: string;
  distance: string; // e.g. "步行约5分钟" / "约1.5公里"
}
