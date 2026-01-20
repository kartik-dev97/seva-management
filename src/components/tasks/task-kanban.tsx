'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskCard } from '@/components/tasks/task-card';
import { tasks } from '@/lib/mock-data';
import { TaskStatus } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';

const columns = [
    { id: TaskStatus.TODO, title: 'To Do', color: 'border-t-gray-500' },
    { id: TaskStatus.IN_PROGRESS, title: 'In Progress', color: 'border-t-blue-500' },
    { id: TaskStatus.IN_REVIEW, title: 'In Review', color: 'border-t-orange-500' },
    { id: TaskStatus.COMPLETED, title: 'Completed', color: 'border-t-green-500' },
];

export function TaskKanban() {
    const getTasksByStatus = (status: TaskStatus) => {
        return tasks.filter((task) => task.status === status);
    };

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {columns.map((column) => {
                const columnTasks = getTasksByStatus(column.id);

                return (
                    <Card key={column.id} className={`border-t-4 ${column.color}`}>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold">{column.title}</CardTitle>
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                                    {columnTasks.length}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[600px] pr-4">
                                <div className="space-y-3">
                                    {columnTasks.map((task) => (
                                        <TaskCard key={task.id} task={task} />
                                    ))}
                                    {columnTasks.length === 0 && (
                                        <div className="py-8 text-center text-sm text-muted-foreground">
                                            No tasks
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
