import type { Role, RoleMeta, MockUser } from '@/types';

export const roleMeta: Record<Role, RoleMeta> = {
  farmer: {
    id: 'farmer',
    label: 'Farmer',
    description: 'Manage harvests, listings, and farm operations',
    icon: 'Sprout',
    accent: 'from-green-500 to-emerald-600',
    tagline: 'Grow with confidence',
  },
  buyer: {
    id: 'buyer',
    label: 'Buyer',
    description: 'Browse fresh produce and place orders',
    icon: 'ShoppingBasket',
    accent: 'from-amber-500 to-orange-600',
    tagline: 'Fresh from the field',
  },
  'bulk-buyer': {
    id: 'bulk-buyer',
    label: 'Bulk Buyer',
    description: 'Source large volumes at wholesale rates',
    icon: 'Truck',
    accent: 'from-orange-500 to-red-500',
    tagline: 'Scale your supply',
  },
  staff: {
    id: 'staff',
    label: 'Staff',
    description: 'Coordinate logistics and fulfill orders',
    icon: 'ClipboardList',
    accent: 'from-sky-500 to-blue-600',
    tagline: 'Keep things moving',
  },
  'regional-admin': {
    id: 'regional-admin',
    label: 'Regional Admin',
    description: 'Oversee regional operations and approvals',
    icon: 'Map',
    accent: 'from-teal-500 to-cyan-600',
    tagline: 'Regional oversight',
  },
  'super-admin': {
    id: 'super-admin',
    label: 'Super Admin',
    description: 'Full platform control and configuration',
    icon: 'ShieldCheck',
    accent: 'from-slate-600 to-slate-800',
    tagline: 'Platform control',
  },
  expert: {
    id: 'expert',
    label: 'Expert',
    description: 'Provide advisory and verify quality standards',
    icon: 'GraduationCap',
    accent: 'from-indigo-500 to-blue-700',
    tagline: 'Knowledge that grows',
  },
  provider: {
    id: 'provider',
    label: 'Provider',
    description: 'Supply equipment, seeds, and services',
    icon: 'Package',
    accent: 'from-violet-500 to-purple-600',
    tagline: 'Equip the harvest',
  },
  warehouse: {
    id: 'warehouse',
    label: 'Warehouse',
    description: 'Manage inventory, storage, and dispatch',
    icon: 'Warehouse',
    accent: 'from-stone-500 to-stone-700',
    tagline: 'Store and dispatch',
  },
};

export const roleList: RoleMeta[] = Object.values(roleMeta);

const mockUsers: Record<Role, MockUser> = {
  farmer: {
    id: 'u-farmer-01',
    name: 'Amara Okafor',
    email: 'amara@harvestlink.farm',
    role: 'farmer',
    region: 'Oyo, Nigeria',
  },
  buyer: {
    id: 'u-buyer-01',
    name: 'Liam Chen',
    email: 'liam@freshkitchen.com',
    role: 'buyer',
    buyerType: 'restaurant',
    region: 'Lagos, Nigeria',
  },
  'bulk-buyer': {
    id: 'u-bulk-01',
    name: 'Sofia Martinez',
    email: 'sofia@agrodistributors.com',
    role: 'bulk-buyer',
    buyerType: 'distributor',
    region: 'Kano, Nigeria',
  },
  staff: {
    id: 'u-staff-01',
    name: 'Kwame Mensah',
    email: 'kwame@harvestlink.com',
    role: 'staff',
    region: 'Accra, Ghana',
  },
  'regional-admin': {
    id: 'u-ra-01',
    name: 'Zara Abdullahi',
    email: 'zara@harvestlink.com',
    role: 'regional-admin',
    region: 'Northwest Region',
  },
  'super-admin': {
    id: 'u-sa-01',
    name: 'Daniel Okonkwo',
    email: 'daniel@harvestlink.com',
    role: 'super-admin',
    region: 'Global',
  },
  expert: {
    id: 'u-expert-01',
    name: 'Dr. Priya Nair',
    email: 'priya@harvestlink.com',
    role: 'expert',
    region: 'Remote',
  },
  provider: {
    id: 'u-prov-01',
    name: 'Marcus Bello',
    email: 'marcus@agrosupply.com',
    role: 'provider',
    region: 'Ibadan, Nigeria',
  },
  warehouse: {
    id: 'u-wh-01',
    name: 'Fatima Ibrahim',
    email: 'fatima@harvestlink.com',
    role: 'warehouse',
    region: 'Central Hub',
  },
};

export async function mockGetCurrentUser(role: Role): Promise<MockUser> {
  await delay(200);
  return mockUsers[role];
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
