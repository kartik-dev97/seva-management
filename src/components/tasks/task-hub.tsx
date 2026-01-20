'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KanbanBoard } from '@/components/ui/kanban-board';
import {
    Plus,
    Search,
    LayoutGrid,
    List,
    Filter,
    Calendar as CalendarIcon,
    Users,
    Clock,
    X,
    MessageSquare,
    Paperclip,
    Tag,
    AlertCircle,
    GanttChartSquare,
    Layers,
    CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Task, TaskStatus, TaskPriority, User } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TimelineView, CalendarView, BlockView } from '@/components/project/task-views';

type ViewMode = 'kanban' | 'list' | 'timeline' | 'calendar' | 'block';

interface TaskHubProps {
    initialTasks: Task[];
    users: User[];
    title?: string;
    description?: string;
    onAddTask?: () => void;
    showEmptyState?: boolean;
    headerExtra?: React.ReactNode;
}

export function TaskHub({
    initialTasks,
    users,
    title = 'Tasks',
    description,
    onAddTask,
    showEmptyState = true,
    headerExtra
}: TaskHubProps) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [viewMode, setViewMode] = useState<ViewMode>('kanban');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPriority, setFilterPriority] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<string | null>(null);
    const router = useRouter();

    const handleTaskClick = (taskId: string) => {
        router.push(`/tasks/${taskId}`);
    };

    // Filter tasks based on search and filters
    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPriority = !filterPriority || task.priority === filterPriority;
            const matchesStatus = !filterStatus || task.status === filterStatus;
            return matchesSearch && matchesPriority && matchesStatus;
        });
    }, [tasks, searchQuery, filterPriority, filterStatus]);

    // Group tasks by status for Kanban
    const kanbanColumns = useMemo(() => {
        const statuses = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.IN_REVIEW, TaskStatus.COMPLETED, TaskStatus.BLOCKED];
        return statuses.map(status => ({
            id: status.toLowerCase().replace(' ', '-'),
            title: status,
            color: status === TaskStatus.COMPLETED ? 'green' : status === TaskStatus.BLOCKED ? 'red' : 'blue',
            tasks: filteredTasks
                .filter(t => t.status === status)
                .map(t => ({
                    id: t.id,
                    title: t.title,
                    description: t.description,
                    status: t.status,
                    priority: t.priority,
                    dueDate: t.dueDate,
                    assignee: users.find(u => u.id === t.assigneeId),
                })),
        }));
    }, [filteredTasks, users]);

    const handleTaskMove = (taskId: string, fromColumn: string, toColumn: string) => {
        const statusMap: Record<string, TaskStatus> = {
            'todo': TaskStatus.TODO,
            'in-progress': TaskStatus.IN_PROGRESS,
            'in-review': TaskStatus.IN_REVIEW,
            'completed': TaskStatus.COMPLETED,
            'blocked': TaskStatus.BLOCKED,
        };

        setTasks(prev => prev.map(task =>
            task.id === taskId
                ? { ...task, status: statusMap[toColumn] || task.status }
                : task
        ));
    };

    return (
        <div className="flex h-full overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden space-y-6">
                {/* Header Section */}
                <div className="flex items-start justify-between px-6 pt-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                            <Badge variant="outline" className="bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 border-zinc-200 uppercase text-[10px] tracking-wider px-2">Tasks Hub</Badge>
                        </div>
                        {description && <p className="text-[13px] text-muted-foreground">{description}</p>}
                    </div>
                    <div className="flex items-center gap-3">
                        {headerExtra}
                        <Button onClick={onAddTask} className="gap-2 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 h-9">
                            <Plus className="h-4 w-4" />
                            Add Task
                        </Button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between gap-4 px-6">
                    <div className="flex items-center gap-2 flex-1">
                        <div className="relative max-w-sm flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search tasks, IDs, or members..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 h-10 text-[13px] bg-card border-zinc-200"
                            />
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="outline" size="sm" className="h-10 text-[12px] gap-2 border-zinc-200 bg-card">
                                <Filter className="h-3.5 w-3.5 text-zinc-500" />
                                Filter
                            </Button>
                            <Button variant="outline" size="sm" className="h-10 text-[12px] gap-2 border-zinc-200 bg-card">
                                <Users className="h-3.5 w-3.5 text-zinc-500" />
                                Assignee
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 border border-zinc-200 rounded-lg p-1 bg-muted/20">
                        {[
                            { id: 'kanban', icon: LayoutGrid, label: 'Kanban' },
                            { id: 'list', icon: List, label: 'List' },
                            { id: 'timeline', icon: GanttChartSquare, label: 'Timeline' },
                            { id: 'calendar', icon: CalendarIcon, label: 'Calendar' },
                            { id: 'block', icon: Layers, label: 'Block' },
                        ].map((mode) => (
                            <Button
                                key={mode.id}
                                variant={viewMode === mode.id ? 'secondary' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode(mode.id as ViewMode)}
                                className={cn(
                                    "gap-2 h-8 px-3 text-[12px] font-medium transition-all",
                                    viewMode === mode.id ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                                )}
                            >
                                <mode.icon className="h-3.5 w-3.5" />
                                {mode.label}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto px-6 pb-6">
                    {filteredTasks.length === 0 && showEmptyState ? (
                        <div className="flex flex-col items-center justify-center h-full border-2 border-dashed rounded-2xl opacity-40 bg-muted/5 p-12 text-center">
                            <Layers className="h-12 w-12 mb-4 text-zinc-300" />
                            <h3 className="text-lg font-bold uppercase tracking-tight">No tasks found</h3>
                            <p className="text-sm text-muted-foreground mt-2 max-w-[250px]">Try adjusting your search or filters to find what you're looking for.</p>
                        </div>
                    ) : (
                        <>
                            {viewMode === 'kanban' && (
                                <div className="h-full">
                                    <KanbanBoard
                                        columns={kanbanColumns}
                                        onTaskMove={handleTaskMove}
                                        onTaskClick={handleTaskClick}
                                    />
                                </div>
                            )}
                            {viewMode === 'list' && (
                                <Card className="border-border/40 bg-card/50 overflow-hidden shadow-sm">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-muted/30 border-b">
                                                <tr>
                                                    <th className="px-6 py-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Task Name</th>
                                                    <th className="px-6 py-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Status</th>
                                                    <th className="px-6 py-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Priority</th>
                                                    <th className="px-6 py-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Assignee</th>
                                                    <th className="px-6 py-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Due Date</th>
                                                    <th className="px-6 py-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Progress</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border/40">
                                                {filteredTasks.map((task) => (
                                                    <tr
                                                        key={task.id}
                                                        className="group hover:bg-muted/30 transition-colors cursor-pointer"
                                                        onClick={() => handleTaskClick(task.id)}
                                                    >
                                                        <td className="px-6 py-4">
                                                            <div className="font-medium text-foreground text-[13px]">{task.title}</div>
                                                            <div className="text-[10px] text-muted-foreground uppercase tracking-tight">ID: {task.id}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <Badge variant="outline" className={cn(
                                                                "font-semibold text-[10px] uppercase tracking-wider border-0 px-2 py-0.5",
                                                                task.status === TaskStatus.COMPLETED ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30" : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                                                            )}>
                                                                {task.status}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <Badge variant="outline" className={cn(
                                                                "text-[10px] font-bold border-0 px-2 py-0.5",
                                                                task.priority === TaskPriority.HIGH || task.priority === TaskPriority.URGENT ? "text-red-600 bg-red-50" : "text-zinc-500 bg-zinc-50"
                                                            )}>
                                                                {task.priority}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <Avatar className="h-6 w-6 border-zinc-200 shadow-sm">
                                                                    <AvatarFallback className="text-[8px]">U</AvatarFallback>
                                                                </Avatar>
                                                                <span className="text-[12px] text-muted-foreground">Assigned</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground font-medium">
                                                                <Clock className="h-3.5 w-3.5" />
                                                                {task.dueDate ? format(task.dueDate, 'MMM dd') : 'No date'}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 w-32">
                                                            <div className="space-y-1.5">
                                                                <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                                                                    <span>{task.progress}%</span>
                                                                </div>
                                                                <Progress value={task.progress} className="h-1 bg-zinc-100 dark:bg-zinc-800" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>
                            )}
                            {viewMode === 'timeline' && (
                                <TimelineView
                                    tasks={filteredTasks}
                                    users={users}
                                    onTaskClick={handleTaskClick}
                                />
                            )}
                            {viewMode === 'calendar' && (
                                <CalendarView
                                    tasks={filteredTasks}
                                    users={users}
                                    onTaskClick={handleTaskClick}
                                />
                            )}
                            {viewMode === 'block' && (
                                <BlockView
                                    tasks={filteredTasks}
                                    users={users}
                                    onTaskClick={handleTaskClick}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>

        </div>
    );
}
