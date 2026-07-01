'use client';

import { Cloud, CloudRain, Sun, Wind, Droplets, CloudSnow, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type WeatherMode = 'farmer' | 'expert' | 'overview';

interface WeatherWidgetProps {
  mode?: WeatherMode;
}

const forecast = [
  { day: 'Today', high: 32, low: 24, condition: 'sunny', rain: 5, humidity: 62, wind: 14 },
  { day: 'Tue', high: 30, low: 23, condition: 'cloudy', rain: 20, humidity: 70, wind: 18 },
  { day: 'Wed', high: 27, low: 22, condition: 'rainy', rain: 75, humidity: 85, wind: 22 },
  { day: 'Thu', high: 29, low: 23, condition: 'cloudy', rain: 30, humidity: 72, wind: 16 },
  { day: 'Fri', high: 33, low: 25, condition: 'sunny', rain: 8, humidity: 60, wind: 12 },
];

const conditionIcon: Record<string, React.ReactNode> = {
  sunny: <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-warning" aria-hidden="true" />,
  cloudy: <Cloud className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" aria-hidden="true" />,
  rainy: <CloudRain className="h-4 w-4 sm:h-5 sm:w-5 text-primary" aria-hidden="true" />,
  snowy: <CloudSnow className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" aria-hidden="true" />,
};

const farmingAdvice: Record<string, { label: string; tone: string }> = {
  sunny: { label: 'Good conditions for field work and harvesting.', tone: 'text-success' },
  cloudy: { label: 'Moderate conditions — check soil moisture before irrigation.', tone: 'text-muted-foreground' },
  rainy: { label: 'Heavy rain expected. Postpone spraying and harvesting.', tone: 'text-warning' },
  snowy: { label: 'Frost risk — protect sensitive crops.', tone: 'text-destructive' },
};

export function WeatherWidget({ mode = 'farmer' }: WeatherWidgetProps) {
  const today = forecast[0];

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
        <CardTitle className="text-sm sm:text-base font-semibold">
          {mode === 'overview' ? 'Weather Overview' : 'Weather Forecast'}
        </CardTitle>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" aria-hidden="true" />
          <span>Kano, Nigeria</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {/* Current conditions */}
        <div
          className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary/30 px-3 sm:px-4 py-2.5 sm:py-3"
          role="region"
          aria-label={`Current weather: ${today.high}°C, ${today.condition}`}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-warning/10">
              {conditionIcon[today.condition]}
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold">{today.high}°C</p>
              <p className="text-xs capitalize text-muted-foreground">{today.condition} · Feels like {today.high - 2}°C</p>
            </div>
          </div>
          <div className="space-y-0.5 sm:space-y-1 text-right">
            <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
              <Droplets className="h-3 w-3" aria-hidden="true" />
              <span>{today.humidity}% humidity</span>
            </div>
            <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
              <Wind className="h-3 w-3" aria-hidden="true" />
              <span>{today.wind} km/h</span>
            </div>
            <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
              <CloudRain className="h-3 w-3" aria-hidden="true" />
              <span>{today.rain}% rain</span>
            </div>
          </div>
        </div>

        {/* Farming advisory */}
        {(mode === 'farmer' || mode === 'expert') && (
          <div
            className={cn('rounded-lg border border-border/50 bg-secondary/20 px-3 py-2')}
            role="note"
            aria-label="Farming advisory"
          >
            <p className="text-xs font-medium">Farming Advisory</p>
            <p className={cn('mt-0.5 text-xs', farmingAdvice[today.condition].tone)}>
              {farmingAdvice[today.condition].label}
            </p>
          </div>
        )}

        {/* 5-day strip */}
        <div
          className="grid grid-cols-5 gap-1 sm:gap-1.5"
          role="list"
          aria-label="5-day weather forecast"
        >
          {forecast.map((day) => (
            <div
              key={day.day}
              className="flex flex-col items-center gap-0.5 sm:gap-1 rounded-lg border border-border/40 bg-secondary/20 py-1.5 sm:py-2 transition-colors hover:bg-secondary/40"
              role="listitem"
              aria-label={`${day.day}: ${day.high}°C high, ${day.low}°C low, ${day.condition}`}
            >
              <p className="text-[10px] sm:text-xs font-medium">{day.day}</p>
              {conditionIcon[day.condition]}
              <p className="text-[10px] sm:text-xs font-bold">{day.high}°</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{day.low}°</p>
              {day.rain > 50 && (
                <div className="flex items-center gap-0.5" aria-label={`${day.rain}% chance of rain`}>
                  <div className="h-1 w-1 rounded-full bg-primary" aria-hidden="true" />
                  <p className="text-[9px] sm:text-[10px] text-primary">{day.rain}%</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
