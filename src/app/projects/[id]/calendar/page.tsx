import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById, tasks, events } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    Plus
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ProjectSubNav } from '@/components/project/project-sub-nav';
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    isToday,
    addMonths,
    subMonths,
    getDay
} from 'date-fns';

export default async function ProjectCalendarPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    const currentDate = new Date();
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const startDayOfWeek = getDay(monthStart);

    const projectTasks = tasks.filter(t => t.projectId === project.id && t.dueDate);
    const projectEvents = events.filter(e => e.projectId === project.id);

    // Get items for each day
    const getItemsForDay = (date: Date) => {
        const dayTasks = projectTasks.filter(t => t.dueDate && isSameDay(t.dueDate, date));
        const dayEvents = projectEvents.filter(e => isSameDay(e.startDate, date));
        return { tasks: dayTasks, events: dayEvents };
    };

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-3">
                        <Link
                            href={`/projects/${id}`}
                            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Project
                        </Link>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">Project Calendar</h1>
                            <p className="text-[13px] text-muted-foreground mt-1">
                                Unified schedule for {project.title}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-[14px] font-medium min-w-[120px] text-center">
                            {format(currentDate, 'MMMM yyyy')}
                        </span>
                        <Button variant="outline" size="sm">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="ml-4 gap-2">
                            <Plus className="h-4 w-4" />
                            Add Event
                        </Button>
                    </div>
                </div>

                {/* Sub Navigation */}
                <ProjectSubNav projectId={id} />

                {/* Legend */}
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded bg-blue-500" />
                                <span className="text-[12px] text-muted-foreground">Tasks</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded bg-green-500" />
                                <span className="text-[12px] text-muted-foreground">Events</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded bg-orange-500" />
                                <span className="text-[12px] text-muted-foreground">Milestones</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Calendar Grid */}
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                        {/* Week day headers */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {weekDays.map(day => (
                                <div key={day} className="text-center text-[12px] font-medium text-muted-foreground py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar days */}
                        <div className="grid grid-cols-7 gap-1">
                            {/* Empty cells for days before month start */}
                            {Array.from({ length: startDayOfWeek }).map((_, i) => (
                                <div key={`empty-${i}`} className="h-28 rounded-lg bg-muted/20" />
                            ))}

                            {/* Days of month */}
                            {daysInMonth.map(day => {
                                const { tasks: dayTasks, events: dayEvents } = getItemsForDay(day);
                                const hasItems = dayTasks.length > 0 || dayEvents.length > 0;

                                return (
                                    <div
                                        key={day.toISOString()}
                                        className={cn(
                                            "h-28 rounded-lg border p-2 transition-colors hover:border-primary/50 overflow-hidden",
                                            isToday(day) ? 'border-primary bg-primary/5' : 'border-border/40',
                                            hasItems && 'bg-accent/20'
                                        )}
                                    >
                                        <div className={cn(
                                            "text-[12px] font-medium mb-1",
                                            isToday(day) && 'text-primary'
                                        )}>
                                            {format(day, 'd')}
                                        </div>
                                        <div className="space-y-1">
                                            {dayEvents.slice(0, 2).map(event => (
                                                <Link
                                                    key={event.id}
                                                    href={`/events/${event.id}`}
                                                    className="block text-[10px] bg-green-500/20 text-green-700 dark:text-green-400 rounded px-1 py-0.5 truncate hover:bg-green-500/30"
                                                >
                                                    {event.title}
                                                </Link>
                                            ))}
                                            {dayTasks.slice(0, 2).map(task => (
                                                <Link
                                                    key={task.id}
                                                    href={`/tasks/${task.id}`}
                                                    className="block text-[10px] bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded px-1 py-0.5 truncate hover:bg-blue-500/30"
                                                >
                                                    {task.title}
                                                </Link>
                                            ))}
                                            {(dayTasks.length + dayEvents.length > 4) && (
                                                <span className="text-[9px] text-muted-foreground">
                                                    +{dayTasks.length + dayEvents.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Items */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-border/40 bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-[15px] font-semibold">Upcoming Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {projectTasks
                                    .filter(t => t.dueDate && t.dueDate >= new Date())
                                    .sort((a, b) => (a.dueDate?.getTime() || 0) - (b.dueDate?.getTime() || 0))
                                    .slice(0, 5)
                                    .map(task => (
                                        <Link
                                            key={task.id}
                                            href={`/tasks/${task.id}`}
                                            className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded bg-blue-500" />
                                                <span className="text-[13px]">{task.title}</span>
                                            </div>
                                            <span className="text-[11px] text-muted-foreground">
                                                {task.dueDate && format(task.dueDate, 'MMM dd')}
                                            </span>
                                        </Link>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-[15px] font-semibold">Upcoming Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {projectEvents
                                    .filter(e => e.startDate >= new Date())
                                    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
                                    .slice(0, 5)
                                    .map(event => (
                                        <Link
                                            key={event.id}
                                            href={`/events/${event.id}`}
                                            className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded bg-green-500" />
                                                <span className="text-[13px]">{event.title}</span>
                                            </div>
                                            <span className="text-[11px] text-muted-foreground">
                                                {format(event.startDate, 'MMM dd')}
                                            </span>
                                        </Link>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
