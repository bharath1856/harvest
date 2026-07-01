import type { Role } from '@/types';
import type { ActivityItem } from '@/components/dashboard/ActivityFeed';
import type { QuickAction } from '@/components/dashboard/QuickActions';
import type { QrMode } from '@/components/modules/QrWidget';
import type { WeatherMode } from '@/components/modules/WeatherWidget';
import type { CommunityMode } from '@/components/modules/CommunityWidget';
import type { LandLeaseMode } from '@/components/modules/LandLeaseWidget';

export interface ModuleConfig {
  qr?: QrMode;
  weather?: WeatherMode;
  community?: CommunityMode;
  landLease?: LandLeaseMode;
}

export interface KpiData {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  accent: string;
}

export interface ChartSeries {
  name: string;
  data: number[];
  color: string;
}

export interface ChartConfig {
  type: 'area' | 'bar' | 'line' | 'pie';
  title: string;
  description: string;
  categories: string[];
  series: ChartSeries[];
}

export interface RoleDashboardData {
  kpis: KpiData[];
  primaryChart: ChartConfig;
  secondaryChart?: ChartConfig;
  activity: ActivityItem[];
  actions: QuickAction[];
  insight: { title: string; body: string; tone: 'success' | 'warning' | 'default' };
  modules: ModuleConfig;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export const roleDashboardData: Record<Role, RoleDashboardData> = {
  farmer: {
    kpis: [
      { label: 'Active Harvests', value: '12', change: 8, changeLabel: 'vs last month', icon: 'Sprout', accent: 'bg-success/15 text-success' },
      { label: 'Revenue (MTD)', value: '₦842K', change: 15, changeLabel: 'vs last month', icon: 'Wallet', accent: 'bg-primary/15 text-primary' },
      { label: 'Pending Orders', value: '4', change: -20, changeLabel: '2 fulfilled', icon: 'ListOrdered', accent: 'bg-warning/15 text-warning' },
      { label: 'Avg Yield / Ha', value: '3.2T', change: 5, changeLabel: 'above target', icon: 'TrendingUp', accent: 'bg-accent/15 text-accent-foreground' },
    ],
    primaryChart: {
      type: 'area',
      title: 'Harvest Yield Trend',
      description: 'Monthly yield in tonnes over the last 6 months',
      categories: months,
      series: [
        { name: 'Tomatoes', data: [2.1, 2.8, 3.2, 2.9, 3.5, 3.8], color: 'hsl(var(--chart-1))' },
        { name: 'Maize', data: [1.8, 2.2, 2.5, 2.8, 3.0, 3.2], color: 'hsl(var(--chart-2))' },
      ],
    },
    secondaryChart: {
      type: 'pie',
      title: 'Crop Distribution',
      description: 'Active crops by area',
      categories: ['Tomatoes', 'Maize', 'Cassava', 'Pepper'],
      series: [{ name: 'Area', data: [35, 28, 22, 15], color: 'hsl(var(--chart-1))' }],
    },
    activity: [
      { id: 'f1', icon: 'ShoppingBasket', title: 'New order received', description: '200kg tomatoes from Fresh Kitchen', time: '2h ago', tone: 'success' },
      { id: 'f2', icon: 'PackageCheck', title: 'Harvest completed', description: 'Plot B — 3.2T tomatoes harvested', time: '5h ago', tone: 'success' },
      { id: 'f3', icon: 'AlertTriangle', title: 'Low soil moisture', description: 'Plot A needs irrigation', time: '1d ago', tone: 'warning' },
      { id: 'f4', icon: 'Wallet', title: 'Payment received', description: '₦120K from Lagos Co-op', time: '2d ago', tone: 'success' },
      { id: 'f5', icon: 'Sprout', title: 'New crop planted', description: 'Cassava on Plot C — 1.5ha', time: '3d ago', tone: 'default' },
    ],
    actions: [
      { label: 'Add Harvest', icon: 'Sprout' },
      { label: 'New Listing', icon: 'Store' },
      { label: 'View Orders', icon: 'ListOrdered' },
      { label: 'Log Expense', icon: 'Wallet' },
      { label: 'Request Expert', icon: 'GraduationCap' },
      { label: 'Generate QR', icon: 'QrCode' },
    ],
    insight: { title: 'Yield forecast', body: 'Tomato yield is trending 15% above last season. Consider expanding Plot B capacity to meet rising buyer demand.', tone: 'success' },
    modules: { qr: 'generate', weather: 'farmer', community: 'feed', landLease: 'list' },
  },

  buyer: {
    kpis: [
      { label: 'Active Orders', value: '3', change: 0, changeLabel: 'all in transit', icon: 'ListOrdered', accent: 'bg-primary/15 text-primary' },
      { label: 'Total Spent', value: '₦156K', change: 12, changeLabel: 'this month', icon: 'Wallet', accent: 'bg-success/15 text-success' },
      { label: 'Saved Items', value: '8', change: 25, changeLabel: '2 new', icon: 'ShoppingBasket', accent: 'bg-accent/15 text-accent-foreground' },
      { label: 'Avg Delivery', value: '2.4 days', change: -10, changeLabel: 'faster than avg', icon: 'Truck', accent: 'bg-primary/15 text-primary' },
    ],
    primaryChart: {
      type: 'bar',
      title: 'Monthly Spending',
      description: 'Your spending over the last 6 months',
      categories: months,
      series: [{ name: 'Spending', data: [22, 28, 19, 35, 31, 42], color: 'hsl(var(--chart-2))' }],
    },
    secondaryChart: {
      type: 'pie',
      title: 'Spending by Category',
      description: 'Where your money goes',
      categories: ['Vegetables', 'Grains', 'Fruits', 'Tubers'],
      series: [{ name: 'Spend', data: [42, 28, 18, 12], color: 'hsl(var(--chart-2))' }],
    },
    activity: [
      { id: 'b1', icon: 'Truck', title: 'Order in transit', description: 'Order #1042 — arriving tomorrow', time: '1h ago', tone: 'default' },
      { id: 'b2', icon: 'CheckCircle2', title: 'Order delivered', description: 'Order #1038 — 50kg tomatoes', time: '6h ago', tone: 'success' },
      { id: 'b3', icon: 'ShoppingBasket', title: 'Saved listing', description: 'Organic peppers from Okafor Farms', time: '1d ago', tone: 'default' },
      { id: 'b4', icon: 'Wallet', title: 'Payment processed', description: '₦45K for order #1042', time: '2d ago', tone: 'success' },
    ],
    actions: [
      { label: 'Browse Market', icon: 'Store' },
      { label: 'My Orders', icon: 'ListOrdered' },
      { label: 'Saved Items', icon: 'ShoppingBasket' },
      { label: 'Scan QR', icon: 'QrCode' },
      { label: 'Track Delivery', icon: 'Truck' },
      { label: 'Community', icon: 'MessageSquare' },
    ],
    insight: { title: 'Price alert', body: 'Tomato prices in your region dropped 8% this week. Good time to stock up for your restaurant.', tone: 'success' },
    modules: { qr: 'scan', community: 'preview', landLease: 'browse' },
  },

  'bulk-buyer': {
    kpis: [
      { label: 'Open Contracts', value: '7', change: 16, changeLabel: '1 new this week', icon: 'FileText', accent: 'bg-primary/15 text-primary' },
      { label: 'Volume Sourced', value: '124T', change: 22, changeLabel: 'this quarter', icon: 'Boxes', accent: 'bg-success/15 text-success' },
      { label: 'Active Suppliers', value: '34', change: 6, changeLabel: '2 onboarded', icon: 'Sprout', accent: 'bg-accent/15 text-accent-foreground' },
      { label: 'Cost Savings', value: '₦2.1M', change: 18, changeLabel: 'vs spot buying', icon: 'Wallet', accent: 'bg-success/15 text-success' },
    ],
    primaryChart: {
      type: 'area',
      title: 'Procurement Volume',
      description: 'Tonnes sourced per month',
      categories: months,
      series: [
        { name: 'Contracted', data: [15, 18, 22, 20, 24, 28], color: 'hsl(var(--chart-1))' },
        { name: 'Spot', data: [8, 6, 5, 7, 4, 6], color: 'hsl(var(--chart-3))' },
      ],
    },
    secondaryChart: {
      type: 'bar',
      title: 'Top Suppliers',
      description: 'Volume by supplier (tonnes)',
      categories: ['Okafor', 'Bello', 'Adeyemi', 'Nwosu', 'Ibrahim'],
      series: [{ name: 'Tonnes', data: [32, 28, 22, 18, 14], color: 'hsl(var(--chart-3))' }],
    },
    activity: [
      { id: 'bb1', icon: 'FileText', title: 'Contract signed', description: '50T maize contract with Bello Farms', time: '3h ago', tone: 'success' },
      { id: 'bb2', icon: 'Truck', title: 'Bulk dispatch', description: '30T tomatoes en route to Lagos hub', time: '8h ago', tone: 'default' },
      { id: 'bb3', icon: 'Sprout', title: 'New supplier onboarded', description: 'Green Valley Co-op verified', time: '1d ago', tone: 'success' },
      { id: 'bb4', icon: 'AlertTriangle', title: 'Contract expiring', description: 'Adeyemi contract ends in 5 days', time: '2d ago', tone: 'warning' },
    ],
    actions: [
      { label: 'New Contract', icon: 'FileText' },
      { label: 'Browse Catalog', icon: 'Boxes' },
      { label: 'Track Logistics', icon: 'Truck' },
      { label: 'View Orders', icon: 'ListOrdered' },
      { label: 'Find Suppliers', icon: 'Sprout' },
      { label: 'Analytics', icon: 'BarChart3' },
    ],
    insight: { title: 'Supply optimization', body: 'Contracted volume now covers 82% of your needs. Extending the Bello Farms contract could reduce spot-buying costs by an additional ₦400K/quarter.', tone: 'success' },
    modules: { landLease: 'browse' },
  },

  staff: {
    kpis: [
      { label: 'Open Tasks', value: '12', change: -8, changeLabel: '4 completed today', icon: 'ClipboardCheck', accent: 'bg-primary/15 text-primary' },
      { label: 'Orders Fulfilled', value: '28', change: 12, changeLabel: 'today', icon: 'PackageCheck', accent: 'bg-success/15 text-success' },
      { label: 'Pending Dispatch', value: '6', change: 0, changeLabel: 'awaiting truck', icon: 'Truck', accent: 'bg-warning/15 text-warning' },
      { label: 'Quality Checks', value: '15', change: 20, changeLabel: 'this shift', icon: 'CheckCircle2', accent: 'bg-success/15 text-success' },
    ],
    primaryChart: {
      type: 'bar',
      title: 'Daily Fulfillment',
      description: 'Orders fulfilled per day this week',
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      series: [{ name: 'Orders', data: [22, 28, 25, 31, 28, 18], color: 'hsl(var(--chart-4))' }],
    },
    secondaryChart: {
      type: 'pie',
      title: 'Task Breakdown',
      description: 'Tasks by type',
      categories: ['Fulfillment', 'Dispatch', 'Quality', 'Other'],
      series: [{ name: 'Count', data: [12, 8, 6, 4], color: 'hsl(var(--chart-4))' }],
    },
    activity: [
      { id: 's1', icon: 'PackageCheck', title: 'Order fulfilled', description: 'Order #2014 — packed and labeled', time: '30m ago', tone: 'success' },
      { id: 's2', icon: 'Truck', title: 'Dispatch scheduled', description: 'Truck #08 departing at 14:00', time: '1h ago', tone: 'default' },
      { id: 's3', icon: 'CheckCircle2', title: 'Quality check passed', description: 'Batch #882 — tomatoes Grade A', time: '2h ago', tone: 'success' },
      { id: 's4', icon: 'AlertTriangle', title: 'Quality issue flagged', description: 'Batch #879 — 3% spoilage detected', time: '4h ago', tone: 'warning' },
    ],
    actions: [
      { label: 'New Task', icon: 'ClipboardCheck' },
      { label: 'Fulfill Order', icon: 'PackageCheck' },
      { label: 'Schedule Dispatch', icon: 'Truck' },
      { label: 'Quality Check', icon: 'CheckCircle2' },
      { label: 'Scan QR', icon: 'QrCode' },
      { label: 'Report Issue', icon: 'AlertTriangle' },
    ],
    insight: { title: 'Workload update', body: 'Fulfillment is 12% ahead of last week. Dispatch backlog is building — consider scheduling an extra truck for the 14:00 slot.', tone: 'warning' },
    modules: { qr: 'scan' },
  },

  'regional-admin': {
    kpis: [
      { label: 'Total Farmers', value: '1,240', change: 6, changeLabel: '72 new this month', icon: 'Sprout', accent: 'bg-success/15 text-success' },
      { label: 'Pending Approvals', value: '5', change: -37, changeLabel: '3 approved today', icon: 'ShieldQuestion', accent: 'bg-warning/15 text-warning' },
      { label: 'Regional Revenue', value: '₦4.2M', change: 14, changeLabel: 'this month', icon: 'TrendingUp', accent: 'bg-primary/15 text-primary' },
      { label: 'Active Alerts', value: '3', change: 0, changeLabel: '1 critical', icon: 'AlertTriangle', accent: 'bg-destructive/15 text-destructive' },
    ],
    primaryChart: {
      type: 'area',
      title: 'Regional Growth',
      description: 'Farmer registrations and revenue trend',
      categories: months,
      series: [
        { name: 'Farmers', data: [820, 910, 980, 1050, 1120, 1240], color: 'hsl(var(--chart-1))' },
        { name: 'Revenue (₦K)', data: [2800, 3100, 3400, 3700, 3900, 4200], color: 'hsl(var(--chart-2))' },
      ],
    },
    secondaryChart: {
      type: 'bar',
      title: 'District Performance',
      description: 'Revenue by district (₦K)',
      categories: ['North', 'South', 'East', 'West', 'Central'],
      series: [{ name: 'Revenue', data: [920, 1100, 680, 850, 650], color: 'hsl(var(--chart-2))' }],
    },
    activity: [
      { id: 'ra1', icon: 'ShieldQuestion', title: 'Approval requested', description: 'New farmer registration — Bello Farms', time: '1h ago', tone: 'warning' },
      { id: 'ra2', icon: 'CheckCircle2', title: 'Farmer approved', description: 'Green Valley Co-op verified', time: '3h ago', tone: 'success' },
      { id: 'ra3', icon: 'AlertTriangle', title: 'Critical alert', description: 'District East — supply shortage', time: '5h ago', tone: 'destructive' },
      { id: 'ra4', icon: 'TrendingUp', title: 'Revenue milestone', description: 'South district crossed ₦1M', time: '1d ago', tone: 'success' },
    ],
    actions: [
      { label: 'Review Approvals', icon: 'ShieldQuestion' },
      { label: 'View Farmers', icon: 'Sprout' },
      { label: 'District Report', icon: 'FileText' },
      { label: 'Manage Staff', icon: 'Users' },
      { label: 'View Alerts', icon: 'AlertTriangle' },
      { label: 'Analytics', icon: 'BarChart3' },
    ],
    insight: { title: 'Regional health', body: 'North district is underperforming by 18% vs target. Consider deploying additional staff and running a farmer onboarding drive.', tone: 'warning' },
    modules: { qr: 'compliance', community: 'moderate', landLease: 'approve' },
  },

  'super-admin': {
    kpis: [
      { label: 'Total Users', value: '16,200', change: 9, changeLabel: '1,400 new', icon: 'Users', accent: 'bg-primary/15 text-primary' },
      { label: 'Platform Revenue', value: '₦12.4M', change: 11, changeLabel: 'this quarter', icon: 'TrendingUp', accent: 'bg-success/15 text-success' },
      { label: 'Active Regions', value: '48', change: 4, changeLabel: '2 onboarded', icon: 'Globe', accent: 'bg-accent/15 text-accent-foreground' },
      { label: 'System Uptime', value: '99.9%', change: 0, changeLabel: '30-day average', icon: 'ShieldCheck', accent: 'bg-success/15 text-success' },
    ],
    primaryChart: {
      type: 'area',
      title: 'Platform Growth',
      description: 'Users and revenue across all regions',
      categories: months,
      series: [
        { name: 'Users', data: [9800, 11200, 12400, 13800, 14800, 16200], color: 'hsl(var(--chart-1))' },
        { name: 'Revenue (₦M)', data: [8.2, 9.1, 9.8, 10.5, 11.2, 12.4], color: 'hsl(var(--chart-2))' },
      ],
    },
    secondaryChart: {
      type: 'pie',
      title: 'User Distribution',
      description: 'Users by role',
      categories: ['Farmers', 'Buyers', 'Staff', 'Others'],
      series: [{ name: 'Users', data: [62, 24, 8, 6], color: 'hsl(var(--chart-1))' }],
    },
    activity: [
      { id: 'sa1', icon: 'Users', title: 'Bulk user import', description: '340 farmers added to Northwest region', time: '2h ago', tone: 'success' },
      { id: 'sa2', icon: 'ShieldCheck', title: 'Role updated', description: 'Staff #88 promoted to Regional Admin', time: '5h ago', tone: 'default' },
      { id: 'sa3', icon: 'Globe', title: 'New region live', description: 'South-South region activated', time: '1d ago', tone: 'success' },
      { id: 'sa4', icon: 'AlertTriangle', title: 'System alert', description: 'API rate limit threshold reached', time: '1d ago', tone: 'warning' },
    ],
    actions: [
      { label: 'Manage Users', icon: 'Users' },
      { label: 'Roles & Perms', icon: 'ShieldCheck' },
      { label: 'Add Region', icon: 'Globe' },
      { label: 'Audit Log', icon: 'FileText' },
      { label: 'Config', icon: 'Settings' },
      { label: 'Analytics', icon: 'BarChart3' },
    ],
    insight: { title: 'Platform status', body: 'All systems operational. User growth is accelerating at 9% MoM. Consider scaling the API gateway to handle the projected 20K users by next quarter.', tone: 'success' },
    modules: { qr: 'compliance', community: 'moderate', weather: 'overview', landLease: 'oversight' },
  },

  expert: {
    kpis: [
      { label: 'Active Advisories', value: '8', change: 14, changeLabel: '2 new requests', icon: 'GraduationCap', accent: 'bg-primary/15 text-primary' },
      { label: 'Quality Reviews', value: '3', change: -25, changeLabel: 'pending review', icon: 'CheckCircle2', accent: 'bg-warning/15 text-warning' },
      { label: 'Articles Published', value: '24', change: 8, changeLabel: 'this month', icon: 'FileText', accent: 'bg-success/15 text-success' },
      { label: 'Community Rating', value: '4.8/5', change: 2, changeLabel: 'from 142 reviews', icon: 'Users', accent: 'bg-accent/15 text-accent-foreground' },
    ],
    primaryChart: {
      type: 'bar',
      title: 'Advisory Sessions',
      description: 'Sessions conducted per month',
      categories: months,
      series: [{ name: 'Sessions', data: [12, 15, 18, 14, 20, 22], color: 'hsl(var(--chart-5))' }],
    },
    secondaryChart: {
      type: 'pie',
      title: 'Review Outcomes',
      description: 'Quality review results',
      categories: ['Approved', 'Conditional', 'Rejected'],
      series: [{ name: 'Count', data: [68, 22, 10], color: 'hsl(var(--chart-5))' }],
    },
    activity: [
      { id: 'e1', icon: 'GraduationCap', title: 'New advisory request', description: 'Soil management — Okafor Farms', time: '1h ago', tone: 'default' },
      { id: 'e2', icon: 'CheckCircle2', title: 'Quality review completed', description: 'Batch #882 — Grade A approved', time: '3h ago', tone: 'success' },
      { id: 'e3', icon: 'FileText', title: 'Article published', description: 'Best practices for dry-season farming', time: '1d ago', tone: 'success' },
      { id: 'e4', icon: 'MessageSquare', title: 'Community question', description: 'Pest control question from 3 farmers', time: '2d ago', tone: 'default' },
    ],
    actions: [
      { label: 'New Advisory', icon: 'GraduationCap' },
      { label: 'Quality Review', icon: 'CheckCircle2' },
      { label: 'Write Article', icon: 'FileText' },
      { label: 'Field Report', icon: 'FileText' },
      { label: 'Community', icon: 'MessageSquare' },
      { label: 'Knowledge Base', icon: 'HelpCircle' },
    ],
    insight: { title: 'Knowledge impact', body: 'Your articles on pest control have been viewed 1,200 times this month. Consider a series on dry-season irrigation — high demand from Northern farmers.', tone: 'success' },
    modules: { weather: 'expert', community: 'feed' },
  },

  provider: {
    kpis: [
      { label: 'Products Listed', value: '86', change: 5, changeLabel: '4 new', icon: 'Package', accent: 'bg-primary/15 text-primary' },
      { label: 'Open Orders', value: '6', change: 20, changeLabel: '2 urgent', icon: 'ListOrdered', accent: 'bg-warning/15 text-warning' },
      { label: 'Revenue (MTD)', value: '₦920K', change: 18, changeLabel: 'vs last month', icon: 'Wallet', accent: 'bg-success/15 text-success' },
      { label: 'Low Stock Items', value: '5', change: 0, changeLabel: 'needs reorder', icon: 'Boxes', accent: 'bg-destructive/15 text-destructive' },
    ],
    primaryChart: {
      type: 'area',
      title: 'Sales Trend',
      description: 'Monthly revenue (₦K)',
      categories: months,
      series: [{ name: 'Revenue', data: [580, 620, 680, 750, 820, 920], color: 'hsl(var(--chart-3))' }],
    },
    secondaryChart: {
      type: 'bar',
      title: 'Top Products',
      description: 'Best sellers by units',
      categories: ['Seeds', 'Fertilizer', 'Tools', 'Pesticide', 'Irrigation'],
      series: [{ name: 'Units', data: [320, 280, 180, 150, 95], color: 'hsl(var(--chart-3))' }],
    },
    activity: [
      { id: 'p1', icon: 'ListOrdered', title: 'New order', description: 'Order #302 — 50kg fertilizer', time: '1h ago', tone: 'success' },
      { id: 'p2', icon: 'AlertTriangle', title: 'Low stock alert', description: 'Irrigation kits below threshold', time: '4h ago', tone: 'warning' },
      { id: 'p3', icon: 'PackageCheck', title: 'Order shipped', description: 'Order #298 — dispatched to Ibadan', time: '6h ago', tone: 'success' },
      { id: 'p4', icon: 'Package', title: 'Product added', description: 'New organic pest control spray', time: '1d ago', tone: 'default' },
    ],
    actions: [
      { label: 'Add Product', icon: 'Package' },
      { label: 'Update Stock', icon: 'Boxes' },
      { label: 'View Orders', icon: 'ListOrdered' },
      { label: 'Add Service', icon: 'Store' },
      { label: 'Analytics', icon: 'BarChart3' },
      { label: 'Community', icon: 'MessageSquare' },
    ],
    insight: { title: 'Inventory alert', body: 'Irrigation kits are critically low with 6 pending orders. Reorder now to avoid stockout — lead time is 7 days.', tone: 'warning' },
    modules: { community: 'preview' },
  },

  warehouse: {
    kpis: [
      { label: 'In Stock Items', value: '248', change: 4, changeLabel: '12 received', icon: 'Boxes', accent: 'bg-primary/15 text-primary' },
      { label: 'Inbound Today', value: '18', change: 20, changeLabel: '6 pending', icon: 'PackageCheck', accent: 'bg-success/15 text-success' },
      { label: 'Outbound Today', value: '22', change: 10, changeLabel: '4 dispatched', icon: 'Truck', accent: 'bg-accent/15 text-accent-foreground' },
      { label: 'Storage Used', value: '78%', change: 3, changeLabel: 'capacity', icon: 'Warehouse', accent: 'bg-warning/15 text-warning' },
    ],
    primaryChart: {
      type: 'bar',
      title: 'Inbound vs Outbound',
      description: 'Daily flow this week',
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      series: [
        { name: 'Inbound', data: [15, 22, 18, 25, 20, 18], color: 'hsl(var(--chart-1))' },
        { name: 'Outbound', data: [20, 18, 24, 22, 28, 22], color: 'hsl(var(--chart-3))' },
      ],
    },
    secondaryChart: {
      type: 'pie',
      title: 'Storage by Category',
      description: 'Capacity usage',
      categories: ['Grains', 'Vegetables', 'Equipment', 'Other'],
      series: [{ name: 'Capacity', data: [38, 28, 22, 12], color: 'hsl(var(--chart-1))' }],
    },
    activity: [
      { id: 'w1', icon: 'PackageCheck', title: 'Inbound received', description: 'Batch #920 — 2T tomatoes checked in', time: '45m ago', tone: 'success' },
      { id: 'w2', icon: 'Truck', title: 'Dispatch completed', description: 'Truck #12 — 1.5T to Lagos hub', time: '2h ago', tone: 'success' },
      { id: 'w3', icon: 'AlertTriangle', title: 'Capacity warning', description: 'Cold storage at 92% capacity', time: '3h ago', tone: 'warning' },
      { id: 'w4', icon: 'Boxes', title: 'Inventory adjusted', description: 'Spoilage write-off — 45kg', time: '6h ago', tone: 'destructive' },
    ],
    actions: [
      { label: 'Check In', icon: 'PackageCheck' },
      { label: 'Dispatch', icon: 'Truck' },
      { label: 'Inventory', icon: 'Boxes' },
      { label: 'Scan QR', icon: 'QrCode' },
      { label: 'View Alerts', icon: 'AlertTriangle' },
      { label: 'Reports', icon: 'FileText' },
    ],
    insight: { title: 'Capacity alert', body: 'Cold storage is at 92% capacity. Schedule outbound dispatches for perishables today to avoid spoilage risk.', tone: 'warning' },
    modules: { qr: 'scan' },
  },
};
