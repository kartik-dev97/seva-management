'use client';

import AppLayout from '@/components/layout/app-layout';
import { ProjectSubNav } from '@/components/project/project-sub-nav';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getEventsByProject, getMeetingsByProject, projects, users } from '@/lib/mock-data';
import { SchedulingHub } from '@/components/scheduling/scheduling-hub';

interface ProjectEventsPageContentProps {
    projectId: string;
    projectTitle: string;
}

export function ProjectEventsPageContent({ projectId, projectTitle }: ProjectEventsPageContentProps) {
    const projectEvents = getEventsByProject(projectId);
    const projectMeetings = getMeetingsByProject(projectId);
    const allProjectItems = [...projectEvents, ...projectMeetings];

    return (
        <AppLayout>
            <div className="space-y-6 flex flex-col h-[calc(100vh-4rem)]">
                {/* Header */}
                <div className="flex items-start justify-between flex-shrink-0">
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
                        </div>
                    </div>
                </div>

                {/* Sub Navigation */}
                <ProjectSubNav projectId={projectId} />

                <div className="flex-1 overflow-hidden">
                    <SchedulingHub
                        type="event"
                        items={allProjectItems}
                        projects={projects}
                        users={users}
                        title="Project Scheduling"
                        description={`events and meetings for ${projectTitle}`}
                        onAddItem={() => console.log('Add project schedule item')}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
