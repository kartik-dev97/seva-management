import { Project, ProjectStatus } from '@/lib/types';
import { addMonths, differenceInDays, endOfMonth, format, startOfMonth, subMonths, isSameMonth, isToday, isWithinInterval } from 'date-fns';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserById } from '@/lib/mock-data';
import Link from 'next/link';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProjectTimelineViewProps {
    projects: Project[];
}

const statusStyles: Record<ProjectStatus, { bg: string, text: string, border: string, bar: string }> = {
    [ProjectStatus.PLANNING]: {
        bg: 'bg-amber-500/10', text: 'text-amber-700', border: 'border-amber-200', bar: 'bg-gradient-to-r from-amber-400 to-amber-500'
    },
    [ProjectStatus.IN_PROGRESS]: {
        bg: 'bg-blue-500/10', text: 'text-blue-700', border: 'border-blue-200', bar: 'bg-gradient-to-r from-blue-400 to-blue-600'
    },
    [ProjectStatus.ON_HOLD]: {
        bg: 'bg-orange-500/10', text: 'text-orange-700', border: 'border-orange-200', bar: 'bg-gradient-to-r from-orange-400 to-orange-500'
    },
    [ProjectStatus.COMPLETED]: {
        bg: 'bg-green-500/10', text: 'text-green-700', border: 'border-green-200', bar: 'bg-gradient-to-r from-green-400 to-green-600'
    },
    [ProjectStatus.CANCELLED]: {
        bg: 'bg-red-500/10', text: 'text-red-700', border: 'border-red-200', bar: 'bg-gradient-to-r from-red-400 to-red-500'
    },
};

export function ProjectTimelineView({ projects }: ProjectTimelineViewProps) {
    const MONTH_WIDTH = 180;
    const SIDEBAR_WIDTH = 240;

    // Generate timeline range (past 2 months to next 10 months)
    const timeRange = useMemo(() => {
        const today = new Date();
        const start = startOfMonth(subMonths(today, 2));
        const months = Array.from({ length: 14 }, (_, i) => addMonths(start, i)); // 14 months total
        return { start, months };
    }, []);

    const totalDays = differenceInDays(
        endOfMonth(timeRange.months[timeRange.months.length - 1]),
        timeRange.start
    );

    // Calculate "Today" line position
    const todayPosition = useMemo(() => {
        const today = new Date();
        const diff = differenceInDays(today, timeRange.start);
        const percent = (diff / totalDays) * 100;
        return Math.max(0, Math.min(100, percent));
    }, [timeRange.start, totalDays]);

    const getPositionStyle = (startDate: Date, endDate?: Date) => {
        const startDiff = differenceInDays(startDate, timeRange.start);
        const duration = endDate
            ? differenceInDays(endDate, startDate)
            : 30; // Default 30 days if no end date

        // Ensure within bounds visually
        const left = Math.max(0, (startDiff / totalDays) * 100);
        const width = Math.min(100 - left, (duration / totalDays) * 100);

        return {
            left: `${left}%`,
            width: `${Math.max(width, 0.5)}%` // Minimum 0.5% width
        };
    };

    return (
        <TooltipProvider>
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden flex flex-col h-[600px]">
                <div className="flex-1 overflow-hidden relative">
                    <ScrollArea className="h-full w-full">
                        <div className="flex min-w-max relative">
                            {/* Sticky Sidebar Column */}
                            <div
                                className="sticky left-0 z-30 bg-card border-r border-border/50 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]"
                                style={{ width: SIDEBAR_WIDTH }}
                            >
                                {/* Sidebar Header */}
                                <div className="h-12 border-b border-border/50 bg-muted/30 flex items-center px-4 font-medium text-[13px] text-muted-foreground sticky top-0 z-40 backdrop-blur-sm">
                                    Project Details
                                </div>
                                {/* Sidebar Rows */}
                                <div className="divide-y divide-border/30 bg-card">
                                    {projects.map((project) => {
                                        const lead = getUserById(project.lead);
                                        return (
                                            <div key={project.id} className="h-16 flex flex-col justify-center px-4 hover:bg-accent/20 transition-colors group">
                                                <Link href={`/projects/${project.id}`} className="font-medium text-[13px] text-foreground group-hover:text-primary transition-colors truncate">
                                                    {project.title}
                                                </Link>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    {lead && (
                                                        <Avatar className="h-4 w-4 ring-1 ring-border/50">
                                                            <AvatarImage src={lead.avatar} />
                                                            <AvatarFallback className="text-[6px]">{lead.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                    )}
                                                    <span className="text-[11px] text-muted-foreground truncate">{lead?.name || 'Unassigned'}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Timeline Area */}
                            <div className="flex-1 relative" style={{ minWidth: timeRange.months.length * MONTH_WIDTH }}>
                                {/* Timeline Header */}
                                <div className="h-12 border-b border-border/50 bg-muted/30 sticky top-0 z-20 flex">
                                    {timeRange.months.map((month, i) => {
                                        const isCurrentMonth = isSameMonth(month, new Date());
                                        return (
                                            <div
                                                key={month.toISOString()}
                                                className={cn(
                                                    "flex-1 border-r border-border/30 px-3 py-2 text-[12px] font-medium flex items-center justify-center relative",
                                                    isCurrentMonth ? "bg-primary/5 text-primary" : "text-muted-foreground"
                                                )}
                                            >
                                                {isCurrentMonth && (
                                                    <div className="absolute top-0 left-0 h-1 w-full bg-primary/50" />
                                                )}
                                                {format(month, 'MMMM yyyy')}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Timeline Grid Body */}
                                <div className="relative">
                                    {/* Vertical Grid Lines - Absolute Background */}
                                    <div className="absolute inset-0 flex pointer-events-none z-0">
                                        {timeRange.months.map((month) => (
                                            <div
                                                key={month.toISOString()}
                                                className={cn(
                                                    "flex-1 border-r border-dashed border-border/30",
                                                    isSameMonth(month, new Date()) ? "bg-primary/5" : ""
                                                )}
                                            />
                                        ))}
                                    </div>

                                    {/* "Today" Line Marker */}
                                    <div
                                        className="absolute top-0 bottom-0 w-px bg-red-500 z-10 shadow-[0_0_8px_rgba(239,68,68,0.5)] pointer-events-none"
                                        style={{ left: `${todayPosition}%` }}
                                    >
                                        <div className="absolute -top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 ring-2 ring-background z-20" />
                                    </div>

                                    {/* Project Rows */}
                                    <div className="divide-y divide-border/30 relative z-10">
                                        {projects.map((project) => {
                                            const position = getPositionStyle(project.startDate, project.endDate);
                                            const styles = statusStyles[project.status];
                                            const durationDays = project.endDate
                                                ? differenceInDays(project.endDate, project.startDate)
                                                : 30;

                                            return (
                                                <div key={project.id} className="h-16 relative w-full group">
                                                    {/* Hover highlight for the entire row track */}
                                                    <div className="absolute inset-0 group-hover:bg-accent/5 transition-colors" />

                                                    {/* Timeline Bar */}
                                                    <div className="absolute top-1/2 -translate-y-1/2 w-full px-2">
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Link
                                                                    href={`/projects/${project.id}`}
                                                                    className={cn(
                                                                        "absolute h-8 rounded-md shadow-sm border flex items-center px-1 transition-all hover:brightness-105 hover:shadow-md cursor-pointer hover:-translate-y-0.5",
                                                                        styles.border
                                                                    )}
                                                                    style={{ ...position, background: `linear-gradient(90deg, var(--gradient-start), var(--gradient-end))` }} // Fallback if gradient class fails
                                                                >
                                                                    {/* Custom Gradient Background via CSS handling or just usage of style classes */}
                                                                    <div className={cn("absolute inset-0 opacity-20 rounded-md", styles.bg)} />
                                                                    <div className={cn("absolute left-0 bottom-0 top-0 w-1 rounded-l-md", styles.bar.replace('bg-gradient-to-r', 'bg'))} />

                                                                    {/* Content inside bar */}
                                                                    <div className="relative z-10 flex items-center justify-between w-full px-2 overflow-hidden">
                                                                        <span className={cn("text-[11px] font-semibold truncate mr-2", styles.text)}>
                                                                            {project.status}
                                                                        </span>
                                                                        {parseInt(position.width.toString()) > 10 && (
                                                                            <span className="text-[10px] text-muted-foreground/70 font-mono">
                                                                                {durationDays}d
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </Link>
                                                            </TooltipTrigger>
                                                            <TooltipContent side="top" className="text-xs max-w-[200px] p-0 border-none shadow-lg rounded-lg overflow-hidden">
                                                                <div className={cn("h-1.5 w-full", styles.bar)} />
                                                                <div className="p-3 bg-popover">
                                                                    <p className="font-semibold">{project.title}</p>
                                                                    <div className="mt-2 space-y-1 text-muted-foreground">
                                                                        <div className="flex justify-between gap-4">
                                                                            <span>Start:</span>
                                                                            <span className="text-foreground">{format(project.startDate, 'MMM d, yyyy')}</span>
                                                                        </div>
                                                                        {project.endDate && (
                                                                            <div className="flex justify-between gap-4">
                                                                                <span>End:</span>
                                                                                <span className="text-foreground">{format(project.endDate, 'MMM d, yyyy')}</span>
                                                                            </div>
                                                                        )}
                                                                        <div className="flex justify-between gap-4 mt-1 pt-1 border-t">
                                                                            <span>Progress:</span>
                                                                            <span className="text-foreground font-medium">{project.progress}%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ScrollBar orientation="horizontal" />
                        <ScrollBar orientation="vertical" />
                    </ScrollArea>
                </div>
            </div>
        </TooltipProvider>
    );
}
