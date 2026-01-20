'use client';

import { useState } from 'react';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
} from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { GripVertical, Calendar, User, Clock, CheckCircle2, MoreHorizontal, Plus } from 'lucide-react';

interface KanbanTask {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority: string;
    dueDate?: Date;
    assignee?: {
        name: string;
        avatar?: string;
    };
}

interface KanbanColumn {
    id: string;
    title: string;
    color: string;
    tasks: KanbanTask[];
}

interface KanbanBoardProps {
    columns: KanbanColumn[];
    onTaskMove: (taskId: string, fromColumn: string, toColumn: string) => void;
    onTaskClick?: (taskId: string) => void;
}

interface TaskCardProps {
    task: KanbanTask;
    isDragging?: boolean;
    onClick?: () => void;
}

function TaskCard({ task, isDragging, onClick }: TaskCardProps) {
    const priorityStyles: Record<string, string> = {
        'High': 'text-red-600 bg-red-50 dark:bg-red-950/20 dark:text-red-400',
        'Medium': 'text-amber-600 bg-amber-50 dark:bg-amber-950/20 dark:text-amber-400',
        'Low': 'text-zinc-600 bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400',
        'Urgent': 'text-red-700 bg-red-100 dark:bg-red-900/40 dark:text-red-300',
    };

    return (
        <div
            onClick={onClick}
            className={cn(
                "group p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card shadow-[0_1px_2px_rgba(0,0,0,0.05)] cursor-grab active:cursor-grabbing hover:border-zinc-300 dark:hover:border-zinc-700 transition-all",
                isDragging && "opacity-50 ring-2 ring-zinc-900 dark:ring-zinc-100 shadow-xl scale-[1.02]"
            )}
        >
            <div className="space-y-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                        <Badge variant="outline" className={cn("text-[9px] font-bold uppercase tracking-wider border-none px-1.5 py-0", priorityStyles[task.priority] || priorityStyles['Low'])}>
                            {task.priority}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground font-mono uppercase truncate opacity-60">#{task.id}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                        <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                </div>

                <div className="space-y-1">
                    <h4 className="text-[13px] font-bold leading-snug tracking-tight text-foreground line-clamp-2">
                        {task.title}
                    </h4>
                    {task.description && (
                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed opacity-70">
                            {task.description}
                        </p>
                    )}
                </div>

                <div className="pt-2 border-t border-dashed border-zinc-100 dark:border-zinc-800 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                        {task.dueDate && (
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                                <Clock className="h-3 w-3" />
                                <span>{format(task.dueDate, 'MMM dd')}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-1.5">
                        {task.assignee ? (
                            <div className="flex items-center -space-x-1.5">
                                <Avatar className="h-5 w-5 border-2 border-background shadow-sm">
                                    <AvatarImage src={task.assignee.avatar} />
                                    <AvatarFallback className="text-[7px] font-bold">
                                        {task.assignee.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        ) : (
                            <div className="h-5 w-5 rounded-full border border-dashed border-zinc-300 flex items-center justify-center bg-zinc-50">
                                <User className="h-2.5 w-2.5 text-zinc-400" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface SortableTaskProps {
    task: KanbanTask;
    onClick?: () => void;
}

function SortableTask({ task, onClick }: SortableTaskProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TaskCard task={task} isDragging={isDragging} onClick={onClick} />
        </div>
    );
}

export function KanbanBoard({ columns, onTaskMove, onTaskClick }: KanbanBoardProps) {
    const [activeTask, setActiveTask] = useState<KanbanTask | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const task = columns
            .flatMap(col => col.tasks)
            .find(t => t.id === active.id);
        if (task) {
            setActiveTask(task);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveTask(null);

        if (!over) return;

        const activeTaskId = active.id as string;
        const overId = over.id as string;

        // Find the source column
        const sourceColumn = columns.find(col =>
            col.tasks.some(t => t.id === activeTaskId)
        );

        // Find the target column (either dropping on a task in that column or the column itself)
        let targetColumn = columns.find(col => col.id === overId);
        if (!targetColumn) {
            targetColumn = columns.find(col =>
                col.tasks.some(t => t.id === overId)
            );
        }

        if (sourceColumn && targetColumn && sourceColumn.id !== targetColumn.id) {
            onTaskMove(activeTaskId, sourceColumn.id, targetColumn.id);
        }
    };

    const statusHeaderStyles: Record<string, string> = {
        'Todo': 'bg-zinc-100/50',
        'In Progress': 'bg-zinc-100/50',
        'Review': 'bg-zinc-100/50',
        'Completed': 'bg-zinc-100/50',
        'Blocked': 'bg-red-50/30',
    };

    const statusBadgeStyles: Record<string, string> = {
        'Todo': 'bg-zinc-200 text-zinc-700',
        'In Progress': 'bg-blue-100 text-blue-700',
        'In Review': 'bg-amber-100 text-amber-700',
        'Completed': 'bg-emerald-100 text-emerald-700',
        'Blocked': 'bg-red-100 text-red-700',
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex gap-6 h-full pb-6 px-1">
                {columns.map((column) => (
                    <div
                        key={column.id}
                        className="flex-shrink-0 w-[300px] flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-muted/20 overflow-hidden"
                    >
                        <div className={cn("p-4 border-b border-zinc-200 dark:border-zinc-800", statusHeaderStyles[column.title])}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-[13px] font-bold tracking-tight uppercase">{column.title}</h3>
                                    <Badge variant="outline" className={cn("text-[10px] font-bold border-none px-1.5 h-4", statusBadgeStyles[column.title] || 'bg-zinc-200')}>
                                        {column.tasks.length}
                                    </Badge>
                                </div>
                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full opacity-50 hover:opacity-100 transition-opacity">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 p-3 overflow-y-auto min-h-[500px]">
                            <SortableContext
                                items={column.tasks.map(t => t.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-3">
                                    {column.tasks.map((task) => (
                                        <SortableTask key={task.id} task={task} onClick={() => onTaskClick?.(task.id)} />
                                    ))}
                                </div>
                            </SortableContext>
                            {column.tasks.length === 0 && (
                                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl mt-4 opacity-40">
                                    <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-2">
                                        <Plus className="h-4 w-4 text-zinc-400" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Empty column</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <DragOverlay>
                {activeTask && <TaskCard task={activeTask} isDragging />}
            </DragOverlay>
        </DndContext>
    );
}
