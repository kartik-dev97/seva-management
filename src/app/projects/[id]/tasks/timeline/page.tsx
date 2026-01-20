import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById, tasks, getUserById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { format, differenceInDays, addDays } from 'date-fns';

export default async function TaskTimelinePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    const projectTasks = tasks.filter(t => t.projectId === project.id);
    const startDate = project.startDate;
    const endDate = project.endDate || addDays(startDate, 180);
    const totalDays = differenceInDays(endDate, startDate);

    // Generate week markers
    const weeks = [];
    for (let i = 0; i <= Math.ceil(totalDays / 7); i++) {
        weeks.push(addDays(startDate, i * 7));
    }

    const getTaskPosition = (task: typeof projectTasks[0]) => {
        const taskStart = task.dueDate ? addDays(task.dueDate, -7) : startDate;
        const taskEnd = task.dueDate || addDays(taskStart, 7);
        const left = (differenceInDays(taskStart, startDate) / totalDays) * 100;
        const width = (differenceInDays(taskEnd, taskStart) / totalDays) * 100;
        return { left: Math.max(0, left), width: Math.max(2, Math.min(width, 100 - left)) };
    };

    const statusColors = {
        'To Do': 'bg-gray-400',
        'In Progress': 'bg-blue-500',
        'In Review': 'bg-orange-500',
        'Completed': 'bg-green-500',
        'Blocked': 'bg-red-500',
    };

    return (
        <AppLayout>
            <div className="max-w-full mx-auto space-y-6">
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
                            <h1 className="text-2xl font-semibold tracking-tight">Task Timeline</h1>
                            <p className="text-[13px] text-muted-foreground mt-1">
                                Gantt view for {project.title}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Zoom In</Button>
                        <Button variant="outline" size="sm">Zoom Out</Button>
                        <Button size="sm">Add Task</Button>
                    </div>
                </div>

                {/* Timeline Legend */}
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-6">
                            {Object.entries(statusColors).map(([status, color]) => (
                                <div key={status} className="flex items-center gap-2">
                                    <div className={cn("h-3 w-3 rounded", color)} />
                                    <span className="text-[12px] text-muted-foreground">{status}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Gantt Chart */}
                <Card className="border-border/40 bg-card/50 overflow-hidden">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <div className="min-w-[1200px]">
                                {/* Header with dates */}
                                <div className="flex border-b border-border/40 bg-muted/30">
                                    <div className="w-64 flex-shrink-0 p-3 border-r border-border/40">
                                        <span className="text-[12px] font-medium">Task Name</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex">
                                            {weeks.slice(0, 12).map((week, i) => (
                                                <div key={i} className="flex-1 p-2 border-r border-border/40 text-center">
                                                    <span className="text-[10px] text-muted-foreground">
                                                        {format(week, 'MMM dd')}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Tasks */}
                                {projectTasks.map((task) => {
                                    const assignee = task.assigneeId ? getUserById(task.assigneeId) : null;
                                    const { left, width } = getTaskPosition(task);

                                    return (
                                        <div key={task.id} className="flex border-b border-border/40 hover:bg-accent/30 transition-colors">
                                            {/* Task info */}
                                            <div className="w-64 flex-shrink-0 p-3 border-r border-border/40">
                                                <div className="flex items-center gap-2">
                                                    {assignee && (
                                                        <Avatar className="h-6 w-6">
                                                            <AvatarImage src={assignee.avatar} alt={assignee.name} />
                                                            <AvatarFallback className="text-[9px]">
                                                                {assignee.name.split(' ').map(n => n[0]).join('')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    )}
                                                    <div className="min-w-0">
                                                        <Link
                                                            href={`/tasks/${task.id}`}
                                                            className="text-[12px] font-medium truncate block hover:text-primary"
                                                        >
                                                            {task.title}
                                                        </Link>
                                                        <span className="text-[10px] text-muted-foreground">
                                                            {task.dueDate && format(task.dueDate, 'MMM dd')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Timeline bar */}
                                            <div className="flex-1 relative py-3">
                                                <div className="h-full flex items-center">
                                                    <div
                                                        className={cn(
                                                            "absolute h-6 rounded-full cursor-pointer transition-all hover:opacity-80",
                                                            statusColors[task.status as keyof typeof statusColors] || 'bg-gray-400'
                                                        )}
                                                        style={{
                                                            left: `${left}%`,
                                                            width: `${width}%`,
                                                            minWidth: '40px'
                                                        }}
                                                    >
                                                        <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-medium truncate px-2">
                                                            {task.title.split(' ').slice(0, 2).join(' ')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Total Tasks</p>
                            <p className="text-2xl font-semibold mt-1">{projectTasks.length}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">On Schedule</p>
                            <p className="text-2xl font-semibold mt-1 text-green-600">
                                {projectTasks.filter(t => t.status === 'Completed' || t.status === 'In Progress').length}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">At Risk</p>
                            <p className="text-2xl font-semibold mt-1 text-orange-600">
                                {projectTasks.filter(t => t.status === 'Blocked').length}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Duration</p>
                            <p className="text-[15px] font-semibold mt-1">{totalDays} days</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
