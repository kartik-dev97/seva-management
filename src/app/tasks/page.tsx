import AppLayout from '@/components/layout/app-layout';
import { TaskHub } from '@/components/tasks/task-hub';
import { tasks as mockTasks, users as mockUsers } from '@/lib/mock-data';

export default function TasksPage() {
    return (
        <AppLayout>
            <div className="h-[calc(100vh-4rem)] overflow-hidden">
                <TaskHub
                    initialTasks={mockTasks}
                    users={mockUsers}
                    title="Global Tasks"
                    description="Central command for all project-wide objectives and action items"
                />
            </div>
        </AppLayout>
    );
}
