'use client';

import AppLayout from '@/components/layout/app-layout';
import { events as globalEvents, projects, users } from '@/lib/mock-data';
import { SchedulingHub } from '@/components/scheduling/scheduling-hub';

export function GlobalEventsPageContent() {
    return (
        <AppLayout>
            <div className="h-[calc(100vh-4rem)] overflow-hidden">
                <SchedulingHub
                    type="event"
                    items={globalEvents}
                    projects={projects}
                    users={users}
                    title="Global Events"
                    description="organization-wide schedule & planning"
                    onAddItem={() => console.log('Add event')}
                />
            </div>
        </AppLayout>
    );
}
