'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, ScanLine, ShieldAlert, Download, RefreshCw, CircleCheck as CheckCircle2, Circle as XCircle } from 'lucide-react';
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
  active: 'bg-success/15 text-success border-success/20',
  expired: 'bg-muted text-muted-foreground border-border',
  verified: 'bg-success/15 text-success border-success/20',
  failed: 'bg-destructive/15 text-destructive border-destructive/20',
  pending: 'bg-warning/15 text-warning border-warning/20',
  approved: 'bg-success/15 text-success border-success/20',
  flagged: 'bg-destructive/15 text-destructive border-destructive/20',
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
      <Card className="h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm sm:text-base font-semibold">QR Generation</CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary" aria-hidden="true">
            <QrCode className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
          {/* Mock QR preview */}
          <div
            className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/70 bg-secondary/30 p-4 sm:p-5 min-h-[140px]"
            role="img"
            aria-label={generated ? 'Generated QR code for batch #921' : 'QR code placeholder'}
          >
            <AnimatePresence mode="wait">
              {generated ? (
                <motion.div
                  key="generated"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="grid grid-cols-5 gap-[3px]" aria-hidden="true">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'h-4 w-4 sm:h-5 sm:w-5 rounded-[2px]',
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
                  <QrCode className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground/40" aria-hidden="true" />
                  <p className="text-xs sm:text-sm text-muted-foreground text-center">Generate a QR code for your latest batch</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1"
              onClick={handleGenerate}
              disabled={generating}
              aria-busy={generating}
              aria-label={generating ? 'Generating QR code' : generated ? 'Regenerate QR code' : 'Generate QR code for batch #921'}
            >
              <RefreshCw className={cn('mr-2 h-4 w-4', generating && 'animate-spin')} aria-hidden="true" />
              {generating ? 'Generating…' : generated ? 'Regenerate' : 'Generate QR'}
            </Button>
            {generated && (
              <Button variant="outline" size="icon" aria-label="Download QR code for batch #921" className="focus-visible:ring-2 focus-visible:ring-ring">
                <Download className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
          </div>

          <div className="flex-1 space-y-2 overflow-auto">
            <p className="text-xs font-medium text-muted-foreground">Recent codes</p>
            <ul className="space-y-2" role="list">
              {mockQrCodes.map((qr) => (
                <li
                  key={qr.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2 hover:bg-secondary/50 transition-colors"
                  role="listitem"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate">{qr.id}</p>
                    <p className="text-xs text-muted-foreground truncate">{qr.label}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-2 shrink-0">
                    <span className="text-xs text-muted-foreground/70">{qr.created}</span>
                    <Badge variant="outline" className={cn('text-[10px] px-1.5', statusStyles[qr.status])}>
                      {qr.status}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (mode === 'scan') {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm sm:text-base font-semibold">QR Verification</CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary" aria-hidden="true">
            <ScanLine className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
          {/* Scanner mock */}
          <button
            type="button"
            className="relative flex cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-dashed border-border/70 bg-secondary/30 p-5 sm:p-6 min-h-[140px] transition-colors hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={handleScan}
            aria-label={scanning ? 'Scanning in progress' : 'Tap to simulate QR scan'}
            aria-busy={scanning}
          >
            <AnimatePresence>
              {scanning && (
                <motion.div
                  className="absolute inset-x-0 h-0.5 bg-primary shadow-[0_0_8px_2px_hsl(var(--primary)/0.5)]"
                  initial={{ top: '10%' }}
                  animate={{ top: ['10%', '90%', '10%'] }}
                  transition={{ duration: 1.5, ease: 'linear', repeat: Infinity }}
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>
            <ScanLine className="h-8 w-8 sm:h-10 sm:w-10 text-primary/40" aria-hidden="true" />
            <p className="text-xs sm:text-sm text-muted-foreground">
              {scanning ? 'Scanning…' : 'Tap to simulate scan'}
            </p>
          </button>

          <div className="flex-1 space-y-2 overflow-auto">
            <p className="text-xs font-medium text-muted-foreground">Scan history</p>
            <ul className="space-y-2" role="list">
              {mockScanHistory.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2 hover:bg-secondary/50 transition-colors"
                  role="listitem"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {s.result === 'verified' ? (
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" aria-hidden="true" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive shrink-0" aria-hidden="true" />
                    )}
                    <p className="text-xs font-medium truncate">{s.product}</p>
                  </div>
                  <time className="text-xs text-muted-foreground/70 ml-2 shrink-0">{s.time}</time>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  // compliance mode
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm sm:text-base font-semibold">QR Compliance Review</CardTitle>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/15 text-warning" aria-hidden="true">
          <ShieldAlert className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-border/50 bg-warning/5 px-2 py-2 text-center">
            <p className="text-lg font-bold text-warning" aria-label="2 pending reviews">2</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-success/5 px-2 py-2 text-center">
            <p className="text-lg font-bold text-success" aria-label="1 approved">1</p>
            <p className="text-xs text-muted-foreground">Approved</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-destructive/5 px-2 py-2 text-center">
            <p className="text-lg font-bold text-destructive" aria-label="1 flagged">1</p>
            <p className="text-xs text-muted-foreground">Flagged</p>
          </div>
        </div>

        <div className="flex-1 space-y-2 overflow-auto">
          {mockComplianceQueue.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2 hover:bg-secondary/50 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium truncate">{item.farmer}</p>
                <p className="text-xs text-muted-foreground truncate">{item.product}</p>
              </div>
              <div className="flex items-center gap-2 ml-2 shrink-0">
                <Badge variant="outline" className={cn('text-xs', statusStyles[item.status])}>
                  {item.status}
                </Badge>
                {item.status === 'pending' && (
                  <Button size="sm" variant="outline" className="h-6 px-2 text-xs" aria-label={`Review ${item.farmer} submission`}>
                    Review
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
