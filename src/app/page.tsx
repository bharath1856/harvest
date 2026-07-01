'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { getDashboardPath } from '@/config/routes';

export default function DashboardIndex() {
  const router = useRouter();
  const { role, hydrated } = useApp();

  useEffect(() => {
    if (!hydrated) return;
    if (role) {
      router.replace(getDashboardPath(role));
    } else {
      router.replace('/login');
    }
  }, [hydrated, role, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}
