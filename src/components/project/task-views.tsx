'use client';

import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { format, differenceInDays, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { Task, TaskStatus, TaskPriority, User } from '@/lib/types';
import { Clock, Calendar as CalendarIcon, User as UserIcon, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ViewProps {
    tasks: Task[];
    users: User[];
    onTaskClick: (taskId: string) => void;
}

export function TimelineView({ tasks, users, onTaskClick }: ViewProps) {
    const startDate = useMemo(() => {
        const dates = tasks.map(t => t.startDate || t.createdAt).filter(Boolean) as Date[];
        if (dates.length === 0) return new Date();
        return new Date(Math.min(...dates.map(d => d.getTime())));
    }, [tasks]);

    const endDate = useMemo(() => {
        const dates = tasks.map(t => t.dueDate || addDays(new Date(), 30)).filter(Boolean) as Date[];
        if (dates.length === 0) return addDays(new Date(), 30);
        return new Date(Math.max(...dates.map(d => d.getTime())));
    }, [tasks]);

    const totalDays = Math.max(differenceInDays(endDate, startDate), 30);
    const weeks = useMemo(() => {
        const w = [];
        for (let i = 0; i <= Math.ceil(totalDays / 7); i++) {
            w.push(addDays(startDate, i * 7));
        }
        return w;
    }, [startDate, totalDays]);

    const getTaskPosition = (task: Task) => {
        const start = task.startDate || task.createdAt;
        const end = task.dueDate || addDays(start, 7);
        const left = (differenceInDays(start, startDate) / totalDays) * 100;
        const width = (differenceInDays(end, start) / totalDays) * 100;
        return {
            left: `${Math.max(0, left)}%`,
            width: `${Math.max(2, Math.min(width, 100 - left))}%`
        };
    };

    const statusColors: Record<string, string> = {
        [TaskStatus.TODO]: 'bg-zinc-200 dark:bg-zinc-700',
        [TaskStatus.IN_PROGRESS]: 'bg-zinc-900 dark:bg-zinc-100',
        [TaskStatus.IN_REVIEW]: 'bg-amber-500',
        [TaskStatus.COMPLETED]: 'bg-emerald-500',
        [TaskStatus.BLOCKED]: 'bg-red-500',
    };

    return (
        <Card className="border-border/40 bg-card/50 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <div className="min-w-[1000px]">
                    <div className="flex border-b border-border/40 bg-muted/30">
                        <div className="w-64 flex-shrink-0 p-3 border-r border-border/40 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Task Name</div>
                        <div className="flex-1 flex">
                            {weeks.map((week, i) => (
                                <div key={i} className="flex-1 p-2 border-r border-border/40 text-center">
                                    <span className="text-[10px] text-muted-foreground font-medium">{format(week, 'MMM dd')}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="divide-y divide-border/40">
                        {tasks.map((task) => {
                            const assignee = users.find(u => u.id === task.assigneeId);
                            const position = getTaskPosition(task);
                            return (
                                <div key={task.id} className="flex group hover:bg-muted/10 transition-colors">
                                    <div className="w-64 flex-shrink-0 p-3 border-r border-border/40 flex items-center gap-3">
                                        <div className="flex -space-x-1">
                                            <Avatar className="h-6 w-6 border-2 border-background">
                                                <AvatarImage src={assignee?.avatar} />
                                                <AvatarFallback className="text-[8px]">{assignee?.name[0] || 'U'}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[12px] font-bold truncate cursor-pointer hover:text-zinc-900" onClick={() => onTaskClick(task.id)}>{task.title}</p>
                                            <p className="text-[9px] text-muted-foreground uppercase">{task.status}</p>
                                        </div>
                                    </div>
                                    <div className="flex-1 relative h-14 flex items-center">
                                        <div
                                            className={cn("h-7 rounded-full absolute cursor-pointer shadow-sm transition-all hover:scale-[1.01] hover:shadow-md flex items-center px-3", statusColors[task.status])}
                                            style={position}
                                            onClick={() => onTaskClick(task.id)}
                                        >
                                            <span className={cn("text-[9px] font-bold truncate",
                                                [TaskStatus.TODO, TaskStatus.IN_REVIEW, TaskStatus.COMPLETED].includes(task.status) ? "text-foreground" : "text-background"
                                            )}>
                                                {task.progress}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Card>
    );
}

export function CalendarView({ tasks, users, onTaskClick }: ViewProps) {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    return (
        <Card className="border-border/40 bg-card/50 overflow-hidden shadow-xl">
            <div className="grid grid-cols-7 gap-px bg-zinc-200 dark:bg-zinc-800 border-b">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="bg-muted/50 p-3 text-center text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">{day}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-zinc-200 dark:bg-zinc-800">
                {days.map((day, i) => {
                    const dayTasks = tasks.filter(t => t.dueDate && isSameDay(t.dueDate, day));
                    return (
                        <div key={i} className={cn(
                            "bg-background min-h-[140px] p-2 hover:bg-muted/5 transition-colors relative group",
                            !isSameMonth(day, monthStart) && "opacity-40"
                        )}>
                            <div className="flex justify-between items-start">
                                <span className={cn(
                                    "text-[11px] font-bold h-6 w-6 flex items-center justify-center rounded-full transition-colors",
                                    isSameDay(day, today) ? "bg-zinc-900 text-white" : "text-muted-foreground group-hover:bg-zinc-100"
                                )}>
                                    {format(day, 'd')}
                                </span>
                            </div>
                            <div className="mt-2 space-y-1">
                                {dayTasks.map(task => (
                                    <div
                                        key={task.id}
                                        className="p-1.5 rounded-lg border bg-card shadow-sm cursor-pointer hover:border-zinc-400 transition-all overflow-hidden"
                                        onClick={() => onTaskClick(task.id)}
                                    >
                                        <p className="text-[10px] font-bold truncate leading-tight">{task.title}</p>
                                        <div className="flex items-center justify-between mt-1">
                                            <div className={cn(
                                                "h-1 w-1 rounded-full",
                                                task.priority === TaskPriority.HIGH ? "bg-red-500" : "bg-zinc-300"
                                            )} />
                                            <span className="text-[8px] text-muted-foreground uppercase">{task.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}

export function BlockView({ tasks, users, onTaskClick }: ViewProps) {
    const priorityStyles: Record<string, string> = {
        'High': 'text-red-600 bg-red-50',
        'Medium': 'text-amber-600 bg-amber-50',
        'Low': 'text-zinc-500 bg-zinc-50',
        'Urgent': 'text-red-700 bg-red-100',
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tasks.map(task => (
                <Card
                    key={task.id}
                    className="hover:border-zinc-900 transition-all cursor-pointer bg-card overflow-hidden shadow-sm group border-zinc-200"
                    onClick={() => onTaskClick(task.id)}
                >
                    <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/10 to-transparent" />
                        <div className="transform group-hover:scale-110 transition-transform duration-500">
                            <LayersIcon className="h-10 w-10 text-zinc-300" />
                        </div>
                        <div className="absolute top-3 left-3">
                            <Badge className={cn("text-[9px] font-bold uppercase tracking-tight border-none shadow-sm", priorityStyles[task.priority])}>
                                {task.priority}
                            </Badge>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/20 to-transparent">
                            <Progress value={task.progress} className="h-0.5 bg-white/30" />
                        </div>
                    </div>
                    <CardContent className="p-5 space-y-4">
                        <div className="space-y-1">
                            <h3 className="font-bold text-[15px] leading-tight text-foreground group-hover:text-zinc-900 transition-colors">{task.title}</h3>
                            <p className="text-[12px] text-muted-foreground line-clamp-2 leading-relaxed opacity-80">{task.description}</p>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6 border border-zinc-200 shadow-sm">
                                    <AvatarFallback className="text-[8px]">U</AvatarFallback>
                                </Avatar>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Team</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold">
                                <Clock className="h-3 w-3" />
                                {task.dueDate ? format(task.dueDate, 'MMM dd') : '--'}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function LayersIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
        </svg>
    );
}
