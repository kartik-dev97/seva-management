'use client';

import AppLayout from '@/components/layout/app-layout';
import { Badge } from '@/components/ui/badge';
import { ProjectSubNav } from '@/components/project/project-sub-nav';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { tasks as mockTasks, users as mockUsers } from '@/lib/mock-data';
import { TaskHub } from '@/components/tasks/task-hub';

interface ProjectTasksPageContentProps {
    projectId: string;
    projectTitle: string;
}

export function ProjectTasksPageContent({ projectId, projectTitle }: ProjectTasksPageContentProps) {
    const projectTasks = mockTasks.filter(t => t.projectId === projectId);

    return (
        <AppLayout>
            <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
                {/* Fixed Project Context Header */}
                <div className="px-6 pt-6 pb-2 space-y-4 border-b border-border/10 bg-muted/5">
                    <div className="space-y-3">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Projects
                        </Link>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-semibold tracking-tight">{projectTitle}</h1>
                            <Badge variant="outline" className="bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 border-zinc-200 uppercase text-[10px] tracking-wider px-2">Project Tasks</Badge>
                        </div>
                    </div>
                    <ProjectSubNav projectId={projectId} />
                </div>

                {/* Reusable Task Hub */}
                <div className="flex-1 overflow-hidden">
                    <TaskHub
                        initialTasks={projectTasks}
                        users={mockUsers}
                        title="Tasks"
                        description={`Manage all objectives and deliverables for ${projectTitle}`}
                    />
                </div>
            </div>
        </AppLayout>
    );
}

