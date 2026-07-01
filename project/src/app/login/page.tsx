'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Sprout,
  ShoppingBasket,
  Truck,
  ClipboardList,
  Map,
  ShieldCheck,
  GraduationCap,
  Package,
  Warehouse,
  ArrowRight,
  ArrowLeft,
  Check,
  Mail,
  Lock,
  Eye,
  EyeOff,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { roleList, roleMeta } from '@/services/mockApi';
import { getDashboardPath } from '@/config/routes';
import type { Role, BuyerType } from '@/types';
import { toast } from 'sonner';

const buyerTypes: { id: BuyerType; label: string }[] = [
  { id: 'individual', label: 'Individual' },
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'distributor', label: 'Distributor' },
  { id: 'cooperative', label: 'Cooperative' },
];

const iconMap: Record<string, LucideIcon> = {
  Sprout,
  ShoppingBasket,
  Truck,
  ClipboardList,
  Map,
  ShieldCheck,
  GraduationCap,
  Package,
  Warehouse,
};

export default function LoginPage() {
  const router = useRouter();
  const { setRole, setBuyerType } = useApp();
  const reduceMotion = useReducedMotion();

  const [step, setStep] = useState<'role' | 'details'>('role');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedBuyerType, setSelectedBuyerType] = useState<BuyerType | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay, ease: 'easeOut' as const },
  });

  function handleRoleSelect(role: Role) {
    setSelectedRole(role);
    if (role === 'buyer' || role === 'bulk-buyer') {
      setStep('details');
    } else {
      setStep('details');
    }
  }

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedRole) return;
    if ((selectedRole === 'buyer' || selectedRole === 'bulk-buyer') && !selectedBuyerType) {
      toast.error('Please select a buyer type');
      return;
    }
    if (!email || !password) {
      toast.error('Please enter your email and password');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setRole(selectedRole);
      if (selectedBuyerType) setBuyerType(selectedBuyerType);
      toast.success(`Signed in as ${roleMeta[selectedRole].label}`);
      router.push(getDashboardPath(selectedRole));
    }, 600);
  }

  const needsBuyerType =
    selectedRole === 'buyer' || selectedRole === 'bulk-buyer';
  const currentMeta = selectedRole ? roleMeta[selectedRole] : null;

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      {/* Left panel — branding */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-emerald-700 to-emerald-900 lg:flex lg:w-1/2 lg:flex-col lg:justify-between lg:p-12">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <Link href="/" className="relative flex items-center gap-2.5 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
            <Sprout className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold">
            Harvest<span className="text-white/70">Link</span>
          </span>
        </Link>
        <div className="relative text-white">
          <h2 className="font-display text-3xl font-bold leading-tight">
            Welcome back to the future of farming.
          </h2>
          <p className="mt-4 max-w-md text-white/80">
            Choose your role to access a tailored dashboard built for your part of
            the agricultural supply chain.
          </p>
          <div className="mt-8 flex items-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" /> AI insights
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" /> Real-time tracking
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" /> Full traceability
            </div>
          </div>
        </div>
        <p className="relative text-sm text-white/50">
          © {new Date().getFullYear()} HarvestLink — Investor Demo
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <Link href="/" className="flex items-center gap-2.5 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-emerald-700 text-white">
              <Sprout className="h-4 w-4" />
            </div>
            <span className="font-display text-base font-bold">
              Harvest<span className="text-primary">Link</span>
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 pb-12 sm:px-6">
          <div className="w-full max-w-md">
            {step === 'role' && (
              <motion.div {...fadeUp(0)}>
                <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                  Step 1 of 2
                </Badge>
                <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Choose your role
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Select a role to explore its dedicated dashboard experience.
                </p>
                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {roleList.map((role, i) => {
                    const Icon = iconMap[role.icon] ?? Sprout;
                    const isSelected = selectedRole === role.id;
                    return (
                      <motion.button
                        key={role.id}
                        {...fadeUp(i * 0.04)}
                        onClick={() => handleRoleSelect(role.id)}
                        className={`group flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-md'
                            : 'border-border hover:border-primary/40 hover:bg-secondary/50'
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${role.accent} text-white shadow-sm`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold">{role.label}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                            {role.description}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 'details' && currentMeta && (
              <motion.div {...fadeUp(0)}>
                <button
                  onClick={() => setStep('role')}
                  className="mb-4 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Change role
                </button>
                <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                  Step 2 of 2
                </Badge>
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${currentMeta.accent} text-white shadow-sm`}
                  >
                    {(() => {
                      const Icon = iconMap[currentMeta.icon] ?? Sprout;
                      return <Icon className="h-6 w-6" />;
                    })()}
                  </div>
                  <div>
                    <h1 className="font-display text-xl font-bold">{currentMeta.label}</h1>
                    <p className="text-sm text-muted-foreground">{currentMeta.tagline}</p>
                  </div>
                </div>

                {needsBuyerType && (
                  <div className="mb-6">
                    <Label className="mb-2 block">Buyer type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {buyerTypes.map((bt) => (
                        <button
                          key={bt.id}
                          type="button"
                          onClick={() => setSelectedBuyerType(bt.id)}
                          className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                            selectedBuyerType === bt.id
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-border hover:border-primary/40'
                          }`}
                        >
                          {bt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@harvestlink.com"
                        className="pl-9"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-9 pr-9"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? (
                      'Signing in...'
                    ) : (
                      <>
                        Sign in as {currentMeta.label}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Demo mode — no real authentication. Any email and password will work.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
