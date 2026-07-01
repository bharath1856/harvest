export type Role =
  | 'farmer'
  | 'buyer'
  | 'bulk-buyer'
  | 'staff'
  | 'regional-admin'
  | 'super-admin'
  | 'expert'
  | 'provider'
  | 'warehouse';

export type BuyerType = 'individual' | 'restaurant' | 'distributor' | 'cooperative';

export type Theme = 'light' | 'dark' | 'system';

export interface RoleMeta {
  id: Role;
  label: string;
  description: string;
  icon: string;
  accent: string;
  tagline: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
  description?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface DashboardConfig {
  role: Role;
  title: string;
  subtitle: string;
  breadcrumb: { label: string; href?: string }[];
}

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  buyerType?: BuyerType;
  avatar?: string;
  region?: string;
}
