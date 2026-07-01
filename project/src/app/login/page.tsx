'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
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

const fadeInVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
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

  function handleRoleSelect(role: Role) {
    setSelectedRole(role);
    setStep('details');
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
    }, 500);
  }

  const needsBuyerType =
    selectedRole === 'buyer' || selectedRole === 'bulk-buyer';
  const currentMeta = selectedRole ? roleMeta[selectedRole] : null;

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      {/* Left panel — branding */}
      <div
        className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-emerald-700 to-emerald-900 lg:flex lg:w-1/2 lg:flex-col lg:justify-between lg:p-10 xl:p-12"
        role="presentation"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <Link href="/" className="relative flex items-center gap-2.5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-md">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
            <Sprout className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="font-display text-lg font-bold">
            Harvest<span className="text-white/70">Link</span>
          </span>
        </Link>
        <div className="relative text-white">
          <h2 className="font-display text-2xl font-bold leading-tight xl:text-3xl">
            Welcome back to the future of farming.
          </h2>
          <p className="mt-4 max-w-md text-white/80 text-sm xl:text-base">
            Choose your role to access a tailored dashboard built for your part of
            the agricultural supply chain.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-white/70 sm:text-sm sm:gap-6">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" aria-hidden="true" /> AI insights
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" aria-hidden="true" /> Real-time tracking
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" aria-hidden="true" /> Full traceability
            </div>
          </div>
        </div>
        <p className="relative text-sm text-white/50">
          © {new Date().getFullYear()} HarvestLink — Investor Demo
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between p-4 sm:p-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back home
          </Link>
          <Link href="/" className="flex items-center gap-2.5 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-emerald-700 text-white">
              <Sprout className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="font-display text-base font-bold">
              Harvest<span className="text-primary">Link</span>
            </span>
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center px-4 pb-12 sm:px-6">
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              {step === 'role' && (
                <motion.div
                  key="step-role"
                  variants={fadeInVariants}
                  initial={reduceMotion ? false : 'hidden'}
                  animate={reduceMotion ? undefined : 'visible'}
                  exit={reduceMotion ? undefined : 'exit'}
                >
                  <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
                    Step 1 of 2
                  </Badge>
                  <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    Choose your role
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Select a role to explore its dedicated dashboard experience.
                  </p>
                  <div
                    className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3"
                    role="radiogroup"
                    aria-label="Select your role"
                  >
                    {roleList.map((role, i) => {
                      const Icon = iconMap[role.icon] ?? Sprout;
                      const isSelected = selectedRole === role.id;
                      return (
                        <motion.button
                          key={role.id}
                          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.03 }}
                          onClick={() => handleRoleSelect(role.id)}
                          role="radio"
                          aria-checked={isSelected}
                          className={`group flex items-start gap-2.5 sm:gap-3 rounded-lg sm:rounded-xl border p-3 sm:p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                            isSelected
                              ? 'border-primary bg-primary/5 shadow-sm'
                              : 'border-border hover:border-primary/40 hover:bg-secondary/50'
                          }`}
                        >
                          <div
                            className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${role.accent} text-white shadow-sm`}
                            aria-hidden="true"
                          >
                            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
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
                <motion.div
                  key="step-details"
                  variants={fadeInVariants}
                  initial={reduceMotion ? false : 'hidden'}
                  animate={reduceMotion ? undefined : 'visible'}
                  exit={reduceMotion ? undefined : 'exit'}
                >
                  <button
                    onClick={() => setStep('role')}
                    className="mb-3 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Change role
                  </button>
                  <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
                    Step 2 of 2
                  </Badge>
                  <div className="mb-5 flex items-center gap-3 sm:mb-6">
                    <div
                      className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br ${currentMeta.accent} text-white shadow-sm`}
                      aria-hidden="true"
                    >
                      {(() => {
                        const Icon = iconMap[currentMeta.icon] ?? Sprout;
                        return <Icon className="h-5 w-5 sm:h-6 sm:w-6" />;
                      })()}
                    </div>
                    <div>
                      <h1 className="font-display text-lg font-bold sm:text-xl">{currentMeta.label}</h1>
                      <p className="text-xs sm:text-sm text-muted-foreground">{currentMeta.tagline}</p>
                    </div>
                  </div>

                  {needsBuyerType && (
                    <fieldset className="mb-5 sm:mb-6">
                      <legend className="mb-2 block text-sm font-medium">Buyer type</legend>
                      <div className="grid grid-cols-2 gap-2" role="radiogroup">
                        {buyerTypes.map((bt) => (
                          <button
                            key={bt.id}
                            type="button"
                            role="radio"
                            aria-checked={selectedBuyerType === bt.id}
                            onClick={() => setSelectedBuyerType(bt.id)}
                            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                              selectedBuyerType === bt.id
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-border hover:border-primary/40'
                            }`}
                          >
                            {bt.label}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  )}

                  <form onSubmit={handleSignIn} className="space-y-4" noValidate>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@harvestlink.com"
                          className="pl-9"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="pl-9 pr-9"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <Eye className="h-4 w-4" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={loading}
                      aria-busy={loading}
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" aria-hidden="true" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign in as {currentMeta.label}
                          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                        </>
                      )}
                    </Button>
                  </form>
                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    Demo mode — no real authentication. Any email and password will work.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
