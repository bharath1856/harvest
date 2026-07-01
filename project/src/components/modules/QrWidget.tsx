'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, ScanLine, ShieldAlert, Download, RefreshCw, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type QrMode = 'generate' | 'scan' | 'compliance';

interface QrWidgetProps {
  mode: QrMode;
}

const mockQrCodes = [
  { id: 'QR-2841', label: 'Batch #920 — Tomatoes', status: 'active', created: '2h ago' },
  { id: 'QR-2840', label: 'Batch #918 — Maize', status: 'active', created: '1d ago' },
  { id: 'QR-2839', label: 'Batch #915 — Cassava', status: 'expired', created: '5d ago' },
];

const mockScanHistory = [
  { id: 'SC-001', product: 'Organic Tomatoes — Okafor Farms', result: 'verified', time: '10m ago' },
  { id: 'SC-002', product: 'Yellow Maize — Bello Co-op', result: 'verified', time: '1h ago' },
  { id: 'SC-003', product: 'Cassava Flour — Unknown batch', result: 'failed', time: '3h ago' },
];

const mockComplianceQueue = [
  { id: 'QR-3012', farmer: 'Adeyemi Farms', product: 'Pepper — 500kg', status: 'pending' },
  { id: 'QR-3008', farmer: 'Ibrahim Co-op', product: 'Maize — 2T', status: 'pending' },
  { id: 'QR-2998', farmer: 'Nwosu Estates', product: 'Tomatoes — 1.2T', status: 'approved' },
  { id: 'QR-2991', farmer: 'Okeke Holdings', product: 'Yam — 800kg', status: 'flagged' },
];

const statusStyles: Record<string, string> = {
  active: 'bg-success/15 text-success',
  expired: 'bg-muted text-muted-foreground',
  verified: 'bg-success/15 text-success',
  failed: 'bg-destructive/15 text-destructive',
  pending: 'bg-warning/15 text-warning',
  approved: 'bg-success/15 text-success',
  flagged: 'bg-destructive/15 text-destructive',
};

export function QrWidget({ mode }: QrWidgetProps) {
  const [generating, setGenerating] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [generated, setGenerated] = useState(false);

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1200);
  }

  function handleScan() {
    setScanning(true);
    setTimeout(() => setScanning(false), 1500);
  }

  if (mode === 'generate') {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-base font-semibold">QR Generation</CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <QrCode className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Mock QR preview */}
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border/70 bg-secondary/30 p-5">
            {generated ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="grid grid-cols-5 gap-[3px]">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'h-5 w-5 rounded-[2px]',
                        [0,1,2,3,4,5,9,10,14,15,19,20,21,22,23,24,6,12,18,7,11,13,17].includes(i)
                          ? 'bg-foreground'
                          : 'bg-background'
                      )}
                    />
                  ))}
                </div>
                <p className="font-mono text-xs text-muted-foreground">QR-2842 · Batch #921</p>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-2">
                <QrCode className="h-10 w-10 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">Generate a QR code for your latest batch</p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1"
              onClick={handleGenerate}
              disabled={generating}
            >
              <RefreshCw className={cn('mr-2 h-4 w-4', generating && 'animate-spin')} />
              {generating ? 'Generating…' : generated ? 'Regenerate' : 'Generate QR'}
            </Button>
            {generated && (
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Recent codes</p>
            {mockQrCodes.map((qr) => (
              <div key={qr.id} className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2">
                <div>
                  <p className="text-xs font-medium">{qr.id}</p>
                  <p className="text-xs text-muted-foreground">{qr.label}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground/70">{qr.created}</span>
                  <Badge variant="outline" className={cn('text-xs', statusStyles[qr.status])}>
                    {qr.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (mode === 'scan') {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-base font-semibold">QR Verification</CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ScanLine className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Scanner mock */}
          <div
            className="relative flex cursor-pointer flex-col items-center gap-3 overflow-hidden rounded-xl border border-dashed border-border/70 bg-secondary/30 p-6"
            onClick={handleScan}
          >
            {scanning ? (
              <motion.div
                className="absolute inset-x-0 h-0.5 bg-primary shadow-[0_0_8px_2px_hsl(var(--primary)/0.5)]"
                initial={{ top: '10%' }}
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 1.5, ease: 'linear' }}
              />
            ) : null}
            <ScanLine className="h-10 w-10 text-primary/40" />
            <p className="text-sm text-muted-foreground">
              {scanning ? 'Scanning…' : 'Tap to simulate scan'}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Scan history</p>
            {mockScanHistory.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2">
                <div className="flex items-center gap-2">
                  {s.result === 'verified' ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  <div>
                    <p className="text-xs font-medium">{s.product}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground/70">{s.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // compliance mode
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold">QR Compliance Review</CardTitle>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/15 text-warning">
          <ShieldAlert className="h-4 w-4" />
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
          <div className="flex-1 rounded-lg border border-border/50 bg-destructive/5 px-3 py-2 text-center">
            <p className="text-lg font-bold text-destructive">1</p>
            <p className="text-xs text-muted-foreground">Flagged</p>
          </div>
        </div>

        <div className="space-y-2">
          {mockComplianceQueue.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2">
              <div>
                <p className="text-xs font-medium">{item.farmer}</p>
                <p className="text-xs text-muted-foreground">{item.product}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={cn('text-xs', statusStyles[item.status])}>
                  {item.status}
                </Badge>
                {item.status === 'pending' && (
                  <Button size="sm" variant="outline" className="h-6 px-2 text-xs">Review</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
