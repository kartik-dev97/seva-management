'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Task, TaskStatus, TaskPriority } from '@/lib/types';
import { getUserById } from '@/lib/mock-data';
import { Calendar, MessageSquare, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TaskCardProps {
    task: Task;
}

const priorityColors = {
    [TaskPriority.LOW]: 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
    [TaskPriority.MEDIUM]: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    [TaskPriority.HIGH]: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
    [TaskPriority.URGENT]: 'bg-red-500/10 text-red-700 dark:text-red-400',
};

export function TaskCard({ task }: TaskCardProps) {
    const assignee = task.assigneeId ? getUserById(task.assigneeId) : null;

    return (
        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/20">
            <CardHeader className="p-4 space-y-3">
                {/* Title */}
                <CardTitle className="text-sm font-medium leading-snug group-hover:text-primary transition-colors">
                    {task.title}
                </CardTitle>

                {/* Priority & Due Date */}
                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className={cn('text-xs', priorityColors[task.priority])}>
                        {task.priority}
                    </Badge>
                    {task.dueDate && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {format(task.dueDate, 'MMM dd')}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    {/* Assignee */}
                    {assignee && (
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={assignee.avatar} alt={assignee.name} />
                            <AvatarFallback className="text-xs">
                                {assignee.name.split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {task.comments.length > 0 && (
                            <div className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                {task.comments.length}
                            </div>
                        )}
                        {task.attachments.length > 0 && (
                            <div className="flex items-center gap-1">
                                <Paperclip className="h-3 w-3" />
                                {task.attachments.length}
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}
