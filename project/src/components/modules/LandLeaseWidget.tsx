'use client';

import { Home, MapPin, CalendarDays, Key, Building2, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type LandLeaseMode = 'list' | 'browse' | 'approve' | 'oversight';

interface LandLeaseWidgetProps {
  mode?: LandLeaseMode;
}

const myListings = [
  { id: 'LL-041', plot: 'Plot A — 2ha', location: 'Kano North', price: '₦80K/season', status: 'active', interested: 3 },
  { id: 'LL-038', plot: 'Plot C — 1.5ha', location: 'Kano South', price: '₦60K/season', status: 'leased', interested: 0 },
];

const browseListings = [
  { id: 'LL-044', owner: 'Okafor Farms', plot: '3ha — Irrigated land', location: 'Lagos Outskirts', price: '₦120K/season', status: 'available', type: 'farmland' },
  { id: 'LL-042', owner: 'Bello Estate', plot: '1.2ha — Mixed use', location: 'Abuja Zone', price: '₦90K/season', status: 'available', type: 'farmland' },
  { id: 'LL-039', owner: 'State Co-op', plot: '5ha — Cleared land', location: 'Kano Region', price: '₦200K/season', status: 'negotiating', type: 'farmland' },
];

const approvalQueue = [
  { id: 'LL-047', farmer: 'Adeyemi Farms', plot: '2ha in East District', requestedBy: 'Fresh Kitchen Ltd', price: '₦85K/season', status: 'pending' },
  { id: 'LL-045', farmer: 'Nwosu Holdings', plot: '3ha in North District', requestedBy: 'Lagos Co-op', price: '₦110K/season', status: 'pending' },
  { id: 'LL-040', farmer: 'Ibrahim Estates', plot: '1.5ha in South', requestedBy: 'Organic Foods Inc', price: '₦70K/season', status: 'approved' },
];

const oversightStats = [
  { label: 'Active Leases', value: '284', tone: 'text-success' },
  { label: 'Pending Review', value: '12', tone: 'text-warning' },
  { label: 'Total Value', value: '₦22M', tone: 'text-primary' },
  { label: 'Disputes', value: '2', tone: 'text-destructive' },
];

const statusStyles: Record<string, string> = {
  active: 'border-success/30 text-success',
  leased: 'border-primary/30 text-primary',
  available: 'border-success/30 text-success',
  negotiating: 'border-warning/30 text-warning',
  pending: 'border-warning/30 text-warning',
  approved: 'border-success/30 text-success',
};

export function LandLeaseWidget({ mode = 'list' }: LandLeaseWidgetProps) {
  if (mode === 'list') {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-base font-semibold">My Land Listings</CardTitle>
          <Button variant="outline" size="sm" className="h-7 text-xs">+ New Listing</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {myListings.map((l) => (
            <div key={l.id} className="flex items-start justify-between rounded-xl border border-border/50 p-3 transition-colors hover:bg-secondary/30">
              <div className="flex items-start gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10 text-success">
                  <Home className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{l.plot}</p>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {l.location}
                  </div>
                  <p className="mt-0.5 text-xs font-semibold text-primary">{l.price}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant="outline" className={cn('text-xs', statusStyles[l.status])}>
                  {l.status}
                </Badge>
                {l.interested > 0 && (
                  <span className="text-xs text-muted-foreground">{l.interested} interested</span>
                )}
              </div>
            </div>
          ))}
          <Button variant="secondary" className="w-full text-xs" size="sm">View all listings</Button>
        </CardContent>
      </Card>
    );
  }

  if (mode === 'browse') {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-base font-semibold">Land & Lease Market</CardTitle>
          <Button variant="outline" size="sm" className="h-7 text-xs">Filter</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {browseListings.map((l) => (
            <div key={l.id} className="flex items-start justify-between rounded-xl border border-border/50 p-3 transition-colors hover:bg-secondary/30">
              <div className="flex items-start gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Building2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{l.plot}</p>
                  <p className="text-xs text-muted-foreground">{l.owner}</p>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {l.location}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <Badge variant="outline" className={cn('text-xs', statusStyles[l.status])}>
                  {l.status}
                </Badge>
                <p className="text-xs font-semibold text-primary">{l.price}</p>
                {l.status === 'available' && (
                  <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                    <Key className="mr-1 h-3 w-3" />Request
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (mode === 'approve') {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-base font-semibold">Lease Approvals</CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/15 text-warning">
            <CalendarDays className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg border border-border/50 bg-warning/5 px-3 py-2 text-center">
              <p className="text-lg font-bold text-warning">2</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
            <div className="flex-1 rounded-lg border border-border/50 bg-success/5 px-3 py-2 text-center">
              <p className="text-lg font-bold text-success">1</p>
              <p className="text-xs text-muted-foreground">Approved</p>
            </div>
          </div>
          {approvalQueue.map((a) => (
            <div key={a.id} className="rounded-xl border border-border/50 p-3 transition-colors hover:bg-secondary/30">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium">{a.farmer}</p>
                  <p className="text-xs text-muted-foreground">{a.plot}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Key className="h-3 w-3" />
                    Requested by {a.requestedBy}
                  </div>
                  <p className="mt-0.5 text-xs font-semibold text-primary">{a.price}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Badge variant="outline" className={cn('text-xs', statusStyles[a.status])}>
                    {a.status}
                  </Badge>
                  {a.status === 'pending' && (
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="h-6 px-2 text-xs text-success border-success/30">Approve</Button>
                      <Button size="sm" variant="outline" className="h-6 px-2 text-xs text-destructive border-destructive/30">Deny</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // oversight mode
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold">Land Lease Overview</CardTitle>
        <Button variant="outline" size="sm" className="h-7 text-xs">Full report</Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {oversightStats.map((s) => (
            <div key={s.label} className="rounded-lg border border-border/50 bg-secondary/20 px-3 py-2">
              <p className={cn('text-lg font-bold', s.tone)}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Recent activity</p>
          {approvalQueue.map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2">
              <div>
                <p className="text-xs font-medium">{a.farmer}</p>
                <p className="text-xs text-muted-foreground">{a.requestedBy}</p>
              </div>
              <Badge variant="outline" className={cn('text-xs', statusStyles[a.status])}>
                {a.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
