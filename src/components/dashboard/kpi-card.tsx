import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
    label: string;
    value: number | string;
    change: number;
    trend: 'up' | 'down' | 'neutral';
    icon: LucideIcon;
    suffix?: string;
}

export function KPICard({ label, value, change, trend, icon: Icon, suffix = '' }: KPICardProps) {
    const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus;

    return (
        <Card className="border-border/40 bg-zinc-50/30 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/40 transition-all duration-300 group cursor-default overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-zinc-900/0 group-hover:bg-zinc-900 transition-all duration-500" />
            <CardContent className="p-5">
                <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                <Icon className="h-4 w-4" strokeWidth={2} />
                            </div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">{label}</p>
                        </div>

                        <div className="flex items-baseline gap-3">
                            <p className="text-3xl font-bold tracking-tight text-zinc-900 uppercase">
                                {value}
                                <span className="text-[14px] font-medium text-zinc-400 ml-0.5">{suffix}</span>
                            </p>
                            <div
                                className={cn(
                                    'flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                                    trend === 'up' && 'bg-zinc-100 text-zinc-600 border border-zinc-200',
                                    trend === 'down' && 'bg-zinc-100 text-zinc-600 border border-zinc-200',
                                    trend === 'neutral' && 'bg-zinc-50 text-zinc-400 border border-zinc-100'
                                )}
                            >
                                <TrendIcon className="h-2.5 w-2.5" />
                                {Math.abs(change)}%
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
